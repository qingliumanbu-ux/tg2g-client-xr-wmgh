<template>
  <div style="height: 100%;">
    <xr-ef-form @ready="efFormReady" 
    :f2-do="F2_DO" 
    :f3-pre-do="F3_PRE_DO"
    :f3-do="F3_DO" 
    :f3-cancel="F3_CANCEL"
    :f4-pre-do="F4_PRE_DO"
    :f4-do="F4_DO" 
    :f4-cancel="F4_CANCEL"
    :f5-pre-do="F5_PRE_DO"
    :f5-do="F5_DO" 
    :f5-cancel="F5_CANCEL" >
      
    <!-- 连铸模块 -->
    <!-- background: #F6DA30; -->
    <div style="display: flex; height: 25%; overflow: auto;">
      <!-- background: linear-gradient(#ffffff, #30b2fb) -->
      <div style="display: flex; flex-direction: column; width: 33.3%;">
        <xr-ef-panel title="连铸0#机" padding="1px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView0'" 
              :toolbar-style="'both'"></er-grid>
          </template>
        </xr-ef-panel>
      </div>
      <div style="display: flex; flex-direction: column; width: 33.3%">
        <xr-ef-panel title="连铸1#机" padding="1px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView1'"
              :toolbar-style="'both'" ></er-grid>
          </template>
        </xr-ef-panel>
      </div>
      <div style="display: flex; flex-direction: column; width: 33.3%">
        <xr-ef-panel title="连铸2#机" padding="1px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView2'"
              :toolbar-style="'both'" ></er-grid>
          </template>
        </xr-ef-panel>
      </div>
    </div>
    <!-- AOD模块 -->
    <!-- background: #00AEFF; -->
    <div style="display: flex; height: 25%; overflow: auto;">
      <!-- background: linear-gradient(#ffffff, #40efb6) -->
      <div style="display: flex; flex-direction: column; width: 28%">
        <xr-ef-panel title="AOD0#炉" padding="2px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView3'"
              :toolbar-style="'both'"
              @change="cellValueChanged"></er-grid>
          </template>
        </xr-ef-panel>
      </div>
      <div style="display: flex; flex-direction: column; width: 28%">
        <xr-ef-panel title="AOD1#炉" padding="2px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView4'"
              :toolbar-style="'both'"></er-grid>
          </template>
        </xr-ef-panel>
      </div>
      <div style="display: flex; flex-direction: column; width: 28%">
        <xr-ef-panel title="AOD2#炉" padding="2px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView5'"
              ></er-grid>
          </template>
        </xr-ef-panel>
      </div>
      <div style="display: flex; flex-direction: column; width: 16%; ">
         <!-- <xr-ef-panel title="作业区通知" padding="2px">
          <template #customButtonSlot></template>
          <template #contentSlot> -->
              <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'Layout_aod'" style="font-weight: bold;"
              ></er-layout>
              <!-- <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView_AOD'"
        ></er-grid> -->
          <!-- </template>
        </xr-ef-panel>  -->
        
      </div>

    </div>
    <!-- AMF模块 -->
    <!-- background: #29EFFA; -->
    <div style="display: flex; height: 25%; overflow: auto;">
      <!-- background: linear-gradient(#ffffff, #59e2fb) -->
      <div style="display: flex; flex-direction: column; width: 21%;">
        <xr-ef-panel title="AMF1#炉" padding="2px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView7'"
              :toolbar-style="'both'"></er-grid>
          </template>
        </xr-ef-panel>
      </div>
      <div style="display: flex; flex-direction: column; width: 21%">
        <xr-ef-panel title="AMF2#炉" padding="2px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView8'"
              :toolbar-style="'both'"></er-grid>
          </template>
        </xr-ef-panel>
      </div>
      <div style="display: flex; flex-direction: column; width: 21%">
        <xr-ef-panel title="AMF3#炉" padding="2px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView9'"
              :toolbar-style="'both'"></er-grid>
          </template>
        </xr-ef-panel>
      </div>
      <div style="display: flex; flex-direction: column; width: 21%">
        <xr-ef-panel title="AMF4#炉" padding="2px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView10'"
              :toolbar-style="'both'"></er-grid>
          </template>
        </xr-ef-panel>
      </div>
      <div class="tongzhi2" style="display: flex; flex-direction: column; width: 16%">
        <!-- <xr-ef-panel title="作业区通知" padding="2px">
        <div id="textArea2"></div>
        </xr-ef-panel> -->
        <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'Layout_amf'" style="font-weight: bold;"
              ></er-layout>
      </div>
      <!-- <div style="display: flex; flex-direction: column; width: 20%">
        <xr-ef-panel title="作业区通知" padding="5px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView11'"
              :toolbar-style="'both'"></er-grid>
          </template>
        </xr-ef-panel>
      </div> -->
    </div>
    <!-- EAF模块 -->
    <!-- background: linear-gradient(#ffffff, #00aeff) -->
    <!-- background: #29EFFA; -->
    <div style="display: flex; height: 25%; overflow: auto;">
      <div style="display: flex; flex-direction: column; width: 28%">
        <xr-ef-panel title="EAF1#炉" padding="2px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView12'"
              :toolbar-style="'both'"></er-grid>
          </template>
        </xr-ef-panel>
      </div>
      <div style="display: flex; flex-direction: column; width: 28%">
        <xr-ef-panel title="EAF2#炉" padding="2px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView13'"
              :toolbar-style="'both'"></er-grid>
          </template>
        </xr-ef-panel>
      </div>
      
      <!-- <div style="display: flex; flex-direction: column; width: 19%">
        <xr-ef-panel title="作业区通知" padding="5px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView14'"
              :toolbar-style="'both'"></er-grid>
          </template>
        </xr-ef-panel>
      </div> -->
      <div style="display: flex; flex-direction: column; width: 28%">
        <xr-ef-panel title="DES1#炉" padding="2px">
          <template #customButtonSlot></template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'GridView15'"
              :toolbar-style="'both'"></er-grid>
          </template>
        </xr-ef-panel>
      </div>

      <div style="display: flex; flex-direction: column; width: 16%">
        <!-- <xr-ef-panel title="作业区通知" padding="2px">
        <div id="textArea3"></div>
        </xr-ef-panel> -->
        <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'Layout_eaf'" style="font-weight: bold;line-height: normal;"
              ></er-layout>
      </div>
    </div>

    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./WMSMYRYS2N.ts">
</script>
