<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.helpTags')}}</span>
      <button tag="button" data-toggle="modal" data-target="#helpCategoryModal" class="btn btn-primary float-right">
        <i class="fas fa-plus"/>  <router-link to="/maintenance/help-tag/new" class="text-white text-decoration-none">
        {{$t('labels.newTag')}}</router-link>
      </button>
    </h2>
    <simple-search @onSearch="searchHelpTag"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="true"
      :noDataLabel="'labels.noData'"
      :table="'helpTag'"
      @onEdit="editHelpTag"
      @onCopy="copyHelpTag"
      @onDelete="deleteHelpTag"
      :service="helpTagService"/>
  </div>
</template>
<script type="ts" src="./helpTag.component.ts"></script>
