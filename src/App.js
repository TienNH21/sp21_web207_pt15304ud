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
  const [clickRow, setClickRow] = useState(-1);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
  });

  const onRowClick = (event, value, index) => {
    setClickRow(index);
    setFormData(value);
  }

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{
            height: '100vh'
          }}>
          <CreateProduct
            onFormSubmit={ onFormSubmit }
            onInputChange={ onInputChange }
            formData={ formData }/>
          <ListProduct
            onRowClick={onRowClick}
            data={ products }/>
        </Typography>

      </Container>
    </React.Fragment>
  );
}

export default App;
