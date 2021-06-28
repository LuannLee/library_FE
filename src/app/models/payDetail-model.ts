export class PayDetailModel {
  public id!: string;
  public bookId: string;
  public payId :string;
  public quantity : number;
  public status: number;

  constructor(bookId:string = '',payId:string = '',quantity:number = 1, status :number = 1){
    this.bookId = bookId;
    this.payId = payId;
    this.quantity = quantity;
    this.status = status;
   }
}
