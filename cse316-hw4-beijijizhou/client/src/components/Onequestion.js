import React, { Component } from "react";
import axios from "axios";
import Answerpage from "./Answerpage";
export default class Onequestion extends Component {
  constructor(props) {
    super(props);
    
    this.titleclick = this.titleclick.bind(this);
  }

  fourtagsdiv(onetag) {
    return <li key={onetag}>{onetag}</li>;
  }
  titleclick() {
    
    axios.post("http://localhost:8000/updateViews", this.props.item).then((res) => {
       this.props.item.views=res.data
      this.props.setcontent(
        <Answerpage
        data={this.props.data}
          setcontent={this.props.setcontent}
          item={this.props.item}
        />
      );
    });
    
  }
  // componentDidMount() {
  //   var data = {
  //     int: this.props.item.qid,
  //   };
    

  //   axios
  //     .post("http://localhost:8000/AnswersForOneQuestion", data)
  //     .then((res) => {
  //       this.setState({
  //         answerarray: res.data,
  //       });
  //     });
  // }

  render() {
    var question=this.props.item;
    var date=new Date(question.ask_date_time).toString();
    var hr=date.split(" ")[4]
    var day=date.split(" ")[1]+" "+date.split(" ")[2]+", "+date.split(" ")[3]
    hr=hr.split(":")[0]+":"+hr.split(":")[1]
    var view = this.props.item.views === 1 ? "View" : "Views";
    var answers =this.props.item.answers.length === 1 ? "Answer" : "Answers";
    return (
      <div id="dataDiv">
        <div id="leftDiv">
          <div>
            {this.props.item.views} {view}
          </div>
          <div>
            {this.props.item.answers.length} {answers}
          </div>
        </div>
        <div id="midDiv">
          <div id="titleDiv" onClick={this.titleclick}>
            {this.props.item.title}
          </div>
          <div id="tagDiv">
            {this.props.item.tag.map((id) => this.fourtagsdiv(id.name))}
          </div>
        </div>
        <div className="rightDiv">
          <li>
            Asked by <span className="askedBy">{this.props.item.asked_by}</span>
          </li>
          <div>
            On <span className="askedOn">{day}</span>
          </div>
          <div>
            At <span className="askedAt">{hr}</span>
          </div>
        </div>
      </div>
    );
  }
}
