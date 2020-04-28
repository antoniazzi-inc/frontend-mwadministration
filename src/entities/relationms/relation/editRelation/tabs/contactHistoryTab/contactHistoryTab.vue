<template>
  <div class="row m-3">
    <div class="col-md-12">
      <div class="pipeline-header row">
        <h5 class="pipeline-name col-md-2 p-0 ml-3" style="line-height: 2">{{$t('labels.contacts')}}</h5>
        <div class="menu-w menu-position-top menu-layout-mini sub-menu-style-over searchBarWrapper col-md-6 mt-1 pb-4"
             v-if="relationCopy.relationCustomFields && relationCopy.relationCustomFields.length>0">
          <div class="element-search autosuggest-search-activator">
            <input class="searchBar" :placeholder="$t('labels.searchForContacts')" @input="searchContacts" type="text" v-model="searchString">
          </div>
        </div>
        <div class="col-md-3 text-right">
          <span @click="addNewContact" v-if="!editMode" class="btn btn-outline-primary" style="cursor: pointer">
            <i class="fa fa-plus"/>
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <hr/>
        </div>
      </div>
      <div class="pipeline white">
        <div class="pipeline-body text-left">
          <contact-widget :relation="relationCopy" @update="retrieveRelation" v-model="relationCopy.contactHistories"
                          v-if="relationCopy && relationCopy.contactHistories && relationCopy.contactHistories.length > 0"/>
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
