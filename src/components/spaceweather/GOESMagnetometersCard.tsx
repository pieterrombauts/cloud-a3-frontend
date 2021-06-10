import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { DATA_REFRESH_RATE } from 'constants/constants';
import { ChartData, ChartOptions } from 'chart.js';
import ChartCard from './ChartCard';
import { NOAA_BASE_URL } from 'api/contants';

interface GOESMagnetometersCardProps {}

const dataURL = `${NOAA_BASE_URL}/json/goes/primary/magnetometers-6-hour.json`;
const defaultData: ChartData = {
  labels: [],
  datasets: [
    {
      label: '',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
      showLine: false,
      pointRadius: 1,
      pointHoverRadius: 1,
      normalized: true,
      animation: false,
    },
  ],
};
const options: ChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'GOES Magnetometers',
    },
    tooltip: {
      intersect: false,
      mode: 'index',
    },
  },
  scales: {
    x: {
      type: 'timeseries',
      time: {
        unit: 'hour',
        tooltipFormat: 'hh:mm a',
        displayFormats: {
          hour: 'hh:mm a',
        },
      },
      title: {
        display: true,
        text: 'Date/Time',
      },
      grid: {
        offset: false,
      },
    },
    y: {
      type: 'linear',
      min: 0,
      max: 200,
    },
  },
};

const GOESMagnetometersCard: React.FC<GOESMagnetometersCardProps> = (props) => {
  const [data, setData] = useState<ChartData>(defaultData);

  useEffect(() => {
    updateData();
    const interval = setInterval(() => {
      updateData();
    }, DATA_REFRESH_RATE);
    return () => clearInterval(interval);
  });

  const updateData = () => {
    axios.get(dataURL).then((res) => {
      console.log(res.data);
      let dataItems = res.data.slice(1);
      if (Array.isArray(dataItems) && dataItems.length > 0) {
        let newData: ChartData = {
          labels: dataItems.map((dataItem: any) =>
            DateTime.fromISO(dataItem.time_tag).toJSDate(),
          ),
          datasets: [
            {
              label: 'Hp',
              data: dataItems.map((dataItem: any) => dataItem.Hp),
              backgroundColor: 'rgb(255, 0, 0)',
              borderColor: 'rgb(255, 0, 0)',
              showLine: false,
              pointRadius: 1,
              pointHoverRadius: 1,
              normalized: true,
              animation: false,
            },
          ],
        };
        if (
          JSON.stringify(newData.datasets[0].data) !==
          JSON.stringify(data.datasets[0].data)
        ) {
          setData(newData);
        }
      }
    });
  };

  return <ChartCard type="line" options={options} data={data} />;
};

export default GOESMagnetometersCard;
