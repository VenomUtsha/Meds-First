import { useState, useEffect } from "react";
import axios from "axios";
import "./Bank.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import OrderItem from "../Bank/BankItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Bank = () => {
  const [orderItem, setOrderItem] = useState([]);

  useEffect(() => {
    const func = () => {
      axios
        .get(`api/v1/bankinfo`)
        .then((res) => setOrderItem(res.data.bankInfo))
        .catch((err) => console.log(err, "it has an error"));
    };

    func();
  }, [orderItem]);

  console.log(orderItem);

  return (
    <>
      <div>
        <table>
          <caption>Bank User Information</caption>
          <thead>
            <tr>
            <th scope="col">Bank Account</th>
              <th scope="col">Name</th>
              <th scope="col">Savings</th>
              <th scope="col">Expenses</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colspan="4"></td>
            </tr>
          </tfoot>
          <tbody>

            {orderItem.map((row) => (
            <tr>
            <th scope="row">{`#ID ${row.accountNumber}`}</th>
            <td>{row.name}</td>
            <td>{row.inAmount}/=</td>
            <td>{row.outAmount}/=</td>
          </tr>
          ))}
         
          </tbody>
        </table>
      </div>

      {/* <Card>
    <CardContent>

<TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Bank Account </TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Savings</TableCell>
            <TableCell align="right">Expenses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItem.map((row) => (
            <TableRow
              key={row.accountNumber}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.accountNumber}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.inAmount}</TableCell>
              <TableCell align="right">{row.outAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    </CardContent>

</Card> */}

      {/* <div className="main">       
        <div className="your-order">Bank User Details</div>
		<div className="cartPage">
          {orderItem &&
            orderItem.map((item, key) => (
              <div className="check" key={item._id}>
                <OrderItem item={item} />
              </div>
            ))}
        </div>	
      </div> */}
    </>
  );
};

export default Bank;
