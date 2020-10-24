import HomeComponent from './entities/home/home.vue'
import LoginComponent from '@/entities/login/login.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import RelationService from '@/shared/services/relationService'
import 'vue-on-toast/dist/vue-on-toast.css'
import VueOnToast from 'vue-on-toast'
import CategoryService from '@/shared/services/categoryService'
import CountryService from '@/shared/services/CountryService'
import { AxiosResponse } from 'axios'
import TagService from '@/shared/services/tagService'
import TimeZoneService from '@/shared/services/timeZoneService'
import TaxRateService from '@/shared/services/taxRateService'
import money from 'v-money'
import { columnsVisibility } from '@/shared/tabelsDefinitions'
import { MenuDefinitions } from '@/shared/menuDefinitions'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import CompanyService from '@/shared/services/companyService'
import BusinessService from '@/shared/services/businessService'
import Sockets from '@/shared/sockets'
import RelationGroupService from '@/shared/services/relationGroupService'
import FreeFieldService from '@/shared/services/freeFieldService'
import RoleService from '@/shared/services/roleService'
import PermissionsService from '@/shared/services/permissionService'
import PaymentMethodService from '@/shared/services/paymentMethodService'
import DeliveryMethodService from '@/shared/services/deliveryMethodService'
import RegionService from '@/shared/services/regionService'
import promotionsService from "@/shared/services/promotionsService";
import productService from "@/shared/services/productService";
import coursesService from "@/shared/services/coursesService";
import InvoiceTemplatesService from "@/shared/services/orderms/InvoiceTemplatesService";
import MasterTemplateService from "@/shared/services/masterTemplateService";
Vue.use(money, { precision: 2 })
Vue.use(VueOnToast, {})
  @Component({
    components: {
      HomeComponent,
      LoginComponent
    }
  })
export default class App extends mixins(Vue, CommonHelpers) {
    paymentService = PaymentMethodService.getInstance();
    roleService = RoleService.getInstance();
    permissionsService = PermissionsService.getInstance();
    accountService = RelationService.getInstance();
    categoryService = CategoryService.getInstance();
    timeZoneService = TimeZoneService.getInstance();
    countryService = CountryService.getInstance();
    relationGroupService = RelationGroupService.getInstance();
    tagService = TagService.getInstance();
    customFieldService = FreeFieldService.getInstance();
    taxRateService = TaxRateService.getInstance();
    companyService = CompanyService.getInstance();
    invoiceTemplateService = InvoiceTemplatesService.getInstance();
    businessService = BusinessService.getInstance();
    productService = productService.getInstance();
    promotionService = promotionsService.getInstance();
    regionService = RegionService.getInstance();
    deliveryMethodService = DeliveryMethodService.getInstance();
    courseService = coursesService.getInstance();
    masterTemplatesService = MasterTemplateService.getInstance();
    counter = 0;
    sockets = new Sockets();
    relationSocket = new Sockets();
    productSocket = new Sockets();
    loading = true;
    isReady = true;
    errorMessage:any = null;
    mainMenu = MenuDefinitions;
    customConfig = {
      timeout: 2500,
      preventDuplicates: true
    };

    columns: any = []
    mounted () {
      let self = this
      //Reload the app after 30s if the counter condition is not satisfied( some requests are not loaded properly
      // or socket connection fails)
      setTimeout(function () {
        if(self.isReady === false) {
          self.errorMessage = self.$t('labels.somethingWentWrong')
          setTimeout(function () {
            window.location.reload()
          }, 5000)
        }
      }, 30000)
      this.populateLookups()
      const conf = localStorage.getItem('tableColumns')
      const columns = conf ? JSON.parse(conf) : null
      if (columns == null) {
        this.columns = columnsVisibility
        localStorage.setItem('tableColumns', JSON.stringify(this.columns))
      }
    }

    created () {
      this.retrieveAccount()
    }

