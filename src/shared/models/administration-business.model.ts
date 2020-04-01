import { Moment } from 'moment';
import { IAdministration } from './administrationModel';
import {IBaseEntity} from "@/shared/models/baseModel";

export interface IAdministrationBusiness extends IBaseEntity{
    name?: string;
    description?: string;
    website?: string;
    administration?: IAdministration;
}

export class AdministrationBusiness implements IAdministrationBusiness {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public website?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public administration?: IAdministration
    ) {}
}
