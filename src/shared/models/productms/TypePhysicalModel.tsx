import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IShippingCost } from '../ShippingCostModel'

export interface ITypePhysical extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    weight?: number;
    height?: number;
    length?: number;
    depth?: number;
    scale?: string;
    shippingCostsJson?: IShippingCost[];
}

export class TypePhysical implements ITypePhysical {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public weight?: number,
    public height?: number,
    public length?: number,
    public depth?: number,
    public scale?: string,
    public shippingCostsJson?: IShippingCost[],
  ){
  }
};
