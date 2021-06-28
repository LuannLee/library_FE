import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// FLexLayout
import { FlexLayoutModule } from '@angular/flex-layout';

// import API
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

// Import Component
import { HomeComponent } from './admin/home/home.component';
import { ListBookComponent } from './admin/list-book/list-book.component';
import { HomeClientComponent } from './client/home-client/home-client.component';
import { BookComponent } from './client/book/book.component';
import { ReaderComponent } from './admin/reader/reader.component';

// Import service
import { HttpClientModule } from '@angular/common/http';
import { ReaderService } from './services/reader.service';
import { AuthorService } from './services/author.service';
import { CategoryService } from './services/category.service';
import { PublishCompanyService } from './services/publishCompany.service';
import { BorrowService } from './services/borrow.service';
import { PayService } from './services/pay.service';
import { BorrowDetailService } from './services/borrowDetail.service';
import { BookService } from './services/book.service';
import { PayDetailService } from './services/payDetail.service';
import { Author_bookService } from './services/author_book.service';
import { Category_bookService } from './services/category_book.service';
import { BaseService } from './services/base.service';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateReaderComponent } from './shared/createReader/createReader.component';
import { UpdateReaderComponent } from './shared/update-reader/update-reader.component';
import { AuthorComponent } from './admin/author/author.component';
import { CreateAuthorComponent } from './shared/create-author/create-author.component';
import { UpdateAuthorComponent } from './shared/update-author/update-author.component';
import { CategoryComponent } from './admin/category/category.component';
import { CreateCategoryComponent } from './shared/create-category/create-category.component';
import { UpdateCategoryComponent } from './shared/update-category/update-category.component';
import { PublishCompanyComponent } from './admin/publish-company/publish-company.component';
import { CreateCompanyComponent } from './shared/create-company/create-company.component';
import { UpdateCompanyComponent } from './shared/update-company/update-company.component';
import { CreateBookComponent } from './shared/create-book/create-book.component';
import { UpdateBookComponent } from './shared/update-book/update-book.component';
import { BorrowComponent } from './admin/borrow/borrow.component';
import { CreateBorrowComponent } from './shared/create-borrow/create-borrow.component';
import { UpdateBorrowComponent } from './shared/update-borrow/update-borrow.component';
import { PayComponent } from './admin/pay/pay.component';
import { CreatePayComponent } from './shared/create-pay/create-pay.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListBookComponent,
    HomeClientComponent,
    BookComponent,
    ReaderComponent,
    ConfirmComponent,
    CreateReaderComponent,
    UpdateReaderComponent,
    AuthorComponent,
    CreateAuthorComponent,
    UpdateAuthorComponent,
    CategoryComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    PublishCompanyComponent,
    CreateCompanyComponent,
    UpdateCompanyComponent,
    CreateBookComponent,
    UpdateBookComponent,
    BorrowComponent,
    CreateBorrowComponent,
    UpdateBorrowComponent,
    PayComponent,
    CreatePayComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Flex Layout
    FlexLayoutModule,

    // Import API
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule

  ],
  providers: [
    ReaderService,
    AuthorService,
    CategoryService,
    PublishCompanyService,
    BorrowService,
    PayService,
    BorrowDetailService,
    PayDetailService,
    BookService,
    Author_bookService,
    Category_bookService,

    BaseService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
