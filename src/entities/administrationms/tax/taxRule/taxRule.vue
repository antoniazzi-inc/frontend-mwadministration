<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.taxRules')}}</span>
      <router-link to="/maintenance/tax-rule/new" class="text-white text-decoration-none">
        <button tag="button" data-toggle="modal" data-target="#helpCategoryModal" class="btn btn-primary float-right">
          <i class="fas fa-plus"/>{{$t('labels.newTaxRule')}}
        </button>
      </router-link>
    </h2>
    <simple-search @onSearch="searchTaxRule"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="true"
      :table="'taxRule'"
      @onEdit="editTaxRule"
      @onDelete="removeTaxRule"
      :service="taxRuleService"/>
  </div>
</template>
<script type="ts" src="./taxRule.component.ts"></script>
