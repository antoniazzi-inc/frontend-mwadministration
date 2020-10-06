<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.administrations')}}</span>
      <router-link to="/maintenance/administrations/new" class="text-white text-decoration-none">
        <button tag="button" data-toggle="modal" data-target="#helpCategoryModal" class="btn btn-primary float-right">
          <i class="fas fa-plus"/> {{$t('labels.newAdministration')}}
        </button>
      </router-link>
    </h2>
    <simple-search @onSearch="searchAdministration"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="active"
      :noDataLabel="'labels.noData'"
      :table="'administration'"
      @onEdit="editAdministration"
      @onDelete="removeAdministration"
      :service="administrationService"/>
  </div>
</template>
<script type="ts" src="./administrations.component.ts"></script>
