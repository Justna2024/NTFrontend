import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";
import { addBookDto} from "./dto/addBook.dto";
import { GetLoanDto} from "./dto/getLoan.dto";
import {JwtPayload, jwtDecode} from 'jwt-decode';
import { Loan } from '../entities/loan';

import Cookies from "universal-cookie"; 
import { LoanPresented } from "../loans/jsonTransform";
import { addLoanDto } from "./dto/addLoan.dto";
import { addUserDto } from "./dto/addUser.dto";
import { returnLoanDto } from "./dto/returnLoan.dto";
import { updateBookDto } from "./dto/updateBook.dto";
import { updateUserDto } from "./dto/updateUser.dto";

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
}



interface DecodedToken {
    sub: string;
    role: string;
    userId: bigint;
  }



export class LibraryClient {
  private client: AxiosInstance;
  private cookies: Cookies;
  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080', 
    });
    this.cookies = new Cookies(null, { path: '/' });
    this.client.defaults.headers.common['Authorization'] = `Bearer ${this.cookies.get("jwt")}`;
  }

  public async login(data: LoginDto): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/api/auth/login', data
      );




      this.client.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      console.log(this.client.defaults.headers.common['Authorization'])
      

      this.cookies.set("jwt", `${response.data.token}`)



      const decoded = jwtDecode<DecodedToken>(this.client.defaults.headers.common['Authorization']);

      this.cookies.set("userId", `${decoded.userId}`)
      this.cookies.set("role", `${decoded.role}`)

      console.log("userId",decoded.userId)
      console.log("userRole",decoded.role)

      return {
        success: true,
        data: response.data,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }


  public async addBook(data: addBookDto): Promise<ClientResponse<null>> {
    try {
        console.log(data)

        console.log(this.client.defaults.headers.common['Authorization'])


      const response: AxiosResponse<void> = await this.client.post(
        '/book', data
      );


      return {
        success: true,
        data: null,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;
        console.log(axiosError)
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }
  public async updateBook(data: updateBookDto, bookId: any): Promise<ClientResponse<null>> {
    try {
        console.log("AAAAA",data)

        console.log(this.client.defaults.headers.common['Authorization'])


      const response: AxiosResponse<void> = await this.client.put(
        `/book/update/${bookId}`, data
      );


      return {
        success: true,
        data: null,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;
        console.log(axiosError)
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }
  public async updateUser(data: updateUserDto, userId: any): Promise<ClientResponse<null>> {
    try {
        console.log("data:",data)

        console.log(this.client.defaults.headers.common['Authorization'])


      const response: AxiosResponse<void> = await this.client.put(
        `/user/update/${userId}`, data
      );


      return {
        success: true,
        data: null,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;
        console.log(axiosError)
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }

  public async deleteBook(bookId: any): Promise<ClientResponse<null>> {
    try {
        

        console.log(this.client.defaults.headers.common['Authorization'])


      const response: AxiosResponse<void> = await this.client.delete(
        `/book/${bookId}`
      );


      return {
        success: true,
        data: null,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;
        console.log(axiosError)
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }

  public async deleteUser(userId: any): Promise<ClientResponse<null>> {
    try {
        

        console.log(this.client.defaults.headers.common['Authorization'])


      const response: AxiosResponse<void> = await this.client.delete(
        `/user/${userId}`
      );


      return {
        success: true,
        data: null,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;
        console.log(axiosError)
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }

  public async deleteRequest(requestId: any): Promise<ClientResponse<null>> {
    try {
        

        console.log(this.client.defaults.headers.common['Authorization'])


      const response: AxiosResponse<void> = await this.client.delete(
        `/request/${requestId}`
      );


      return {
        success: true,
        data: null,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;
        console.log(axiosError)
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }

  public async addLoan(data: addLoanDto): Promise<ClientResponse<null>> {
    try {
        console.log("LoanClient",data)

        


      const response: AxiosResponse<void> = await this.client.post(
        '/loan/borrow', data
      );


      return {
        success: true,
        data: null,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;
        console.log(axiosError)
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }
  public async addRequest(bookId: any): Promise<ClientResponse<null>> {
    try {
        

        const userId = this.cookies.get("userId")
        const type = "Loan"


      const response: AxiosResponse<void> = await this.client.post(
        '/request', {bookId, userId, type}
      );


      return {
        success: true,
        data: null,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;
        console.log(axiosError)
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }

  public async addReturnRequest(loanId: any, bookId: any): Promise<ClientResponse<null>> {
    try {
        

        const userId = this.cookies.get("userId")
        const type = "Return"


      const response: AxiosResponse<void> = await this.client.post(
        '/request', {loanId, userId, type, bookId}
      );


      return {
        success: true,
        data: null,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;
        console.log(axiosError)
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }
  public async getRequests(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/request/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }
  public async returnLoan(data: returnLoanDto): Promise<ClientResponse<null>> {
    try {
        console.log("LoanClient",data)

        


      const response: AxiosResponse<void> = await this.client.post(
        '/loan/return', data
      );


      return {
        success: true,
        data: null,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;
        console.log(axiosError)
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }

  public async addUser(data: addUserDto): Promise<ClientResponse<null>> {
    try {
        console.log("UserClient",data)

        


      const response: AxiosResponse<void> = await this.client.post(
        '/api/auth/register', data
      );


      return {
        success: true,
        data: null,
        statusCode: response.status
      };

    } catch (error) {
      const axiosError = error as AxiosError<Error>;
        console.log(axiosError)
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }


  public async getBooks(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/book/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }

  public async getLoans(): Promise<ClientResponse<LoanPresented[] | null>> {
    try {

      

        const response = await this.client.get("/loan/getAll");


        let userLoans: LoanPresented[] = [];

        console.log('Response data:', response.data);

        response.data.forEach((loan: GetLoanDto) => {
          console.log('Loan:', loan);
          const presentationDto: LoanPresented= {
            loanId: loan.loanId ? loan.loanId.toString() : '0',
            bookId: loan.book?.bookId ? loan.book.bookId.toString() : '0',
            userId: loan.user?.userId ? loan.user.userId.toString() : '0',
            loanDate: loan.loanDate ?? new Date(),
            dueDate: loan.dueDate ?? new Date(),
            returnDate: loan.returnDate !== null && loan.returnDate !== undefined ? loan.returnDate : null,
          };
          
          userLoans.push(presentationDto);
          console.log(userLoans)
          
      });

        

      return {
        success: true,
        data: userLoans,
        statusCode: response.status
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }

  public async getUsers(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/user/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }
  public async getLoansByUser(): Promise<ClientResponse<LoanPresented[] | null>> {
    try {

        
        const userId = this.cookies.get("userId")

        

        const response = await this.client.get(`/loan/getByUserId?userId=${userId}`);


        let userLoans: LoanPresented[] = [];

        console.log('Response data:', response.data);

        response.data.forEach((loan: GetLoanDto) => {
          console.log('Loan:', loan);
          const presentationDto: LoanPresented= {
            loanId: loan.loanId ? loan.loanId.toString() : '0',
            bookId: loan.book?.bookId ? loan.book.bookId.toString() : '0',
            userId: loan.user?.userId ? loan.user.userId.toString() : '0',
            loanDate: loan.loanDate ?? new Date(),
            dueDate: loan.dueDate ?? new Date(),
            returnDate: loan.returnDate !== null && loan.returnDate !== undefined ? loan.returnDate : null,
          };
          
          userLoans.push(presentationDto);
          console.log(userLoans)
          
      });

        

      return {
        success: true,
        data: userLoans,
        statusCode: response.status
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }


  public async getBookById(bookId: any): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get(`/book/${bookId}`);

        

      return {
        success: true,
        data: response.data,
        statusCode: response.status
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }
  public async getUserById(userId: any): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get(`/user/${userId}`);

        

      return {
        success: true,
        data: response.data,
        statusCode: response.status
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0
      };
    }
  }

  

}
