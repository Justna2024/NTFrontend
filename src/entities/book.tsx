export interface Book {
    bookId: bigint;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    year: number;
    availableCopies: number;
  }