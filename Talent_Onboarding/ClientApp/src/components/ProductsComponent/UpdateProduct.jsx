import React, {useEffect, useState} from 'react'
import { Button,Form, Modal } from 'semantic-ui-react'
import axios from 'axios'

const UpdateProduct = (props) => {
    const { open, toggleModal, getProducts, id, currentName, currentPrice } = props;

    const [pname, setName] = useState(currentName);
    const [pprice, setPrice] = useState(currentPrice);
    const [updateNameStatus, setupdateNameStatus] = useState(false);
    const [updatePriceStatus, setupdatePriceStatus] = useState(false);


    //recommend to use arrow function 
    const updateProduct = (id) => {       
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (pname === "") {
            alert("Product Name is required");
            return;
        }
        if (pprice === "") {
            alert("Proce is required");
            return;
        }
        if (pname.length > 50) {
            alert("Product Name Characters Exceeded: MAX:50");
            return;
        }
        var floatprice = parseFloat(pprice)
        var startrange = parseFloat("1")
        var endrange = parseFloat("10000000")
        if (floatprice > endrange || floatprice < startrange) {
            alert("Price must be between 1 and 10000000");
            return;
        }
        if (format.test(pname)) {
            alert("Special Characters not allowed for Product Name");
            return;
        }

        axios.put(`Products/PutProduct/${id}`, {
            id:id,
            name: updateNameStatus ? pname : currentName,
            price: updatePriceStatus ? pprice : currentPrice,
        })
            .then((res) => {
                getProducts();
                toggleModal();
                setupdateNameStatus(false)
                setupdatePriceStatus(false)      
            })
            .catch((err) => {
                console.log(err)
                setupdateNameStatus(false)
                setupdatePriceStatus(false)      
            });
    };

    useEffect(() => {
        console.log(currentName);
        console.log(currentPrice);
        return () => {
            console.log("UpdateCustomer:UnMount a Component using Hook")

        }
    }, [pname, pprice])

    const updatePrice = (e) => {
        setPrice(e.target.value)
        setupdatePriceStatus(true)
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
            <Modal.Header>Update Product</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Product Name</label>
                            <input placeholder='Please Enter Product Name' defaultValue={currentName} onChange={(e) => updateName(e)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Product Price</label>
                            <input type='number' placeholder='Please Enter Product Price' defaultValue={currentPrice} onChange={(e) => updatePrice(e)} />
                        </Form.Field>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='yellow' onClick={toggleModal}>
                    Cancel
                </Button>

                <Button color='green' onClick={() => updateProduct(id)}>
                    Update
                </Button>

            </Modal.Actions>
        </Modal>
    );
};

export default UpdateProduct;