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
