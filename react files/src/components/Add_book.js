import React, { Component } from 'react';
import Cookies from 'js-cookie';
class Add_book extends Component {
    constructor(props) {
        super(props);
        this.state = {

            knjiga:'',
            autor: '',
            dataResp: []
    };

    this.handleChangeBookName = this.handleChangeBookName.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  

}

    handleChangeBookName(event) {
        this.setState({knjiga: event.target.value});
    }

    handleChangeAuthor(event) {
        this.setState({autor: event.target.value});
    }

    handleSubmit(event) {
        try {
            var cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('status='))
            .split('=')[1];
        } catch (error) {
            document.cookie = 'status=null';
        }
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('status='))
        .split('=')[1];
        
        var request = new XMLHttpRequest();
        request.open('POST', `http://localhost/biblioteka_uros/php_files/add_book.php?knjiga=`+this.state.knjiga+'&autor='+this.state.autor+'&status='+cookieValue, false);
        request.send();
    
        var responseJSON = JSON.parse(request.responseText)
        alert(responseJSON.poruka)
        event.preventDefault();
        
       
    }  

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>
                <h1>Dodavanje knjige</h1>
                <input placeholder="knjiga" type="text" value={this.state.knjiga} onChange={this.handleChangeBookName} />
                <input placeholder="autor" type="text" value={this.state.autor} onChange={this.handleChangeAuthor} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        );
    }
}

export default Add_book;