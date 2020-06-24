import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { ITermsAndConditions } from './TermsAndConditionsModel'
import { IPayButton } from './PayButtonModel'
import { IProductSubscription } from './ProductSubscriptionModel'
import { IFollowupAction } from './FollowupActionModel'
import { ITypeDigital } from './TypeDigitalModel'
import { ITypePhysical } from './TypePhysicalModel'
import { ITypeService } from './TypeServiceModel'
import { ITypeCourse } from './TypeCourseModel'
import { IAttribute } from './AttributeModel'
import { IPaymentSchedule } from './PaymentScheduleModel'
import { IProductCategory } from './ProductCategoryModel'
import { IProductDeliveryMethod } from './ProductDeliveryMethodModel'
import { IProductPaymentMethod } from './ProductPaymentMethodModel'
import { IProductLanguage } from './ProductLanguageModel'
import { IMedia } from './MediaModel'
import { IPromotion } from './PromotionModel'
export const enum productType {
    COURSE = 'COURSE',
    DIGITAL = 'DIGITAL',
    PHYSICAL = 'PHYSICAL',
    SERVICE = 'SERVICE',
    VOUCHER = 'VOUCHER',
}

export interface IProduct extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    sku?: string;
    points?: number;
    price?: number;
    tax?: number;
    availableFrom?: Moment;
    availableTo?: Moment;
    stock?: number;
    archived?: boolean;
    termsAndConditionsJson?: ITermsAndConditions;
    comingSoon?: boolean;
    forceDirectPayment?: boolean;
    featuredImageId?: number;
    announcementMailJson?: string;
    ledgerAccountName?: string;
    payButtonJson?: IPayButton;
    euTax?: boolean;
    taxLevel?: number;
    availableForAffiliates?: boolean;
    userDefinedPrice?: boolean;
    quickCheckout?: boolean;
    priceRounding?: boolean;
    salesPageUrl?: string;
    registrationSettingsJson?: string;
    thankYouPageSettingsJson?: string;
    upsellSettingsJson?: string;
    affiliateSalesInfoJson?: string;
    generalFlatCommission?: number;
    generalPercentageCommission?: number;
    invoiceTemplateId?: number;
    productType?: productType;
    productSubscription?: IProductSubscription;
    followupAction?: IFollowupAction;
    typeDigital?: ITypeDigital;
    typePhysical?: ITypePhysical;
    typeService?: ITypeService;
    typeCourse?: ITypeCourse;
    attributes?: IAttribute[];
    paymentSchedules?: IPaymentSchedule[];
    productCategories?: IProductCategory[];
    productDeliveryMethods?: IProductDeliveryMethod[];
    productPaymentMethods?: IProductPaymentMethod[];
    productLanguages?: IProductLanguage[];
    media?: IMedia[];
    promotions?: IPromotion[];
}

export class Product implements IProduct {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public sku?: string,
    public productType?: productType,
    public points?: number,
    public price?: number,
    public tax?: number,
    public availableFrom?: Moment,
    public availableTo?: Moment,
    public stock?: number,
    public archived?: boolean,
    public termsAndConditionsJson?: ITermsAndConditions,
    public comingSoon?: boolean,
    public forceDirectPayment?: boolean,
    public featuredImageId?: number,
    public announcementMailJson?: string,
    public ledgerAccountName?: string,
    public payButtonJson?: IPayButton,
    public euTax?: boolean,
    public taxLevel?: number,
    public availableForAffiliates?: boolean,
    public userDefinedPrice?: boolean,
    public quickCheckout?: boolean,
    public priceRounding?: boolean,
    public salesPageUrl?: string,
    public registrationSettingsJson?: string,
    public thankYouPageSettingsJson?: string,
    public upsellSettingsJson?: string,
    public affiliateSalesInfoJson?: string,
    public generalFlatCommission?: number,
    public generalPercentageCommission?: number,
    public invoiceTemplateId?: number,
    public productSubscription?: IProductSubscription,
    public followupAction?: IFollowupAction,
    public typeDigital?: ITypeDigital,
    public typePhysical?: ITypePhysical,
    public typeService?: ITypeService,
    public typeCourse?: ITypeCourse,
    public attributes?: IAttribute[],
    public paymentSchedules?: IPaymentSchedule[],
    public productCategories?: IProductCategory[],
    public productDeliveryMethods?: IProductDeliveryMethod[],
    public productPaymentMethods?: IProductPaymentMethod[],
    public productLanguages?: IProductLanguage[],
    public media?: IMedia[],
    public promotions?: IPromotion[],
  ){
  }
};
