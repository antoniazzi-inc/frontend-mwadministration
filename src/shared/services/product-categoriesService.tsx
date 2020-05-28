import BaseEntityService from './baseEntityService';
import {IProductCategory} from "@/shared/models/ProductCategoryModel";

export default class  productcategoriesService extends BaseEntityService<IProductCategory> {
    private static instance: productcategoriesService;

    private constructor() {
        super('/api/rpductms/api/product-categories')
    }

    public static getInstance(): productcategoriesService {
        if (!productcategoriesService.instance) {
            return new productcategoriesService()
        }
        return productcategoriesService.instance
    }
}
