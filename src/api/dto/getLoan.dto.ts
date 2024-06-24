import { Book } from "../../entities/book";
import { User } from "../../entities/user";

export class GetLoanDto{
    loanId: bigint | undefined;
    book: Book | undefined;
    user: User | undefined;
    loanDate: Date | undefined;
    dueDate: Date | undefined;
    returnDate: Date | undefined;
}