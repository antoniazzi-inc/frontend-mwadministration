
export interface ILoginEntity {
  administrationKey: string,
  username: string,
  password: string,
  rememberMe: boolean
}

export class LoginEntity implements ILoginEntity {
  constructor(
    public administrationKey: string,
    public username: string,
    public password: string,
    public rememberMe: boolean,
  ){
  }
};
