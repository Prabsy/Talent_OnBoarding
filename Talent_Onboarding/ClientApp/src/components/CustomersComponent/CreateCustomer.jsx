import React, {useEffect, useState} from 'react'
import { Button,Form, Modal } from 'semantic-ui-react'
import axios from 'axios'

const CreateCustomer = (props) => {
    const [ name, setName ] = useState();
    const [address, setAddress] = useState();


    const { open, toggleModal, getCustomers } = props;


    //recommend to use arrow function 
    const createCustomer = () => {
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

       
        if (name === undefined) {
            alert("Customer Name is required");
            return;
        }
        if (address === undefined) {
            alert("Address is required");
            return;
        }
        if (name.length >50) {
            alert("Customer Name Characters Exceeded: MAX:50");
            return;            
        }
        if (address >100) {
            alert("Address Characters Exceeded: MAX:100");
            return;
        }
        if (format.test(name)) {
            alert("Special Characters not allowed for Name");
            return;
        }
        axios.post("Customers/PostCustomer", {
            name: name,
            address: address,
        })
            .then((res) => {
                getCustomers();
                toggleModal();
            })
            .catch((err) => {
                console.log(err.data)
            });
    };

    //useEffect(() => {

    //});

 
   

    return (
        <Modal open={open}
            onClose={toggleModal}>
            <Modal.Header>Create Customer</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Customer Name</label>
                            <input placeholder='Please Enter Customer Name' onChange={(e) => setName(e.target.value)} />
                            
                        </Form.Field>
                        
                        <Form.Field>
                            <label>Customer Address</label>
                            <input placeholder='Please Enter Customer Address' onChange={(e) => setAddress(e.target.value)} />
                        </Form.Field>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='yellow'  onClick={toggleModal}>
                    Cancel
                </Button>

                <Button color='green' onClick={createCustomer}>
                    Create
                </Button>

            </Modal.Actions>
        </Modal>
    );
};

export default CreateCustomer