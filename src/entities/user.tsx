export interface User {
    userId: bigint
    firstName: string | undefined;
    lastName: string    | undefined;
    dateOfBirth: number      | undefined;
    email: string | undefined;
    auth: any | undefined;
    student: boolean | undefined;
}