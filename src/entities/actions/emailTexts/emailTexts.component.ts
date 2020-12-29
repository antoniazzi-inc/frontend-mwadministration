import { Component, Vue } from 'vue-property-decorator'

import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import EmailTextsService from '@/shared/services/emailTextsService'
import PaginationTableComponent from "@/components/paginationTable/paginationTable.vue";

@Component({
  components: {
    PaginationTableComponent
  }
})
export default class EmailTextsComponent extends mixins(CommonHelpers, Vue) {
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
    this.$router.push({ name: 'EditEmailText', params: { id: prod.id } })
  }

  public deleteText (prod: any) {
    this.active = false
    if (prod.id) {
      this.emailTextsService.delete(prod.id).then((resp: AxiosResponse) => {
        this.active = true
        if (resp) {
          this.setAlert('productRemoved', 'success')
        } else {
          this.setAlert('productRemoveError', 'error')
        }
      })
    }
  }
}
