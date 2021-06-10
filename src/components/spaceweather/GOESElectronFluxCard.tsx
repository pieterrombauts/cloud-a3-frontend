import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { DATA_REFRESH_RATE } from 'constants/constants';
import { ChartData, ChartOptions } from 'chart.js';
import ChartCard from './ChartCard';
import { NOAA_BASE_URL } from 'api/contants';

interface GOESElectronFluxCardProps {}

const dataURL = `${NOAA_BASE_URL}/json/goes/primary/integral-electrons-6-hour.json`;
const defaultData: ChartData = {
  labels: [],
  datasets: [
    {
      label: '',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
      showLine: true,
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
      text: 'GOES Electron Flux',
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
      type: 'logarithmic',
      min: 0.01,
      max: 100000000,
    },
  },
};

const GOESElectronFluxCard: React.FC<GOESElectronFluxCardProps> = (props) => {
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
      let dataItems = res.data.slice(1);
      if (Array.isArray(dataItems) && dataItems.length > 0) {
        let newData: ChartData = {
          labels: dataItems.map((dataItem: any) =>
            DateTime.fromISO(dataItem.time_tag).toJSDate(),
          ),
          datasets: [
            {
              label: '>= 2 MeV',
              data: dataItems.map((dataItem: any) => dataItem.flux),
              backgroundColor: 'rgb(0, 0, 255)',
              borderColor: 'rgb(0, 0, 255)',
              showLine: true,
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

export default GOESElectronFluxCard;
