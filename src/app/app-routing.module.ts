import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesSearchComponent } from './expenses-search/expenses-search.component';
import { SearchAreaComponent } from './search-area/search-area.component';

const routes: Routes = [
  {path: "despesas/:id", component: ExpensesSearchComponent},
  {path: "", component: SearchAreaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
