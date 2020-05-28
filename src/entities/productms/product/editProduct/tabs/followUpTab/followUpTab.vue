<template>
    <div class="row">
        <div class="element-wrapper col-md-9">
            <div class="element-box">
                <div class="form-desc">{{$t('productFollowUpActionsSettings')}}</div>
                <form>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('startListManager')}}</label>
                            <multi-select
                                ref="listManagerSelect"
                                :options="allListManagers"
                                :config="multiSelectConfig"
                                :value.sync="selectedListManagers"
                                @onRemove="removeListManagerid"
                                @onChange="addListManagerId">
                            </multi-select>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('ExecuteDirectlyAlsoIfNotPaidYet')}}</label>
                            <toggle-switch
                                :on-text="$t('global.yes')"
                                :off-text="$t('global.no')"
                                :value.sync="followupAction.executeDirectly"></toggle-switch>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('addCustomerToGroup')}}</label>
                            <multi-select
                                ref="listManagerSelect"
                                :options="allGroups"
                                :config="multiSelectConfig"
                                :value.sync="customerAddToGroup"
                                @onRemove="removeGroupsid"
                                @onChange="addGroupsId">
                            </multi-select>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('removeCustomerFromGroup')}}</label>
                            <multi-select
                                ref="listManagerSelect"
                                :options="allGroups"
                                :config="multiSelectConfig"
                                :value.sync="customerRemoveFromGroup"
                                @onRemove="removeCustomerFromGroup"
                                @onChange="addCustomerToGroup"></multi-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('addBeneficiaryToGroup')}}</label>
                            <multi-select
                                ref="listManagerSelect"
                                :options="allGroups"
                                :config="multiSelectConfig"
                                :value="beneficiaryAddToGroup"
                                @onRemove="removeBeneficiaryGroupid"
                                @onChange="addBeneficiaryGroupId">
                            </multi-select>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('removeBeneficiaryFromGroup')}}</label>
                            <multi-select
                                ref="listManagerSelect"
                                :options="allGroups"
                                :config="multiSelectConfig"
                                :value="beneficiaryRemoveFromGroup"
                                @onRemove="removeBeneficiaryFromGroup"
                                @onChange="addBeneficiaryGroupsFromGroup">
                            </multi-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('addPoints')}}</label>
                            <input type="number" min="0" class="form-control" v-model="followupAction.points"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('addTags')}}</label>
                            <multi-select
                                ref="listManagerSelect"
                                :options="allTags"
                                :config="multiSelectTagConfig"
                                :value="selectedTags"
                                @onRemove="removeTags"
                                @onChange="addTags">
                            </multi-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('startExternalSystem')}}</label>
                            <select class="form-control" v-model="followupAction.externalSystemConfigsJson">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="form-control-label">{{$t('externalSystemDetails')}}</label>

                        </div>
                    </div>
                    <div class="form-buttons-w text-right">
                        <button class="btn btn-primary" @click.prevent="save">{{$t('save')}}</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./followUpTab.component.ts"></script>
