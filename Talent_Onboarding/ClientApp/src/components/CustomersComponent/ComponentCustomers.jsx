import React, {useState, Component } from 'react';
import axios from 'axios'
import { Button, Icon, Table, Pagination, Menu, Dropdown } from 'semantic-ui-react'
import ConfirmDeleteCustomer from './ConfirmDeleteCustomer'
import CreateCustomer from './CreateCustomer'
import UpdateCustomer from './UpdateCustomer'
import ActionsCustomer from './ActionsCustomer'


class ComponentCustomers extends Component {
    static displayName = ComponentCustomers.name;
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            toggleCreateModal: false,
            toggleDeleteModal: false,
            toggleUpdateModal: false,
            togglesortnamedesc: false,
            togglesortaddrdesc: false,
            id: 0,
            name: "",
            address: "",
            currentpage: 1,
            postsPerPage:3
        };
    }

    
    
    componentDidMount() {


        console.log("componentDidMount");
        this.getCustomers();

    }
    //recommend to use arrow function 
    getCustomers = () => {
        axios.get('Customers/GetCustomer')
            .then((res) => {
                this.setState({
                    customers: res.data,
                })
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }


    componentDidUpdate() {
        console.log("componentDidUpdate");
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    

    togglePutModal = (idnum, custname,custaddr) => {
        this.setState({ toggleUpdateModal: !this.state.toggleUpdateModal })
        this.setState({ id: idnum })
        this.setState({ name: custname })
        this.setState({ address: custaddr })

    }

    toggledelModal = (idnum,custname) => {
        this.setState({ toggleDeleteModal: !this.state.toggleDeleteModal })
        this.setState({ id: idnum })
        this.setState({ name: custname })
    }
   
    togglePostModal = () => {
        this.setState({ toggleCreateModal: !this.state.toggleCreateModal })

    }

    sortByName = () => {
        if (this.state.togglesortnamedesc == false) {
            this.setState({ customers: this.state.customers.sort((a, b) => a.name < b.name ? 1 : -1) })
            this.setState({ togglesortnamedesc: !this.state.togglesortnamedesc })
        }
        else {
            this.setState({ customers: this.state.customers.sort((a, b) => a.name > b.name ? 1 : -1) })
            this.setState({ togglesortnamedesc: !this.state.togglesortnamedesc })

        }
    }
    sortByAddress = () => {
        if (this.state.togglesortaddrdesc == false) {
            this.setState({ customers: this.state.customers.sort((a, b) => a.address < b.address ? 1 : -1) })
            this.setState({ togglesortaddrdesc: !this.state.togglesortaddrdesc })
        }
        else {
            this.setState({ customers: this.state.customers.sort((a, b) => a.address > b.address ? 1 : -1) })
            this.setState({ togglesortaddrdesc: !this.state.togglesortaddrdesc })

        }
    }

    render() {

        const { customers, toggleCreateModal, toggleDeleteModal, toggleUpdateModal, postsPerPage } = this.state;
        const indexOfLastPost = this.state.currentpage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = customers.slice(indexOfFirstPost, indexOfLastPost);
        const totalPages = Math.ceil(customers.length / postsPerPage);
        const options = [
            { key: 1, text: '3', value: 3 },
            { key: 2, text: '5', value: 5 },
            { key: 3, text: '10', value: 10 },
        ]
        return (
            <div>
                <h1 id="tabelLabel" >Customer Details</h1>
                <CreateCustomer open={toggleCreateModal} toggleModal={this.togglePostModal} getCustomers={this.getCustomers} />
                <Button primary onClick={() => this.togglePostModal()}><Icon name="add" />Create Customer</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name<Icon onClick={this.sortByName} name="sort" /></Table.HeaderCell>
                            <Table.HeaderCell>Address<Icon onClick={this.sortByAddress} name="sort" /></Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <ActionsCustomer cust={currentPosts} toggledelModal={this.toggledelModal} togglePutModal={this.togglePutModal} />
                        <ConfirmDeleteCustomer open={toggleDeleteModal} toggleModal={this.toggledelModal} id={this.state.id} name={this.state.name} getCustomers={this.getCustomers} />
                    <UpdateCustomer open={toggleUpdateModal} toggleModal={this.togglePutModal}
                        getCustomers={this.getCustomers} id={this.state.id} currentName={this.state.name} currentAddress={this.state.address} />

                    <Table.Footer>

                        
                        <Table.Row>
                            
                            <Table.HeaderCell colSpan="4">
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


export default ComponentCustomers;


