import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'

@Component({
  components: {}
})
export default class EditOrderComponent extends mixins(CommonHelpers, Vue) {

  constructor () {
    super()
  }

  public mounted () {

  }
}
