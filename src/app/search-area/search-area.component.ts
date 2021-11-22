import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService, CongressmanData, SearchParams, StatesData } from '../services/search.service';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.scss']
})
export class SearchAreaComponent implements OnInit {
  data!: CongressmanData[]
  formGroup!: FormGroup
  statesData!: StatesData[]
  loading = false

  constructor(private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit(): void {
    // Creates the formGroup that will be used to collect all the input data from the user to perform the desired request to the API
    this.formGroup = this.fb.group({
      congressmanName: [''],
      sex: [''],
      stateAcronym: [''],
      partyAcronym: ['']
    })
    // Request the states names data from the API to use as options for the user to select
    this.searchService.getStatesData().subscribe((data: any) => this.statesData = data.dados.sort())
  }

  // Request congressman data to the API according to the received user input
  // While the App is waiting for a response from the API, a spinner is displayed appropriately
  showResults (params: SearchParams) {
    this.loading = true
    this.searchService.getData(params).subscribe((results: any) => {
        this.data = results.dados
        this.loading = false
    })
  }

}
