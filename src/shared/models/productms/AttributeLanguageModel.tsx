import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IAttribute } from './AttributeModel'

export interface IAttributeLanguage extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    langKey?: string;
    name?: string;
    description?: string;
    administrationId?: number;
    attribute?: IAttribute;
}

export class AttributeLanguage implements IAttributeLanguage {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public langKey?: string,
    public name?: string,
    public description?: string,
    public administrationId?: number,
    public attribute?: IAttribute,
  ){
  }
};
