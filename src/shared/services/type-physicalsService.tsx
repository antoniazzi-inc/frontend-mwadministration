import BaseEntityService from './baseEntityService';
import {ITypePhysical} from "@/shared/models/TypePhysicalModel";

export default class  typephysicalsService extends BaseEntityService<ITypePhysical> {
    private static instance: typephysicalsService;

    private constructor() {
        super('/api/productms//api/type-physicals')
    }

    public static getInstance(): typephysicalsService {
        if (!typephysicalsService.instance) {
            return new typephysicalsService()
        }
        return typephysicalsService.instance
    }
}
