import React, { Component } from 'react';

class Rent_book extends Component {
    constructor(props) {
        super(props);
        this.state = {

            knjiga:'',
            dataResp: []
    };

    this.handleChangeBookName = this.handleChangeBookName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  
}

handleChangeBookName(event) {
    this.setState({knjiga: event.target.value});
}


handleSubmit(event) {
    try {
        var cookieValueStatus = document.cookie
        .split('; ')
        .find(row => row.startsWith('status='))
        .split('=')[1];
    } catch (error) {
        document.cookie = 'status=null';
    }

    try {
        var cookieValueId = document.cookie
        .split('; ')
        .find(row => row.startsWith('id='))
        .split('=')[1];
    } catch (error) {
        document.cookie = 'id=null';
    }


    var cookieValueStatus = document.cookie
    .split('; ')
    .find(row => row.startsWith('status='))
    .split('=')[1];

    var cookieValueId = document.cookie
    .split('; ')
    .find(row => row.startsWith('id='))
    .split('=')[1];

    var request = new XMLHttpRequest();
    request.open('POST', 'http://localhost/biblioteka_uros/php_files/rent_book.php?knjiga='+this.state.knjiga+'&id='+cookieValueId+'&status='+cookieValueStatus, false);
    request.send();

    var responseJSON = JSON.parse(request.responseText)
    alert(responseJSON.poruka)
    event.preventDefault();
    
   
}  

    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>
                <h1>Iznajmljivanje knjige</h1>
                <input placeholder="knjiga" type="text" value={this.state.knjiga} onChange={this.handleChangeBookName} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        );
    }
}

export default Rent_book;