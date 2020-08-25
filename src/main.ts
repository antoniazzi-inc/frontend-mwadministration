import Vue from 'vue'
import 'bootstrap'
import VeeValidate from 'vee-validate'
import VueI18n from 'vue-i18n'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/icons.scss'
import '@/assets/css/app.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './shared/filters'
import * as enTranslations from '@/i18n/en'
import * as deTranslations from '@/i18n/de'
import * as esTranslations from '@/i18n/es'
import * as frTranslations from '@/i18n/fr'
import * as nlTranslations from '@/i18n/nl'
import setupAxiosInterceptors from '@/shared/axios-interceptors'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import ServerErrorsHandler from '@/shared/serverErrorsHandler'
import VueFormWizard from 'vue-form-wizard'
// @ts-ignore
window.$ = require('jquery')

Vue.use(VeeValidate, {

})
Vue.use(VueFormWizard)
Vue.config.productionTip = false
Vue.use(VueI18n)
filters.initFilters()
const messages = {
  en: enTranslations,
  de: deTranslations,
  es: esTranslations,
  fr: frTranslations,
  nl: nlTranslations
}
const i18n: object = new VueI18n({
  locale: 'en',
  messages
})
const errorHandler = new ServerErrorsHandler()
setupAxiosInterceptors((err: object) => {
  errorHandler.handleError(err)
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
