import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';
import { IInvoice } from './InvoiceModel'
import { ICustomerBillingAddress } from './CustomerBillingAddressModel'
import { ICustomerDeliveryAddress } from './CustomerDeliveryAddressModel'
import { IOrderPaymentMethod } from './OrderPaymentMethodModel'
import { IOrderCustomer } from './OrderCustomerModel'
import { IOrderLine } from './OrderLineModel'
import { IOrderDiscountLine } from './OrderDiscountLineModel'

export interface ICartOrder extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    nettoAmount?: number;
    discountAmount?: number;
    taxAmount?: number;
    paymentMethodCostAmount?: number;
    shippingCostAmount?: number;
    totalAmount?: number;
    currency?: string;
    euroConversionRate?: number;
    relationRequirementJson?: string;
    languageCode?: string;
    finishedOn?: Moment;
    invoice?: IInvoice;
    customerBillingAddress?: ICustomerBillingAddress;
    customerDeliveryAddress?: ICustomerDeliveryAddress;
    orderPaymentMethod?: IOrderPaymentMethod;
    orderCustomer?: IOrderCustomer;
    orderLines?: IOrderLine[];
    orderDiscountLines?: IOrderDiscountLine[];
}

export default class CartOrder implements ICartOrder {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public nettoAmount?: number,
    public discountAmount?: number,
    public taxAmount?: number,
    public paymentMethodCostAmount?: number,
    public shippingCostAmount?: number,
    public totalAmount?: number,
    public currency?: string,
    public euroConversionRate?: number,
    public relationRequirementJson?: string,
    public languageCode?: string,
    public finishedOn?: Moment,
    public invoice?: IInvoice,
    public customerBillingAddress?: ICustomerBillingAddress,
    public customerDeliveryAddress?: ICustomerDeliveryAddress,
    public orderPaymentMethod?: IOrderPaymentMethod,
    public orderCustomer?: IOrderCustomer,
    public orderLines?: IOrderLine[],
    public orderDiscountLines?: IOrderDiscountLine[],
  ){
  }
};
