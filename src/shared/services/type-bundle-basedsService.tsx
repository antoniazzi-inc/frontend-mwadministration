import BaseEntityService from './baseEntityService';
import {ITypeBundleBased} from "@/shared/models/TypeBundleBasedModel";

export default class  typebundlebasedsService extends BaseEntityService<ITypeBundleBased> {
    private static instance: typebundlebasedsService;

    private constructor() {
        super('/api/productms/api/type-bundle-baseds')
    }

    public static getInstance(): typebundlebasedsService {
        if (!typebundlebasedsService.instance) {
            return new typebundlebasedsService()
        }
        return typebundlebasedsService.instance
    }
}
