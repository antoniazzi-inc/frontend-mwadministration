import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';

export interface IOrderLineBeneficiary extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    beneficiaryRelationId?: number;
    email?: string;
    fullName?: string;
    title?: string;
}

export default class OrderLineBeneficiary implements IOrderLineBeneficiary {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public beneficiaryRelationId?: number,
    public email?: string,
    public fullName?: string,
    public title?: string,
  ){
  }
};
