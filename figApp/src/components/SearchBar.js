import React, { useState } from 'react'

function SearchBar({ onSubmit }) {
    const [srcText, setSrcText] = useState('');

    const onFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(srcText);
    }

    return (
        <div className="ui segment">
            <form onSubmit={onFormSubmit} className="ui form">
                <div className="field">  
                <label htmlFor="searchbox">Search Contacts: </label>
                <input id="searchbox" 
                    type="text"
                    value={srcText} 
                    onChange={e => setSrcText(e.target.value)}
                     />
                </div>
            </form>
        </div>
    )
}

export default SearchBar
