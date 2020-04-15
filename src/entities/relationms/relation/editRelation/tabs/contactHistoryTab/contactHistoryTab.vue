<template>
  <div class="row m-3">
    <div class="col-md-12">
      <div class="pipeline-header row">
        <h5 class="pipeline-name col-md-2 p-0 ml-3" style="line-height: 2">{{$t('labels.contacts')}}</h5>
        <div class="searchBarWrapper col-md-6">
          <input id="searchContact" class="searchBarContacts" key="search" ref="searchContact"
                 :placeholder="$t('labels.searchForContacts')" @input="searchContacts" type="text" v-model="searchString">
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
  .searchBarContacts{
    background: rgba(0, 0, 0, 0.2)!important;
    color: #fff;
    border-radius: 30px;
    padding: 8px 15px 8px 40px;
    display: block;
    width: 220px;
    outline: none;
    border: none;
    box-shadow: none;
  }
  .searchBarWrapper:before{
    font-family: 'osfont' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    left: 22px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 16px;
    content: "\E92C";
    color: rgba(0, 0, 0, 0.4);
  }
  .searchBarWrapper{
    box-shadow: 0px 0px 0px 0px!important;
  }
  .pipeline-body {
    min-height: 100px;
    width: 100%;
  }
</style>
