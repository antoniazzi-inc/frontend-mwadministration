<!--
  - /*
  -  * Copyright 2018-2021 Antoniazzi Holding BV
  -  *
  -  * This program is free software: you can redistribute it and/or modify it
  -  * under the terms of the GNU General Public License as published by
  -  * the Free Software Foundation, either version 3 of the License,
  -  * or (at your option) any later version.
  -  *
  -  * This program is distributed in the hope that it will be useful,
  -  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  -  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  -  * GNU General Public License for more details.
  -  *
  -  * You should have received a copy of the GNU General Public License
  -  * along with this program. If not, see <https://www.gnu.org/licenses/>.
  -  */
  -->

<template>
    <div class="d-flex justify-content-between mb-3">
      <div class="p-2">
        <div v-if="$props.location=='bottom'">
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
      <div class="p-4">
        <div class="d-inline-flex align-items-baseline">
          <label for="itemsPerPage" class="mr-2">{{$t('labels.itemsPerPage')}}</label>
          <select v-model="itemsPerPage" id="itemsPerPage" class="form-control" style="width:80px;" @change="changeItemsPerPage">
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
                  <label class="custom-control-label more-right" :for="'item'+index">{{ '..... ' + $t('labels.'+item.id)}}</label>
                </div>
              </template>
            </div>
          </div>
          <ul data-v-c588cb8e="" class="pagination">
            <li class="page-item" @click.prevent.stop="toFirstPage()"><a class="page-link">&lt;&lt;</a></li>
            <li class="page-item" @click.prevent.stop="backPage()"><a class="page-link">&lt;</a></li>
            <li :class="{'page-item': true, 'active': true}">
              <a class="page-link">{{currentPage + 1}}</a>
            </li>
            <li class="page-item" @click.prevent.stop="nextPage()"><a class="page-link">&gt;</a></li>
            <li class="page-item" @click.prevent.stop="toLastPage()"><a class="page-link">&gt;&gt;</a></li>
          </ul>
          <div class="dropdown ml-2" v-if="actions.length && $props.location === 'top'">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{$t('labels.actions')}}</button>

            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <a
                v-for="(item, index) in actions"
                :key="index"
                @click.prevent.stop="item.callback()"
                class="dropdown-item"
                href="#"
              >{{$t(item.label)}}</a>
            </div>
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
  .p-4 {
    padding:0!important;
  }
  .more-right {
    margin-left:-1em;
  }
  .d-flex {
    font-size: 0.9em!important;
    margin-bottom:0!important;
    padding-bottom:0!important;
  }
</style>
