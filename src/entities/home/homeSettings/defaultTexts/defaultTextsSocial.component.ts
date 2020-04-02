import { Component, Vue, Watch } from 'vue-property-decorator'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { SocialMediaConfig } from '@/shared/defaultTextsConfig'
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
    this.social = JSON.parse(JSON.stringify(SocialMediaConfig))
  }

  public mounted () {

  }

  @Watch('social', { immediate: false, deep: true })
  public updateValue (newVal: any) {
    this.$emit('onUpdate', newVal)
  }

  @Watch('value', { immediate: true, deep: true })
  public updateVal (newVal: any) {
    const copySocial = JSON.parse(JSON.stringify(SocialMediaConfig))
    this.social = []
    this.social = newVal && newVal.value && newVal.value.socialMedia && newVal.value.socialMedia.length
      ? newVal.value.socialMedia : copySocial
  }

  public validateUrl (index: number, fieldName: string) {
    if (this.social[index].url && !this.$validator.errors.has(fieldName)) { this.social[index].url = this.checkForUrlHttps(this.social[index].url) }
  }
}
