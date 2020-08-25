import Component from 'vue-class-component'
import { Vue, Watch } from 'vue-property-decorator'
import { RelationPhone } from '@/shared/models/relationms/relation-phone.model'
import { PhoneType } from '@/shared/models/relationms/company-phone.model'

@Component({
  props: {
    phone: Object
  }
})
export default class PhoneWidgetComponent extends Vue {
  public phoneCopy: any;
  public phoneTypes: any;
  public editMode: boolean;
  public newPhone: boolean;

  constructor () {
    super()
    this.phoneTypes = {
      home: PhoneType.HOME,
      work: PhoneType.WORK,
      mobile: PhoneType.MOBILE,
      other: PhoneType.OTHER
    }
    this.editMode = false
    this.newPhone = false
    this.phoneCopy = null
  }

  @Watch('phone', { immediate: true, deep: true })
  public populate (newVal: any) {
    if (newVal) {
      this.phoneCopy = newVal
      if (!newVal.phoneType) {
        this.phoneCopy.phoneType = this.phoneTypes.home
      }
      if (!newVal.id) {
        this.newPhone = true
      }
    }
  }

  public edit (entity: any) {
    this.editMode = true
    this.$emit('onEdit', this.phoneCopy)
  }

  public remove () {
    this.$emit('onRemove', this.phoneCopy)
  }

  public cancel () {
    this.$emit('onCancel')
    this.editMode = false
    this.newPhone = false
    if (!this.phoneCopy.id) this.remove()
  }

  public save () {
    this.$validator.validateAll().then(resp => {
      if (resp) {
        this.$emit('onSave', this.phoneCopy)
        this.cancel()
      }
    })
  }
}
