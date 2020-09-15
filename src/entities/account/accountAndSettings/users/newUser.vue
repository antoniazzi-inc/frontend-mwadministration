<template>
  <div class="container-fluid">
    <div class="row text-left justify-content-center">

      <div class="col-6">
        <form name="editForm" class="search-banner" style="padding:1em;" role="form" @submit.prevent.stop="save()" v-if="userAccount">
          <h2 v-if="userAccount.id" v-text="$t('labels.editUser')"></h2>
          <h2 v-else v-text="$t('labels.createNewUser')"></h2>
          <div class="row">
            <div class="form-group col-md-6">
              <label class="form-control-label" v-text="$t('labels.username')"></label>
              <input type="text" class="form-control" name="login"
                     :class="{'invalid': errors.has('login') }"
                     v-model="userAccount.username" v-validate="'required|min:1|max:50'">
              <span class="text-danger small">{{errors.first('login')}}</span>
            </div>
            <div class="form-group col-md-6">
              <label class="form-control-label" for="email" v-text="$t('labels.email')">Email</label>
              <input type="email" class="form-control" id="email" @blur="checkEmail" name="email"
                     :placeholder="$t('labels.email')" :class="{'invalid': errors.has('email')}"
                     v-model="userAccount.email" v-validate="'required|email|min:5'">
              <span class="small text-danger">{{errors.first('email')}}</span>
            </div>
            <div class="form-group col-md-4">
              <label class="form-control-label" for="firstName" v-text="$t('labels.firstName')">First Name</label>
              <input type="text" class="form-control" id="firstName" name="firstName" :placeholder="$t('labels.firstName')"
                     :class="{'invalid':errors.hasOwnProperty('firstName') }"
                     v-model="userAccount.relationProfile.firstName" v-validate="'max:50'">
              <span class="text-danger small">{{errors.first('firstName')}}</span>
            </div>
            <div class="form-group col-md-4">
              <label class="form-control-label" for="middleName" v-text="$t('labels.middleName')"></label>
              <input type="text" class="form-control" id="middleName" name="middleName" :placeholder="$t('labels.middleName')"
                     :class="{'invalid':errors.hasOwnProperty('middleName') }"
                     v-model="userAccount.relationProfile.middleName" v-validate="'max:50'">
              <span class="text-danger small">{{errors.first('middleName')}}</span>
            </div>
            <div class="form-group col-md-4">
              <label class="form-control-label" for="lastName" v-text="$t('labels.lastName')"></label>
              <input type="text" class="form-control" id="lastName" name="lastName" :placeholder="$t('labels.lastName')"
                     :class="{'invalid':errors.hasOwnProperty('lastName') }"
                     v-model="userAccount.relationProfile.lastName" v-validate="'max:50'">
              <span class="text-danger small">{{errors.first('lastName')}}</span>
            </div>
            <div class="form-group col-md-12">
              <label class="control-label">{{$t('labels.roles')}}</label>
              <searchable-select-component :config="searchableConfig"
                                           :options="$store.state.lookups.roles"
                                           :value="selectedRoles"
                                           @onChange="roleChanged"
                                           @onDelete="roleRemoved"
              ></searchable-select-component>
            </div>
            <div class="form-group col-md-12">
              <label class="form-control-label" v-text="$t('labels.activated')">Activated</label>
              <toggle-switch :offText="$t('labels.no')" :onText="$t('labels.yes')" :value.sync="userAccount.enabled"></toggle-switch>
            </div>
            <div class="form-group col-md-12" v-if="userAccount.id">
              <label class="form-control-label" v-text="$t('labels.changePassword')"></label>
              <toggle-switch :offText="$t('labels.no')" :onText="$t('labels.yes')" :value.sync="changePassword"></toggle-switch>
            </div>
            <div class="form-group col-md-6" v-if="changePassword || !userAccount.id">
              <label class="form-control-label" v-text="$t('labels.password')" for="relation-password">Password</label>
              <input type="password" class="form-control" name="password" id="relation-password"
                     :class="{'invalid': errors.has('password') }" ref="password" v-model="userAccount.password" v-validate="'required|min:6'"/>
              <span class="text-danger small">{{errors.first('password')}}</span>
            </div>
            <div class="form-group col-md-6" v-if="changePassword || !userAccount.id">
              <label class="form-control-label" v-text="$t('labels.repeatPassword')" for="relation-repeat-password">repeat Password</label>
              <input type="password" class="form-control" name="repeatPassword" id="relation-repeat-password"
                     :class="{'invalid': errors.has('repeatPassword') }" v-model="repeatPassword" data-vv-as="password" v-validate="'required|confirmed:password'"/>
              <span class="text-danger small">{{errors.first('repeatPassword')}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-right">
            <button type="button" class="btn btn-lg btn-secondary" v-on:click="previousState()">
              <span v-text="$t('buttons.cancel')">Cancel</span>
            </button>
            <button type="submit" class="btn btn-lg btn-primary ml-2">
              <span v-text="$t('buttons.save')">Save</span>
            </button>
            </div>
          </div>
        </form>
      </div>


    <div class="col-6">
      <p>hier komt de inlog history</p>
    </div>

    </div>
  </div>
</template>
<script lang="ts" src="./newUser.component.ts"></script>
