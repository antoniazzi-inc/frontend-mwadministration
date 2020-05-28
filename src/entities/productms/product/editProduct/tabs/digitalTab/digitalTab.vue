<template>
    <div class="row">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <form>
                        <div class="form-group" v-if="!uploadNewFile">
                            <label class="form-control-label">{{$t('url')}}</label>
                            <input  @blur="checkForHttp" type="url" :class="{'form-control': true, 'invalid':$v.digitalType.url.$invalid}" v-model="digitalType.url"/>
                            <small class="text-danger" v-if="$v.digitalType.url.$invalid">{{$t('vueadminApp.productmsProduct.invalidUrl')}}</small>
                        </div>
                    <div class="form-group">
                        <label class="form-control-label">{{$t('UploadNewFile')}}</label>
                        <toggle-switch id="repeatSubscription"
                                       :on-text="$t('global.yes')"
                                       :off-text="$t('global.no')"
                                       :value.sync="uploadNewFile"></toggle-switch>
                    </div>
                        <div class="form-group" v-if="uploadNewFile">
                            <label class="form-control-label">{{$t('FileUpload')}}</label>
                            <upload-widget v-if="clicked" ref="uploadDigital" :busy="isSaving" :config="uploadConfig" @input="uploadFile"></upload-widget>
                        </div>
                    <div class="form-group">
                        <label class="form-control-label">{{$t('emailSubject')}}</label>
                        <input type="text" :class="{'form-control': true, 'invalid':$v.digitalEmail.subject.$invalid}" v-model="digitalEmail.subject"/>
                        <small class="text-danger" v-if="!$v.digitalEmail.subject.minLength">{{$t('vueadminApp.productmsProduct.notEmptyError')}}</small>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label">{{$t('sendFromEmail')}}</label>
                        <input type="email"  :class="{'form-control': true, 'invalid':$v.digitalEmail.sendFromAddress.$invalid}" v-model="digitalEmail.sendFromAddress"/>
                        <small class="text-danger" v-if="$v.digitalEmail.sendFromAddress.$invalid">{{$t('vueadminApp.productmsProduct.invalidMail')}}</small>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label">{{$t('sendFromName')}}</label>
                        <input type="text" class="form-control" v-model="digitalEmail.sendFromName"/>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label">{{$t('emailReplayTo')}}</label>
                        <input type="email" :class="{'form-control': true, 'invalid':$v.digitalEmail.sendToAddress.$invalid}" v-model="digitalEmail.sendToAddress"/>
                        <small class="text-danger" v-if="$v.digitalEmail.sendToAddress.$invalid">{{$t('vueadminApp.productmsProduct.invalidMail')}}</small>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label">{{$t('content')}}</label>
                        <MultiLangHtmlEditorComponent :class="{'invalid':$v.digitalEmail.content.$invalid}" :content.sync="digitalEmail.content" @contentChanged="updateEmailContent"></MultiLangHtmlEditorComponent>
                    </div>
                        <small class="text-danger" v-if="errorDigitalContent">{{$t('vueadminApp.productmsProduct.notEmptyError')}}</small>
                    <div class="form-group">
                        <label class="form-control-label">{{$t('SendEmailIfNotPaidYet')}}</label>
                        <toggle-switch id="repeatSubscription"
                                       :on-text="$t('global.yes')"
                                       :off-text="$t('global.no')"
                                       :value.sync="digitalType.notPaidDownload"></toggle-switch>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-primary" @click.prevent="cancel">{{$t('cancel')}}</button>
                        <button class="btn btn-primary" :disabled="$v.digitalEmail.$invalid || $v.digitalType.$invalid || errorDigitalContent" @click.prevent="save">{{$t('save')}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./digitalTab.component.ts"></script>
