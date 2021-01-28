import './App.css';
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import ListProduct from './components/products/ListProduct';
import CreateProduct from './components/products/CreateProduct';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

function App() {
  const [products, setProduct] = useState([]);
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

  const onResetForm = () => {
    setClickRow(-1);
    setFormData({
      id: '',
      name: '',
      price: '',
    });
  }

  const url = 'https://5f2d045b8085690016922b50.mockapi.io/todo-list/products';

  useEffect(() => {
    axios({
      method: 'GET',
      url: url,
    })
      .then((repsonse) => {
        console.log('hello');
        const { data } = repsonse;
        setProduct(data);
      })
      .catch((error) => {
        console.log(error, error.repsonse);
      });
  }, [
    /*
     * useState sẽ gọi lại callback nếu giá trị các phần tử trong mảng thay đổi
     */
  ]);

  const onCreateProduct = () => {
    setProduct([
      ...products,
      formData,
    ]);
  }

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (clickRow == -1) {
      // Thêm mới
      onCreateProduct();
    } else {
      // Cập nhật
    }
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
            onResetForm={ onResetForm }
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
