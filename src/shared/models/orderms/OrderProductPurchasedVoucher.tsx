import {Moment} from 'moment';
import {BaseEntity} from '../baseModel';
import {IOrderLine} from './OrderLineModel'
import {IAffiliateReward} from './AffiliateRewardModel'
import {IOrderProduct} from "@/shared/models/orderms/OrderProductModel";
import PointsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/PointsComplexSearchComponent/PointsComplexSearch.component";
export enum VoucherType {
  MINUTES = 'MINUTES',
  POINTS = 'POINTS',
  MONEY = 'MONEY'
}
export interface IOrderProductPurchasedVoucher extends BaseEntity {
  relationId?: number;
  typeVoucherId?: number;
  beneficiaryRelationId?: number;
  value?: number;
  VoucherType?: VoucherType;
  availableFrom?: Moment;
  availableTo?: Moment;
  OrderProduct?: IOrderProduct;
}

export default class OrderProductPurchasedVoucher implements IOrderProductPurchasedVoucher {
  constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public typeVoucherId?: number,
    public beneficiaryRelationId?: number,
    public value?: number,
    public VoucherType?: VoucherType,
    public availableFrom?: Moment,
    public availableTo?: Moment,
    public OrderProduct?: IOrderProduct
  ) {
  }
};
