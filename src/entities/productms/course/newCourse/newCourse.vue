<template>
  <div class="container-fluid text-left">
    <div class="row">
      <div class="col-md-6">
        <div name="editForm" class="search-banner" style="padding:2em;" novalidate v-on:submit.prevent="save()">
          <div>
            <h2 v-if="$props.courseId === null || course.id > 0" v-text="$t('labels.editCourse')"></h2>
            <h2 v-else v-text="$t('labels.createCourse')"></h2>

            <div class="form-group">
              <multi-language-component
                :config="multiLangConfigCourse"
                :value="course.courseLanguages"
                @onAdd="addNewLangCourse"
                @onChange="updateLangCourse"
                @onRemove="removeCourseLanguage"/>
            </div>
            <div class="form-group">
              <label>{{$t('labels.courseForm')}}</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend cursor-pointer">
                  <span @click="showHtmlEditor = !showHtmlEditor" class="input-group-text" id="basic-addon1">{{$t('labels.editor')}}</span>
                </div>
                <input v-show="!showHtmlEditor" type="text" v-model="pageContent" class="form-control"
                       placeholder="html editor" aria-label="" aria-describedby="basic-addon1">
              </div>
              <div v-show="showHtmlEditor">
                <trumbowyg v-model="course.pageContentJson" :config="editorConfig" class="form-control"
                           name="contentEditor"/>
              </div>
            </div>
            <div>
              <div id="newEvtForm" role="form" class="form" v-if="editEvent">
                <h4 v-if="selectedEvent && selectedEvent.id === null || selectedEvent && selectedEvent.id === undefined">
                  {{$t('labels.createEvent')}}</h4>
                <h4 v-if="selectedEvent && selectedEvent.id > 0">{{$t('labels.editEvent')}}</h4>

                <div class="form-group">
                  <multi-language-component
                    :config="multiLangConfig"
                    :value="selectedEvent.eventLanguages"
                    @onAdd="addNewEventLang"
                    @onChange="updateEventLang"
                    @onRemove="removeEventLang"/>
                </div>
                <div class="row form-group">
                  <div class="col-md-6">
                    <label>{{$t('labels.startDate')}}</label>
                    <div class="date-input">
                      <flat-pickr :config="dateConfigStart" v-model="eventStart" class="single-daterange form-control"/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label>{{$t('labels.endDate')}}</label>
                    <div class="dateHolder date-input">
                      <flat-pickr :config="dateConfigEnd" v-model="eventEnd" class="single-daterange form-control"/>
                      <i class="fa fa-times clearDate cursor-pointer" @click="eventEnd=null">
                        <span aria-hidden="true" class="sr-only">X</span>
                      </i>
                    </div>
                  </div>
                </div>
                <div class="row" v-if="selectedEvent && selectedEvent.price !== undefined">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>{{$t('labels.priceAddition')}}</label>
                      <money type="text" class="form-control" v-bind="moneyConfig" v-model="selectedEvent.price"/>
                    </div>
                  </div>
                  <div class="col-md-8 text-left">
                    <div class="row p-0 m-0">
                      <div class="col-md-4 p-0 m-0">
                        <div class="form-group">
                          <label class="form-control-label">{{$t('labels.unlimitedSeats')}}</label>
                          <toggle-switch
                            :on-text="$t('labels.yes')"
                            :off-text="$t('labels.no')"
                            :value.sync="unlimitedSeats"/>
                        </div>
                      </div>
                      <div class="col-md-8 p-0 m-0" v-if="!unlimitedSeats">
                        <div class="form-group">
                          <label class="form-control-label">{{$t('labels.numberOfSeats')}}</label>
                          <input class="form-control" type="number" v-model="selectedEvent.seats"
                                 :class="{'form-control': true}" style="max-width:125px;"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group" v-if="!unlimitedSeats">
                  <div class="os-progress-bar primary">
                    <div class="bar-labels">
                      <div class="bar-label-left">
                        <span>{{$t('labels.seatsProgress')}}</span>
                      </div>
                      <div class="bar-label-right">
                        <span class="info">{{selectedEvent.eventReservations ? selectedEvent.eventReservations.length : 0}}/{{selectedEvent.seats}}</span>
                      </div>
                    </div>
                    <div class="bar-level-1" style="width: 100%">
                      <div class="bar-level-2" :style="{width: getSeatsProgress()}">
                      </div>
                    </div>
                  </div>
                </div>
                  <div class="col-md-12 text-center">
                    <button type="button" id="cancel-save-event" class="btn btn-secondary"
                            v-on:click="cancelNewEvent">
                      <span
                      v-text="$t('buttons.cancel')">Cancel</span>
                    </button>
                    <button type="button" id="save-entity-event" @click.prevent="saveNewEvent"
                            class="btn btn-primary ml-2">
                      <span v-text="$t('buttons.save')">Save</span>
                    </button>
                  </div>

              </div>
              <div class="row" v-if="course.events && course.events.length > 0 && !editEvent">
                <div class="col-md-12 form-group">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th><span>{{$t('labels.eventName')}}</span></th>
                      <th><span>{{$t('labels.startDate')}}</span></th>
                      <th><span>{{$t('labels.location')}}</span></th>
                      <th><span>{{$t('labels.seats')}}</span></th>
                      <th>{{$t('labels.actions')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in course.events"
                        :class="index === selectedRowIndex ? 'selectedEvent cursor-pointer' : 'cursor-pointer'"
                        :key="index"
                        @click="selectRow(item, index)">
                      <td>{{item.eventLanguages ? getMultiLangName(item.eventLanguages).name : ''}}</td>
                      <td>{{getEventDate(item)}}</td>
                      <td>{{getLocation(item)}}</td>
                      <td>{{getReservedSeats(item.eventReservations)}}/{{item.seats}}</td>
                      <td class="text-center">
                        <div class="btn-group flex-btn-group-container">
                          <div @click.prevent="editCurrentEvent(item, index)" class="ml-3 text-primary cursor-pointer">
                            <i class="os-icon os-icon-ui-49"></i>
                          </div>
                          <div @click.prevent="removeCurrentEvent(item, index)" data-target="#deleteModal"
                               data-toggle="modal" class="ml-3 text-danger cursor-pointer">
                            <i class="fas fa-trash-alt"></i>
                          </div>
                          <div class="text-success ml-3 cursor-pointer" @click="toggleReservations(item)">
                            <i class="fas fa-chair"></i>
                          </div>
                          <div class="ml-3 cursor-pointer" @click="toggleWaitingList(item)">
                            <i class="fas fa-list"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <button v-if="!editEvent" type="button" id="add-event" @click.prevent="addNewEvent"
                          class="btn btn-primary">
                    <i class="fa fa-calendar"></i>&nbsp;<span>{{$t('labels.addEvent')}}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 text-right">
            <button type="button" id="cancel-save" class="btn btn-lg btn-secondary" v-on:click="previousState()">
              <span v-text="$t('buttons.cancel')">Cancel</span>
            </button>
            <button type="submit" id="save-entity" :disabled="editEvent || (course.events && course.events.length === 0) || course.courseLanguages.length === 0
|| (course.courseLanguages.length && course.courseLanguages[0].name === '')" @click="save" class="btn btn-lg btn-primary ml-2">
              <span v-text="$t('buttons.save')">Save</span>
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row" v-if="editReservations || editEvent">
          <div class="col-md-12">
            <!--
            <div class="row text-right">
              <div class="col-md-6"></div>
              <div class="col-md-6">
                <input type="search" class="form-control mb-2" :placeholder="$t('labels.search')" v-model="reservationsListSearch" @input="doSearchReservations()"/>
              </div>
            </div>
            -->
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
              <div class="element-wrapper">
                <h4 class="element-header" v-text="$t('labels.reservations') + ' ' + selectedEvent.eventLanguages && selectedEvent.eventLanguages.length ? selectedEvent.eventLanguages[0].name : ''"></h4>
                <input type="search" class="form-control mb-2" :placeholder="$t('labels.search')" v-model="reservationsListSearch" @input="doSearchReservations()"/>
                <div class="form-group halfHeight">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th><span>{{$t('labels.relation')}}</span></th>
                      <th><span>{{$t('labels.ordered')}}</span></th>
                      <th><span>{{$t('labels.paid')}}</span></th>
                      <th><span>{{$t('labels.status')}}</span></th>
                      <th><span>{{$t('labels.actions')}}</span></th>
                    </tr>
                    </thead>
                    <tbody v-if="reservationsListSearch === ''">
                    <template v-for="(item, ind) in selectedEvent.eventReservations">
                      <tr :key="ind" v-if="item.reservationStatus === 'OCCUPIED'">
                        <td>{{getRelationEmail(item)}}</td>
                        <td>{{item.createdOn | formatDate}}</td>
                        <td>{{item.isPaid ? $t('labels.yes') : $t('labels.no')}}</td>
                        <td>{{item.reservationStatus}}</td>
                        <td>
                          <div class="btn-group flex-btn-group-container text-center justify-content-center">
                            <div @click.prevent="()=>{removeReservation(item, ind); selectedDeleteMode='reservation'}" data-target="#deleteModal"
                                 data-toggle="modal" class="ml-3 text-danger cursor-pointer">
                              <i class="fas fa-trash-alt"></i>
                            </div>
                            <div @click.prevent="moveReservation(item, ind)" data-target="#moveReservation"
                                 data-toggle="modal" class="ml-3 text-primary cursor-pointer">
                              <i class="fas fa-plane"></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                    </tbody>
                    <tbody v-else>
                      <tr v-if="searchedReservations.length === 0">
                        <td/>
                        <td/>
                        <td>{{$t('labels.noResults')}}</td>
                        <td/>
                        <td/>
                      </tr>
                    <template v-for="(item, ind) in searchedReservations">
                      <tr :key="ind" v-if="item.reservationStatus === 'OCCUPIED'">
                        <td>{{getRelationEmail(item)}}</td>
                        <td>{{item.createdOn | formatDate}}</td>
                        <td>{{item.isPaid ? $t('labels.yes') : $t('labels.no')}}</td>
                        <td>{{item.reservationStatus}}</td>
                        <td>
                          <div class="btn-group flex-btn-group-container text-center justify-content-center">
                            <div @click.prevent="removeReservation(item, ind)" data-target="#deleteModal"
                                 data-toggle="modal" class="ml-3 text-danger cursor-pointer">
                              <i class="fas fa-trash-alt"></i>
                            </div>
                            <div @click.prevent="moveReservation(item, ind)" data-target="#moveReservation"
                                 data-toggle="modal" class="ml-3 text-primary cursor-pointer">
                              <i class="fas fa-plane"></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-md-12 form-buttons-w text-left">
                <button type="submit" :disabled="checkIfFillIsDisabled()" data-toggle="modal" @click="populateRelations()"
                        data-target="#assignRelation" class="btn btn-primary">
                  <span v-text="$t('labels.fillSeats')">Fill Seats</span>
                </button>
                <button v-if="!editEvent"  type="submit" @click="editReservations = false" class="btn btn-outline-primary ml-2">
                  <span v-text="$t('buttons.cancel')">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4" v-if="editEvent || editWaitingList">
          <div class="col-md-12">
            <!--
            <div class="row text-right">
              <div class="col-md-6"></div>
              <div class="col-md-6">
                <input type="search" class="form-control mb-2" :placeholder="$t('labels.search')" v-model="waitingListSearch" @input="doSearchLists()"/>
              </div>
            </div>
            -->
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
              <div class="element-wrapper">
                <h4 class="element-header" v-text="$t('labels.waitingList') + ' ' + selectedEvent.eventLanguages && selectedEvent.eventLanguages.length ? selectedEvent.eventLanguages[0].name : ''"></h4>
                <input type="search" class="form-control mb-2" :placeholder="$t('labels.search')" v-model="waitingListSearch" @input="doSearchLists()"/>
                <div class="form-group halfHeight">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th><span>{{$t('labels.relation')}}</span></th>
                      <th><span>{{$t('labels.date')}}</span></th>
                      <th><span>{{$t('labels.paid')}}</span></th>
                      <th><span>{{$t('labels.status')}}</span></th>
                      <th><span>{{$t('labels.select')}}<input type="checkbox" class="ml-2"/></span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(item, ind) in selectedEvent.eventReservations">
                      <tr :key="ind" v-if="item.reservationStatus === 'PENDING'">
                        <td>{{getRelationEmail(item)}}</td>
                        <td>{{item.createdOn | formatDate}}</td>
                        <td>{{item.isPaid ? $t('labels.yes') : $t('labels.no')}}</td>
                        <td>{{item.reservationStatus}}</td>
                        <td><input :checked="false" type="checkbox" class="ml-2"/></td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-md-12 form-buttons-w text-left">
                <button type="submit" @click="sendMail" class="btn btn-primary">
                  <span v-text="$t('labels.sendMail')">sendMail</span>
                </button>
                <button type="submit" @click="deleteFromWaitingList" class="btn btn-outline-danger ml-2">
                  <span v-text="$t('labels.delete')">Delete</span>
                </button>
                <button type="submit" @click="assignSeats" data-toggle="modal" data-target="#"
                        class="btn btn-outline-success ml-2">
                  <span v-text="$t('labels.assign')">Assign</span>
                </button>
                <button v-if="!editEvent" type="submit" @click="editWaitingList = false" class="btn btn-outline-primary ml-2">
                  <span v-text="$t('buttons.cancel')">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" id="assignRelation" tabindex="-1" role="dialog"
         ref="assignRelation">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{$t('labels.fillSeats')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mt-4">
              <label class="form-control-label">{{$t('labels.selectRelations')}}</label>
              <searchable-select-component :config="multiSelectConfig"
                                           :options="allRelations"
                                           :value="selectedRelations"
                                           @onChange="relationsChanged"
                                           @onSearch="searchRelation"
                                           @onDelete="removeRelation"/>
            </div>
            <div class="mt-2">
              <label class="form-control-label">{{$t('labels.isPaid')}}</label>
              <toggle-switch :on-text="$t('labels.yes')"
                             :off-text="$t('labels.no')"
                             :value.sync="isReservationPaid"></toggle-switch>
            </div>
            <div class="mt-2">
              <label class="form-control-label">{{$t('labels.reservationStatus')}}</label>
              <select v-model="reservationStatus" class="form-control">
                <option value="OCCUPIED">{{$t('labels.occupied')}}</option>
                <option value="PENDING">{{$t('labels.pending')}}</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="fillSeats" data-dismiss="modal">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" data-backdrop="static" data-keyboard="false" id="moveReservation" tabindex="-1" role="dialog"
         ref="moveReservation">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{$t('labels.moveReservation')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mt-4">
              <label class="form-control-label">{{$t('labels.selectEvent')}}</label>
              <searchable-select-component :config="multiSelectConfigEvent"
                                           :options="allEvents"
                                           :value="selectedMoveEvent"
                                           @onChange="moveEventChanged"
                                           @onDelete="removeMoveEvent"/>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="moveReservationConfirmed" data-dismiss="modal">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" id="deleteModal" tabindex="-1" role="dialog"
         ref="deleteModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{$t('labels.confirmDelete')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mt-4">
              <h5>{{$t('labels.areYouSureToDelete')}}</h5>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal"
                    @click="removeReservationConfirmed()">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./newCourse.component.ts" lang="ts"></script>

<style scoped>

#newEvtForm{
  background-color: #f2f4f8;
  border: solid 1px #d0d0d0;
  margin:0.5em;
  margin-bottom:2em;
  border-radius: 10px;
  padding: 1em;
  box-shadow: 5px 20px 28px #aaa;
}
.halfHeight{
  max-height: 30vh;
  overflow-y: auto;
}
.bar-labels {
  background-color: #c5d3ff;
  border-radius: 3px;
  padding-left:0.2em;
  padding-right:0.2em;
}
</style>
