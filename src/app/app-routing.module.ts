import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './admin/author/author.component';
import { BorrowComponent } from './admin/borrow/borrow.component';
import { CategoryComponent } from './admin/category/category.component';
import { HomeComponent } from './admin/home/home.component';
import { ListBookComponent } from './admin/list-book/list-book.component';
import { PayComponent } from './admin/pay/pay.component';
import { PublishCompanyComponent } from './admin/publish-company/publish-company.component';
import { ReaderComponent } from './admin/reader/reader.component';
import { BookComponent } from './client/book/book.component';
import { HomeClientComponent } from './client/home-client/home-client.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ListBookComponent
      },
      {
        path: 'book',
        component: ListBookComponent
      },
      {
        path: 'reader',
        component: ReaderComponent
      },
      {
        path: 'author',
        component: AuthorComponent
      },
      {
        path:'category',
        component: CategoryComponent
      },
      {
        path:'publish-company',
        component: PublishCompanyComponent
      },
      {
        path: 'borrow',
        component: BorrowComponent
      },
      {
        path: 'pay',
        component: PayComponent
      }
    ]
  },
  {
    path:'client',
    component: HomeClientComponent,
    children:[{
      path:'',
      component: BookComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
