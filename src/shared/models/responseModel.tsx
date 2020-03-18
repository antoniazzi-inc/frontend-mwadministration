import { IBaseEntity } from "@/shared/models/baseModel";

export interface IResponseEntity extends IBaseEntity {
  data: object,
  status: string
}

export class ResponseEntity implements IResponseEntity {
  constructor(
    public data: object,
    public status: string
  ){
  }
};
