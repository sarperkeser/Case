import "./App.css";
import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Table } from "reactstrap";
import Detail from "./Detail";
import { NavLink, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";

function App() {
  const [apiData, setApiData] = useState(null);
  function prepareChartData() {
    if (apiData !== null) {
      const dataDate = apiData.graphData.map((element) => element.date);
      const dataEquity = apiData.graphData.map((element) => element.equity);
      const preparedData = [];
      //console.log(dataDate)
      //console.log(dataEquity)
      for (let index = 0; index < dataDate.length; index++) {
        preparedData.push({ date: dataDate[index], value: dataEquity[index] });
      }
      //console.log(arrayStartAt)
      return preparedData;
    } else {
      console.log("apidata null");
      return [];
    }
  }
  function chart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = prepareChartData();

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    /*chart.scrollbarY = new am4core.Scrollbar();
chart.scrollbarY.parent = chart.leftAxesContainer;
chart.scrollbarY.toBack();*/

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    /*chart.scrollbarX = new am4charts.XYChartScrollbar();
chart.scrollbarX.series.push(series);
chart.scrollbarX.parent = chart.bottomAxesContainer;*/

    //dateAxis.start = 0.79;
    dateAxis.keepSelection = true;
    return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
  }
  function fetchData() {
    fetch("http://www.json-generator.com/api/json/get/bUgMRhYjKG?indent=2")
      .then((response) => response.json())
      .then((response) => setApiData(response));
  }
  function crateTable() {
    if (apiData !== null) {
      return (
        <Table striped>
          <thead>
            <tr>
              <th>id</th>
              <th>accountId</th>
              <th>accountType</th>
              <th>displayName</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            
            {apiData.nodes.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.accountId}</td>
                <td>{element.accountType}</td>
                <td>{element.displayName}</td>
                <td>{element.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      console.log("apidata null");
    }
  }
  useEffect(() => {
    chart();
    fetchData();
  }, []);
  //console.log(apiData)
  let id =localStorage.getItem('id');
  let path="/Detail"+"/"+id
  return (
    <div className="App">
      
    <Switch>
      <Route exact path="/" component={MainPage}>
      </Route>
      <Route path={path}  component={Detail}>
      </Route>
    </Switch>
    
      {/*chart()*/}
      {/*crateTable()*/}
  
    </div>
  );
}

export default App;
