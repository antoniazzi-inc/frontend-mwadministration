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
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="tab-nav nav-link active" id="simpleSearch-tab" data-toggle="tab" href="#simpleSearch" role="tab"
               aria-controls="simpleSearch" aria-selected="true">{{$t('labels.simpleSearch')}}</a>
          </li>
          <li class="nav-item">
            <a class="tab-nav nav-link" id="complexSearch-tab" data-toggle="tab" href="#complexSearch" role="tab"
               aria-controls="complexSearch" aria-selected="false">{{$t('labels.complexSearch')}}</a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="simpleSearch" role="tabpanel" aria-labelledby="simpleSearch-tab">
            <form name="searchForm" class="form text-left" @submit.prevent.stop="simpleSearch">
              <div class="form-group mt-3">
                <label class="form-control-label">{{$t('labels.searchByName')}}</label>
                <input type="text" class="form-control" name="currentSearch" id="currentSearch" v-model="currentSearchName" />
              </div>
              <div class="form-group mt-3">
                <label class="form-control-label">{{$t('labels.searchByEmail')}}</label>
                <input type="text" class="form-control" name="currentSearchEmail" id="currentSearchEmail"
                       v-model="currentSearchEmail" />
              </div>
              <div class="form-group mt-3">
                <label class="form-control-label">{{$t('labels.searchByGroups')}}</label>
                <searchable-select-component :config="searchableGroupsConfig"
                                             :options="$store.state.lookups.groups"
                                             :value="selectedGroups"
                                             @onSelected="groupSearchChanged"
                                             @onDelete="groupSearchRemoved"/>
              </div>
              <div class="form-group mt-3">
                <label class="form-control-label">{{$t('labels.searchByTags')}}</label>
                <searchable-select-component :config="searchableTagsConfig"
                                             :options="$store.state.lookups.tags"
                                             :value="selectedTags"
                                             @onSelected="tagSearchChanged"
                                             @onDelete="tagSearchRemoved"/>
              </div>
              <div class="form-group mt-3">
                <label class="form-control-label">{{$t('labels.searchByCategory')}}</label>
                <searchable-select-component :config="searchableCatsConfig"
                                             :options="$store.state.lookups.categories"
                                             :value="selectedCategories"
                                             @onSelected="categorySearchChanged"
                                             @onDelete="categorySearchRemoved"/>
              </div>
              <div class="text-right">
                <button type="button" class="btn btn-outline-primary" @click="clear()">{{$t('buttons.clear')}}</button>
                <button type="submit" class="btn btn-primary ml-2">{{$t('buttons.search')}}</button>
              </div>
            </form>
          </div>
          <div class="tab-pane fade" id="complexSearch" role="tabpanel" aria-labelledby="complexSearch-tab">
            <complex-search
              :query-name="queryName"
              :query-id="complexId"
              :complex-filter="complexFilter"
              @search="startComplexSearch" @show-queries="openSearchQueries(false)" />
          </div>
        </div>
      </div>
      <div class="col-md-9" style="padding-top:11px;">
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

<style scoped>

#simpleSearch {
  border: 1px solid #e0e0e8;
  padding: 1em;
  background-color: #FFF;
  margin:0em;
}

#complexSearch {
  border: 1px solid #e0e0e8;
  background-color: #FFF;
  padding:1em;
  margin:0em;
}
</style>
