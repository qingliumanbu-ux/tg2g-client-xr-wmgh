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

import B_A from '@/assets/images/BOR_A.png';
import B_B from '@/assets/images/BOR_B.png';
import B_C from '@/assets/images/BOR_C.png';
import B_D from '@/assets/images/BOR_D.png';

import L_A from '@/assets/images/LF_A.png';
import L_B from '@/assets/images/LF_B.png';
import L_C from '@/assets/images/LF_C.png';
import L_D from '@/assets/images/LF_D.png';

import 甲_1 from '@/assets/images/BOF_ZQ/A_1.png';
import 甲_2 from '@/assets/images/BOF_ZQ/A_2.png';
import 甲_3 from '@/assets/images/BOF_ZQ/A_3.png';
import 甲_4 from '@/assets/images/BOF_ZQ/A_4.png';
import 乙_1 from '@/assets/images/BOF_ZQ/B_1.png';
import 乙_2 from '@/assets/images/BOF_ZQ/B_2.png';
import 乙_3 from '@/assets/images/BOF_ZQ/B_3.png';
import 乙_4 from '@/assets/images/BOF_ZQ/B_4.png';
import 丙_1 from '@/assets/images/BOF_ZQ/C_1.png';
import 丙_2 from '@/assets/images/BOF_ZQ/C_2.png';
import 丙_3 from '@/assets/images/BOF_ZQ/C_3.png';
import 丙_4 from '@/assets/images/BOF_ZQ/C_4.png';
import 丁_1 from '@/assets/images/BOF_ZQ/D_1.png';
import 丁_2 from '@/assets/images/BOF_ZQ/D_2.png';
import 丁_3 from '@/assets/images/BOF_ZQ/D_3.png';
import 丁_4 from '@/assets/images/BOF_ZQ/D_4.png';



