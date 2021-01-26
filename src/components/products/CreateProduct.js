import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
import Container from '@material-ui/core/Container';

function CreateProduct({
  formData,
  onInputChange,
  onFormSubmit,
}) {
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <form
          onSubmit={ onFormSubmit }
          autoComplete="off">
          <TextField
            name="id"
            value={formData.id}
            onChange={ onInputChange }
            fullWidth
            label="Id" />
          <TextField
            name="name"
            value={formData.name}
            onChange={ onInputChange }
            fullWidth
            label="Name" />
          <TextField
            name="price"
            value={formData.price}
            onChange={ onInputChange }
            fullWidth
            label="Price" />
          <Button
            style={{ marginTop: '10px' }}
            variant="contained"
            color="primary"
            type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </React.Fragment>
  );
}

export default CreateProduct;
