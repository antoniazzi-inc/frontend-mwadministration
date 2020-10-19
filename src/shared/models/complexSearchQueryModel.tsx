export interface IComplexSearchQuery {
  msName?: string;
  query?: string;
}

export class ComplexSearchQuery implements IComplexSearchQuery {
  constructor(
    public  msName?: string,
    public query?: string,
    public inOperator?: boolean,
  ) {
  }
}
