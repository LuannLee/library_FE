export class AuthorModel {
  public id! : string;
  public name: string;
  public website: string;
  public status: number;

  constructor(name:string = '', website: string = '', status :number = 1){
   this.name = name;
   this.website = website;
   this.status = status;
  }
}

