import React, {useEffect, useState} from 'react'
import { Button,Form, Modal } from 'semantic-ui-react'
import axios from 'axios'

const UpdateStore = (props) => {
    const { open, toggleModal, getStores, id, currentName, currentAddress } = props;

    const [sname, setName] = useState(currentName);
    const [saddress, setAddress] = useState(currentAddress);
    const [updateNameStatus, setupdateNameStatus] = useState(false);
    const [updateAddressStatus, setupdateAddressStatus] = useState(false);


    //recommend to use arrow function 
    const updateStore = (id) => {
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (sname === "") {
            alert("Customer Name is required");
            return;
        }
        if (saddress === "") {
            alert("Address is required");
            return;
        }
        if (sname.length > 50) {
            alert("Customer Name Characters Exceeded: MAX:50");
            return;
        }
        if (saddress > 100) {
            alert("Address Characters Exceeded: MAX:100");
            return;
        }
        if (format.test(sname)) {
            alert("Special Characters not allowed for Name");
            return;
        }
       
        axios.put(`Stores/PutStore/${id}`, {
            id:id,
            name: updateNameStatus ? sname : currentName,
            address: updateAddressStatus ? saddress : currentAddress
        })
            .then((res) => {
                getStores();
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
    }, [sname, saddress])

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
            <Modal.Header>Update Store</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Store Name</label>
                            <input placeholder='Please Enter Store Name' defaultValue={currentName} onChange={(e) => updateName(e)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Store Address</label>
                            <input placeholder='Please Enter Store Address' defaultValue={currentAddress} onChange={(e) => updateAddress(e)} />
                        </Form.Field>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='yellow' onClick={toggleModal}>
                    Cancel
                </Button>

                <Button color='green' onClick={()=>updateStore(id)}>
                    Update
                </Button>

            </Modal.Actions>
        </Modal>
    );
};

export default UpdateStore;