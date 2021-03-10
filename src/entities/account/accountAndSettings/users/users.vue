<!--
  - /*
  -  * Copyright 2018-2021 Antoniazzi Holding BV
  -  *
  -  * This program is free software: you can redistribute it and/or modify it
  -  * under the terms of the GNU General Public License as published by
  -  * the Free Software Foundation, either version 3 of the License,
  -  * or (at your option) any later version.
  -  *
  -  * This program is distributed in the hope that it will be useful,
  -  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  -  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  -  * GNU General Public License for more details.
  -  *
  -  * You should have received a copy of the GNU General Public License
  -  * along with this program. If not, see <https://www.gnu.org/licenses/>.
  -  */
  -->

<template>
  <div class="container-fluid">

    <div class="d-flex justify-content-between mb-3 search-banner">
      <div class="p-2" style="width:70%">
        <simple-search @onSearch="searchUser"></simple-search>
      </div>
      <div class="p-4">
        <button tag="button" class="btn btn-primary float-right create-button" @click="newUser">
          <i class="fas fa-plus"/>
          <router-link class="text-white text-decoration-none" to="/account/user/new-user"> {{$t('labels.newUser')}}</router-link>
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
      :service="relationService"
      :searchQuery="'roles.code=in=(ROLE_ADMIN)'"/>
  </div>
</template>
<script lang="ts" src="./users.component.ts"></script>
