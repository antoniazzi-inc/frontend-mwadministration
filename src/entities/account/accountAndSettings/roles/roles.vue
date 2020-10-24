<template>
  <div class="container-fluid">

    <div class="d-flex justify-content-between mb-3 search-banner">
      <div class="p-2" style="width:70%">
        <simple-search @onSearch="searchRole"></simple-search>
      </div>
      <div class="p-4">
        <button tag="button" class="btn btn-primary float-right create-button" @click="newRole">
          <i class="fas fa-plus"/>
          <router-link class="text-white text-decoration-none" to="/account/settings/new-role">{{$t('labels.newRole')}}</router-link>
        </button>
      </div>
    </div>

    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="active"
      :useService="false"
      :table="'roles'"
      :searchQuery="searchQuery"
      :noDataLabel="'labels.noData'"
      @onEdit="editRole"
      @onCopy="copyRole"
      @onDelete="deleteRole"
      :service="roleService"/>
  </div>
</template>
<script lang="ts" src="./roles.component.ts"></script>
