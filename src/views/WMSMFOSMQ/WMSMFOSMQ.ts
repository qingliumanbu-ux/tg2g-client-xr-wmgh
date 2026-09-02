import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    computed,
    nextTick,
    toRaw,
    Ref,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import * as echarts from 'echarts';
import { vue3ScrollSeamless } from "vue3-scroll-seamless";

import A_1 from '@/assets/images/BOF/A_1.png';
import A_2 from '@/assets/images/BOF/A_2.png';
import A_3 from '@/assets/images/BOF/A_3.png';
import A_4 from '@/assets/images/BOF/A_4.png';
import B_1 from '@/assets/images/BOF/B_1.png';
import B_2 from '@/assets/images/BOF/B_2.png';
import B_3 from '@/assets/images/BOF/B_3.png';
import B_4 from '@/assets/images/BOF/B_4.png';
import C_1 from '@/assets/images/BOF/C_1.png';
import C_2 from '@/assets/images/BOF/C_2.png';
import C_3 from '@/assets/images/BOF/C_3.png';
import C_4 from '@/assets/images/BOF/C_4.png';
import D_1 from '@/assets/images/BOF/D_1.png';
import D_2 from '@/assets/images/BOF/D_2.png';
import D_3 from '@/assets/images/BOF/D_3.png';
import D_4 from '@/assets/images/BOF/D_4.png';

import D_A_1 from '@/assets/images/DUG/A_1.png';
import D_A_2 from '@/assets/images/DUG/A_2.png';
import D_A_3 from '@/assets/images/DUG/A_3.png';
import D_A_4 from '@/assets/images/DUG/A_4.png';
import D_B_1 from '@/assets/images/DUG/B_1.png';
import D_B_2 from '@/assets/images/DUG/B_2.png';
import D_B_3 from '@/assets/images/DUG/B_3.png';
import D_B_4 from '@/assets/images/DUG/B_4.png';
import D_C_1 from '@/assets/images/DUG/C_1.png';
import D_C_2 from '@/assets/images/DUG/C_2.png';
import D_C_3 from '@/assets/images/DUG/C_3.png';
import D_C_4 from '@/assets/images/DUG/C_4.png';
import D_D_1 from '@/assets/images/DUG/D_1.png';
import D_D_2 from '@/assets/images/DUG/D_2.png';
import D_D_3 from '@/assets/images/DUG/D_3.png';
import D_D_4 from '@/assets/images/DUG/D_4.png';





