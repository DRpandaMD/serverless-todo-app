import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// From AWS Amplify 
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import * as queries from './graphql/queries'
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  logout = () => {
    Auth.signOut()
    window.location.reload();
  }

  // get Todo List from the GraphQL API's provided
  getToDos = async () => {
    const result = await API.graphql(graphqlOperation(queries.listTodos))

    this.setState({items: result.data.listTodos.items});
  }

  // call getTodos() for the app class component 
  componentDidMount() {
    this.getToDos();
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
        <button onClick={this.logout}>Log Out</button>
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


export default withAuthenticator(App);
