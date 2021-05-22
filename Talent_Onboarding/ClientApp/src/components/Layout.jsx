import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
            </Container>

            <footer>
                <p>&#169; <a href="mailto:prabhanjansimha@gmail.com">Ram</a> MVP Studio</p>
                </footer>

      </div>
    );
  }
}
