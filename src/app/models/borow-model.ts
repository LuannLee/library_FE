export class BorowModel {
  public id! : string;
  public borrowDate!: string;
  public payDate: string;
  public status: number;
  public readerId : string;
  public readerName! : string;
  public borrowName! : string;

  constructor(payDate: string = '' ,readerId:string = '', status :number = 1){
    this.payDate = payDate;
    this.readerId = readerId;
    this.status = status;
   }
}
