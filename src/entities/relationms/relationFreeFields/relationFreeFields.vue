<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.freeFieldsMenu')}}</span>
      <router-link to="/relations-free-fields/new" class="text-white text-decoration-none">
        <button tag="button" class="btn btn-primary float-right">
          <i class="fas fa-plus"/> {{$t('labels.newFreeField')}}
        </button>
      </router-link>
    </h2>
    <simple-search @onSearch="searchFreeField"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="true"
      :table="'customField'"
      :noDataLabel="'labels.noData'"
      @onEdit="editFreeField"
      @onDelete="deleteFreeField"
      :service="relationFreeFieldService"/>
  </div>
</template>
<script src="./relationFreeFields.component.ts" lang="ts"></script>
