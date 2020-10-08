import {IComplexSearchGroup} from "@/shared/models/complexSearchGroupModel";

export interface IComplexSearch {
    page?: number;
    size?: number;
    sort?: string;
    operator?: string;
    groups?: IComplexSearchGroup[];
}

export class ComplexSearch implements IComplexSearch {
constructor(
    public  page?: number,
  public size?: number,
    public sort?: string,
    public operator?: string,
  public groups?: IComplexSearchGroup[]
  ){
  }
};
