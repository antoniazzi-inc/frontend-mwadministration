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
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span>{{$t('labels.accountAndSettings')}}</span>
    </h2>
    <ul class="nav nav-tabs mt-3" id="myTab" role="tablist">
      <li class="nav-item" @click="currentTab = 'account'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'account'}" id="account-tab" data-toggle="tab"
           href="#account" role="tab" aria-controls="account" aria-selected="true">{{$t('labels.account')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'invoices'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'invoices'}" id="invoices-tab" data-toggle="tab"
           href="#invoices" role="tab" aria-controls="invoices" aria-selected="true">{{$t('labels.invoices')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'users'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'users'}" id="users-tab" data-toggle="tab"
           href="#users" role="tab" aria-controls="users" aria-selected="true">{{$t('labels.users')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'roles'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'roles'}" id="roles-tab" data-toggle="tab"
           href="#roles" role="tab" aria-controls="roles" aria-selected="true">{{$t('labels.roles')}}</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div :class="{'tab-pane': true, active: currentTab === 'account'}" id="account" role="tabpanel" aria-labelledby="account-tab">
        <account-component :active="currentTab === 'account'"></account-component>
      </div>
      <div :class="{'tab-pane': true, active: currentTab === 'invoices'}" id="invoices" role="tabpanel" aria-labelledby="invoices-tab">
        <invoices-component :active="currentTab === 'invoices'"></invoices-component>
      </div>
      <div :class="{'tab-pane': true, active: currentTab === 'users'}" id="users" role="tabpanel" aria-labelledby="users-tab">
        <users-component :active="currentTab === 'users'"></users-component>
      </div>
      <div :class="{'tab-pane': true, active: currentTab === 'roles'}" id="roles" role="tabpanel" aria-labelledby="roles-tab">
        <roles-component :active="currentTab === 'roles'"></roles-component>
      </div>
    </div>

  </div>
</template>
<script src="./accountAndSettings.component.ts" lang="ts"></script>
