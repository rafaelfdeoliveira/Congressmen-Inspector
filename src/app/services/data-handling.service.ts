import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataHandlingService {
  // Variable used to store data about all expenses in the year for each congressman already searched since the loading of the app
  expensesByCongressman: any = {}

  constructor(private datePipe: DatePipe) {}

  // Return a string in the format 'yyyy-MM-dd' of the date the method is called plus the provided number of months (positive or negative)
  getDatemonthsFromNow(months: number): string {
    return this.datePipe.transform(new Date(new Date().setMonth(new Date().getMonth() + months)), 'yyyy-MM-dd')!
  }
}
