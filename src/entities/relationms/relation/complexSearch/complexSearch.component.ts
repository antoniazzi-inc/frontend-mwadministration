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
import { Component, Inject, Vue, Watch } from 'vue-property-decorator'

import QueryBuilderComponent from '@/components/queryBuilder/queryBuilder.vue'
import {
  dateOperators, emailOperators, equalOperators, genderOperators, groupOperators, linkOperators, listmgrOperators,
  mailingOperators, numberOperators, orderOperators, pointOperators, tagOperators, textOperators, workflowOperators,
  yesnoOperators
} from '@/shared/complexSearchOperators'
import CommonHelpers from '@/shared/commonHelpers'
import SearchRules from '@/shared/searchRules'

@Component({
  components: {
    'query-builder': QueryBuilderComponent
  },
  props: {
    complexFilter: {
      type: Object,
      required: true
    },
    queryName: {
      type: String,
      required: true
    },
    queryId: {
      type: Number,
      required: true
    }
  }
})
export default class complexSearchComponent extends mixins(CommonHelpers, Vue) {
    public query: any;
    public rules: any;
    public searchQuery: any;
    public queryDesc: any;
    public myerrors: any;
    public saving: any;
    public saveErrors: any;
    public newQueryDesc: any;
    public newQueryName: any;
    public dateOperators: any;
    public emailOperators: any;
    public equalOperators: any;
    public genderOperators: any;
    public groupOperators: any;
    public linkOperators: any;
    public listmgrOperators: any;
    public mailingOperators: any;
    public numberOperators: any;
    public orderOperators: any;
    public pointOperators: any;
    public tagOperators: any;
    public textOperators: any;
    public workflowOperators: any;
    public yesnoOperators: any;
    constructor () {
      super()
      this.query = null
      this.myerrors = null
      this.saving = false
      this.saveErrors = false
      this.queryDesc = ''
      this.newQueryDesc = ''
      this.newQueryName = ''
      this.searchQuery = ''
      this.rules = []
      this.dateOperators = []
      this.emailOperators = []
      this.equalOperators = []
      this.genderOperators = []
      this.groupOperators = []
      this.linkOperators = []
      this.listmgrOperators = []
      this.mailingOperators = []
      this.numberOperators = []
      this.orderOperators = []
      this.pointOperators = []
      this.tagOperators = []
      this.textOperators = []
      this.workflowOperators = []
      this.yesnoOperators = []
    }

    public mounted () {
      this.dateOperators = this.translateOperators(dateOperators)
      this.emailOperators = this.translateOperators(emailOperators)
      this.equalOperators = this.translateOperators(equalOperators)
      this.genderOperators = this.translateOperators(genderOperators)
      this.groupOperators = this.translateOperators(groupOperators)
      this.linkOperators = this.translateOperators(linkOperators)
      this.listmgrOperators = this.translateOperators(listmgrOperators)
      this.mailingOperators = this.translateOperators(mailingOperators)
      this.numberOperators = this.translateOperators(numberOperators)
      this.orderOperators = this.translateOperators(orderOperators)
      this.pointOperators = this.translateOperators(pointOperators)
      this.tagOperators = this.translateOperators(tagOperators)
      this.textOperators = this.translateOperators(textOperators)
      this.workflowOperators = this.translateOperators(workflowOperators)
      this.yesnoOperators = this.translateOperators(yesnoOperators)
      this.rules = this.createRules()
    }

    get showsave () {
      return this.query != null && this.query.children && this.query.children.length > 0
    }

    @Watch('query', { immediate: true, deep: true })
    public handler (newVal: any) {
      if (newVal) this.searchQuery = this.queryArrayToQueryString(newVal)
    }

    public translateOperators (operator: any) {
      const self = this
      const operatorResult: any = []
      operator.forEach((op: any) => {
        const ops = op
        // @ts-ignore
        ops.label = self.$t(op.label)
        operatorResult.push(ops)
      })
      return operatorResult
    }

    public queryUpdated (query: any) {
      this.query = query
    }

    public humanDescriptionUpdated (desc: any) {
      this.queryDesc = desc
    }

    public dosearch () {
      if (this.validated()) {
        this.$emit('search', this.searchQuery)
      }
    }

    public checkError () {
      this.saveErrors = this.newQueryName.length == 0
    }

    public loadQueries () {
      this.$emit('show-queries')
    }

    public dosave () {
      if (this.validated()) {
        this.newQueryName = this.$props.queryName
        if (this.newQueryName === 'current') this.newQueryName = ''
        this.newQueryDesc = ''
        this.saving = true
      }
    }

    public createRules () {
      const allCountries: any = []
      this.$store.state.allCountries.forEach((country: any) => {
        allCountries.push({
          label: country.enName,
          value: country
        })
      })
      const operators = {
        textOperators: this.textOperators,
        dateOperators: this.dateOperators,
        emailOperators: this.emailOperators,
        equalOperators: this.equalOperators,
        genderOperators: this.genderOperators,
        groupOperators: this.groupOperators,
        linkOperators: this.linkOperators,
        listmgrOperators: this.listmgrOperators,
        mailingOperators: this.mailingOperators,
        numberOperators: this.numberOperators,
        orderOperators: this.orderOperators,
        pointOperators: this.pointOperators,
        tagOperators: this.tagOperators,
        workflowOperators: this.workflowOperators,
        yesnoOperators: this.yesnoOperators
      }
      const loadedRules = new SearchRules({ operator: operators })
      const newLookups = { ...this.$store.state.lookups, allCountries: allCountries }
      const searchRules = loadedRules.relationSearchRules(newLookups)
      return searchRules
    }

    public cancelQuery () {
      this.saving = false
      this.saveErrors = false
    }

    public saveQuery () {
      if (this.newQueryName === '') {
        this.saveErrors = true
      } else {
        const profile: any = {
        }
        profile.def = JSON.stringify(this.query)
        profile.usedFor = 'PA'
        profile.name = this.newQueryName
        profile.description = this.newQueryDesc
        if (this.newQueryName != this.$props.queryName) {
          profile.id = 0
          // TODO save query to server
          this.saving = false
        } else {
          profile.id = this.$props.queryId
          // TODO save edited query to server
          this.saving = false
        }
      }
    }

    public validated () {
      // this.myerrors = 'missing fields';
      return true
    }
}
