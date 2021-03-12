import React, { Component } from 'react';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import Add_book from './components/Add_book';
import Rent_book from './components/Rent_book';
import Return_book from './components/Return_book';
import Rented_books from './components/Rented_books';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Student_login from './components/Student_login';
import Student_dashboard from './components/Student_dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

        url:'',

};

this.handleChangeUrl = this.handleChangeUrl.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);    

}
handleChangeUrl(event) {
    this.setState({url: event.target.value});
  }

handleSubmit(event) {

event.preventDefault();
}





  render() {
    return (
  
     <div>
       <Student_dashboard/>
     </div>
    );
  }
}

export default App;








