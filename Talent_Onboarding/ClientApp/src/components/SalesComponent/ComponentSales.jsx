import React, {useState, Component } from 'react';
import axios from 'axios'
import { Button, Icon, Table, Pagination, Menu, Dropdown } from 'semantic-ui-react'
import ConfirmDeleteSale from './ConfirmDeleteSale'
import CreateSale from './CreateSale'
import UpdateSale from './UpdateSale'
import ActionsSale from './ActionsSales'


class ComponentSales extends Component {
    static displayName = ComponentSales.name;
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            toggleCreateModal: false,
            toggleDeleteModal: false,
            toggleUpdateModal: false,
            togglesortnamedesc: false,
            togglesortproddesc: false,
            togglesortstoredesc: false,
            togglesortdatedesc: false,
            id: 0,
            dateSold: null,
            custname: Object,
            product: Object,
            store: Object,
            currentpage: 1,
            postsPerPage:3
        };
    }

    
    
    componentDidMount() {


        console.log("componentDidMount Sales");
        this.getSales();

    }
    //recommend to use arrow function 
    getSales = () => {
        try {
            axios.get('Sales/GetSales')
                .then((res) => {

                    this.setState({
                        sales: res.data,
                    })
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        catch {

        }
    }


    componentDidUpdate() {
        console.log("componentDidUpdate");
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

  

    togglePutModal = (idnum, datesold,cname,prod,stor) => {
        this.setState({ toggleUpdateModal: !this.state.toggleUpdateModal })

        console.log(cname);
        this.setState({ id: idnum })
        this.setState({ dateSold: datesold })
        this.setState({ custname: cname })
        this.setState({ product: prod })
        this.setState({ store: stor })


    }

    toggledelModal = (idnum,datesold) => {
        this.setState({ toggleDeleteModal: !this.state.toggleDeleteModal })
        this.setState({ id: idnum })
        this.setState({ dateSold: datesold })
    }
   
    togglePostModal = () => {
        this.setState({ toggleCreateModal: !this.state.toggleCreateModal })

    }

    sortByName = () => {
        if (this.state.togglesortnamedesc == false) {
            this.setState({ sales: this.state.sales.sort((a, b) => a.customer.name < b.customer.name ? 1 : -1) })
            this.setState({ togglesortnamedesc: !this.state.togglesortnamedesc })
        }
        else {
            this.setState({ sales: this.state.sales.sort((a, b) => a.customer.name > b.customer.name ? 1 : -1) })
            this.setState({ togglesortnamedesc: !this.state.togglesortnamedesc })

        }
    }
    sortByProduct = () => {
        if (this.state.togglesortproddesc == false) {
            this.setState({ sales: this.state.sales.sort((a, b) => a.product.name < b.product.name ? 1 : -1) })
            this.setState({ togglesortproddesc: !this.state.togglesortproddesc })
        }
        else {
            this.setState({ sales: this.state.sales.sort((a, b) => a.product.name > b.product.name ? 1 : -1) })
            this.setState({ togglesortproddesc: !this.state.togglesortproddesc })

        }
    }
    sortByStore = () => {
        if (this.state.togglesortstoredesc == false) {
            this.setState({ sales: this.state.sales.sort((a, b) => a.store.name < b.store.name ? 1 : -1) })
            this.setState({ togglesortstoredesc: !this.state.togglesortstoredesc })
        }
        else {
            this.setState({ sales: this.state.sales.sort((a, b) => a.store.name > b.store.name ? 1 : -1) })
            this.setState({ togglesortstoredesc: !this.state.togglesortstoredesc })

        }
    }

    sortByDate = () => {
        if (this.state.togglesortdatedesc == false) {
            this.setState({ sales: this.state.sales.sort((a, b) => new Date(a.dateSold) < new Date(b.dateSold) ? 1 : -1) })
            this.setState({ togglesortdatedesc: !this.state.togglesortdatedesc })
        }
        else {
            this.setState({ sales: this.state.sales.sort((a, b) => new Date(a.dateSold) > new Date(b.dateSold) ? 1 : -1) })
            this.setState({ togglesortdatedesc: !this.state.togglesortdatedesc })

        }
    }


    render() {

        const { sales, toggleCreateModal, toggleDeleteModal, toggleUpdateModal, postsPerPage } = this.state;
        const indexOfLastPost = this.state.currentpage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = sales.slice(indexOfFirstPost, indexOfLastPost);
        const totalPages = Math.ceil(sales.length / postsPerPage);
        const options = [
            { key: 1, text: '3', value: 3 },
            { key: 2, text: '5', value: 5 },
            { key: 3, text: '10', value: 10 },
        ]
        return (
            <div>
                <h1 id="tabelLabel" >Sale Details</h1>
                <CreateSale open={toggleCreateModal} toggleModal={this.togglePostModal} getSales={this.getSales}/>
                <Button primary onClick={() => this.togglePostModal()}><Icon name="add" />Create Sale</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer<Icon onClick={this.sortByName} name="sort" /></Table.HeaderCell>
                            <Table.HeaderCell>Product<Icon onClick={this.sortByProduct} name="sort" /></Table.HeaderCell>
                            <Table.HeaderCell>Store<Icon onClick={this.sortByStore} name="sort" /></Table.HeaderCell>
                            <Table.HeaderCell>Date Sold<Icon onClick={this.sortByDate} name="sort" /></Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <ActionsSale sal={currentPosts} toggledelModal={this.toggledelModal} togglePutModal={this.togglePutModal} />
                        <ConfirmDeleteSale open={toggleDeleteModal} toggleModal={this.toggledelModal} id={this.state.id} datesold={this.state.dateSold} getSales={this.getSales} />
                    <UpdateSale open={toggleUpdateModal} toggleModal={this.togglePutModal}
                        getSales={this.getSales} id={this.state.id} currentDate={this.state.dateSold} currentCustomer={this.state.custname} currentProduct={this.state.product} currentStore={this.state.store} />

                    <Table.Footer>

                        
                        <Table.Row>
                            
                            <Table.HeaderCell colSpan="5">
                                <Menu floated="left" compact>
                                    <Dropdown onChange={(e, data) => this.setState({ postsPerPage: data.value})} placeholder='Rows/Page' options={options} simple item />
                                </Menu>
                                <Menu floated="right" pagination>
                                    <Menu.Item as="a" icon>
                                        <Icon name="chevron left" />
                                    </Menu.Item>

                                    <Pagination
                                        defaultActivePage={1}
                                        onPageChange={(event, data) => this.setState({ currentpage: data.activePage})}
                                        totalPages={totalPages}
                                    />
                                    <Menu.Item as="a" icon>
                                        <Icon name="chevron right" />
                                    </Menu.Item>
                                </Menu>

                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>

                </Table>
            </div>

        );
    }


}


export default ComponentSales;


