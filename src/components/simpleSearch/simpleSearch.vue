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
  <div class="container-fluid" style="margin:0; padding:0;">
    <div class="row">
      <div class="col-sm-12">
        <form name="searchForm" class="form-inline" v-on:submit.prevent="search()">
          <div class="input-group w-100 mt-3">
            <input type="text" class="form-control" name="currentSearch"
                   v-bind:placeholder="$t('labels.search')"
                   v-model="simpleSearch" />
            <button type="button" class="btn btn-primary" v-on:click="search()">
              <i class="fa fa-search"></i>
            </button>
            <button type="button" id="clear-search" class="btn" v-on:click="clear()"
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
