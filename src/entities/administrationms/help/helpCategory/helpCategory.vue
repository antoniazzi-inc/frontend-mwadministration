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
      <span id="tag-heading">{{$t('labels.helpCategories')}}</span>
      <button tag="button" data-toggle="modal" data-target="#helpCategoryModal" class="btn btn-primary float-right" @click="resetHelpCategory">
        <i class="fas fa-plus"/>  <router-link to="/maintenance/help-category/new" class="text-white text-decoration-none">
        {{$t('labels.newHelpCategory')}}</router-link>
      </button>
    </h2>
    <simple-search @onSearch="searchHelpCategory"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="active"
      :noDataLabel="'labels.noData'"
      :table="'helpCategory'"
      @onEdit="editHelpCategory"
      @onDelete="deleteHelpCategory"
      :service="helpCategoryService"/>
  </div>
</template>
<script type="ts" src="./helpCategory.component.ts"></script>
