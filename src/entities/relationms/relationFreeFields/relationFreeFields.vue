<template>
  <div class="container-fluid">

    <h2 id="page-heading" class="text-left mt-3">
      <span>{{$t('labels.freeFieldsMenu')}}</span>
    </h2>

    <div class="d-flex justify-content-between mb-3 search-banner">
      <div class="p-2" style="width:70%">
        <simple-search @onSearch="searchFreeField"></simple-search>
      </div>
      <div class="p-4">
        <router-link to="/relations-free-fields/new" class="text-white text-decoration-none">
          <button tag="button" class="btn btn-primary float-right create-button">
            <i class="fas fa-plus"/> {{$t('labels.newFreeField')}}
          </button>
        </router-link>
      </div>
    </div>

    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="active"
      :table="'customField'"
      :noDataLabel="'labels.noData'"
      @onEdit="editFreeField"
      @onDelete="deleteFreeField"
      :service="relationFreeFieldService"/>
  </div>
</template>
<script src="./relationFreeFields.component.ts" lang="ts"></script>
