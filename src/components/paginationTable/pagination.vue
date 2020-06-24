<template>
  <div class="row font-size-small">
    <div class="col-md-3">
      <div>
        <span>
          {{$t('labels.showing')}}
          {{first}}
          {{$t('labels.to')}}
          {{second}}
          {{$t('labels.of')}}
          {{total}}
          {{$t('labels.items')}}
        </span>
      </div>
    </div>
    <div class="col-md-6">
      <ul data-v-c588cb8e="" class="pagination">
        <li class="page-item" @click.prevent="toFirstPage"><a class="page-link">&lt;&lt;</a></li>
        <li class="page-item" @click.prevent="backPage"><a class="page-link">&lt;</a></li>
        <li :class="{'page-item': true, 'active': true}">
          <a class="page-link">{{currentPage + 1}}</a>
        </li>
        <li class="page-item" @click.prevent="nextPage"><a class="page-link">&gt;</a></li>
        <li class="page-item" @click.prevent="toLastPage"><a class="page-link">&gt;&gt;</a></li>
      </ul>
    </div>
    <div class="col-md-3 d-inline-flex align-items-baseline">
        <label for="itemsPerPage" class="mr-2">{{$t('labels.itemsPerPage')}}</label>
        <select v-model="itemsPerPage" id="itemsPerPage" @change="changeItemsPerPage">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      <div class="dropdown">
        <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="os-icon os-icon-sliders"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="columnConfig">
          <template v-for="(item, index) in columnsConfig">
            <div class="dropdown-item ml-2" v-if="item.visible !== undefined" @click.prevent.stop="changeVisibility(item)" :key="index">
              <input v-model="item.visible"
                     type="checkbox" class="custom-control-input" :id="'item'+index">
              <label class="custom-control-label" :for="'item'+index">{{$t('labels.'+item.id)}}</label>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./pagination.component.ts"></script>
<style scoped>
  .pagination{
    display: flex;
    margin: 0;
    padding: 0;
    justify-content: center;
  }
  .page-item{
    cursor: pointer;
    user-select: none;
  }
  .font-size-small{
    font-size: 0.9em!important;
  }
</style>
