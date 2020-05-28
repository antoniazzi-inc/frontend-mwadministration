import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { ICourseLanguage } from './CourseLanguageModel'

export interface ICourse extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    pageContentJson?: string;
    courseLanguages?: ICourseLanguage[];
}

export class Course implements ICourse {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public pageContentJson?: string,
    public courseLanguages?: ICourseLanguage[],
  ){
  }
};
