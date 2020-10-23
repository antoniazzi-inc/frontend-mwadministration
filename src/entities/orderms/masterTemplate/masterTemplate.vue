<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.masterTemplates')}}</span>
      <button tag="button" data-toggle="modal" data-target="#masterTemplateModal" class="btn btn-primary float-right">
        <i class="fas fa-plus"/>  <router-link to="/maintenance/master-templates/new" class="text-white text-decoration-none">
        {{$t('labels.newMasterTemplate')}}</router-link>
      </button>
    </h2>
    <simple-search @onSearch="searchMasterTemplate"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :table="'masterTemplate'"
      :active="active"
      :noDataLabel="'labels.noData'"
      @onEdit="editMasterTemplate"
      @onDelete="deleteMasterTemplate"
      :service="masterTemplateService"/>
  </div>
</template>
<script type="ts" src="./masterTemplate.component.ts"></script>
