import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import axios from 'axios'

const ConfirmDeleteCustomer = (props) => {
    const { open, toggleModal, id, name, getCustomers } = props;

    //recommend to use arrow function 
    const deleteCustomer = (id) => {
        axios.delete(`Customers/DeleteCustomer/${id}`)
            .then((res) => {
                console.log(res.data)
                getCustomers();
                toggleModal();
            })
            .catch((err) => {
                console.log(err)
            });
    };


   
    return (
        <Modal open={open}
            onClose={toggleModal}>
            <Header icon='archive' content='Delete Customer Alert!' />
            <Modal.Content>
                <p>
                    Do you want to delete Customer: <span className="bold">{name} ?</span>
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={toggleModal}>
                    <Icon name='remove' /> No
        </Button>
                <Button color='green' onClick={() => deleteCustomer(id)}>
                    <Icon name='checkmark' /> Yes
        </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ConfirmDeleteCustomer