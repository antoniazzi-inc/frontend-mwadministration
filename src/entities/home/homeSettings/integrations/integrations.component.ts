import { Component, Vue } from 'vue-property-decorator'
@Component({
  props: {
    active: Boolean
  }
})
export default class IntegrationsComponent extends Vue {
  constructor () {
    super()
  }
}
