import { Book } from "./book";
import { User } from "./user";


export interface Loan {
    loanId: bigint | undefined;
    book: Book | undefined;
    user: User| undefined;
    loanDate: Date | undefined;
    dueDate: Date | undefined;
    returnDate: Date | undefined;
  }