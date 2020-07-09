import { Component, Vue } from 'vue-property-decorator'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import gravatarImg from 'vue-gravatar'

@Component({
  props:{
    exampleCards: Array,
    totalRows: Number,
    emailIndex: Number,
    duplicateEmailsFound: Number,
    invalidEmails:Array,
    numberOfExisingEmails:Number,
    newGroup:String,
    duplicateEmailsList:Array,
    existingEmailsList:Array,
    overwrite:Boolean
  },
  components: {
    'v-gravatar': gravatarImg,
    vueDropzone: vue2Dropzone
  }
})
export default class Step3Component extends mixins(CommonHelpers, Vue) {


  constructor () {
    super()
  }

  public calculateImport(){
    if (this.$props.overwrite) return this.$props.totalRows - this.$props.duplicateEmailsFound - this.$props.invalidEmails.length
    else return this.$props.totalRows - this.$props.duplicateEmailsFound - this.$props.numberOfExisingEmails - this.$props.invalidEmails.length
  }
}
