import React, {useEffect, useState} from 'react'
import { Button,Form, Modal } from 'semantic-ui-react'
import axios from 'axios'

const CreateProduct = (props) => {
    const [ name, setName ] = useState();
    const [price, setPrice] = useState();


    const { open, toggleModal, getProducts } = props;


    //recommend to use arrow function 
    const createProduct = () => {
        console.log(typeof parseFloat(price));
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (name === undefined) {
            alert("Product Name is required");
            return;
        }
        if (price === undefined) {
            alert("Proce is required");
            return;
        }
        if (name.length > 50) {
            alert("Product Name Characters Exceeded: MAX:50");
            return;
        }
        var floatprice = parseFloat(price)
        var startrange = parseFloat("1")
        var endrange = parseFloat("10000000")
        if (floatprice > endrange || floatprice < startrange) {
            alert("Price must be between 1 and 10000000");
            return;
        }
        if (format.test(name)) {
            alert("Special Characters not allowed for Product Name");
            return;
        }

        axios.post("Products/PostProduct", {
            name: name,
            price: price,
        })
            .then((res) => {
                getProducts();
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
            <Modal.Header>Create Product</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Product Name</label>
                            <input placeholder='Please Enter Product Name' onChange={(e) => setName(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Product Price</label>
                            <input type='number' placeholder='Please Enter Product Price' onChange={(e) => setPrice(e.target.value)} />
                        </Form.Field>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='yellow' onClick={toggleModal}>
                    Cancel
                </Button>

                <Button color='green' onClick={createProduct}>
                    Create
                </Button>

            </Modal.Actions>
        </Modal>
    );
};

export default CreateProduct;