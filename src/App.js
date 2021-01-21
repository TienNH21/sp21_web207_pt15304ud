import './App.css';
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import ListProduct from './components/products/ListProduct';
import CreateProduct from './components/products/CreateProduct';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

function App() {
  const initValue = [
    {
      id: 1,
      name: 'IPhone 12',
      price: '19,999,999.00 VND',
    },
    {
      id: 2,
      name: 'IPhone 11',
      price: '12,999,999.00 VND',
    },
    {
      id: 3,
      name: 'Oppo',
      price: '6,000,000.00 VND',
    }
  ];

  const [products, setProduct] = useState(initValue);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{
            height: '100vh'
          }}>
          <CreateProduct />
          <ListProduct data={ products }/>
        </Typography>

      </Container>
    </React.Fragment>
  );
}

export default App;
