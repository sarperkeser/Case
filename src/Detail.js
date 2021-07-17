import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { IoIosArrowBack } from "react-icons/io";
import Grid from "@material-ui/core/Grid";

export default function Detail() {
  const [apiData, setApiData] = useState(null);
  let history = useHistory();
  const [Id,setId]=useState(null);
  function fetchData() {
    fetch("http://www.json-generator.com/api/json/get/bUgMRhYjKG?indent=2")
      .then((response) => response.json())
      .then((response) => setApiData(response));
  }
  

  function createList() {
      if(apiData!==null){
          
          function findId(id){
              return (id===localStorage.getItem('id'))
          }
          
          const data=apiData.nodes.filter(element=>element.id==localStorage.getItem('id'))
          console.log("data: ",data)
          if(data!==undefined){
              return (
            <div>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={1}></Grid>
                <Grid item xs={1}>
                  <Button color="primary" onClick={ChangePage}>
                    <IoIosArrowBack />
                  </Button>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={3}>
                  <ListGroup>
                    <ListGroupItem>Id: {data[0].id}</ListGroupItem>
                    <ListGroupItem>Accepted Trade Quantity: {data[0].acceptedTradeQuantity}</ListGroupItem>
                    <ListGroupItem>Account Id: {data[0].accountId}</ListGroupItem>
                    <ListGroupItem>Account Type: {data[0].accountType}</ListGroupItem>
                    <ListGroupItem>Price: {data[0].price}</ListGroupItem>
                    <ListGroupItem>Quantity: {data[0].quantity}</ListGroupItem>
                    <ListGroupItem>Role: {data[0].role}</ListGroupItem>
                    <ListGroupItem>Trade Date: {data[0].tradeDate}</ListGroupItem>
                    <ListGroupItem>Volume: {data[0].volume}</ListGroupItem>
                  </ListGroup>
                </Grid>
              </Grid>
            </div>
          );
          }else{
              console.log("data tanımsız")
          }
          
      }else{
          console.log("apidata null")
      }
    
  }
  function ChangePage() {
    history.push("/");
    localStorage.clear();
  }
  useEffect(() => {
    fetchData();
    
    setId(localStorage.getItem('id'));
  }, []);
  return <div>
      {createList()}
  </div>;
}
