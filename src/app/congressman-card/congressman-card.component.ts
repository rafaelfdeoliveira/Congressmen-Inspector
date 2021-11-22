import { Component, Input } from '@angular/core';
import { CongressmanData, SearchService } from '../services/search.service';

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

  constructor(private searchService: SearchService) {}

  // Search for all the detailed data of the corresponding congressman depicted in the congressman-card, including his last attended event and his next scheduled event
  // While the App is waiting to receive the events data from the API, a spinner is displayed for event in the appropiate place.
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