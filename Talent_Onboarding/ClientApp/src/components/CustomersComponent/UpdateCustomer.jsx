import React, {useEffect, useState} from 'react'
import { Button,Form, Modal } from 'semantic-ui-react'
import axios from 'axios'

const UpdateCustomer = (props) => {
    const { open, toggleModal, getCustomers, id, currentName, currentAddress } = props;

    const [cname, setName] = useState(currentName);
    const [caddress, setAddress] = useState(currentAddress);
    const [updateNameStatus, setupdateNameStatus] = useState(false);
    const [updateAddressStatus, setupdateAddressStatus] = useState(false);


    //recommend to use arrow function 
    const updateCustomer = (id) => {       
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (cname === "") {
            alert("Customer Name is required");
            return;
        }
        if (caddress === "") {
            alert("Address is required");
            return;
        }
        if (cname.length > 50) {
            alert("Customer Name Characters Exceeded: MAX:50");
            return;
        }
        if (caddress > 100) {
            alert("Address Characters Exceeded: MAX:100");
            return;
        }
        if (format.test(cname)) {
            alert("Special Characters not allowed for Name");
            return;
        }
        
        axios.put(`Customers/PutCustomer/${id}`, {
            id: id,
            name: updateNameStatus ? cname : currentName,
            address: updateAddressStatus ? caddress : currentAddress
        })
            .then((res) => {
                getCustomers();
                toggleModal();
                setupdateNameStatus(false)
                setupdateAddressStatus(false)               
            })
            .catch((err) => {
                console.log(err)
                setupdateNameStatus(false)
                setupdateAddressStatus(false)
            });
    };

    useEffect(() => {
        console.log(currentName);
        console.log(currentAddress);
        return () => {
            console.log("UpdateCustomer:UnMount a Component using Hook")
            
        }
    }, [cname, caddress])
    
    const updateAddress = (e) => {
        setAddress(e.target.value)
        setupdateAddressStatus(true)
        console.log("Comp1:updateAddress:" + e.target.value)
    }
    const updateName = (e) => {
        setName(e.target.value)
        setupdateNameStatus(true)
        console.log("Comp1:updateName:" + e.target.value)
    }

    return (

        <Modal open={open}
            onClose={toggleModal}>
            <Modal.Header>Update Customer</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Customer Name</label>
                            <input placeholder='Please Enter Customer Name' defaultValue={currentName} onChange={(e) => updateName(e)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Customer Address</label>
                            <input placeholder='Please Enter Customer Address' defaultValue={currentAddress} onChange={(e) => updateAddress(e)} />
                        </Form.Field>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='yellow' onClick={toggleModal}>
                    Cancel
                </Button>

                <Button color='green' onClick={()=>updateCustomer(id)}>
                    Update
                </Button>

            </Modal.Actions>
        </Modal>
    );
};

export default UpdateCustomer