import {mixins} from 'vue-class-component';
import {Component, Vue} from 'vue-property-decorator';
import MultiLangHtmlEditorComponent from "@/components/multiLanguageHtmlEditor/MultiLanguageHtmlEditor.vue";
import {Fonts} from '@/shared/fonts';
import CommonHelpers from "@/shared/commonHelpers";
import {IInvoiceTemplate} from "@/shared/models/orderms/InvoiceTemplateModel";
import InvoiceTemplatesService from "@/shared/services/orderms/InvoiceTemplatesService";
import {AxiosResponse} from "axios";
import MultiLanguageComponent from "@/components/multiLanguage/MultiLanguage.vue";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import PaginationTableComponent from "@/components/paginationTable/paginationTable.vue";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {IMultiLanguageConfig, MultiLanguageConfig} from "@/shared/models/MultiLanguageConfig";
import SimpleSearchComponent from "@/components/simpleSearch/simpleSearch.vue";
import vue2Dropzone from "vue2-dropzone";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import Chrome from "vue-color/src/components/Chrome";

@Component({
  components: {
    MultiLanguageComponent,
    vueDropzone: vue2Dropzone,
    SearchableSelectComponent,
    MultiLangHtmlEditorComponent,
    PaginationTableComponent,
    SimpleSearch: SimpleSearchComponent,
    ToggleSwitch,
    'chrome-picker': Chrome
  },
  props: {
    active: Boolean
  }
})
export default class InvoiceTemplate extends mixins(CommonHelpers, Vue) {
  $refs!: {
    editInvoiceModal: HTMLElement
  }
  public colors: any = [];
  public itemsPerPage: number;
  public queryCount: number | any;
  public page: number;
  public previousPage: number | any;
  public invoiceTemplateTabIndex: number;
  public propOrder: string;
  public currentTab: string;
  public allFonts: any[];
  public errorInvoiceTemplate: string;
  public invoiceTemplateData: any;
  public currentSearch: string;
  public reverse: boolean;
  public isSaveInvoiceTemplateDisabled: boolean;
  public totalItems: number;
  public multiLangConfigCompanyData: any;
  public uploadLogoConfig: any;
  public selectedLogo: any;
  public singleSelectConfigMasterTemplate: ISearchableSelectConfig;
  public multiLangConfigPaymentInfo: IMultiLanguageConfig;
  public multiLangConfigPaymentInfoPaid: IMultiLanguageConfig;
  public multiLangConfigPaymentInfoFooter: IMultiLanguageConfig;
  public multiLangConfigPaymentInfoHeader: IMultiLanguageConfig;
  public multiLangConfigPaymentUnpaidIncasso: IMultiLanguageConfig;
  public multiLangConfigPaymentUnpaidBank: IMultiLanguageConfig;
  public multiLangConfigExtraFooter: IMultiLanguageConfig;
  public multiLangConfigExtraHeader: IMultiLanguageConfig;
  public invoiceTemplates: IInvoiceTemplate[];
  public invoiceToEdit: IInvoiceTemplate | any;
  public countriesConfig: ISearchableSelectConfig = new SearchableSelectConfig('enName', 'labels.selectCountry', '',
    false, false, false, false, true, false)
  public invoiceTemplateService: any
  private removeId: string | any;
  private templateNameSearch: string;
  public dropzoneOptions = {
    url: '#',
    autoProcessQueue: false,
    thumbnailWidth: 150,
    maxFilesize: 200,
    uploadMultiple: false,
    acceptedFiles: ['.jpg', '.png', '.jpeg', '.tiff', '.gif'].join(','),
    addRemoveLinks: true,
    headers: {'My-Awesome-Header': 'header value'}
  }

