import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { EmptyDashPipe } from './pipes/empty-dash.pipe';
import { GenderPipe } from './pipes/gender.pipe';
import { DatePipe, LowerCasePipe, CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { CongressmanCardComponent } from './congressman-card/congressman-card.component';
import { SearchAreaComponent } from './search-area/search-area.component';
import { ResultsAreaComponent } from './results-area/results-area.component';
import { ExpensesSearchComponent } from './expenses-search/expenses-search.component';

@NgModule({
  declarations: [
    AppComponent,
    CongressmanCardComponent,
    SearchAreaComponent,
    ResultsAreaComponent,
    ExpensesSearchComponent,
    EmptyDashPipe,
    GenderPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [DatePipe, LowerCasePipe, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
