import BaseEntityService from './baseEntityService';
import {IMedia} from "@/shared/models/MediaModel";

export default class  mediasService extends BaseEntityService<IMedia> {
    private static instance: mediasService;

    private constructor() {
        super('api/productms/api/medias')
    }

    public static getInstance(): mediasService {
        if (!mediasService.instance) {
            return new mediasService()
        }
        return mediasService.instance
    }
}
