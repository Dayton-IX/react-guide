import React, { Component } from 'react';
//* REACT SCRIPTS VERSION 2 OR HIGHER USE: import classes from './App.module.css, AND RENAME CSS FILE TO App.module.css
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';


class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: '34fa3rf', name: 'Max', age: 18 },
      { id: '4f4fef3', name: 'McKai', age: 17 },
      { id: 'sdfsy65', name: 'Java', age: 1 },
    ],
    showPersons: false,
    showCockpit: true
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  //? LEGACY
  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { id: '34fa3rf', name: newName, age: 18 },
        { id: '4f4fef3', name: 'McKai', age: 17 },
        { id: 'sdfsy65', name: 'Java', age: 1 },
      ]
    });
  }
  
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

  render () {
    console.log('[App.js] Render');
    let persons = null;

    if(this.state.showPersons) {
      persons = <Persons 
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}
      />
    }
  
    return (
      <WithClass classes={classes.App}>
        <button onClick={ () => { this.setState({ showCockpit: false })}}>Remove Cockpit</button>
        {this.state.showCockpit ? (
          <Cockpit 
            title={this.props.appTitle}
            personsLength={this.state.persons.length}
            showPersons={this.state.showPersons}
            clicked={this.togglePersonsHandler}
          />
        ) : null}
        {persons}
      </WithClass>
    );
  }
}

export default App;