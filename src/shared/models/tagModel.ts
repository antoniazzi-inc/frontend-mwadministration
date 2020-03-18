import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
import { IRelationEntity } from '@/shared/models/relationModel'
export interface ITagEntity extends IBaseEntity{
  code?: string;
  points?: number;
}

export class TagEntity implements ITagEntity {
  constructor (
    public id?: number,
    public administrationId?: number,
  public code?: string,
  public points?: number,
  public version?: number,
  public createdOn?: Moment,
  public updatedOn?: Moment
  ) {
  }
};
