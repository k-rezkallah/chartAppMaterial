import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import { ChartInterface } from '../../models/chart.model';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() chart!: ChartInterface;
  @Input() showSettings!: boolean;

  @Output() removeChart = new EventEmitter<number>();
  @Output() updateChart = new EventEmitter<ChartInterface>();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const orderedData = this.orderValueByDates(this.chart.data);

    this.chartOptions = this.drawGraph(
      orderedData,
      this.chart.color,
      this.chart.title,
      this.chart.name,
      'Date',
      'Value',
      this.chart.type
    );
  }

  drawGraph(
    data: { [id: string]: number },
    bkgColor: string,
    title: string,
    name: string,
    xTitle: string,
    yTitle: string,
    graphType: string
  ): Highcharts.Options {
    // we have to sort the value by keys by date in order.....

    let options: Highcharts.Options = {};
    options = {
      chart: {
        backgroundColor: bkgColor,
        type: graphType,
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: [...Object.keys(data)],
        title: { text: xTitle },
      },
      yAxis: {
        title: { text: yTitle },
      },
      series: [
        {
          name: name,
          type:
            graphType === 'line'
              ? 'line'
              : graphType === 'column'
              ? 'column'
              : graphType === 'area'
              ? 'area'
              : graphType === 'spline'
              ? 'spline'
              : graphType === 'bar'
              ? 'bar'
              : graphType === 'pie'
              ? 'pie'
              : graphType === 'scatter'
              ? 'scatter'
              : graphType === 'gauge'
              ? 'gauge'
              : graphType === 'areaspline'
              ? 'areaspline'
              : 'line',
          data: [...Object.values(data)],
        },
      ],
    };

    return options;
  }

  removingChart() {
    // open dialog with this chart infos
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '30%',
      minWidth: '350px',
    });
    // send event to container to dispatch action of upadte
    dialogRef.afterClosed().subscribe((result) => {
      // verify if result is a valid chart
      if (result === 'remove') this.removeChart.emit(this.chart.id);
    });
  }

  updatingChart() {
    // open dialog with this chart infos
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      minWidth: '350px',
      data: this.chart,
    });
    // send event to container to dispatch action of upadte
    dialogRef.afterClosed().subscribe((result) => {
      // verify if result is a valid chart
      if (typeof result === 'object') this.updateChart.emit(result);
    });
  }

  orderValueByDates(data: { [date: string]: number }): {
    [date: string]: number;
  } {
    const newOrdere = Object.keys(data)
      .sort((curr, next) => {
        let res: number = 0;
        if (new Date(curr).getTime() > new Date(next).getTime()) res = 1;
        if (new Date(curr).getTime() < new Date(next).getTime()) res = -1;
        return res;
      })
      .reduce((curr, next) => {
        return Object.assign(curr, { [next]: data[next] });
      }, {});

    return newOrdere;
  }
}
