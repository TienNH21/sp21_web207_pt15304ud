import TextField from '@material-ui/core/TextField';
import React from 'react';
import Container from '@material-ui/core/Container';

function CreateProduct() {
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <form autoComplete="off">
          <TextField fullWidth label="Id" />
          <TextField fullWidth label="Name" />
          <TextField fullWidth label="Price" />
        </form>
      </Container>
    </React.Fragment>
  );
}

export default CreateProduct;
