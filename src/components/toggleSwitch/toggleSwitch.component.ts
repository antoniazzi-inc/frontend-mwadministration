import Component from 'vue-class-component'
import { Vue, Watch } from 'vue-property-decorator'

@Component({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    onText: {
      type: String,
      default: ''
    },
    offText: {
      type: String,
      default: ''
    },
    disabled: Boolean
  }
})
export default class ToggleSwitch extends Vue {
  $refs!: {
    switchBtn: HTMLElement;
  }

    public selectedValue: boolean;
    constructor (
    ) {
      super()
      this.selectedValue = false
    }

    public emitClick (e: any) {
      this.$emit('clicked', e.currentTarget.checked)
    }
    public mounted () {
      if (this.$props.value) {
        // @ts-ignore
        this.$refs.switchBtn.checked = true
      } else {
        // @ts-ignore
        this.$refs.switchBtn.checked = false
      }
    }

  @Watch('value', { immediate: true, deep: true })
    public changeValue (newVal: any) {
      if (newVal) {
        // @ts-ignore
        if (this.$refs.switchBtn) this.$refs.switchBtn.checked = true
      } else {
        // @ts-ignore
        if (this.$refs.switchBtn) this.$refs.switchBtn.checked = false
      }
      this.$emit('changed', newVal)
    }

  public changeToggle (e: any) {
    if (e.currentTarget.checked) {
      this.$emit('update:value', true)
    } else {
      this.$emit('update:value', false)
    }
  }
}
