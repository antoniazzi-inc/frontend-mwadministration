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

import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import EmailTextsService from '@/shared/services/emailTextsService'
import 'autorespond-email-template-editor/dist/email-template-editor.common'
import EmailTemplateEditor from 'autorespond-email-template-editor/src/main'
import 'autorespond-email-template-editor/dist/email-template-editor.css'
import 'grapesjs/dist/css/grapes.min.css'
Vue.use(EmailTemplateEditor)
@Component({
  components: {
  }
})
export default class NewEmailTextsComponent extends mixins(CommonHelpers, Vue) {
  public emailTextsService: any
  public active: boolean
  constructor () {
    super()
    this.active = false
    this.emailTextsService = EmailTextsService.getInstance()
  }

  public mounted () {
    this.active = true
  }

  public editText (prod: any) {
    this.$router.push({ name: 'EditEmailTexts', params: { id: prod.id } })
  }

  public deleteText (prod: any) {
    this.active = false
    if (prod.id) {
      this.emailTextsService.delete(prod.id).then((resp: AxiosResponse) => {
        this.active = true
        if (resp) {
          this.setAlert('emailTextRemoved', 'success')
        } else {
          this.setAlert('emailTextRemoveError', 'error')
        }
      })
    }
  }
}
