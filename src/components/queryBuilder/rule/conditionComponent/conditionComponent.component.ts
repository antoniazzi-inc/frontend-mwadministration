import { Component, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { Money } from 'v-money'
import CommonHelpers from '@/shared/commonHelpers'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'

@Component({
  components: {
    SearchableSelectComponent,
    'flat-pickr': flatPickr,
    money: Money
  },
  props: {
    componentType: {
      type: String
    },
    options: {},
    value: {},
    operator: {},
    isSecondLvl: {
      type: Boolean
    }
  }
})
export default class ConditionComponentComponent extends mixins(Vue, CommonHelpers) {
    public localValue: any;
    public money = {
      decimal: ',',
      thousands: '.',
      prefix: '€',
      suffix: '',
      precision: 2,
      masked: false
    };

    public dateConfig = {
      allowInput: true,
      altInput: true,
      dateFormat: 'Y-m-d'
    };

    public singleSelectConfig: SearchableSelectConfig = new SearchableSelectConfig('label',
      'labels.chooseOption', '', false,
      false, true, false, false)

    public multiSelectConfig: SearchableSelectConfig = new SearchableSelectConfig('label',
      'labels.chooseOption', '', false,
      false, true, true, false)

    constructor () {
      super()
      this.localValue = null
    }

    public created () {
      this.localValue = this.$props.value
    }

    public addSingleValue (value: any) {
      this.localValue = value
      if (this.$props.operator && this.$props.operator.secondLvlOperatorCondition) {
        this.$emit('showSecondLvl', { ...this.$props, selectedValue: value })
      }
    }

    @Watch('value', { immediate: true, deep: true })
    valueHandler (newVal: any) {
      this.localValue = newVal
    }

    @Watch('localValue', { immediate: true, deep: true })
    localValueHandler (newVal: any) {
      if (newVal) {
        this.localValue = newVal
        this.update()
      }
    }

    public removeSingleValue () {
      this.localValue = null
    }

    public addMultipleValues (value: any) {
      if (this.localValue && this.localValue[0]) {
        this.localValue.push(value)
      } else {
        this.localValue = [value]
      }
    }

    public removeMultipleValues (value: any) {
      let index = null
      if (this.localValue[0]) {
        this.localValue.forEach((val: any, k: any) => {
          if (value.id === val.id) {
            index = k
          }
        })
      }
      if (index !== null) {
        this.localValue.splice(index, 1)
      }
    }

    public update () {
      this.$emit('updateValue', { ...this.$props, value: this.localValue })
    }
}
