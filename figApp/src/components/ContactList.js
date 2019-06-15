import React from 'react';

const ContactList = props => {
    
    return props.contacts.map((contact) => {
        return  (
            <tr key={contact.id}>
            <td data-label="First">{contact.first_name}</td>
            <td data-label="Last">{contact.last_name}</td>
            <td data-label="Email">{contact.email}</td>
            <td data-label="Phone">{contact.phone1}</td>
            </tr>
        );
    });
};

export default ContactList;
