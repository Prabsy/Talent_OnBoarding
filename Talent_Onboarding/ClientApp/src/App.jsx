import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout, Footer } from './components/Layout';
import { Home } from './components/Home';
import './custom.css'
import ComponentCustomers from './components/CustomersComponent/ComponentCustomers'
import ComponentProducts from './components/ProductsComponent/ComponentProducts'
import ComponentStores from './components/StoresComponent/ComponentStores'
import ComponentSales from './components/SalesComponent/ComponentSales'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/Customers' component={ComponentCustomers} />
            <Route path='/Products' component={ComponentProducts} />
            <Route path='/Stores' component={ComponentStores} />
            <Route path='/Sales' component={ComponentSales} />

            {/*<Route path='/Products' component={FetchData} />*/}
            

        </Layout>
     
    );
    }

   
}
