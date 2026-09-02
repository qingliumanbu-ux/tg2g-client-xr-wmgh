<template>
  <div class="chartcon" id="chartcon" @dragend="dragend(Con_LABEL)" draggable="true" unselectable="on">
    {{ Con_LABEL.CHARTS_DESC }}
  </div>
</template>

<script lang="ts">
import { number } from 'echarts';
import { EI } from 'EIX/ei';
import { onMounted, onBeforeUnmount, ref, inject, reactive } from 'vue';
// 定义布局项的类型


// 定义鼠标位置类型
interface MousePosition {
  x: number | null;
  y: number | null;
}



export default {
  name: 'ChartCons',
  props: {
    Conmess: { type: Object, default: reactive(new EI.EIInfo()) }
  },
  setup(props) {
    
    // 鼠标位置
    const Con_LABEL = ref(props.Conmess)
    const mouseXY = ref<MousePosition>({ x: null, y: null });
    const drag_con_end = inject<(data: string) => void>('drag_con_end');

    // 拖拽结束事件处理
    const dragend = (e: any) => {
      const parentRect = document.getElementById('content')?.getBoundingClientRect();
      if (!parentRect) return;

      // 检查鼠标是否在网格内
      const mouseInGrid = mouseXY.value.x !== null &&
        mouseXY.value.y !== null &&
        mouseXY.value.x > parentRect.left &&
        mouseXY.value.x < parentRect.right &&
        mouseXY.value.y > parentRect.top &&
        mouseXY.value.y < parentRect.bottom;

      if (mouseInGrid) {
       
        let x=Number(mouseXY.value.x)-parentRect.left;
           let y=Number(mouseXY.value.y)-parentRect.top;
           e.X=x;
            e.Y=y;
            e.WIDTH=parentRect.right-parentRect.left
        drag_con_end?.(e)

      }
    };

    // 鼠标移动事件监听器
    const mouseMoveHandler = (e: MouseEvent) => {
      mouseXY.value = { x: e.clientX, y: e.clientY };
    };

    // 组件挂载时添加事件监听
    onMounted(() => {
      document.addEventListener("dragover", mouseMoveHandler);
    });

    // 组件卸载前移除事件监听
    onBeforeUnmount(() => {
      document.removeEventListener("dragover", mouseMoveHandler);
    });

    return {

      dragend, Con_LABEL

    };
  },
};
</script>

<style>
.chartcon {
  width: 100%;
  height: 100%;
  /* background: rgb(52, 211, 198); */
}
</style>
