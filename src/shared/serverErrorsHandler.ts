import { Vue } from 'vue-property-decorator'

export default class ServerErrorsHandler extends Vue {
  public handleError (err: any) {
    if (err && err.status === 401) {
      // window.location.href = '/login'
    }
  }
}
