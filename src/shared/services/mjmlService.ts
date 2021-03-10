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

import axios from 'axios'
export default class MjmlService {
  private static instance: MjmlService;

  private constructor () {
  }

  public static getInstance (): MjmlService {
    if (!MjmlService.instance) {
      return new MjmlService()
    }
    return MjmlService.instance
  }

  public renderTemplate (entity: any) {
    return new Promise((resolve, reject) => {
      const token ='1a336b03-7c52-49a5-9f5f-b669dbf13c06:dfd53576-0500-4694-904f-1b8b526ac1ee'
      axios.post('/render', { mjml: entity }, {headers:{
        'Authorization': 'Basic ' + token,
          'sec-fetch-mode': 'no-cors',
          'Sec-Fetch-Site': 'none',
          'Access-Control-Allow-Credentials': 'true'
        }}).then(resp => {
        resolve(resp)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
