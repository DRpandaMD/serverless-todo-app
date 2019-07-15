import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// From AWS Amplify 
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

//generated from AWS Amplify add api (graphql) functionaity 
// Note: you have to add the import statements but the directory "graphql" is autoamatically generated
import * as queries from './graphql/queries'
import * as mutations from './graphql/mutations'
import * as subscriptions from './graphql/subscriptions'

import awsconfig from './aws-exports';
import { ApiGatewayManagementApi } from 'aws-sdk/clients/all';

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

  addTodo = async () => {
    const createTodoInput = {input: {name: this.refs.newTodo.value, status: "NEW"}};

    await API.graphql(graphqlOperation(mutations.createTodo, createTodoInput));

    this.refs.newTodo.value = '';
  }

  // call getTodos() for the app class component 
  componentDidMount() {
    this.getToDos();

    API.graphql(graphqlOperation(subscriptions.onCreateTodo))
      .subscribe({
        next: (result) => {
          const items = this.state.items;
          items.push(result.value.data.onCreateTodo);
          this.setState({items: items});
        }
      });

    API.graphql(graphqlOperation(subscriptions.onUpdateTodo))
      .subscribe({
        next: (result) => {
          const items = this.state.items;

          const todo = result.value.data.onUpdateTodo;
          const idx = items.findIndex(itm => itm.id === todo.id);
          items[idx] = todo;

          this.setState({items: items})
        }
      })
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
            <input type='text' ref="newTodo" />
            <button className='button' onClick={this.addTodo}>Add Todo</button>
          </div>
        </main>
          <div className='App-logout-button'>
            <button className='button' onClick={this.logout}>Log Out</button>
          </div>
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

  //event handler for checkbox checked
  updateTodoStatus = async (evt) => {
    const item = this.props.item;
    const todoStatus = evt.target.checked ? "DONE" : "NOT DONE";

    const updateTodoInput = { input: {id: item.id, name: item.name, status: todoStatus}};

    await API.graphql(graphqlOperation(mutations.updateTodo, updateTodoInput));
  }

  render() {
    const item = this.props.item;
    return (
      <li>
        <input type="checkbox" checked={item.status === 'DONE'} onChange={this.updateTodoStatus} />
        {item.name}
      </li>
    )
  }
} // End Class TodoItem


export default withAuthenticator(App);
