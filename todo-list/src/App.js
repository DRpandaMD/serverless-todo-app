import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// From AWS Amplify 
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Feed the cat", status: "NEW" },
        { name: "Discover purpose of life", status: "NEW" },
        { name: "Learn to Cloud", status: "NEW" }
      ]
    }
  }
  // Todo List
  render(){
    return (
      <div className="App">
        <main>
          <div className='App-header'>
            <h1> Todo List</h1>
          </div>
          <div className='App-list'>
            <TodoList items={this.state.items} />
          </div>
        </main>
      </div>
    );
  }
} /// end Class App

// TodoList class that lists out a set of TodoItem Components
class TodoList extends Component {
  render() {
    return(
      <div className="TodoList">
        <ul>
          {
            this.props.items.map((itm, i) => {
              return <TodoItem item={itm} key={i} />
            })
          }
        </ul>
      </div>
    )
  }
} // End Class TodoList

// component for the actual list item with checkbox
class TodoItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <li>
        <input type="checkbox" />
        {item.name}
      </li>
    )
  }
} // End Class TodoItem


export default App;
