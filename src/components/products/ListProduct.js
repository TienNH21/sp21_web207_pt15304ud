import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

function ListProduct({ data, onRowClick }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          data.map(function (value, index) {
            return (
              <TableRow
                onClick={
                  (event) => {
                    onRowClick(event, value, index);
                  }
                }
                key={index}>
                <TableCell>{value.id}</TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>{value.price}</TableCell>
                <TableCell>
                  <Switch
                    color="primary"
                    name="checkedB"
                    inputProps={{
                      'aria-label': 'primary checkbox'
                    }} />
                </TableCell>
                <TableCell>
                  <Button style={{
                    color: 'blue',
                    textTransform: 'none',
                  }}>
                    Update
                  </Button>
                  <Button style={{
                    color: 'red',
                    textTransform: 'none',
                  }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        }
      </TableBody>
    </Table>
  );
}

export default ListProduct;
