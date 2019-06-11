import React, { Component } from 'react'
import Header from './Header';
import SearchBar from './SearchBar';
import figapi from '../components/api/fig-contacts-api';

export class App extends Component {
    //initialize state contacts
    state = { contacts: [] } ;
    //submit function will call api and return data
    onSearchSubmit = async srcText => {
        const response = await figapi.get('/contacts', {
            params: {query: srcText }
        });
        //set state contacts values
        this.setState({ contacts: response.data.results });

        console.log(this.state.contacts);
    }

    render() {
        return (
            <div className="ui container"> 
                <Header title="Acme Contact Management"/>
                <SearchBar onSubmit={this.onSearchSubmit}/>
            </div>
        )
    }
}

export default App
