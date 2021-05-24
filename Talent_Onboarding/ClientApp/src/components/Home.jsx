import React, {useEffect, Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;


    useEffect(() => {
        axios.get('Customers/GetCustomer')
            .then((res) => {
                console.log(res.data)
                
            })
            .catch((err) => {
                console.log(err)
            });

        axios.get('Products/GetProduct')
            .then((res) => {
                console.log(res.data)
               
            })
            .catch((err) => {
                console.log(err)
            });

        axios.get('Stores/GetStore')
            .then((res) => {
                console.log(res.data)                
            })
            .catch((err) => {
                console.log(err)
            });

        axios.get('Stores/GetStore')
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            });

    }, []);

  render () {
    return (
        <div>
            <h1>Welcome to Product Sale Portal</h1>
            <Statistic.Group>
                <Statistic color='olive'>
                    <Statistic.Value>27</Statistic.Value>
                    <Statistic.Label>red</Statistic.Label>
                </Statistic>
                <Statistic color='brown'>
                    <Statistic.Value>8'</Statistic.Value>
                    <Statistic.Label>orange</Statistic.Label>
                </Statistic>
                <Statistic color='blue'>
                    <Statistic.Value>8'</Statistic.Value>
                    <Statistic.Label>orange</Statistic.Label>
                </Statistic>
                <Statistic color='green'>
                    <Statistic.Value>28</Statistic.Value>
                    <Statistic.Label>yellow</Statistic.Label>
                </Statistic>
            </Statistic.Group>
      </div>
    );
  }
}
