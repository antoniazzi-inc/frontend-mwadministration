const local = localStorage.getItem('tableColumns') ? localStorage.getItem('tableColumns') : ''
const currentSettings = local ? JSON.parse(local) : {}
console.log('currentSettings')
console.log(currentSettings)
console.log('currentSettings')
export const category = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      subField: null,
      type: '',
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      visible: currentSettings.category ? currentSettings.category.id : true
    },
    {
      name: 'labels.name',
      field: 'code',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      visible: currentSettings.category ? currentSettings.category.code : true
    },
    {
      name: 'labels.color',
      field: 'color',
      subField: null,
      type: 'color',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.category ? currentSettings.category.color : true
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.category ? currentSettings.category.createdOn : true
    }
  ]
}

export const tag = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      subField: null,
      type: '',
      authorities: ['ROLE_SUPER_ADMIN'],
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.tag ? currentSettings.tag.id : true
    },
    {
      name: 'labels.name',
      field: 'code',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.tag ? currentSettings.tag.name : true
    },{
      name: 'labels.points',
      field: 'points',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.tag ? currentSettings.tag.points : true
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.tag ? currentSettings.tag.createdOn : true
    }
  ]
}
export const roles = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      subField: null,
      type: '',
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.roles ? currentSettings.roles.id : true
    },
    {
      name: 'labels.name',
      field: 'name',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.roles ? currentSettings.roles.name : true
    },
    {
      name: 'labels.code',
      field: 'code',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.roles ? currentSettings.roles.code : true
    },
    {
      name: 'labels.description',
      field: 'description',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.roles ? currentSettings.roles.description : true
    },
    {
      name: 'labels.updatedOn',
      field: 'updatedOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.roles ? currentSettings.roles.updatedOn : true
    }
  ]
}
export const users = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      subField: null,
      type: '',
      authorities: ['ROLE_SUPER_ADMIN'],
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.users ? currentSettings.users.id : true
    },
    {
      name: 'labels.name',
      field: 'name',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.users ? currentSettings.users.name : true
    },
    {
      name: 'labels.login',
      field: 'login',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.users ? currentSettings.users.code : true
    },
    {
      name: 'labels.activated',
      field: 'activated',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.users ? currentSettings.users.activated : true
    },
    {
      name: 'labels.lastLogin',
      field: 'lastLogin',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.users ? currentSettings.users.lastLogin : true
    },
    {
      name: 'labels.roles',
      field: 'roles',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.users ? currentSettings.users.roles : true
    }
  ]
}

export const helpMaterials = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      visible: currentSettings.helpMaterials ? currentSettings.helpMaterials.id : true
    },
    {
      name: 'labels.helpType',
      field: 'helpType',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      visible: currentSettings.helpMaterials ? currentSettings.helpMaterials.name : true
    },
    {
      name: 'labels.title',
      field: 'helpContentLanguages',
      authorities: ['*'],
      subField: null,
      type: 'multiLang',
      sort: false,
      visible: currentSettings.helpMaterials ? currentSettings.helpMaterials.code : true
    },
    {
      name: 'labels.tag',
      field: 'tags',
      authorities: ['*'],
      subField: 'helpTagLanguages',
      type: 'multiLang',
      sort: false,
      visible: currentSettings.helpMaterials ? currentSettings.helpMaterials.tag : true
    },
    {
      name: 'labels.category',
      field: 'categories',
      authorities: ['*'],
      subField: 'helpCategoryLanguages',
      type: 'multiLang',
      sort: false,
      visible: currentSettings.helpMaterials ? currentSettings.helpMaterials.roles : true
    },
    {
      name: 'labels.fieldCode',
      field: 'fieldCode',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      visible: currentSettings.helpMaterials ? currentSettings.helpMaterials.roles : true
    },
    {
      name: 'labels.screenCode',
      field: 'screenCode',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      visible: currentSettings.helpMaterials ? currentSettings.helpMaterials.roles : true
    },
    {
      name: 'labels.tabCode',
      field: 'tabCode',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      visible: currentSettings.helpMaterials ? currentSettings.helpMaterials.roles : true
    },
    {
      name: 'labels.popupCode',
      field: 'popupCode',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      visible: currentSettings.helpMaterials ? currentSettings.helpMaterials.roles : true
    }
  ]
}

