import {Component, Vue, Watch} from "vue-property-decorator";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
@Component({
  components:{
    ToggleSwitch
  },
  props: {
    value: Object
  }
})
export default class DefaultTextsSocialComponent extends mixins(Vue, CommonHelpers){
  public social: any[]
  constructor() {
    super();
    this.social = [{
      name: 'Facebook',
      visible: false,
      url: ''
    },{
      name: 'FacebookLike',
      visible: false,
      url: ''
    },{
      name: 'LinkedIn',
      visible: false,
      url: ''
    },{
      name: 'Twitter',
      visible: false,
      url: ''
    },{
      name: 'TweetThis',
      visible: false,
      url: ''
    },{
      name: 'Pinterest',
      visible: false,
      url: ''
    },{
      name: 'Website',
      visible: false,
      url: ''
    },{
      name: 'Youtube',
      visible: false,
      url: ''
    },{
      name: 'Instagram',
      visible: false,
      url: ''
    },{
      name: 'Vimeo',
      visible: false,
      url: ''
    },]
  }
  public mounted(){
    this.social = this.$props.value && this.$props.value.value && this.$props.value.value.socailMedia &&
    this.$props.value.value.socailMedia.length? this.$props.value.value.socailMedia : this.social
  }

  @Watch('social', {immediate: true, deep: true})
  public updateValue(newVal:any) {
    this.$emit('onUpdate', newVal)
  }

  public validateUrl(index: number, fieldName: string){
    if(this.social[index].url && !this.$validator.errors.has(fieldName))
      this.social[index].url = this.checkForUrlHttps(this.social[index].url)
  }
}
