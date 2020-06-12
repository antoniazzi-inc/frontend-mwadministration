import BaseEntityService from './baseEntityService';
import {IPaymentMethod} from "@/shared/models/payment-method.model";
import axios, {AxiosResponse} from 'axios'
export default class  productpaymentmethodsService extends BaseEntityService<IPaymentMethod> {
    private static instance: productpaymentmethodsService;

    private constructor() {
        super('api/productms/api/product-payment-methods')
    }

    public static getInstance(): productpaymentmethodsService {
        if (!productpaymentmethodsService.instance) {
            return new productpaymentmethodsService()
        }
        return productpaymentmethodsService.instance
    }

    public createMultiple(entity:any){
      return new Promise((resolve, reject) => {
        axios.post('api/productms/api/product-payment-methods/multiple', entity).then((resp:AxiosResponse) => {
          if(resp.data){
            resolve(resp)
          }
        }).catch(e=>{
          reject(e)
        })
      })
    }
}
