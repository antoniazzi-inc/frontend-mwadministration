<template>
  <div class="container-fluid">

    <h2 id="page-heading" class="text-left mt-3">
      <span>{{$t('labels.groups')}}</span>
    </h2>
    <div class="d-flex justify-content-between mb-3 search-banner">
      <div class="p-2" style="width:70%">
        <simple-search @onSearch="searchGroups"></simple-search>
      </div>
      <div class="p-4">
        <button tag="button" data-toggle="modal" data-target="#groupModal" class="btn btn-primary float-right create-button" @click="resetGroup">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newGroup')}}</span>
        </button>
      </div>
    </div>

    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="active"
      :table="'group'"
      :noDataLabel="'labels.noData'"
      @onEdit="editGroup"
      @onCopy="copyGroup"
      @onViewMembers="onViewMembers"
      @onDelete="deleteGroup"
      :service="relationGroupService"/>

    <div class="modal" data-backdrop="static" data-keyboard="false" id="groupModal" tabindex="-1" role="dialog" ref="groupModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form name="editForm" role="form" novalidate @submit.prevent.stop="saveGroup()">
            <div class="modal-header">
              <h5 v-if="group && group.id === undefined">{{$t('labels.newGroup')}}</h5>
              <h5 v-if="group && group.id > 0">{{$t('labels.editGroup')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left">
              <div class="mt-4">
                <div class="form-group">
                  <label class="form-control-label">{{$t('labels.label')}}</label>
                  <input ref="groupLabel" type="text" :class="{'form-control':true, invalid: errors.has('label')}" name="label"
                         v-model="group.label" v-validate="'required'"/>
                  <span class="text-danger small">{{ errors.first('label') }}</span>
                </div>
                <div class="form-group">
                  <label class="form-control-label">{{$t('labels.category')}}</label>
                  <searchable-select-component :config="searchableConfigCat"
                                               :options="$store.state.lookups.categories"
                                               :value="selectedCategory"
                                               @onChange="categoryUpdated"
                                               @onSelected="categoryUpdated"
                                               @onDelete="categoryRemoved"
                  ></searchable-select-component>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  @click="closeModal">{{$t('buttons.close')}}</button>
              <button type="submit" class="btn btn-primary">{{$t('buttons.save')}}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./relationGroups.component.ts" lang="ts"></script>
