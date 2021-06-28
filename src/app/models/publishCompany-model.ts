export class PublishCompanyModel {
  public id!: string;
  public name : string;
  public address: string;
  public email: string;
  public status: number;

  constructor(name:string = '', address: string = '',email:string = '', status :number = 1){
    this.name = name;
    this.address = address;
    this.email = email;
    this.status = status;
   }
}
