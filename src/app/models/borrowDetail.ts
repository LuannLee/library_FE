export class BorrowDetail {
  public bookId: string;
  public bookName! : string
  public borrowId!: string;
  public quantity: number;
  public status: number;

  constructor(bookId:string = '',borrowId:string = '',quantity:number = 1, status :number = 1){
    this.bookId = bookId;
    this.quantity = quantity;
    this.status = status;
   }
}
