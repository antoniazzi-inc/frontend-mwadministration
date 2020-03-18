// @ts-ignore
import HomeComponent from './entities/home/home.vue'
// @ts-ignore
import LoginComponent from '@/entities/login/login.vue'
import { Component, Vue } from 'vue-property-decorator'
import RelationService from '@/shared/services/relationService'
import 'vue-on-toast/dist/vue-on-toast.css'
// @ts-ignore
import VueOnToast from 'vue-on-toast'
import CategoryService from '@/shared/services/categoryService'
import CountryService from '@/shared/services/CountryService'
import { AxiosResponse } from 'axios'
import TagService from '@/shared/services/tagService'
import TimeZoneService from '@/shared/services/timeZoneService'
import TaxRateService from '@/shared/services/taxRateService'
import money from 'v-money'
Vue.use(money, {precision: 2})
Vue.use(VueOnToast, {})
  @Component({
    components: {
      HomeComponent,
      LoginComponent
    }
  })
export default class App extends Vue {
    accountService = RelationService.getInstance();
    categoryService = CategoryService.getInstance();
    timeZoneService = TimeZoneService.getInstance();
    countryService = CountryService.getInstance();
    tagService = TagService.getInstance();
    taxRateService = TaxRateService.getInstance();
    loading = true;
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
        this.columns = {
          relation: {
            id: true,
            name: true,
            createdOn: false,
            postalCode: false,
            city: false,
            country: false,
            company: false,
            points: false,
            relationType: false,
            groups: false,
            email: true,
            tags: true,
            showing: 20
          },
          order: {
            id: true,
            createdOn: true,
            customer: true,
            description: true,
            productFeatures: true,
            nettoAmount: true,
            invoiceNumber: true,
            paymentStatus: true,
            showing: 20
          },
          helpTag: {
            id: true,
            name: true,
            color: true,
            createdOn: true,
            updatedOn: true,
            showing: 20
          },
          helpCategory: {
            id: true,
            title: true,
            color: true,
            createdOn: true,
            updatedOn: true,
            children: true,
            parent: true,
            showing: 20
          },
          helpMaterials: {
            id: true,
            type: true,
            title: true,
            tag: true,
            language: true,
            category: true,
            fieldCode: true,
            screenCode: true,
            tabCode: true,
            popUpCode: true,
            showing: 20
          },
          category: {
            id: true,
            code: true,
            createdOn: true,
            color: true,
            showing: 20
          },
          tag: {
            id: true,
            name: true,
            points: true,
            createdOn: true,
            showing: 20
          },
          roles: {
            id: true,
            code: true,
            name: true,
            updatedOn: true,
            description: true,
            showing: 20
          },
          users: {
            id: true,
            login: true,
            name: true,
            activated: true,
            lastLogin: true,
            roles: true,
            showing: 20
          },
          customField: {
            id: true,
            code: true,
            userVisible: true,
            userEditable: true,
            gdprSpecialField: true,
            customFieldType: true,
            createdOn: true,
            updatedOn: true,
            showing: 20
          },
          group: {
            id: true,
            label: true,
            createdOn: true,
            category: true,
            showing: 20
          },
          promotion: {
            id: true,
            name: true,
            availableFrom: true,
            availableTo: true,
            promotionType: true,
            discount: true,
            promotionProducts: true,
            showing: 20
          },
          taxRate: {
            id: true,
            level: true,
            validFrom: true,
            validTo: true,
            createdOn: true,
            country: true,
            showing: 20
          },
          taxRateLink: {
            id: true,
            validFrom: true,
            validTo: true,
            createdOn: true,
            fromTaxRate: true,
            toTaxRate: true,
            showing: 20
          },
          taxRule: {
            id: true,
            customerType: true,
            customerRegion: true,
            ruleType: true,
            createdOn: true,
            country: true,
            showing: 20
          },
          deliveryMethod: {
            id: true,
            name: true,
            description: true,
            type: true,
            createdOn: true,
            showing: 20
          },
          paymentMethod: {
            id: true,
            name: true,
            administrativeCosts: true,
            available: true,
            createdOn: true,
            showing: 20
          },
          administration: {
            id: true,
            name: true,
            accessCode: true,
            useShop: true,
            useAutomation: true,
            locked: true,
            trial: true,
            relationsLimit: true,
            validFrom: true,
            validTo: true,
            language: true,
            showing: 20
          }
        }
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
    }

    retrieveAccount () {
      this.accountService.retrieveAccount().then(account => {
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
