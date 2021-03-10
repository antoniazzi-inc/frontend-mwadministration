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

import Component from 'vue-class-component'
import { Vue, Watch } from 'vue-property-decorator'
import { RelationPhone } from '@/shared/models/relationms/relation-phone.model'
import { PhoneType } from '@/shared/models/relationms/company-phone.model'

@Component({
  props: {
    phone: Object
  }
})
export default class PhoneWidgetComponent extends Vue {
  public phoneCopy: any;
  public phoneTypes: any;
  public editMode: boolean;
  public newPhone: boolean;

  constructor () {
    super()
    this.phoneTypes = {
      home: PhoneType.HOME,
      work: PhoneType.WORK,
      mobile: PhoneType.MOBILE,
      other: PhoneType.OTHER
    }
    this.editMode = false
    this.newPhone = false
    this.phoneCopy = null
  }

  @Watch('phone', { immediate: true, deep: true })
  public populate (newVal: any) {
    if (newVal) {
      this.phoneCopy = newVal
      if (!newVal.phoneType) {
        this.phoneCopy.phoneType = this.phoneTypes.home
      }
      if (!newVal.id) {
        this.newPhone = true
      }
    }
  }

  public edit (entity: any) {
    this.editMode = true
    this.$emit('onEdit', this.phoneCopy)
  }

  public remove () {
    this.$emit('onRemove', this.phoneCopy)
  }

  public cancel () {
    this.$emit('onCancel')
    this.editMode = false
    this.newPhone = false
    if (!this.phoneCopy.id) this.remove()
  }

  public save () {
    this.$validator.validateAll().then(resp => {
      if (resp) {
        this.$emit('onSave', this.phoneCopy)
        this.cancel()
      }
    })
  }
}
