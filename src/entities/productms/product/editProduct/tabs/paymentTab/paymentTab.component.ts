import {Component, Inject, Vue, Watch} from 'vue-property-decorator'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'
import {mixins} from 'vue-class-component'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import CommonHelpers from '@/shared/commonHelpers'
import ProductService from '@/shared/services/productService'
import paymentMethodService from '@/shared/services/paymentMethodService'
import productpaymentmethodsService from '@/shared/services/product-payment-methodsService'
import productsubscriptionsService from '@/shared/services/product-subscriptionsService'
import {IProduct, Product} from '@/shared/models/productms/ProductModel'
import {IPaymentSchedule, PaymentSchedule} from '@/shared/models/productms/PaymentScheduleModel'
import {IProductPaymentMethod} from '@/shared/models/productms/ProductPaymentMethodModel'
import {ProductSubscription} from '@/shared/models/productms/ProductSubscriptionModel'
import {AxiosResponse} from 'axios'
import {ISearchableSelectConfig, SearchableSelectConfig} from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import PaymentScheduleComponent from '../../payment-schedule.vue'

@Component({
  props: {
    product: Object,
    clicked: Boolean
  },
  components: {
    SearchableSelectComponent,
    'toggle-switch': ToggleSwitch,
    flatPickr,
    trumbowyg: Trumbowyg,
    'payment-schedule': PaymentScheduleComponent
  }
})
export default class PaymentTabComponent extends mixins(Vue, CommonHelpers) {
  public productService: any = ProductService.getInstance();
  public paymentMethodService: any = paymentMethodService.getInstance();
  public productPaymentMethodService: any = productpaymentmethodsService.getInstance();
  public productSubscriptionService: any = productsubscriptionsService.getInstance();
  public productCopy: IProduct = new Product();
  public paymentSchedule: IPaymentSchedule = new PaymentSchedule();
  public selectedPaymentMethods: IProductPaymentMethod[] = [];
  public allPaymentMethods: any = [];
  public forceDirectPayment = false;
  public isSubscription = false;
  public isUsePaymentSchedules = false;
  public addAllPaymentMethods = false;
  public sentAnnouncement = false;
  public sendInvoiceLater = false;
  public addNewPayment = false;
  public editorConfig = {};
  public sendInvoiceLaterDate = new Date();
  public startDate = 'now';
  public multiSelectConfig: Record<string, any> = {
    required: false,
    trackBy: 'id',
    allowEmpty: true
  };

  public multiSelectConfigPayment: ISearchableSelectConfig = new SearchableSelectConfig('label',
    'labels.choosePaymentMethods', '', false,
    false, true, true, false);

  public startDateConfig: Record<string, any> = {
    allowInput: false,
    altInput: true,
    dateFormat: 'Y-m-d',
    minDate: 'today'
  };

  public announcementJson: any = {
    subject: null,
    content: null,
    replyToName: '',
    replyToAddress: ''
  };

  @Watch('product', {immediate: true, deep: true})
  public updateProd(newVal: any) {
    if(newVal && newVal.paymentSchedules && newVal.paymentSchedules.length > 0) {this.isUsePaymentSchedules = true;}
    if(newVal && newVal.productSubscription && newVal.productSubscription.id > 0) {this.isSubscription = true;}
    /*if (newVal.productSubscription && newVal.productSubscription !== null && !this.isSubscription) this.isSubscription = true;
    if (newVal && newVal.paymentSchedules && newVal.paymentSchedules !== null && newVal.paymentSchedules.length > 0 && !this.isSubscription) {

      this.sentAnnouncement = true;
    }*/
    this.populatePaymentMethods(newVal);
    this.productCopy = newVal
  }

  @Watch('isSubscription', {immediate: true, deep: true})
  public updateIsSubscription(newVal: any) {
    if (newVal) {
      this.productCopy.productSubscription = this.$props.product.productSubscription ? this.$props.product.productSubscription : new ProductSubscription();
      this.announcementJson = this.productCopy.productSubscription && this.productCopy.productSubscription.announcementJson ? this.productCopy.productSubscription.announcementJson.email : this.announcementJson
    } else {
      this.sentAnnouncement = false
      this.announcementJson = this.productCopy.paymentSchedules && this.productCopy.paymentSchedules[0] && this.productCopy.paymentSchedules[0].announcementJson ? this.productCopy.paymentSchedules[0].announcementJson.email : this.announcementJson
    }
    if (this.announcementJson && this.announcementJson.subject !== null) {
      this.sentAnnouncement = true
    }
  }

