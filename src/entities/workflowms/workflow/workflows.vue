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
      <span>{{$t('labels.workflows')}}</span>
    </h2>
    <div class="d-flex justify-content-between mb-3 search-banner">
      <div class="p-2" style="width:70%">
        <simple-search @onSearch="searchWorkflows"></simple-search>
      </div>
      <div class="p-4">
        <button tag="button" data-toggle="modal" data-target="#groupModal" class="btn btn-primary float-right create-button" @click="resetWorkflow">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newWorkflow')}}</span>
        </button>
      </div>
    </div>

    <button class="btn btn-primary btn-lg mt-5" @click="startEditor">Start Editor</button>

    <!--
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="active"
      :table="'workflow'"
      :noDataLabel="'labels.noData'"
      @onEdit="editWorkflow"
      @onCopy="copyWorkflow"
      @onViewStatistics="onViewStatistics"
      @onDelete="deleteWorkflow"
      :service="workflowService"/>
    -->

  </div>
</template>
<script src="./workflows.component.ts" lang="ts"></script>
