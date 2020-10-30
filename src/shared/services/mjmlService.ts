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

  public renderTemplate (entity: any) {
    return new Promise((resolve, reject) => {
      const token ='1a336b03-7c52-49a5-9f5f-b669dbf13c06:dfd53576-0500-4694-904f-1b8b526ac1ee'
      axios.post('/api/mjml', { mjml: entity }, {headers:{
        'Authorization': 'Basic ' + token,
          'sec-fetch-mode': 'no-cors',
          'Sec-Fetch-Site': 'none',
          'Access-Control-Allow-Credentials': 'true'
        }}).then(resp => {
        resolve(resp)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
