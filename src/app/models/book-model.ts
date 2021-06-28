export class BookModel {
  public id! : string;
  public name : string;
  public publishYear: number;
  public publishCompanyId : string;
  public publishCompanyName! : string;
  public authorId! : string;
  public authorNames! :string;
  public categoryNames! : string;
  public categoryId! : string;
  public quantity: number;
  public status : number;

  constructor(name:string = '', publishYear = 2021, publishCompanyId: string = '', authorId: string = '',categoryId: string = '',quantity:number = 100, status :number = 1){
    this.name = name;
    this.publishYear = publishYear;
    this.publishCompanyId = publishCompanyId;
    this.quantity = quantity;
    this.status = status;
   }
}
