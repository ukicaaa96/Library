import React, { Component } from 'react';
import Rent_book from './Rent_book';
import Return_book from './Return_book';

class Student_dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

            ime: '',
            id: '',
            status: '',
            dataResp:[{knjiga: ''}],
            command: 2


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

      setCommand(cmd){
          this.setState({command:cmd})
      }



      componentDidMount() {


        this.setData();
        this.getHistory();
    
      }

     

      getRentedBooks(){
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost/biblioteka_uros/php_files/list_of_rent_book_for_user.php?id=45', false);
        request.send();
      
        var responseJSON = JSON.parse(request.responseText)
        console.log(responseJSON)
        if(responseJSON == false){
            this.setCommand(0)
        }
        else{
            this.setCommand(2)
            this.setState({dataResp : responseJSON})

        }  
    
      }

      getHistory(){
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost/biblioteka_uros/php_files/student_dashboard.php?id=45', false);
        request.send();
      
        var responseJSON = JSON.parse(request.responseText)
        console.log(responseJSON)
        if(responseJSON == false){
            this.setCommand(0)
        }
        else{
            this.setState({dataResp: responseJSON})
            this.setCommand(1)
        }  
    
      }

      rentBook(){
        this.setState({command: 3})
      }

      returnBook(){
        this.setState({command: 4})
      }


    render() {
     
        if(this.state.command == 0){
            return(
                <>
            <div className="center">
                <div className="login">
                <button className="dashboard-button-logout">Logout</button>

                    <ul className="nav">
                        <li><img src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg" className="avatar-litle"/></li>
                        <li className="student-name"><h2>{this.state.ime}</h2></li>
                    </ul>
                    <ul className='nav-buttons'>
                        <li><button onClick={() => this.returnBook()} className="dashboard-button">Vrati knjigu</button></li> 
                        <li><button onClick={() => this.rentBook()} className="dashboard-button">Iznajmi knjigu</button></li>  
                        <li><button onClick={() => this.getHistory()} className="dashboard-button">Prikazi istoriju</button></li> 
                        <li><button onClick={() => this.getRentedBooks()} className="dashboard-button">Prikazi iznajmljene knjige</button></li> 
                    </ul>
                </div>

                <span>Nema podataka...</span>
                </div>
                </>
            );

        }
        else if(this.state.command == 1){
            
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
            <div className="center">
                <div className="login">
                <button className="dashboard-button-logout">Logout</button>

                    <ul className="nav">
                        <li><img src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg" className="avatar-litle"/></li>
                        <li className="student-name"><h2>{this.state.ime}</h2></li>
                    </ul>
                    <ul className='nav-buttons'>
                        <li><button onClick={() => this.returnBook()} className="dashboard-button">Vrati knjigu</button></li>  
                        <li><button onClick={() => this.rentBook()} className="dashboard-button">Iznajmi knjigu</button></li>  
                        <li><button onClick={() => this.getHistory()} className="dashboard-button">Prikazi istoriju</button></li> 
                        <li><button onClick={() => this.getRentedBooks()} className="dashboard-button">Prikazi iznajmljene knjige</button></li>  
                    </ul>

                    <table className = 'student-table'>
                    <tr>
                        <th>Redni broj</th>
                        <th>Knjiga</th>
                        <th>Datum</th>
                        <th>Status</th>
                    </tr>
                            {elements}    
                    </table>
                </div>
            </div>
            </>
        );


}


else if(this.state.command == 2){
            
    var counter = 0;
    var elements = this.state.dataResp.map(function (fields){
    counter += 1;
    return (
            
        <tr>
            <th>{counter}</th>
            <th>{fields.knjiga}</th>
            <th>{fields.datum}</th>
        </tr>
        )
        
    });
    return (
    <>
    
    <div className="center">
        <div className="login">
        <button className="dashboard-button-logout">Logout</button>

            <ul className="nav">
                <li><img src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg" className="avatar-litle"/></li>
                <li className="student-name"><h2>{this.state.ime}</h2></li>
            </ul>
            <ul className='nav-buttons'>
                <li><button onClick={() => this.returnBook()} className="dashboard-button">Vrati knjigu</button></li> 
                <li><button onClick={() => this.rentBook()} className="dashboard-button">Iznajmi knjigu</button></li>  
                <li><button onClick={() => this.getHistory()} className="dashboard-button">Prikazi istoriju</button></li> 
                <li><button onClick={() => this.getRentedBooks()} className="dashboard-button">Prikazi iznajmljene knjige</button></li> 
            </ul>

            <table className = 'student-table'>
            <tr>
                <th>Redni broj</th>
                <th>Knjiga</th>
                <th>Datum</th>

            </tr>
                    {elements}    
            </table>




        </div>
    </div>
    </>
);

}
else if(this.state.command == 3){
    return(
        <Rent_book/>
    )
}


else if(this.state.command == 4){
    return(
        <Return_book/>
    )
}
}
  
}


export default Student_dashboard;