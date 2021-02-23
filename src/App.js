import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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

  const limit = 10;
  const pageInit = 1;
  const [page, setPage] = useState(pageInit);

  const url = 'https://5f2d045b8085690016922b50.mockapi.io/todo-list/products?limit=' + limit +
    "&page=" + page;

  useEffect(() => {
    axios({
      method: 'GET',
      url: url,
    })
      .then((repsonse) => {
        const { data } = repsonse;
        setProduct(data);
      })
      .catch((error) => {
        console.log(error, error.repsonse);
      });
  }, [
    /*
     * useEffect sẽ gọi lại callback nếu giá trị các phần tử trong mảng thay đổi
     */
    page
  ]);

  const onCreateProduct = () => {
    const urlApiThemMoi = 'https://5f2d045b8085690016922b50.mockapi.io/todo-list/products';

    axios.post(urlApiThemMoi, formData)
      .then(function (response) {
        const { data } = response;
        setProduct([
          ...products,
          data,
        ]);
      })
      .catch(function (error) {
        console.error('error');
        console.error(error);
      });
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

  const btnDeleteOnClick = function (event, value, index) {
    const apiXoaUrl = `https://5f2d045b8085690016922b50.mockapi.io/todo-list/products/${ value.id }`;

    axios.delete(apiXoaUrl)
      .then(function (response) {
        const listNew = products.filter(function (val, idx) {
          if (idx == index) {
            return false; // Loại bỏ phần tử
          } else {
            return true; // Giữ lại phần tử
          }
        });

        setProduct(listNew);
      })
      .catch(function (error) {
        console.error('error');
        console.error(error);
      })
  }

  const trangTruoc = function () {
    if (page == 1) {
      return ;
    }

    setPage(page - 1);
  }

  const trangSau = function () {
    setPage(page + 1);
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
            btnDeleteOnClick={ btnDeleteOnClick }
            onRowClick={onRowClick}
            data={ products }/>

          <ul className="pagination mt-4 mb-4">
            {/*
              mt: margin-top
              mb: margin-bottom
            */}
            <li
              onClick={ trangTruoc }
              className="page-item">
              <a className="page-link">Trang trước</a>
            </li>

            <li className="page-item">
              <a className="page-link">{ page }</a>
            </li>

            <li
              onClick={ trangSau }
              className="page-item">
              <a className="page-link">Trang sau</a>
            </li>
          </ul>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default App;
