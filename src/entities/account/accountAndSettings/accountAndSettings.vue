<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span>{{$t('labels.accountAndSettings')}}</span>
    </h2>
    <ul class="nav nav-tabs mt-3" id="myTab" role="tablist">
      <li :class="{'nav-item': true, active: currentTab === 'account'}" @click="currentTab='account'">
        <a class="nav-link" id="account-tab" data-toggle="tab"
           href="#account" role="tab" aria-selected="true">{{$t('labels.account')}}
        </a>
      </li>
      <li  :class="{'nav-item': true, active: currentTab === 'invoices'}" @click="currentTab='invoices'">
        <a class="nav-link" id="invoices-tab" data-toggle="tab"
           href="#invoices" role="tab" aria-controls="invoices"
           aria-selected="false">{{$t('labels.invoices')}}</a>
      </li>
      <li  :class="{'nav-item': true, active: currentTab === 'users'}" @click="currentTab='users'">
        <a class="nav-link" id="users-tab" data-toggle="tab" href="#users"
           role="tab"  aria-selected="false">{{$t('labels.users')}}</a>
      </li>
      <li  :class="{'nav-item': true, active: currentTab === 'roles'}" @click="currentTab='roles'">
        <a class="nav-link" id="roles-tab" data-toggle="tab" href="#roles"
           role="tab" aria-controls="roles" aria-selected="false">{{$t('labels.roles')}}</a>
      </li>
      <li  :class="{'nav-item': true, active: currentTab === 'integrations'}" @click="currentTab='integrations'">
        <a class="nav-link" id="integrations-tab" data-toggle="tab" href="#integrations" role="tab"
           aria-selected="false">{{$t('labels.integrations')}}</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
        <account-component :active="currentTab === 'account'"></account-component>
      </div>
      <div class="tab-pane fade" id="invoices" role="tabpanel" aria-labelledby="invoices-tab">
        <invoices-component :active="currentTab === 'invoices'"></invoices-component>
      </div>
      <div class="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
        <users-component :active="currentTab === 'users'"></users-component>
      </div>
      <div class="tab-pane fade" id="roles" role="tabpanel" aria-labelledby="roles-tab">
        <roles-component :active="currentTab === 'roles'"></roles-component>
      </div>
      <div class="tab-pane fade" id="integrations" role="tabpanel" aria-labelledby="integrations-tab">
        <integrations-component :active="currentTab === 'integrations'"></integrations-component>
      </div>
    </div>
  </div>
</template>
<script src="./accountAndSettings.component.ts" lang="ts"></script>
