import React, { Component } from 'react';

class Student_dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ime: '',
            id: '',
            status: '',
            dataResp:[{knjiga: ''}],
            default: [{data: ''}],


    };
    
      }

      setData(){
        var cookieIme = document.cookie
        .split('; ')
        .find(row => row.startsWith('ime='))
        .split('=')[1];

        var cookieId = document.cookie
        .split('; ')
        .find(row => row.startsWith('id='))
        .split('=')[1];

        var cookieStatus = document.cookie
        .split('; ')
        .find(row => row.startsWith('status='))
        .split('=')[1];

        this.setState({
            ime: cookieIme,
            id: cookieId,
            status: cookieStatus
        })
      }

      componentDidMount() {

        this.setData();

        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost/biblioteka_uros/php_files/student_dashboard.php?id=45', false);
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
        
    
      
    
      }


    render() {
        var counter = 0;
        var elements = this.state.dataResp.map(function (fields){
        counter += 1;
            return (
                
            <tr>
                <th>{counter}</th>
                <th>{fields.knjiga}</th>
                <th>{fields.datum}</th>
                <th style={{backgroundColor: fields.rok}}>{fields.transakcija}</th>
            </tr>


            )
            
        });

        return (
            <>
            <div className='info'>
            <img height="70px" src="https://freeiconshop.com/wp-content/uploads/edd/book-open-flat.png" className="avatar-litle"/>
            <h2>{this.state.ime}</h2>
            </div>
                <table>
                <tr>
                    <th>Redni broj</th>
                    <th>Knjiga</th>
                    <th>Datum</th>
                    <th>Status</th>
                </tr>
                        {elements}    
                </table>
                </>
        );
    }
}

export default Student_dashboard;