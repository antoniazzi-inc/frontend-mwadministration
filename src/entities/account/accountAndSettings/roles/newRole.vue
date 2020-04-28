<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8 text-left">
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
            <div :key="index" class="form-row" v-for="(item, index) in permissionsControl">
              <div :key="index" class="input-group">
                <div class="form-group full-width">
                  <label class="col-md-12 control-label">
                    <h6> {{$t(`labels.${item.title}`)}} </h6>
                  </label>
                  <div class="col-md-12 lead">
                    <template v-for="(permiss, k) in item.data">
                      <label :for="'per'+k" :key="k" class="roles pull-left">
                        <toggle-switch :id="'per'+k"
                                       :on-text="$t('labels.yes')"
                                       :off-text="$t('labels.no')"
                                       :value.sync="permissionsControl[index].data[k].selected">
                        </toggle-switch>
                        <span>{{permiss.title }}</span>
                      </label>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button type="button" id="cancel-save" class="btn btn-secondary" @click="previousState()">
              <span v-text="$t('buttons.cancel')">Cancel</span>
            </button>
            <button type="submit" id="save-entity" class="btn btn-primary ml-2">
              <span v-text="$t('buttons.save')">Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./newRole.component.ts"></script>
