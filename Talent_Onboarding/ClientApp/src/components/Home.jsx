import React, { Component } from 'react';
import Statistics from './Statistics';

export class Home extends Component {
    static displayName = Home.name;


   


  render () {
    return (
        <div>
            <h1>Welcome to Sales portal</h1>

            <Statistics/>
      </div>
    );
  }
}
