import { Component, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { Money } from 'v-money'
import { IPaymentSchedule, PaymentSchedule } from '@/shared/models/productms/PaymentScheduleModel'
import CommonHelpers from '@/shared/commonHelpers'
import ProductService from '@/shared/services/productService'
import paymentschedulesService from '@/shared/services/payment-schedulesService'
import paymentscheduleoptionsService from '@/shared/services/payment-schedule-optionsService'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
import { IPaymentScheduleOption, PaymentScheduleOption } from '@/shared/models/productms/PaymentScheduleOptionModel'
import { AxiosResponse } from 'axios'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import Store from '@/store/index'
@Component({
  props: {
    product: Object,
    addNewPayment: Boolean
  },
  components: {
    money: Money,
    'toggle-switch': ToggleSwitch
  }
})
export default class PaymentScheduleComponent extends mixins(CommonHelpers, Vue) {
    public productService: any = ProductService.getInstance()
    public paymentScheduleService: any = paymentschedulesService.getInstance()
    public paymentScheduleOptionService: any = paymentscheduleoptionsService.getInstance()
    public productCopy: IProduct;
    public productCopyBackup: IProduct|null;
    public editMode: boolean;
    public addNew: boolean;
    public paymentSchedules: IPaymentSchedule[];
    public selectedPaymentSchedule: IPaymentSchedule;
    public scheduleToDelete: IPaymentSchedule|null;
    public scheduleOptionToDelete: IPaymentScheduleOption|null;
    public tabIndex: number;
    public money: Record<string, any>;

    constructor () {
      super()
      this.productCopy = new Product()
      this.selectedPaymentSchedule = new PaymentSchedule()
      this.paymentSchedules = []
      this.productCopyBackup = null
      this.scheduleToDelete = null
      this.scheduleOptionToDelete = null
      this.editMode = false
      this.addNew = false
      this.tabIndex = 0
      this.money = {
        decimal: ',',
        thousands: '.',
        prefix: Store.state.currency,
        suffix: '',
        precision: 2,
        masked: false
      }
    }

    @Watch('product', { immediate: true, deep: true })
    public updateProduct (newVal: any) {
      this.productCopy = newVal
      if (this.productCopyBackup === null) {
        this.productCopyBackup = JSON.parse(JSON.stringify(newVal))
      }
      this.paymentSchedules = newVal.paymentSchedules && newVal.paymentSchedules.length ? newVal.paymentSchedules : []
    }

    @Watch('addNewPayment', { immediate: true, deep: true })
    public updateAddNewPayment (newVal: any) {
      if (newVal) {
        this.editMode = newVal
        this.paymentSchedules = this.$props.product.paymentSchedules ? this.$props.product.paymentSchedules :  [new PaymentSchedule()]
      } else {
        this.editMode = newVal
      }
    }

    public cancel () {
      this.editMode = false
      this.addNew = false
      this.selectedPaymentSchedule = new PaymentSchedule()
      this.productCopy = JSON.parse(JSON.stringify(this.productCopyBackup))
      this.productCopyBackup = null
      this.$emit('onCancel')
    }

    public save () {
      const self = this
      const product = {
        id: this.productCopy.id,
        version: this.productCopy.version
      }
      this.selectedPaymentSchedule.product = product
      if (this.selectedPaymentSchedule.id) {
        this.paymentScheduleService.put(this.selectedPaymentSchedule).then((resp: AxiosResponse) => {
          self.editMode = false
          self.addNew = false
          let index = null
          $.each(self.productCopy.paymentSchedules, function (k, v: any) {
            if (v.id === resp.data.id) {
              index = k
            }
          })
          this.selectedPaymentSchedule = resp.data
          if (index !== null && self.productCopy.paymentSchedules) {
            self.productCopy.paymentSchedules[index] = resp.data
            self.$emit('productUpdated', self.productCopy)
          }
          this.setAlert('productUpdated', 'success')
        })
      } else {
        this.paymentScheduleService.post(this.selectedPaymentSchedule).then((resp: AxiosResponse) => {
          this.cleanSchedules().then(() => {
            self.editMode = false
            self.addNew = false
            self.selectedPaymentSchedule = resp.data
            self.productCopy.paymentSchedules ? self.productCopy.paymentSchedules.push(resp.data) : self.productCopy.paymentSchedules = [resp.data]
            self.$emit('productUpdated', self.productCopy)
            this.setAlert('productUpdated', 'success')
          })
        })
      }
    }

    public cleanSchedules () {
      const self = this
      return new Promise(resolve => {
        const schedules: any = []
        $.each(self.productCopy.paymentSchedules, function (k, v: any) {
          if (v.id) {
            schedules.push(v)
          }
        })
        this.productCopy.paymentSchedules = schedules
        resolve()
      })
    }

    public closeDialog () {
      // @ts-ignore
      $(this.$refs.removeEntityPaymentSchedule).modal('hide')
      // @ts-ignore
      $(this.$refs.removeEntityPaymentScheduleOption).modal('hide')
    }

    public removePaymentSchedule () {
      const self = this
      this.paymentScheduleService.delete(this.scheduleToDelete?.id).then((resp: AxiosResponse) => {
        // @ts-ignore
        this.setAlert('paymentScheduleDeleted', 'success')
        self.closeDialog()
        let index = null
        $.each(self.productCopy.paymentSchedules, function (k, v: any) {
          if (v.id === self.scheduleToDelete?.id) {
            index = k
          }
        })
        if (index !== null && self.productCopy.paymentSchedules) {
          self.productCopy.paymentSchedules.splice(index, 1)
        }
        $.each(self.productCopy.paymentSchedules, function (k, v: any) {
          if (v.id === self.selectedPaymentSchedule.id && self.productCopy.paymentSchedules) {
            self.productCopy.paymentSchedules[k] = self.selectedPaymentSchedule
          }
        })
        self.$emit('productUpdated', self.productCopy)
      })
    }

    public RemoveScheduleOption () {
      const self = this
      this.paymentScheduleOptionService.delete(this.scheduleOptionToDelete?.id).then((resp: AxiosResponse) => {
        // @ts-ignore
        this.setAlert('paymentScheduleOptionDeleted', 'success')
        self.closeDialog()
        let index = null
        $.each(self.selectedPaymentSchedule.paymentScheduleOptions, function (k, v: any) {
          if (v.id === self.scheduleOptionToDelete?.id) {
            index = k
          }
        })
        if (index !== null) {
          self.selectedPaymentSchedule.paymentScheduleOptions?.splice(index, 1)
        }
        $.each(self.productCopy.paymentSchedules, function (k, v: any) {
          if (v.id === self.selectedPaymentSchedule.id && self.productCopy.paymentSchedules) {
            self.productCopy.paymentSchedules[k] = self.selectedPaymentSchedule
          }
        })
        self.$emit('productUpdated', self.productCopy)
      })
    }

    public editPaymentSchedule (item: any) {
      this.selectedPaymentSchedule = item
      this.editMode = true
      this.addNew = false
    }

    public addNewPaymentScheduleOption () {
      if (this.selectedPaymentSchedule.paymentScheduleOptions) {
        this.selectedPaymentSchedule.paymentScheduleOptions.push(new PaymentScheduleOption())
      } else {
        this.selectedPaymentSchedule.paymentScheduleOptions = [new PaymentScheduleOption()]
      }
    }

    public prepareRemoveScheduleOption (option: any) {
      this.scheduleOptionToDelete = option
    }

    public prepareRemoveSchedule (item: any) {
      this.scheduleToDelete = item
    }
}
