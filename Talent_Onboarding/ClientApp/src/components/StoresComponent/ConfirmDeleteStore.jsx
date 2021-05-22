import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import axios from 'axios'

const ConfirmDeleteStore = (props) => {
    const { open, toggleModal, id, name, getStores } = props;

    //recommend to use arrow function 
    const deleteStore = (id) => {
        axios.delete(`Stores/DeleteStore/${id}`)
            .then((res) => {
                console.log(res.data)
                getStores();
                toggleModal();
            })
            .catch((err) => {
                console.log(err)
            });
    };


   
    return (
        <Modal open={open}
            onClose={toggleModal}>
            <Header icon='archive' content='Delete Store Alert!' />
            <Modal.Content>
                <p>
                    Do you want to delete Store: <span className="bold">{name} ?</span>
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={toggleModal}>
                    <Icon name='remove' /> No
        </Button>
                <Button color='green' onClick={() => deleteStore(id)}>
                    <Icon name='checkmark' /> Yes
        </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ConfirmDeleteStore;