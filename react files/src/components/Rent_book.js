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

componentDidMount(){
    var request = new XMLHttpRequest();
    request.open('POST', 'http://localhost/biblioteka_uros/php_files/free_books.php',false)
    request.send();

    var responseJSON = JSON.parse(request.responseText)
    console.log(responseJSON)
    if(responseJSON.poruka == undefined){
        console.log(responseJSON)
        this.setState({dataResp: responseJSON})
    }
    else{
        alert(responseJSON.poruka)
    }
}

    
    render() {
        var counter = 0;
        var elements = this.state.dataResp.map(function (fields){
        counter += 1;
        return (
            <>
            <div className='rent'>
              <table className = 'student-book-table'>
            <tr>
                <th className='cnt'>{counter}</th>
                <th className='book'>{fields.knjiga}</th>
                <th className='author'>{fields.autor}</th>
                
            </tr>  
                 
            </table>
            <button className="rent-book-button">Iznajmi</button>  
            </div>
            </>
            )
        });
      
 

        return (

            <div className="center">

                <div className="login">
                <button className="dashboard-button-logout">Dashboard</button>
                <h1>Iznajmljvanje</h1>
            {elements}
           </div>
           </div>
        );
    }
}

export default Rent_book;