import React from 'react';

import { Button, Icon, Table } from 'semantic-ui-react'



const ActionsCustomer = (props) => {
    const { cust, toggledelModal, togglePutModal} = props;

    return (

        <Table.Body>
            {cust.map((c) => (

                <Table.Row key={c.id}>
                    <Table.Cell>{c.name}</Table.Cell>
                    <Table.Cell>{c.address}</Table.Cell>
                    <Table.Cell>
                    {/*    <ConfirmDeleteCustomer open={toggleDeleteModal} toggleModal={this.toggledelModal} id={this.state.id} name={this.state.name} getCustomers={this.getCustomers} />*/}
                       <Button onClick={() => toggledelModal(c.id, c.name)} color='red'><Icon name="trash" /> Delete</Button>

                    {/*    <UpdateCustomer open={toggleUpdateModal} toggleModal={this.togglePutModal} getCustomers={this.getCustomers} id={this.state.id} currentName={this.state.name} currentAddress={this.state.address} />*/}
                        <Button onClick={() => togglePutModal(c.id, c.name, c.address)} color='orange'><Icon name="edit" /> Edit</Button>
                    </Table.Cell>

                </Table.Row>
            ))}


        </Table.Body>

    )
}

export default ActionsCustomer;