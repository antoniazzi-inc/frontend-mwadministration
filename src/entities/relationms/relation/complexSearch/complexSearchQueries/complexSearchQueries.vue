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
    <div>
        <div class="fixed-table-toolbar" style="height:50px;">
            <div class="pull-right search">
                <input class="form-control" type="text" v-model="filter" @keyup="dofilter" placeholder="Search" v-show="!confirmDelete">
            </div>
        </div>
        <div id="searchtable">
            <table class="table table-light table-hover gutter" v-show="!confirmDelete">
                <tr v-for="p in filteredprofiles" :key="p._id">
                    <td width="90%"><h4>{{p.name}}</h4><span class="text-muted">{{p.description}}</span></td>
                    <td><button class="btn blue-madison btn-sm" data-query="1" @click="doselect(p)"> Use </button></td>
                    <td><button class="btn red btn-sm" @click="askdelete(p)" > <i class="fa fa-times"></i> </button></td>
                </tr>
            </table>
            <div v-show="confirmDelete">
                <h3>{{$t('delete_it', { 0: profileToDelete.name})}} ?</h3>
                <p style="font-size:0.9em;">{{profileToDelete.description}}</p>
                <button @click="dodelete" class="btn blue-madison">Remove</button>
                <button @click="confirmDelete = false" class="btn">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./complexSearchQueries.component.ts">
</script>
<style scoped>

</style>
