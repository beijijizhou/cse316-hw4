import React, { Component } from 'react'
import Answerpage from "./Answerpage";
import axios from "axios";
export default class Postanswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          text: "",
          username: "",
          error: "",
        };
        this.handlePostAnswer = this.handlePostAnswer.bind(this);
      }
      addAnswer(question,answer){
        var item={
            question:question,
            answer:answer
        }
      axios.post("http://localhost:8000/addAnswer",item).then(
          (res)=>{ 
            question.answers=res.data
            this.props.setcontent(
              <Answerpage
                setcontent={this.props.setcontent}
                item={question}
              />
            )
          }
            
         )
    }
      handlePostAnswer() {
        var text = this.state.text;
        var username = this.state.username;
        var alertmessage = "";
        var f = false;
        if (text.length === 0) {
          alertmessage += "\nText shoud not be empty";
          f = true;
        }
        if (username.length === 0) {
          alertmessage += "\nUsername shoud not be empty";
          f = true;
        } else if (username.length > 15) {
          alertmessage += "\nUsername shoud not be more than 15 characters";
          f = true;
        }
        this.setState({
          error: alertmessage,
        });
        if (!f) {
          var answers = {
            text: text,
            ansBy: username,
          };
          this.addAnswer(this.props.item,answers)
        }
      }
      render() {
        return (
          <div>
            <div className="alertbox">{this.state.error}</div>
            <h2>Answer Text</h2>
            <textarea
              id="answertextbox"
              className="box"
              placeholder="Be respestful"
              onChange={(e) => {
                this.setState({ text: e.target.value });
              }}
            ></textarea>
            <h2>Username</h2>
            <textarea
              id="answernamebox"
              className="box"
              placeholder="Andy"
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
            ></textarea>
            <div className="button" id="postbutton" onClick={this.handlePostAnswer}>
              Post answer
            </div>
          </div>
        );
      }
}
