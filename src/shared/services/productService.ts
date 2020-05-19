import BaseEntityService from '@/shared/services/baseEntityService'
import {IProduct} from "@/shared/models/productModel";

export default class ProductService extends BaseEntityService<IProduct> {
  private static instance: ProductService;

  private constructor () {
    super('api/productms/api/products')
  }

  public static getInstance (): ProductService {
    if (!ProductService.instance) {
      return new ProductService()
    }
    return ProductService.instance
  }
}
