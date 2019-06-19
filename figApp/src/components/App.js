import React from 'react'

import Header from './Header';
import SearchBar from './SearchBar';

import ContactList from './ContactList';
import contactAPI from './api/fig-contacts-api';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

class App extends React.Component {
    state = { 
        contacts: [],
        currentPage: 0,
        itemsPerPage: 0,
        totalItems: 0,
        totalPages: 0,
        keyword: '' 
    };

    componentDidMount() {

        contactAPI.get('/contacts', { 
            params: { 
                    pageNumber: this.state.pageNumber,
                    keyword: this.state.keyword 
                        }
                    })
            .then(res => {
            //get header pagination
            var pagination = JSON.parse(res.headers.pagination);
            //console.log(pagination);
            //destructure json
            const { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
            //console.log(res.data);
            //console.log(`keyword: ` + this.state.srcText + ` curPage: ` + currentPage + ` perPage ` + itemsPerPage + ` totItems ` + totalItems + ` totalPages ` + totalPages);
            //update state variables
            this.setState({ 
                contacts: res.data,
                currentPage: (currentPage > 0) ? currentPage : 1,
                itemsPerPage: itemsPerPage,
                totalItems: totalItems,
                totalPages: totalPages 
            });
        });
        
    }
    
    //submit function will call api and return data
    onSearchSubmit = async (srcText) =>  {

        this.setState({ keyword: srcText }); 
        
        contactAPI.get('/contacts', { 
            params: { 
                searchText: srcText.toLowerCase()
            }
        }).then(res => {

             //get header pagination
             var pagination = JSON.parse(res.headers.pagination);
             //console.log(pagination);
             //destructure json
             const { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
           
            this.setState({ 
                contacts: res.data,
                currentPage: (currentPage > 0) ? currentPage : 1,
                itemsPerPage: itemsPerPage,
                totalItems: totalItems,
                totalPages: totalPages     
            });
        });
        
       
    };

    onChange = (page) => {
        //set clicked page
        this.setState( {
            currentPage: page
        });
        //api call
        contactAPI.get('/contacts', { 
                params: { 
                        pageNumber: page,
                        searchText: this.state.keyword
                }
            }).then(res => {
            //get header pagination
            var pagination = JSON.parse(res.headers.pagination);
            //destructure json
            const { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
           
            //debug value test
            //console.log(res.data);
            //console.log(`curPage: ` + currentPage + ` perPage ` + itemsPerPage + ` totItems ` + totalItems + ` totalPages ` + totalPages);
           
            //update state variables
            this.setState({ 
                contacts: res.data,
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                totalItems: totalItems,
                totalPages: totalPages 
            });
        });
       
    }

    
    render() {
        return (
            <div className="ui container"> 
                <Header title="Acme Contact Management"/>
                <SearchBar onSubmit={ this.onSearchSubmit }  />
                <table className="ui orange celled table">
                    <thead>
                    <tr>
                        <th>First</th><th>Last</th><th>Email</th><th>Phone</th>
                    </tr>
                    </thead>
                    <tbody>
                        <ContactList contacts={this.state.contacts} />
                        <tr>
                        <td colSpan="4">Total Records: {this.state.totalItems}</td>
                    </tr>
                    </tbody>         
                </table>
                <Pagination 
                    onChange={this.onChange} 
                    current={this.state.currentPage} 
                    total={this.state.totalItems}
                    defaultCurrent={1}
                    />
            </div>
        )
    }
}

export default App
