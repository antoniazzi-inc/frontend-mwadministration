<template>
  <div class="container-fluid">

    <div class="d-flex justify-content-between mb-3">
      <div class="p-2" style="width:70%">
        <simple-search @onSearch="searchUser"></simple-search>
      </div>
      <div class="p-4">
        <button tag="button" class="btn btn-primary float-right create-button" @click="newUser">
          <i class="fas fa-plus"/>
          <router-link class="text-white text-decoration-none" to="/account/user/new-user">{{$t('labels.newUser')}}</router-link>
        </button>
      </div>
    </div>

    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="$props.active"
      :table="'users'"
      :noDataLabel="'labels.noData'"
      @onEdit="editUser"
      @onCopy="copyUser"
      @onDelete="deleteUser"
      :service="relationService"/>
  </div>
</template>
<script lang="ts" src="./users.component.ts"></script>
