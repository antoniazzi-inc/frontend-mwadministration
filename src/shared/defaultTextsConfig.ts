export const DefaultTextsConfig = [
  {
    categoryId: 'orders',
    categoryName: 'labels.orders',
    texts: [
      {
        settingsKey: 'text_orders_po',
        type: 'email',
        name: 'labels.emailsSentAfterPaidOrder'
      },
      {
        settingsKey: 'text_orders_uo',
        type: 'email',
        name: 'labels.emailsSentAfterUnpaidOrder'
      },
      {
        settingsKey: 'text_orders_ri',
        type: 'email',
        name: 'labels.emailsSentWithRecurrentInvoice'
      },
      {
        settingsKey: 'text_orders_fi',
        type: 'email',
        name: 'labels.emailsSentWithFailedIncasso'
      },
      {
        settingsKey: 'text_orders_pr',
        type: 'email',
        name: 'labels.emailsSentWithPaymentReminder'
      },
      {
        settingsKey: 'text_orders_tpr',
        type: 'htmlPage',
        name: 'labels.thankYouPageAfterPayingRecurrentInvoice'
      },
      {
        settingsKey: 'text_orders_ci',
        type: 'email',
        name: 'labels.creditInvoiceEmail'
      },
      {
        settingsKey: 'text_orders_tpp',
        type: 'htmlPage',
        name: 'labels.thankYouPageAfterPurchase'
      },
      {
        settingsKey: 'text_orders_sa',
        type: 'htmlFragment',
        name: 'labels.socialAffiliateLine'
      },
    ]
  },
  {
    categoryId: 'notifications',
    categoryName: 'labels.notifications',
    texts: [
      {
        settingsKey: 'text_notify_pp',
        type: 'email',
        name: 'labels.emailWhenPhysicalProductIsDelivered'
      },
      {
        settingsKey: 'text_notify_ri',
        type: 'email',
        name: 'labels.notificationOfUpcomingRecurrentInvoice'
      }
    ]
  },
  {
    categoryId: 'interactions',
    categoryName: 'labels.interactions',
    texts: [
      {
        settingsKey: 'text_interact_ss',
        type: 'htmlPage',
        name: 'labels.selfServiceWebPage'
      },
      {
        settingsKey: 'text_interact_so',
        type: 'htmlPage',
        name: 'labels.newsletterSignOutFormPage'
      },
      {
        settingsKey: 'text_interact_sot',
        type: 'htmlPage',
        name: 'labels.newsletterSignOutThankYouPage'
      },
      {
        settingsKey: 'text_interact_sa',
        type: 'htmlPage',
        name: 'labels.sendAFriendFormPage'
      },
      {
        settingsKey: 'text_interact_sat',
        type: 'htmlPage',
        name: 'labels.sendAFriendThankYouPage'
      }
    ]
  },
  {
    categoryId: 'errors',
    categoryName: 'labels.errors',
    texts: [
      {
        settingsKey: 'text_error_pf',
        type: 'htmlPage',
        name: 'labels.errorProcessingForm'
      },
      {
        settingsKey: 'text_error_nf',
        type: 'htmlPage',
        name: 'labels.formNotFound'
      },
      {
        settingsKey: 'text_error_ou',
        type: 'htmlPage',
        name: 'labels.optInUnsuccessful'
      },
      {
        settingsKey: 'text_error_fs',
        type: 'htmlPage',
        name: 'labels.formAlreadySubmittedBefore'
      },
      {
        settingsKey: 'text_error_ne',
        type: 'htmlPage',
        name: 'labels.noEmailAddressGiven'
      },
      {
        settingsKey: 'text_error_ge',
        type: 'htmlPage',
        name: 'labels.generalError'
      }
    ]
  }
];
export const EmailTemplates = [
  {
    id: 'mjml-sm',
    name: 'labels.simpleMessage',
    items: [{
      id: 'headerText',
      name: 'labels.headerText',
      component: 'textInput'
    }, {
      id: 'pageText',
      name: 'labels.pageText',
      component: 'htmlEditor'
    }]
  },
  {
    id: 'mjml-am',
    name: 'labels.actionMessage',
    items: [{
      id: 'headerText',
      name: 'labels.headerText',
      component: 'textInput'
    }, {
      id: 'pageText',
      name: 'labels.pageText',
      component: 'htmlEditor'
    }, {
      id: 'buttonText',
      name: 'labels.buttonText',
      component: 'textInput'
    }, {
      id: 'buttonLink',
      name: 'labels.buttonLink',
      component: 'textInput'
    }, {
      id: 'pageText2',
      name: 'labels.pageText2',
      component: 'htmlEditor'
    }]
  },
  {
    id: 'mjml-fm',
    name: 'labels.fullMessage',
    items: [{
      id: 'headerText',
      name: 'labels.headerText',
      component: 'textInput'
    }, {
      id: 'pageText',
      name: 'labels.pageText',
      component: 'htmlEditor'
    }, {
      id: 'imageUrl',
      name: 'labels.imageUrl',
      component: 'textInput'
    }, {
      id: 'footerText',
      name: 'labels.footerText',
      component: 'htmlEditor'
    }, {
      id: 'socialMedia',
      name: 'labels.socialMedia',
      component: 'socialMedia'
    }]
  },
  {
    id: 'mjml-fa',
    name: 'labels.fullAction',
    items: [{
      id: 'headerText',
      name: 'labels.headerText',
      component: 'textInput'
    }, {
      id: 'pageText',
      name: 'labels.pageText',
      component: 'htmlEditor'
    }, {
      id: 'buttonText',
      name: 'labels.buttonText',
      component: 'textInput'
    }, {
      id: 'buttonLink',
      name: 'labels.buttonLink',
      component: 'textInput'
    }, {
      id: 'pageText2',
      name: 'labels.pageText2',
      component: 'htmlEditor'
    }, {
      id: 'imageUrl',
      name: 'labels.imageUrl',
      component: 'textInput'
    }, {
      id: 'footerText',
      name: 'labels.footerText',
      component: 'htmlEditor'
    }, {
      id: 'socialMedia',
      name: 'labels.socialMedia',
      component: 'socialMedia'
    }]
  }
];
export const HtmlPageTemplates = [
  {
    id: 'mjml-page-s',
    name: 'labels.simplePage',
    items: [{
      id: 'headerText',
      name: 'labels.headerText',
      component: 'textInput'
    }, {
      id: 'pageText',
      name: 'labels.pageText',
      component: 'htmlEditor'
    }]
  },
  {
    id: 'mjml-page-f',
    name: 'labels.fullPage',
    items: [{
      id: 'headerText',
      name: 'labels.headerText',
      component: 'textInput'
    }, {
      id: 'pageText',
      name: 'labels.pageText',
      component: 'htmlEditor'
    }, {
      id: 'footerText',
      name: 'labels.footerText',
      component: 'htmlEditor'
    }, {
      id: 'socialMedia',
      name: 'labels.socialMedia',
      component: 'socialMedia'
    }]
  },
];
export const HtmlPage = {
  subject: [],
  value: {
    selectedTemplate: null
  },
  config: {
    font: {},
    backgroundColor: '',
    width: '',
    border: '',
    borderColor: '',
    header: {
      fontSize: '',
      textAlign: '',
      fontWeight: '',
      color: '',
      fontStyle: ''
    },
    footer: {
      fontSize: '',
      textAlign: '',
      backgroundColor: '',
      color: ''
    },
    buttons: {
      borderRadius: '',
      buttonSize: '',
      fontWeight: '',
      backgroundColor: ''
    },
    text: {
      fontSize: '',
      color: '',
      textAlign: ''
    }
  }
}
export const HtmlFragmentText = {}
export const EmailTextConfig = {
  subject: [],
  value: {
    selectedTemplate: null,
    headerText: '',
    pageText: {},
    pageText2: {},
    buttonText: '',
    buttonLink: '',
    imageUrl: '',
    footerText: {},
    socialMedia: [],
  },
  config: {
    font: {},
    backgroundColor: '',
    width: '',
    border: '',
    borderColor: '',
    header: {
      fontSize: '',
      textAlign: '',
      fontWeight: '',
      color: '',
      fontStyle: ''
    },
    footer: {
      fontSize: '',
      textAlign: '',
      backgroundColor: '',
      color: ''
    },
    buttons: {
      borderRadius: '',
      buttonSize: '',
      fontWeight: '',
      backgroundColor: ''
    },
    text: {
      fontSize: '',
      color: '',
      textAlign: ''
    }
  }
};
