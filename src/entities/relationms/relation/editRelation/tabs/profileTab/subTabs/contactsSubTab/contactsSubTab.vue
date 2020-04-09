<template>
  <div class="row p-3 m-0">
    <div class="col-md-6">
      <div class="pipeline white">
        <div class="pipeline-header">
          <h5 class="pipeline-name">{{$t('labels.communication')}}</h5>
          <span class="btn btn-outline-primary" @click="addNewPhone" v-if="!addNewCommunication" style="cursor: pointer;">
            <i class="fas fa-plus"></i>
          </span>
        </div>
      </div>
      <div class="row m-0 p-0">
        <template v-for="(item, index) in relationCopy.relationPhones">
          <div class="col-md-12" :key="index" v-if="!addNewCommunication || (addNewCommunication && (index === phoneToEdit || !item.id))">
            <PhoneWidgetComponent :phone="item" @onEdit="editPhone(index)" @onCancel="cancelPhone"
                                  @onSave="savePhone($event, index)" @onRemove="deletePhone($event, index)"/>
          </div>
        </template>
      </div>
    </div>
    <div class="col-md-6">
      <div class="pipeline white">
        <div class="pipeline-header">
          <h5 class="pipeline-name">{{$t('labels.addresses')}}</h5>
          <span class="btn btn-outline-primary" style="cursor: pointer;" @click="addNewAddress" v-if="!addAddress">
            <i class="fas fa-plus"></i>
          </span>
        </div>
      </div>
      <template>
        <div class="row" v-for="(item, index) in relationCopy.relationAddresses" :key="index">
          <div class="col-md-12" v-if="!addAddress || (addAddress && (index === addressToEdit || !item.id))">
            <AddressWidgetComponent :address="item" @onEdit="editAddress(index)" @onCancel="cancelAddress" @onSave="saveAddress($event, index)" @onRemove="deleteAddress($event, index)"/>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script type="ts" src="./contactsSubTab.component.ts"></script>
<style>
  .pipeline {
    border-radius: 4px;
    background-color: #fff;
    color: black;
    display: flex;
    padding: 10px;
  }
  .pipeline.white .pipeline-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .pipeline-header {
    position: relative;
    margin-bottom: 20px;
  }
  .pipeline-header .pipeline-name {
    text-transform: uppercase;
    letter-spacing: 3px;
    color: black;
    margin-bottom: 5px;
    line-height: 1;
    padding-right: 30px;
  }
  .avatar i {
    font-size: 2em;
  }
</style>
