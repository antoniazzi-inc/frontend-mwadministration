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

export interface ISearchableSelectConfig {
  trackBy?: string;
  placeholder?: string;
  addCaption?: string;
  required?: boolean;
  allowEmpty?: boolean;
  enableAdd?: boolean;
  multiple?: boolean;
  internalSearch?: boolean;
  hasGroups?: boolean;
}

export class SearchableSelectConfig implements ISearchableSelectConfig {
  constructor (
    public trackBy?: string,
    public placeholder?: string,
    public addCaption?: string,
    public required?: boolean,
    public enableAdd?: boolean,
    public allowEmpty?: boolean,
    public multiple?: boolean,
    public internalSearch?: boolean,
    public hasGroups?: boolean,
    public preselectFirst?: boolean
  ) {
    this.trackBy = this.trackBy ? this.trackBy : 'label'
    this.placeholder = this.placeholder ? this.placeholder : 'selectValue'
    this.addCaption = this.addCaption ? this.addCaption : ''
    this.enableAdd = this.enableAdd  !== undefined ? this.enableAdd : false
    this.allowEmpty = this.allowEmpty  !== undefined  ? this.allowEmpty : true
    this.multiple = this.multiple  !== undefined  ? this.multiple : false
    this.internalSearch = this.internalSearch  !== undefined  ? this.internalSearch : false
    this.hasGroups = this.hasGroups  !== undefined  ? this.hasGroups : false
    this.preselectFirst = this.preselectFirst  !== undefined  ? this.preselectFirst : false
  }
}
