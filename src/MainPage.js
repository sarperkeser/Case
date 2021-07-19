import "./App.css";
import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Table } from "reactstrap";
import { useHistory} from "react-router-dom";

export default function MainPage() {
  const [apiData, setApiData] = useState(null);
  let history = useHistory();
  function prepareChartData() {
    if (apiData !== null) {
      const dataDate = apiData.graphData.map((element) => element.date);
      const dataEquity = apiData.graphData.map((element) => element.equity);
      const preparedData = [];
      for (let index = 0; index < dataDate.length; index++) {
        preparedData.push({ date: dataDate[index], value: dataEquity[index] });
      }
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
    dateAxis.keepSelection = true;
    return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
  }
  function fetchData() {
    fetch("http://www.json-generator.com/api/json/get/bUgMRhYjKG?indent=2")
      .then((response) => response.json())
      .then((response) => setApiData(response));
  }
  function ChangePage(id, event) {
    localStorage.setItem("id", id);
    history.push("/Detail" + "/" + localStorage.getItem("id"));
    window.location.reload();
  }
  function crateTable() {
    if (apiData !== null) {
      return (
        <Table hover bordered dark>
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
              <tr
                style={{ cursor: "pointer" }}
                key={element.id}
                onClick={ChangePage.bind(this, element.id)}
              >
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
  return (
    <div>
      {chart()}
      {crateTable()}
    </div>
  );
}
