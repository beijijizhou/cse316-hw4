import React, { Component } from 'react'
import Header from './Header';
import Onequestion from './Onequestion';
export default class Data extends Component {
    render() {
      var questions=this.props.data
        return (
          <div>
            { <Header
            length={this.props.data.length}
          setcontent={this.props.setcontent}
          left={"Questions"}
          mid={"All Questions"} />  }
           {questions.map((question) => {
              return (
                <div key={question.qid}>
                  {" "}
                  <Onequestion
                    item={question}
                    setcontent={this.props.setcontent}
                    data={this.props.data}
                  />
                </div>
              );
            })} 
        </div>
        )
      }
}
