<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.relations')}}</span>
      <router-link to="/relations/new" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newRelation')}}</span>
        </button>
      </router-link>
    </h2>
    <div class="row">
      <div class="col-md-3">
        Impelement Search
      </div>
      <div class="col-md-9">
        <PaginationTableComponent
          :ref="'paginationTable'"
          :active="active"
          :table="'relation'"
          :noDataLabel="'labels.noRelations'"
          @onEdit="editRelation"
          @onDelete="deleteRelation"
          :service="relationService"/>
      </div>
    </div>
  </div>
</template>
<script src="./relation.component.ts" lang="ts"></script>
