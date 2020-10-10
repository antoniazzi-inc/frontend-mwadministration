import BaseEntityService from '@/shared/services/baseEntityService'
import {IComplexSearch} from "@/shared/models/complexSearchModel";
import axios from "axios";

export default class ComplexSearchService extends BaseEntityService<IComplexSearch> {
  private static instance: ComplexSearchService;

  private constructor () {
    super('api/')
  }

  public static getInstance (): ComplexSearchService {
    if (!ComplexSearchService.instance) {
      return new ComplexSearchService()
    }
    return ComplexSearchService.instance
  }

  public searchRelations(url:any, query:any){
    return new Promise(resolve => {
      axios.post(url, query).then(function (res) {
        resolve(res.data)
      })
    })
  }
}
