<template>
    <div class="row text-left">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <div class="form-desc">{{$t('labels.productFollowUpActionsSettings')}}</div>
                <form>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('labels.startListManager')}}</label>
                          <searchable-select-component :config="multiSelectConfig"
                                                       ref="listManagerSelect"
                                                       :options="allListManagers"
                                                       :value="selectedListManagers"
                                                       @onChange="addListManagerId"
                                                       @onDelete="removeListManagerid"/>
                        </div>
                        <div class="form-group col-md-6" v-if="followupAction && followupAction.executeDirectly !== undefined">
                            <label class="form-control-label">{{$t('labels.ExecuteDirectlyAlsoIfNotPaidYet')}}</label>
                            <toggle-switch
                                :on-text="$t('labels.yes')"
                                :off-text="$t('labels.no')"
                                :value.sync="followupAction.executeDirectly"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('labels.addCustomerToGroup')}}</label>
                          <searchable-select-component :config="multiSelectConfig"
                                                       ref="listManagerSelect"
                                                       :options="allGroups"
                                                       :value="customerAddToGroup"
                                                       @onChange="addGroupsId"
                                                       @onDelete="removeGroupsid"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('labels.removeCustomerFromGroup')}}</label>
                          <searchable-select-component :config="multiSelectConfig"
                                                       ref="listManagerSelect"
                                                       :options="allGroups"
                                                       :value="customerRemoveFromGroup"
                                                       @onChange="addCustomerToGroup"
                                                       @onDelete="removeCustomerFromGroup"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('labels.addBeneficiaryToGroup')}}</label>
                          <searchable-select-component :config="multiSelectConfig"
                                                       ref="listManagerSelect"
                                                       :options="allGroups"
                                                       :value="beneficiaryAddToGroup"
                                                       @onChange="addBeneficiaryGroupId"
                                                       @onDelete="removeBeneficiaryGroupid"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('labels.removeBeneficiaryFromGroup')}}</label>
                          <searchable-select-component :config="multiSelectConfig"
                                                       ref="listManagerSelect"
                                                       :options="allGroups"
                                                       :value="beneficiaryRemoveFromGroup"
                                                       @onChange="addBeneficiaryGroupsFromGroup"
                                                       @onDelete="removeBeneficiaryFromGroup"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6" v-if="followupAction && followupAction.points">
                            <label class="form-control-label">{{$t('labels.addPoints')}}</label>
                            <input type="number" min="0" class="form-control" v-model="followupAction.points"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('labels.addTags')}}</label>
                          <searchable-select-component :config="multiSelectTagConfig"
                                                       ref="listManagerSelect"
                                                       :options="allTags"
                                                       :value="selectedTags"
                                                       @onChange="addTags"
                                                       @onDelete="removeTags"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6" v-if="followupAction && followupAction.externalSystemConfigsJson">
                            <label class="form-control-label">{{$t('labels.startExternalSystem')}}</label>
                            <select class="form-control" v-model="followupAction.externalSystemConfigsJson">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('labels.externalSystemDetails')}}</label>

                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./followUpTab.component.ts"></script>
