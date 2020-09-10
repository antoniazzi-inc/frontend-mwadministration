import { Component, Vue } from 'vue-property-decorator'
import {SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";

@Component({
  components: {
  }
})
export default class HomeDashboardComponent extends Vue {
  public showHelp: boolean;

  constructor () {
    super()
    this.showHelp = false
  }
}
