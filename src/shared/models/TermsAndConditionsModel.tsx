import { IBaseEntity } from './baseModel';

export interface ITermsAndConditions extends IBaseEntity {
    agreeConditions?: boolean;
    agreePrivacyStatement?: boolean;
    linkToConditions?: string;
    privacyStatement?: string;
    linkText?: string;
}

export class TermsAndConditions implements ITermsAndConditions {
constructor(
    public agreeConditions?: boolean,
    public agreePrivacyStatement?: boolean,
    public linkToConditions?: string,
    public privacyStatement?: string,
    public linkText?: string,
  ){
  }
};
