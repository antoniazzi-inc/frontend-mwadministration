import BaseEntityService from './baseEntityService';
import {IAttributeValue} from "@/shared/models/AttributeValueModel";
import axios, {AxiosResponse} from 'axios'
export default class  attributevaluesService extends BaseEntityService<IAttributeValue> {
    private static instance: attributevaluesService;

    private constructor() {
        super('/api/productms/api/attribute-values')
    }

    public static getInstance(): attributevaluesService {
        if (!attributevaluesService.instance) {
            return new attributevaluesService()
        }
        return attributevaluesService.instance
    }

    public updateMultiple(entity:any){
      return new Promise((resolve, reject) => {
        axios.put('/api/productms/api/attribute-values/multiple', entity).then((resp:AxiosResponse)=>{
          if(resp.data) {
            resolve(resp)
          }
        }).catch(e=>{
          reject(e)
        })
      })
    }
}
