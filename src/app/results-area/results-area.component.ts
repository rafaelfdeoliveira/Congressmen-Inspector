import { Component, OnChanges, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CongressmanData } from '../services/search.service';

@Component({
  selector: 'app-results-area',
  templateUrl: './results-area.component.html',
  styleUrls: ['./results-area.component.scss']
})
export class ResultsAreaComponent implements OnChanges {
  @Input('data') inputData!: CongressmanData[]
  
  pageSize = 10
  currentPage!: number
  totalSize!: number
  displayedData!: CongressmanData[]

  constructor() { }

  // Update totalSize of the inputData and reset the currentPage to 0 (first page). Call handleData to update the displayed data
  ngOnChanges(): void {
    this.totalSize = this.inputData.length
    this.currentPage = 0
    this.handleData()
  }

  // Update the currentPage value. Call handleData to update the displayed data
  handlePage(evt: PageEvent) {
    this.currentPage = evt.pageIndex
    this.handleData()
  }

  // Make sure that only the correct part of the inputData is displayed according to the currentPage and pageSize values
  // Implements the client-side pagination, avoiding unnecessary http requests each time the user changes page in the paginator
  private handleData() {
    const start = this.currentPage * this.pageSize
    const end = start + this.pageSize
    this.displayedData = this.inputData.slice(start, end)
  }


}
