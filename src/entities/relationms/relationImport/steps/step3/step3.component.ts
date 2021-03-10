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

import { Component, Vue } from 'vue-property-decorator'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import gravatarImg from 'vue-gravatar'

@Component({
  props:{
    exampleCards: Array,
    totalRows: Number,
    emailIndex: Number,
    duplicateEmailsFound: Number,
    invalidEmails:Array,
    numberOfExisingEmails:Number,
    newGroup:String,
    duplicateEmailsList:Array,
    existingEmailsList:Array,
    overwrite:Boolean
  },
  components: {
    'v-gravatar': gravatarImg,
    vueDropzone: vue2Dropzone
  }
})
export default class Step3Component extends mixins(CommonHelpers, Vue) {


  constructor () {
    super()
  }

  public calculateImport(){
    if (this.$props.overwrite) return this.$props.totalRows - this.$props.duplicateEmailsFound - this.$props.invalidEmails.length
    else return this.$props.totalRows - this.$props.duplicateEmailsFound - this.$props.numberOfExisingEmails - this.$props.invalidEmails.length
  }
}
