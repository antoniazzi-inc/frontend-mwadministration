import {Moment} from "moment";
import {AdministrationEntity} from "@/shared/models/administrationModel";

export interface IBaseEntity {
  id?: number;
  createdOn?: Moment;
  updatedOn?: Moment;
  version?: number;
  administration?: AdministrationEntity;
}

export class BaseEntity implements IBaseEntity {
  constructor(
  ){
  }
};
