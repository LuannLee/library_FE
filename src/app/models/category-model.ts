export class CategoryModel {
  public id! : string;
  public name: string;
  public status: number;

  constructor(name:string = '', status :number = 1){
    this.name = name;
    this.status = status;
   }
}
