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
import { ITaxRateLink } from '@/shared/models/administrationms/tax-rate-link.model'

export default class TaxRateLinkService extends BaseEntityService<ITaxRateLink> {
  private static instance: TaxRateLinkService;

  private constructor () {
    super('api/administrationms/api/tax-rate-links')
  }

  public static getInstance (): TaxRateLinkService {
    if (!TaxRateLinkService.instance) {
      return new TaxRateLinkService()
    }
    return TaxRateLinkService.instance
  }
}
