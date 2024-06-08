export interface Loan {
    loanId: bigint;
    bookId: bigint;
    userId: bigint;
    loanDate: Date;
    dueDate: Date;
    returnDate: Date;
  }