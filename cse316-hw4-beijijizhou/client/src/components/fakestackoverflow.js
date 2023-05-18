import React from 'react';
import Data from './Data';
import Nav from './Nav';
export default class FakeStackOverflow extends React.Component {
  constructor(props){
    super(props)
    this.setcontent = this.setcontent.bind(this);
    this.state = {
      navbar: <Nav  data={this.props.data} setnavbar={this.setnavbar} setcontent={this.setcontent}/>,
      content: 
        <Data
          data={this.props.data}
          handleTitleClick={this.handleTitleClick}
          setcontent={this.setcontent}
        />,    
    };
  }
  setcontent(newcontent) {
    this.setState({ content: newcontent});
  }
  render() {
    return (
      <div>
        {this.state.navbar}
       {this.state.content}
      </div>
    );
  }
}
