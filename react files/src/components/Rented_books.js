import React, { Component } from 'react';

class Rented_books extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ime:'',
            dataResp:[{knjiga: ''}],
            default: [{data: ''}],
            
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  
}
handleChangeName(event) {
    this.setState({ime: event.target.value});
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
    
    var cookieValueStatus = document.cookie
    .split('; ')
    .find(row => row.startsWith('status='))
    .split('=')[1];


    var request = new XMLHttpRequest();
    request.open('POST', 'http://localhost/biblioteka_uros/php_files/list_of_rent_book_for_user.php?ime='+this.state.ime+'&status='+cookieValueStatus, false);
    request.send();
  
    var responseJSON = JSON.parse(request.responseText)
    console.log(responseJSON)
    if(responseJSON.poruka){
        this.setState({dataResp: [{knjiga: responseJSON.poruka}]})
    }
    else{
        this.setState({dataResp: responseJSON})
    }
    
    //alert(responseJSON.poruka)
    event.preventDefault();


}  


render() { 

  

    var elements = this.state.dataResp.map(function (fields){
            
        return (
    
            <div className="item-row">
                <span>{fields.knjiga}</span>
            </div>
        )
    });

    

  
      return (
        <>    
        <div>
        <form onSubmit={this.handleSubmit}>
        <label>
                <h1>Iznamljene knjige</h1>
                <input placeholder="ime" type="text" value={this.state.ime} onChange={this.handleChangeName} />
            </label>
            <input type="submit" value="Submit" />
            </form> 
        </div>
        
        <div>
            {elements}
        </div>
        
        </>     
      )
    
  }
 
}
export default Rented_books;