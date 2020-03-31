import { Component, Vue } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import Chrome from 'vue-color/src/components/Chrome'
import { CategoryEntity, ICategoryEntity } from '@/shared/models/categoryModel'
import CategoryService from '@/shared/services/categoryService'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'

/* eslint-disable */
@Component({
  props: {
    active: {
      type: Boolean
    }
  },
  components: {
    PaginationTableComponent,
    'chrome-picker': Chrome,
    'simple-search': SimpleSearchComponent
  }
})
export default class CategoriesComponent extends mixins(CommonHelpers, Vue) {
  $refs!: {
    paginationTable: PaginationTableComponent,
    categoryModal: HTMLElement
  }
  public categoryService = CategoryService.getInstance();
  public category: any;
  public colors: any;

  constructor() {
    super();
    this.category = new CategoryEntity();
    this.colors = []

  }
  public mounted(){
    const self = this
    $(this.$refs.categoryModal).on('shown.bs.modal', function (e:any) {
      self.doFocus()
    })
  }
  public resetCategory() {
    this.category = new CategoryEntity()
  }
  public searchCategory(query: string) {
    let fields:string[] = ['code']
    let q:string = this.makeSimpleSearchQuery(fields ,query)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/administrationms/api/categories', undefined, q);
  }

  public doFocus() {
    let self = this;
    setTimeout(function () {
      //@ts-ignore
      self.$refs.categoryCode.focus();
    }, 200);
  }

  public updateColor(color: any) {
    this.category.color = color.hex;
  }

  public saveCategory() {
    this.$validator.validateAll().then(success => {
      if(success){
        if (this.category.code !== '') {
          if(this.category.id){
            this.categoryService.put(this.category).then(resp => {
              if (resp) {
                this.setAlert('categoryUpdated', 'success')
              } else {
                this.setAlert('categoryError', 'error')
              }
              this.closeModal();
            })
          } else {
            this.categoryService.post(this.category).then(resp => {
              if (resp) {
                this.setAlert('categorySaved', 'success')
              } else {
                this.setAlert('categoryError', 'error')
              }
              this.closeModal();
            })
          }
        }
      }
    })

  }
  public closeModal(){
    //@ts-ignore
    this.$refs.paginationTable.retrieveData()
    //@ts-ignore
    $(this.$refs.categoryModal).modal('hide')
  }
  public showModal(){
    //@ts-ignore
    $(this.$refs.categoryModal).modal('show')
  }

  public deleteCategory(cat:ICategoryEntity) {
    if(cat.id){
      this.categoryService.delete(cat.id).then(resp => {
        if (resp) {
          this.setAlert('categoryDeleted', 'success')
        } else {
          this.setAlert('categoryError', 'error')
        }
        // @ts-ignore
        this.$refs.paginationTable.retrieveData();
      })
    }
  }
  public editCategory(cat:ICategoryEntity) {
    this.category = cat;
    this.showModal();
  }
  public copyCategory(cat:ICategoryEntity) {
    this.category = cat;
    this.category.id = undefined
    this.category.code = cat.code + ' ' + this.$t('labels.copy')
    this.saveCategory();
  }
}
