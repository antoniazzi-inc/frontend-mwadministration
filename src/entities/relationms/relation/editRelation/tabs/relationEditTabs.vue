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
    <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item tab-nav" @click="currentTab = 'profile'">
        <a :class="{'nav-link': true, 'active': currentTab === 'profile'}" id="profile-tab" data-toggle="tab"
           href="#profile" role="tab" aria-controls="profile" aria-selected="true">{{$t('labels.profile')}}</a>
      </li>
      <li class="nav-item tab-nav" @click="currentTab = 'events'">
        <a :class="{'nav-link': true, 'active': currentTab === 'events'}" id="events-tab" data-toggle="tab"
           href="#events" role="tab" aria-controls="events" aria-selected="false">{{$t('labels.events')}}</a>
      </li>
      <li class="nav-item tab-nav" @click="currentTab = 'tasks'">
        <a :class="{'nav-link': true, 'active': currentTab === 'tasks'}" id="tasks-tab" data-toggle="tab"
           href="#tasks" role="tab" aria-controls="tasks" aria-selected="false">
          {{$t('labels.tasks')}}
        </a>
      </li>
      <li class="nav-item tab-nav" @click="currentTab = 'contactHistory'">
        <a :class="{'nav-link': true, 'active': currentTab === 'contactHistory'}" id="contactHistory-tab"
           data-toggle="tab" href="#contactHistory" role="tab" aria-controls="contactHistory" aria-selected="false">
          {{$t('labels.contactHistory')}}</a>
      </li>
      <li class="nav-item tab-nav" @click="currentTab = 'orders'">
        <a :class="{'nav-link': true, 'active': currentTab === 'orders'}" id="orders-tab" data-toggle="tab"
           href="#orders" role="tab" aria-controls="orders" aria-selected="false">{{$t('labels.orders')}}</a>
      </li>
    </ul>
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
<script type="ts" src="./relationEditTabs.component.ts"></script>
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
  .tasks-need-attention::after {
    content: " !!";
    background-color: red;
    color: white;
  }
</style>
