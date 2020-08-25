import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';
import { IOrderProductAttributeValue } from './OrderProductAttributeValueModel'

export interface IOrderProduct extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    productId?: number;
    sku?: string;
    productName?: string;
    productDescription?: string;
    productPrice?: number;
    taxPercentage?: number;
    taxLevel?: number;
    termsAndConditionsJson?: string;
    points?: number;
    downloadUrl?: string;
    productType?: string;
    productTypeDetailsJson?: string;
    orderProductAttributeValues?: IOrderProductAttributeValue[];
}

export default class OrderProduct implements IOrderProduct {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public productId?: number,
    public sku?: string,
    public productName?: string,
    public productDescription?: string,
    public productPrice?: number,
    public taxPercentage?: number,
    public taxLevel?: number,
    public termsAndConditionsJson?: string,
    public points?: number,
    public downloadUrl?: string,
    public productType?: string,
    public productTypeDetailsJson?: string,
    public orderProductAttributeValues?: IOrderProductAttributeValue[],
  ){
  }
};
