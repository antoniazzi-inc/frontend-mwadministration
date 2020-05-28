import { IBaseEntity } from './baseModel';

export interface IIdQty extends IBaseEntity {
    id?: number;
    quantity?: number;
}

export class IdQty implements IIdQty {
constructor(
    public id?: number,
    public quantity?: number,
  ){
  }
};
