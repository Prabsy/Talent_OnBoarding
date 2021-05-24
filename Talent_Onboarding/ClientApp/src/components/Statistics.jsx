import React, { useEffect,useState} from 'react'
import { Statistic } from 'semantic-ui-react'
import axios from 'axios'

const Statistics = () => {
    const [customer,setCustomerCount] = useState(0);
    const [product, setProductCount] = useState(0);
    const [store, setStoreCount] = useState(0);
    const [sales, setSalesCount] = useState(0);
    


    useEffect(() => {
        axios.get('Customers/GetCustomer')
            .then((res) => {
                setCustomerCount(res.data.length);
                setCustomerCount(res.data.length);
                
            })
            .catch((err) => {
                console.log(err)
            });

        axios.get('Products/GetProduct')
            .then((res) => {
                setProductCount(res.data.length);
                
            })
            .catch((err) => {
                console.log(err)
            });

        axios.get('Stores/GetStore')
            .then((res) => {
                setStoreCount(res.data.length);
                
            })
            .catch((err) => {
                console.log(err)
            });

        axios.get('Sales/GetSales')
            .then((res) => {
                setSalesCount(res.data.length);

            })
            .catch((err) => {
                console.log(err)
            });

    }, []);

    return (

        <Statistic.Group>
            <Statistic color='olive'>
                <Statistic.Value>{customer}</Statistic.Value>
                <Statistic.Label>Customers</Statistic.Label>
            </Statistic>
            <Statistic color='brown'>
                <Statistic.Value>{product}</Statistic.Value>
                <Statistic.Label>Products</Statistic.Label>
            </Statistic>
            <Statistic color='blue'>
                <Statistic.Value>{store}</Statistic.Value>
                <Statistic.Label>Stores</Statistic.Label>
            </Statistic>
            <Statistic color='green'>
                <Statistic.Value>{sales}</Statistic.Value>
                <Statistic.Label>Sales</Statistic.Label>
            </Statistic>

        </Statistic.Group>
    );
};

export default Statistics;