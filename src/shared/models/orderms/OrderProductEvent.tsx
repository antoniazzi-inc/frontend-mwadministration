import {Moment} from 'moment';
import {BaseEntity} from '../baseModel';
import {IOrderLine} from './OrderLineModel'
import {IAffiliateReward} from './AffiliateRewardModel'
import {IOrderProduct} from "@/shared/models/orderms/OrderProductModel";
import PointsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/PointsComplexSearchComponent/PointsComplexSearch.component";
export interface IOrderProductEvent extends BaseEntity {
  relationId?: number;
  eventId?: number;
  courseId?: number;
  eventStart?: Moment;
  eventEnd?: Moment;
  price?: number;
  seats?: number;
}

export default class OrderProductEvent implements IOrderProductEvent {
  constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public eventId?: number,
    public courseId?: number,
    public eventStart?: Moment,
    public eventEnd?: Moment,
    public price?: number,
    public seats?: number,
    public voucherValue?: number
  ) {
  }
};
