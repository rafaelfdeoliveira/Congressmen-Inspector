import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { DataHandlingService } from '../services/data-handling.service';
import { SearchService, ExpenseData } from '../services/search.service';

@Component({
  selector: 'app-expenses-search',
  templateUrl: './expenses-search.component.html',
  styleUrls: ['./expenses-search.component.scss']
})
export class ExpensesSearchComponent implements OnInit {
  congressmanId!: number
  expensesData!: ExpenseData[]
  pageSize = 10
  currentPage = 0
  totalSize!: number
  displayedColumns: string[] = ['supplierName', 'type', 'ammount', 'date', 'expenseUrl']
  displayedData!: ExpenseData[]
  loading = true

  constructor(private route: ActivatedRoute, private searchService: SearchService, private dataHandlingService: DataHandlingService) { }

  // If it is saved in the dataHandling Service, the data (expensesData) about all expenses in the current year made by the congressman corresponding to the given id is retrieved from the service
  // Otherwise, the data is requested from the API and stored in the dataHandling Service in case it will be necessary again while the App is running
  ngOnInit(): void {
    this.congressmanId = Number(this.route.snapshot.paramMap.get('id'))
    if (this.congressmanId in this.dataHandlingService.expensesByCongressman) {
      this.expensesData = this.dataHandlingService.expensesByCongressman[this.congressmanId]
      this.totalSize = this.expensesData.length
      this.handleData()
      this.loading = false
    } else {
      this.getAllExpensesInYear(1)
    }
  }

  // Request all expenses data in the current year made by the congressman
  private getAllExpensesInYear(page: number) {
    this.searchService.getExpensesData(this.congressmanId, page).subscribe((data: any) => {
      data.dados.forEach(({tipoDespesa, nomeFornecedor, valorDocumento, dataDocumento, urlDocumento}: any) => {
        const expense: ExpenseData = {
          type: tipoDespesa,
          supplierName: nomeFornecedor,
          ammount: valorDocumento,
          date: dataDocumento,
          expenseUrl: urlDocumento
        }
        if (!this.expensesData) {
          this.expensesData = [expense]
          return
        }
        this.expensesData.push(expense)
      })
      const nextLink = data.links.filter((link: any) => link.rel === 'next')
      if (!nextLink.length) {
        // All expensesData from the current congressman is saved in the dataHandlingService inside the variable expensesByCongressman with a key equal to the congressmanId and the value being the array expensesData
        if (this.expensesData) {
          this.totalSize = this.expensesData.length
          this.handleData()
          this.dataHandlingService.expensesByCongressman[this.congressmanId] = [...this.expensesData]
        }
        this.loading = false
        return
      }
      this.getAllExpensesInYear(page + 1)
    })
  }

  // Update the current page when the user interacts with the paginator buttons, calling handdleData method to update the displayed data
  handlePage(evt: PageEvent) {
    this.currentPage = evt.pageIndex
    this.handleData()
  }

  // Update the displayed data according to the current page
  private handleData() {
    const start = this.currentPage * this.pageSize
    const end = start + this.pageSize
    this.displayedData = this.expensesData.slice(start, end)
  }

  // Sort (in ascending or descending order) the expenses in the table by its cost or date according to the user interaction with the corresponding headers 
  sortData(sort: Sort) {
    const data = [...this.expensesData]
    if (!sort.active || sort.direction === '') return
    this.expensesData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc'
      switch (sort.active) {
        case 'ammount':
          return this.compare(a.ammount, b.ammount, isAsc)
        case 'date':
          return this.compare(new Date(a.date), new Date(b.date), isAsc)
        default:
          return 0
      }
    })
    this.handleData()
  }

  // Used inside the sorting function to determine which of the two given values (a and b) is consider bigger than the other.
  private compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
