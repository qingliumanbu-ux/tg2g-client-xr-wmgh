<template>

    <div class="chart" >
        <div class="header">
            <div class="title font" >
              
            </div>
        </div>

        <div class="echart" ref="echartRef"></div>
    </div>

</template>

<script lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from "echarts";


export default {
    name: 'ChartWidget',
    props: {
       
    },
    
    computed: {
        
    },
    setup(props: any) {
       

       

        onMounted(() => {
           
        });

        onUnmounted(() => {
           
        });

        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>
.chart {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.header {
    padding-bottom: 10px;
}

.font {
    font-family: "微软雅黑";
    font-weight: bold;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.2vw;
}

.echart {
    height: 100%;
    width: 100%;
    color: orange;
}
</style>