import { Component, Vue } from 'vue-property-decorator'
import AccountComponent from '@/entities/account/accountAndSettings/account/account.vue'
import InvoicesComponent from '@/entities/account/accountAndSettings/invoices/invoices.vue'
import RolesComponent from '@/entities/account/accountAndSettings/roles/roles.vue'
import UsersComponent from '@/entities/account/accountAndSettings/users/users.vue'
import IntegrationsComponent from '@/entities/account/accountAndSettings/integrations/integrations.vue'

@Component({
  components: {
    AccountComponent,
    InvoicesComponent,
    RolesComponent,
    UsersComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.query.tab) {
        vm.switchTab(to.query.tab)
      }
    })
  }
})
export default class AccountAndSettingsComponent extends Vue {
  public currentTab: string

  constructor () {
    super()
    this.currentTab = 'account'
  }

  public switchTab (tab: string) {
    this.currentTab = tab
  }
}
