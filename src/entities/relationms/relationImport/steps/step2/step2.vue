<!--
  - /*
  -  * Copyright 2018-2021 Antoniazzi Holding BV
  -  *
  -  * This program is free software: you can redistribute it and/or modify it
  -  * under the terms of the GNU General Public License as published by
  -  * the Free Software Foundation, either version 3 of the License,
  -  * or (at your option) any later version.
  -  *
  -  * This program is distributed in the hope that it will be useful,
  -  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  -  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  -  * GNU General Public License for more details.
  -  *
  -  * You should have received a copy of the GNU General Public License
  -  * along with this program. If not, see <https://www.gnu.org/licenses/>.
  -  */
  -->

<template>
  <div class="row">
    <div class="col-md-12">
      <div class="fixedTitle">
        <h3 v-html="$t('labels.handleRowColumnQuest')"></h3>
        <p v-html="$t('labels.handleRowColumnQuestInfo')"></p>
      </div>
    </div>
    <div class="col-md-12 overflowX mt-1 text-center">
      <div class="fieldsHolder">
        <div class="importTableCell m-2 align-content-between" v-for="(row,index) in headerRow" :key="index + 'title'">
          <span>{{ row }}</span>
          <searchable-select-component :config="searchableConfig"
                                       :options="$props.importFields"
                                       :value="selectedFieldValue"
                                       @onChange="assignImportField($event, index)"
                                       @onSelected="removeImportField($event, index)"/>
        </div>
      </div>
    </div>
      <div class="col-md-12 mt-5">
        <h3 v-html="$t('labels.whatShouldWeDoWithEachImportedRel')"></h3>
        <div class="row">
          <div class="col-md-8">
            <form class="form-horizontal" role="form" style="margin-top:2em">
              <div class="form-body">
                <div class="form-group row">
                  <label class="col-md-4 control-label" v-html="$t('labels.addToGroup')"></label>
                  <div class="col-md-8">
                    <!-- <label>{{$t('labels.defaultGroup')}}</label> -->
                    <searchable-select-component :config="searchableConfigGroups"
                                                 :value="selectedGroup"
                                                 :options="[...$store.state.lookups.groups, {
                                                  label: $t('labels.defaultGroup'),
                                                  value: 'default'
                                                }]"
                                                 @onChange="changeGroup"
                                                 @onSelected="removeGroup"/>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-4 control-label"
                         v-html="$t('labels.orAddToNewGroup')"></label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" placeholder="Enter name of new group"
                           v-model="newGroup" :disabled="selectedGroup ? true : false">
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-4 control-label"
                         v-html="$t('labels.relationExists')"></label>
                  <div class="col-md-8">
                    <div class="form-group">
                      <label>{{$t('labels.overwriteData')}}</label>
                      <toggle-switch :on-text="$t('labels.yes')"
                                     :off-text="$t('labels.no')"
                                     :value.sync="overwrite"></toggle-switch>
                      <span class="help-block pt-3" v-html="$t('labels.importRelOverwriteData')"></span>
                    </div>
                  </div>
                </div>
                <div class="form-group row" v-if="overwrite">
                  <label class="col-md-4 control-label"
                         v-html="$t('labels.ifImportFieldsEmpty')"></label>
                  <div class="col-md-8">
                    <div class="mt-checkbox-inline">
                      <label>{{$t('labels.ifImportFieldsEmptyInfo')}}</label>
                      <toggle-switch :on-text="$t('labels.yes')"
                                     :off-text="$t('labels.no')"
                                     :value.sync="insertEmptyValues"></toggle-switch>
                      <span class="help-block" v-html="$t('labels.ifImportFieldsEmptyDesc')"></span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

    </div>
  </div>
</template>
<script type="tsx" lang="ts" src="./step2.component.ts"/>
<style scoped>

  .importTableCell {
    max-width: 250px;
    display: inline-grid;
    width: 100%;
    min-height: 60px;
    background: lightgrey;
    border-radius: 4px;
  }
  .importTableCell span{
    padding: 2%;
  }

  .overflowX {
    width: 100%;
    overflow: visible;
  }
</style>
