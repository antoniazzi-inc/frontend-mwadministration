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

export interface IMultiLanguageConfig {
  showName?: boolean;
  showDescription?: boolean;
  nameLabel?: string;
  descriptionLabel?: string;
  enableUndoBtn?: boolean;
  enableRemoveBtn?: boolean;
  enableSaveBtn?: boolean;
  showLangs?: boolean;
  requiredName?: boolean;
  requiredDescription?: boolean;
}

export class MultiLanguageConfig implements IMultiLanguageConfig {
  constructor (
    public showName?: boolean,
  public showDescription?: boolean,
  public nameLabel?: string,
  public descriptionLabel?: string,
  public enableUndoBtn?: boolean,
  public enableRemoveBtn?: boolean,
  public enableSaveBtn?: boolean,
  public showLangs?: boolean,
  public requiredName?: boolean,
  public requiredDescription?: boolean
  ) {
    this.nameLabel = this.nameLabel ? this.nameLabel : ''
    this.descriptionLabel = this.descriptionLabel ? this.descriptionLabel : ''
  }
}
