export type LoginFormType = {
    email: string;
    password: string;
}

export type AuthUserType = {
    email: string;
    exp: number;
    iat: number;
    name: string;
    role: string;
    sub: string;
    defaultOutlet: string;
}