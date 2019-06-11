import React from 'react';

const Header = (props) => {
    return (
        <div className="ui block header">
            {props.title}    
        </div>
    );
}

export default Header;