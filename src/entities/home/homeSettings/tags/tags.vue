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
  <div class="container-fluid">

    <div class="d-flex justify-content-between mb-3 search-banner">
      <div class="p-2" style="width:70%">
        <simple-search @onSearch="searchTag"></simple-search>
      </div>
      <div class="p-4">
        <button tag="button" data-toggle="modal" data-target="#tagModal" class="btn btn-primary float-right create-button" @click="resetTag">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newTag')}}</span>
        </button>
      </div>
    </div>

    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="$props.active"
      :table="'tag'"
      :noDataLabel="'labels.noData'"
      @onEdit="editTag"
      @onCopy="copyTag"
      @onDelete="deleteTag"
      :service="tagService"/>


    <div class="onboarding-modal modal fade show" id="tagModal" role="dialog" ref="tagModal" tabindex="-1" style="padding-right: 15px; display: none;">
      <div class="modal-dialog modal-lg modal-centered" role="document">
        <div class="modal-content text-center">
          <button aria-label="Close" class="close" data-dismiss="modal" type="button"><span class="close-label">&nbsp;</span><span class="os-icon os-icon-close"></span></button>
          <div class="onboarding-side-by-side">
            <div class="onboarding-media" style="max-width:100px;">
              <img alt="" src="img/bigicon5.png" width="100px">
            </div>
            <div class="onboarding-content with-gradient" style="padding:1em; padding-top:2em; padding-left:3em;">
              <h4 class="onboarding-title" v-if="tag && tag.id === undefined">{{$t('labels.newTag')}}</h4>
              <h4 class="onboarding-title" v-if="tag && tag.id > 0">{{$t('labels.editTag')}}</h4>
              <div class="onboarding-text">
                In this example you can see a form where you can request some additional information from the customer when they land on the app page.
              </div>
              <form name="editForm" role="form" novalidate @submit.prevent.stop="saveTag()">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="">{{$t('labels.code')}}</label>
                      <input type="text" ref="tagCode" :class="{'form-control':true, invalid: errors.has('code')}" name="code" id="tag-code"
                             v-model="tag.code" v-validate="'required'"/>
                      <span class="text-danger small">{{ errors.first('code') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="">{{$t('labels.points')}}</label>
                      <input type="number" ref="tagPoints" class="form-control" name="points" id="tag-points" v-model="tag.points"/>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-lg btn-secondary"  @click="closeModal">{{$t('buttons.close')}}</button>
                  <button type="submit" class="btn btn-lg btn-primary">{{$t('buttons.save')}}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--
    <div class="modal" data-backdrop="static" data-keyboard="false" id="tagModal" tabindex="-1" role="dialog" ref="tagModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form name="editForm" role="form" novalidate @submit.prevent.stop="saveTag()">
          <div class="modal-header">
            <h5 v-if="tag && tag.id === undefined">{{$t('labels.newTag')}}</h5>
            <h5 v-if="tag && tag.id > 0">{{$t('labels.editTag')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <div class="mt-4">
                <div class="form-group">
                  <label class="form-control-label" for="tag-code">{{$t('labels.code')}}</label>
                  <input type="text" ref="tagCode" class="form-control" name="code" id="tag-code"
                         v-model="tag.code" v-validate="'required'"/>
                  <span class="text-danger small">{{ errors.first('code') }}</span>
                </div>
                <div class="form-group">
                  <label class="form-control-label" for="tag-code">{{$t('labels.points')}}</label>
                  <input type="number" ref="categoryPoints" class="form-control" name="points" id="tag-points"
                         v-model="tag.points"/>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">{{$t('buttons.close')}}</button>
            <button type="submit" :disabled="errors.any()" class="btn btn-primary">{{$t('buttons.save')}}</button>
          </div>
          </form>
        </div>
      </div>
    </div>
    -->


  </div>
</template>
<script type="ts" src="./tags.component.ts"></script>
