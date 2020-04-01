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
import Sockets from "@/shared/sockets";
Vue.use(money, { precision: 2 })
Vue.use(VueOnToast, {})
  @Component({
    components: {
      HomeComponent,
      LoginComponent
    }
  })
export default class App extends mixins(Vue, CommonHelpers) {
    accountService = RelationService.getInstance();
    categoryService = CategoryService.getInstance();
    timeZoneService = TimeZoneService.getInstance();
    countryService = CountryService.getInstance();
    tagService = TagService.getInstance();
    taxRateService = TaxRateService.getInstance();
    companyService = CompanyService.getInstance();
    businessService = BusinessService.getInstance();
    sockets = new Sockets({ url: 'http://localhost:18081/' });
    loading = true;
    mainMenu = MenuDefinitions;
    customConfig = {
      timeout: 2500,
      preventDuplicates: true
    };

    columns: any = []
    mounted () {
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
      const pagination = {
        page: 0,
        size: 100000,
        sort: 'id,asc'
      }
      this.taxRateService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.$store.commit('taxRates', resp.data.content)
      })
      this.countryService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.$store.commit('allCountries', resp.data.content)
      })
      this.timeZoneService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.$store.commit('timeZones', resp.data.content)
      })
      this.categoryService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.$store.commit('categories', resp.data.content)
      })
      this.tagService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.$store.commit('tags', resp.data.content)
      })
      this.companyService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        this.$store.commit('companies', resp.data.content)
      })
      this.businessService.getAll(pagination, undefined).then((resp: AxiosResponse) => {
        if (resp && resp.data.content.length > 0) {
          this.$store.commit('administrationBusiness', resp.data.content)
        } else {
          const createBussinessDto = {
            name: 'DefaultBusiness' + this.$store.state.userIdentity.id,
            description: 'default Business',
            website: 'default.com'
          }
          this.businessService.post(createBussinessDto).then((resp: AxiosResponse) => {
            if (resp) {
              this.$store.commit('administrationBusiness', resp.data)
            }
          })
        }
      })

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

    retrieveAccount () {
      this.accountService.retrieveAccount().then(account => {
        if (account) {
          this.$store.commit('authenticate')
          this.loading = false
          this.$store.commit('authenticated', account.data)
          this.sockets.connect()
        } else {
          this.$router.push('/login')
        }
      })
    }
}
