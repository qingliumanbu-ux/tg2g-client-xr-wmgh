<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane v-if="reload" label="form" name="first" class="demo-tab1">
      <DisForm class="DisForm" v-for="item in fosmTables" :form_conf="item" />
      <el-button class="button" type="primary" @click="form_Data_Ins">新增</el-button>
      <el-button class="button" type="info" @click="Save_Form_Data">保存</el-button>
    </el-tab-pane>
    <el-tab-pane label="component" name="second" class="demo-tab2">
      <ChartCon class="ChartCon droppable-element" v-for="item in chartscon_list" :Conmess="item" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  provide,
  inject,
  nextTick,
} from "vue";

import DisForm from "@/components/disPlayDiy/DisFosm.vue";
import ChartCon from "@/components/disPlayDiy/ChartCons.vue";
import { EI } from "EIX/ei";
import { ER } from "ERX/Er";

export default {
  name: "ListTabs",
  components: {
    DisForm,
    ChartCon,
  },
  props: {
    dataSource: {
      type: reactive(EI.EIInfo),
      default: reactive(new EI.EIInfo()),
    },
  },
  watch: {
    'dataSource': {
      deep: true,
      handler(props) {
        if (this) {
          this.fosmTables = props.getBlock("FOSM").data;

          this.reload = false;
          nextTick(() => {
            this.reload = true;
          });

        }
      },
    },
  },
  setup(props) {
    let fosmTables = reactive(props.dataSource.getBlock("FOSM").data);
    const chartscon_list = props.dataSource.getBlock("COMPONENTS").data;
    const reload = ref(true);
    const activeName = ref("first");
    const erFormHelper: ER.FormHelper = new ER.FormHelper() as any;

    let layout = [{ x: 0, y: 0, w: 0, h: 0, i: "", desc: "" }];
    let op_type = "I";
    let d_fosmTables: Array<Object> = [];
    
    const form_Data_Ins = () => {

      let id =
        Number(
          fosmTables[fosmTables.length - 1]?.IDX_REQ === undefined
            ? 0
            : fosmTables[fosmTables.length - 1]?.IDX_REQ
        ) + 1;
      fosmTables.push({
        IDX_REQ: id,
        FORM_DESC: "XXX",
        CONDITIONS: JSON.stringify(layout),
      });
    };
    const stopLabelEdit = async (e: any) => {
      for (let i = 0; i < fosmTables.length; i++) {
        if (fosmTables[i].IDX_REQ === e.IDX_REQ) {
          fosmTables[i].FORM_DESC = e.FORM_DESC;
        }
      }
 
    };
    const Expose_Form_Upd = async (e: any, mod: any) => {
      for (let i = 0; i < fosmTables.length; i++) {
        if (fosmTables[i].IDX_REQ === e.IDX_REQ) {
          fosmTables[i].VIEW_FLAG = mod;
        }
      }
    };
    const Expose_Form_Del = async (e: any) => {
      for (let i = 0; i < fosmTables.length; i++) {
        if (fosmTables[i].IDX_REQ === e.IDX_REQ) {

          d_fosmTables.push(fosmTables[i]);
          fosmTables.splice(i, 1);

        }
      }
      op_type = "D";
    };
    provide("stopLabelEdit", stopLabelEdit);
    provide("Expose_Form_Upd", Expose_Form_Upd);
    provide("Expose_Form_Del", Expose_Form_Del);
    const refresh = inject<(data: string) => void>("refresh");
    const Save_Form_Data = async () => {

      if (op_type === "D") {
        const inInfo = new EI.EIInfo();
        inInfo.addBlock(erFormHelper.buildEiBlock(d_fosmTables));
        inInfo.addBlock(erFormHelper.buildEiBlock([{ OP_TYPE: "D" }]), "TPYE");

        const outInfo = await erFormHelper.callService(
          "wmsm_form_save",
          inInfo,
          true,
          true,
          true
        );
        d_fosmTables.length = 0;
        op_type = 'I'
      } else {
        const inInfo = new EI.EIInfo();
        inInfo.addBlock(erFormHelper.buildEiBlock(fosmTables));
        inInfo.addBlock(erFormHelper.buildEiBlock([{ OP_TYPE: "I" }]), "TPYE");

        const outInfo = await erFormHelper.callService(
          "wmsm_form_save",
          inInfo,
          true,
          true,
          true
        );
      }

      refresh?.("1");
    };

    return {
      activeName,
      fosmTables,
      chartscon_list,
      form_Data_Ins,
      Save_Form_Data,
      reload
    };
  },
};
</script>

<style>
.demo-tabs {
  width: 18vw;
  height: 100%;
  padding: 1vw;
}

.demo-tab1 {
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  opacity: 0.7;
  padding: 1vw;
  overflow-y: auto;
  overflow-x: hidden;
}

.demo-tab2 {
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  opacity: 0.7;
  padding: 1vw;
  overflow-y: auto;
  overflow-x: hidden;
}

.DisForm {
  width: 14vw;
  height: 7.875vw;
  margin-bottom: 1vw;
  opacity: 1;
}

.ChartCon {
  width: 14vw;
  height: 7.875vw;
  margin-bottom: 1vw;
}

.el-tabs__item {
  color: #fff !important;
}

.el-tabs__item:hover {
  color: #409eff !important;
}

.el-tabs__item.is-active {
  color: #409eff !important;
}

.button {
  /* bottom: 20px;
  position: fixed; */
}
</style>
