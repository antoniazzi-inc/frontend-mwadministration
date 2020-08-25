import BaseEntityService from '@/shared/services/baseEntityService'
import { IProduct } from '@/shared/models/productms/ProductModel'
import axios from 'axios'
export default class ProductService extends BaseEntityService<IProduct> {
  private static instance: ProductService;

  private constructor () {
    super('/api/productms/api/products')
  }

  public static getInstance (): ProductService {
    if (!ProductService.instance) {
      return new ProductService()
    }
    return ProductService.instance
  }

  public createOnBucket (entity: any) {
    return new Promise(resolve => {
      axios.post('api/productms/api/products/'+entity.id+'/media', entity.params).then(function(res) {
        resolve(res.data);
      });
    })
  }

  public updateOnBucket (obj: any) {
    return new Promise(resolve => {
      resolve(true)
    })
  }

  public deleteFromBucket (obj: any) {
    return new Promise(resolve => {
      resolve(true)
    })
  }

  public searchMedia (pagination: any, q: any) {
    return new Promise(resolve => {
      resolve(true)
    })
  }

  public loadAllMedia (pagination: any) {
    return new Promise(resolve => {
      resolve(true)
    })
  }

  public updateTermsAndConditions (entity: any) {
    return new Promise(resolve => {
      resolve(true)
    })
  }

  public updatePayButton (entity: any) {
    return new Promise(resolve => {
      axios.put('api/productms/api/products/' + entity.id + '/pay-button', entity.payButton).then(function (res) {
        resolve(res.data)
      })
    })
  }
}
