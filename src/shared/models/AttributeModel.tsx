import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { IProduct } from './ProductModel'
import { IAttributeLanguage } from './AttributeLanguageModel'
import { IAttributeValue } from './AttributeValueModel'

export interface IAttribute extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    multipleValues?: boolean;
    visible?: boolean;
    visibleInFrontEnd?: boolean;
    tax?: number;
    product?: IProduct;
    attributeLanguages?: IAttributeLanguage[];
    attributeValues?: IAttributeValue[];
}

export class Attribute implements IAttribute {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public multipleValues?: boolean,
    public visible?: boolean,
    public visibleInFrontEnd?: boolean,
    public tax?: number,
    public product?: IProduct,
    public attributeLanguages?: IAttributeLanguage[],
    public attributeValues?: IAttributeValue[],
  ){
  }
};
