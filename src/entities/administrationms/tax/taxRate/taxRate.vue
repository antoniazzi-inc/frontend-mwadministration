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
      <span id="tag-heading">{{$t('labels.taxRates')}}</span>
      <router-link to="/maintenance/tax-rate/new" class="text-white text-decoration-none">
      <button tag="button" data-toggle="modal" data-target="#helpCategoryModal" class="btn btn-primary float-right">
        <i class="fas fa-plus"/> {{$t('labels.newTaxRate')}}
      </button>
      </router-link>
    </h2>
    <simple-search @onSearch="searchTaxRate"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="active"
      :noDataLabel="'labels.noData'"
      :table="'taxRate'"
      @onEdit="editTaxRate"
      @onDelete="removeTaxRate"
      :service="taxRateService"/>
  </div>
</template>
<script type="ts" src="./taxRate.component.ts"></script>
