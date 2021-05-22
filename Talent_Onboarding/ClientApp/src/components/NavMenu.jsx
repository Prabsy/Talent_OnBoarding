import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export class NavMenu extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu inverted>
                <Menu.Item
                    as={NavLink}
                    name='home'
                    to="/"
                    name="home"
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    as={NavLink}
                    name='Customers'
                    to="/Customers"
                    name="Customers"
                    active={activeItem === 'Customers'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    as={NavLink}
                    name='Products'
                    to="/Products"
                    name="Products"
                    active={activeItem === 'Products'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    as={NavLink}
                    name='Stores'
                    to="/Stores"
                    name="Stores"
                    active={activeItem === 'Stores'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    as={NavLink}
                    name='Sales'
                    to="/Sales"
                    name="Sales"
                    active={activeItem === 'Sales'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}