/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

import Vue from 'vue'
import 'bootstrap'
import VeeValidate from 'vee-validate'
import VueI18n from 'vue-i18n'
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/css/main.css' // added PJE 8 sep from /opt/dev/templates/light-admin
import '@/assets/css/icons.scss'
import '@/assets/css/app.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './shared/filters'
import * as deTranslations from '@/i18n/de'
import * as esTranslations from '@/i18n/es'
import * as frTranslations from '@/i18n/fr'
import * as enTranslations from '@/i18n/en'
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
filters.initFilters()
Vue.use(VueI18n)
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
