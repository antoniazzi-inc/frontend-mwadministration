import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { ICourse } from './CourseModel'

export interface ITypeCourse extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    course?: ICourse;
}

export class TypeCourse implements ITypeCourse {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public course?: ICourse,
  ){
  }
};
