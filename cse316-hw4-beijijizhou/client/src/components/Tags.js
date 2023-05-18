import React, { Component } from 'react'
import Header from './Header'
import Onequestion from './Onequestion';
export default class Tags extends Component {
    handleOneTagClick(name) {
        var data = this.props.data;
        var questionlist = [];
        var index = 0;
        var counter = 0;
        for (let question of data) {
          for (let tags of question.tag) {

            if (name=== tags.name) {
              questionlist.push(index);
              counter++;
              break;
            }
          }
          index++;
        }
        var mid = "Question Tagged [" + name + "]";
        var question = counter === 1 ? "Question" : "Questions";
        this.props.setcontent(
          <div>
            <Header
              data={this.props.data}
              length={counter}
              setcontent={this.props.setcontent}
              left={question}
              mid={mid}
            />
            <div key={name.name}>
              {questionlist.map((index) => (
                <Onequestion
                  key={index}
                  item={data[index]}
                  setcontent={this.props.setcontent}
                  data={this.props.data}
                />
              ))}
            </div>
          </div>
        );
      }
    tagscreate(name,map){
       
        var count=map.get(name)===1? "question":"questions"
        return (
            <li
              key={name}
              id="bigtag"
            onClick={this.handleOneTagClick.bind(this, name)}
            >
              <div id="onetag">{name}</div>
              <div id="downtag">
                {" "}
                {map.get(name)} {count}
              </div>
            </li>
          );
    }
  render() { 
    var data = this.props.data;
    var tagmap=new Map()
    data.map(questions=>questions.tag.map(e=>!tagmap.has(e.name)?
    tagmap.set(e.name,1):tagmap.set(e.name,tagmap.get(e.name)+1)))
    var tagarray=[]
    for (let tag of tagmap){
        tagarray.push(tag[0])
    }
    return (
      <div><Header
      data={this.props.data}
      length={tagmap.size}
      setcontent={this.props.setcontent}
      left={"Tags"}
      mid={"All Tags"}
    />
    <div id="threetags">
          {tagarray.map(e=>this.tagscreate(e,tagmap))}
        </div>
    </div>
    )
  }
}
