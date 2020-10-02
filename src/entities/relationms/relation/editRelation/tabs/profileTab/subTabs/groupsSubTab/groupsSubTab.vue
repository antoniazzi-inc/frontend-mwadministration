<template>
  <div class="tab-form-panel">
    <div class="row">
      <div class="col-md-6">
          <div class="row text-left">
            <div class="col-md-12">
              <h5 slot="header">{{$t('labels.isMemberOf')}}</h5>
            </div>
          </div>
        <draggable
          class="dragArea list-group areaHolder"
          :list="relationCopy.relationGroups"
          :clone="clone"
          @sort="onSort"
          :sort="false"
          :group="{ name: 'groups', pull: pullFunction }"
          @start="start"
        >
          <div class="list-group-item mt-2 mb-2 mr-2 cursor-pointer btn-grey" v-for="element in relationCopy.relationGroups" :key="element.id">
            <button type="button" class="ml-2 mb-1 close" @click="removeGroup(element)" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <i class="fas fa-users"></i>
            <span class="text-left col-md-8" style="font-size:1.2em">{{element.label}}</span>
            <!-- <span class="text-right col-md-3">{{element.id}} - {{element.categoryId}}</span> -->
          </div>
        </draggable>
      </div>
      <div class="col-md-6">
          <div class="row">
            <div class="col-md-5 pr-0 mr-0">
              <h5>{{$t('labels.availableGroups')}}</h5>
            </div>
            <div class="col-md-7 pl-0">
              <input type="search" @input="search" class="form-control" :placeholder="$t('labels.search')" v-model="groupSearch">
            </div>
          </div>
        <draggable @start="isChanged = true" :sort="false" class="dragArea list-group areaHolder" :list="allGroups" group="groups">
          <div class="list-group-item mt-2 mb-2 cursor-pointer btn-grey" v-for="element in allGroups" :key="element.id">
            <i class="fas fa-users"></i>
            <span class="text-left col-md-8" style="font-size:1.2em">{{element.label}}</span>
            <!-- <span class="text-right col-md-3">{{element.id}} - {{element.categoryId}}</span> -->
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./groupsSubTab.component.ts"></script>
<style scoped>
  .areaHolder{
    height: 100%;
  }
  .list-group-item+.list-group-item{
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-top-width: 1px;
  }
</style>
