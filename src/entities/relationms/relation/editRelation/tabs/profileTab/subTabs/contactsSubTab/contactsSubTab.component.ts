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

import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { IRelationEntity, RelationEntity } from '@/shared/models/relationms/relationModel'
import { IRelationPhone, RelationPhone } from '@/shared/models/relationms/relation-phone.model'
import { RelationAddress } from '@/shared/models/relationms/relation-address.model'
import PhoneWidgetComponent from '@/components/phoneWidget/phoneWidget.vue'
import RelationPhoneService from '@/shared/services/relationPhoneService'
import { AxiosResponse } from 'axios'
import AddressWidgetComponent from '@/components/addressWidget/addressWidget.vue'
import RelationAddressService from '@/shared/services/relationAddressService'

@Component({
  components: {
    PhoneWidgetComponent,
    AddressWidgetComponent
  },
  props: {
    rel: Object
  }
})
export default class ContactsSubTabComponent extends mixins(Vue, CommonHelpers) {
  public currentTab: string;
  public relationPhoneService: any;
  public relationAddressService: any;
  public phoneToEdit: any;
  public addressToEdit: any;
  public addNewCommunication: boolean;
  public addAddress: boolean;
  public relationCopy: IRelationEntity;

  constructor () {
    super()
    this.relationPhoneService = RelationPhoneService.getInstance()
    this.relationAddressService = RelationAddressService.getInstance()
    this.currentTab = 'profile'
    this.addNewCommunication = false
    this.addAddress = false
    this.phoneToEdit = null
    this.addressToEdit = null
    this.relationCopy = new RelationEntity()
  }

  @Watch('rel', { immediate: true, deep: true })
  public populateRelation (newVal: IRelationEntity) {
    if (newVal) this.relationCopy = newVal
  }

  public addNewPhone () {
    this.addNewCommunication = true
    const newPhone = new RelationPhone()
    newPhone.relation = { id: this.relationCopy.id, version: this.relationCopy.version }
    this.relationCopy.relationPhones ? this.relationCopy.relationPhones.push(newPhone)
      : this.relationCopy.relationPhones = [newPhone]
  }

  public addNewAddress () {
    this.addAddress = true
    const newAddress = new RelationAddress()
    newAddress.relation = { id: this.relationCopy.id, version: this.relationCopy.version }
    this.relationCopy.relationAddresses ? this.relationCopy.relationAddresses.push(newAddress)
      : this.relationCopy.relationAddresses = [newAddress]
  }

  public async saveAddress (address: any, index: number) {
    this.addAddress = false
    if (address && address.id) {
      address.relation = {
        id: this.relationCopy.id,
        version: this.relationCopy.version
      }
      this.relationAddressService.put(address).then((resp: AxiosResponse) => {
        if (resp) {
          this.setAlert('relationAddressUpdated', 'success')
          if (this.relationCopy.relationAddresses) {
            this.relationCopy.relationAddresses[index] = resp.data
          }
        } else {
          this.setAlert('relationAddressUpdateError', 'error')
        }
      })
    } else {
      this.relationAddressService.post(address).then((resp: AxiosResponse) => {
        if (resp) {
          this.setAlert('relationAddressCreated', 'success')
          this.relationCopy.relationAddresses ? this.relationCopy.relationAddresses.push(resp.data)
            : this.relationCopy.relationAddresses = [resp.data]
        } else {
          this.setAlert('relationAddressError', 'error')
        }
      })
    }
  }

  public deleteAddress (address: any, index: number) {
    this.addAddress = false
    if (address && address.id) {
      this.relationAddressService.delete(address.id).then((resp: AxiosResponse) => {
        if (resp) {
          this.setAlert('relationAddressRemoved', 'success')
          if (this.relationCopy.relationAddresses) this.relationCopy.relationAddresses.splice(index, 1)
        } else {
          this.setAlert('relationAddressError', 'error')
        }
      })
    } else {
      if (this.relationCopy.relationAddresses) this.relationCopy.relationAddresses.splice(index, 1)
    }
  }

  public async savePhone (phone: any, index: number) {
    this.addNewCommunication = false
    if (phone && phone.id) {
      phone.relation = {
        id: this.relationCopy.id,
        version: this.relationCopy.version
      }
      const result = await this.relationPhoneService.put(phone)
      if (result) {
        this.setAlert('relationCommunicationUpdated', 'success')
        if (this.relationCopy.relationPhones) {
          this.relationCopy.relationPhones[index] = result.data
        }
        this.$emit('updateRel', this.relationCopy)
      } else {
        this.setAlert('relationCommunicationError', 'error')
      }
    } else {
      const result = await this.relationPhoneService.post(phone)
      if (result) {
        this.$emit('updateRel', this.relationCopy)
        this.setAlert('relationCommunicationCreated', 'success')
      } else {
        this.setAlert('relationCommunicationError', 'error')
      }
      this.relationCopy.relationPhones ? this.relationCopy.relationPhones.push(result.data)
        : this.relationCopy.relationPhones = [result.data]
    }
  }

  public editPhone (index: any) {
    this.addNewCommunication = true
    this.phoneToEdit = index
  }

  public editAddress (index: any) {
    this.addAddress = true
    this.addressToEdit = index
  }

  public cancelAddress () {
    this.addressToEdit = null
    this.addAddress = false
  }

  public cancelPhone () {
    this.phoneToEdit = null
    this.addNewCommunication = false
  }

  public deletePhone (phone: any, index: number) {
    this.addNewCommunication = false
    if (phone && phone.id) {
      this.relationPhoneService.delete(phone.id).then((resp: AxiosResponse) => {
        if (resp) {
          this.setAlert('relationCommunicationRemoved', 'success')
          if (this.relationCopy.relationPhones) this.relationCopy.relationPhones.splice(index, 1)
        } else {
          this.setAlert('relationCommunicationRemoveError', 'error')
        }
      })
    } else {
      if (this.relationCopy.relationPhones) this.relationCopy.relationPhones.splice(index, 1)
    }
  }
}
