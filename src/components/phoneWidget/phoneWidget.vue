<template>
  <div>
    <div class="support-index mt-2 mb-2 support-tickets" v-if="!editMode && !newPhone">
      <div class="support-ticket">
        <div class="st-body">
          <div class="avatar">
            <br>
            <i class="fa fa-home" v-if="phoneCopy.phoneType === phoneTypes.home"></i>
            <i class="fa fa-mobile" v-if="phoneCopy.phoneType === phoneTypes.mobile"></i>
            <i class="fa fa-question" v-if="phoneCopy.phoneType === phoneTypes.other"></i>
            <i class="fa fa-building" v-if="phoneCopy.phoneType === phoneTypes.work"></i>
          </div>
          <div class="st-meta">
            <i class="text-warning fas fa-edit m-2" @click="edit"></i>
            <div class="fas fa-trash-alt m-2 text-danger" @click="remove"></div>
          </div>
          <div class="ticket-content">
            <br/>
            <span class="label">
            {{phoneCopy.number}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="form-row">
        <label>{{$t('labels.number')}}</label>
        <input type="text" v-validate="'required'" name="number"
               :placeholder="$t('labels.phoneNumberOrSocialMedia')" :class="{'form-control': true, invalid: errors.has('number')}"
               v-model="phone.number">
        <span class="text-danger small">{{errors.first('number')}}</span>
      </div>
      <div :class="{'input-group mt-4': true}">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{phoneCopy.phoneType}}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" v-on:click="phoneCopy.phoneType=phoneTypes.home" href="#">{{phoneTypes.home}}</a>
            <a class="dropdown-item" v-on:click="phoneCopy.phoneType=phoneTypes.mobile"
               href="#">{{phoneTypes.mobile}}</a>
            <a class="dropdown-item" v-on:click="phoneCopy.phoneType=phoneTypes.work" href="#">{{phoneTypes.work}}</a>
            <a class="dropdown-item" v-on:click="phoneCopy.phoneType=phoneTypes.other" href="#">{{phoneTypes.other}}</a>
          </div>
        </div>
      </div>
      <hr/>
      <div class="form-row">
        <div class="col-md-12 text-right mt-3">
          <button class="btn btn-outline-primary" @click="cancel">{{$t('buttons.cancel')}}</button>
          <button class="btn btn-primary ml-4" @click="save">{{$t('buttons.save')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./phoneWidget.component.ts"></script>
<style>
  .support-index {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }

  .support-index .support-tickets {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    padding-right: 20px;
    margin-right: 20px;
  }

  .support-index .support-ticket {
    background-color: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);
    box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);
    -webkit-transition: all 0.1s ease;
    transition: all 0.1s ease;
    position: relative;
    width: 100%;
  }

  .support-index .st-body {
    -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
    padding: 20px;
    border-radius: 6px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .support-index .st-body .avatar {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50px;
    flex: 0 0 50px;
    padding-right: 15px;
  }

  .support-index .st-meta {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 99;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
</style>
