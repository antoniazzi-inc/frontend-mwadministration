<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <form name="searchForm" class="form-inline" v-on:submit.prevent="search()">
          <div class="input-group w-100 mt-3">
            <input type="text" class="form-control" name="currentSearch" id="currentSearch"
                   v-bind:placeholder="$t('labels.search')"
                   v-model="simpleSearch" />
            <button type="button" id="launch-search" class="btn btn-primary" v-on:click="search()">
              <i class="fa fa-search"></i>
            </button>
            <button type="button" id="clear-search" class="btn btn-secondary" v-on:click="clear()"
                    v-if="simpleSearch">
              <i class="fa fa-trash-alt"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./simpleSearch.component.ts"></script>
<style scoped>
</style>
