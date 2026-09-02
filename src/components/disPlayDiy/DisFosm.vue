<template>
  <div class="disform" @click="disform_click(label)" ref="formRef">
    <grid-layout
      class="gridlayout"
      ref="gridlayout"
      :layout.sync="grid_list"
      :col-num="12"
      :row-height="10"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="false"
      :use-css-transforms="true"
    >
      <div
        v-if="!if_visable"
        id="editable-div"
        ref="editableDiv"
        style="margin: auto; font-size: 20px"
        :contenteditable="if_editable"
        @click="span_click(label)"
        @blur="handleBlur(label)"
      >
        {{ label.FORM_DESC }}
      </div>
      <View
        v-if="!if_visable && if_view_hide"
        class="icon"
        @click="if_View_Hide(label)"
      />
      <Hide
        v-if="!if_visable && !if_view_hide"
        class="icon"
        @click="if_View_Hide(label)"
      />
      <CloseBold v-if="!if_visable" class="icon" @click="delete_form(label)" />
      <grid-item
        :key="item.i"
        v-for="item in grid_list"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        class=""
        v-if="if_visable"
        @moved="movedGridItem"
        @resized="resizeGridItem"
      >
        <span class="text">{{ item.desc }}</span>
        <div class="del_con" @click="del_con(item)">X</div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { EI } from "EIX/ei";

import { ref, inject, onMounted, reactive, provide } from "vue";
import VueGridLayout from "vue-grid-layout";
import { Hide, View, CloseBold } from "@element-plus/icons-vue";

