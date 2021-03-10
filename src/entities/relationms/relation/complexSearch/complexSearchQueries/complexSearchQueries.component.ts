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

import { mixins } from 'vue-class-component'
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import CommonHelpers from '@/shared/commonHelpers'

@Component({
  components: {

  }
})
export default class complexSearchQueriesComponent extends mixins(CommonHelpers) {
    public allprofiles: any[];
    public filteredprofiles: any[];
    public filter: string;
    public confirmDelete: boolean;
    public profileToDelete: Record<string, any>;
    @Prop() loadSimple: any
    constructor () {
      super()
      this.allprofiles = []
      this.filteredprofiles = []
      this.filter = ''
      this.confirmDelete = false
      this.profileToDelete = {}
    }

    public mounted () {
      const me = this
      let usage = 'PA'
      if (this.loadSimple) usage = 'PQ'
      me.allprofiles = []
      me.filter = ''
      me.filteredprofiles = Array.from(me.allprofiles)
      /* Vue.prototype.$http.get(AdminApp.instance().fe_api + '/searchqueries/' + usage)
          .then(function (response) {

          })
          .catch(function (error) {
              //@ts-ignore
              this.$vueOnToasr.pop('error', Vue.t('data_nodata'));
          }); */
    }

    public doclose () {
      this.$emit('close')
    }

    public doselect (profile: any) {
      this.$emit('select', profile)
    }

    public askdelete (profile: any) {
      this.profileToDelete = profile
      this.confirmDelete = true
    }

    public dodelete () {

    }

    public dofilter () {
      if (this.filter.length == 0) {
        this.filteredprofiles = this.allprofiles
      } else {
        const me = this
        const filter = me.filter.trim().toLowerCase()
        me.filteredprofiles = []
        me.allprofiles.forEach(function (p) {
          // @ts-ignore
          if (p.name.toLowerCase().indexOf(filter) > -1 || (p.description && p.description.toLowerCase().indexOf(filter) > -1)) {
            me.filteredprofiles.push(p)
          }
        })
      }
    }
}
