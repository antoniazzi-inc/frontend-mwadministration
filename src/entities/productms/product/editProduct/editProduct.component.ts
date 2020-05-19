import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue } from 'vue-property-decorator'
import { IRelationEntity, RelationEntity } from '@/shared/models/relationModel'
import RelationService from '@/shared/services/relationService'
import { AxiosResponse } from 'axios'
import gravatarImg from 'vue-gravatar'
import RelationEditTabsComponent from '@/entities/relationms/relation/editRelation/tabs/relationEditTabs.vue'

@Component({
  components: {
    'v-gravatar': gravatarImg,
    RelationEditTabsComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  },
  props: {
    asd: [Promise, Number, String, Boolean]
  }
})
export default class EditProductComponent extends mixins(Vue, CommonHelpers) {
  public relation: any;
  public relationService: any;

  constructor () {
    super()
    this.relation = new RelationEntity()
    this.relationService = RelationService.getInstance()
  }

  public retrieveItem (id: number) {
    this.relationService.get(id).then((resp: AxiosResponse) => {
      this.relation = resp.data
    })
  }

  public updateRelation (rel: IRelationEntity) {
    if (rel && rel.id) {
      this.retrieveItem(rel.id)
    } else {
      this.retrieveItem(this.relation.id)
    }
  }

  public getFullName () {
    return this.getRelationFullName(this.relation)
  }

  public editRelationProfile () {
    // @ts-ignore
    this.$refs.editTabs.changeTabs('profile', 'general')
  }

  public editRelationGroups () {
    // @ts-ignore
    this.$refs.editTabs.changeTabs('profile', 'groups')
  }

  public getCategoryName () {
    let result = ''
    if (this.relation.relationProfile && this.relation.relationProfile.categoryId) {
      this.$store.state.lookups.categories.forEach((cat: any) => {
        if (cat.id === this.relation.relationProfile.categoryId) {
          result = cat.code
        }
      })
    }
    return result
  }
}
