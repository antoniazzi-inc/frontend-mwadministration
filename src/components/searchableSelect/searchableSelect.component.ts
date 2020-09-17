import { Component, Vue, Watch } from 'vue-property-decorator'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
@Component({
  components: {
    Multiselect
  },
  props: {
    config: SearchableSelectConfig,
    options: [Array, Set],
    value: [Object, Array, Set]
  }
})
export default class SearchableSelectComponent extends Vue {
  public val: []|object;
  constructor () {
    super()
    this.val = []
  }

  public mounted () {
    this.val = this.$props.value
  }

  @Watch('value', { immediate: true, deep: true })
  public fillValue (changeVal: any) {
    this.val = changeVal
  }

  @Watch('active', { immediate: true, deep: true })
  public valueChanged (changeVal: object) {
    this.$emit('onChange', changeVal)
  }

  public valueAdded (addedVal: object) {
    this.$emit('onSelected', addedVal)
  }

  public valueRemoved (removeVal: object) {
    this.$emit('onDelete', removeVal)
  }

  public search (query: string) {
    this.$emit('onSearch', query)
  }

  public createNew () {
    this.$emit('onCreate')
  }
}
