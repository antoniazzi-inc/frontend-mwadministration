<template>
  <div class="tab-form-panel">
    <div class="row">
      <div class="col-md-5">
        <h5 v-if="relationCopy.relationPhones && relationCopy.relationPhones.length == 0" style="padding-top:2em;">No phone numbers present</h5>
        <template class="row" v-for="(item, index) in relationCopy.relationPhones">
          <div class="col-md-12" :key="index" v-if="!addNewCommunication || (addNewCommunication && (index === phoneToEdit || !item.id))">
            <PhoneWidgetComponent :phone="item" @onEdit="editPhone(index)" @onCancel="cancelPhone" @onSave="savePhone($event, index)" @onRemove="deletePhone($event, index)"/>
          </div>
        </template>
        <div class="form-buttons-w text-left mt-3" style="border-top:0; margin-left:10px;">
          <button type="button" @click="addNewPhone" class="btn btn-primary">
            <i class="fas fa-plus"/> {{$t('labels.communication')}}
          </button>
        </div>
      </div>
      <div class="col-md-7">
        <h5 v-if="relationCopy.relationAddresses && relationCopy.relationAddresses.length == 0" style="padding-top:2em;">No addresses present</h5>
        <template class="row" v-for="(item, index) in relationCopy.relationAddresses">
          <div class="col-md-12" :key="index" v-if="!addAddress || (addAddress && (index === addressToEdit || !item.id))">
            <AddressWidgetComponent :address="item" @onEdit="editAddress(index)" @onCancel="cancelAddress" @onSave="saveAddress($event, index)" @onRemove="deleteAddress($event, index)"/>
          </div>
        </template>
        <div class="form-buttons-w text-left mt-3" style="border-top:0; margin-left:10px;">
          <button type="button" @click="addNewAddress" class="btn btn-primary" v-if="!addAddress">
            <i class="fas fa-plus"/> {{$t('labels.addresses')}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./contactsSubTab.component.ts"></script>

