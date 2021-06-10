import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Bar, Line, Scatter } from 'react-chartjs-2';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';
import { ChartData, ChartOptions } from 'chart.js';

interface ChartCardProps {
  type: string;
  data: ChartData;
  options: ChartOptions;
}

const ChartCard: React.FC<ChartCardProps> = (props) => {
  return (
    <Card>
      <CardContent>
        {props.type === 'bar' && (
          <Bar type="bar" options={props.options} data={props.data} />
        )}
        {props.type === 'line' && (
          <Line type="line" options={props.options} data={props.data} />
        )}
        {props.type === 'scatter' && (
          <Scatter type="scatter" options={props.options} data={props.data} />
        )}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
