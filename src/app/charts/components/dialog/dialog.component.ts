import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartInterface } from '../../models/chart.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  chartForm!: FormGroup;
  listDateValue!: { [date: string]: number };

  isUpdate!: boolean;

  // color picker params
  public disabled = false;
  public colorPalette: ThemePalette = 'primary';
  public touchUi = false;
  // colorCtr: AbstractControl = new FormControl(null);
  // color picker params

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChartInterface,
    private formBuiler: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isUpdate = this.data ? true : false;

    if (this.isUpdate) {
      console.log('data :', this.data);
      // initial form for update chart
      this.chartForm = this.formBuiler.group({
        title: [
          this.data.title,
          [Validators.required, Validators.minLength(8)],
        ],
        name: [this.data.name, [Validators.required, Validators.minLength(8)]],
        type: [this.data.type, Validators.required],
        color: [''], // colorCtrl
        value: [''],
        date: [''],
      });
      this.listDateValue = this.data.data;
    } else {
      // initial form for new chart
      this.chartForm = this.formBuiler.group({
        title: ['', [Validators.required, Validators.minLength(8)]],
        name: ['', [Validators.required, Validators.minLength(8)]],
        type: ['', Validators.required],
        color: [''], // colorCtrl
        value: [''],
        date: [''],
      });
    }
  }

  addDateValue(): void {
    const date: Date = this.chartForm.controls['date'].value;
    const value = this.chartForm.controls['value'].value;
    const formattedDate =
      date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();

    let values = this.listDateValue;

    if (date && value) {
      values = { ...values, [formattedDate]: parseInt(value, 10) };
    }
    this.listDateValue = values;
    console.log('value add =>', this.listDateValue);
  }

  addChart(): void {
    if (this.chartForm.valid) {
      const chartColor = this.color?.value.hex
        ? '#' + this.color?.value.hex
        : '#FFFFFF'; // if no color selected default : white

      const chart: ChartInterface = {
        id: this.isUpdate ? this.data.id : new Date().getTime(),
        title: this.title?.value,
        name: this.name?.value,
        data: this.listDateValue,
        type: this.type?.value,
        color: chartColor,
      };

      console.log(this.isUpdate ? 'Update chart =>' : ' add chart => ', chart);

      this.dialogRef.close(chart);
    }
  }

  get title() {
    return this.chartForm.get('title');
  }
  get type() {
    return this.chartForm.get('type');
  }
  get color() {
    return this.chartForm.get('color');
  }
  get name() {
    return this.chartForm.get('name');
  }
}
