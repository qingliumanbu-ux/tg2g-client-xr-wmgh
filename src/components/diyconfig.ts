import * as echarts from 'echarts';
//虚线环形图
export const dashesPieConfig = (data: number) => {
    let value = 80;//百分比值
    data = data || value;
    let option: echarts.EChartsCoreOption = {
       
        series: [
            {//最外部细虚线
                type: 'gauge',
                startAngle: 270,
                endAngle: -89.9999,
                radius: '81%',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitNumber: 29,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: [
                            [1, 'rgba(0,130,229,1)']
                        ],
                        width: 20
                    }
                },
                splitLine: {
                    length: 3,
                    lineStyle: {
                        width: 12,
                        color: 'rgba(0,130,229,1)',
                        distance: 10,
                    } //刻度节点线
                },
                detail: {
                    show: false
                },
            },
            {//中间粗虚线环形图
                type: 'gauge',
                radius: '71%',
                clockwise: false,
                startAngle: '70',
                endAngle: '-269.9999',
                splitNumber: 22,
                detail: {
                    offsetCenter: [0, -20],
                    formatter: ' '
                },
                pointer: { show: false },
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 15,
                        color: [
                            [0, '#2CFAFC'],
                            [(100 - data) / 100, new echarts.graphic.RadialGradient(0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0,96,216,.9)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(0,200,248,.9)'
                            }
                            ], false)],
                            [1, 'rgba(32,187,252,0.15)']
                        ],

                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    length: 15,
                    lineStyle: {
                        color: '#071427',
                        width: 2
                    }
                },
                axisLabel: {
                    show: false
                }
            },
            {//最内部细环
                type: 'pie',
                name: '已整改',
                radius: ['50%', '51%'],
                hoverAnimation: false,
                clockWise: false,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,130,229,.7)'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        padding: [20, 45, 0, 40],
                        align: 'center',
                        lineHeight: 14, // 控制\n的行高
                        formatter: (param: any) => {
                            return `{a|${data}%}\n{b|${param.seriesName}}`;
                        },
                        rich: {
                            a: {
                                fontSize: 34,
                                color: '#fff',
                                lineHeight: 23,
                                fontFamily: 'LedFont',//这是项目引入的LED字体
                            },
                            b: {
                                fontSize: 16,
                                color: '#cacaca',
                                lineHeight: 38,
                            }
                        }
                    },
                },
                data: [3]
            }
        ] 
    };
    return option;
}