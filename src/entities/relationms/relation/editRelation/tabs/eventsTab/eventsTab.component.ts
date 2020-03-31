import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {},
  props: {}
})
export default class EventsTabComponent extends mixins(Vue, CommonHelpers) {
  public currentTab: string
  constructor () {
    super()
    this.currentTab = 'profile'
  }
}
