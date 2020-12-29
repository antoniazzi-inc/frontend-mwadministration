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
