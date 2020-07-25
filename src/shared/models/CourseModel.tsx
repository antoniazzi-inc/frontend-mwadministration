import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { ICourseLanguage } from './CourseLanguageModel'
import {ITypeCourse} from "@/shared/models/TypeCourseModel";
import {IEvent} from "@/shared/models/event.model";

export interface ICourse extends IBaseEntity {
    pageContentJson?: string;
    courseLanguages?: ICourseLanguage[];
    events?: IEvent[];
    typeCourses?: ITypeCourse[];
}

export class Course implements ICourse {
constructor(
    public id?: number,
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public version?: number,
    public administrationId?: number,
    public pageContentJson?: string,
    public courseLanguages?: ICourseLanguage[],
    public events?: IEvent[],
    public typeCourses?: ITypeCourse[]
  ){
  }
};
