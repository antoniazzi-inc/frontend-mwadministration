/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

import { Moment } from 'moment';
import { IExternalSystemConfig } from '../ExternalSystemConfigModel'
import { IFollowupEmail } from '../FollowupEmailModel'
import { IProduct } from './ProductModel';
import {IBaseEntity} from "../baseModel";


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
