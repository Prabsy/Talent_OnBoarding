import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Dropdown } from 'semantic-ui-react'
import axios from 'axios'

const CreateSale = (props) => {
    const [customerlist] = useState([]);
    const [productlist] = useState([]);
    const [storelist] = useState([]);
    const [date, setDate] = useState(null);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedStoreId, setSelectedStoreId] = useState(null);


    const { open, toggleModal, getSales } = props;


    //recommend to use arrow function 
    const createSale = () => {

        if (date === null) {
            alert("Date of Sale is Required");
            return;
        }

        if (selectedCustomerId === null) {
            alert("Customer is Required");
            return;
        }
        if (selectedProductId === null) {
            alert("Product is Required");
            return;
        }
        if (selectedStoreId === null) {
            alert("Store is Required");
            return;
        }

        axios.post("Sales/PostSales", {
            productId: selectedProductId,
            customerId: selectedCustomerId,
            storeId: selectedStoreId,
            dateSold:date
        })
            .then((res) => {
                getSales();
                toggleModal();
            })
            .catch((err) => {
                console.log(err)
            });
    };

    //useEffect(() => {

    //});
    useEffect(() => {
        axios.get('Customers/GetCustomer')
            .then((res) => {
                console.log(res.data)
                res.data.forEach((c) => {
                    customerlist.push({
                        key: c.id,
                        text: c.name,
                        value: c.name
                    });
                });
            })
            .catch((err) => {
                console.log(err)
            });

        axios.get('Products/GetProduct')
            .then((res) => {
                console.log(res.data)
                res.data.forEach((p) => {
                    productlist.push({
                        key: p.id,
                        text: p.name,
                        value: p.name
                    });
                });
            })
            .catch((err) => {
                console.log(err)
            });

        axios.get('Stores/GetStore')
            .then((res) => {
                console.log(res.data)
                res.data.forEach((s) => {
                    storelist.push({
                        key: s.id,
                        text: s.name,
                        value: s.name
                    });
                });
            })
            .catch((err) => {
                console.log(err)
            });
        
    }, []);


    

    return (
        <Modal open={open}
            onClose={toggleModal}>
            <Modal.Header>Create Sale</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Sale Name</label>
                            <input type="datetime-local" placeholder='' onChange={(e) => setDate(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Choose Customer</label>
                            <Dropdown placeholder='Select Customer' search selection options={customerlist} onChange={(e, data) => {
                                const { value } = data;
                                const { key } = (data.options.find(x => x.value === value));
                                setSelectedCustomerId(key);
                            }} />

                        </Form.Field>
                        <Form.Field>
                            <label>Choose Product</label>
                            <Dropdown placeholder='Select Product' search selection options={productlist} onChange={(e, data) => {
                                const { value } = data;
                                const { key } = (data.options.find(x => x.value === value));
                                setSelectedProductId(key);
                            }} />
                        </Form.Field>
                        <Form.Field>
                            <label>Choose Store</label>
                            <Dropdown placeholder='Select Store' search selection options={storelist} onChange={(e, data) => {
                                const { value } = data;
                                const { key } = (data.options.find(x => x.value === value));
                                setSelectedStoreId(key);
                            }} />
                        </Form.Field>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='yellow' onClick={toggleModal}>
                    Cancel
                </Button>

                <Button color='green' onClick={createSale}>
                    Create
                </Button>

            </Modal.Actions>
        </Modal>
    );
};

export default CreateSale