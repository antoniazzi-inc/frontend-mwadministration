/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { ICourseLanguage } from './CourseLanguageModel'
import {ITypeCourse} from "@/shared/models/productms/TypeCourseModel";
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
