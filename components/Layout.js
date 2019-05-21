import React from 'react';
import Header from './Header';
import {Container} from 'semantic-ui-react';

//directly exporting a functional component
export default props => {
  return (
    <div>
      <Container>
        <Header />
        {props.children}
      </Container>
    </div>
  )
};