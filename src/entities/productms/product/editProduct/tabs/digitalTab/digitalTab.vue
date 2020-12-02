<template>
  <div class="tab-form-panel">
    <form>

      <div class="form-row mt-3">
        <div class="col-md-6" style="padding-right: 3em;">

          <div class="form-row">
            <div class="form-group col-12">
              <label class="form-control-label">{{$t('labels.SendEmailIfNotPaidYet')}}</label>
              <toggle-switch id="repeatSubscription"
                 :on-text="$t('labels.yes')"
                 :off-text="$t('labels.no')"
                 :value.sync="digitalType.notPaidDownload"></toggle-switch>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-12">
              <label class="form-control-label">{{$t('labels.emailSubject')}}</label>
              <input type="text" :class="{'form-control': true, 'invalid':errors.has('subject')}" name="subject"
                     v-model="digitalEmail.subject"/>
              <small class="text-danger" v-if="errors.has('subject')">{{errors.first('subject')}}</small>
            </div>
          </div>

          <div class="form-row">
            <div class="col-auto col-4">
              <label class="form-control-label">{{$t('labels.sendFromEmail')}}</label>
              <input type="email" :class="{'form-control': true, 'invalid':errors.has('email from')}" name="email from" v-validate="'email'"
                     v-model="digitalEmail.sendFromAddress"/>
              <small class="text-danger"
                     v-if="errors.has('email from')">{{errors.first('email from')}}</small>
            </div>
            <div class="col-auto col-4">
              <label class="form-control-label">{{$t('labels.sendFromName')}}</label>
              <input type="text" class="form-control" v-model="digitalEmail.sendFromName"/>
            </div>
            <div class="col-auto col-4">
              <label class="form-control-label">{{$t('labels.emailReplayTo')}}</label>
              <input type="email" :class="{'form-control': true, 'invalid': errors.has('email to')}" name="email to"
                     v-model="digitalEmail.sendToAddress"/>
              <small class="text-danger"
                     v-if="errors.has('email to')">{{errors.first('email to')}}</small>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-12">
              <MultiLangHtmlEditorComponent :availableLangs="[]"
                :content.sync="digitalEmail.content"
                @contentChanged="updateEmailContent"></MultiLangHtmlEditorComponent>
              <small class="text-danger" v-if="errorDigitalContent">{{$t('labels.notEmptyError')}}</small>
            </div>
          </div>

        </div>

        <div class="col-md-6" style="padding-right: 2em;">
          <div class="form-row">
            <div class="form-group col-md-12"> <!-- v-if="!uploadNewFile"> -->
              <label class="form-control-label">{{$t('labels.url')}}</label>
              <input @blur="checkForHttp" type="url" v-validate="'url|required'" :class="{'form-control': true, 'invalid':errors.has('url')}" name="url" v-model="digitalType.url"/>
              <small class="text-danger">{{errors.first('url')}}</small>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-12">
              <label class="form-control-label">{{$t('labels.UploadNewFile')}}</label>
              <toggle-switch :on-text="$t('labels.yes')"
                 :off-text="$t('labels.no')"
                 :value.sync="uploadNewFile"></toggle-switch>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-12" v-if="uploadNewFile">
              <label class="form-control-label">{{$t('labels.FileUpload')}}</label>
              <upload-widget v-if="clicked" @onError="digitalUploadError" @newImageAdded="uploadFile" :all-files="allDigitalFiles" @onRemove="digitalRemove" :accept="'*/*'" :extensions="'pdf,xls,zip,rar'"/>
            </div>
          </div>
        </div>

      </div>

      <div class="form-buttons-w text-right mt-3">
        <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
        <button class="btn btn-primary" @click.prevent="cancel">{{$t('buttons.cancel')}}</button>
        <button class="btn btn-primary ml-2" @click.prevent="save">{{$t('buttons.save')}}</button>
      </div>

    </form>
  </div>
</template>
<script lang="ts" src="./digitalTab.component.ts"></script>
