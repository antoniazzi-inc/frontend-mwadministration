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
      :active="true"
      :table="'helpCategory'"
      @onEdit="editHelpCategory"
      @onDelete="deleteHelpCategory"
      :service="helpCategoryService"/>
  </div>
</template>
<script type="ts" src="./helpCategory.component.ts"></script>
