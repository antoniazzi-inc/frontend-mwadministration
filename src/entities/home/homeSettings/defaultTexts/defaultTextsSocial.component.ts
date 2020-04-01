import { Component, Vue, Watch } from 'vue-property-decorator'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    ToggleSwitch
  },
  props: {
    value: Object
  }
})
export default class DefaultTextsSocialComponent extends mixins(Vue, CommonHelpers) {
  public social: any[]
  constructor () {
    super()
    this.social = [{
      name: 'Facebook',
      visible: false,
      url: ''
    }, {
      name: 'LinkedIn',
      visible: false,
      url: ''
    }, {
      name: 'Twitter',
      visible: false,
      url: ''
    }, {
      name: 'Pinterest',
      visible: false,
      url: ''
    }, {
      name: 'web',
      visible: false,
      url: ''
    }, {
      name: 'Youtube',
      visible: false,
      url: ''
    }, {
      name: 'Instagram',
      visible: false,
      url: ''
    }, {
      name: 'Vimeo',
      visible: false,
      url: ''
    }]
  }

  public mounted () {

  }

  @Watch('social', { immediate: false, deep: true })
  public updateValue (newVal: any) {
    this.$emit('onUpdate', newVal)
  }

  @Watch('value', { immediate: true, deep: true })
  public updateVal (newVal: any) {
    let copySocial = JSON.parse(JSON.stringify(this.social))
    this.social = []
    this.social = newVal && newVal.value && newVal.value.socialMedia && newVal.value.socialMedia.length ?
      newVal.value.socialMedia : copySocial
    console.log(this.social[0].url)
    console.log(newVal.value.socialMedia[0].url)
  }

  public validateUrl (index: number, fieldName: string) {
    if (this.social[index].url && !this.$validator.errors.has(fieldName)) { this.social[index].url = this.checkForUrlHttps(this.social[index].url) }
  }
}
