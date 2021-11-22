import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataHandlingService } from './data-handling.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  congressmanDataUrl = 'https://dadosabertos.camara.leg.br/api/v2/deputados/'
  statesDataUrl = 'https://dadosabertos.camara.leg.br/api/v2/referencias/deputados/siglaUF'

  constructor(private httpClient: HttpClient, private dataHandlingService: DataHandlingService) { }

  // When submitted, it requests basic information about all congressmen corresponding to given search parameters to the API
  getData({congressmanName, sex, stateAcronym, partyAcronym}: SearchParams) {
    return this.httpClient.get(this.congressmanDataUrl, {
      params: {
        nome: congressmanName,
        siglaUf: stateAcronym,
        siglaPartido: partyAcronym,
        siglaSexo: sex,
        ordem: "ASC",
        ordenarPor: "nome"
      }
    })
  }

  // When submitted, it requests all Brazilian states names from the API
  getStatesData() {
    return this.httpClient.get(this.statesDataUrl)
  }

  // When submitted, it requests all detailed information about the congressman corresponding to the given congressmanId
  getDetailedCongressmanData(congressmanId: number) {
    return this.httpClient.get(this.congressmanDataUrl + congressmanId)
  }

  // When submitted, it requests data about all events attended (or scheduled to be attended) by the congressman corresponding to the given congressmanId
  // The space of time of the received events is between (current date + startMonthsFromNow) and (current date + endMonthsFromNow)
  getEventsData(congressmanId: number, startMonthsFromNow: number, endMonthsFromNow: number) {
    return this.httpClient.get(this.congressmanDataUrl + congressmanId + '/eventos', {
      params: {
        dataInicio: this.dataHandlingService.getDatemonthsFromNow(startMonthsFromNow),
        dataFim: this.dataHandlingService.getDatemonthsFromNow(endMonthsFromNow),
        ordem: 'ASC',
        ordenarPor: 'dataHoraInicio'
      }
    })
  }

}

export interface CongressmanData {
  id: number,
  nome: string,
  email: string,
  idLegislatura: number,
  siglaPartido: string,
  siglaUf: string,
  uri: string,
  uriPartido: string,
  urlFoto: string
}

export interface SearchParams {
  congressmanName: string,
  sex: string,
  stateAcronym: string,
  partyAcronym: string
}

export interface StatesData {
    cod: string,
    sigla: string,
    nome: string,
    descricao: string
}