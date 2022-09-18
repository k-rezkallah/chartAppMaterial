import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartInterface } from '../../models/chart.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  @Output() addingChart = new EventEmitter<ChartInterface>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      minWidth: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result === 'object') {
        console.log('Output this chart => ', result);
        this.addingChart.emit(result);
      }
    });
  }
}