  @Watch('clicked', {immediate: true, deep: true})
  public updateClicked(newVal: any) {
    if (newVal) {
      this.forceDirectPayment = newVal.forceDirectPayment ? newVal.forceDirectPayment : false
      this.retrieve()
    }
  }

  @Watch('forceDirectPayment', {immediate: true, deep: true})
  public updateForceDirectPayment(newVal: any) {
    this.productCopy.forceDirectPayment = newVal
  }

  public retrieve() {
    this.selectedPaymentMethods = [];
    this.populatePaymentMethods(this.productCopy)
  }

  public addNewPaymentSchedule() {
    const schedule = new PaymentSchedule();
    schedule.announcementJson = this.announcementJson;
    if (this.productCopy.paymentSchedules) {
      this.productCopy.paymentSchedules.push(schedule)
    } else {
      this.productCopy.paymentSchedules = [schedule]
    }
    this.isSubscription = false
    this.addNewPayment = true
  }

  public populatePaymentMethods(newVal: any) {
    const self = this;
    this.selectedPaymentMethods = [];
    const selectedMethods: any = [];
    $.each(self.$store.state.lookups.paymentMethods, function (k, v) {
      $.each(newVal.productPaymentMethods, function (i, j) {
        if (v.value.id === j.paymentMethodId || v.value.id === j.id) {
          selectedMethods.push(v)
        }
      })
    });
    Vue.nextTick(function () {
      self.selectedPaymentMethods = selectedMethods
    })
  }

  public cancelPaymentSchedule() {
    this.addNewPayment = false
  }

  public updateProduct(product: any) {
    this.productCopy = product;
    this.addNewPayment = false;
    this.$emit('update', product)
  }

  public paymentMethodChanged(method: any) {
    if (!method) return;
    this.selectedPaymentMethods.push(method);
    this.productCopy && this.productCopy.productPaymentMethods ? this.productCopy.productPaymentMethods.push(method.value) : this.productCopy.productPaymentMethods = [method.value];
    this.savePaymentMethod(method)
  }

  public removePaymentMethod(method: any) {
    let index: any = null;
    let idToRemove: any = null;
    $.each(this.productCopy.productPaymentMethods, function (k, v: any) {
      if (v.paymentMethodId === method.value.id) {
        index = k
        idToRemove = v.id
      }
    });
    if (index !== null && idToRemove!== null) {
      this.productPaymentMethodService.delete(idToRemove).then((resp: AxiosResponse) => {
        // @ts-ignore
        this.setAlert('paymentRemoved', 'success');
        this.selectedPaymentMethods.splice(index, 1);
        if (this.productCopy.productPaymentMethods) this.productCopy.productPaymentMethods.splice(index, 1);
        this.$emit('update', this.productCopy)
        this.$emit('updateProductOnSocket', this.productCopy)
      })
    }
  }

  public includeAllPaymentMethods() {
    let self = this;
    const methods: any = [];
    const allMethods: any = [];
    $.each(this.$store.state.lookups.paymentMethods, function (k, v) {
      let toAdd = true;
      $.each(self.productCopy.productPaymentMethods, function (i, j: IProductPaymentMethod) {
        if (v.value.id === j.paymentMethodId) {
          toAdd = false
        }
      });
      if (toAdd) {
        methods.push(v.value)
        allMethods.push(v)
      }
    });
    this.selectedPaymentMethods = allMethods
    this.productCopy.productPaymentMethods = methods;
    this.saveAllPaymentMethod(this.selectedPaymentMethods)
  }

