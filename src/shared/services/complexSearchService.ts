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

import BaseEntityService from '@/shared/services/baseEntityService'
import {IComplexSearch} from "@/shared/models/complexSearchModel";
import axios from "axios";

export default class ComplexSearchService extends BaseEntityService<IComplexSearch> {
  private static instance: ComplexSearchService;

  private constructor () {
    super('api/')
  }

  public static getInstance (): ComplexSearchService {
    if (!ComplexSearchService.instance) {
      return new ComplexSearchService()
    }
    return ComplexSearchService.instance
  }

  public searchRelations(url:any, query:any){
    return new Promise(resolve => {
      axios.post(url, query).then(function (res) {
        resolve(res)
      })
    })
  }
}
