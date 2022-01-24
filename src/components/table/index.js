import React, { Fragment } from "react";
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import Paper from "@mui/material/Paper";

import "./table.css";

function Tabela({ fruits, addItemCart }) {
  console.log("FRUTAS TABELA", fruits);
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

  return (
    <Fragment>
      <section className="pagina-total">
        <div className="container2">
          <h2>FAÇA SUAS COMPRAS</h2>
          <TableContainer component={Paper}>
            <Table sx={{ textAlign: "center" }} aria-label="customized table">
              <TableBody>
                <StyledTableCell align="center">
                  <b>Nome</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Carboidratos</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Proteínas</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Gorduras Totais</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Calorias</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Açúcar</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Valor</b>
                </StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>

                {fruits.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" align="center" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.nutritions.carbohydrates}g
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.nutritions.protein}g
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.nutritions.fat}g
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.nutritions.calories} kcal
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.nutritions.sugar}g
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      R{"$"}
                      {item.id},00
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => addItemCart(item)}
                      >
                        Adicionar
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h2>HOJE NÓS TEMOS {fruits.length} TIPOS DE FRUTAS</h2>
        </div>
      </section>
    </Fragment>
  );
}

export default Tabela;
