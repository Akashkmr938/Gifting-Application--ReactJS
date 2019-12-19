import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {

  state = {
    person: [
      {
        Name: "Akash",
        Age: 23
      },
      {
        Name: "Pavan",
        Age: 21
      }
    ],
    contentToggle: false
  }

  changeNamehandler = (name) => {
    this.setState({
      person: [
        {
          Name: name,
          Age: 100
        },
        {
          Name: "kumar",
          Age: 210
        }
      ]
    });
  }

  inputNameHandler = (event, index) => {
    const temp = this.state.person
    temp[index].Name = event.target.value;
    this.setState({
      person: temp
    });
  }

  toggleCardhandler = () => {
    this.setState({
      contentToggle: !this.state.contentToggle
    })
  }

  render() {

    if (this.contentToggle) {
      <div>
        <Person Name={this.state.person[0].Name}
          Age={this.state.person[0].Age}
          namechange={(event) => this.inputNameHandler(event, 0)}></Person>
        <Person Name={this.state.person[1].Name} Age={this.state.person[1].Age} namechange={(event) => this.inputNameHandler(event, 1)}></Person>
      </div>
    }
    return (
      <div>
        <button onClick={this.toggleCardhandler}>Click to ctoggle content</button>
        {
          this.state.contentToggle ? : null
        }
      </div>
    );
  }
}
export default App;