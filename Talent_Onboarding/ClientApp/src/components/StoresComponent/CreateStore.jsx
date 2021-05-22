import React, {useEffect, useState} from 'react'
import { Button,Form, Modal } from 'semantic-ui-react'
import axios from 'axios'

const CreateStore = (props) => {
    const [ name, setName ] = useState();
    const [address, setAddress] = useState();


    const { open, toggleModal, getStores } = props;


    //recommend to use arrow function 
    const createStore = () => {
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (name === undefined) {
            alert("Customer Name is required");
            return;
        }
        if (address === undefined) {
            alert("Address is required");
            return;
        }
        if (name.length > 50) {
            alert("Customer Name Characters Exceeded: MAX:50");
            return;
        }
        if (address > 100) {
            alert("Address Characters Exceeded: MAX:100");
            return;
        }
        if (format.test(name)) {
            alert("Special Characters not allowed for Name");
            return;
        }

        axios.post("Stores/PostStore", {
            name: name,
            address: address,
        })
            .then((res) => {
                getStores();
                toggleModal();
            })
            .catch((err) => {
                console.log(err)
            });
    };

    //useEffect(() => {

    //});


    return (
        <Modal open={open}
            onClose={toggleModal}>
            <Modal.Header>Create Store</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Store Name</label>
                            <input placeholder='Please Enter Store Name' onChange={(e) => setName(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Store Address</label>
                            <input placeholder='Please Enter Store Address' onChange={(e) => setAddress(e.target.value)} />
                        </Form.Field>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='yellow' onClick={toggleModal}>
                    Cancel
                </Button>

                <Button color='green' onClick={createStore}>
                    Create
                </Button>

            </Modal.Actions>
        </Modal>
    );
};

export default CreateStore;