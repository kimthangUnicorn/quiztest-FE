import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function ShowAllQues() {
  const [questions, setQuestions] = useState([]);

  function createData(
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    answerCorrect
  ) {
    return { question, answer1, answer2, answer3, answer4, answerCorrect };
  }
  useEffect(() => {
    axios.get("http://localhost:8085/api/get-questions").then((res) => {
      console.log(res);
      setQuestions(res.data.data);
    });
  }, []);
  const rows = questions.map((question) =>
    createData(
      question.question,
      question.answer1,
      question.answer2,
      question.answer3,
      question.answer4,
      question.answerCorrect
    )
  );

  return (
    <>
      <Header />
      <TableContainer
        component={Paper}
        style={{ width: "90%", margin: "100px auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Question</StyledTableCell>
              <StyledTableCell align="right">Answer A</StyledTableCell>
              <StyledTableCell align="right">Answer B</StyledTableCell>
              <StyledTableCell align="right">Answer C</StyledTableCell>
              <StyledTableCell align="right">Answer D</StyledTableCell>
              <StyledTableCell align="right">Correct answer</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.question}
                </TableCell>
                <TableCell align="right">{row.answer1}</TableCell>
                <TableCell align="right">{row.answer2}</TableCell>
                <TableCell align="right">{row.answer3}</TableCell>
                <TableCell align="right">{row.answer4}</TableCell>
                <TableCell align="right">
                  {row.answerCorrect == 1 ? (
                    <>A</>
                  ) : row.answerCorrect == 2 ? (
                    <>B</>
                  ) : row.answerCorrect == 3 ? (
                    <>C</>
                  ) : (
                    <>D</>
                  )}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default ShowAllQues;
