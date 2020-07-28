<template>
  <div class="container-fluid text-left">
    <div class="row">
      <div class="col-md-6">
        <div name="editForm" novalidate v-on:submit.prevent="save()">
          <div>
            <h6 v-if="$props.courseId === null" class="element-header">{{$t('labels.createCourse')}}</h6>
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
                <input v-show="!showHtmlEditor" type="text" v-model="course.pageContentJson" class="form-control"
                       placeholder="html editor" aria-label="" aria-describedby="basic-addon1">
              </div>
              <div v-show="showHtmlEditor">
                <trumbowyg v-model="course.pageContentJson" :config="editorConfig" class="form-control"
                           name="contentEditor"/>
              </div>
            </div>
            <div>
              <div role="form" class="form" v-if="editEvent">
                <h6 class="form-desc"
                    v-if="selectedEvent && selectedEvent.id === null || selectedEvent && selectedEvent.id === undefined">
                  {{$t('labels.createEvent')}}</h6>
                <h6 class="form-desc" v-if="selectedEvent && selectedEvent.id > 0">{{$t('labels.editEvent')}}</h6>

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
                    <div class="date-input">
                      <flat-pickr :config="dateConfigEnd" :class="{'single-daterange form-control': true}"
                                  v-model="eventEnd"/>
                    </div>
                  </div>
                </div>
                <div class="row" v-if="selectedEvent && selectedEvent.price !== undefined">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>{{$t('labels.priceAddition')}}</label>
                      <money type="text" class="form-control" v-bind="moneyConfig" v-model="selectedEvent.price"/>
                    </div>
                  </div>
                  <div class="col-md-6 text-left">
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
                                 :class="{'form-control': true}"/>
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
                        <span class="info">{{totalReservedSeats}}/{{selectedEvent.seats}}</span>
                      </div>
                    </div>
                    <div class="bar-level-1" style="width: 100%">
                      <div class="bar-level-2" :style="{width: getSeatsProgress()}">
                      </div>
                    </div>
                  </div>
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
                        :class="index === selectedRowIndex ? 'selectedEvent cursor-pointer' : 'cursor-pointer'" :key="index"
                        @click="selectRow(item, index)">
                      <td>{{getMultiLangName(item.eventLanguages).name}}</td>
                      <td>{{getEventDate(item)}}</td>
                      <td>{{getLocation(item)}}</td>
                      <td>{{totalReservedSeats}}/{{item.seats}}</td>
                      <td class="text-center">
                        <div class="btn-group flex-btn-group-container">
                          <div @click.prevent="editCurrentEvent(item, index)" class="ml-3 text-primary cursor-pointer">
                            <i class="os-icon os-icon-ui-49"></i>
                          </div>
                          <div @click.prevent="removeCurrentEvent(item, index)" class="ml-3 text-danger cursor-pointer">
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
                  <div class="row" v-if="editEvent">
                    <div class="col-md-12">
                      <button type="button" id="cancel-save-event" class="btn btn-secondary"
                              v-on:click="cancelNewEvent">
                        <i class="fas fa-ban"/>&nbsp;<span
                        v-text="$t('buttons.cancel')">Cancel</span>
                      </button>
                      <button type="button" id="save-entity-event" @click.prevent="saveNewEvent"
                              class="btn btn-primary ml-2">
                        <span v-text="$t('buttons.save')">Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12 text-right">
            <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
              <span v-text="$t('buttons.cancel')">Cancel</span>
            </button>
            <button type="submit" id="save-entity" :disabled="editEvent || (course.events && course.events.length === 0) || course.courseLanguages.length === 0
|| (course.courseLanguages.length && course.courseLanguages[0].name === '')" @click="save" class="btn btn-primary ml-2">
              <span v-text="$t('buttons.save')">Save</span>
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row" v-if="editReservations || editEvent">
          <div class="col-md-12">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
              <div class="element-wrapper">
                <h6 class="element-header" v-text="$t('labels.reservations')"></h6>
                <div class="form-group">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th><span>{{$t('labels.relation')}}</span></th>
                      <th><span>{{$t('labels.ordered')}}</span></th>
                      <th><span>{{$t('labels.paid')}}</span></th>
                      <th><span>{{$t('labels.actions')}}</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(item, ind) in selectedEvent.eventReservations">
                    <tr :key="ind" v-if="item.isPaid">
                      <td>{{getRelationEmail(item)}}</td>
                      <td>{{item.createdOn | formatOnlyDate}}</td>
                      <td>{{item.isPaid}}</td>
                      <td></td>
                    </tr>
                    </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-md-12 form-buttons-w text-left">
                <button type="submit" data-toggle="modal" data-target="#assignRelation" class="btn btn-primary">
                  <span v-text="$t('labels.fillSeats')">Fill Seats</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4" v-if="editEvent || editWaitingList">
          <div class="col-md-12">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
              <div class="element-wrapper">
                <h6 class="element-header" v-text="$t('labels.waitingList')"></h6>
                <div class="form-group">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th><span>{{$t('labels.relation')}}</span></th>
                      <th><span>{{$t('labels.status')}}</span></th>
                      <th><span>{{$t('labels.select')}}<input type="checkbox"/></span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(item, ind) in selectedEvent.eventReservations">
                    <tr :key="ind" v-if="item.isPaid">
                      <td>{{getRelationEmail(item)}}</td>
                      <td>{{item.reservationStatus}}</td>
                      <td><input :checked="selectedWaitingList.indexOf(e=>{e.relationId === item.relationId})" type="checkbox"/></td>
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
                <button type="submit" @click="assignSeats" data-toggle="modal" data-target="#" class="btn btn-outline-success ml-2">
                  <span v-text="$t('labels.assign')">Assign</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" id="assignRelation" tabindex="-1" role="dialog" ref="assignRelation">
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
  </div>
</template>
<script src="./newCourse.component.ts" lang="ts"></script>
<style scoped>
  .selectedEvent{
    -webkit-box-shadow: 0px 10px 5px -4px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 10px 5px -4px rgba(0,0,0,0.75);
    box-shadow: 0px 10px 5px -4px rgba(0,0,0,0.75);
  }
</style>