export const helpCategory = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      visible: currentSettings.helpCategory ? currentSettings.helpCategory.id : true
    },
    {
      name: 'labels.title',
      field: 'helpCategoryLanguages',
      authorities: ['*'],
      subField: null,
      type: 'multiLang',
      sort: false,
      visible: currentSettings.helpCategory ? currentSettings.helpCategory.title : true
    },
    {
      name: 'labels.color',
      field: 'color',
      authorities: ['*'],
      type: 'color',
      subField: null,
      sort: false,
      visible: currentSettings.helpCategory ? currentSettings.helpCategory.color : true
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      type: 'date',
      authorities: ['*'],
      subField: null,
      sort: false,
      visible: currentSettings.helpCategory ? currentSettings.helpCategory.createdOn : true
    },
    {
      name: 'labels.updatedOn',
      field: 'updatedOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.helpCategory ? currentSettings.helpCategory.updatedOn : true
    },
    {
      name: 'labels.children',
      field: 'children',
      subField: 'helpCategoryLanguages',
      type: 'multiLang',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.helpCategory ? currentSettings.helpCategory.children : true
    },
    {
      name: 'labels.parent',
      field: 'parent',
      subField: 'helpCategoryLanguages',
      type: 'multiLang',
      authorities: ['*'],
      sort: false,
      visible: currentSettings.helpCategory ? currentSettings.helpCategory.parent : true
    }
  ]
}

export const helpTag = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.helpTag ? currentSettings.helpTag.id : true
    },
    {
      name: 'labels.title',
      field: 'helpTagLanguages',
      authorities: ['*'],
      type: 'multiLang',
      subField: null,
      sort: false,
      visible: currentSettings.helpTag ? currentSettings.helpTag.title : true
    },
    {
      name: 'labels.color',
      field: 'color',
      authorities: ['*'],
      type: 'color',
      subField: null,
      sort: false,
      visible: currentSettings.helpTag ? currentSettings.helpTag.color : true
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.helpTag ? currentSettings.helpTag.createdOn : true
    },
    {
      name: 'labels.updatedOn',
      field: 'updatedOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.helpTag ? currentSettings.helpTag.updatedOn : true
    }
  ]
}
export const taxRate = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      type: '',
      subField: null,
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.taxRate ? currentSettings.taxRate.id : true
    },
    {
      name: 'labels.level',
      field: 'level',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.taxRate ? currentSettings.taxRate.level : true
    },
    {
      name: 'labels.validFrom',
      field: 'validFrom',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.taxRate ? currentSettings.taxRate.validFrom : true
    },
    {
      name: 'labels.validTo',
      field: 'validTo',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.taxRate ? currentSettings.taxRate.validTo : true
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.taxRate ? currentSettings.taxRate.createdOn : true
    },
    {
      name: 'labels.country',
      field: 'country',
      authorities: ['*'],
      type: '',
      subField: 'enName',
      sort: false,
      visible: currentSettings.taxRate ? currentSettings.taxRate.country : true
    }
  ]
}
export const taxRateLink = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      type: '',
      subField: null,
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.taxRateLink ? currentSettings.taxRateLink.id : true
    },
    {
      name: 'labels.validFrom',
      field: 'validFrom',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.taxRateLink ? currentSettings.taxRateLink.validFrom : true
    },
    {
      name: 'labels.validTo',
      field: 'validTo',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.taxRateLink ? currentSettings.taxRateLink.validTo : true
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.taxRateLink ? currentSettings.taxRateLink.createdOn : true
    },
    {
      name: 'labels.fromTaxRate',
      field: 'fromTaxRate',
      authorities: ['*'],
      type: '',
      subField: 'rate',
      sort: false,
      visible: currentSettings.taxRateLink ? currentSettings.taxRateLink.fromTaxRate : true
    },
    {
      name: 'labels.toTaxRate',
      field: 'toTaxRate',
      authorities: ['*'],
      type: '',
      subField: 'rate',
      sort: false,
      visible: currentSettings.taxRateLink ? currentSettings.taxRateLink.toTaxRate : true
    }
  ]
}
export const taxRule = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      type: '',
      subField: null,
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.taxRule ? currentSettings.taxRule.id : true
    },
    {
      name: 'labels.customerType',
      field: 'customerType',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.taxRule ? currentSettings.taxRule.customerType : true
    },
    {
      name: 'labels.customerRegion',
      field: 'customerRegion',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.taxRule ? currentSettings.taxRule.customerRegion : true
    },
    {
      name: 'labels.ruleType',
      field: 'ruleType',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.taxRule ? currentSettings.taxRule.ruleType : true
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.taxRule ? currentSettings.taxRule.createdOn : true
    },
    {
      name: 'labels.country',
      field: 'country',
      authorities: ['*'],
      type: '',
      subField: 'enName',
      sort: false,
      visible: currentSettings.taxRule ? currentSettings.taxRule.country : true
    }
  ]
}
export const regions = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.regions ? currentSettings.regions.id : true
    },
    {
      name: 'labels.name',
      field: 'name',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.regions ? currentSettings.regions.name : true
    },
    {
      name: 'labels.home',
      field: 'home',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      visible: currentSettings.regions ? currentSettings.regions.home : true
    },
    {
      name: 'labels.abroad',
      field: 'abroad',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      visible: currentSettings.regions ? currentSettings.regions.ruleType : true
    },
    {
      name: 'labels.insideEu',
      field: 'insideEu',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      visible: currentSettings.regions ? currentSettings.regions.insideEU : true
    },
    {
      name: 'labels.outsideEu',
      field: 'outsideEu',
      authorities: ['*'],
      type: 'boolean',
      subField: 'enName',
      sort: false,
      visible: currentSettings.regions ? currentSettings.regions.outsideEU : true
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: 'enName',
      sort: false,
      visible: currentSettings.regions ? currentSettings.regions.createdOn : true
    }
  ]
}

