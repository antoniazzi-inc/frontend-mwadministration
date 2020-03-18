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
          :active="true"
          :table="'helpMaterials'"
          @onEdit="editHelp"
          @onCopy="copyHelp"
          @onDelete="deleteHelp"
          :service="helpMaterialService"/>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./helpMaterial.component.ts"></script>
