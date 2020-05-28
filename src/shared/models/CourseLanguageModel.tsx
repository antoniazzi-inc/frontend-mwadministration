import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { ICourse } from './CourseModel'

export interface ICourseLanguage extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    langKey?: string;
    name?: string;
    description?: string;
    administrationId?: number;
    course?: ICourse;
}

export class CourseLanguage implements ICourseLanguage {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public langKey?: string,
    public name?: string,
    public description?: string,
    public administrationId?: number,
    public course?: ICourse,
  ){
  }
};
