import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

////////////////import component/////////////////////////
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';

// ทำ path เพื่อเชื่อมต่อหน้าต่างๆที่เราจะสร้าง
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-book'},
  { path: 'books-list', component: BookListComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'edit-book/:id', component: BookDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
