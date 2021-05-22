import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Dropdown } from 'semantic-ui-react'
import axios from 'axios'

const UpdateSale = (props) => {
    const { open, toggleModal, getSales, id,currentDate,currentCustomer, currentProduct,currentStore } = props;


    const [customerlist] = useState([]);
    const [productlist] = useState([]);
    const [storelist] = useState([]);

    const [date, setDate] = useState();
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedStoreId, setSelectedStoreId] = useState(null);

    const [updateDateStatus, setupdateDateStatus] = useState(false);
    const [updateCustomerStatus, setupdateCustomerStatus] = useState(false);
    const [updateProductStatus, setupdateProductStatus] = useState(false);
    const [updateStoreStatus, setupdateStoreStatus] = useState(false);


    //recommend to use arrow function 
    const updateSale = (id) => {   

        
        axios.put(`Sales/PutSales/${id}`, {
            id: id,
            productId: updateProductStatus ? selectedProductId : currentProduct.id,
            customerId: updateCustomerStatus ? selectedCustomerId : currentCustomer.id,
            storeId: updateStoreStatus ? selectedStoreId : currentStore.id,
            dateSold: updateDateStatus ? date : currentDate
            
        })
            .then((res) => {
                getSales();
                toggleModal();
                setupdateCustomerStatus(false);       
                setupdateProductStatus(false);   
                setupdateStoreStatus(false);
                setupdateDateStatus(false);       

            })
            .catch((err) => {
                console.log(err)
                
            });
    };

   
    function getCurrentCustomer() {
        try {
            const custval = customerlist.find(x => x.key === currentCustomer.id);
            if (custval !== undefined && custval != null) return custval.value;
        }
        catch {
            return;
        }
    }

    function getCurrentProduct() {
        try {
            const prodval = productlist.find(x => x.key === currentProduct.id);
            if (prodval !== undefined && prodval != null) return prodval.value;
        }
        catch {
            return;
        }
    }

    function getCurrentStore() {
        try {
            const storeval = storelist.find(x => x.key === currentStore.id);
            if (storeval !== undefined && storeval != null) return storeval.value;
        }
        catch {
            return;
        }
    }
    

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
            <Modal.Header>Update Sale</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Sale Name</label>
                            <input type="datetime-local" defaultValue={currentDate} placeholder='' onChange={(e) => { setDate(e.target.value); setupdateDateStatus(true) }} />
                        </Form.Field>
                        <Form.Field>
                            <label>Choose Customer</label>
                            <Dropdown defaultValue={getCurrentCustomer()} placeholder='Select Customer' search selection options={customerlist} onChange={(e, data) => {
                                const { value } = data;
                                const { key } = (data.options.find(x => x.value === value));
                                setSelectedCustomerId(key);
                                setupdateCustomerStatus(true);
                            }} />

                        </Form.Field>
                        <Form.Field>
                            <label>Choose Product</label>
                            <Dropdown defaultValue={getCurrentProduct()} placeholder='Select Product' search selection options={productlist} onChange={(e, data) => {
                                const { value } = data;
                                const { key } = (data.options.find(x => x.value === value));
                                setSelectedProductId(key);
                                setupdateProductStatus(true);

                            }} />
                        </Form.Field>
                        <Form.Field>
                            <label>Choose Store</label>
                            <Dropdown defaultValue={getCurrentStore()} placeholder='Select Store' search selection options={storelist} onChange={(e, data) => {
                                const { value } = data;
                                const { key } = (data.options.find(x => x.value === value));
                                setSelectedStoreId(key);
                                setupdateStoreStatus(true);

                            }} />
                        </Form.Field>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='yellow' onClick={toggleModal}>
                    Cancel
                </Button>

                <Button color='green' onClick={()=>updateSale(id)}>
                    Update
                </Button>

            </Modal.Actions>
        </Modal>
    );
};

export default UpdateSale