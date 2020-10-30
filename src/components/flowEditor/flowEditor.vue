<template>
  <div id="wflEditor">
    <!--
    <p class="text-left">double-click on the canvas to add a new node</p>
    -->

    <simple-flowchart :scene.sync="scene"
        @nodeClick="nodeClick"
        @nodeDelete="nodeDelete"
        @nodeEdit="nodeEdit"
        @linkBreak="linkBreak"
        @linkAdded="linkAdded"
        @canvasClick="canvasClick"
        @canvasDoubleClick="startAddNode"
        @outportClick="startAddNode"
     />

    <div class="modal" data-backdrop="static" data-keyboard="false" id="editModal" tabindex="-1" role="dialog" ref="editModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form name="editForm" role="form" novalidate @submit.prevent.stop="saveExistingNode">
            <div class="modal-header">
              <h5>{{$t('labels.editStep')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left">
              <div class="mt-4">
                <h1>Edit Modal</h1>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeEditModal">{{$t('buttons.close')}}</button>
              <button type="submit" class="btn btn-primary">{{$t('buttons.save')}}</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal" data-backdrop="static" data-keyboard="false" id="addModal" tabindex="-1" role="dialog" ref="addModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form name="addForm" role="form" novalidate @submit.prevent.stop="saveNewNode">
            <div class="modal-header">
              <h5>{{$t('labels.newStep')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left">
              <div class="mt-4">

                <div class="form-group">
                  <label class="form-control-label">What kind of new step?</label>
                  <div class="row">

                    <div class="col alert alert-warning m-2 text-center" role="alert">
                    <h4 class="alert-heading">Action</h4>
                    <p>An action is something executed by Autorespond (e.g. send an email).</p>
                    <button class="btn btn-outline-primary" type="button" @click="addEvent.type = 'action'">Select</button>
                  </div>
                  <div class="col alert alert-warning m-2 text-center" role="alert">
                    <h4 class="alert-heading">Condition</h4>
                    <p>A condition is based on known profile field values or submitted form data.</p>
                    <button class="btn btn-outline-primary" type="button" @click="addEvent.type = 'cond'">Select</button>
                  </div>
                  <div class="col alert alert-warning m-2 text-center" role="alert">
                    <h4 class="alert-heading">Start</h4>
                    <p>A Start step defines how and when a new flow will be started.</p>
                    <button class="btn btn-outline-primary" type="button" @click="addEvent.type = 'start'">Select</button>
                  </div>

                  </div>
                </div>
                <div class="form-group">
                  <label class="form-control-label">Choose type</label>
                  <select class="form-control" v-model="addEvent.subtype" >
                    <option v-if="addEvent.type === 'start'" v-for="(item, index) in starts" :key="index" :value="item.id">{{item.label}}</option>
                    <option v-if="addEvent.type === 'action'" v-for="(item, index) in actions" :key="index" :value="item.id">{{item.label}}</option>
                    <option v-if="addEvent.type === 'cond'" v-for="(item, index) in conditions" :key="index" :value="item.id">{{item.label}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-control-label">{{$t('labels.label')}}</label>
                  <input class="form-control" type="text" v-model="addEvent.name">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeAddModal">{{$t('buttons.close')}}</button>
              <button type="submit" class="btn btn-primary">{{$t('buttons.save')}}</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>
<script type="ts" src="./flowEditor.component.ts"></script>

<style scoped>

  #wflEditor {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    overflow: hidden;
    height: 1000px;
    width: 100%;
  }

</style>