  constructor() {
    super();
    this.invoiceTemplateService = InvoiceTemplatesService.getInstance()
    this.uploadLogoConfig = {
      msg: 'UploadLogo',
      extensions: '',
      accept: '',
      multiple: false
    };
    this.allFonts = [];
    this.invoiceTemplates = [];
    this.itemsPerPage = 20;
    this.queryCount = null;
    this.selectedLogo = null;
    this.isSaveInvoiceTemplateDisabled = true;
    this.singleSelectConfigMasterTemplate = new SearchableSelectConfig('name', 'labels.selectMasterTempalte', '',
      false, false, false, false, true, false)
    this.currentTab = 'companyData',
      this.multiLangConfigCompanyData = {
        showName: true,
        showDescription: true,
        nameLabel: 'Name',
        descriptionLabel: 'Description',
        requiredName: true,
        requiredDescription: false,
        enableUndoBtn: false,
        enableRemoveBtn: true,
        enableSaveBtn: false,
        showLangs: true
      };
    this.multiLangConfigPaymentInfo = new MultiLanguageConfig(false, true, '',
      'labels.unpaidBottom', false, false, false, true, false, false)
    this.multiLangConfigPaymentInfoPaid = new MultiLanguageConfig(false, true, '',
      'labels.paidBottom', false, false, false, true, false, false)
    this.multiLangConfigPaymentUnpaidIncasso = new MultiLanguageConfig(false, true, '',
      'labels.unpaidIncasso', false, false, false, true, false, false)
    this.multiLangConfigPaymentUnpaidBank = new MultiLanguageConfig(false, true, '',
      'labels.unpaidBankTransfer', false, false, false, true, false, false)
    this.multiLangConfigPaymentInfoFooter = new MultiLanguageConfig(false, true, '',
      'labels.smallFooter', false, false, false, true, false, false)
    this.multiLangConfigPaymentInfoHeader = new MultiLanguageConfig(false, true, '',
      'labels.smallHeader', false, false, false, true, false, false)
     this.multiLangConfigExtraFooter = new MultiLanguageConfig(false, true, '',
      'labels.extraFooter', false, false, false, true, false, false)
    this.multiLangConfigExtraHeader = new MultiLanguageConfig(false, true, '',
      'labels.extraHeader', false, false, false, true, false, false)
    this.page = 1;
    this.previousPage = null;
    this.propOrder = 'id';
    this.templateNameSearch = '';
    this.invoiceTemplateData = {
      addressLine1: '',
      addressLine2: '',
      logoPosition: '',
      companyName: '',
      postalCode: '',
      city: '',
      phoneNumber: '',
      email: '',
      contactName: '',
      vat: '',
      chamber: '',
      invoiceDescription: '',
      invoiceName: '',
      paymentInfoSmallHeader: [],
      paymentInfoUnpaid: [],
      paymentInfoPaid: [],
      unpaidIncassoLine: [],
      unpaidBankTransferLine: [],
      extraFooter: [],
      extraHeader: [],
      paymentInfoSmallFooter: [],
      selectedCountry: null,
      masterTemplate: null,
      invoiceEmailContent: {},
      fontName: '',
      fontColor: '',
      titleColor: '',
      highlightColor: '',
      fontUrl: '',
    };
    this.errorInvoiceTemplate = '';
    this.currentSearch = '';
    this.reverse = false;
    this.totalItems = 0;
    this.invoiceTemplateTabIndex = 0;
    this.removeId = null;
    this.invoiceToEdit = null
  }

  public mounted(): void {
    this.retrieveAllInvoiceTemplates();
  }

  public search() {

  }
  public updateFontColor(color:any) {
    this.invoiceTemplateData.fontColor = color.hex
  }
  public updateTitleColor(color:any) {
    this.invoiceTemplateData.titleColor = color.hex
  }
  public updateHighlightColor(color:any) {
    this.invoiceTemplateData.highlightColor = color.hex
  }
  public masterTemplateChanged(template:any) {
    this.invoiceToEdit.masterTemplate = template
  }
  public masterTemplateRemoved(template:any) {
    this.invoiceToEdit.masterTemplate = null
  }

  public closeInvoiceDialog() {
    //@ts-ignore
    $(this.$refs.editInvoiceModal).modal('hide')
  }

