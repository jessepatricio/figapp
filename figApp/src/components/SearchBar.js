import React, { Component } from 'react'

export class SearchBar extends Component {
    state = { srcText: '' };

    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(this.state.srcText);
    }

    render() {
        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">  
                    <label labelfor="searchbox">Search Contacts: </label>
                    <input id="searchbox" 
                        type="text"
                        value={this.state.srcText} 
                        onChange={e => this.setState({ srcText: e.target.value })}
                         />
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar
