export class PayModel {
  public id! : string;
  public payDate : string;
  public status: number;
  public readerId : string;
  public borrowId!: string;
  public borrowName!: string;

  constructor(payDate:string = '',readerId:string = '', status :number = 1){
    this.payDate = payDate;
    this.readerId = readerId;
    this.status = status;
   }
}
