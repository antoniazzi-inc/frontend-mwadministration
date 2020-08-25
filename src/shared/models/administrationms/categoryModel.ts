import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
export interface ICategoryEntity extends IBaseEntity{
  code?: string;
  color?: string;
}

export class CategoryEntity implements ICategoryEntity {
  constructor (
    public id?: number,
    public administrationId?: number,
  public code?: string,
  public color?: string,
  public version?: number,
  public createdOn?: Moment,
  public updatedOn?: Moment
  ) {
    this.color = '#319af2'
  }
};
