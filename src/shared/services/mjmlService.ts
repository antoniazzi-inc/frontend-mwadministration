import axios from 'axios'
export default class MjmlService {
  private static instance: MjmlService;

  private constructor () {
  }

  public static getInstance (): MjmlService {
    if (!MjmlService.instance) {
      return new MjmlService()
    }
    return MjmlService.instance
  }

  public renderTemplate(entity: any){
    return new Promise((resolve, reject) => {
      axios.post('/render',  {mjml: entity}).then(resp=>{
        resolve(resp)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}