  public saveAllPaymentMethod(methods: any) {
    const product = {
      id: this.$props.product.id,
      version: this.$props.product.version
    };
    const dto: any = [];
    $.each(methods, function (k, v) {
      dto.push({
        paymentMethodId: v.value.id,
        paymentMethodType: v.value.paymentMethodType,
        product: product
      })
    });
    this.productPaymentMethodService.createMultiple(dto).then((resp: AxiosResponse) => {
      this.populatePaymentMethods(resp.data);
      this.setAlert('paymentCreated', 'success');
      this.productCopy.productPaymentMethods ? this.productCopy.productPaymentMethods.push(resp.data) : this.productCopy.productPaymentMethods = [resp.data];
      this.$emit('update', this.productCopy)
      this.$emit('updateProductOnSocket', this.productCopy)
    })
  }

  public savePaymentMethod(method: any) {
    const dto = {
      product: {
        id: this.productCopy.id,
        version: this.productCopy.version
      },
      paymentMethodId: method.value.id,
      paymentMethodType: method.value.paymentMethodType
    };

    this.productPaymentMethodService.post(dto).then((resp: AxiosResponse) => {
      this.setAlert('paymentCreated', 'success');
      this.productCopy.productPaymentMethods ? this.productCopy.productPaymentMethods.push(resp.data) : this.productCopy.productPaymentMethods = [resp.data];
        if(resp && resp.data){
          this.$emit('update', this.productCopy)
          this.$emit('updateProductOnSocket', this.productCopy)
        }
      })
  }

  public goBack() {
    this.$router.push('/products')
  }

  public updateAnnouncement() {

  }
  public closeModal() {
    // @ts-ignore
    $(this.$refs.announcementModal).modal('hide')
  }

  public save() {
    if(this.announcementJson) this.productCopy.announcementMailJson = JSON.stringify(this.announcementJson)
    if (this.isSubscription) {
      if (this.productCopy.productSubscription) {
        this.productCopy.productSubscription.product = {
          id: this.productCopy.id,
          version: this.productCopy.version
        }
      }
      if (this.sentAnnouncement) {
        // @ts-ignore
        this.productCopy.productSubscription.announcementJson = {
          email: this.announcementJson,
          sendBeforeNew: this.$props.product.productSubscription.announcementJson
            ? this.$props.product.productSubscription.announcementJson.sendBeforeNew : false
        }
      } else {
        this.productCopy.productSubscription ? this.productCopy.productSubscription.announcementJson = undefined : undefined
      }
      if (this.productCopy.productSubscription && this.productCopy.productSubscription.id) {
        this.productSubscriptionService.put(this.productCopy.productSubscription).then((resp: AxiosResponse) => {
          this.setAlert('productUpdated', 'success');
          this.productCopy.productSubscription = resp.data;
          this.$emit('update', this.productCopy)
          this.$emit('updateProductOnSocket', this.productCopy)
        })
      } else {
        if (this.productCopy && this.productCopy.productSubscription) {
          this.productCopy.productSubscription.product = {
            id: this.productCopy.id,
            version: this.productCopy.version
          }
        }
        const dto = this.productCopy.productSubscription
        this.productSubscriptionService.post(dto).then((resp: AxiosResponse) => {
          this.productCopy.productSubscription = resp.data;
          this.productService.put(this.productCopy).then((resp1: AxiosResponse) => {
            this.setAlert('productUpdated', 'success');
            this.productCopy.productSubscription = resp1.data;
            this.$emit('update', this.productCopy)
            this.$emit('updateProductOnSocket', this.productCopy)
          })
        })
      }
    } else {
      if(this.productCopy.productSubscription && this.productCopy.productSubscription.id) {
        this.productSubscriptionService.delete(this.productCopy.productSubscription.id).then((resp:AxiosResponse) =>{
          this.productCopy.productSubscription = undefined
          this.productService.put(this.productCopy).then((resp:AxiosResponse) => {
            if(resp && resp.data){
              this.productCopy = resp.data
              this.setAlert('productUpdated', 'success');
              this.$emit('update', this.productCopy)
            }
          })
        })
      } else {
        this.productService.put(this.productCopy).then((resp:AxiosResponse) => {
          if(resp && resp.data){
            this.productCopy = resp.data
            this.setAlert('productUpdated', 'success');
            this.$emit('update', this.productCopy)
          }
        })
      }
    }
  }
}
