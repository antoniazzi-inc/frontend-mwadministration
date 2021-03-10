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
      <span id="tag-heading">{{$t('labels.emailTexts')}}</span>
      <router-link to="/actions/emailTexts/new" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newEmailText')}}</span>
        </button>
      </router-link>
    </h2>
    <div class="row">
      <div class="col-md-12">
        <PaginationTableComponent
          :ref="'paginationTable'"
          :active="active"
          :table="'emailTexts'"
          :noDataLabel="'labels.noTexts'"
          @onEdit="editText"
          @onDelete="deleteText"
          :service="emailTextsService"/>
      </div>
    </div>
  </div>
</template>
<script src="./emailTexts.component.ts" lang="ts"></script>
<style scoped>
  #prd-search {
    border: 1px solid #e0e0e8;
    padding: 1em;
    background-color: #FFF;
    margin:0em;
    margin-top:2em;
  }
</style>
