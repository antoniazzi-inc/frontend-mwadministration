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

