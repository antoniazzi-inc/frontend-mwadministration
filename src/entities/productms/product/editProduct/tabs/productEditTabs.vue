<template>
  <div>
    <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" @click="currentTab = 'profile'">
        <a :class="{'nav-link': true, 'active': currentTab === 'profile'}" id="profile-tab" data-toggle="tab"
           href="#profile" role="tab" aria-controls="profile" aria-selected="true">{{$t('labels.profile')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'events'">
        <a :class="{'nav-link': true, 'active': currentTab === 'events'}" id="events-tab" data-toggle="tab"
           href="#events" role="tab" aria-controls="events" aria-selected="false">{{$t('labels.events')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'tasks'">
        <a :class="{'nav-link': true, 'active': currentTab === 'tasks'}" id="tasks-tab" data-toggle="tab"
           href="#tasks" role="tab" aria-controls="tasks" aria-selected="false">{{$t('labels.tasks')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'contactHistory'">
        <a :class="{'nav-link': true, 'active': currentTab === 'contactHistory'}" id="contactHistory-tab"
           data-toggle="tab" href="#contactHistory" role="tab" aria-controls="contactHistory" aria-selected="false">
          {{$t('labels.contactHistory')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'orders'">
        <a :class="{'nav-link': true, 'active': currentTab === 'orders'}" id="orders-tab" data-toggle="tab"
           href="#orders" role="tab" aria-controls="orders" aria-selected="false">{{$t('labels.orders')}}</a>
      </li>
    </ul>
      <button type="button" class="btn btn-link backToListBtn" @click="goBack">{{$t('buttons.backToList')}}</button>
    </div>
    <div class="tab-content">
      <div :class="{'tab-pane': true, 'active': currentTab === 'profile'}" id="profile" role="tabpanel"
           aria-labelledby="profile-tab">
        <profile-tab-component :relation="relation" :activeSubTab="currentSubTab" :active="currentTab === 'profile'"
        @update="updateRelation"></profile-tab-component>
      </div>
      <div :class="{'tab-pane': true, 'active': currentTab === 'events'}" id="events" role="tabpanel"
           aria-labelledby="events-tab">
        <events-tab-component :relation="relation" :active="currentTab === 'events'" @update="updateRelation"></events-tab-component>
      </div>
      <div :class="{'tab-pane': true, 'active': currentTab === 'tasks'}" id="tasks" role="tabpanel"
           aria-labelledby="tasks-tab">
        <tasks-tab-component :relation="relation" :active="currentTab === 'tasks'" @update="updateRelation"></tasks-tab-component>
      </div>
      <div :class="{'tab-pane': true, 'active': currentTab === 'contactHistory'}" id="contactHistory"
           role="tabpanel" aria-labelledby="contactHistory-tab">
        <contact-history-tab-component :rel="relation" :active="currentTab === 'contactHistory'" @update="updateRelation"></contact-history-tab-component>
      </div>
      <div :class="{'tab-pane': true, 'active': currentTab === 'orders'}" id="orders" role="tabpanel"
           aria-labelledby="orders-tab">
        <orders-tab-component :relation="relation" :active="currentTab === 'orders'" @update="updateRelation"></orders-tab-component>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="src/entities/productms/product/editProduct/tabs/productEditTabs.component.ts"></script>
<style scoped>
  .nav-item{
    display: table-cell;
    list-style-type: none;
    vertical-align: middle;
    /*margin left & right here fixed the issue! */
    margin-right: 16px;
    margin-left: 16px;
  }
  .backToListBtn{
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
