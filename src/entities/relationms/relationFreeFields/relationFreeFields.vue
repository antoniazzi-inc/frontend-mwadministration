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
