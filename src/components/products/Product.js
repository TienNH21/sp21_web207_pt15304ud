import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListProduct from './ListProduct';
import CreateProduct from './CreateProduct';
import { useState, useEffect } from 'react';

function Product() {
  const [listDanhMuc, setListDanhMuc] = useState([]);
  const [danhMucId, setDanhMucId] = useState(-1);
  const [products, setProduct] = useState([]);
  const [clickRow, setClickRow] = useState(-1);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setError('');
    setClickRow(-1);
    setFormData({
      id: '',
      name: '',
      price: '',
    });
  }

  const limit = 5;
  const pageInit = 1;
  const [page, setPage] = useState(pageInit);

  useEffect(() => {
    setLoading(true);
    const apiDanhMucUrl = 'https://5f2d045b8085690016922b50.mockapi.io/todo-list/categories';
    axios.get(apiDanhMucUrl)
      .then(function (response) {
        const { data } = response;
        setListDanhMuc(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const danhMucOnChange = function (event) {
    setDanhMucId(event.target.value);
    setPage(1);
  }

  useEffect(() => {
    if (danhMucId == -1) {
      return ;
    }

    const url = 'https://5f2d045b8085690016922b50.mockapi.io/todo-list/categories/' +
      danhMucId + '/products?limit=' + limit + "&page=" + page;
    setLoading(true);
    axios({
      method: 'GET',
      url: url,
    })
      .then((repsonse) => {
        const { data } = repsonse;
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [
    /*
     * useEffect sẽ gọi lại callback nếu giá trị các phần tử trong mảng thay đổi
     */
    page,
    danhMucId,
  ]);

  const onCreateProduct = () => {
    const urlApiThemMoi = 'https://5f2d045b8085690016922b50.mockapi.io/todo-list/categories/' + danhMucId + '/products';

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

  const onUpdateProduct = function () {
    const apiUpdate = 'https://5f2d045b8085690016922b50.mockapi.io/todo-list/categories/' + danhMucId + '/products/' + formData.id;
    axios.put(apiUpdate, formData)
      .then(function (response) {
        const listProductNew = products.map(function (val, idx) {
          if (val.id == formData.id) {
            return response.data;
          } else {
            return val;
          }
        });

        setProduct(listProductNew);
      })
      .catch(function (error) {
        console.log('error', error);
        setError(error.message);
      });
  }

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (clickRow == -1) {
      // Thêm mới
      onCreateProduct();
    } else {
      // Cập nhật
      onUpdateProduct();
    }
  }

  const btnDeleteOnClick = function (event, value, index) {
    event.stopPropagation();
    const apiXoaUrl = `https://5f2d045b8085690016922b50.mockapi.io/todo-list/categories/${danhMucId}/products/${ value.id }`;

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
    <div>
      <Backdrop
        style={{ zIndex: '1000' }}
        open={ loading }>
        <CircularProgress />
      </Backdrop>
      <div
        className={
          error.length == 0 ?
            'd-none' :
            'alert alert-danger'
        }
        role="alert">
          { error }
      </div>
      <CreateProduct
        onResetForm={ onResetForm }
        onFormSubmit={ onFormSubmit }
        onInputChange={ onInputChange }
        formData={ formData }/>

      <select
        onChange={ danhMucOnChange }
        className="form-control mt-4 mb-4 col-6">
        <option>-- Chọn danh mục --</option>
        {
          listDanhMuc.map((value, index) => {
            return (
              <option
                value={ value.id }
                key={index}>
                { value.name }
              </option>
            );
          })
        }
      </select>

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
    </div>
  );
}

export default Product;
