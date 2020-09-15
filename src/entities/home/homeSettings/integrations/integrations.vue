<template>
  <div class="container-fluid">

    <div class="d-flex justify-content-between mb-3 search-banner">
      <div class="p-2" style="width:70%">
        <simple-search @onSearch="searchIntegrations"></simple-search>
      </div>
      <div class="p-4">
        <button tag="button" data-toggle="modal" class="btn btn-primary float-right create-button" @click="newExternalSystem">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newIntegration')}}</span>
        </button>
      </div>
    </div>

    <div class="row text-left">
      <div class="col-md-6">


        <div class="table-responsive integration-table">
          <table class="table table-lightborder">
            <thead>
            <tr>
              <th>
                Name
              </th>
              <th class="text-center">
                Status
              </th>
              <th class="text-right">
                &nbsp;
              </th>
            </tr>
            </thead>
            <tbody>
            <template v-for="(item, ind) in allExternalSystems">
            <tr>
              <td>
                {{item.settingKey}}<br/>{{item.settingValueJson.externalSystemType}}
              </td>
              <td class="text-center">
                <div class="status-pill green" data-title="Available" data-toggle="tooltip" data-original-title="" title="" v-if="item.status == 'ACTIVE'"></div>
                <div class="status-pill red" data-title="Inactive" data-toggle="tooltip" data-original-title="" title="" v-if="item.status == 'INACTIVE'"></div>
                <div class="status-pill orange" data-title="Inactive" data-toggle="tooltip" data-original-title="" title="" v-if="item.status == 'TEST'"></div>
              </td>
              <td class="text-right">
                <div class="btn-group flex-btn-group-container text-center justify-content-center">
                  <div @click.prevent="editExternalSystem(item)" class="ml-3 text-primary cursor-pointer">
                    <i class="os-icon os-icon-ui-49"></i>
                  </div>
                  <div @click.prevent="setRemoveExternalSystem(item)" data-toggle="modal"
                       data-target="#deleteModal"
                       class="ml-3 text-primary cursor-pointer text-danger">
                    <i class="os-icon os-icon-ui-15"></i>
                  </div>
                </div>
              </td>
            </tr>
            </template>
            </tbody>
          </table>
        </div>







<!--
        <div id="accordion" v-if="allExternalSystems.length > 0">
          <template v-for="(item, ind) in allExternalSystems">
            <div class="card" :key="`${ind}_card`">
                <div class="card-header" :id="`#collapse_${ind}_heading`">
                  <h5 class="mb-0">
                    {{$t(item.settingKey)}}
                  </h5>
                  <div class="buttonsHolder">
                    <div @click.prevent="editExternalSystem(item)" class="ml-3 text-primary cursor-pointer">
                      <i class="os-icon os-icon-ui-49"></i>
                    </div>
                    <div @click.prevent="setRemoveExternalSystem(item)" data-toggle="modal"
                         data-target="#deleteModal"
                         class="ml-3 text-primary cursor-pointer text-danger">
                      <i class="os-icon os-icon-ui-15"></i>
                    </div>
                  </div>
                </div>
            </div>
          </template>
        </div>
        <h4 class="mt-5 pt-5" v-else>{{$t('labels.noIntegrations')}}</h4>
