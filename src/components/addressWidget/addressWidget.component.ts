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

import Component, {mixins} from 'vue-class-component'
import {Vue, Watch} from 'vue-property-decorator'
import {AddressType, IRelationAddress, RelationAddress} from '@/shared/models/relationms/relation-address.model'
import CommonHelpers from '@/shared/commonHelpers'
import {ICountry} from '@/shared/models/administrationms/country.model'
import {ISearchableSelectConfig, SearchableSelectConfig} from '@/shared/models/SearchableSelectConfig'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'

@Component({
  components: {
    ToggleSwitch,
    SearchableSelectComponent
  },
  props: {
    address: Object
  }
})
export default class AddressWidgetComponent extends mixins(CommonHelpers, Vue) {
  public addressCopy: IRelationAddress;
  public addressTypes: any;
  public searchableConfig: ISearchableSelectConfig;
  public editMode: boolean;
  public showMore: boolean;
  public addressError: string;
  public newAddress: boolean;
  public selectedCountry: ICountry | null

  constructor() {
    super()
    this.addressTypes = {
      home: AddressType.HOME,
      other: AddressType.OTHER,
      postal: AddressType.POSTAL,
      work: AddressType.WORK
    }
    this.searchableConfig = new SearchableSelectConfig('enName',
      'labels.country', '', true,
      false, false, false, false)
    this.editMode = false
    this.newAddress = false
    this.showMore = false
    this.addressError = ''
    this.selectedCountry = null
    this.addressCopy = new RelationAddress()
  }

  @Watch('address', {immediate: true, deep: true})
  public populate(newVal: any) {
    if (newVal) {
      this.addressError = ''
      this.addressCopy = newVal
      if (newVal && !newVal.id) {
        this.newAddress = true
      } else {
        this.newAddress = false
      }
    }
  }

  public countryChanged(country: any) {
    if(!country) return
    this.selectedCountry = country
    this.addressCopy.countryId = country ? country.id : this.selectedCountry ? this.selectedCountry.id : this.$store.state.administration.country.id
  }

  public edit(entity: any) {
    this.editMode = true
    let country = this.preselectCountry(this.addressCopy.countryId)
    this.countryChanged(country)
    this.$emit('onEdit', this.addressCopy)
  }

  public remove() {
    this.$emit('onRemove', this.addressCopy)
  }

  public cancel() {
    this.$emit('onCancel')
    this.editMode = false
    this.newAddress = false
    if (!this.addressCopy.id) this.remove()
  }

  public save() {
    let self = this
    let isValid = this.validateAddress(self.addressCopy)
    if (isValid.status) {
      self.$emit('onSave', self.addressCopy)
      self.cancel()
    } else {
      if (isValid.msg)
        self.addressError = isValid.msg
    }
  }
}
