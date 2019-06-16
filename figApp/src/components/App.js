import React from 'react'
import axios from 'axios';

import Header from './Header';
import SearchBar from './SearchBar';

import ContactList from './ContactList';

class App extends React.Component {
    state = { contacts: [] };

    componentDidMount() {

        axios.get('http://localhost:5000/api/contacts', { 
            params: { query: '' }
        }).then(res => {
            //console.log(res);
            //console.log(res.data);
            this.setState({ contacts: res.data });
        });
        

    }
    
    //submit function will call api and return data
    onSearchSubmit = async (srcText) =>  {
        
        axios.get('http://localhost:5000/api/contacts', { 
            params: { query: srcText.toLowerCase() }
        }).then(res => {
            //console.log(res);
            //console.log(res.data);
            var results = res.data.filter(item => item.first_name.toLowerCase().indexOf(srcText) !== -1
                || item.last_name.toLowerCase().indexOf(srcText) !== -1 
                || item.email.toLowerCase().indexOf(srcText) !== -1 
                || item.phone1.toLowerCase().indexOf(srcText) !== -1);


            this.setState({ contacts: results });
        });
        
       
    };

    render() {
        return (
            <div className="ui container"> 
                <Header title="Acme Contact Management"/>
                <SearchBar onSubmit={ this.onSearchSubmit } />
                Found: {this.state.contacts.length}
                <table className="ui celled table">
                    <thead>
                    <tr>
                        <th>First</th><th>Last</th><th>Email</th><th>Phone</th>
                    </tr>
                    </thead>
                    <tbody>
                        <ContactList contacts={this.state.contacts} />
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App
