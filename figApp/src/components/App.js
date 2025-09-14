import React, { useState, useEffect, useCallback } from 'react'

import Header from './Header';
import SearchBar from './SearchBar';

import ContactList from './ContactList';
import { contactAPI } from './api/fig-contacts-api';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState('');

    const fetchContacts = useCallback((pageNumber = 1, searchText = '') => {
        contactAPI.get('/contacts', { 
            params: { 
                pageNumber: pageNumber,
                searchText: searchText.toLowerCase()
            }
        }).then(res => {
            //get header pagination
            const pagination = JSON.parse(res.headers.pagination);
            //destructure json
            const { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
            
            //update state variables
            setContacts(res.data);
            setCurrentPage(currentPage > 0 ? currentPage : 1);
            setItemsPerPage(itemsPerPage);
            setTotalItems(totalItems);
            setTotalPages(totalPages);
        }).catch(error => {
            console.error('Error fetching contacts:', error);
        });
    }, []);

    useEffect(() => {
        fetchContacts(1, keyword);
    }, [fetchContacts, keyword]);
    
    //submit function will call api and return data
    const onSearchSubmit = useCallback((srcText) => {
        setKeyword(srcText);
    }, []);

    const onChange = useCallback((page) => {
        setCurrentPage(page);
        fetchContacts(page, keyword);
    }, [fetchContacts, keyword]);

    return (
        <div className="ui container"> 
            <Header title="Acme Contact Management"/>
            <SearchBar onSubmit={onSearchSubmit} />
            <table className="ui orange celled table">
                <thead>
                <tr>
                    <th>First</th><th>Last</th><th>Email</th><th>Phone</th>
                </tr>
                </thead>
                <tbody>
                    <ContactList contacts={contacts} />
                    <tr>
                    <td colSpan="4">Total Records: {totalItems}</td>
                </tr>
                </tbody>         
            </table>
            <Pagination 
                onChange={onChange} 
                current={currentPage} 
                total={totalItems}
                defaultCurrent={1}
                />
        </div>
    );
}

export default App
