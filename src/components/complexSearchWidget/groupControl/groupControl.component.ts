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

import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";

@Component({
  props: {
    groupCtrl: [Object, Array],
    depth: Number,
    query: [Object,Array,String]
  },
  components: {}
})
export default class GroupControlComponent extends mixins(CommonHelpers, Vue) {
  public selectedRule: any
  public expanded: any
  public isSecondLevel: boolean

  constructor() {
    super();
    this.selectedRule = ""
    this.expanded = false
    this.isSecondLevel = false
  }
  public mounted(){
    this.isSecondLevel = $(this.$el).parent().parent().hasClass('query-builder-child__component')
  }
  get ruleName() {
    if (this.selectedRule === "") {
      return this.$t('labels.selectRule');
    }
    return this.$t('labels.' + this.$props.groupCtrl.rules.find((r: any) => r.identifier === this.selectedRule).name + 'Title');
  }

  public setRule(rule: any) {
    this.expanded = false;
    this.selectedRule = rule;
    this.addRule(rule)
  }

  public addRule(rule: any) {
    if (!this.selectedRule) {
      return;
    }
    this.$props.groupCtrl.addRule(this.selectedRule);
    this.selectedRule = "";
  }

  public toggleExpanded(){
    this.$set(this, 'expanded', !this.expanded)
  }
  public createNewGroup(){
    this.$emit('groupAdded')
    this.$props.groupCtrl.newGroup
  }
}

