<template>
    <div class="line" ref="lineContainer"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';


export default {
    name: 'LineWidget',
    props: {
        designer: Object,

    },
    setup(props) {

        let v_cols: Array<string> = [];
        for (let k = 0; k < props.designer?.COL.length; k++) {
            v_cols.push(props.designer?.COL[k].name)
        }

        let myChart: echarts.ECharts;
        var option: echarts.EChartsOption;
        const initializeFlag = ref(0);
 const lineContainer = ref<HTMLElement | null>(null);
        // 转换函数：按指定顺序生成键值对数组
        const convertToOrderedArray = (obj: Record<string, number>) => {
            return v_cols
                .filter(key => key in obj) // 只保留对象中存在的键
                .map(key => ({ name: key, value: obj[key] })); // 转换为 { name, value }
        };


        let v_data = props.designer?.DATA.map((item: any) => {
            return {
                data: convertToOrderedArray(item),
                type: 'line',
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
                    type: 'category', data: v_cols,
                    axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                    }
                },
                yAxis: {
                    type: 'value', axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                    }, name: props.designer?.CON_INFO.OUHP_EXTITEM_19, position: 'right', // 将 yAxis 放在右侧

                },
                grid: {

                    right: 80,// 调整这个属性
                },
                series: v_data,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{bg|{c}}',
                    rich: {
                        bg: {
                            align: 'center',
                            backgroundColor: {
                                image: '../../../assets/images/元素2.png'
                            },
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

            myChart = echarts.init(lineContainer.value, 'dark');
            uniData();

            initializeFlag.value = 1;
        })
        return {
            initializeFlag,lineContainer
        }
    }
}
</script>

<style lang="scss" scoped>
.line {
    width: 100%;
    height: 100%;
    // background: transparent !important;
}
</style>