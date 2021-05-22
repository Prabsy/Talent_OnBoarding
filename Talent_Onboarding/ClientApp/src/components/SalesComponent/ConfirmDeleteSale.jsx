import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import axios from 'axios'

const ConfirmDeleteSale = (props) => {
    const { open, toggleModal, id, datesold, getSales } = props;

    //recommend to use arrow function 
    const deleteSale = (id) => {
        axios.delete(`Sales/DeleteSales/${id}`)
            .then((res) => {
                console.log(res.data)
                getSales();
                toggleModal();
            })
            .catch((err) => {
                console.log(err)
            });
    };


   
    return (
        <Modal open={open}
            onClose={toggleModal}>
            <Header icon='archive' content='Delete Sale Alert!' />
            <Modal.Content>
                <p>
                    Do you want to delete Sale: <span className="bold">{datesold} ?</span>
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={toggleModal}>
                    <Icon name='remove' /> No
        </Button>
                <Button color='green' onClick={() => deleteSale(id)}>
                    <Icon name='checkmark' /> Yes
        </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ConfirmDeleteSale