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
  <div class="row m-1 tab-form-panel">
    <div class="col-md-12">

      <!--
        <div class="menu-w menu-position-top menu-layout-mini sub-menu-style-over searchBarWrapper col-md-6 mt-1 pb-4"
             v-if="relationCopy.relationCustomFields && relationCopy.relationCustomFields.length>0">
          <div class="element-search autosuggest-search-activator">
            <input class="searchBar" :placeholder="$t('labels.searchForContacts')" @input="searchContacts" type="text" v-model="searchString">
          </div>
        </div>
      -->

      <div class="d-flex justify-content-between mb-3" v-if="!editMode">
        <div class="p-1" style="width:50%">
          <input class="form-control" :placeholder="$t('labels.searchForContacts')" @input="searchContacts()" type="text" v-model="searchString">
        </div>
        <div class="p-2">
          <button tag="button" v-if="!editMode" data-toggle="modal" class="btn btn-primary float-right create-button" @click="addNewContact">
            <i class="fas fa-plus"/>  <span>{{$t('buttons.add')}}</span>
          </button>
        </div>
      </div>

      <div>
        <div class="pipeline-body text-left">
          <contact-widget :relation="relationCopy" @update="retrieveRelation" v-model="relationCopy.contactHistories" v-if="relationCopy && relationCopy.contactHistories && relationCopy.contactHistories.length > 0"/>
          <span v-else>{{$t('labels.noContactHistories')}}</span>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="ts" src="./contactHistoryTab.component.ts"></script>
<style>
  .searchBarWrapper:before{
    font-family: 'osfont' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    left: 22px;
    font-size: 16px;
    content: "\E92C";
    color: rgba(0, 0, 0, 0.4);
  }
  .pipeline-body {
    min-height: 100px;
    width: 100%;
  }
  .element-search{
    width: 100%!important;
    margin-left: 0px!important;
  }
  .searchBar{
    width: 100%!important;
    background: rgba(0, 0, 0, 0.2)!important;
    color: #fff;
    padding-left: 5%;
  }
  .searchBarWrapper{
    background: transparent;
    box-shadow: 0px 0px 0px 0px!important;
  }
</style>
