import BaseEntityService from './baseEntityService';
import {ICourse} from "@/shared/models/productms/CourseModel";
import axios from 'axios'

export default class  eventReservationService extends BaseEntityService<ICourse> {
    private static instance: eventReservationService;

    private constructor() {
        super('api/productms/api/event-reservations')
    }

    public static getInstance(): eventReservationService {
        if (!eventReservationService.instance) {
            return new eventReservationService()
        }
        return eventReservationService.instance
    }

    public createMultiple (entity: any) {
      return new Promise(resolve => {
        axios.post('api/productms/api/event-reservations/multiple', entity).then(function(res) {
          resolve(res.data);
        });
      })
    }

    public deleteMultiple (entity: any) {
      return new Promise(resolve => {
        axios.delete('api/productms/api/event-reservations/multiple', entity).then(function(res) {
          resolve(res.data);
        });
      })
    }
}