-->

      </div>

      <div class="modal" data-backdrop="static" data-keyboard="false" id="deleteModal" tabindex="-1" role="dialog" ref="deleteModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5>{{$t('labels.confirmDelete')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mt-4">
                <h5>{{$t('labels.areYouSureToDelete')}}</h5>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="removeConfirm">
                {{$t('buttons.confirm')}}
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
            </div>
          </div>
        </div>
      </div>


      <div class="col-md-6" v-if="editMode">
        <form @submit.prevent.stop="save()">
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="form-group text-left">
                <label v-text="$t('labels.externalSystems')"></label>
                <searchable-select-component :config="searchableConfig"
                                             :options="externalSystems"
                                             :value="selectedExternalSystem"
                                             @onChange="changeSelectedExternalSystems"
                                             @onSelected="selectSelectedExternalSystems"
                                             @onDelete="removeSelectedExternalSystems"
                ></searchable-select-component>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group text-left">
                <label v-text="$t('labels.instanceName')"></label>
                <input :class="{'form-control': true, invalid : errors.has('external-system-id')}"
                       name="external-system-id" type="text" v-validate="'required'"
                       v-model="externalSystemToEdit.settingKey"/>
                <span class="text-danger small">{{errors.first('external-system-id')}}</span>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label v-text="$t('labels.status')"></label>
              <select v-validate="'required'" name="status" :class="{'form-control': true, invalid: errors.has('status')}"
                      v-model="externalSystemToEdit.status">
                <option :value="externalSystemType.active">{{$t('labels.' + externalSystemType.active.toLowerCase())}}
                </option>
                <option :value="externalSystemType.inactive">{{$t('labels.' +
                  externalSystemType.inactive.toLowerCase())}}
                </option>
                <option :value="externalSystemType.test">{{$t('labels.' + externalSystemType.test.toLowerCase())}}
                </option>
              </select>
              <span class="text-danger small">{{errors.first('status')}}</span>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <p>This is dummy help text that needs to be changed depending on selected External System
                {{selectedExternalSystem ? selectedExternalSystem.type : ''}}</p>
            </div>
          </div>
          <div v-if="selectedExternalSystem && selectedExternalSystem.type">
            <div class="row mt-3"
                 v-if="selectedExternalSystem.type !== 'api' && selectedExternalSystem.type !== 'zapier'">
              <div class="col-md-12">
                <label v-text="$t('labels.class')"></label>
                <input :class="{'form-control': true, invalid : errors.has('class')}"
                       name="class" type="text" v-model="settingsJSON.class"/>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'optimizemember' ||
            selectedExternalSystem.type === 'wishlistmember' ||
            selectedExternalSystem.type === 'anewspring'||
            selectedExternalSystem.type === 'webhook'||
            selectedExternalSystem.type === 'learndash'">
              <div class="col-md-12">
                <label v-text="$t('labels.url')"></label>
                <input @blur="validateUrl('url', settingsJSON.url)" :class="{'form-control': true, invalid : errors.has('url')}"
                       name="url" type="url" v-validate="{url: {require_protocol: false }}" v-model="settingsJSON.url"/>
                <span class="text-danger small">{{errors.first('url')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'optimizemember' ||
              selectedExternalSystem.type === 'wishlistmember' ||
              selectedExternalSystem.type === 'api' ||
              selectedExternalSystem.type === 'anewspring' ||
              selectedExternalSystem.type === 'learndash'">
              <div class="col-md-12">
                <label v-text="$t('labels.key')"></label>
                <input :class="{'form-control': true, invalid : errors.has('key')}"
                       name="key" type="text" v-model="settingsJSON.key"/>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'optimizemember' ||
              selectedExternalSystem.type === 'wishlistmember'">
              <div class="col-md-12">
                <label v-text="$t('labels.level')"></label>
                <input :class="{'form-control': true, invalid : errors.has('level')}"
                       name="level" type="number" v-validate="'min_value:0'" v-model="settingsJSON.level"/>
                <span class="text-danger small">{{errors.first('level')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'optimizemember'">
              <div class="col-md-12">
                <label v-text="$t('labels.addpack')"></label>
                <input :class="{'form-control': true, invalid : errors.has('addpack')}"
                       name="addpack" type="text" v-validate="''" v-model="settingsJSON.addpack"/>
                <span class="text-danger small">{{errors.first('addpack')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'optimizemember'">
              <div class="col-md-12">
                <label v-text="$t('labels.delpack')"></label>
                <input :class="{'form-control': true, invalid : errors.has('delpack')}"
                       name="delpack" type="text" v-validate="''" v-model="settingsJSON.delpack"/>
                <span class="text-danger small">{{errors.first('delpack')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'optimizemember' ||
            selectedExternalSystem.type === 'wishlistmember' ||
            selectedExternalSystem.type === 'learndash'">
              <div class="col-md-12">
                <label v-text="$t('labels.cmd')"></label>
                <input :class="{'form-control': true, invalid : errors.has('cmd')}"
                       name="cmd" type="text" v-validate="''" v-model="settingsJSON.cmd"/>
                <span class="text-danger small">{{errors.first('cmd')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'optimizemember'">
              <div class="col-md-12">
                <label v-text="$t('labels.force')"></label>
                <input :class="{'form-control': true, invalid : errors.has('force')}"
                       name="force" type="text" v-validate="''" v-model="settingsJSON.force"/>
                <span class="text-danger small">{{errors.first('force')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'optimizemember' ||
            selectedExternalSystem.type === 'wishlistmember' ||
            selectedExternalSystem.type === 'voucher_provider' ||
            selectedExternalSystem.type === 'learndash'">
              <div class="col-md-12">
                <label v-text="$t('labels.email')"></label>
                <input :class="{'form-control': true, invalid : errors.has('email')}"
                       name="email" type="email" v-validate="'email'" v-model="settingsJSON.email"/>
                <span class="text-danger small">{{errors.first('email')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'wishlistmember'">
              <div class="col-md-12">
                <label v-text="$t('labels.get')"></label>
                <input :class="{'form-control': true, invalid : errors.has('get')}"
                       name="get" type="text" v-validate="''" v-model="settingsJSON.get"/>
                <span class="text-danger small">{{errors.first('get')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'zapier'">
              <div class="col-md-12">
                <label v-text="$t('labels.account')"></label>
                <input :class="{'form-control': true, invalid : errors.has('account')}"
                       name="account" type="text" v-validate="''" v-model="settingsJSON.account"/>
                <span class="text-danger small">{{errors.first('account')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'api'">
              <div class="col-md-12">
                <label v-text="$t('labels.version')"></label>
                <input :class="{'form-control': true, invalid : errors.has('version')}"
                       name="version" type="text" v-validate="''" v-model="settingsJSON.version"/>
                <span class="text-danger small">{{errors.first('version')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'api'">
              <div class="col-md-12">
                <label v-text="$t('labels.blacklist')"></label>
                <input :class="{'form-control': true, invalid : errors.has('blacklist')}"
                       name="blacklist" type="text" v-validate="''" v-model="settingsJSON.blacklist"/>
                <span class="text-danger small">{{errors.first('blacklist')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'moneybird'">
              <div class="col-md-12">
                <label v-text="$t('labels.credentials')"></label>
                <input :class="{'form-control': true, invalid : errors.has('credentials')}"
                       name="credentials" type="text" v-validate="''" v-model="settingsJSON.credentials"/>
                <span class="text-danger small">{{errors.first('credentials')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'scanlaser' ||
              selectedExternalSystem.type === 'salesforce'">
              <div class="col-md-12">
                <label v-text="$t('labels.ftpUrl')"></label>
                <input @blur="validateUrl('ftpUrl', settingsJSON.url)" :class="{'form-control': true, invalid : errors.has('ftpUrl')}"
                       name="ftpUrl" type="url" v-validate="{url: {require_protocol: false }}"
                       v-model="settingsJSON.ftpUrl"/>
                <span class="text-danger small">{{errors.first('ftpUrl')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'scanlaser' ||
              selectedExternalSystem.type === 'salesforce'">
              <div class="col-md-12">
                <label v-text="$t('labels.ftpUid')"></label>
                <input :class="{'form-control': true, invalid : errors.has('ftpUid')}"
                       name="ftpUid" type="text" v-validate="''" v-model="settingsJSON.ftpUid"/>
                <span class="text-danger small">{{errors.first('ftpUid')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'scanlaser' ||
              selectedExternalSystem.type === 'salesforce'">
              <div class="col-md-12">
                <label v-text="$t('labels.ftpPwd')"></label>
                <input :class="{'form-control': true, invalid : errors.has('ftpPwd')}"
                       name="ftpPwd" type="text" v-validate="''" v-model="settingsJSON.ftpPwd"/>
                <span class="text-danger small">{{errors.first('ftpPwd')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'scanlaser'">
              <div class="col-md-12">
                <label v-text="$t('labels.klantnr')"></label>
                <input :class="{'form-control': true, invalid : errors.has('klantnr')}"
                       name="klantnr" type="text" v-validate="'klantnr'" v-model="settingsJSON.klantnr"/>
                <span class="text-danger small">{{errors.first('klantnr')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'scanlaser'">
              <div class="col-md-12">
                <label v-text="$t('labels.user')"></label>
                <input :class="{'form-control': true, invalid : errors.has('user')}"
                       name="user" type="text" v-validate="''" v-model="settingsJSON.user"/>
                <span class="text-danger small">{{errors.first('user')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'scanlaser'">
              <div class="col-md-12">
                <label v-text="$t('labels.password')"></label>
                <input :class="{'form-control': true, invalid : errors.has('password')}"
                       name="password" type="text" v-validate="''" v-model="settingsJSON.password"/>
                <span class="text-danger small">{{errors.first('password')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'scanlaser'">
              <div class="col-md-12">
                <label v-text="$t('labels.carrierdeb')"></label>
                <input :class="{'form-control': true, invalid : errors.has('carrierdeb')}"
                       name="carrierdeb" type="text" v-validate="''" v-model="settingsJSON.carrierdeb"/>
                <span class="text-danger small">{{errors.first('carrierdeb')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'scanlaser'">
              <div class="col-md-12">
                <label v-text="$t('labels.carrierid')"></label>
                <input :class="{'form-control': true, invalid : errors.has('carrierid')}"
                       name="carrierid" type="text" v-validate="''" v-model="settingsJSON.carrierid"/>
                <span class="text-danger small">{{errors.first('carrierid')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'scanlaser'">
              <div class="col-md-12">
                <label v-text="$t('labels.logoref')"></label>
                <input :class="{'form-control': true, invalid : errors.has('logoref')}"
                       name="logoref" type="text" v-validate="''" v-model="settingsJSON.logoref"/>
                <span class="text-danger small">{{errors.first('logoref')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'dwcconnect'">
              <div class="col-md-12">
                <label v-text="$t('labels.ftp')"></label>
                <input :class="{'form-control': true, invalid : errors.has('ftp')}"
                       name="ftp" type="text" v-validate="''" v-model="settingsJSON.ftp"/>
                <span class="text-danger small">{{errors.first('ftp')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'dwcconnect'">
              <div class="col-md-12">
                <label v-text="$t('labels.uid')"></label>
                <input :class="{'form-control': true, invalid : errors.has('uid')}"
                       name="uid" type="text" v-validate="''" v-model="settingsJSON.uid"/>
                <span class="text-danger small">{{errors.first('uid')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'dwcconnect'">
              <div class="col-md-12">
                <label v-text="$t('labels.pwd')"></label>
                <input :class="{'form-control': true, invalid : errors.has('pwd')}"
                       name="pwd" type="text" v-validate="''" v-model="settingsJSON.pwd"/>
                <span class="text-danger small">{{errors.first('pwd')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'dwcconnect'">
              <div class="col-md-12">
                <label v-text="$t('labels.port')"></label>
                <input :class="{'form-control': true, invalid : errors.has('port')}"
                       name="port" type="text" v-validate="''" v-model="settingsJSON.port"/>
                <span class="text-danger small">{{errors.first('port')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'dwcconnect'">
              <div class="col-md-12">
                <label v-text="$t('labels.senderid')"></label>
                <input :class="{'form-control': true, invalid : errors.has('senderid')}"
                       name="senderid" type="text" v-validate="''" v-model="settingsJSON.senderid"/>
                <span class="text-danger small">{{errors.first('senderid')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'anewspring' ||
              selectedExternalSystem.type === 'learndash'">
              <div class="col-md-12">
                <label v-text="$t('labels.course')"></label>
                <input :class="{'form-control': true, invalid : errors.has('course')}"
                       name="course" type="text" v-validate="''" v-model="settingsJSON.course"/>
                <span class="text-danger small">{{errors.first('course')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'courseflow'">
              <div class="col-md-12">
                <label v-text="$t('labels.host')"></label>
                <input :class="{'form-control': true, invalid : errors.has('host')}"
                       name="host" type="text" v-validate="''" v-model="settingsJSON.host"/>
                <span class="text-danger small">{{errors.first('host')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'courseflow'">
              <div class="col-md-12">
                <label v-text="$t('labels.flow')"></label>
                <input :class="{'form-control': true, invalid : errors.has('flow')}"
                       name="flow" type="text" v-validate="''" v-model="settingsJSON.flow"/>
                <span class="text-danger small">{{errors.first('flow')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'courseflow'">
              <div class="col-md-12">
                <label v-text="$t('labels.api')"></label>
                <input :class="{'form-control': true, invalid : errors.has('api')}"
                       name="api" type="text" v-validate="''" v-model="settingsJSON.api"/>
                <span class="text-danger small">{{errors.first('api')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'webhook'">
              <div class="col-md-12">
                <label v-text="$t('labels.method')"></label>
                <input :class="{'form-control': true, invalid : errors.has('method')}"
                       name="method" type="text" v-validate="''" v-model="settingsJSON.method"/>
                <span class="text-danger small">{{errors.first('method')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'webhook'">
              <div class="col-md-12">
                <label v-text="$t('labels.headers')"></label>
                <input :class="{'form-control': true, invalid : errors.has('headers')}"
                       name="headers" type="text" v-validate="''" v-model="settingsJSON.headers"/>
                <span class="text-danger small">{{errors.first('headers')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'webhook'">
              <div class="col-md-12">
                <label v-text="$t('labels.body')"></label>
                <input :class="{'form-control': true, invalid : errors.has('body')}"
                       name="body" type="text" v-validate="''" v-model="settingsJSON.body"/>
                <span class="text-danger small">{{errors.first('body')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'voucher_provider'">
              <div class="col-md-12">
                <label v-text="$t('labels.threshold')"></label>
                <input :class="{'form-control': true, invalid : errors.has('threshold')}"
                       name="threshold" type="text" v-validate="''" v-model="settingsJSON.threshold"/>
                <span class="text-danger small">{{errors.first('threshold')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'kajabi'">
              <div class="col-md-12">
                <label v-text="$t('labels.activate')"></label>
                <input :class="{'form-control': true, invalid : errors.has('activate')}"
                       name="activate" type="text" v-validate="''" v-model="settingsJSON.activate"/>
                <span class="text-danger small">{{errors.first('activate')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'kajabi'">
              <div class="col-md-12">
                <label v-text="$t('labels.deactivate')"></label>
                <input :class="{'form-control': true, invalid : errors.has('deactivate')}"
                       name="deactivate" type="text" v-validate="''" v-model="settingsJSON.deactivate"/>
                <span class="text-danger small">{{errors.first('deactivate')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'eboekhouden'">
              <div class="col-md-12">
                <label v-text="$t('labels.security1')"></label>
                <input :class="{'form-control': true, invalid : errors.has('security1')}"
                       name="security1" type="text" v-validate="''" v-model="settingsJSON.security1"/>
                <span class="text-danger small">{{errors.first('security1')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'eboekhouden'">
              <div class="col-md-12">
                <label v-text="$t('labels.security2')"></label>
                <input :class="{'form-control': true, invalid : errors.has('security2')}"
                       name="security2" type="text" v-validate="''" v-model="settingsJSON.security2"/>
                <span class="text-danger small">{{errors.first('security2')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'eboekhouden'">
              <div class="col-md-12">
                <label v-text="$t('labels.username')"></label>
                <input :class="{'form-control': true, invalid : errors.has('username')}"
                       name="username" type="text" v-validate="''" v-model="settingsJSON.username"/>
                <span class="text-danger small">{{errors.first('username')}}</span>
              </div>
            </div>
            <div class="row mt-3" v-if="selectedExternalSystem.type === 'salesforce'">
              <div class="col-md-12">
                <label v-text="$t('labels.filename')"></label>
                <input :class="{'form-control': true, invalid : errors.has('filename')}"
                       name="filename" type="text" v-validate="''" v-model="settingsJSON.filename"/>
                <span class="text-danger small">{{errors.first('filename')}}</span>
              </div>
            </div>
          </div>
          <div class="row text-right mt-4 mb-4">
            <div class="col-md-12">
              <button type="button" id="cancel-save" class="btn btn-secondary mr-2" v-on:click="cancel()">
                <span v-text="$t('buttons.cancel')">Cancel</span>
              </button>
              <button type="submit" id="save-entity" class="btn btn-primary ml-2">
                <span v-text="$t('buttons.save')">Save</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./integrations.component.ts"></script>

<style scoped>

  .integration-table {
    margin-top: 1em;
    margin-right: 2em;
    background-color: #fff;
    padding: 1em;
    border-radius: 6px;
    border: 1px solid #e0e0e9;
  }
</style>
