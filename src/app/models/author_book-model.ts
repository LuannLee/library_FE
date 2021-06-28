export class Author_bookModel {
  public authorId : string;
  public bookId: string;

  constructor(authorId : string = '',bookId:string = ''){
    this.authorId = authorId;
    this.bookId = bookId;
  }
}
