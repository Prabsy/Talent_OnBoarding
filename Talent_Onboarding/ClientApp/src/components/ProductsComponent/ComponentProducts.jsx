import React, {useState, Component } from 'react';
import axios from 'axios'
import { Button, Icon, Table, Pagination, Menu, Dropdown } from 'semantic-ui-react'
import ConfirmDeleteProduct from './ConfirmDeleteProduct'
import CreateProduct from './CreateProduct'
import UpdateProduct from './UpdateProduct'
import ActionsProduct from './ActionsProduct'


class ComponentProducts extends Component {
    static displayName = ComponentProducts.name;
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            toggleCreateModal: false,
            toggleDeleteModal: false,
            toggleUpdateModal: false,
            togglesortnamedesc: false,
            togglesortpricedesc: false,
            id: 0,
            name: "",
            price: "",
            currentpage: 1,
            postsPerPage:3
        };
    }

    
    
    componentDidMount() {
        console.log("componentDidMount");
        this.getProducts();

    }
    //recommend to use arrow function 
    getProducts = () => {
        axios.get('Products/GetProduct')
            .then((res) => {
                this.setState({
                    products: res.data,
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

    pageevent = () => {
        console.log(this.currentpage);
    }

    togglePutModal = (idnum, productname,price) => {
        this.setState({ toggleUpdateModal: !this.state.toggleUpdateModal })
        this.setState({ id: idnum })
        this.setState({ name: productname })
        this.setState({ price: price })

    }

    toggledelModal = (idnum, productname) => {
        this.setState({ toggleDeleteModal: !this.state.toggleDeleteModal })
        this.setState({ id: idnum })
        this.setState({ name: productname })
    }
   
    togglePostModal = () => {
        this.setState({ toggleCreateModal: !this.state.toggleCreateModal })

    }

    sortByName = () => {
        if (this.state.togglesortnamedesc == false) {
            this.setState({ products: this.state.products.sort((a, b) => a.name < b.name ? 1 : -1) })
            this.setState({ togglesortnamedesc: !this.state.togglesortnamedesc })
        }
        else {
            this.setState({ products: this.state.products.sort((a, b) => a.name > b.name ? 1 : -1) })
            this.setState({ togglesortnamedesc: !this.state.togglesortnamedesc })

        }
    }
    sortByPrice = () => {
        if (this.state.togglesortpricedesc == false) {
            this.setState({ products: this.state.products.sort((a, b) => a.price < b.price ? 1 : -1) })
            this.setState({ togglesortpricedesc: !this.state.togglesortpricedesc })
        }
        else {
            this.setState({ products: this.state.products.sort((a, b) => a.price > b.price ? 1 : -1) })
            this.setState({ togglesortpricedesc: !this.state.togglesortpricedesc })

        }
    }
    render() {

        const { products, toggleCreateModal, toggleDeleteModal, toggleUpdateModal, postsPerPage } = this.state;
        const indexOfLastPost = this.state.currentpage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
        const totalPages = Math.ceil(products.length / postsPerPage);
        const options = [
            { key: 1, text: '3', value: 3 },
            { key: 2, text: '5', value: 5 },
            { key: 3, text: '10', value: 10 },
        ]
        return (
            <div>
                <h1 id="tabelLabel" >Product Details</h1>
                <CreateProduct open={toggleCreateModal} toggleModal={this.togglePostModal} getProducts={this.getProducts} />
                <Button primary onClick={() => this.togglePostModal()}><Icon name="add" />Create Product</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name<Icon onClick={this.sortByName} name="sort" /></Table.HeaderCell>
                            <Table.HeaderCell>Price($)<Icon onClick={this.sortByPrice} name="sort" /></Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <ActionsProduct prod={currentPosts} toggledelModal={this.toggledelModal} togglePutModal={this.togglePutModal} />
                    <ConfirmDeleteProduct open={toggleDeleteModal} toggleModal={this.toggledelModal} id={this.state.id} name={this.state.name} getProducts={this.getProducts} />
                    <UpdateProduct open={toggleUpdateModal} toggleModal={this.togglePutModal} getProducts={this.getProducts} id={this.state.id} currentName={this.state.name} currentPrice={this.state.price} />

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


export default ComponentProducts;


