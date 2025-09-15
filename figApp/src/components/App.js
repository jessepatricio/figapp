import React, { useState, useEffect, useCallback } from 'react'

import Header from './Header';
import SearchBar from './SearchBar';

import ContactList from './ContactList';
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
        // build query string for fetch
        const params = new URLSearchParams({
            pageNumber: pageNumber.toString(),
            searchText: searchText.toLowerCase(),
        });


       fetch(`https://localhost:5001/api/contacts?${params.toString()}`, { 
            method: 'GET',    
            headers: { 
                'Accept': 'application/json',
                },
            }).then(res => {
                // First, check for an HTTP error.
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`);
                }

                 // Get the header inside this block, where 'res' is defined.
                const paginationHeader = res.headers.get('X-Pagination');
                // Return a Promise that resolves with the parsed JSON data and the header.
                return res.json().then(data => {
                // Here, we have access to both 'data' and 'paginationHeader'.
                // We return a single object to be passed to the next .then() block.
                  //parse pagination header
                const pagination = JSON.parse(paginationHeader);
                const { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
                
                //update state variables
                setContacts(Array.isArray(data) ? data : []);
                setCurrentPage(currentPage > 0 ? currentPage : 1);
                setItemsPerPage(itemsPerPage);
                setTotalItems(totalItems);
                setTotalPages(totalPages);
             
                return { data, paginationHeader };
                });
            })
            .then(({ data, paginationHeader }) => {
                //handle pagination
                if (!paginationHeader) {
                    console.warn('X-Pagination header missing, using fallback');
                    setContacts([]);
                    setCurrentPage(1);
                    setItemsPerPage(10);
                    setTotalItems(0);
                    setTotalPages(0);
                    return;
            }}).catch(error => {
                console.error('Error fetching contacts:', error);
                // Set fallback state on error
                    setContacts([]);
                    setCurrentPage(1);
                    setItemsPerPage(10);
                    setTotalItems(0);
                    setTotalPages(0);
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
