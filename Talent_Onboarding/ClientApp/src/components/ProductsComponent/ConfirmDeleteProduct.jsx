import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import axios from 'axios'

const ConfirmDeleteProduct = (props) => {
    const { open, toggleModal, id, name, getProducts } = props;

    //recommend to use arrow function 
    const deleteProduct = (id) => {
        axios.delete(`Products/DeleteProduct/${id}`)
            .then((res) => {
                console.log(res.data)
                getProducts();
                toggleModal();
            })
            .catch((err) => {
                console.log(err)
            });
    };


   
    return (
        <Modal open={open}
            onClose={toggleModal}>
            <Header icon='archive' content='Delete Product Alert!' />
            <Modal.Content>
                <p>
                    Do you want to delete Product: <span className="bold">{name} ?</span>
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={toggleModal}>
                    <Icon name='remove' /> No
        </Button>
                <Button color='green' onClick={() => deleteProduct(id)}>
                    <Icon name='checkmark' /> Yes
        </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ConfirmDeleteProduct;