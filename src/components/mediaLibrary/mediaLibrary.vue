<template>
    <b-modal size="xl" scrollable ref="mediaLibrary" id="mediaLibrary" v-bind:noCloseOnBackdrop="false" v-bind:noCloseOnEsc="false">
        <div slot="modal-title">
            <h5>{{$t('mediaLibrary')}}</h5>
        </div>
        <div class="tabs">
            <!--<b-tabs v-model="tabIndex">
                <b-tab :title="$t('upload')" @click="tabIndex=0">
                    <upload-widget :busy="mediaIsLoading" :config="uploadConfig" @updateEl="edit" @input="upload"></upload-widget>
                </b-tab>
                <b-tab :title="$t('mediaLibrary')" @click="tabIndex=1">
                    <div class="row library mr-0 pr-0">
                        <div class="col-md-8 pr-0 mr-0">
                            <div class="row library-filters">
                                <div class="col-md-6 text-left">
                                    <div class="form-group">
                                        <label class="form-control-label">{{$t('mediaType')}}</label>
                                        <select class="form-control" v-model="searchMediaType" @change="filterMedia">
                                            <option value="*">{{$t('allTypes')}}</option>
                                            <option value="image">{{$t('images')}}</option>
                                            <option value="video">{{$t('video')}}</option>
                                            <option value="application">{{$t('documents')}}</option>
                                            <option value="other">{{$t('other')}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 text-left">
                                    <div class="form-group pr-2">
                                        <label class="form-control-label">{{$t('search')}}</label>
                                        <input type="text" class="form-control" v-model="searchMedia" @input="searchMediaByName"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row media-wrapper" v-if="allItems.length > 0">
                                <div @click="selected = index" :class="{media: true, active: selected === index}" v-for="(item, index) in allItems" :key="index">
                                    <div :style="{'background': 'url('+getImageUrl(item)+')'}" class="libraryImage"></div>
                                    <i v-if="selected === index" class="fa fa-check"></i>
                                </div>
                            </div>
                            <div v-else class="text-center">
                                <h4>{{$t('emptyGallery')}}</h4>
                            </div>
                        </div>
                        <div class="col-md-4 pr-0 mr-0 image-info" v-if="selectedItem !== null">
                            <div class="row">
                                <div class="col-md-5 image-info-s">
                                    <div class="libraryImage" :style="{'background': 'url('+getImageUrl(selectedItem)+')'}"></div>
                                </div>
                                <div class="col-md-7 text-left mt-2">
                                    <span>{{$t('name')}}: {{selectedItem.name}}</span><br/>
                                    <span>{{$t('updatedOn')}}: {{selectedItem.updatedOn | formatDate}}</span><br/>
                                    <span>{{$t('createdOn')}}: {{selectedItem.createdOn | formatDate}}</span><br/>
                                </div>
                                <div class="row delete">
                                    <div class="col-md-12">
                                        <span v-if="!removeImageConfirm" class="cursor-pointer text-danger pl-3" @click="removeImageConfirm=true">{{$t('deletePermanently')}}</span>
                                        <span v-if="removeImageConfirm" class="cursor-pointer text-danger pl-3" @click="removeImage">{{$t('confirmDelete')}}</span>
                                        <span  v-if="removeImageConfirm" class="cursor-pointer text-danger pl-3" @click="removeImageConfirm=false">{{$t('cancel')}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-control-label">{{$t('name')}}</label>
                                        <input type="text" class="form-control" v-model="selectedItem.name"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-control-label">{{$t('caption')}}</label>
                                        <input type="text" class="form-control" v-model="itemCaption"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group text-right">
                                        <button type="button" class="btn btn-secondary" @click="cancelUpdateImage">{{$t('cancel')}}</button>
                                        <button type="button" class="btn btn-primary" @click="updateImage">{{$t('save')}}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-tab>
            </b-tabs>-->
        </div>
        <div>
        </div>
        <div slot="modal-footer" class="m-auto">
            <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeMediaLibrary()">Cancel</button>
            <button type="button" class="btn btn-primary" v-on:click="uploadThumbnail()">{{$t('choose')}}</button>
        </div>
    </b-modal>
</template>
<script lang="ts" src="./mediaLibrary.component.ts"></script>
<style>
    .modal-body{
        padding-top: 0;
        padding-bottom: 0;
    }

</style>
<style scoped>
.media-wrapper{
    position: relative;
    overflow-y: auto;
    max-height: 500px;
}
.media{
    position: relative;
    margin: 1.5%;
    width: 120px;
    height: 120px;
    float: left;
}
.media img{
    background-size: contain;
    width: 120px;
    height: 120px;
    cursor: pointer;
}
.library .active {
    border: 3px solid dodgerblue;
    position: relative;
    margin: 1.5%;
}
    .active i{
        right: -15px;
        position: absolute;
        font-size: 2em;
        top: -5px;
        color: dodgerblue;
    }
    .image-info{
        background-color: aliceblue;
        font-size: .8em;
        padding-top: 0!important;
        padding-bottom: 0!important;
        max-height: 600px;
    }
.image-info-s {
    position: relative;
    width: 120px;
    height: 120px;
}
    .libraryImage{
        background-size: contain!important;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat!important;
        background-position: center!important;
    }
</style>

