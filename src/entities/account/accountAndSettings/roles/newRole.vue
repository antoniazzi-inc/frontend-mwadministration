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
    <div class="row justify-content-center">
      <div class="col-10 text-left">
        <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
          <h2 v-if="toCopy" id="labels.copyLabel" v-text="$t('labels.copyRole')">copy a Role</h2>
          <h2 v-if="!role.id && !toCopy" id="labels.create" v-text="$t('labels.createRole')">Create a Role</h2>
          <h2 v-if="role.id && !toCopy" id="labels.edit" v-text="$t('labels.editRole')">Edit a Role</h2>
          <div>
            <div class="form-group">
              <label class="form-control-label" v-text="$t('labels.name')" for="role-name">Name</label>
              <input type="text" class="form-control" name="name" id="role-name"
                     :class="{'invalid': errors.has('name') }" v-model="role.name"  v-validate="'required'"/>
              <span class="text-danger small">{{errors.first('name')}}</span>
            </div>
            <div class="form-group">
              <label class="form-control-label" v-text="$t('labels.description')" for="role-description">Description</label>
              <input type="text" class="form-control" name="description" id="role-description"
                     :class="{'invalid': errors.has('description') }" v-model="role.description" />
              <span class="text-danger small">{{errors.first('labels.description')}}</span>
            </div>
            <div class="form-group">
              <label class="roles pull-left">{{$t('labels.selectAll')}}</label>
                <toggle-switch
                               :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="addAll">
                </toggle-switch>
            </div>
            <div :key="index" class="form-row" v-for="(item, index) in permissionsControl">
              <div :key="index" class="input-group">
                  <div class="row" style="min-width:100%;">
                    <div class="col-4" style="border-bottom:1px solid #d0d0d8; padding: 1em;">
                  <label>{{$t(`labels.${item.title}`)}}</label>
                    </div>
                    <div class="col-8" style="min-width:500px; border-bottom:1px solid #d0d0d8; padding: 1em;">

                    <template v-for="(permiss, k) in item.data">
                      <label :for="'per'+k" :key="k" class="roles pull-left">
                        <toggle-switch :id="'per'+k"
                                       :on-text="$t('labels.yes')"
                                       :off-text="$t('labels.no')"
                                       :value.sync="permissionsControl[index].data[k].selected">
                        </toggle-switch>
                        <span style="padding-left:1em;">{{permiss.title | lower }}</span>
                      </label>
                    </template>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div class="text-right" style="margin-top:2em; margin-bottom:1em;">
            <button type="button" id="cancel-save" class="btn btn-lg btn-secondary" @click="previousState()">
              <span v-text="$t('buttons.cancel')">Cancel</span>
            </button>
            <button type="submit" id="save-entity" class="btn btn-lg btn-primary ml-2">
              <span v-text="$t('buttons.save')">Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./newRole.component.ts"></script>
