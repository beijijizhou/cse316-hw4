import React, { Component } from 'react'
import axios from 'axios';
import Data from './Data';
import Tags from "./Tags";
import Header from "./Header";
import Onequestion from "./Onequestion";
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
    this.QuestionClick = this.QuestionClick.bind(this);
    this.TagClick = this.TagClick.bind(this);
     this.questionFocus=React.createRef()
  }
  search(input) {
    axios.get("http://localhost:8000/loadQuestions").then((res) => {
    var indexset=new Set()
    var text = input.split(" ");
    var index = 0;
    for (let onequestion of res.data) {
      var set = new Set();
      var questiontext = onequestion.text.split(" ");
      var questiontitle = onequestion.title.split(" ");
      for (let j of questiontext) {
        var s = j.toLocaleLowerCase();
        set.add(s);
      }
      for (let j of questiontitle) {
        s = j.toLocaleLowerCase();
        set.add(s);
      }
      for (let k of text) {
        if (set.has(k.toLocaleLowerCase())) {
          indexset.add(index);
          break;
        } else if (k.charAt(0) === "[" && k.charAt(k.length - 1) === "]") {
          k = k.substring(1, k.length - 1).toLocaleLowerCase();
          for (let tag of onequestion.tag){
            if (tag.name.toLocaleLowerCase()===k){
              indexset.add(index)
            }
          }
        }
      }
      index++
    }
    var searchresult = [];
    for (let index of indexset) {
      searchresult.push(index);
    }
    var question = searchresult.length ===1? "Question" : "Questions";
    if (searchresult.length > 0) {
      this.props.setcontent(
        <div>
          <Header
            length={searchresult.length}
            setcontent={this.props.setcontent}
            left={question}
            mid={"Search Result"}
          />
          {searchresult.map((index) => (
            <Onequestion
              item={res.data[index]}
              key={res.data[index].qid}
              setcontent={this.props.setcontent}
              data={res.data}
            />
          ))}
        </div>
      );
    } else {
      this.props.setcontent(
        <div>
          <Header
            length={searchresult.length}
            setcontent={this.props.setcontent}
            left={"Questions"}
            mid={"Search Result"}
          />
          <h1 id="noq">No Questions Found</h1>
        </div>
      );
    }
    })
    
  }
  QuestionClick(){
    this.questionFocus.focus()
    axios.get("http://localhost:8000/loadQuestions").then((res) => {
      this.props.setcontent(<Data
        data={res.data}
        handleTitleClick={this.props.handleTitleClick}
        setcontent={this.props.setcontent}
      />, )
      });
  }
  TagClick(){
    axios.get("http://localhost:8000/loadQuestions").then((res) => {
      this.props.setcontent(<Tags
        data={res.data}
        handleTitleClick={this.props.handleTitleClick}
        setcontent={this.props.setcontent}
      />, )
      
      });
}
  componentDidMount(){
    this.questionFocus.focus()
  }
    render() {
        return (
          <div className="sticky">
            <div className="nav" id="nav">
              <div id="questionsDiv"  tabIndex="0"  onClick={this.QuestionClick}  ref={(e)=>this.questionFocus=e}>
                Questions
              </div>
              <div id="Tags" tabIndex="0" onClick={this.TagClick}>
                Tags
              </div>
              <h1>Fake Stack Overflow</h1>
              <div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search..."
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      this.search(this.state.search);
                    }
                  }}
                  className="box"
                  onChange={(e) => {
                    this.setState({ search: e.target.value });
                  }}
                ></input>
              </div>
            </div>
          </div>
        );
      }
}
