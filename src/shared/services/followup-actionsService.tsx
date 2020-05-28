import BaseEntityService from './baseEntityService';
import {IFollowupAction} from "@/shared/models/FollowupActionModel";

export default class  followupactionsService extends BaseEntityService<IFollowupAction> {
    private static instance: followupactionsService;

    private constructor() {
        super('api/productms/api/followup-actions')
    }

    public static getInstance(): followupactionsService {
        if (!followupactionsService.instance) {
            return new followupactionsService()
        }
        return followupactionsService.instance
    }
}
