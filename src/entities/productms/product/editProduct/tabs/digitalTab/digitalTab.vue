<template>
  <div class="row text-left">
    <div class="element-wrapper col-md-9">
      <div class="element-box">
        <form>
          <div class="form-group" v-if="!uploadNewFile">
            <label class="form-control-label">{{$t('labels.url')}}</label>
            <input @blur="checkForHttp" type="url" v-validate="'url|required'"
                   :class="{'form-control': true, 'invalid':errors.has('url')}" name="url" v-model="digitalType.url"/>
            <small class="text-danger">{{errors.first('url')}}</small>
          </div>
          <div class="form-group">
            <label class="form-control-label">{{$t('labels.UploadNewFile')}}</label>
            <toggle-switch :on-text="$t('labels.yes')"
                           :off-text="$t('labels.no')"
                           :value.sync="uploadNewFile"></toggle-switch>
          </div>
          <div class="form-group" v-if="uploadNewFile">
            <label class="form-control-label">{{$t('labels.FileUpload')}}</label>
            <upload-widget v-if="clicked" ref="uploadDigital" :busy="isSaving" :config="uploadConfig"
                           @input="uploadFile"/>
          </div>
          <div class="form-group">
            <label class="form-control-label">{{$t('labels.emailSubject')}}</label>
            <input type="text" :class="{'form-control': true, 'invalid':errors.has('subject')}" name="subject"
                   v-model="digitalEmail.subject"/>
            <small class="text-danger" v-if="errors.has('subject')">{{errors.first('subject')}}</small>
          </div>
          <div class="form-group">
            <label class="form-control-label">{{$t('labels.sendFromEmail')}}</label>
            <input type="email" :class="{'form-control': true, 'invalid':errors.has('email from')}" name="email from" v-validate="'email'"
                   v-model="digitalEmail.sendFromAddress"/>
            <small class="text-danger"
                   v-if="errors.has('email from')">{{errors.first('email from')}}</small>
          </div>
          <div class="form-group">
            <label class="form-control-label">{{$t('labels.sendFromName')}}</label>
            <input type="text" class="form-control" v-model="digitalEmail.sendFromName"/>
          </div>
          <div class="form-group">
            <label class="form-control-label">{{$t('labels.emailReplayTo')}}</label>
            <input type="email" :class="{'form-control': true, 'invalid': errors.has('email to')}" name="email to"
                   v-model="digitalEmail.sendToAddress"/>
            <small class="text-danger"
                   v-if="errors.has('email to')">{{errors.first('email to')}}</small>
          </div>
          <div class="form-group">
            <label class="form-control-label">{{$t('labels.content')}}</label>
            <MultiLangHtmlEditorComponent :availableLangs="['en', 'nl']"
                                          :content.sync="digitalEmail.content"
                                          @contentChanged="updateEmailContent"></MultiLangHtmlEditorComponent>
          </div>
          <small class="text-danger" v-if="errorDigitalContent">{{$t('labels.notEmptyError')}}</small>
          <div class="form-group">
            <label class="form-control-label">{{$t('labels.SendEmailIfNotPaidYet')}}</label>
            <toggle-switch id="repeatSubscription"
                           :on-text="$t('labels.yes')"
                           :off-text="$t('labels.no')"
                           :value.sync="digitalType.notPaidDownload"></toggle-switch>
          </div>
          <div class="form-buttons-w text-right">
            <button class="btn btn-primary" @click.prevent="cancel">{{$t('buttons.cancel')}}</button>
            <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./digitalTab.component.ts"></script>
