import { Component, Vue } from 'vue-property-decorator'
@Component({
  props: {
    active: Boolean
  }
})
export default class InvoicesComponent extends Vue {
  constructor () {
    super()
  }
}
