export interface User {
    userId: bigint;
    firstName: string;
    lastName: string;
    dateOfBirth: number;
    email: string;
    auth: any;
    student: boolean;
}