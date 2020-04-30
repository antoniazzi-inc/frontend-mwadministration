<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.roles')}}</span>
      <button tag="button" class="btn btn-primary float-right" @click="newRole">
        <i class="fas fa-plus"/>  <router-link class="text-white text-decoration-none"
                                               to="/account/settings/new-role">{{$t('labels.newRole')}}</router-link>
      </button>
    </h2>
    <simple-search @onSearch="searchRole"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="true"
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
