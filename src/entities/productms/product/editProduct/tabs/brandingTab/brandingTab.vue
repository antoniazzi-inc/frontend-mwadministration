<template>
    <div class="row">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <b-modal ref="removeEntityImage" id="removeEntityImage" >
                    <span slot="modal-title"><span id="vueadminApp.productmsMedia.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
                    <div class="mt-4">
                        <p id="jhi-delete-image-heading" v-bind:title="$t('vueadminApp.productmsMedia.delete.question')">Are you sure you want to delete this image?</p>
                    </div>
                    <div slot="modal-footer">
                        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                        <button type="button" class="btn btn-primary" id="jhi-confirm-delete-image" v-text="$t('entity.action.delete')" v-on:click="removeImage">Delete</button>
                    </div>
                </b-modal>

                <b-tabs v-model="tabIndex">
                    <b-tab ref="general" @click="tabIndex=0" :title="$t('branding.tabGeneral')" active title-link-class="mb-3">
                        <form>
                            <div class="row mt-4">
                                <div class="form-group col-md-6">
                                    <label class="form-control-label">{{$t('branding.salesPageUrl')}}</label>
                                    <input @blur="checkForHttp" type="url" :class="{'form-control':true, valid: !$v.salesPageUrl.$invalid, invalid: $v.salesPageUrl.$invalid}" v-model="salesPageUrl"/>
                                    <small class="text-danger" v-if="$v.salesPageUrl.$invalid">{{$t('productmsProduct.enterValidUrl')}}</small>
                                    <small class="text-danger" v-if="$v.salesPageUrl.$invalid">{{$t('productmsProduct.MustIncludeHttp')}}</small>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="form-control-label">{{$t('vueadminApp.productmsProduct.selectInvoiceTemplate')}}</label>
                                    <single-select
                                        ref="companySelect"
                                        :options="allInvoiceTemplates"
                                        :config="singleSelectConfig"
                                        :value.sync="selectedInvoiceTemplate"
                                        @onRemove="removeInvoiceTemplate"
                                        @onAddNew="addInvoiceTemplate"></single-select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-12">
                                    <label class="form-control-label">{{$t('branding.backToCallingPage')}}</label>
                                    <toggle-switch :on-text="$t('labels.yes')"
                                                   :off-text="$t('labels.no')"
                                                   :value.sync="backToCallingPage"></toggle-switch>
                                </div>
                            </div>
                            <div class="form-buttons-w text-right">
                                <button class="btn btn-primary" @click.prevent="save">{{$t('entity.action.save')}}</button>
                            </div>
                        </form>
                    </b-tab>
                    <b-tab ref="upsell1"  @click="tabIndex=1" :title="$t('branding.tabUSP')" title-link-class="mb-3">
                        <form>
                                <div class="form-group mt-4">
                                    <label class="form-control-label">{{$t('branding.tabUSP')}}</label>
                                    <trumbowyg v-model="upsellCart1" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
                                </div>
                            <div class="form-buttons-w text-right">
                                <button class="btn btn-primary" @click.prevent="save">{{$t('entity.action.save')}}</button>
                            </div>
                        </form>
                    </b-tab>
                    <b-tab ref="upsell2"  @click="tabIndex=2" :title="$t('branding.tabTestimonials')" title-link-class="mb-3">
                        <form>
                            <div class="form-group mt-4">
                                <label class="form-control-label">{{$t('branding.tabTestimonials')}}</label>
                                <trumbowyg v-model="upsellCart2" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
                            </div>
                            <div class="form-buttons-w text-right">
                                <button class="btn btn-primary" @click.prevent="save">{{$t('entity.action.save')}}</button>
                            </div>
                        </form>
                    </b-tab>
                    <b-tab ref="upsell3"  @click="tabIndex=3" :title="$t('branding.tabDiscounts')" title-link-class="mb-3">
                        <form>
                            <div class="form-group mt-4">
                                <label class="form-control-label">{{$t('branding.tabDiscounts')}}</label>
                                <trumbowyg v-model="upsellCart3" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
                            </div>
                            <div class="form-buttons-w text-right">
                                <button class="btn btn-primary" @click.prevent="save">{{$t('entity.action.save')}}</button>
                            </div>
                        </form>
                    </b-tab>
                    <b-tab ref="relFields"  @click="tabIndex=4" :title="$t('branding.tabSuggestions')" title-link-class="mb-3">
                        <form>
                            <div class="form-group mt-4">
                                <label class="form-control-label">{{$t('branding.tabSuggestions')}}</label>
                                <trumbowyg v-model="checkoutUpsell" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
                            </div>
                            <div class="form-buttons-w text-right">
                                <button class="btn btn-primary" @click.prevent="save">{{$t('entity.action.save')}}</button>
                            </div>
                        </form>
                    </b-tab>
                    <b-tab ref="thankyou"  @click="tabIndex=5" :title="$t('branding.tabThankyou')" title-link-class="mb-3">
                        <form>
                            <div class="form-group mt-4">
                                <label class="form-control-label">{{$t('branding.thankYouRedirect')}}</label>
                                <input type="text" class="form-control" v-model="thankYouRedirect"/>
                            </div>
                            <div class="form-group">
                                <label class="form-control-label">{{$t('branding.thankYouContent')}}</label>
                                <trumbowyg v-model="thankYouContent" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
                            </div>
                            <div class="form-buttons-w text-right">
                                <button class="btn btn-primary" @click.prevent="save">{{$t('entity.action.save')}}</button>
                            </div>
                        </form>
                    </b-tab>
                    <b-tab ref="thankyou"  @click="tabIndex=6" :title="$t('branding.tabSocialAff')" title-link-class="mb-3">
                        <form>
                            <div class="form-group">
                                <label class="form-control-label">{{$t('branding.tabSocialAff')}}</label>
                                <trumbowyg v-model="socialAffiliates" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
                            </div>
                            <div class="form-buttons-w text-right">
                                <button class="btn btn-primary" @click.prevent="save">{{$t('entity.action.save')}}</button>
                            </div>
                        </form>
                    </b-tab>
                    <b-tab ref="branding" @click="tabIndex=7" :title="$t('branding.images')" title-link-class="mb-3">
                            <div class="row">
                                <div class="form-group mt-4 col-md-12">
                                    <button type="button" class="btn btn-outline-primary" @click="loadImageGallery(false)">{{$t('branding.uploadOrChooseImages')}}</button>
                                    <!--<upload-widget :busy="isSaving" v-if="clicked" ref="uploadGallery" @loadMediaLibrary="loadImageGallery" :config="uploadConfigBranding" @updateEl="editImages" @input="uploadImgGallery"></upload-widget>-->
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group mt-3 col-md-12">

                                    <div class="row">
                                        <template v-for="(item, index) in productCopy.media">
                                            <div data-toggle="tooltip" data-placement="right" :title="item.name" :class="{'media-thumb cursor-pointer': true}"  :key="index">
                                                <div v-b-modal.editImageUploaded @click.prevent.stop="editImage(item, index)" :class="{'image-holder': true}" :alt="item.name" :style="{background: 'url('+createImageUrl(item)+')'}">
                                                </div>
                                                <div :class="{'image-info text-center': true}">
                                                    <div class="name">
                                                        <span>{{item.name}}</span>
                                                    </div>
                                                    <span class="size">{{item.size}}</span>
                                                </div>
                                            <b-button-close class="deleteImage" v-b-modal.removeEntityImage @click.prevent="prepareRemoveImage(item)"></b-button-close>
                                            </div>
                                        </template>
                                        <template v-for="(item, index) in imagesToResize">
                                            <div data-toggle="tooltip" data-placement="right" :title="item.name" :class="{'media-thumb cursor-pointer': true}"  :key="index + 'new'">
                                                <div v-b-modal.editImageUploaded @click.prevent.stop="editImage(item, index)" :class="{'image-holder': true}" :alt="item.name" :style="{background: 'url('+createImageUrl(item)+')'}">
                                                </div>
                                                <div :class="{'image-info text-center': true}">
                                                    <div class="name">
                                                        <span>{{item.name}}</span>
                                                    </div>
                                                    <span class="size">{{item.size}}</span>
                                                </div>
                                            <b-button-close class="deleteImage" v-b-modal.removeEntityImage @click.prevent="prepareRemoveImage(item, index)"></b-button-close>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="form-buttons-w text-right">
                                <button class="btn btn-primary" @click.prevent="saveMedia" :disabled="isSaving">{{$t('entity.action.save')}}</button>
                            </div>
                    </b-tab>
                </b-tabs>
                <b-modal ref="editImageUploaded" size="lg" id="editImageUploaded" >
                    <span slot="modal-title"><span id="editImage" v-text="$t('entity.action.edit')">Edit selected image</span></span>
                    <div class="mt-4" id="editImageBody">
                        <div class="row">
                            <div class="col-md-12">
                                <!--<image-editor @saveEditedPicture="updateEdited" :image="selectedImage"></image-editor>-->
                            </div>
                        </div>
                    </div>
                    <div slot="modal-footer">
                        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="cancelEditImage()">Cancel</button>
                        <button type="button" class="btn btn-primary" v-text="$t('entity.action.save')" v-on:click="saveEditedImage()">Save</button>
                    </div>
                </b-modal>
            </div>
            <media-library ref="mediaLib" :items="allMedia" @onSearch="searchMedia" @retrieveItems="loadImageGallery(false)" @onUploadGallery="uploadFromGallery" @onUpload="uploadImgGallery" @onFilter="filterMedia" @onRemove="removeImage" :isLoading="isMediaLoading" mediaLibraryType="images"></media-library>
        </div>
    </div>
</template>
<script lang="ts" src="./brandingTab.component.ts"></script>
<style>
    .deleteImage{
        position: absolute;
        top: 0;
        right: 0;
    }
</style>
