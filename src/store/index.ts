import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logon: false,
    userIdentity: null,
    authorities: [],
    authenticated: false,
    currentLanguage: 'en',
    currency: '€',
    lookups: {
      categories: [],
      groups: [],
      tags: [],
      freeFields: [],
      regions: [],
      products: [],
      timeZones: [],
      taxRates: [],
      companies: [],
      paymentMethods: [],
      deliveryMethods: [],
      roles: [],
      promotions: [],
      invoiceTemplates: [],
      permissions: [],
      administrationBusiness: []
    },
    languages: {
      nl: { name: 'Nederlands' },
      en: { name: 'English' },
      fr: { name: 'Français' },
      de: { name: 'Deutsch' },
      it: { name: 'Italiano' },
      es: { name: 'Español' }
    },
    allCountries: []
  },
  mutations: {
    authenticate (state) {
      state.logon = true
    },
    allCountries (state, countries) {
      state.allCountries = countries
    },
    authenticated (state, identity) {
      state.userIdentity = identity
      state.authenticated = true
      state.logon = false
    },
    logout (state) {
      state.userIdentity = null
      state.authenticated = false
      state.logon = false
    },
    currentLanguage (state, newState) {
      state.currentLanguage = newState
    },
    categories (state, newState) {
      state.lookups.categories = newState
    },
    tags (state, newState) {
      state.lookups.tags = newState
    },
    taxRates (state, newState) {
      state.lookups.taxRates = newState
    },
    freeFields (state, newState) {
      state.lookups.freeFields = newState
    },
    groups (state, newState) {
      state.lookups.groups = newState
    },
    timeZones (state, newState) {
      state.lookups.timeZones = newState
    },
    regions (state, newState) {
      state.lookups.regions = newState
    },
    companies (state, newState) {
      state.lookups.companies = newState
    },
    products (state, newState) {
      state.lookups.products = newState
    },
    roles (state, newState) {
      state.lookups.roles = newState
    },
    permissions (state, newState) {
      state.lookups.permissions = newState
    },
    paymentMethods (state, newState) {
      state.lookups.paymentMethods = newState
    },
    deliveryMethods (state, newState) {
      state.lookups.deliveryMethods = newState
    },
    administrationBusiness (state, newState) {
      state.lookups.administrationBusiness = newState
    },
    authorities (state, authorities) {
      state.authorities = authorities
    }
  },
  getters: {
    currentLanguage: state => state.currentLanguage,
    languages: state => state.languages,
    logon: state => state.logon,
    account: state => state.userIdentity,
    authorities: state => state.authorities,
    allCountries: state => state.allCountries,
    authenticated: state => state.authenticated
  },
  actions: {},
  modules: {}
})
