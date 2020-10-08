import {IComplexSearchQuery} from "@/shared/models/complexSearchQueryModel";

export interface IComplexSearchGroup {
    operator?: string;
    queries?: IComplexSearchQuery[];
}

export class ComplexSearchGroup implements IComplexSearchGroup {
constructor(
    public operator?: string,
    public queries?: IComplexSearchQuery[]
  ){
  }
};
