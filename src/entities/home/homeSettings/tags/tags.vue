<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <!--
      <span id="tag-heading">{{$t('labels.tags')}}</span>
      -->
      <button tag="button" data-toggle="modal" data-target="#tagModal" class="btn btn-primary float-right create-tag" @click="resetTag">
        <i class="fas fa-plus"/>  <span>{{$t('labels.newTag')}}</span>
      </button>
    </h2>
    <simple-search @onSearch="searchTag"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="$props.active"
      :table="'tag'"
      :noDataLabel="'labels.noData'"
      @onEdit="editTag"
      @onCopy="copyTag"
      @onDelete="deleteTag"
      :service="tagService"/>
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
  </div>
</template>
<script type="ts" src="./tags.component.ts"></script>
