import { Component, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  props: {
  }
})
export default class SimpleSearchComponent extends mixins(Vue, CommonHelpers) {
  public simpleSearch: string
  constructor (props: any) {
    super(props)
    this.simpleSearch = ''
  }

  public search () {
    this.$emit('onSearch', this.simpleSearch)
  }

  public clear () {
    this.simpleSearch = ''
    this.$emit('onSearch', '')
  }
}
