import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
export  enum ServicePriceType {
  FIXED='FIXED',
  MINUTES_15='MINUTES_15',
  MINUTES_30='MINUTES_30',
  MINUTES_45='MINUTES_45',
  HOUR='HOUR',
  DAY='DAY'
}
export interface ITypeService extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    priceType?: ServicePriceType;
}

export class TypeService implements ITypeService {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public priceType?: ServicePriceType,
  ){
  this.priceType = priceType ? priceType : ServicePriceType.FIXED
  }
};
