import React from 'react';

import { Button, Icon, Table } from 'semantic-ui-react'



const ActionsStore = (props) => {
    const { stor, toggledelModal, togglePutModal} = props;

    return (

        <Table.Body>
            {stor.map((s) => (

                <Table.Row key={s.id}>
                    <Table.Cell>{s.name}</Table.Cell>
                    <Table.Cell>{s.address}</Table.Cell>
                    <Table.Cell>
                    {/*    <ConfirmDeleteStore open={toggleDeleteModal} toggleModal={this.toggledelModal} id={this.state.id} name={this.state.name} getStores={this.getStores} />*/}
                       <Button onClick={() => toggledelModal(s.id, s.name)} color='red'><Icon name="trash" /> Delete</Button>

                    {/*    <UpdateStore open={toggleUpdateModal} toggleModal={this.togglePutModal} getStores={this.getStores} id={this.state.id} currentName={this.state.name} currentAddress={this.state.address} />*/}
                        <Button onClick={() => togglePutModal(s.id, s.name, s.address)} color='orange'><Icon name="edit" /> Edit</Button>
                    </Table.Cell>

                </Table.Row>
            ))}


        </Table.Body>

    )
}

export default ActionsStore;