export const administration = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.administration ? currentSettings.administration.id : true
    },
    {
      name: 'labels.name',
      field: 'name',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.administration ? currentSettings.administration.name : true
    },
    {
      name: 'labels.accessCode',
      field: 'accessCode',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.administration ? currentSettings.administration.accessCode : true
    },
    {
      name: 'labels.useShop',
      field: 'useShop',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      visible: currentSettings.administration ? currentSettings.administration.useShop : true
    },
    {
      name: 'labels.useAutomation',
      field: 'useAutomation',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      visible: currentSettings.administration ? currentSettings.administration.useAutomation : true
    },
    {
      name: 'labels.locked',
      field: 'locked',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      visible: currentSettings.administration ? currentSettings.administration.locked : true
    },
    {
      name: 'labels.trial',
      field: 'trial',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      visible: currentSettings.administration ? currentSettings.administration.trial : true
    },
    {
      name: 'labels.relationsLimit',
      field: 'relationsLimit',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.administration ? currentSettings.administration.relationsLimit : true
    },
    {
      name: 'labels.validFrom',
      field: 'validFrom',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.administration ? currentSettings.administration.validFrom : true
    },
    {
      name: 'labels.validTo',
      field: 'validTo',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.administration ? currentSettings.administration.validTo : true
    },
    {
      name: 'labels.language',
      field: 'langKey',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.regions ? currentSettings.regions.language : true
    }
  ]
}
export const deliveryMethod = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.deliveryMethod ? currentSettings.deliveryMethod.id : true
    },
    {
      name: 'labels.name',
      field: 'deliveryMethodLanguages',
      authorities: ['*'],
      type: 'multiLang',
      subField: 'name',
      sort: false,
      visible: currentSettings.deliveryMethod ? currentSettings.deliveryMethod.name : true
    },
    {
      name: 'labels.description',
      field: 'deliveryMethodLanguages',
      authorities: ['*'],
      type: 'multiLang',
      subField: 'description',
      sort: false,
      visible: currentSettings.deliveryMethod ? currentSettings.deliveryMethod.description : true
    },
    {
      name: 'labels.type',
      field: 'deliveryMethodType',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.deliveryMethod ? currentSettings.deliveryMethod.type : true
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.administration ? currentSettings.administration.createdOn : true
    }
  ]
}
export const paymentMethod = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.paymentMethod ? currentSettings.paymentMethod.id : true
    },
    {
      name: 'labels.name',
      field: 'paymentMethodLanguages',
      authorities: ['*'],
      type: 'multiLang',
      subField: null,
      sort: false,
      visible: currentSettings.paymentMethod ? currentSettings.paymentMethod.name : true
    },
    {
      name: 'labels.administrationCosts',
      field: 'administrativeCostsFixed',
      authorities: ['*'],
      type: 'money',
      subField: null,
      sort: false,
      visible: currentSettings.paymentMethod ? currentSettings.paymentMethod.administrationCosts : true
    },
    {
      name: 'labels.available',
      field: 'availability',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      visible: currentSettings.paymentMethod ? currentSettings.paymentMethod.available : true
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      visible: currentSettings.paymentMethod ? currentSettings.paymentMethod.createdOn : true
    }
  ]
}
