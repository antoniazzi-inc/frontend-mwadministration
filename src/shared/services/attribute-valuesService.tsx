import BaseEntityService from './baseEntityService';
import {IAttributeValue} from "@/shared/models/AttributeValueModel";

export default class  attributevaluesService extends BaseEntityService<IAttributeValue> {
    private static instance: attributevaluesService;

    private constructor() {
        super('/api/productms//api/attribute-values')
    }

    public static getInstance(): attributevaluesService {
        if (!attributevaluesService.instance) {
            return new attributevaluesService()
        }
        return attributevaluesService.instance
    }
}
