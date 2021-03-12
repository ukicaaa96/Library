import React, { Component } from 'react';

class Student_login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ime: '',
            mail:'',
            lozinka: '',
            status: '',
            id : '',
            dataResp: []
    };

    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
    this.handleRegistration = this.handleRegistration.bind(this); 

    }
    handleChangeMail(event) {
        this.setState({mail: event.target.value});
      }

      handleChangePassword(event) {
        this.setState({lozinka: event.target.value});
      }

    handleSubmit(event) {

        
        var request = new XMLHttpRequest();
        request.open('POST', `http://localhost/biblioteka_uros/php_files/login.php?mail=`+this.state.mail+'&lozinka='+this.state.lozinka, false);
        request.send();
      
        var responseJSON = JSON.parse(request.responseText)
        
        if(responseJSON.poruka !== undefined){
            
            alert(responseJSON.poruka);
        }
        else{
        
            const userStatus = responseJSON.status;
            const userId = responseJSON.id;
            const userName = responseJSON.ime;

            this.setState({
                status: userStatus,
                id: userId,
                ime: userName
            })
            
            document.cookie = "status="+userStatus;
            document.cookie = "id="+userId;
            document.cookie = "ime="+userName;
           alert("Ulogovani ste kao: "+ userStatus)
            
            
        }
        event.preventDefault();

    }  


    handleRegistration(event)
    {
        window.location = event.target.value;
    }
    render() {
        return (
        <>
        <div className='center'>
            <div className="login">
            <img src="https://freeiconshop.com/wp-content/uploads/edd/book-open-flat.png" alt="Avatar" className="avatar"/>
                E-mail:
                <input className='mail'placeholder="Unesite mail" type="text" value={this.state.mail} onChange={this.handleChangeMail} />
                Lozinka
                <input className='password'placeholder="Unesite lozinku" type="password" value={this.state.lozinka} onChange={this.handleChangePassword} />
                <div className='buttons'>
            <div className = "login-submit" >
                <button onClick={this.handleSubmit} type="submit" value="Submit">Prijava</button>
            </div>
            <br></br>
            <div className = "registration-submit" >
                <button onClick={this.handleRegistration} value="http://localhost:3000/registration">Registracija</button>
            </div>
            </div>

            </div>

            </div>
        </>





        );
    }
}
export default Student_login;