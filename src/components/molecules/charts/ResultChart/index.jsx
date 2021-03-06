//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> Additional
// Chart
import { Radar } from "react-chartjs-2";

class ResultChart extends React.Component {
  state = {
    dataRadarOptions: {
      responsive: true,
      elements: {
        line: {
          tension: 0.15,
        },
      },
      legend: {
        display: false,
      },
      scale: {
        pointLabels: {
          fontSize: 14,
          display: this.props.hideLabels ? false : true,
          fontFamily: "Fira Sans",
          fontColor: "black",
        },
        ticks: {
          beginAtZero: true,
          display: false,
          max: 100,
          min: 0,
          stepSize: 20,
        },
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
      },
    },
    dataRadarPlugins: [
      {
        beforeInit: function (chart) {
          chart.data.labels.forEach(function (e, i, a) {
            if (/\n/.test(e)) {
              a[i] = e.split(/\n/);
            }
          });
        },
      },
    ],
  };

  componentDidMount = () => {
    const { green } = this.props;

    if (!this.state.dataRadar) {
      this.getChart(green);
    }
  };

  getChart = (green) => {
    if (this.props.data) {
      let labels, data;

      labels = [];
      data = [];

      // Initialize data
      const unsortedData = this.props.data;
      // Sort object
      const orderedData = {};

      Object.keys(unsortedData)
        .sort()
        .forEach(function (key) {
          orderedData[key] = unsortedData[key];
        });

      // Get value and label
      Object.keys(orderedData).map((keyName, i) => {
        labels.push(orderedData[keyName].name);
        data.push(orderedData[keyName].value);

        return true;
      });

      // Set data radar chart
      this.setState({
        dataRadar: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: green
                ? "rgba(0, 200, 81, 0.5)"
                : "rgba(246, 26, 66, 0.5)",
              borderColor: green ? "rgb(0, 200, 81)" : "rgb(246, 26, 66)",
            },
          ],
        },
      });
    }
  };

  render() {
    if (this.state.dataRadar) {
      return (
        <Radar
          data={this.state.dataRadar}
          options={this.state.dataRadarOptions}
          plugins={this.state.dataRadarPlugins}
        />
      );
    } else {
      return null;
    }
  }
}

export default ResultChart;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */
