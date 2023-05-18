import React, { Component } from "react";
import Header from "./Header";
import Postanswer from "./Postanswer";
export default class Answerpage extends Component {
  constructor(props) {
    super(props);
    this.handleAnswerButton = this.handleAnswerButton.bind(this);
  }
  handleAnswerButton() {
    this.props.setcontent(
      <Postanswer
        setcontent={this.props.setcontent}
        item={this.props.item}
      ></Postanswer>
    );
  }
  printoneanswer(answers) {
    var date = new Date(answers.ans_date_time).toString();
    var hr = date.split(" ")[4];
    var day =
      date.split(" ")[1] + " " + date.split(" ")[2] + ", " + date.split(" ")[3];
    hr = hr.split(":")[0] + ":" + hr.split(":")[1];
    return (
      <div key={answers.aid} id="oneanswer">
        <div id="answerContent">{answers.text}</div>
        <div className="rightDiv">
          <li>
            Ans By <span className="askedBy">{answers.ans_by}</span>
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
  render() {
    var question = this.props.item;
    var view = this.props.item.views === 1 ? "View" : "Views";
    var date = new Date(question.ask_date_time).toString();
   
    var hr = date.split(" ")[4];
    var day =
      date.split(" ")[1] + " " + date.split(" ")[2] + ", " + date.split(" ")[3];
    hr = hr.split(":")[0] + ":" + hr.split(":")[1];
    var answers=question.answers.reverse();
    return (
      <div>
        <Header
          length={answers.length}
          setcontent={this.props.setcontent}
          left={"Answers"}
          mid={question.title}
        />
        <div id="dataDiv">
          <div
            style={{
              fontWeight: "bold",
              fontSize: "x-large",
              textAlign: "center",
              paddingTop: "0.5rem",
            }}
          >
            {this.props.item.views} {view}
          </div>
          <div>{this.props.item.text}</div>
          <div className="rightDiv">
            <li>
              Asked by <span className="askedBy">{question.asked_by}</span>
            </li>
            <div>
              On <span className="askedOn">{day}</span>
            </div>
            <div>
              At <span className="askedAt">{hr}</span>
            </div>
          </div>
        </div>
        {answers.map((answer) => this.printoneanswer(answer))}
        <div
          className="button"
          id="answerbutton"
          onClick={this.handleAnswerButton}
        >
          Answer Question
        </div>
      </div>
    );
  }
}
