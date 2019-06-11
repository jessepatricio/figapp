import React from 'react'
import Header from './Header';
import SearchBar from './SearchBar';
import figapi from '../components/api/fig-contacts-api';
import ContactList from './ContactList';

export class App extends React.Component {
    //initialize state contacts
    state = { contacts: [] };
    //submit function will call api and return data
    onSearchSubmit = async (srcText) => {
        const response = await figapi.get('/contacts', { 
            params: { query: srcText }
         });
        
        this.setState({ contacts: response.data.results });
        console.log(`app: ` + this.state.contacts);
    };

    render() {
        return (
            <div className="ui container"> 
                <Header title="Acme Contact Management"/>
                <SearchBar onSubmit={this.onSearchSubmit} />
                <ContactList contacts={this.state.contacts} />
                
            </div>
        )
    }
}

export default App
