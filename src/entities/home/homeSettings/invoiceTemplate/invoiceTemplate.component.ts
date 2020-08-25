import {mixins} from 'vue-class-component';
import {Component, Inject, Vue} from 'vue-property-decorator';
import UploadWidget from "@/components/uploadWidget/upload-widget.vue";
import JhiMultiLanguageComponent from "@/components/multiLanguage/multiLanguage.vue";
import SearchableSingleSelectComponent from "@/components/searchableSelect/searchableSingleSelect.vue";
import MultiLangHtmlEditorComponent from "@/components/multiLangHtmlEditor/multiLangHtmlEditor.vue";
import {Fonts} from '@/shared/fonts';
import CommonHelpers from "@/shared/commonHelpers";
import {IInvoiceTemplate} from "@/shared/models/orderms/InvoiceTemplateModel";
import InvoiceTemplatesService from "@/shared/services/orderms/InvoiceTemplatesService";
import {AxiosResponse} from "axios";

@Component({
    components: {
        /*'jhi-multi-language': JhiMultiLanguageComponent,
        'upload-widget': UploadWidget,
        'single-select': SearchableSingleSelectComponent,
        'MultiLangHtmlEditorComponent': MultiLangHtmlEditorComponent*/
    },
    mounted(){

    }
})
export default class InvoiceTemplate extends mixins(CommonHelpers, Vue) {
    public itemsPerPage: number;
    public queryCount: number|any;
    public page: number;
    public previousPage: number|any;
    public invoiceTemplateTabIndex: number;
    public propOrder: string;
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
    public multiLangConfigPaymentInfo: any;
    public multiLangConfigPaymentInfoPaid: any;
    public multiLangConfigPaymentInfoFooter: any;
    public multiLangConfigPaymentInfoHeader: any;
    public invoiceTemplates: IInvoiceTemplate[];
    public invoiceToEdit: IInvoiceTemplate|any;
    public countriesConfig = {
        required: true,
        trackBy: 'enName',
        placeholder: 'selectCountry',
        allowEmpty: true
    }
    public invoiceTemplateService:any
    private removeId: string|any;
    private templateNameSearch: string;

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
        this.multiLangConfigPaymentInfo = {
            showName: false,
            showDescription: true,
            nameLabel: '',
            descriptionLabel: 'vueadminApp.administrationmsPaymentMethod.unpaidBottom',
            requiredName: false,
            requiredDescription: false,
            enableUndoBtn: false,
            enableRemoveBtn: false,
            enableSaveBtn: false,
            showLangs: true
        };
        this.multiLangConfigPaymentInfoPaid = {
            showName: false,
            showDescription: true,
            nameLabel: '',
            descriptionLabel: 'vueadminApp.administrationmsPaymentMethod.paidBottom',
            requiredName: false,
            requiredDescription: false,
            enableUndoBtn: false,
            enableRemoveBtn: false,
            enableSaveBtn: false,
            showLangs: true
        };
        this.multiLangConfigPaymentInfoFooter = {
            showName: false,
            showDescription: true,
            nameLabel: '',
            descriptionLabel: 'vueadminApp.administrationmsPaymentMethod.smallFooter',
            requiredName: false,
            requiredDescription: false,
            enableUndoBtn: false,
            enableRemoveBtn: false,
            enableSaveBtn: false,
            showLangs: true
        };
        this.multiLangConfigPaymentInfoHeader = {
            showName: false,
            showDescription: true,
            nameLabel: '',
            descriptionLabel: 'vueadminApp.administrationmsPaymentMethod.smallHeader',
            requiredName: false,
            requiredDescription: false,
            enableUndoBtn: false,
            enableRemoveBtn: false,
            enableSaveBtn: false,
            showLangs: true
        };
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
            paymentInfoSmallFooter: [],
            selectedCountry: null,
            invoiceEmailContent: {},
            fontName: '',
            fontUrl: '',
        };
        this.errorInvoiceTemplate = '';
        this.currentSearch = '';
        this.reverse = false;
        this.totalItems = 0;
        this.invoiceTemplateTabIndex = 0;
        this.removeId = null;
        this.invoiceToEdit = null;
    }

    public mounted(): void {
        this.retrieveAllInvoiceTemplates();
    }

    public search() {

    }

    public closeInvoiceDialog() {
        (<any>this.$refs.createEntityInvoiceTemplate).hide();
    }

    public saveInvoiceTemplate() {
        this.validateInvoiceTemplate().then(resp => {
            //@ts-ignore
            if (resp.valid) {
                this.invoiceToEdit.templateDataJson = JSON.stringify(this.invoiceTemplateData);
                this.invoiceToEdit.name = this.invoiceTemplateData.invoiceName;
                this.invoiceToEdit.description = this.invoiceTemplateData.invoiceDescription;
                if (this.invoiceToEdit.id) {
                    this.invoiceTemplateService().update(this.invoiceToEdit).then((resp:AxiosResponse) => {
                        //@ts-ignore
                        this.$vueOnToast.pop('success', this.$t('ordermsApp.ordermsInvoice.updated'));
                        this.closeInvoiceDialog();
                        this.retrieveAllInvoiceTemplates();
                    });
                } else {
                    this.invoiceTemplateService().create(this.invoiceToEdit).then((resp:AxiosResponse) => {
                        //@ts-ignore
                        this.$vueOnToast.pop('success', this.$t('ordermsApp.ordermsInvoice.created'));
                        this.closeInvoiceDialog();
                        this.retrieveAllInvoiceTemplates();
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
                err.errorMessage = 'vueadminApp.administrationmsPaymentMethod.nameRequired';
                err.tabIndex = 0;
                resolve(err);
                return;
            }
            if (self.invoiceTemplateData.companyName) {
                err.valid = true;
            } else {
                err.valid = false;
                err.errorMessage = 'vueadminApp.administrationmsPaymentMethod.companyNameRequired'
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
        const paginationQuery = {
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        };
        this.invoiceTemplateService()
            .retrieve(paginationQuery)
            .then((res:any) => {
                this.invoiceTemplates = res.data;
                this.totalItems = Number(res.headers['x-total-count']);
                this.queryCount = this.totalItems;
            });
        let self = this;
        $.each(Fonts, function (k, v) {
            self.allFonts.push({
                fontName: v.name,
                fontUrl: v.url.eot
            });
        });
    }

    public editInvoice(invoice:any) {
        this.invoiceToEdit = invoice;
        if (invoice.templateDataJson) {
            this.invoiceTemplateData = JSON.parse(invoice.templateDataJson);
        }
        (<any>this.$refs.createEntityInvoiceTemplate).show();
    }

    public prepareRemove(instance:any): void {
        this.removeId = instance.id;
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

    public removeInvoiceTemplate(): void {
        this.invoiceTemplateService()
            .delete(this.removeId)
            .then(() => {
                this.removeId = null;
                this.retrieveAllInvoiceTemplates();
                this.closeDialog();
            });
    }

    public uploadLogo(logo:any) {
        let self = this;
        let reader = new FileReader();
        reader.onload = function (e) {
            //@ts-ignore
            self.selectedLogo = e.target.result;
        };
        reader.readAsDataURL(logo[0].file);
    }
    public invoicePreview() {
        this.$emit('update');
    }
    public sort(): Array<any> {
        const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.propOrder !== 'id') {
            result.push('id');
        }
        return result;
    }
    public removeLogo(){
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

    public changeOrder(propOrder:any): void {
        this.propOrder = propOrder;
        this.reverse = !this.reverse;
    }

    public closeDialog(): void {
        (<any>this.$refs.removeEntity).hide();
    }

    public updateUnpaidInfo(data:any) {
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

    public addNewUnpaidInfo(data:any) {
        let index = null;
        $.each(this.invoiceTemplateData.paymentInfoUnpaid, function (k, v) {
            if (v.langKey === data.langKey) {
                index = k;
            }
        });
        if (index) {
            this.invoiceTemplateData.paymentInfoUnpaid[index] = data
        } else {
            this.invoiceTemplateData.paymentInfoUnpaid.push(data)
        }
    }

    public removeUnpaidInfo(data:any) {
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

    public updatePaidInfo(data:any) {
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

    public addNewPaidInfo(data:any) {
        let index = null;
        $.each(this.invoiceTemplateData.paymentInfoPaid, function (k, v) {
            if (v.langKey === data.langKey) {
                index = k;
            }
        });
        if (index) {
            this.$set(this.invoiceTemplateData.paymentInfoPaid, index, data);
        } else {
            this.invoiceTemplateData.paymentInfoPaid.push(data)
        }
    }

    public removePaidInfo(data:any) {
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

    public updateSmallFooter(data:any) {
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

    public addNewSmallFooter(data:any) {
        let index = null;
        $.each(this.invoiceTemplateData.paymentInfoSmallFooter, function (k, v) {
            if (v.langKey === data.langKey) {
                index = k;
            }
        });
        if (index) {
            this.$set(this.invoiceTemplateData.paymentInfoSmallFooter, index, data);
        } else {
            this.invoiceTemplateData.paymentInfoSmallFooter.push(data)
        }
    }

    public removeSmallFooter(data:any) {
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
    public updateSmallHeader(data:any) {
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

    public addNewSmallHeader(data:any) {
        let index = null;
        $.each(this.invoiceTemplateData.paymentInfoSmallHeader, function (k, v) {
            if (v.langKey === data.langKey) {
                index = k;
            }
        });
        if (index) {
            this.$set(this.invoiceTemplateData.paymentInfoSmallHeader, index, data);
        } else {
            this.invoiceTemplateData.paymentInfoSmallHeader.push(data)
        }
    }

    public removeSmallHeader(data:any) {
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

    public countryChanged(country:any) {
        this.invoiceTemplateData.selectedCountry = country;
    }

    public removeCountry(country:any) {
        this.invoiceTemplateData.selectedCountry = null;
    }
    public updateInvoiceEmailContent(content:any){
        this.invoiceTemplateData.invoiceEmailContent = content;
    }
    public changeFont(font:any){
        this.invoiceTemplateData.fontName = font.fontName;
        this.invoiceTemplateData.fontUrl = font.fontUrl;
    }
}
