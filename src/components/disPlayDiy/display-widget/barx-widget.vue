<template>
    <div class="barx" ref="barxContainer"></div>
    <img src="../../../assets/images/元素2.png" alt="Dynamic Image"
                        style="position: absolute;top: 50px;right: 50px; width: 40px;">
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { shift_Color, shift_Cname_l } from "@/components/utils/util"

export default {
    name: 'BarxWidget',
    props: {
        designer: Object,

    },
    setup(props) {

        let myChart: echarts.ECharts;
        var option: echarts.EChartsOption;
        const initializeFlag = ref(0);
         const barxContainer = ref<HTMLElement | null>(null);
        let v_data = props.designer?.DATA.map((item: any) => {
            return {
                data: Object.entries(item).map(([name, value]) => ({ name, value, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: shift_Color(name) } } })),

                type: 'bar', barWidth: 20, // 设置柱状图的宽度为30
                itemStyle: {

                    borderRadius: [0, 50, 50, 0], // 设置顶部弧度


                }
            };
        })
        
        const uniData = async () => {
            option = {
                backgroundColor: 'rgba(0, 0, 0, 0)', // 设置背景色为透明
                legend: {},
                tooltip: {},
                title: {
                    text: props.designer?.CON_INFO.BACK_COL_7,
                    left: 'left'
                },
                xAxis: {
                    type: 'value', axisLabel: {
                        fontSize: 20,
                        show:false // 设置X轴标签字体大小为12px
                    }, name: props.designer?.CON_INFO.OUHP_EXTITEM_19, position: 'top', // 将 yAxis 放在右侧
                     splitLine: {
                        show: false // 隐藏 y 轴的网格线
                    }
                },
                yAxis: {

                    type: 'category', data: shift_Cname_l(Object.keys(props.designer?.DATA[0])),
                    axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                        
                    },axisLine: {
                        show: false
                    },
                },
                grid: {

                    right: 80,// 调整这个属性
                },
                series: v_data,
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{bg|{c}}',
                    rich: {
                        bg: {
                            align: 'center',
                            width: 50,
                            height: 50,
                            padding: [10, 10]
                        }
                    }
                },
                textStyle: {
                    fontSize: 20 // 设置全局字体大小为14px
                },// 添加图形元素到柱状顶部


            };
            option && myChart.setOption(option);
        }
        onMounted(() => {

            myChart = echarts.init(barxContainer.value, 'dark');
            uniData();
        
            initializeFlag.value = 1;
        })
        return {
            initializeFlag,barxContainer
        }
    }
}
</script>

<style lang="scss" scoped>
.barx {
    width: 100%;
    height: 100%;
    //background:green;
}
</style>