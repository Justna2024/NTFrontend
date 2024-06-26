import { Book } from "../entities/book";
import { Loan } from "../entities/loan";
import { User } from "../entities/user";

export interface SingleLoan {
    loanId: number;
    book: Book;
    user: User;
    loanDate: number;
    dueDate: number;
    returnDate: number;
}


export interface LoanPresented {
    loanId: string;
    bookId: string;
    userId: string;
    loanDate: Date;
    dueDate: Date;
    returnDate: Date | null;
}


// export function readLoanJson(data: SingleLoan[]): LoanPresented[] {
//     return data.map(item => ({
//         loanId: BigInt(item.loanId),
//         bookId: BigInt(item.book.bookId),
//         userId: BigInt(item.user.userId),
//         loanDate: new Date(item.loanDate),
//         dueDate: new Date(item.dueDate),
//         returnDate: new Date(item.returnDate)
//     }));
// }