  public saveInvoiceTemplate() {
    this.validateInvoiceTemplate().then(resp => {
      //@ts-ignore
      if (resp.valid) {
        this.invoiceToEdit.templateDataJson = this.invoiceTemplateData;
        this.invoiceToEdit.name = this.invoiceTemplateData.invoiceName;
        this.invoiceToEdit.description = this.invoiceTemplateData.invoiceDescription;
        if (this.invoiceToEdit.id) {
          this.invoiceTemplateService.put(this.invoiceToEdit).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('invoiceUpdated', 'success')
              this.closeInvoiceDialog();
              this.retrieveAllInvoiceTemplates();
            } else {
              this.setAlert('invoiceUpdateError', 'error')
            }
          });
        } else {
          this.invoiceTemplateService.post(this.invoiceToEdit).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('invoiceCreated', 'success')
              this.closeInvoiceDialog();
              this.retrieveAllInvoiceTemplates();
            } else {
              this.setAlert('invoiceCreateError', 'error')
            }
          });
        }
      } else {
        //@ts-ignore
        this.errorInvoiceTemplate = resp.errorMessage;
        //@ts-ignore
        this.invoiceTemplateTabIndex = resp.tabIndex
      }
    })
  }

  public validateInvoiceTemplate() {
    let self = this;
    let err: any = {
      valid: false,
      errorMessage: '',
      tabIndex: null
    };
    return new Promise(resolve => {
      if (self.invoiceTemplateData.invoiceName !== '') {
        err.valid = true;
      } else {
        err.valid = false;
        err.errorMessage = 'labels.nameRequired';
        err.tabIndex = 0;
        resolve(err);
        return;
      }
      if (self.invoiceTemplateData.companyName) {
        err.valid = true;
      } else {
        err.valid = false;
        err.errorMessage = 'labels.companyNameRequired'
        err.tabIndex = 0;
        resolve(err);
        return;
      }
      if (err.valid) {
        resolve(err);
      }
    });
  }

  public clear(): void {
    this.page = 1;
    this.templateNameSearch = '';
    this.retrieveAllInvoiceTemplates();
  }

  public retrieveAllInvoiceTemplates(): void {
    let self = this;
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/orderms/api/invoice-templates', undefined, undefined);
    this.invoiceTemplates = this.$store.state.lookups.invoiceTemplates
    $.each(Fonts, function (k, v) {
      self.allFonts.push({
        fontName: v.name,
        fontUrl: v.url.eot
      });
    });
  }

  public editInvoice(invoice: any) {
    this.invoiceToEdit = invoice;
    if (invoice.templateDataJson) {
      this.invoiceTemplateData = invoice.templateDataJson
    }
    //@ts-ignore
    $(this.$refs.editInvoiceModal).modal('show');
  }

  public createNewInvoiceTemplate(): void {
    let invoice = {
      administrationId: null,
      name: null,
      description: null,
      templateDataJson: null,
      createdOn: null,
      updatedOn: null,
      version: null,
      invoices: []
    }
    this.editInvoice(invoice);
  }

  public removeInvoiceTemplate(obj:any): void {
    if(!obj.id) return
    this.invoiceTemplateService.delete(obj.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('invoiceDeleted', 'success')
        this.removeId = null;
        this.retrieveAllInvoiceTemplates();
        this.closeDialog();
      } else {
        this.setAlert('invoiceDeleteError', 'error')
      }
    });
  }

  public uploadLogo(logo: any) {
    let self = this;
    let reader = new FileReader();
    reader.onload = function (e) {
      //@ts-ignore
      self.selectedLogo = e.target.result;
    };
    reader.readAsDataURL(logo);
  }

  public onLogoRemove(logo: any) {
    this.selectedLogo = null
  }

  public invoicePreview() {
    setTimeout(function () {
      window.print();
    },200)
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public removeLogo() {
    this.selectedLogo = null;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllInvoiceTemplates();
  }

  public changeOrder(propOrder: any): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
  }

  public closeDialog(): void {
    //@ts-ignore
    $(this.$refs.removeInvoice).modal('hide');
  }

  public updateUnpaidInfo(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.paymentInfoUnpaid, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.$set(this.invoiceTemplateData.paymentInfoUnpaid, index, data);
    } else {

    }
  }

  public addNewUnpaidInfo(lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.invoiceTemplateData.paymentInfoUnpaid.push(newLang)
  }

  public removeUnpaidInfo(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.paymentInfoUnpaid, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.invoiceTemplateData.paymentInfoUnpaid.splice(index, 1);
    }
  }

  public updatePaidInfo(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.paymentInfoPaid, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.$set(this.invoiceTemplateData.paymentInfoPaid, index, data);
    }
  }

  public addNewPaidInfo(lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.invoiceTemplateData.paymentInfoPaid.push(newLang)
  }

  public removePaidInfo(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.paymentInfoPaid, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.invoiceTemplateData.paymentInfoPaid.splice(index, 1);
    }
  }

  public updateUnpaidIncasso(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.unpaidIncassoLine, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.$set(this.invoiceTemplateData.unpaidIncassoLine, index, data);
    }
  }

  public addNewUnpaidIncasso(lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.invoiceTemplateData.unpaidIncassoLine.push(newLang)
  }

  public removeUnpaidIncasso(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.unpaidIncassoLine, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.invoiceTemplateData.unpaidIncassoLine.splice(index, 1);
    }
  }
