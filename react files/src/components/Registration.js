import React, { Component } from 'react';
import axios from 'axios';

class registration extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ime: '',
            mail:'',
            lozinka: '',
            status: 'student',
            response: '',
            dataResp: []

    };
    
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeName(event) {
        this.setState({ime: event.target.value});
      }

      handleChangeMail(event) {
        this.setState({mail: event.target.value});
      }

      handleChangePassword(event) {
        this.setState({lozinka: event.target.value});
      }

      handleChangeStatus(event) {
        this.setState({status: event.target.value});
      }
    


    handleSubmit(event) {


        var request = new XMLHttpRequest();

        request.open('POST', `http://localhost/biblioteka_uros/php_files/registration.php?ime=`+this.state.ime+'&mail='+this.state.mail+'&lozinka='+this.state.lozinka+'&status='+this.state.status, false);
        request.send();
        var responseJSON = JSON.parse(request.responseText)
        alert(responseJSON.poruka)
        event.preventDefault();
        alert(this.state.status)
    }


 render() {
    return (

<div className='center'>
  <div className="login">
    <img src="https://freeiconshop.com/wp-content/uploads/edd/book-open-flat.png" alt="Avatar" className="avatar"/>
    Ime:
    <input className='ime'placeholder='ime' type="text" value={this.state.ime} onChange={this.handleChangeName} />
    <br></br>
    E-mail:
    <input className='mail'placeholder="mail" type="text" value={this.state.mail} onChange={this.handleChangeMail} />
    <br></br>
    Lozinka: 
    <input className='password'placeholder="lozinka" type="password" value={this.state.lozinka} onChange={this.handleChangePassword} />
      <div className='buttons'>
        <select className="select" onChange={this.handleChangeStatus}>
          <option value="student">student</option>
          <option value="admin">admin</option>
          <option value="bibliotekar">bibliotekar</option>
          </select>
      <div className = "login-submit" >
        <button onClick={this.handleSubmit} type="submit" value="Submit">Registruj se</button>
      </div>
    </div>
  </div>
</div>



    );
  }
}

export default registration;