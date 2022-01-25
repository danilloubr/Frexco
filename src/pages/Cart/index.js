import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import Paper from "@mui/material/Paper";

import "./cart.css";

function Cart({
  addItemCart,
  removeItemCart,
  removeItemCartUnit,
  finalizePurchase,
}) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "white",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#89be22",
      color: theme.palette.common.black,
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#C1DD95",
    },

    "&:last-child td, &:last-child th": {
      border: 0,
      minWidth: 115,
    },
  }));

  const history = useHistory();

  const json = localStorage.getItem("COMPRAS");
  const cart = JSON.parse(json);

  if (!cart) return null;

  return (
    <Fragment>
      {cart.length === 0 ? (
        <div className="sem-compras">
          <h1>Infelizmente você ainda não fez nenhuma compra :{"("}</h1>
          <Button
            variant="contained"
            color="success"
            onClick={() => history.push("/")}
          >
            Fazer Compras Agora!
          </Button>
        </div>
      ) : (
        <section className="pagina-total">
          <div className="container2">
            <h2>SUAS COMPRAS</h2>
            <TableContainer component={Paper}>
              <Table sx={{ textAlign: "center" }} aria-label="customized table">
                <TableBody>
                  <StyledTableCell align="center">
                    <b>Nome</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>Preço/UND.</b>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <b>Quantidade</b>
                  </StyledTableCell>

                  {cart.map((item) => {
                    return (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell
                          style={{ fontSize: "20px", fontStyle: "bold" }}
                          component="th"
                          align="center"
                          scope="row"
                        >
                          {item.name}
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ fontSize: "20px", fontStyle: "bold" }}
                          align="center"
                        >
                          R{"$"}
                          {(item.id / 4).toFixed(2)}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => addItemCart(item)}
                          >
                            +
                          </Button>
                          <p style={{ fontSize: "25px", margin: "0px 30px" }}>
                            {item.amount}
                          </p>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => removeItemCart(item)}
                          >
                            -
                          </Button>
                          <DeleteForeverIcon
                            style={{ marginLeft: "30px", cursor: "pointer" }}
                            onClick={() => removeItemCartUnit(item)}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="total-compras">
            <span>
              TOTAL: R${" "}
              {cart
                .reduce(
                  (acc, current) => acc + (current.id * current.amount) / 4,
                  0
                )
                .toFixed(2)}
            </span>
            <Button variant="contained" onClick={() => history.push("/")}>
              {" "}
              Comprar Mais
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => finalizePurchase(history.push("/"))}
            >
              Finalizar Compra
            </Button>
          </div>
        </section>
      )}
    </Fragment>
  );
}

export default Cart;
