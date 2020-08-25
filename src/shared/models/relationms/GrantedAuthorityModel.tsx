import {BaseEntity} from '../baseModel';

export interface IGrantedAuthority extends BaseEntity {
    authority?: string;
}

export default class GrantedAuthority implements IGrantedAuthority {
constructor(
    public authority?: string,
  ){
  }
};
