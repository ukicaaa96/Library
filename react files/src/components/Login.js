import React, { Component } from 'react';

class Login extends Component {
        constructor(props) {
        super(props);
        this.state = {

            mail:'',
            lozinka: '',
            status: '',
            id : '',
            dataResp: []
    };

    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    

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

            this.setState({
                status: userStatus,
                id: userId
            })
            
            document.cookie = "status="+userStatus;
            document.cookie = "id="+userId;
           alert("Ulogovani ste kao: "+ userStatus)
            
            
        }
        event.preventDefault();

    }  



    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <label>
                <h1>Login</h1>
                <input placeholder="mail" type="text" value={this.state.mail} onChange={this.handleChangeMail} />
                <input placeholder="lozinka" type="password" value={this.state.lozinka} onChange={this.handleChangePassword} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        );
    }
}

export default Login;