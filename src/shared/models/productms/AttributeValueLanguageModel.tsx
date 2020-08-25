import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IAttributeValue } from './AttributeValueModel'

export interface IAttributeValueLanguage extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    langKey?: string;
    name?: string;
    description?: string;
    administrationId?: number;
    attributeValue?: IAttributeValue;
}

export class AttributeValueLanguage implements IAttributeValueLanguage {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public langKey?: string,
    public name?: string,
    public description?: string,
    public administrationId?: number,
    public attributeValue?: IAttributeValue,
  ){
  }
};
