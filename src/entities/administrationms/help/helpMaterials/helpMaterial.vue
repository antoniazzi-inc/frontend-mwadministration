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
      <span id="tag-heading">{{$t('labels.helpMaterials')}}</span>
      <router-link to="/maintenance/help-material/new" class="text-white text-decoration-none">
      <button tag="button" data-toggle="modal" data-target="#categoryModal" class="btn btn-primary float-right">
        <i class="fas fa-plus"/> {{$t('labels.newHelpMaterial')}}
      </button>
      </router-link>
    </h2>
    <div class="row">
      <div class="col-md-2">Search</div>
      <div class="col-md-10">
        <PaginationTableComponent
          :ref="'paginationTable'"
          :active="active"
          :table="'helpMaterials'"
          :noDataLabel="'labels.noData'"
          @onEdit="editHelp"
          @onCopy="copyHelp"
          @onDelete="deleteHelp"
          :service="helpMaterialService"/>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./helpMaterial.component.ts"></script>
