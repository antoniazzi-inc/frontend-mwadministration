import { IBaseEntity } from './baseModel';

export interface IShippingCost extends IBaseEntity {
    regionId?: number;
    preferredShippingMethodId?: number;
    cost?: number;
    indexOrder?: number;
}

export class ShippingCost implements IShippingCost {
constructor(
    public regionId?: number,
    public preferredShippingMethodId?: number,
    public cost?: number,
    public indexOrder?: number,
  ){
  }
};
