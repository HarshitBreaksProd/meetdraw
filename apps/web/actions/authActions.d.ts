export interface FormState {
    message: string;
    user?: {
        id: string;
        name: string;
        username: string;
    };
    errors?: any;
}
export declare function signupAction(prevState: FormState, formData: FormData): Promise<FormState>;
export declare function signinAction(prevState: FormState, formData: FormData): Promise<FormState>;
export declare function signoutAction(): Promise<{
    message: any;
} | undefined>;
//# sourceMappingURL=authActions.d.ts.map