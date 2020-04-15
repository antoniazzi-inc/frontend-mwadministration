import {Moment} from "moment";
import {AdministrationEntity} from "@/shared/models/administrationModel";

export interface IBaseEntity {
  id?: number;
  createdOn?: Moment;
  updatedOn?: Moment;
  version?: number;
  administrationId?: number;
}

export class BaseEntity implements IBaseEntity {
  constructor(
   public id?: number,
   public createdOn?: Moment,
   public updatedOn?: Moment,
   public version?: number,
   public administrationId?: number
  ){}
};
