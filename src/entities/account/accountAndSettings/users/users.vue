<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.users')}}</span>
      <button tag="button" class="btn btn-primary float-right" @click="newUser">
        <i class="fas fa-plus"/>  <router-link class="text-white text-decoration-none"
                                               to="/account/user/new-user">{{$t('labels.newUser')}}</router-link>
      </button>
    </h2>
    <simple-search @onSearch="searchUser"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="$props.active"
      :table="'users'"
      @onEdit="editUser"
      @onCopy="copyUser"
      @onDelete="deleteUser"
      :service="relationService"/>
  </div>
</template>
<script lang="ts" src="./users.component.ts"></script>
