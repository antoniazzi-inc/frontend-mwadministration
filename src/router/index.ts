import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeDashboard from '@/entities/home/homeDashboard/homeDashbaord.vue'
import LoginComponent from '@/entities/login/login.vue'
import HomeSettingsComponent from '@/entities/home/homeSettings/homeSettings.vue'
import UserProfileComponent from '@/entities/account/userProfile/userProfile.vue'
import NotificationsComponent from '@/entities/account/notifications/notifications.vue'
import AccountAndSettingsComponent from '@/entities/account/accountAndSettings/accountAndSettings.vue'
import TasksComponent from '@/entities/account/tasks/tasks.vue'
import RelationComponent from '@/entities/relationms/relation/relation.vue'
import RelationDashboardComponent from '@/entities/relationms/relationDashbaord/relationDashboard.vue'
import RelationGroupsComponent from '@/entities/relationms/relationGroups/relationGroups.vue'
import RelationImportComponent from '@/entities/relationms/relationImport/relationImport.vue'
import RelationFreeFieldsComponent from '@/entities/relationms/relationFreeFields/relationFreeFields.vue'
import NewUserComponent from '@/entities/account/accountAndSettings/users/newUser.vue'
import NewRoleComponent from '@/entities/account/accountAndSettings/roles/newRole.vue'
import HelpMaterialComponent from '@/entities/administrationms/help/helpMaterials/helpMaterial.vue'
import HelpCategoryComponent from '@/entities/administrationms/help/helpCategory/helpCategory.vue'
import HelpTagComponent from '@/entities/administrationms/help/helpTag/helpTag.vue'
import TaxRateComponent from '@/entities/administrationms/tax/taxRate/taxRate.vue'
import TaxRuleComponent from '@/entities/administrationms/tax/taxRule/taxRule.vue'
import TaxRateLinkComponent from '@/entities/administrationms/tax/taxRateLink/taxRateLink.vue'
import AdministrationsComponent from '@/entities/administrationms/administrations/administrations.vue'
import MigrationsComponent from '@/entities/administrationms/migrations/migrations.vue'
import NewHelpMaterialComponent from '@/entities/administrationms/help/helpMaterials/newHelpMaterial.vue'
import NewHelpCategoryComponent from '@/entities/administrationms/help/helpCategory/newHelpCategory.vue'
import NewHelpTagComponent from '@/entities/administrationms/help/helpTag/newHelpTag.vue'
import NewTaxRateComponent from '@/entities/administrationms/tax/taxRate/newTaxRate.vue'
import NewTaxRuleComponent from '@/entities/administrationms/tax/taxRule/newTaxRule.vue'
import NewTaxRateLinkComponent from '@/entities/administrationms/tax/taxRateLink/newTaxRateLink.vue'
import RegionComponent from '@/entities/administrationms/regions/region.vue'
import NewRegionComponent from '@/entities/administrationms/regions/newRegion.vue'
import NewAdministrationComponent from '@/entities/administrationms/administrations/newAdministration.vue'
import NotFoundComponent from '@/entities/notFound/notFound.vue'
import NewRelationComponent from '@/entities/relationms/relation/newRelation/newRelation.vue'
import EditRelationComponent from '@/entities/relationms/relation/editRelation/editRelation.vue'
import NewRelationFreeFieldsComponent from '@/entities/relationms/relationFreeFields/newRelationFreeField.vue'
import ProductComponent from '@/entities/productms/product/product.vue'
import NewProductComponent from '@/entities/productms/product/newProduct/newProduct.vue'
import EditProductComponent from '@/entities/productms/product/editProduct/editProduct.vue'
import PromotionComponent from "@/entities/productms/promotion/promotion.vue";
import NewPromotionComponent from "@/entities/productms/promotion/newPromotion/newPromotion.vue";
import EditPromotionComponent from "@/entities/productms/promotion/editPromotion/editPromotion.vue";
import CourseComponent from "@/entities/productms/course/course.vue";
import NewCourseComponent from "@/entities/productms/course/newCourse/newCourse.vue";
import OrderComponent from "@/entities/orderms/order/order.vue";
import EditOrderComponent from "@/entities/orderms/order/editOrder/editOrder.vue";
import NewOrderComponent from "@/entities/orderms/order/newOrder/newOrder.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeDash',
    component: HomeDashboard
  }, {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  }, {
    path: '/home/dashboard',
    name: 'HomeDashboard',
    component: HomeDashboard
  }, {
    path: '/home/settings',
    name: 'HomeSettings',
    component: HomeSettingsComponent
  }, {
    path: '/account/user-profile',
    name: 'UserProfile',
    component: UserProfileComponent
  }, {
    path: '/account/notifications',
    name: 'Notifications',
    component: NotificationsComponent
  }, {
    path: '/account/settings',
    name: 'AccountSettings',
    component: AccountAndSettingsComponent
  }, {
    path: '/account/user/new-user',
    name: 'NewUserAccount',
    component: NewUserComponent
  }, {
    path: '/account/user/edit-user/:id',
    name: 'EditUserAccount',
    component: NewUserComponent,
    params: { id: null }
  }, {
    path: '/account/settings/edit-role/:id',
    name: 'EditRoleComponent',
    component: NewRoleComponent,
    params: { id: null }
  }, {
    path: '/account/settings/new-role',
    name: 'NewUserRole',
    component: NewRoleComponent
  }, {
    path: '/account/tasks',
    name: 'AccountTasks',
    component: TasksComponent
  }, {
    path: '/relations',
    name: 'Relations',
    component: RelationComponent
  }, {
    path: '/relations/new',
    name: 'NewRelations',
    component: NewRelationComponent
  }, {
    path: '/relations/edit/:id',
    name: 'EditRelations',
    component: EditRelationComponent,
    params: { id: null },
  }, {
    path: '/relations-dashboard',
    name: 'RelationsDashboard',
    component: RelationDashboardComponent
  }, {
    path: '/relations-groups',
    name: 'RelationsGroups',
    component: RelationGroupsComponent
  }, {
    path: '/relations-import',
    name: 'RelationsImport',
    component: RelationImportComponent
  }, {
    path: '/relations-free-fields',
    name: 'RelationsFreeFields',
    component: RelationFreeFieldsComponent
  }, {
    path: '/relations-free-fields/new',
    name: 'NewRelationsFreeFields',
    component: NewRelationFreeFieldsComponent
  }, {
    path: '/relations-free-fields/new/:id',
    name: 'EditRelationsFreeFields',
    component: NewRelationFreeFieldsComponent,
    params: { id: null }
  }, {
    path: '/relations-reporting',
    name: 'RelationsReporting',
    component: HomeDashboard
  }, {
    path: '/actions-dashboard',
    name: 'ActionsDashboard',
    component: HomeDashboard
  }, {
    path: '/actions-list-managers',
    name: 'ActionsListManagers',
    component: HomeDashboard
  }, {
    path: '/actions-mailings',
    name: 'ActionsMailings',
    component: HomeDashboard
  }, {
    path: '/actions-workflows',
    name: 'ActionsWorkflows',
    component: HomeDashboard
  }, {
    path: '/actions-courses',
    name: 'ActionsCourses',
    component: HomeDashboard
  }, {
    path: '/actions-reporting',
    name: 'ActionsReporting',
    component: HomeDashboard
  }, {
    path: '/content-email-texts',
    name: 'ContentEmailTexts',
    component: HomeDashboard
  }, {
    path: '/content-landing-pages',
    name: 'ContentLandingPages',
    component: HomeDashboard
  }, {
    path: '/content-content-items',
    name: 'ContentItems',
    component: HomeDashboard
  }, {
    path: '/content-content-rules',
    name: 'ContentContentRules',
    component: HomeDashboard
  }, {
    path: '/content-screen-texts',
    name: 'ContentScreenTexts',
    component: HomeDashboard
  }, {
    path: '/products',
    name: 'Products',
    component: ProductComponent
  }, {
    path: '/products/new',
    name: 'newProduct',
    component: NewProductComponent
  }, {
    path: '/products/edit/:id',
    name: 'EditProduct',
    component: EditProductComponent,
    params: { id: null }
  },{
    path: '/courses',
    name: 'Courses',
    component: CourseComponent
  }, {
    path: '/course/new',
    name: 'newCourse',
    component: NewCourseComponent
  }, {
    path: '/course/edit/:id',
    name: 'EditCourse',
    component: NewCourseComponent,
    params: { id: null }
  }, {
    path: '/products-dashboard',
    name: 'ProductsDashboard',
    component: HomeDashboard
  }, {
    path: '/promotions',
    name: 'Promotions',
    component: PromotionComponent
  },{
    path: '/promotions/new',
    name: 'newPromotion',
    component: NewPromotionComponent
  }, {
    path: '/promotions/edit/:id',
    name: 'EditPromotion',
    component: EditPromotionComponent,
    params: { id: null }
  }, {
    path: '/products-shopping-cart-settings',
    name: 'ShoppingCartSettings',
    component: HomeDashboard
  }, {
    path: '/products-shopping-cart-products',
    name: 'ShoppingCartProducts',
    component: HomeDashboard
  }, {
    path: '/orders',
    name: 'Orders',
    component: OrderComponent
  },{
    path: '/orders/edit/:id',
    name: 'EditOrder',
    component: EditOrderComponent,
    params: { id: null }
  },{
    path: '/orders/new',
    name: 'NewOrder',
    component: NewOrderComponent,
    params: { id: null }
  }, {
    path: '/orders-dashboard',
    name: 'OrdersDashboard',
    component: HomeDashboard
  }, {
    path: '/orders-affiliates',
    name: 'OrdersAffiliates',
    component: HomeDashboard
  }, {
    path: '/orders-reporting',
    name: 'OrdersReporting',
    component: HomeDashboard
  }, {
    path: '/maintenance/help-material',
    name: 'HelpMaterial',
    component: HelpMaterialComponent
  }, {
    path: '/maintenance/help-material/new',
    name: 'NewHelpMaterial',
    component: NewHelpMaterialComponent
  }, {
    path: '/maintenance/help-material/edit/:id',
    name: 'EditHelpMaterial',
    component: NewHelpMaterialComponent,
    params: { id: null }
  }, {
    path: '/maintenance/help-category',
    name: 'HelpCategory',
    component: HelpCategoryComponent
  }, {
    path: '/maintenance/help-category/new',
    name: 'NewHelpCategory',
    component: NewHelpCategoryComponent
  }, {
    path: '/maintenance/help-tag',
    name: 'HelpTag',
    component: HelpTagComponent
  }, {
    path: '/maintenance/help-tag/new',
    name: 'NewHelpTag',
    component: NewHelpTagComponent
  }, {
    path: '/maintenance/help-tag/edit/:id',
    name: 'EditHelpTag',
    component: NewHelpTagComponent,
    props: { id: null }
  }, {
    path: '/maintenance/help-category/edit/:id',
    name: 'EditHelpCategory',
    component: NewHelpCategoryComponent,
    props: { id: null }
  }, {
    path: '/maintenance/tax-rate',
    name: 'TaxRate',
    component: TaxRateComponent
  }, {
    path: '/maintenance/tax-rate/new',
    name: 'NewTaxRate',
    component: NewTaxRateComponent
  }, {
    path: '/maintenance/tax-rate/edit/:id',
    name: 'EditTaxRate',
    component: NewTaxRateComponent,
    params: { id: null }
  }, {
    path: '/maintenance/tax-rule',
    name: 'TaxRule',
    component: TaxRuleComponent
  }, {
    path: '/maintenance/tax-rule/new',
    name: 'NewTaxRule',
    component: NewTaxRuleComponent
  }, {
    path: '/maintenance/tax-rule/edit/:id',
    name: 'EditTaxRule',
    component: NewTaxRuleComponent,
    params: { id: null }
  }, {
    path: '/maintenance/tax-rate-link',
    name: 'TaxRateLink',
    component: TaxRateLinkComponent
  }, {
    path: '/maintenance/tax-rate-link/new',
    name: 'NewTaxRateLink',
    component: NewTaxRateLinkComponent
  }, {
    path: '/maintenance/tax-rate-link/edit/:id',
    name: 'EditTaxRateLink',
    component: NewTaxRateLinkComponent,
    params: { id: null }
  }, {
    path: '/maintenance/regions',
    name: 'Regions',
    component: RegionComponent
  }, {
    path: '/maintenance/regions/new',
    name: 'NewRegion',
    component: NewRegionComponent
  }, {
    path: '/maintenance/regions/edit/:id',
    name: 'EditRegion',
    component: NewRegionComponent,
    params: { id: null }
  }, {
    path: '/maintenance/administrations',
    name: 'Administrations',
    component: AdministrationsComponent
  }, {
    path: '/maintenance/administrations/new',
    name: 'NewAdministration',
    component: NewAdministrationComponent
  }, {
    path: '/maintenance/administrations/edit/:id',
    name: 'EditAdministration',
    component: NewAdministrationComponent,
    params: { id: null }
  }, {
    path: '/maintenance/migrations',
    name: 'Migrations',
    component: MigrationsComponent
  }, {
    path: '/notFound',
    name: 'NotFound',
    component: NotFoundComponent
  }, {
    path: '*',
    component: NotFoundComponent
  }

]
// eslint-disable-next-line
const router = new VueRouter({ routes });

export default router
