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
        totalPages: 0 
    };

    componentDidMount() {

        contactAPI.get('/contacts', { 
            params: { 
                    pageNumber: this.state.pageNumber 
                        }
                    })
            .then(res => {
            //get header pagination
            var pagination = JSON.parse(res.headers.pagination);
            //console.log(pagination);
            //destructure json
            const { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
            //console.log(res.data);
            console.log(`curPage: ` + currentPage + ` perPage ` + itemsPerPage + ` totItems ` + totalItems + ` totalPages ` + totalPages);
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
        
        contactAPI.get('/contacts', { 
            params: { query:  srcText.toLowerCase() }
        }).then(res => {
            // add filter keyword
            var results = res.data.filter(item => item.first_name.toLowerCase().indexOf(srcText) !== -1
                || item.last_name.toLowerCase().indexOf(srcText) !== -1 
                || item.email.toLowerCase().indexOf(srcText) !== -1 
                || item.phone1.toLowerCase().indexOf(srcText) !== -1);
            // set state
            this.setState({ contacts: results });
        });
        
       
    };

    onChange = (page) => {
        console.log(page);
       
        this.setState( {
            currentPage: page
        });

        contactAPI.get('/contacts', { 
            params: { 
                    pageNumber: page
                        }
                    })
            .then(res => {
            //get header pagination
            var pagination = JSON.parse(res.headers.pagination);
            console.log(pagination);
            //destructure json
            const { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
            //console.log(res.data);
            console.log(`curPage: ` + currentPage + ` perPage ` + itemsPerPage + ` totItems ` + totalItems + ` totalPages ` + totalPages);
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
