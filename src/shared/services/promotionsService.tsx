import BaseEntityService from './baseEntityService';
import {IPromotion} from "@/shared/models/PromotionModel";
import axios, {AxiosResponse} from 'axios'

export default class promotionsService extends BaseEntityService<IPromotion> {
  private static instance: promotionsService;

  private constructor() {
    super('api/productms/api/promotions')
  }

  public static getInstance(): promotionsService {
    if (!promotionsService.instance) {
      return new promotionsService()
    }
    return promotionsService.instance
  }

  public assign(entity: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>(resolve => {
      axios.post('productms/api/promotions/' + entity.promotionId + '/assign', entity.req).then(function (res:AxiosResponse) {
        resolve(res);
      });
    });
  }

  public removeProducts(entity: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>(resolve => {
      axios.delete('productms/api/promotions/' + entity.promotionId + '/remove', {data: entity.req}).then(function (res:AxiosResponse) {
        resolve(res);
      });
    });
  }
}