export default defineComponent({
    name: 'WMSMFOSMQ',
    components: {
        xrEfForm,
        xrEfPanel,
        erLayout,
        erGrid, vue3ScrollSeamless, 
    },
    methods: {},
    setup() {
        /** 画面显示的罐总数*/
        const efFormInfo = ref<{ [key: string]: any }>({});
        const erFormHelper: ER.FormHelper = new ER.FormHelper();
        let formPartition: string;
        const initializeFlag = ref(0);

        const old_count = ref();
        const old_wt = ref();
        const now_count = ref();
        const now_wt = ref();
        const old_count1 = ref();
        const old_wt1 = ref();
        const now_count1 = ref();
        const old_count2 = ref();
        const now_count2 = ref();
        const now_wt1 = ref();
        const total_wt = ref();
        let myChart1: echarts.ECharts;
        let myChart2: echarts.ECharts;
        let myChart3: echarts.ECharts;


        var option1: echarts.EChartsOption;
        var option2: echarts.EChartsOption;
        var option3: echarts.EChartsOption;


        var main_tout; //開始运行
        var datetime = new Date();
        var now_m = datetime.getMonth() + 1;
        var last_m = datetime.getMonth();
        const time_Now = ref();
        const textarea2 = ref('请输入冶炼要点......')

        const list = ref();



        const queryData = async () => {
            //clearTimeout(main_tout); //清除定时器
            const eiInfo = new EI.EIInfo();

            const outInfo = await erFormHelper.callService('wmsmfosmq_inq', eiInfo, true, true, true);
            console.log('fghjklQ;', outInfo)
            if (outInfo.sys.status < 0) {
                erFormHelper.messageError("错误:" + outInfo.sys.msg);
            } else {


                // old_count.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '01').map((item: any) => item.WORK_VALUE);
                // now_count.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '02').map((item: any) => item.WORK_VALUE);
                // old_count1.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03').map((item: any) => item.WORK_VALUE);
                // now_count1.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '04').map((item: any) => item.WORK_VALUE);
                // old_count2.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '15').map((item: any) => item.WORK_VALUE);
                // now_count2.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '16').map((item: any) => item.WORK_VALUE);
                // list.value = outInfo.getBlock(1).data;
               
            }




            option1 = {
                backgroundColor: 'rgba(0, 0, 0, 0)', // 设置背景色为透明
                legend: {},
                tooltip: {},
                title: {
                    text: '班组板坯交库量',
                    left: 'left'
                },
                xAxis: {
                    type: 'category', data: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '01').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.BACKC1), axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                    }
                },
                yAxis: {
                    type: 'value', axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                    }, name: '单位：吨', position: 'right', // 将 yAxis 放在右侧
                   
                },
                grid: {

                    right: 80,// 调整这个属性
                   
                },
                series: [{

                    data: [
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '01').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[0], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#0DD9C0' }, { offset: 1, color: '#00D883' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '01').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[1], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#F2DD15' }, { offset: 1, color: '#CDBD2A' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '01').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[2], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#009EFF' }, { offset: 1, color: '#0F69FE' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '01').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[3], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#01E3FE' }, { offset: 1, color: '#10A7FE' }] } } }],
                    type: 'bar', barWidth: 20, // 设置柱状图的宽度为30
                    itemStyle: {

                        borderRadius: [50, 50, 0, 0] // 设置顶部弧度

                    }
                },],
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{bg|{c}}',
                    rich: {
                        bg: {
                            align: 'center',
                            backgroundColor: {
                                image: '../../assets/images/元素2.png'
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
            option2 = {
                backgroundColor: 'rgba(0, 0, 0, 0)', // 设置背景色为透明
                legend: {},
                tooltip: {},
                title: {
                    text: '班组修磨量',
                    left: 'left'
                },
                xAxis: {
                    type: 'category', data: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '02').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.BACKC1), axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                    }
                },
                yAxis: {
                    type: 'value', axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                    }, name: '单位：吨', position: 'right', // 将 yAxis 放在右侧
                  
                },
                grid: {

                    right: 80,// 调整这个属性
                },
                series: [{

                    data: [
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '02').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[0], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#0DD9C0' }, { offset: 1, color: '#00D883' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '02').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[1], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#F2DD15' }, { offset: 1, color: '#CDBD2A' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '02').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[2], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#009EFF' }, { offset: 1, color: '#0F69FE' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '02').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[3], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#01E3FE' }, { offset: 1, color: '#10A7FE' }] } } }],
                    type: 'bar', barWidth: 20, // 设置柱状图的宽度为30
                    itemStyle: {

                        borderRadius: [50, 50, 0, 0] // 设置顶部弧度

                    }
                },],
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{bg|{c}}',
                    rich: {
                        bg: {
                            align: 'center',
                            backgroundColor: {
                                image: '../../assets/images/元素2.png'
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
            option3 = {
                backgroundColor: 'rgba(0, 0, 0, 0)', // 设置背景色为透明
                legend: {},
                tooltip: {},
                title: {
                    text: '班组产量',
                    left: 'left'
                },
                xAxis: {
                    type: 'category', data: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.BACKC1), axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                    }
                },
                yAxis: {
                    type: 'value', axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                    }, name: '单位：吨', position: 'right', // 将 yAxis 放在右侧
                  
                },
                grid: {

                    right: 80,// 调整这个属性
                },
                series: [{

                    data: [
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[0], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#0DD9C0' }, { offset: 1, color: '#00D883' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[1], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#F2DD15' }, { offset: 1, color: '#CDBD2A' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[2], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#009EFF' }, { offset: 1, color: '#0F69FE' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03').sort((a, b) => Number(a.BACKC2) - Number(b.BACKC2)).map((item: any) => item.WORK_VALUE)[3], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#01E3FE' }, { offset: 1, color: '#10A7FE' }] } } }],
                    type: 'bar', barWidth: 20, // 设置柱状图的宽度为30
                    itemStyle: {

                        borderRadius: [50, 50, 0, 0] // 设置顶部弧度

                    }
                },],
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{bg|{c}}',
                    rich: {
                        bg: {
                            align: 'center',
                            backgroundColor: {
                                image: '../../assets/images/元素2.png'
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
            option1 && myChart1.setOption(option1);
            option2 && myChart2.setOption(option2);
            option3 && myChart3.setOption(option3);





            setTimeout(queryData, 10 * 60 * 1000);
        };


        onMounted(() => {
            queryData();

            myChart1 = echarts.init(document.getElementById('t_q_1'), 'dark');
            myChart2 = echarts.init(document.getElementById('t_q_2'), 'dark');
            myChart3 = echarts.init(document.getElementById('t_q_3'), 'dark');

            initializeFlag.value = 1;


        })

        const fullsc = () => {
            const element = document.documentElement;

            if (document.fullscreenElement) {
                document.exitFullscreen();
                var newVw = window.innerWidth / 100;
                var newVh = window.innerHeight / 100;

                document.documentElement.style.setProperty('--vw', newVw + 'px');
                document.documentElement.style.setProperty('--vh', newVh + 'px');
            } else {
                element.requestFullscreen().catch((err) => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
                //window.location.reload();
                //element.$forceUpdate()

                var newVw = window.innerWidth / 100;
                var newVh = window.innerHeight / 100;

                document.documentElement.style.setProperty('--vw', newVw + 'px');
                document.documentElement.style.setProperty('--vh', newVh + 'px');
            }
        }
        window.addEventListener('resize', function () {

            // 计算新的vw值

        });
        onMounted(() => {

            //scroll(tableRef.value.$refs.bodyWrapper) //设置滚动

        })
        const scroll = (tableBody: any) => {
            // console.log('dfghjkl', tableBody);
            // let isScroll = true //滚动
            // const tableDom = tableBody.getElementById('ELE_F_LIST1')[0]

            // //鼠标放上去，停止滚动；移开，继续滚动
            // tableDom.addEventListener('mouseover', () => {
            //     isScroll = false
            // })
            // tableDom.addEventListener('mouseout', () => {
            //     isScroll = true
            // })

            // setInterval(() => {
            //     if (isScroll) {
            //         tableDom.scrollTop += 3 //设置滚动速度
            //         if (tableDom.clientHeight + tableDom.scrollTop == tableDom.scrollHeight) {
            //             tableDom.scrollTop = 0
            //         }
            //     }
            // }, 100)
        }

        let imageUrl1: any = A_4;
        let imageUrl2: any = C_3;
        let imageUrl3: any = B_2;
        let imageUrl4: any = D_1;
        let imageUrl_1: any = D_A_4;
        let imageUrl_2: any = D_C_3;
        let imageUrl_3: any = D_B_2;
        let imageUrl_4: any = D_D_1;
        let fir_col = '#2ebaff';
        let sec_col = '#08eeff';
        let tir_col = '#3aefbb';
        let fou_col = '#f4d74a';
        let startColor = '#0adbf1';
        let endColor = '#0c2354';

        return {
            time_Now, old_count, old_wt, now_count, now_wt, old_count1, old_wt1, now_count1, now_wt1, total_wt, initializeFlag, fullsc, textarea2, old_count2, now_count2, list, imageUrl1, imageUrl2, imageUrl3, imageUrl4, fou_col, fir_col, sec_col, tir_col, startColor, endColor, imageUrl_1, imageUrl_2, imageUrl_3, imageUrl_4

        };
    }
});
