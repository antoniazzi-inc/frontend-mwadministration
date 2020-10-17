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
            <a :class="{'tab-nav nav-link': true, active: activeSearch === 'simple' || !activeSearch}" id="simpleSearch-tab" data-toggle="tab" href="#simpleSearch" role="tab"
               aria-controls="simpleSearch" aria-selected="true">{{$t('labels.simpleSearch')}}</a>
          </li>
          <li class="nav-item">
            <a :class="{'tab-nav nav-link': true, active: activeSearch === 'complex'}" id="complexSearch-tab" data-toggle="tab" href="#complexSearch" role="tab"
               aria-controls="complexSearch" aria-selected="false">{{$t('labels.complexSearch')}}</a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade" :class="{'show active': activeSearch === 'simple' || !activeSearch}" id="simpleSearch" role="tabpanel" aria-labelledby="simpleSearch-tab">
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
          <div class="tab-pane fade" :class="{'show active': activeSearch === 'complex'}" id="complexSearch" role="tabpanel" aria-labelledby="complexSearch-tab">
            <complex-search-component :location="'relations'" :complexSearchQuery="complexSearchQuery" @search="startComplexSearch"/>
            <!--<complex-search
              :query-name="queryName"
              :query-id="complexId"
              :complex-filter="complexFilter"
              @search="startComplexSearch" @show-queries="openSearchQueries(false)" />-->
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
          @updateTableAction="updateAction"
          :service="relationService"/>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" id="actionModal" tabindex="-1" role="dialog" ref="actionModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{$t('labels.' + selectedAction)}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mt-4">
              <add-to-group-component @updateCurrentAction="updateCurrentAction" v-if="selectedAction==='addToGroup'"/>
              <remove-from-group-component @updateCurrentAction="updateCurrentAction" v-else-if="selectedAction==='removeFromGroup'"/>
              <export-to-excel-component @updateCurrentAction="updateCurrentAction" v-else-if="selectedAction==='exportToExcel'"/>
              <delete-relations-component @updateCurrentAction="updateCurrentAction" v-else-if="selectedAction==='delete'"/>
              <send-mailing-component @updateCurrentAction="updateCurrentAction" v-else-if="selectedAction==='sendMailing'"/>
              <start-workflow-component @updateCurrentAction="updateCurrentAction" v-else-if="selectedAction==='startWorkflow'"/>
              <start-list-manager-component @updateCurrentAction="updateCurrentAction" v-else-if="selectedAction==='startListManager'"/>
              <bulk-change-component @updateCurrentAction="updateCurrentAction" v-else-if="selectedAction==='bulkChange'"/>
            </div>
          </div>
          <div class="modal-footer">
            <!--<button type="button" class="btn btn-primary" @click="removeShipping">
              {{$t('buttons.confirm')}}
            </button>-->
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
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
