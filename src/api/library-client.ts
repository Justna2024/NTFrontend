import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";
import { addBookDto} from "./dto/addBook.dto";

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
}

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080', 
    });
  }

  public async login(data: LoginDto): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/api/auth/login', data
      );


      //in the video it was said that we can use this to have the same client the whole time
      //if it is like that we can copy jwt decode code from login-form
      //how to retrieve data from this?
      // so we can use with userid and user role

      this.client.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      console.log(this.client.defaults.headers.common['Authorization'])

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

  public async getLoans(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/loan/getAll');
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
