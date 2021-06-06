import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { DATA_REFRESH_RATE } from 'constants/constants';
import { ChartData, ChartOptions } from 'chart.js';
import ChartCard from './ChartCard';


interface ForecastPlanetaryKPCardProps {}

const dataURL = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json";
const defaultData: ChartData = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
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
      text: "Forecasted Planetary Kp Index",
    },
    tooltip: {
      intersect: false,
      mode: "index",
    }
  },
  scales: {
    x: {
      type: 'timeseries',
      time: {
        unit: "day",
        tooltipFormat: 'hh:mm a',
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
      min: 0,
      max: 10,
    }
  },
};

const ForecastPlanetaryKPCard: React.FC<ForecastPlanetaryKPCardProps> = (props) => {
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
      let dataItems = res.data.slice(1).filter((dataItem: any) => (dataItem[2] !== "observed"));
      if (Array.isArray(dataItems) && dataItems.length > 0) {
        let newData: ChartData = {
          labels: dataItems.map((dataItem: any) => (DateTime.fromSQL(dataItem[0]).toJSDate())),
          datasets: [{
            label: "Kp Index",
            data: dataItems.map((dataItem: any) => (parseInt(dataItem[1]))),
            backgroundColor: dataItems.map((dataItem: any) => {
              if (parseInt(dataItem[1]) < 4) return "rgba(51, 255, 0, 0.65)"
              else if (parseInt(dataItem[1]) === 4) return "rgba(255, 205, 79, 0.65)"
              else return "rgba(255, 25, 0, 0.65)"
            }),
            borderColor: dataItems.map((dataItem: any) => {
              if (parseInt(dataItem[1]) < 4) return "rgba(51, 255, 0, 1)"
              else if (parseInt(dataItem[1]) === 4) return "rgba(255, 205, 79, 1)"
              else return "rgba(255, 25, 0, 1)"
            }),
            normalized: true,
            animation: false,
          }]
        }
        if (JSON.stringify(newData.datasets[0].data) !== JSON.stringify(data.datasets[0].data)) {
          setData(newData);
        }
      }
    })
  }

  return (
    <ChartCard type="bar" options={options} data={data} />
  );
}

export default ForecastPlanetaryKPCard;