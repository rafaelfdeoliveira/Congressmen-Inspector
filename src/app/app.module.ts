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

import { AppComponent } from './app.component';
import { CongressmanCardComponent } from './congressman-card/congressman-card.component';
import { SearchAreaComponent } from './search-area/search-area.component';
import { ResultsAreaComponent } from './results-area/results-area.component';
import { EmptyDashPipe } from './pipes/empty-dash.pipe';
import { DatePipe } from '@angular/common';
import { GenderPipe } from './pipes/gender.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CongressmanCardComponent,
    SearchAreaComponent,
    ResultsAreaComponent,
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
    MatMenuModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
