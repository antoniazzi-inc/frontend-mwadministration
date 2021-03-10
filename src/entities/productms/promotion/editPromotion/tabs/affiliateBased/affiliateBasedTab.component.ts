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

import {Component, Vue, Watch} from "vue-property-decorator";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";

@Component({
  props: {
    promotion: Object
  },
  components: {
    SearchableSelectComponent,
    ToggleSwitch
  },
  mounted() {

  }
})
export default class AffiliateBasedTabComponent extends Vue {
  public forAllAffiliates: boolean
  public selectedAffiliates: any[]
  public multiSelectConfig: ISearchableSelectConfig

  constructor() {
    super();
    this.forAllAffiliates = false
    this.selectedAffiliates = []
    this.multiSelectConfig = new SearchableSelectConfig('label',
      'labels.selectAffiliates', '', false,
      false, true, true, false);
  }

  @Watch('$props.promotion', {immediate: true, deep: true})
  public updateAffiliateBased(newVal: any) {
    if (newVal && newVal.typeAffiliateBased) {
      let aff = JSON.parse(newVal.typeAffiliateBased.affiliateIdsJson)
      if (aff.length) {
        this.getAllAffiliates(aff)
      } else {
        this.forAllAffiliates = true
      }
    }
  }
  public goBack() {
    this.$router.push('/promotions')
  }
  public getAllAffiliates(aff: []) {
    this.$store.state.lookups.affiliates.forEach((af:any) => {
      aff.forEach(affiliate => {
        //TODO populate selectedAffiliates
      })
    })
  }

  public saveAffiliateBased() {
  }

  public addAffiliate() {
  }

  public removeAffiliate() {
  }

  public previousState() {
    this.$router.push('/promotions')
  }
}
