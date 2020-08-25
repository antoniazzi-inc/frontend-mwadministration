import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';

export interface IBeneficiaryDeliveryAddress extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    beneficiaryRelationId?: number;
    beneficiaryRelationAddressId?: number;
    street?: string;
    houseNumber?: string;
    city?: string;
    countryId?: number;
    entranceNumber?: string;
    appartmentNumber?: string;
    postalCode?: string;
    addressType?: string;
    phoneNumber?: string;
    description?: string;
    phoneType?: string;
}

export default class BeneficiaryDeliveryAddress implements IBeneficiaryDeliveryAddress {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public beneficiaryRelationId?: number,
    public beneficiaryRelationAddressId?: number,
    public street?: string,
    public houseNumber?: string,
    public city?: string,
    public countryId?: number,
    public entranceNumber?: string,
    public appartmentNumber?: string,
    public postalCode?: string,
    public addressType?: string,
    public phoneNumber?: string,
    public description?: string,
    public phoneType?: string,
  ){
  }
};
