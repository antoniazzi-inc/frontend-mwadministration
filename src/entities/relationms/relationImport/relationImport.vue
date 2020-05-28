<template>
  <div class="page-wrapper-row full-height text-left">
    <div class="page-wrapper-middle">
      <div class="page-container">
        <div class="page-content-wrapper">
          <div class="page-head" v-show="step < 4">
            <div class="container-fluid fluid-small-margins">
              <div class="page-title">
                <h1 v-html="$t('labels.importRelations')"></h1>
                <p v-html="$t('labels.importFileTypeMessage')"></p>

              </div>
            </div>
          </div>
          <div class="page-content">
            <div class="container-fluid fluid-small-margins">
              <div class="page-content-inner">
                <div class="row justify-content-center" v-show="step < 4">
                  <div class="col-md-10">
                    <form-wizard @on-complete="onComplete"
                                 :title="''"
                                 :subtitle="''"
                                 shape="tab"
                                 color="#1c4cc3"
                                 @on-change ="changeTab"
                                 error-color="#ff4949">
                      <tab-content :title="$t('labels.uploadFile')" :before-change="validateStep" icon="fas fa-upload">
                        <div class="row">
                          <div class="col-md-5">
                          <div class="spinner-border text-primary" role="status" v-if="isUploading">
                            <span class="sr-only">Loading...</span>
                          </div>
                            <vueDropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                                         :duplicateCheck="true"
                                         @vdropzone-file-added="handleFile"
                                         @vdropzone-removed-file="handleRemove">
                            </vueDropzone>
                          </div>
                          <div class="col-md-7">
                            <div v-show="delimiterFields">
                              <div class="row">
                                <div class="col-xs-3">
                                  <label v-html="$t('labels.delimiter')"></label>
                                  <input type="text" class="form-control" v-model="csvDelimiter">
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-xs-3">
                                  <label v-html="$t('labels.escChar')"></label>
                                  <input type="text" class="form-control" v-model="csvEscChar">
                                </div>
                              </div>
                            </div>
                            <div class="row" v-if="hasHeaderField">
                              <div class="col-md-8">
                                <div class="mt-checkbox-inline">
                                  <span class="help-block" v-html="$t('labels.hasHeaderInfo')"></span><br/>
                                  <label class="mt-checkbox">
                                    <input type="checkbox" v-model="hasHeader"> {{$t('labels.hasHeaderChk')}}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </tab-content>
                      <tab-content :title="$t('labels.mapFields')" :before-change="validateStep"
                                   icon="fas fa-map-signs">
                        <div class="loader-import text-center justify-content-center align-items-center align-content-center" v-if="isProcessing">
                          <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>
                        <h3 v-html="$t('labels.handleRowColumnQuest')"></h3>
                        <p v-html="$t('labels.handleRowColumnQuestInfo')"></p>
                        <div style="width:99%; overflow: auto; overflow-y: hidden;" v-if="!vcfFile">
                          <div class="row" v-if="rows.length === 0 || isUploading">
                            <div class="col-md-12  text-center">
                              <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                              </div>
                            </div>
                          </div>

                          <table class="table table-bordered" v-if="rows.length > 0">
                            <tbody>
                            <template v-for="(row,index) in rows">
                              <tr :key="index" v-if="index < 1">
                                <td v-for="(cell, ind) in row" :key="ind">
                                  {{ cell }}
                                </td>
                              </tr>
                            </template>
                            </tbody>
                            <tfoot>
                            <tr>
                              <td v-for="(cell, index) in rows[0]" :key="index">
                                <select class="form-control" style="width:150px;" v-model="mappings[index].dbfield">
                                    <optgroup :label="$t('labels.fields')">
                                          <option :value="field.value" :key="ind" v-for="(field, ind) in dbfields">
                                            {{field.label}}
                                          </option>
                                    </optgroup>
                                    <optgroup :label="$t('labels.freeFieldsMenu')" v-if="allFreeFileds.length">
                                          <option :value="field1.value" :key="ind1+'_'" v-for="(field1, ind1) in allFreeFileds">
                                            {{field1.label}}
                                          </option>
                                    </optgroup>
                                </select>
                              </td>
                            </tr>
                            </tfoot>
                          </table>
                        </div>
                        <div class="row" style="margin-top:2em;">
                          <div class="col-md-12">
                            <h3 v-html="$t('labels.whatShouldWeDoWithEachImportedRel')"></h3>
                            <div class="row justify-content-center">
                              <div class="col-md-8">
                                <form class="form-horizontal" role="form" style="margin-top:2em">
                                  <div class="form-body">
                                    <div class="form-group row">
                                      <label class="col-md-4 control-label" v-html="$t('labels.addToGroup')"></label>
                                      <div class="col-md-8">
                                        <select class="form-control" v-model="existingGroup">
                                          <option :value="0" v-html="$t('labels.defaultGroup')"></option>
                                          <option v-for="(group, ind) in $store.state.lookups.groups" :value="group.id" :key="ind">
                                            {{group.label}}
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="form-group row">
                                      <label class="col-md-4 control-label"
                                             v-html="$t('labels.orAddToNewGroup')"></label>
                                      <div class="col-md-8">
                                        <input type="text" class="form-control" placeholder="Enter name of new group"
                                               v-model="newGroup" :disabled="existingGroup != 0 ? true : false">
                                      </div>
                                    </div>
                                    <div class="form-group row">
                                      <label class="col-md-4 control-label"
                                             v-html="$t('labels.relationExists')"></label>
                                      <div class="col-md-8">
                                        <div class="mt-checkbox-inline">
                                          <label class="mt-checkbox">
                                            <input type="checkbox" v-model="overwrite">
                                            {{$t('labels.overwriteData')}}
                                            <span> </span>
                                          </label><br/>
                                          <span class="help-block" v-html="$t('labels.importRelOverwriteData')"></span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="form-group row" v-if="overwrite">
                                      <label class="col-md-4 control-label"
                                             v-html="$t('labels.ifImportFieldsEmpty')"></label>
                                      <div class="col-md-8">
                                        <div class="mt-checkbox-inline">
                                          <label class="mt-checkbox">
                                            <input type="checkbox" v-model="insertEmptyValues">
                                            {{$t('labels.ifImportFieldsEmptyInfo')}}
                                            <span> </span>
                                          </label><br/>
                                          <span class="help-block" v-html="$t('labels.ifImportFieldsEmptyDesc')"></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </tab-content>
                      <tab-content :title="$t('labels.startImport')" :before-change="validateStep" icon="fas fa-file-import">
                        <p v-html="$t('labels.importInfo')"></p>
                        <div class="row" style="margin-top:2em;">
                          <div class="col-md-5 pre-scrollable">
                            <div class="well" v-for="(cardinfo, ind) in exampleCards" :key="ind">
                              <template v-for="(card, index) in cardinfo">
                              <dl :key="index">
                                <dt>{{card.label}}</dt>
                                <dd>{{card.value}} <v-gravatar v-if="card.label.toLowerCase() === 'email'" class="avatar-sm" :email="card.value" :size="50"></v-gravatar></dd>
                              </dl>
                              </template>
                            </div>
                          </div>
                          <div class="col-md-7">
                            <div class="row list-separated">
                              <div class="col-md-3 col-sm-3 col-xs-3 text-center">
                                <div class="font-grey-mint font-sm" v-html="$t('labels.rowsInFile')">rijen in bestand</div>
                                <div class="uppercase font-hg text-success impsumm">{{numRowsInFile}}</div>
                              </div>
                              <div class="col-md-3 col-sm-3 col-xs-3 text-center">
                                <div class="font-grey-mint font-sm" v-html="$t('labels.duplicates')"></div>
                                <div v-if="duplicateEmailsFound == 0" class="uppercase font-hg text-success impsumm">0</div>
                                <div v-else class="uppercase font-hg text-danger impsumm">{{duplicateEmailsFound}}</div>
                              </div>
                              <div class="col-md-3 col-sm-3 col-xs-3 text-center">
                                <div class="font-grey-mint font-sm" v-html="$t('labels.existing')"></div>
                                <div class="uppercase font-hg text-success impsumm">{{existingEmailsList.length}}</div>
                              </div>
                              <div class="col-md-3 col-sm-3 col-xs-3 text-center">
                                <div class="font-grey-mint font-sm" v-html="$t('labels.toBeImported')"></div>
                                <div class="uppercase font-hg text-success impsumm">{{calculateImport()}}</div>
                              </div>
                            </div>
                            <p style="margin: 1em;" v-if="newGroup!==''">{{$t("labels.newGroupInfo")}} {{newGroup}}.</p>
                            <br>
                            <div v-if="duplicateEmailsList.length > 0">
                              <div class="font-grey-mint font-sm" v-html="$t('labels.duplicateEmails')"></div>
                              <div style="background-color:#fafafa; overflow: hidden; margin-top:0.5em; height:80px;">
                                <ul class="list-group" style="overflow-y: scroll; margin:0.5em; height:100%">
                                  <li v-for="(duplicateEmail, ind) in duplicateEmailsList" :key="ind">{{duplicateEmail}}</li>
                                </ul>
                              </div>
                            </div>
                            <div v-if="existingEmailsList.length > 0" style="margin-top:2em;">
                              <div v-if="overwrite" class="font-grey-mint font-sm" v-html="$t('importrels_existing_emails')"></div>
                              <div v-if="!overwrite" class="font-grey-mint font-sm" v-html="$t('importrels_existing_emails_skip')"></div>
                              <div style="background-color:#fafafa; overflow: hidden; margin-top:0.5em; height:80px;">
                                <ul class="list-group" style="overflow-y: scroll; margin:0.5em; height:100%">
                                  <li v-for="(existingEmail, ind) in existingEmailsList" :key="ind">{{existingEmail}}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </tab-content>
                    </form-wizard>
                  </div>
                  <div class="col-md-2">
                    <div class="portlet light">
                      <div class="portlet-title">
                        <div class="caption">
                          <i class="caption-subject bold fa fa-tachometer font-blue-madison"> </i>
                          <span class="caption-subject bold font-blue-madison uppercase"
                                v-html="$t('labels.overviewInfo')"></span>
                        </div>
                      </div>
                      <div class="portlet-body">
                        <div id="importStatus">
                          <h4 class="first-status" v-html="$t('labels.file')">File</h4>
                          <p>{{filename()}}</p>
                          <h4 v-html="$t('labels.addToGroup')"></h4>
                          <p>{{selectedGroup()}}</p>
                          <h4 v-html="$t('labels.overwrite')"></h4>
                          <p>{{overwrite ? $t('labels.yes') : $t('labels.no')}}</p>
                          <h4 v-html="$t('labels.rows')"></h4>
                          <p>{{foundRows()}} {{$t('labels.rowsFound')}}</p>
                          <h4 v-if="duplicateEmailsFound > 0" v-html="$t('importrels_remarks')"></h4>
                          <p class="font-red-flamingo" v-if="duplicateEmailsFound > 0">{{duplicateEmailsFound}}
                            {{$t('importrels_duplicate_emails_found')}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row" v-show="step == 4">
                  <!--<div class="well well-large" style="padding-border:4em; padding-left:4em; margin:10em; border: solid 1px #d0d0d0; border-radius:4px; background: white">
                    <h2 v-html="$t('importrels_import_started')"></h2>
                    <p>{{$t("importrels_import_large_files_info")}}
                      <a href="/relations/list">{{$t("importrels_relation_overview_info")}}</a>.</p>
                  </div>-->
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
    font-size:4em;
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
    padding-top: 1em;
  }

  #importStatus h4.first-status {
    border: 0px;
    padding-top: 0em;
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
  .dz-progress{
    visibility: hidden!important;
  }
  .loader-import{
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(1,1,1,0.5);
    text-align: center;
    z-index: 999;
  }
  .avatar-sm{
    float: right;
  }
</style>
