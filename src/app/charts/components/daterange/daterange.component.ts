import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss'],
})
export class DaterangeComponent implements OnInit, OnChanges {
  @Output() dateChangeFilter = new EventEmitter<DatePipe>();

  @Output() fromToDate = new EventEmitter<Date[]>();

  @Input() initialDate!: Date[];

  //initial date range values
  fromDateModel: Date = new Date('01/01/2020'); // MM/DD/YYYY
  toDateModel: Date = new Date('12/31/2022'); // MM/DD/YYYY

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('has changed', changes);
  }

  ngOnInit(): void {
    //initiate date from the state
    this.fromDateModel = this.initialDate[0];
    this.toDateModel = this.initialDate[1];
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // for now we react to change and not to input
    if (type === 'change') {
      if (this.toDateModel)
        this.fromToDate.emit([
          new Date(this.toDateModel),
          new Date(this.fromDateModel),
        ]);
    }
    // console.log(type, event.value);
  }
}
