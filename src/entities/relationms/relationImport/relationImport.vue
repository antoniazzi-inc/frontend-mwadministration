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
  <div class="page-wrapper-row full-height text-left">
    <div class="page-wrapper-middle">
      <div class="page-container">
        <div class="page-content-wrapper">
          <div class="page-head">
            <div class="container-fluid">
              <h2 id="page-heading" class="text-left mt-3">
                <span id="tag-heading">{{$t('labels.importRelations')}}</span>
                <router-link to="/relations" class="text-decoration-none text-white">
                  <button tag="button" class="btn btn-primary float-right create-tag">
                    <span>{{$t('labels.backToRelations')}}</span>
                  </button>
                </router-link>
              </h2>
              <p v-html="$t('labels.importFileTypeMessage')"></p>
            </div>
          </div>
          <div class="page-content">
            <div class="container-fluid fluid-small-margins">
              <div class="page-content-inner">
                <div class="row" v-if="isSaving">
                  <div
                    class="col-md-12 text-center loader-import justify-content-center align-content-center align-items-center">
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-md-10">
                    <div class="wizard-panel" style="margin-left:0">
                      <div class="row justify-content-center mt-3" v-if="isImporting">
                        <div class="col-md-6">
                          <h2 class="text-center">
                            {{$t('labels.importBusy')}}
                          </h2>
                        </div>
                      </div>
                      <form-wizard v-else @on-complete="onComplete"
                                   title=""
                                   subtitle=""
                                   shape="circle"
                                   color="#0a7cf8"
                                   @on-change="changeTab"
                                   :start-index="step"
                                   error-color="#ff4949">
                        <tab-content @click="step = 0" :title="$t('labels.uploadFile')" icon="fas fa-upload"
                                     :before-change="validateStep">
                          <step1 @onUpload="fileUploaded" @onRemove="fileRemoved" @updateConfig="updateStep1Config"/>
                        </tab-content>
                        <tab-content @click="step = 1" :title="$t('labels.mapFields')" icon="fas fa-map-signs"
                                     :before-change="validateStep">
                          <step2 :importFields="importFields"
                                 @changeInsertEmptyValues="changeInsertEmptyValues"
                                 @changeOverwrite="changeOverwrite"
                                 @onUpdateMappings="updateMappings"
                                 @groupChanged="groupChanged"
                                 @changeNewGroup="changeNewGroup"
                                 :headerRow="headerRow"
                                 :data="rows"/>
                          <span class="text-danger small"
                                v-if="hasEmailField === false">{{$t('labels.noEmailSelected')}}</span>
                        </tab-content>
                        <tab-content @click="step = 2" :title="$t('labels.startImport')" icon="fas fa-file-import"
                                     :before-change="validateStep">
                          <step3
                            :emailIndex="emailIndex"
                            :exampleCards="exampleCards"
                            :totalRows="rows.length"
                            :duplicateEmailsFound="duplicateEmailsFound"
                            :invalidEmails="invalidEmails"
                            :numberOfExisingEmails="numberOfExisingEmails"
                            :newGroup="newGroup"
                            :duplicateEmailsList="duplicateEmailsList"
                            :existingEmailsList="existingEmailsList"
                            :overwrite="overwrite"/>
                        </tab-content>
                        <button @click="stepBack" slot="prev" class="btn btn-primary btn-lg" :disabled="isSaving">
                          {{$t('buttons.back')}}
                        </button>
                        <button slot="next" class="btn btn-primary btn-lg" :disabled="isSaving">{{$t('buttons.next')}}
                        </button>
                        <button slot="finish" class="btn btn-primary btn-lg" :disabled="isSaving">
                          {{$t('buttons.finish')}}
                        </button>
                      </form-wizard>
                    </div>





                  </div>
                  <div class="col-md-2">
                    <div class="portlet light">
                      <div class="portlet-title">
                        <div class="portlet-body">
                          <div id="importStatus">
                            <h4 class="first-status" v-html="$t('labels.file')">File</h4>
                            <p>{{filename()}}</p>
                            <h4 v-html="$t('labels.addToGroup')"></h4>
                            <p>{{selectedGroup ? selectedGroup.label : newGroup}}</p>
                            <h4 v-html="$t('labels.overwrite')"></h4>
                            <p>{{overwrite ? $t('labels.yes') : $t('labels.no')}}</p>
                            <h4 v-html="$t('labels.rows')"></h4>
                            <p>{{foundRows()}}</p>
                            <h4 v-if="duplicateEmailsFound > 0" v-html="$t('labels.importrels_remarks')"></h4>
                            <p class="font-red-flamingo" v-if="duplicateEmailsFound > 0">{{duplicateEmailsFound}}
                              {{$t('labels.importrels_duplicate_emails_found')}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="tsx" lang="ts" src="./relationImport.component.ts"/>
<style>
  .impsumm {
    font-size: 4em;
  }

  #filedrop {
    width: 300px;
    height: 300px;
    margin: 2em;
    margin-left: 0em;
    border: dashed 4px #bbbbbb;
    background-color: #fcfcfc;
    border-radius: 16px;
  }

  #filedrop .fa-cloud-upload {
    padding-top: 1em;
    font-size: 5em;
  }

  #filedrop .dz-image {
    border-radius: 16px;
  }

  #filedrop .dz-progress {
    display: none;
  }

  #filedrop .dz-details {
    border-radius: 16px;
    text-align: center;
  }

  #filedrop .dz-remove {
    background-color: red;
    border-radius: 8px;
    position: relative;
    z-index: 999;
    margin-left: 50px;
    width: 100px;
  }

  #filedrop .dz-error-message {
    top: 225px;
    left: 30px;
  }

  #filedrop .dz-details i {
    float: right;
  }

  #filedrop .dz-preview .dz-error-mark i {
    margin: 20px 0 0 80px;
  }

  #importStatus h4 {
    border-top: 1px dashed #D0D0D0;
    width: 90%;
    text-transform: uppercase;
    padding-top: 1em;
    font-size: 1.0em;
    color: #909090;
  }

  #importStatus p {
    font-size: 1.2em;
    color: #202020;
  }

  #importStatus h4.first-status {
    border: 0px;
    padding-top: 2.4em;
  }

  .table-bordered td {
    background-color: #f8f8f8;
  }

  .well {
    background-color: lightgray;
    padding: 2%;
    margin-top: 2%;
  }

  .well dl {
    width: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0
  }

  .well dt {
    float: left;
    width: 40%;
    font-weight: bold;
    padding: 0;
    margin: 0
  }

  .well dd {
    float: left;
    width: 60%;
    padding: 0;
    margin: 0
  }

  .well .gravatar__profile {
    float: right;
    height: 50px;
  }

  .dz-progress {
    visibility: hidden !important;
  }

  .loader-import {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(1, 1, 1, 0.5);
    text-align: center;
    z-index: 999;
  }

  .avatar-sm {
    float: right;
  }
</style>
