import React from 'react';

import { Button, Icon, Table } from 'semantic-ui-react'



const ActionsSale = (props) => {
    const { sal, toggledelModal, togglePutModal} = props;

    return (

        <Table.Body>
            {sal.map((s) => (

                <Table.Row key={s.id}>
                    <Table.Cell>{s.customer.name}</Table.Cell>
                    <Table.Cell>{s.product.name}</Table.Cell>
                    <Table.Cell>{s.store.name}</Table.Cell>
                    <Table.Cell>{s.dateSold}</Table.Cell>

                    <Table.Cell>
                    {/*    <ConfirmDeleteSale open={toggleDeleteModal} toggleModal={this.toggledelModal} id={this.state.id} name={this.state.name} getSales={this.getSales} />*/}
                       <Button onClick={() => toggledelModal(s.id, s.dateSold)} color='red'><Icon name="trash" /> Delete</Button>

                        {/*    <UpdateSale open={toggleUpdateModal} toggleModal={this.togglePutModal} getSales={this.getSales} id={this.state.id} currentName={this.state.name} currentAddress={this.state.address} />*/}
                        <Button onClick={() => togglePutModal(s.id, s.dateSold, s.customer, s.product,s.store)} color='orange'><Icon name="edit" /> Edit</Button>
                    </Table.Cell>

                </Table.Row>
            ))}


        </Table.Body>

    )
}

export default ActionsSale;