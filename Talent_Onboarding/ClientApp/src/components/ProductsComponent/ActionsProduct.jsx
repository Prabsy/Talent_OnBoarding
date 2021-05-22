import React from 'react';

import { Button, Icon, Table } from 'semantic-ui-react'



const ActionsProduct = (props) => {
    const { prod, toggledelModal, togglePutModal} = props;

    return (

        <Table.Body>
            {prod.map((p) => (

                <Table.Row key={p.id}>
                    <Table.Cell>{p.name}</Table.Cell>
                    <Table.Cell>{p.price}</Table.Cell>
                    <Table.Cell>
                       <Button onClick={() => toggledelModal(p.id, p.name)} color='red'><Icon name="trash" /> Delete</Button>

                        <Button onClick={() => togglePutModal(p.id, p.name, p.price)} color='orange'><Icon name="edit" /> Edit</Button>
                    </Table.Cell>

                </Table.Row>
            ))}


        </Table.Body>

    )
}

export default ActionsProduct;