export default {
  name: "ListTabs",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    View,
    CloseBold,
    Hide,
  },
  props: {
    form_conf: { type: Object, default: reactive(new EI.EIInfo()) },
    ins_con_conf: { type: Object },
    if_visable: { type: Boolean, default: false },
  },
  watch: {
    'form_conf': {
      deep: true,
      handler(props) {
      
        if (this.formRef) {
          this.form_Change(props);
        }
      },
    },
    'ins_con_conf': {
      deep: true,
      handler(props) {
     
        if (this.formRef) {
          this.insGridItem(props);
        }
      },
    },
  },

  setup(props) {
   
    const formRef = ref<HTMLElement | null>(null);
    const gridlayout = ref<HTMLElement | null>(null);
    const editableDiv = ref<HTMLElement | null>(null);
    const label = ref(props.form_conf);

    const if_visable = ref(props.if_visable);
    const if_view_hide = ref(true);

    const grid_list = ref<
      { x: number; y: number; w: number; h: number; i: string; desc: string }[]
    >([]);
    const if_editable = ref(false);
    if (props.form_conf.hasOwnProperty("CONDITIONS")) {
      grid_list.value.length = 0;
      for (let i = 0; i < JSON.parse(props.form_conf?.CONDITIONS).length; i++) {
        grid_list.value.push(JSON.parse(props.form_conf?.CONDITIONS)[i]);
      }
    }
    if (props.form_conf.hasOwnProperty("VIEW_FLAG")) {
      if_view_hide.value = props.form_conf?.VIEW_FLAG == "F" ? false : true;
    }

    const form_Change = (e: any) => {
      label.value = e;

      grid_list.value.length = 0;
      for (let i = 0; i < JSON.parse(e?.CONDITIONS).length; i++) {
        grid_list.value.push(JSON.parse(e?.CONDITIONS)[i]);
      }
    };

    const handleChildClick = inject<(data: string) => void>("handleChildClick");
    const stopLabelEdit = inject<(data: string) => void>("stopLabelEdit");
    const Expose_Label =
      inject<(data: Object, label: any) => void>("Expose_Label");
    const Expose_Form_Upd =
      inject<(data: Object, viewmod: string) => void>("Expose_Form_Upd");
    const Expose_Form_Del = inject<(data: Object) => void>("Expose_Form_Del");
    const disform_click = (e: any) => {
      handleChildClick?.(e);
    };
    const span_click = (e: any) => {
      if_editable.value = true;
    };
    const handleBlur = (e: any) => {
      if_editable.value = false;
      e.FORM_DESC = editableDiv.value!.innerText;

      stopLabelEdit?.(e);
    };
    onMounted(() => {});
    const insGridItem = (e: any) => {
      console.log(e, label.value.IDX_REQ);
      for (let i = 0; i < grid_list.value.length; i++) {
        if (grid_list.value[i].i === e.EQUIP_CODE) {
          alert("不允许拉入两个相同的组件！");
          return;
        }
      }
      if (label.value.IDX_REQ) {
        grid_list.value.push({
          x: Math.round(e.X / (e.WIDTH / 12)),
          y: Math.round(e.Y / 22), // 放在底部
          w: 2,
          h: 3,
          i: e.EQUIP_CODE,
          desc: e.CHARTS_DESC,
        });
        Expose_Label?.(grid_list, label.value);
      }
    };

    const resizeGridItem = (
      i: any,
      newH: any,
      newW: any,
      newHPx: any,
      newWPx: any
    ) => {
      const parentRect = document
        .getElementById("content")
        ?.getBoundingClientRect();
      if (!parentRect) return;
      let v_width = parentRect.right - parentRect.left;

      console.log(i, newH, newW, newHPx, newWPx, v_width);
      if (label.value.IDX_REQ) {
        for (let j = 0; j < grid_list.value.length; j++) {
          if (grid_list.value[j].i === i) {
            grid_list.value[j] = {
              x: grid_list.value[j].x,
              y: grid_list.value[j].y, // 放在底部
              w: newW,
              h: newH,
              i: i,
              desc: grid_list.value[j].desc,
            };
          }
        }

        Expose_Label?.(grid_list, label.value);
      }
    };
    const movedGridItem = (i: any, newX: any, newY: any) => {
      console.log(i, newX, newY);
      if (label.value.IDX_REQ) {
        for (let j = 0; j < grid_list.value.length; j++) {
          if (grid_list.value[j].i === i) {
            grid_list.value[j] = {
              x: newX,
              y: newX, // 放在底部
              w: grid_list.value[j].w,
              h: grid_list.value[j].h,
              i: i,
              desc: grid_list.value[j].desc,
            };
          }
        }
        Expose_Label?.(grid_list, label.value);
      }
    };

    const if_View_Hide = (e: any) => {
      console.log(if_view_hide, !if_view_hide.value);
      if_view_hide.value = !if_view_hide.value;
      Expose_Form_Upd?.(
        e,
        String(if_view_hide.value).substring(0, 1).toUpperCase()
      );
    };

    const delete_form = (e: any) => {
      Expose_Form_Del?.(e);
    };

    const del_con = (e: any) => {
      if (label.value.IDX_REQ) {
        for (let j = 0; j < grid_list.value.length; j++) {
          if (grid_list.value[j].i === e.i) {
            grid_list.value.splice(j, 1);
          }
        }
        Expose_Label?.(grid_list, label.value);
      }
    };

    return {
      label,
      grid_list,
      disform_click,
      formRef,
      gridlayout,
      editableDiv,
      form_Change,
      if_visable,
      span_click,
      if_editable,
      handleBlur,
      insGridItem,
      movedGridItem,
      resizeGridItem,
      if_view_hide,
      if_View_Hide,
      delete_form,
      del_con,
    };
  },
};
</script>

<style>
.disform {
  width: 100%;
  height: 100%;
  background: #939999;
  opacity: 0.4;
}

.gridlayout {
  width: 100%;
  height: 100% !important;
  display: flex;
}

.droppable-element {
  width: 150px;
  text-align: center;
  background: #fdd;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
}

.icon {
  width: 20px !important;
  height: 20px !important;
}

.del_con {
  font-size: 24px;
  right: 10px;
  position: absolute;
}

.vue-grid-layout {
  /* background: #eee; */
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}

.vue-grid-item {
  opacity: 1;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
</style>
