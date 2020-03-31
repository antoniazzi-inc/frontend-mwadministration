<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.regions')}}</span>
      <router-link to="/maintenance/regions/new" class="text-white text-decoration-none">
      <button tag="button" data-toggle="modal" data-target="#helpCategoryModal" class="btn btn-primary float-right">
        <i class="fas fa-plus"/> {{$t('labels.newRegion')}}
      </button>
       </router-link>
    </h2>
    <simple-search @onSearch="searchRegion"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="true"
      :noDataLabel="'labels.noData'"
      :table="'regions'"
      @onEdit="editRegion"
      @onDelete="removeRegion"
      :service="regionService"/>
  </div>
</template>
<script type="ts" src="./region.component.ts"></script>
