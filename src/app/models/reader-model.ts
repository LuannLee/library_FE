export class ReaderModel {
  public id!: string;
  public name : string;
  public address: string;
  public status: number;

  constructor(name: string = '', address : string = '', status: number = 1){
    this.name = name;
    this.address = address;
    this.status = status;
  }
}
