import React, { Component } from 'react'
import Header from './Header';
import SearchBar from './SearchBar';



export class App extends Component {
    render() {
        return (
            <div className="ui container"> 
                <Header title="Acme Contact Management"/>
                <SearchBar />
            </div>
        )
    }
}

export default App
