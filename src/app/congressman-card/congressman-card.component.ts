import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataHandlingService } from '../services/data-handling.service';
import { SearchService, CongressmanData, ExpenseData } from '../services/search.service';

@Component({
  selector: 'app-congressman-card',
  templateUrl: './congressman-card.component.html',
  styleUrls: ['./congressman-card.component.scss']
})
export class CongressmanCardComponent {

  @Input() congressmanData!: CongressmanData
  detailedData!: DetailedData
  lastEventData!: EventData
  nextEventData!: EventData
  expensesData!: ExpenseData[]
  loadingExpenses = true
  biggestExpenseData!: ExpenseData

  constructor(private searchService: SearchService, private dataHandlingService: DataHandlingService, private router: Router) {}

  // Search for all the detailed data of the corresponding congressman depicted in the congressman-card, including his last attended event, his next scheduled event, last expense and biggest expense in the current year
  // While the App is waiting to receive the events data from the API, a spinner is displayed in each appropiate place.
  showDetailsData() {
    if (!this.detailedData) {
      this.searchService.getDetailedCongressmanData(this.congressmanData.id).subscribe(({dados}: any) => {
        this.detailedData = {
          name: dados.nomeCivil,
          urlPhoto: dados.ultimoStatus.urlFoto,
          partyAcronym: dados.ultimoStatus.siglaPartido,
          stateAcronym: dados.ultimoStatus.siglaUf,
          birthday: dados.dataNascimento,
          gender: dados.sexo,
          email: dados.ultimoStatus.email,
          webSite: dados.urlWebsite
        }
      })
    }
    if (!this.lastEventData) {
      this.searchService.getEventsData(this.congressmanData.id, -1, 0).subscribe(({dados}: any) => {
        const numberOfEvents = dados.length
        if (!numberOfEvents) {
          this.lastEventData = {}
        } else {
          const lastEvent = dados[numberOfEvents - 1]
          this.lastEventData = {
            startDate: lastEvent.dataHoraInicio,
            endDate: lastEvent.dataHoraFim,
            type: lastEvent.descricaoTipo,
            situation: lastEvent.situacao
          }
        }
      })
    }
    if (!this.nextEventData) {
      this.searchService.getEventsData(this.congressmanData.id, 0, 1).subscribe(({dados}: any) => {
        const numberOfEvents = dados.length
        if(!numberOfEvents) {
          this.nextEventData = {}
        } else {
          const nextEvent = dados[0]
          this.nextEventData = {
            startDate: nextEvent.dataHoraInicio,
            endDate: nextEvent.dataHoraFim,
            type: nextEvent.descricaoTipo,
            situation: nextEvent.situacao
          }
        }
      })
    }
    if (!this.expensesData) {
      this.getAllExpensesInYear(1)
    } else {
      this.loadingExpenses = false
    }
  }

  // Get data of all expenses made by the congressman corresponding to the congressmanId in the curret year from all pages in the API in descending order of date
  // All the retrieved data is saved in the variable this.expensesData as it arrives from the API
  private getAllExpensesInYear(page: number) {
    this.searchService.getExpensesData(this.congressmanData.id, page).subscribe((data: any) => {
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
        // After retrieving all expensesData from the API, if at least one expense was retrieved, the data of the biggest expense made in the year by the congressman is saved in this.biggestExpenseData
        // After this, all expensesData from the current congressman is saved in the dataHandlingService inside the variable expensesByCongressman with a key equal to the congressmanId and the value being the array expensesData
        if (this.expensesData) {
          this.biggestExpenseData = this.getBiggestExpenseData()
          this.dataHandlingService.expensesByCongressman[this.congressmanData.id] = [...this.expensesData]
        }
        this.loadingExpenses = false
        return
      }
      this.getAllExpensesInYear(page + 1)
    })
  }

  // Return the data of the biggest expense (by its ammount) among all expenses made by the congressman in the current year
  private getBiggestExpenseData() {
    return this.expensesData.reduce((acc: ExpenseData, expense: ExpenseData): ExpenseData => {
      if (expense.ammount > acc.ammount) return expense
      return acc
    })
  }

}

interface DetailedData {
  name: string,
  urlPhoto: string,
  partyAcronym: string,
  stateAcronym: string,
  birthday: string,
  gender: string,
  email: string,
  webSite: string,
}

interface EventData {
  startDate?: string,
  endDate?: string,
  type?: string,
  situation?: string
}