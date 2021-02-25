import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Product from './components/products/Product';
import Category from './components/category/Category';
import Order from './components/order/Order';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="sm">
          <Typography
            component="div"
            style={{
              height: '100vh'
            }}>
            <ul className="nav">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/category">Category</Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/product">Product</Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/order">Order</Link>
              </li>
            </ul>
            <Switch>
              <Route path="/product">
                <Product />
              </Route>

              <Route path="/category">
                <Category />
              </Route>

              <Route path="/order">
                <Order />
              </Route>
            </Switch>
          </Typography>
        </Container>

      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
