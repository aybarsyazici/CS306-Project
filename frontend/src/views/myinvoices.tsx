
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import NavigationBar from "../components/navigationbar";
import { useStore } from "../stores/userStore";
import Paper from "@mui/material/Paper";
import { Api } from "../environment";
import { useEffect, useState } from "react";
import { InvoiceType } from "../types/invoice";
import './myinvoices.scss'
import { Game } from "../types/game";
 
const MyInvoices = observer(() => {

    const userStore = useStore();

  const [invoiceList, setInvoiceList] = useState<InvoiceType[]>([]);
  
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceType>();
  const [invoiceGames, setInvoiceGames] = useState<Game[]>([]);


    useEffect(() => {
        Api.get('/getInvoices?userId='+ userStore.userid).then((e) => {
            setInvoiceList(e.data.data);
        });
    }, [])
  
  useEffect(() => {
    if(selectedInvoice?.invoiceId)
      Api.post("/getInvoiceGames", { invoiceId: selectedInvoice?.invoiceId }).then((e) => {
        setInvoiceGames(e.data.data);
      })
  },[selectedInvoice])

    return (
        <>
  <NavigationBar />
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Invoice Id</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceList.map((invoice) => (
                <TableRow
                  key={invoice.invoiceId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className={"invoiceRow " + (selectedInvoice?.invoiceId === invoice.invoiceId && "invoiceRow--active")}
                  onClick={(e)=>{setSelectedInvoice(invoice)}}
                >
                  <TableCell component="th" scope="row">
                    {invoice.invoiceId}
                  </TableCell>
                  <TableCell align="right">{invoice.invoiceDate.toString().substring(0,10)}</TableCell>
                  <TableCell align="right">{invoice.totalCost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
          <br />
          <br />
          {selectedInvoice && (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Game Name</TableCell>
              <TableCell align="right">Genre</TableCell>
              <TableCell align="right">Release Date</TableCell>
              <TableCell align="right">Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceGames.map((game) => (
              <TableRow
                key={game.gameid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {game.name}
                </TableCell>
                <TableCell align="right">{game.genre}</TableCell>
                <TableCell align="right">
                  {game.releaseDate.toString().substring(0, 10)}
                </TableCell>
                <TableCell align="right">{game.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          </TableContainer>            
          )}
        </Container>        
        </>
    )
})
 
export default MyInvoices;