public updateExtraFooter(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.extraFooter, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.$set(this.invoiceTemplateData.extraFooter, index, data);
    }
  }

  public addNewExtraFooter(lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.invoiceTemplateData.extraFooter.push(newLang)
  }

  public removeExtraFooter(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.extraFooter, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.invoiceTemplateData.extraFooter.splice(index, 1);
    }
  }
public updateExtraHeader(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.extraHeader, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.$set(this.invoiceTemplateData.extraHeader, index, data);
    }
  }

  public addNewExtraHeader(lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.invoiceTemplateData.extraHeader.push(newLang)
  }

  public removeExtraHeader(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.extraHeader, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.invoiceTemplateData.extraHeader.splice(index, 1);
    }
  }

  public updateUnpaidBank(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.unpaidBankTransferLine, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.$set(this.invoiceTemplateData.unpaidBankTransferLine, index, data);
    }
  }

  public addNewUnpaidBank(lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.invoiceTemplateData.unpaidBankTransferLine.push(newLang)
  }

  public removeUnpaidBank(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.unpaidBankTransferLine, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.invoiceTemplateData.unpaidBankTransferLine.splice(index, 1);
    }
  }


  public updateSmallFooter(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.paymentInfoSmallFooter, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.$set(this.invoiceTemplateData.paymentInfoSmallFooter, index, data);
    }
  }

  public addNewSmallFooter(lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.invoiceTemplateData.paymentInfoSmallFooter.push(newLang)
  }

  public removeSmallFooter(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.paymentInfoSmallFooter, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.invoiceTemplateData.paymentInfoSmallFooter.splice(index, 1);
    }
  }

  public updateSmallHeader(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.paymentInfoSmallHeader, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.$set(this.invoiceTemplateData.paymentInfoSmallHeader, index, data);
    }
  }

  public addNewSmallHeader(lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.invoiceTemplateData.paymentInfoSmallHeader.push(newLang)
  }

  public removeSmallHeader(data: any) {
    let index = null;
    $.each(this.invoiceTemplateData.paymentInfoSmallHeader, function (k, v) {
      if (v.langKey === data.langKey) {
        index = k;
      }
    });
    if (index) {
      this.invoiceTemplateData.paymentInfoSmallHeader.splice(index, 1);
    }
  }

  public countryChanged(country: any) {
    this.invoiceTemplateData.selectedCountry = country;
  }

  public removeCountry(country: any) {
    this.invoiceTemplateData.selectedCountry = null;
  }

  public updateInvoiceEmailContent(content: any) {
    this.invoiceTemplateData.invoiceEmailContent = content;
  }

  public changeFont(font: any) {
    this.invoiceTemplateData.fontName = font.fontName;
    this.invoiceTemplateData.fontUrl = font.fontUrl;
  }
}
