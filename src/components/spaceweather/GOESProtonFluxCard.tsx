import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { DATA_REFRESH_RATE } from 'constants/constants';
import { ChartData, ChartOptions } from 'chart.js';
import ChartCard from './ChartCard';


interface GOESProtonFluxCardProps {}

const dataURL = "https://services.swpc.noaa.gov/json/goes/primary/integral-protons-plot-6-hour.json";
const defaultData: ChartData = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
      showLine: true,
      pointRadius: 1,
      pointHoverRadius: 1,
      normalized: true,
      animation: false,
    }
  ]
}
const options: ChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "GOES Proton Flux",
    },
    tooltip: {
      intersect: false,
      mode: "index"
    }
  },
  scales: {
    x: {
      type: 'timeseries',
      time: {
        unit: "hour",
        tooltipFormat: 'hh:mm a',
        displayFormats: {
          hour: 'hh:mm a',
        }
      },
      title: {
        display: true,
        text: "Date/Time",
      },
      grid: {
        offset: false,
      }
    },
    y: {
      type: "logarithmic",
      min: 0.01,
      max: 10000,
    }
  }
};

const GOESProtonFluxCard: React.FC<GOESProtonFluxCardProps> = (props) => {
  const [data, setData] = useState<ChartData>(defaultData);

  useEffect(() => {
    updateData();
    const interval = setInterval(() => {
      updateData();
    }, DATA_REFRESH_RATE)
    return () => clearInterval(interval);
  })

  const updateData = () => {
    axios.get(dataURL).then((res) => {
      let dataItems = res.data;
      if (Array.isArray(dataItems) && dataItems.length > 0) {
        let newData: ChartData = {
          labels: dataItems.map((dataItem: any) => (
            DateTime.fromISO(dataItem.time_tag).toJSDate()
          )).filter((value: Date, index: number, self: Date[]) => (
            self.findIndex((date) => date.getTime() === value.getTime()) === index
          )),
          datasets: [{
            label: ">= 10 MeV",
            data: dataItems.filter((dataItem: any) => (dataItem.energy === ">=10 MeV")).map((dataItem: any) => (dataItem.flux)),
            backgroundColor: "rgb(255, 0, 0)",
            borderColor: "rgb(255, 0, 0)",
            showLine: true,
            pointRadius: 1,
            pointHoverRadius: 1,
            normalized: true,
            animation: false,
          },
          {
            label: ">= 50 MeV",
            data: dataItems.filter((dataItem: any) => (dataItem.energy === ">=50 MeV")).map((dataItem: any) => (dataItem.flux)),
            backgroundColor: "rgb(0, 0, 255)",
            borderColor: "rgb(0, 0, 255)",
            showLine: false,
            pointRadius: 1,
            pointHoverRadius: 1,
            normalized: true,
            animation: false,
          },
          {
            label: ">= 100 MeV",
            data: dataItems.filter((dataItem: any) => (dataItem.energy === ">=100 MeV")).map((dataItem: any) => (dataItem.flux)),
            backgroundColor: "rgb(0, 128, 0)",
            borderColor: "rgb(0, 128, 0)",
            showLine: true,
            pointRadius: 1,
            pointHoverRadius: 1,
            normalized: true,
            animation: false,
          }]
        }
        console.log(newData);
        if (JSON.stringify(newData.datasets[0].data) !== JSON.stringify(data.datasets[0].data)) {
          setData(newData);
        }
      }
    })
  }

  return (
    <ChartCard type="line" options={options} data={data} />
  );
}

export default GOESProtonFluxCard;