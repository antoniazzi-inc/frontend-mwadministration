import { IBaseEntity } from '../baseModel';
import {ILanguage} from "@/shared/models/language.model";

export interface ITermsAndConditions extends IBaseEntity {
    agreeConditions?: boolean;
    agreePrivacyStatement?: boolean;
    conditionsLinkText?: ILanguage[];
    privacyStatementLinkText?: ILanguage[];
    linkToConditions?: string;
    privacyStatement?: string;
}

export class TermsAndConditions implements ITermsAndConditions {
constructor(
    public agreeConditions?: boolean,
    public agreePrivacyStatement?: boolean,
    public conditionsLinkText?: ILanguage[],
    public privacyStatementLinkText?: ILanguage[],
    public linkToConditions?: string,
    public privacyStatement?: string,
  ){
  }
};
