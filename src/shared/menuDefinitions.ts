export const MenuDefinitions = [
  {
    name: 'labels.relations',
    authorities: ['*'],
    icon: 'main-menu-icon fas fa-user-tie',
    path: '/relations',
    children: [{
      name: 'labels.dashboard',
      icon: '',
      path: '/relations-dashboard',
      authorities: ['*']
    }, {
      name: 'labels.relations',
      icon: '',
      path: '/relations',
      authorities: ['*']
    }, {
      name: 'labels.groups',
      icon: '',
      path: '/relations-groups',
      authorities: ['*']
    }, {
      name: 'labels.import',
      icon: '',
      path: '/relations-import',
      authorities: ['*']
    }, {
      name: 'labels.freeFields',
      icon: '',
      path: '/relations-free-fields',
      authorities: ['*']
    }, {
      name: 'labels.reporting',
      icon: '',
      path: '/relations-reporting',
      authorities: ['*']
    }]
  }, {
    name: 'labels.actions',
    authorities: ['*'],
    icon: 'main-menu-icon fas fa-comments',
    path: '/actions-dashboard',
    children: [{
      name: 'labels.dashboard',
      icon: '',
      path: '/actions-dashboard',
      authorities: ['*']
    },
    {
      name: 'labels.listManagers',
      icon: '',
      path: '/actions-list-managers',
      authorities: ['*']
    },
    {
      name: 'labels.mailings',
      icon: '',
      path: '/actions-mailings',
      authorities: ['*']
    },
    {
      name: 'labels.workflows',
      icon: '',
      path: '/actions-workflows',
      authorities: ['*']
    },
    {
      name: 'labels.courses',
      icon: '',
      path: '/actions-courses',
      authorities: ['*']
    },
    {
      name: 'labels.reporting',
      icon: '',
      path: '/actions-reporting',
      authorities: ['*']
    }]
  }, {
    name: 'labels.content',
    authorities: ['*'],
    icon: 'main-menu-icon fa fa-envelope',
    path: '/content-email-texts',
    children: [{
      name: 'labels.emailTexts',
      icon: '',
      path: '/content-email-texts',
      authorities: ['*']
    },
    {
      name: 'labels.landingPages',
      icon: '',
      path: '/content-landing-pages',
      authorities: ['*']
    },
    {
      name: 'labels.contentItems',
      icon: '',
      path: '/content-content-items',
      authorities: ['*']
    },
    {
      name: 'labels.contentRules',
      icon: '',
      path: '/content-content-rules',
      authorities: ['*']
    },
    {
      name: 'labels.screenTexts',
      icon: '',
      path: '/content-screen-texts',
      authorities: ['*']
    }]
  }, {
    name: 'labels.products',
    authorities: ['*'],
    icon: 'main-menu-icon os-icon os-icon-shopping-cart',
    path: '/products',
    children: [{
      name: 'labels.dashboard',
      icon: '',
      path: '/products-dashboard',
      authorities: ['*']
    },
    {
      name: 'labels.products',
      icon: '',
      path: '/products',
      authorities: ['*']
    },
    {
      name: 'labels.promotions',
      icon: '',
      path: '/products/promotions',
      authorities: ['*']
    },
    {
      name: 'labels.shoppingCartSettings',
      icon: '',
      path: '/products-shopping-cart-settings',
      authorities: ['*']
    },
    {
      name: 'labels.shoppingCartProducts',
      icon: '',
      path: '/products-shopping-cart-products',
      authorities: ['*']
    }]
  }, {
    name: 'labels.orders',
    authorities: ['*'],
    icon: 'main-menu-icon picons-thin-icon-thin-0426_money_payment_dollars_coins_cash',
    path: '/orders',
    children: [{
      name: 'labels.dashboard',
      icon: '',
      path: '/orders-dashboard',
      authorities: ['*']
    },
    {
      name: 'labels.orders',
      icon: '',
      path: '/orders',
      authorities: ['*']
    },
    {
      name: 'labels.affiliates',
      icon: '',
      path: '/orders-affiliates',
      authorities: ['*']
    },
    {
      name: 'labels.reporting',
      icon: '',
      path: '/orders-reporting',
      authorities: ['*']
    }]
  }, {
    name: 'labels.maintenance',
    authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
    icon: 'main-menu-icon os-icon os-icon-others-43',
    path: '/maintenance',
    children: [{
      name: 'labels.helpMaterial',
      icon: '',
      path: '/maintenance/help-material',
      authorities: ['ROLE_SUPER_ADMIN']
    }, {
      name: 'labels.helpCategory',
      icon: '',
      path: '/maintenance/help-category',
      authorities: ['ROLE_SUPER_ADMIN']
    }, {
      name: 'labels.helpTag',
      icon: '',
      path: '/maintenance/help-tag',
      authorities: ['ROLE_SUPER_ADMIN']
    }, {
      name: 'labels.taxRate',
      icon: '',
      path: '/maintenance/tax-rate',
      authorities: ['*']
    }, {
      name: 'labels.taxRule',
      icon: '',
      path: '/maintenance/tax-rule',
      authorities: ['*']
    }, {
      name: 'labels.taxRateLink',
      icon: '',
      path: '/maintenance/tax-rate-link',
      authorities: ['*']
    }, {
      name: 'labels.regions',
      icon: '',
      path: '/maintenance/regions',
      authorities: ['*']
    }, {
      name: 'labels.administrations',
      icon: '',
      path: '/maintenance/administrations',
      authorities: ['ROLE_SUPER_ADMIN']
    }, {
      name: 'labels.externalSystems',
      icon: '',
      path: '/maintenance/external-systems',
      authorities: ['ROLE_SUPER_ADMIN']
    }, {
      name: 'labels.migrations',
      icon: '',
      path: '/maintenance/migrations',
      authorities: ['*']
    }]
  }
]