    populateLookups () {
      const pagination:any = {
        page: 0,
        size: 100000,
        sort: 'id,asc'
      }
      if (!this.$store.state.authenticated) { return }
      this.taxRateService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        this.$store.commit('taxRates', resp.data.content)
      })
      this.countryService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        this.$store.commit('allCountries', resp.data.content)
      })
      this.timeZoneService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        this.$store.commit('timeZones', resp.data.content)
      })
      this.categoryService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        this.$store.commit('categories', resp.data.content)
      })
      this.tagService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        this.$store.commit('tags', resp.data.content)
      })
      this.regionService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        this.$store.commit('regions', resp.data.content)
      })
      this.paymentService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        const methods: any = []
        resp.data.content?.forEach((payment: any) => {
          methods.push({
            label: `${this.getMultiLangName(payment.paymentMethodLanguages).name} (+${payment.administrativeCostsFixed ? payment.administrativeCostsFixed + this.$store.state.currency : payment.administrativeCostsPercentage + '%'})`,
            value: payment
          })
        })
        this.$store.commit('paymentMethods', methods)
      })
      this.promotionService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        const promos: any = []
        resp.data.content?.forEach((promotion: any) => {
          promos.push({
            label: this.getMultiLangName(promotion.promotionLanguages).name,
            value: promotion
          })
        })
        this.$store.commit('promotions', promos)
      })
      this.productService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        const products: any = []
        resp.data.content?.forEach((prod: any) => {
          products.push({
            label: this.getMultiLangName(prod.productLanguages).name,
            value: prod
          })
        })
        this.$store.commit('products', products)
      })
      this.deliveryMethodService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        const methods: any = []
        resp.data.content?.forEach((delivery: any) => {
          methods.push({
            label: this.getMultiLangName(delivery.deliveryMethodLanguages).name,
            value: delivery
          })
        })
        this.$store.commit('deliveryMethods', methods)
      })
      this.courseService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        const courses: any = []
        resp.data.content?.forEach((course: any) => {
          courses.push({
            label: this.getMultiLangName(course.courseLanguages).name,
            value: course
          })
        })
        this.$store.commit('courses', courses)
      })
      this.masterTemplatesService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        this.$store.commit('masterTemplates', resp.data.content)
      })

      this.invoiceTemplateService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        this.$store.commit('invoiceTemplates', resp.data.content)
      })
      this.relationGroupService.getAll({...pagination, sort: ['label,asc']}, undefined).then((resp: AxiosResponse) => {
        this.counter++
        this.$store.commit('groups', resp.data.content)
      })
      this.customFieldService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        const freeFields: any = []
        if(resp.data && resp.data.content)
        resp.data.content.forEach((field: any) => {
          freeFields.push({
            label: this.getMultiLangName(field.customFieldLanguages).name,
            value: field
          })
        })
        this.$store.commit('freeFields', freeFields)
      })
      if (!this.hasAuthority('ROLE_SUPER_ADMIN')) {
        const roles = 'ROLE_SUPER_ADMIN,ROLE_ADMIN,ROLE_RELATION,ROLE_USER,ROLE_CUSTOMER,ROLE_BENEFICIARY,ROLE_AFFILIATE,ROLE_NEWSLETTER,ROLE_SUPPORT'
        const q = 'code=out=(' + roles + ')'
        this.roleService.getAll(pagination, q).then((resp: AxiosResponse) => {
          this.counter++
          this.$store.commit('roles', resp.data.content)
        })
      } else {
        this.roleService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
          this.counter++
          this.$store.commit('roles', resp.data.content)
        })
      }
      this.permissionsService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.counter++
        this.$store.commit('permissions', resp.data.content)
      })
    }

    @Watch('$store.state.authenticated', { immediate: true, deep: true })
    public async getLookups (newVal: any) {
      if (newVal) {
        this.isReady = false
        this.connectSockets().then(resp=>{})
        this.populateLookups()
      }
    }

    @Watch('counter', { immediate: true, deep: true })
    public changeReady (newVal: any) {
      if (newVal > 16) {
        this.isReady = true
      }
    }

    @Watch('$route', { immediate: true, deep: true })
    checkRouteAuthority (to: any, from: any, next: any) {
      const self = this
      let notFound = false
      this.mainMenu.forEach((item: any) => {
        item.children.forEach((child: any) => {
          if (item.path === to.path) {
            const canVisit = this.$store.state.userIdentity ? self.hasAuthority(item.authorities) : true
            if (!canVisit) {
              notFound = true
            }
          } else if (to.path === child.path) {
            const canVisit = this.$store.state.userIdentity ? self.hasAuthority(child.authorities) : true
            if (!canVisit) {
              notFound = true
            }
          }
        })
      })
      if (notFound) {
        self.$router.push({ name: 'NotFound' })
      }
    }

    connectSockets () {
      return new Promise(resolve => {
        this.sockets.connect().then(()=>{})
          this.relationSocket.connectRelation().then(()=>{})
            this.productSocket.connectProduct().then(()=>{})
        resolve()
      })
    }
    retrieveAccount () {
      this.accountService.retrieveAccount().then(async account => {
        if (account) {
          this.$store.commit('authenticate')
          this.loading = false
          this.$store.commit('authenticated', account.data)
        } else {
          this.$router.push('/login')
        }
      })
    }
}
