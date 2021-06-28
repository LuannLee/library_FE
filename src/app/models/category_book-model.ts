export class Category_bookModel {
  public categoryId : string;
  public bookId : string;

  constructor(categoryId : string = '',bookId:string = ''){
    this.categoryId= categoryId;
    this.bookId = bookId;
   }
}
