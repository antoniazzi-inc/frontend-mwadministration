import { Moment } from 'moment';
import { IExternalSystemConfig } from './ExternalSystemConfigModel'
import { IFollowupEmail } from './FollowupEmailModel'
import { IProduct } from './ProductModel';
import {IBaseEntity} from "./baseModel";

export interface IFollowupAction extends IBaseEntity {
  points?: number;
  executeDirectly?: boolean;
  externalSystemConfigsJson?: IExternalSystemConfig[];
  tagIdsJson?: Number[];
  customerEmailsJson?: IFollowupEmail[];
  customerListManagerIdsJson?: Number[];
  beneficiaryEmailsJson?: IFollowupEmail[];
  beneficiaryListManagerIdsJson?: Number[];
  addCustomerToGroupIdsJson?: Number[];
  removeCustomerFromGroupIdsJson?: Number[];
  addBeneficiaryToGroupIdsJson?: Number[];
  removeBeneficiaryFromGroupIdsJson?: Number[];
  product?: IProduct;
}

export class FollowupAction implements IFollowupAction {
  constructor(
    public id?: number,
    public administrationId?: number,
    public points?: number,
    public executeDirectly?: boolean,
    public externalSystemConfigsJson?: IExternalSystemConfig[],
    public tagIdsJson?: Number[],
    public customerEmailsJson?: IFollowupEmail[],
    public customerListManagerIdsJson?: Number[],
    public beneficiaryEmailsJson?: IFollowupEmail[],
    public beneficiaryListManagerIdsJson?: Number[],
    public addCustomerToGroupIdsJson?: Number[],
    public removeCustomerFromGroupIdsJson?: Number[],
    public addBeneficiaryToGroupIdsJson?: Number[],
    public removeBeneficiaryFromGroupIdsJson?: Number[],
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public version?: number,
    public product?: IProduct
  ) {
    this.executeDirectly = this.executeDirectly || false;
  }
};
