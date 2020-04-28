import { Component, Vue } from 'vue-property-decorator'
import RelationService from '@/shared/services/relationService'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import {AxiosResponse} from "axios";
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import SimpleSearchComponent from "@/components/simpleSearch/simpleSearch.vue";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";

@Component({
  components: {
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent,
    SearchableSelectComponent
  }
})
export default class RelationComponent extends mixins(CommonHelpers, Vue) {
  public relationService: any
  public searchableTagsConfig: ISearchableSelectConfig
  public searchableCatsConfig: ISearchableSelectConfig
  public searchableGroupsConfig: ISearchableSelectConfig
  public currentSearchName: string
  public currentSearchEmail: string
  public currentSearchGroups: any[]
  public currentSearchTags: any[]
  public selectedTags: any[]
  public selectedGroups: any[]
  public selectedCategories: any
  public currentSearchCategory: string
  public active: boolean
  constructor () {
    super()
    this.searchableTagsConfig = new SearchableSelectConfig('code',
      'labels.selectTags', '', false,
      false, true, true, false)
    this.searchableCatsConfig = new SearchableSelectConfig('code',
      'labels.selectCategory', '', false,
      false, true, true, false)
    this.searchableGroupsConfig = new SearchableSelectConfig('name',
      'labels.selectGroups', '', false,
      false, true, false, false)
    this.currentSearchName = ''
    this.currentSearchEmail = ''
    this.currentSearchTags = []
    this.currentSearchGroups = []
    this.selectedTags = []
    this.currentSearchCategory = ''
    this.selectedGroups = []
    this.selectedCategories = null
    this.active = true
    this.relationService = RelationService.getInstance()
  }

  public simpleSearch () {
    let queryArray:any = [];
    if (this.currentSearchName !== '') {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'relationProfile.firstName',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }, {
          key: 'relationProfile.lastName',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }, {
          key: 'relationProfile.middleName',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      });
    }
    if (this.currentSearchEmail !== '') {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'email',
          value: this.currentSearchEmail,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      });
    }
    if (this.currentSearchGroups.length > 0) {
      let groups:any = [];
      $.each(this.currentSearchGroups, function (k, v) {
        groups.push(v.id);
      });
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'relationGroups.id',
          value: groups.join(),
          inBetweenOperator: '=in=',
          afterOperator: '',
          exactSearch: false
        }]
      });
    }
    if (this.currentSearchCategory !== '') {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'relationProfile.categoryId',
          value: this.currentSearchCategory,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      });
    }
    if (this.currentSearchTags.length > 0) {
      let tags:any = [];
      $.each(this.currentSearchTags, function (k, v) {
        tags.push(v.id);
      });
      queryArray.push({
        mainOperator: '',
        children: [{
          key: 'relationProfile.categoryId',
          value: tags.join(),
          inBetweenOperator: '=in=',
          afterOperator: '',
          exactSearch: false
        }]
      });
    }
    let finalQ = this.queryBuilder(queryArray);
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/relationms/api/relations', undefined, finalQ);
  }
  public clear () {
    this.currentSearchEmail = '';
    this.currentSearchName = '';
    this.currentSearchTags = [];
    this.selectedTags = []
    this.currentSearchCategory = '';
    this.selectedCategories = null;
    this.currentSearchGroups = [];
    this.selectedGroups = [];
    //@ts-ignore
    this.$refs.paginationTable.retrieveData('api/relationms/api/relations', undefined, undefined);
  }
  public editRelation (rel: any) {
    this.$router.push({ name: 'EditRelations', params: { id: rel.id } })
  }

  public deleteRelation (rel: any) {
    this.active = false
    if(rel.id) this.relationService.delete(rel.id).then((resp:AxiosResponse)=>{
      this.active = true
      if(resp){
        this.setAlert('relationRemoved', 'success')
      } else {
        this.setAlert('relationRemoveError', 'error')
      }
    })
  }
  public tagSearchChanged(tag:any) {
    this.currentSearchTags.push(tag)
  }

  public tagSearchRemoved(tag:any) {
    let index = null;
    $.each(this.currentSearchTags, function (k, v) {
      if (v.id === tag.id) {
        index = k;
      }
    });
    if (index !== null) {
      this.currentSearchTags.splice(index, 1);
    }
  }

  public groupSearchChanged(group:any) {
    this.currentSearchGroups.push(group);
  }

  public groupSearchRemoved(group:any) {
    let index = null;
    $.each(this.currentSearchGroups, function (k, v) {
      if (v.id === group.id) {
        index = k;
      }
    });
    if (index !== null) {
      this.currentSearchGroups.splice(index, 1);
    }
  }

  public categorySearchChanged(category:any) {
    this.selectedCategories = category;
    this.currentSearchCategory += category.id
  }

  public categorySearchRemoved() {
    this.selectedCategories = {};
    this.currentSearchCategory = '';
  }
}
