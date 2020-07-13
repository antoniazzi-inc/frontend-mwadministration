<template>
  <div class="container-fluid">
    <div class="row m-3 mt-4 pagination-v">
      <div class="col-md-12" v-if="!isLoading && allData.length > 0">
        <pagination @update="rerenderPage" :totalPages="totalPages" :table="$props.table" :page="currentPage"
                    @changePage="onChangePage" :total="totalItems"  :key="'pagination'" :perPage="itemsPerPage"
                    :tableFields="tableFields"></pagination>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="loader" v-if="isLoading">
          <div class="spinner-border text-primary" role="status" v-if="isLoading">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <h4 class="text-center mt-3" v-if="allData.length === 0">{{$t($props.noDataLabel)}}</h4>
        <table v-else class="table table-striped">
          <thead>
          <tr>
            <template v-for="(item, index) in tables[$props.table].cols">
              <th v-if="hasAuthority(item.authorities)" :key="index" v-show="checkVisibility(item)">
                <span>{{$t(item.name)}}</span>
              </th>
            </template>
            <th>
              <span>{{$t('labels.actions')}}</span>
            </th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item, ind) in allData" :key="ind">
              <template v-for="(col, index) in tables[$props.table].cols">
                <td :key="index" v-if="hasAuthority(col.authorities)" v-show="checkVisibility(col)">
                  <span class="colorField" v-if="col.type === 'color'" :style="{'background': item[col.field]}">&nbsp;</span>
                  <span v-else-if="col.method != null"> {{col.method(item)}}</span>
                  <span v-else-if="col.type === 'date'">{{item[col.field] | formatDate}}</span>
                  <span v-else-if="col.type === 'boolean'">
                    {{item[col.field] === true ? $t('labels.yes') : $t('labels.no')}}
                  </span>
                  <span v-else-if="col.type === 'money'">
                    $store.state.currency {{item[col.field]}}
                  </span>
                  <span v-else-if="col.type === 'percentage'">
                    {{item[col.field]}}%
                  </span>
                  <span v-else>
                    {{!item[col.field] ? '-' : item[col.field]}}
                  </span>
                </td>
              </template>
              <td>
                <div class="btn-group flex-btn-group-container text-center justify-content-center">
                  <div v-if="tables[$props.table].actions.edit"
                    @click.prevent="itemAction('onEdit', item)" class="ml-3 text-primary cursor-pointer">
                    <i class="os-icon os-icon-ui-49"></i>
                  </div>
                  <div v-if="tables[$props.table].actions.copy" @click.prevent="itemAction('onCopy', item)" class="ml-3 text-warning cursor-pointer">
                    <i class="os-icon os-icon-grid-10"></i>
                  </div>
                  <div v-if="tables[$props.table].actions.info" class="ml-3 cursor-pointer"  @click.prevent="itemAction('onInfo', item)">
                    <i class="fa fa-info-circle"></i>
                  </div>
                  <div v-if="tables[$props.table].actions.delete" class="text-danger ml-3 cursor-pointer" data-toggle="modal"
                       :data-target="'#deleteModal_'+$props.table"
                       @click.prevent="prepareRemove(item)">
                    <i class="os-icon os-icon-ui-15"></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row m-3 mt-4 pagination-v">
      <div class="col-md-12" v-if="!isLoading && allData.length > 0">
        <pagination @update="rerenderPage" :totalPages="totalPages" :table="$props.table" :page="currentPage"
                    @changePage="onChangePage" :total="totalItems" :key="'pagination'" :perPage="itemsPerPage"
        :tableFields="tableFields"></pagination>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" :id="'deleteModal_'+$props.table" tabindex="-1" role="dialog" ref="deleteModal">
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
            <button type="button" class="btn btn-primary" @click="itemAction('onDelete', itemToDelete)">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./paginationTable.component.ts"></script>
<style scoped>
  .colorField{
    width: 100%;
    min-height: 25px;
    display: flex;
  }
  .pagination-v{
    display: flex;
    align-items: center;
  }
  .loader{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
  }
  thead th {
    font-size: .9em!important;
    text-align: left;
  }
  .table td {
    font-size: 0.9em;
    text-align: left;
  }
</style>
