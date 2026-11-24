export interface IUser {
    name: string,
    email: string,
    password: string,
    age?: number | null,
    role?: string
}

export interface Id {
    id: number | string
}