export default defineComponent({
    name: 'WMSMFOSMC',
    components: {
        xrEfForm,
        xrEfPanel,
        erLayout,
        erGrid, vue3ScrollSeamless
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
        const now_wt1 = ref();
        const total_wt = ref();
        let myChart1: echarts.ECharts;
        let myChart2: echarts.ECharts;
        let myChart3: echarts.ECharts;
        let myChart4: echarts.ECharts;
        let myChart5: echarts.ECharts;
        let myChart6: echarts.ECharts;
        let myChart7: echarts.ECharts;
        let myChart8: echarts.ECharts;
        let myChart9: echarts.ECharts;
        let myChart10: echarts.ECharts;

        var option1: echarts.EChartsOption;
        var option2: echarts.EChartsOption;
        var option3: echarts.EChartsOption;
        var option4: echarts.EChartsOption;
        var option5: echarts.EChartsOption;
        var option6: echarts.EChartsOption;
        var option7: echarts.EChartsOption;
        var option8: echarts.EChartsOption;
        var option9: echarts.EChartsOption;
        var option10: echarts.EChartsOption;

        var main_tout; //開始运行
        var datetime = new Date();
        var now_m = datetime.getMonth() + 1;
        var last_m = datetime.getMonth();
        const time_Now = ref();
        const list = ref();
        const data_c = reactive([{}]);

        const bof_1 = ref();
        const bof_2 = ref();
        const bof_3 = ref();
        const bof_4 = ref();
        const bof_1_n = ref();
        const bof_2_n = ref();
        const bof_3_n = ref();
        const bof_4_n = ref();
        const imageUrl1 = ref(甲_1);
        const imageUrl2 = ref(丙_2);
        const imageUrl3 = ref(乙_3);
        const imageUrl4 = ref(丁_4);


        const jz_1 = ref();
        const jz_2 = ref();
        const jz_3 = ref();
        const jz_4 = ref();
        const jz_1_n = ref();
        const jz_2_n = ref();
        const jz_3_n = ref();
        const jz_4_n = ref();
        const imageUrlB1 = ref(B_A);
        const imageUrlB2 = ref(B_B);
        const imageUrlB3 = ref(B_C);
        const imageUrlB4 = ref(B_D);

        let lf_1 :any;
        let lf_2: any;
        let lf_3: any;
        let lf_4: any;
        const lf_1_n = ref();
        const lf_2_n = ref();
        const lf_3_n = ref();
        const lf_4_n = ref();

       
        //主表查询

        const queryData = async () => {
            //clearTimeout(main_tout); //清除定时器
            const eiInfo = new EI.EIInfo();

            const outInfo = await erFormHelper.callService('wmsmfosmc_inq', eiInfo, true, true, true);
            console.log('fghjklC;', outInfo)
            if (outInfo.sys.status < 0) {
                erFormHelper.messageError("错误:" + outInfo.sys.msg);
            } else {
                data_c.length = 0;
                data_c.push(outInfo.getBlock(0).data);
                console.log('iuhbjkop', data_c)

                //bof当月平均冶炼周期
                {
                    bof_1.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03' && String(item.BACKC2) === '1')[0].BACKC1;
                    bof_1_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03' && String(item.BACKC2) === '1')[0].WORK_VALUE;
                    if (bof_1.value === '甲')
                        imageUrl1.value = 甲_1;
                    if (bof_1.value === '乙')
                        imageUrl1.value = 乙_1;
                    if (bof_1.value === '丙')
                        imageUrl1.value = 丙_1;
                    if (bof_1.value === '丁')
                        imageUrl1.value = 丁_1;

                    bof_2.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03' && String(item.BACKC2) === '2')[0].BACKC1;
                    bof_2_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03' && String(item.BACKC2) === '2')[0].WORK_VALUE;
                    if (bof_2.value === '甲')
                        imageUrl2.value = 甲_2;
                    if (bof_2.value === '乙')
                        imageUrl2.value = 乙_2;
                    if (bof_2.value === '丙')
                        imageUrl2.value = 丙_2;
                    if (bof_2.value === '丁')
                        imageUrl2.value = 丁_2;

                    bof_3.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03' && String(item.BACKC2) === '3')[0].BACKC1;
                    bof_3_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03' && String(item.BACKC2) === '3')[0].WORK_VALUE;
                    if (bof_3.value === '甲')
                        imageUrl3.value = 甲_3;
                    if (bof_3.value === '乙')
                        imageUrl3.value = 乙_3;
                    if (bof_3.value === '丙')
                        imageUrl3.value = 丙_3;
                    if (bof_3.value === '丁')
                        imageUrl3.value = 丁_3;

                    bof_4.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03' && String(item.BACKC2) === '4')[0].BACKC1;
                    bof_4_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '03' && String(item.BACKC2) === '4')[0].WORK_VALUE;
                    if (bof_4.value === '甲')
                        imageUrl4.value = 甲_4;
                    if (bof_4.value === '乙')
                        imageUrl4.value = 乙_4;
                    if (bof_4.value === '丙')
                        imageUrl4.value = 丙_4;
                    if (bof_4.value === '丁')
                        imageUrl4.value = 丁_4;
                }

                //转炉溅渣兑铁间隔
                {
                    jz_1.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '04' && String(item.BACKC2) === '1')[0].BACKC1;
                    jz_1_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '04' && String(item.BACKC2) === '1')[0].WORK_VALUE;
                    if (jz_1.value === '甲')
                        imageUrlB1.value = B_A;
                    if (jz_1.value === '乙')
                        imageUrlB1.value = B_B;
                    if (jz_1.value === '丙')
                        imageUrlB1.value = B_C;
                    if (jz_1.value === '丁')
                        imageUrlB1.value = B_D;

                    jz_2.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '04' && String(item.BACKC2) === '2')[0].BACKC1;
                    jz_2_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '04' && String(item.BACKC2) === '2')[0].WORK_VALUE;
                    if (jz_2.value === '甲')
                        imageUrlB2.value = B_A;
                    if (jz_2.value === '乙')
                        imageUrlB2.value = B_B;
                    if (jz_2.value === '丙')
                        imageUrlB2.value = B_C;
                    if (jz_2.value === '丁')
                        imageUrlB2.value = B_D;

                    jz_3.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '04' && String(item.BACKC2) === '3')[0].BACKC1;
                    jz_3_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '04' && String(item.BACKC2) === '3')[0].WORK_VALUE;
                    if (jz_3.value === '甲')
                        imageUrlB3.value = B_A;
                    if (jz_3.value === '乙')
                        imageUrlB3.value = B_B;
                    if (jz_3.value === '丙')
                        imageUrlB3.value = B_C;
                    if (jz_3.value === '丁')
                        imageUrlB3.value = B_D;

                    jz_4.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '04' && String(item.BACKC2) === '4')[0].BACKC1;
                    jz_4_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '04' && String(item.BACKC2) === '4')[0].WORK_VALUE;
                    if (jz_4.value === '甲')
                        imageUrlB4.value = B_A;
                    if (jz_4.value === '乙')
                        imageUrlB4.value = B_B;
                    if (jz_4.value === '丙')
                        imageUrlB4.value = B_C;
                    if (jz_4.value === '丁')
                        imageUrlB4.value = B_D;
                }

                //LF精炼时间
                {
                    lf_1 = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '05' && String(item.BACKC2) === '1')[0].BACKC1;
                    lf_2 = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '05' && String(item.BACKC2) === '2')[0].BACKC1;
                    lf_3 = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '05' && String(item.BACKC2) === '3')[0].BACKC1;
                    lf_4 = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '05' && String(item.BACKC2) === '4')[0].BACKC1;
                    lf_1_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '05' && String(item.BACKC2) === '1')[0].WORK_VALUE;
                    lf_2_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '05' && String(item.BACKC2) === '2')[0].WORK_VALUE;
                    lf_3_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '05' && String(item.BACKC2) === '3')[0].WORK_VALUE;
                    lf_4_n.value = outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '05' && String(item.BACKC2) === '4')[0].WORK_VALUE;
                    if (lf_1 === '甲')
                        rgbColor1.value = L_A;
                    if (lf_1 === '乙')
                        rgbColor1.value = L_B;
                    if (lf_1 === '丙')
                        rgbColor1.value = L_C;
                    if (lf_1 === '丁')
                        rgbColor1.value = L_D;

                    if (lf_2 === '甲')
                        rgbColor2.value = L_A;
                    if (lf_2 === '乙')
                        rgbColor2.value = L_B;
                    if (lf_2 === '丙')
                        rgbColor2.value = L_C;
                    if (lf_2 === '丁')
                        rgbColor2.value = L_D;

                    if (lf_3 === '甲')
                        rgbColor3.value = L_A;
                    if (lf_3 === '乙')
                        rgbColor3.value = L_B;
                    if (lf_3 === '丙')
                        rgbColor3.value = L_C;
                    if (lf_3 === '丁')
                        rgbColor3.value = L_D;

                    if (lf_4 === '甲')
                        rgbColor4.value = L_A;
                    if (lf_4 === '乙')
                        rgbColor4.value = L_B;
                    if (lf_4 === '丙')
                        rgbColor4.value = L_C;
                    if (lf_4 === '丁')
                        rgbColor4.value = L_D;
                }
            }

            option1 = {
                backgroundColor: 'rgba(0, 0, 0, 0)', // 设置背景色为透明
                legend: {},
                tooltip: {},
                title: {
                    text: '当月班组BOF炉数',
                    left: 'left', textStyle: {
                        fontSize: 24  // 设置标题的字体大小为20
                    }
                },
                xAxis: {
                    type: 'value', axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                    }, name: '单位：吨', position: 'top', // 将 yAxis 放在右侧
                    splitLine: {
                        show: false // 隐藏 y 轴的网格线
                    }
                },
                yAxis: {
                  
                    type: 'category', data: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '01').sort((a, b) => Number(b.BACKC2) - Number(a.BACKC2)).map((item: any) => item.BACKC1), axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                    }, axisLine: {
                        show: false
                    },
                },
                grid: {

                    right: 100,// 调整这个属性

                },
                series: [{

                    data: [
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '01').sort((a, b) => Number(b.BACKC2) - Number(a.BACKC2)).map((item: any) => item.WORK_VALUE)[0], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#0DD9C0' }, { offset: 1, color: '#00D883' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '01').sort((a, b) => Number(b.BACKC2) - Number(a.BACKC2)).map((item: any) => item.WORK_VALUE)[1], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#F2DD15' }, { offset: 1, color: '#CDBD2A' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '01').sort((a, b) => Number(b.BACKC2) - Number(a.BACKC2)).map((item: any) => item.WORK_VALUE)[2], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#009EFF' }, { offset: 1, color: '#0F69FE' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '01').sort((a, b) => Number(b.BACKC2) - Number(a.BACKC2)).map((item: any) => item.WORK_VALUE)[3], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#01E3FE' }, { offset: 1, color: '#10A7FE' }] } } }],
                    type: 'bar', barWidth: 15, // 设置柱状图的宽度为30
                    itemStyle: {

                        borderRadius: [50, 50, 50, 50] // 设置顶部弧度

                    }
                },],
                label: {
                    show: true,
                    position: 'right',
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
                    text: '当月班组BOF产量',
                    left: 'left', textStyle: {
                        fontSize: 24  // 设置标题的字体大小为20
                    }
                },
                xAxis: {
                    type: 'value', axisLabel: {
                        fontSize: 20 // 设置X轴标签字体大小为12px
                    }, name: '单位：吨', position: 'top', // 将 yAxis 放在右侧
                    splitLine: {
                        show: false // 隐藏 y 轴的网格线
                    }
                },
                yAxis: {

                    type: 'category', data: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '02').sort((a, b) => Number(b.BACKC2) - Number(a.BACKC2)).map((item: any) => item.BACKC1), axisLabel: {
                        fontSize: 15 // 设置X轴标签字体大小为12px
                    }, axisLine: {
                        show: false
                    },
                },
                grid: {

                    right: 100,// 调整这个属性

                },
                series: [{

                    data: [
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '02').sort((a, b) => Number(b.BACKC2) - Number(a.BACKC2)).map((item: any) => item.WORK_VALUE)[0], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#0DD9C0' }, { offset: 1, color: '#00D883' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '02').sort((a, b) => Number(b.BACKC2) - Number(a.BACKC2)).map((item: any) => item.WORK_VALUE)[1], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#F2DD15' }, { offset: 1, color: '#CDBD2A' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '02').sort((a, b) => Number(b.BACKC2) - Number(a.BACKC2)).map((item: any) => item.WORK_VALUE)[2], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#009EFF' }, { offset: 1, color: '#0F69FE' }] } } },
                        { value: outInfo.getBlock(0).data.filter(item => String(item.WORK_CODE) === '02').sort((a, b) => Number(b.BACKC2) - Number(a.BACKC2)).map((item: any) => item.WORK_VALUE)[3], itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#01E3FE' }, { offset: 1, color: '#10A7FE' }] } } }],
                    type: 'bar', barWidth: 20, // 设置柱状图的宽度为30
                    itemStyle: {

                        borderRadius: [50, 50, 50, 50] // 设置顶部弧度

                    }
                },],
                label: {
                    show: true,
                    position: 'right',
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
            setTimeout(queryData, 10 * 60 * 1000);
        };


        onMounted(() => {
            queryData();
           
            myChart1 = echarts.init(document.getElementById('t_c_1'), 'dark');
            myChart2 = echarts.init(document.getElementById('t_c_2'), 'dark');

            initializeFlag.value = 1;
        })

        function hexToRgb(hex: string): string {
            // 去除 # 号
            hex = hex.replace("#", "");

            // 如果是缩写形式的颜色值（如 #FFF），则进行转换
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }

            // 将 16 进制颜色值转换为 RGB 格式
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);

            return `rgba(${r}, ${g}, ${b},0.3)`;
        }
        const hexColor1 = "#30b2fb";
        const hexColor2 = "#fbe660";
        const hexColor3 = "#59e2fb";
        const hexColor4 = "#40efb6";
        const rgbColor1 = ref(L_A);
        const rgbColor2 = ref(L_B);
        const rgbColor3 = ref(L_C);
        const rgbColor4 = ref(L_D);
        console.log('iuygfcvghjiopokjhb', rgbColor1)

        const classOptions = {
            step: 0.1
        };
      
        let fir_col = '#2ebaff';
        let sec_col = '#08eeff';
        let tir_col = '#3aefbb';
        let fou_col = '#f4d74a';
        let startColor1 = '#02c2fe';
        let endColor1 = '#0f3352';
        let startColor2 = '#fedc33';
        let endColor2 = '#524d1f';
        let startColor3 = '#2bf7fe';
        let endColor3 = '#1c4452';
        let startColor4 = '#18f290';
        let endColor4 = '#12463b';




        return {
            time_Now, old_count, old_wt, now_count, now_wt, old_count1, old_wt1, now_count1, now_wt1, total_wt, initializeFlag, list, fou_col, fir_col, sec_col, tir_col, startColor1, endColor1, startColor2, endColor2, startColor3, endColor3, startColor4, endColor4, rgbColor1, rgbColor2, rgbColor3, rgbColor4, hexColor1, hexColor2, hexColor3, hexColor4, data_c, bof_1, bof_2, bof_3, bof_4, bof_1_n, bof_2_n, bof_3_n, bof_4_n, imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrlB1, imageUrlB2, imageUrlB3, imageUrlB4, jz_1, jz_2, jz_3, jz_4, jz_1_n, jz_2_n, jz_3_n, jz_4_n, lf_1_n, lf_2_n, lf_3_n, lf_4_n

        };
    }
});
