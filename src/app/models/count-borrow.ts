export class CountBorrow {
  public countBorrow: number;
  public countBorrowActive : number;
  public countBorrowInActive : number;
  public countBorrowProcess : number;

  constructor(countBorrow: number = 0, countBorrowActive : number = 0 , countBorrowInActive: number = 0, countBorrowProcess = 0){
    this.countBorrow = countBorrow;
    this.countBorrowActive = countBorrowActive;
    this.countBorrowInActive = countBorrowInActive;
    this.countBorrowProcess = countBorrowProcess;
  }
}
