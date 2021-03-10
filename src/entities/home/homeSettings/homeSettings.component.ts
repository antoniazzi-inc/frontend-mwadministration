/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

import { Component, Vue } from 'vue-property-decorator'
import CategoriesComponent from '@/entities/home/homeSettings/categories/categories.vue'
import TagsComponent from '@/entities/home/homeSettings/tags/tags.vue'
import DefaultTextsComponent from '@/entities/home/homeSettings/defaultTexts/defaultTexts.vue'
import { mixins } from 'vue-class-component'
import DeliveryMethodsComponent from '@/entities/home/homeSettings/deliveryMethods/deliveryMethods.vue'
import PaymentMethodsComponent from '@/entities/home/homeSettings/paymentMethods/paymentMethods.vue'
import IntegrationsComponent from '@/entities/home/homeSettings/integrations/integrations.vue'
import InvoiceTemplate from "@/entities/home/homeSettings/invoiceTemplate/invoiceTemplate.vue";
import InvoicingComponent from "@/entities/home/homeSettings/invoicing/invoicing.vue";
import TaxRulingsComponent from "@/entities/home/homeSettings/taxRulings/taxRulings.vue";

@Component({
  components: {
    CategoriesComponent,
    TagsComponent,
    DefaultTextsComponent,
    DeliveryMethodsComponent,
    PaymentMethodsComponent,
    IntegrationsComponent,
    InvoiceTemplate,
    InvoicingComponent,
    TaxRulingsComponent
  }
})
export default class HomeSettingsComponent extends mixins(Vue) {
  public currentTab: string;
  constructor () {
    super()
    this.currentTab = ''
  }
  public mounted(){
    this.currentTab = 'cat'
  }
}
