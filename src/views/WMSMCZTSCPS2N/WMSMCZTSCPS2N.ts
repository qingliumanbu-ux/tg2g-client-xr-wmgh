/* eslint-disable no-use-before-define */
import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    computed,
    nextTick,
    toRaw,
    Ref,
    watch,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import ErPopFree from 'ERX/ErPopFree';
import { Console } from "console";
import { Plus, Minus } from '@element-plus/icons-vue'
import RichTextEditor from "@/components/RichTextEditor.vue";


export default defineComponent({
    name: '',
    components: {
        xrEfForm,
        xrEfPanel,
        erLayout,
        erGrid, ErPopFree, Plus, Minus, RichTextEditor
    },
    setup: () => {
        // 获取画面的分区信息及设置画面初始化service
        const efFormInfo = ref<{ [key: string]: any }>({});
        let formPartition: string;
        let formName_Now: string;
        const initializeService = 'wm00_form_get';

        // 变量定义
        let formName = 'WMSMCZTSCPS2N';
        const erFormHelper: ER.FormHelper = new ER.FormHelper();
        const initializeFlag = ref(0);
        const layout = ref();
        const gridview = ref();
        const v_font_size = ref(30);
        let v_font_size_c = 0;
        let v_font_size_l = 40;
        const v_font_color = ref();
        let v_text = '';
        const ifview = ref<boolean>(false);
        let guanjianci: (string | number | boolean | Date | Buffer | null)[] = [];
        let biaoshifu: any = '';
        // const heat_now = ref('当前炉');
        const STA_1 = ref('');
        const STA_2 = ref('');
        let tab_n = '';
        let v_userid = '';
        const time_Now = ref();
        const guicheng = ref('<p>请输入...</p>')
        const gridView_tab1 = ref('GridView1');
        const gridView_tab2 = ref('GridView2');

        // const grid1_title = ref('排产钢种');
        let grid1_t_tmp = '';

        var t = setTimeout(time, 1000); //開始运行
        function time() {
            clearTimeout(t); //清除定时器
            var dt = new Date();
            var y = dt.getFullYear();
            var mt = dt.getMonth() + 1;
            var day = dt.getDate();
            var h = dt.getHours(); //获取时
            var m = dt.getMinutes(); //获取分
            var s = dt.getSeconds(); //获取秒
            time_Now.value =

                y +
                "年" +
                mt +
                "月" +
                day +
                "日 " +
                h +
                ":" +
                m +
                ":" +
                s;
            t = setTimeout(time, 1000); //设定定时器，循环运行
        }
        let gridView1: any;
        const erGrid1Ready = (e: any) => {
            gridView1 = erFormHelper.getGrid('GridView1');

            // gridView1.gridOptions.getRowStyle = (params: any) => {
            //     console.log('params', params);
            //     if (params.data) {

            //         if ((params.data.ELM_FieldNameACT < params.data.SPE_MIN ||
            //             params.data.ELM_ACT > params.data.SPE_MAX) && params.data.ELM_ACT !== 0) {

            //             return {
            //                 fontweight: 'blod',
            //                 background: '#F78084',

            //             };
            //         }

            //     }
            // };
            console.log('gridView1', gridView1);

        };

        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName_Now = efFormInfo.value.formName;
            formName_Now = formName_Now.substring(0, formName_Now.length - 3)
            v_userid = ER.SysInfo.UserId;
            console.log('iuhjkop', efFormInfo.value, v_userid)
            initializePage();
            //erFormHelper.setGridOptions(gridview.value, 'excel', { fileName: `${efFormInfo.value.formCaption}-${Date.now()}` });
        };
        // 画面相关数据初始化
        const initializePage = async () => {
            const initialResult = await erFormHelper.Initialize(
                formPartition,
                formName,
                '',
                initializeService
            );

            if (initialResult.flag >= 0) {
                // 画面工具类初始化成功后将画面渲染条件设置为1
                initializeFlag.value = 1;

                // 回调函数获取控件信息及设置定义事件等操作
                nextTick(async () => {
                    // 获取画面上的主要控件信息
                    let sqlstr = `select CODE from TWMSMZD02 t WHERE CODE_CLASS='WMGJC' `;
                    const out = await erFormHelper.querySql('', sqlstr);
                    console.log('符号', out.getBlock(0).data)
                    for (let i = 0; i < out.getBlock(0).data.length; i++) {
                        guanjianci.push(out.getBlock(0).data[i].CODE);
                    }
                    //console.log('符号', guanjianci)

                    sqlstr = `select CODE from TWMSMZD02 t WHERE CODE_CLASS='WMBSF' `;
                    const out1 = await erFormHelper.querySql('', sqlstr);
                    console.log('符号', out1.getBlock(0).data)
                    for (let i = 0; i < out1.getBlock(0).data.length; i++) {
                        biaoshifu += out1.getBlock(0).data[i].CODE;
                    }
                    //console.log('iuygfcvbhjko',biaoshifu)
                    sqlstr = `select CODE_DESC_2_CONTENT from TWMSMZD02 where CODE_CLASS='WMCZT' AND CODE_DESC_1_CONTENT='${v_userid}' AND SUBSTR(CODE_DESC_2_CONTENT,0,2)='CP' ORDER BY CODE_DESC_2_CONTENT`;
                    const out2 = await erFormHelper.querySql('', sqlstr);
                    console.log('工位', out2.getBlock(0).data)
                    for (let i = 0; i < out2.getBlock(0).data.length; i++) {
                        if (i === 0) {
                            STA_1.value = String(out2.getBlock(0).data[i].CODE_DESC_2_CONTENT);
                            tab_n = STA_1.value
                            // if (STA_1.value.substring(0, 1) === 'A' || STA_1.value.substring(0, 1) === 'B') {
                            //     grid1_title.value = '排产钢种';
                            // }
                            // else {
                            //     grid1_title.value = '成品成分';
                            // }
                            // grid1_t_tmp = grid1_title.value
                        }
                        if (i === 1) {
                            STA_2.value = String(out2.getBlock(0).data[i].CODE_DESC_2_CONTENT);
                        }
                    }
                    querySt_no();
                    queryMat();
                    // const textArea = document.getElementById('tsxx') as HTMLTextAreaElement;
                    // textArea.innerHTML = "判定信息";
                });
            } else {
                erFormHelper.messageError(
                    'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
                );
            }
        };

        onMounted(() => {
            setStartTimer();

        });
        let timeId: any;
        const setStartTimer = () => {
            console.log('定时器触发');
            timeId = setInterval(queryMat, 1000 * 60 * 1);
            //clearInterval(timeId);
            //erFormHelper.setControlValueEx('layoutControlGroup1', outInfo.getBlock(0).data[0]);
        };
        const F2_DO = async (e: any) => {
            querySt_no();
            // if (heat_now.value === "当前炉") {
            //     erFormHelper.messageInfo('已是当前炉，无法向前！')
            //     return false;
            // }
            // heat_now.value = '当前炉';
            queryMat();
            clearInterval(timeId);
            timeId = setInterval(queryMat, 1000 * 60 * 1);
        };
        // const F3_DO = async (e: any) => {
        //     if (heat_now.value === "下一炉") {
        //         erFormHelper.messageInfo('已是下一炉，无法向后！')
        //         return false;
        //     }
        //     heat_now.value = '下一炉';
        //     // queryMat_n();
        //     clearInterval(timeId);
        //     // timeId = setInterval(queryMat_n, 1000 * 60 * 1);
        // };
        const if_xianshi = ref(true)
        const if_xs_height = ref(60)
        let miaoshu = '';
        let bt_gj = []

        //焦点行数据查询
        const GridView1FocusChanged = async (e: any) => {
            // queryMat();
            if (e) {
                queryMat();
            //   if (e.rowChanged && e.data) {
            //     const inInfo = new EI.EIInfo();
            //     inInfo.addBlock(
            //       erFormHelper.convertModelAsBlock(e.data, {
            //         ST_NO: e.data.get('ST_NO')
            //       })
            //     );
            //     console.log('ST_NO', e.data.get('ST_NO'));

            //     inInfo.addBlock(erFormHelper.buildEiBlock([{STATION_NO: 'CP' }]));
            //     console.log('qwertinInfo', inInfo);

            //     const outInfo = await erFormHelper.callService('wmsmcztscp_inq', inInfo, false, true);
            //     console.log('qwert', outInfo);
            //     if (outInfo.sys.status < 0) {
            //       erFormHelper.messageError('查询错误:' + outInfo.sys.msg);
            //       return;
            //     } else {
            //     //   erFormHelper.mergeDataToGrid(outInfo, gridView1.value);
            //     }
            //     //const outInfo1 = await erFormHelper.callService(i_service_f2, inInfo, false, true);
            //     //console.log('outInfo1', outInfo1);
            //     //清空
            //     // erFormHelper.clearLayoutData('LayoutGroup1');
            //     //erFormHelper.setAllControlDefalutValue('LayoutGroup1', true);
            
            //     //erFormHelper.setControlValueEx('LayoutGroup1', outInfo1.getBlock(0).data[0]);
            //     }

            }
        };
        const querySt_no = async () => {
            const inInfo = new EI.EIInfo();

            inInfo.addBlock(erFormHelper.buildEiBlock([{STATION_ID: 'CP' }]));
            const outInfo = await erFormHelper.callService('wmsmpcgz_inq', inInfo, true, false, true);
            console.log('钢种查询', outInfo)
            if (outInfo.sys.status < 0) {
                erFormHelper.messageError('钢种查询错误:' + outInfo.sys.msg);
                return;
              } else {
                erFormHelper.mergeDataToGrid(outInfo, gridView_tab1.value);
              }
        };
        
        const queryMat = async () => {

            let gdxf = '事故案例：' + '\n';
            let gdxf1 = '作业区要点：' + '\n';
            let gxhx: any = '';
            let zyyd: any = '';

            const inInfo = new EI.EIInfo();
            const v_st_no = erFormHelper.getGridCurrentRowAsBlock('GridView1').data[0]['ST_NO'];
            console.log('ST_NO', v_st_no)

            inInfo.addBlock(erFormHelper.buildEiBlock([{STATION_NO: 'CP' , ST_NO: v_st_no}]));

            const outInfo = await erFormHelper.callService('wmsmcztscp_inq', inInfo, true, false, true);
            console.log('fghjikop[', outInfo)
            v_text = ' ';
            miaoshu = '';
            bt_gj = [];
            bt_gj = [String(outInfo.getBlock(1).data[0].CODE_DESC_2_CONTENT), String(v_st_no), String(outInfo.getBlock(0).data[0].HEAT_NO)]
            const key_bt = new RegExp(bt_gj.join('|'), 'g');
            console.log('qwe', bt_gj)
            let n_st_no: any;
            if (outInfo.getBlock(0).data[0].OK_FLAG !== '1') {
                miaoshu = "提示:" + outInfo.getBlock(0).data[0].MSG
                if (STA_1.value === '') {
                    STA_1.value = '提示';
                }
                //
                // n_st_no = outInfo.sys.msg.substring(outInfo.sys.msg.lastIndexOf('[') + 1, outInfo.sys.msg.lastIndexOf('[') + 1 + 6);
                miaoshu = miaoshu.replace(key_bt, (match) => {
                    console.log('miaoshu', match)
                    return `<span style="${numberStyle}">${match}</span>`;
                });
            } else {
                miaoshu = '当前工序：' + String(outInfo.getBlock(1).data[0].CODE_DESC_2_CONTENT) + ' 当前钢种：' + v_st_no ;
                //+ ' 当前钢种：' + String(outInfo.getBlock(0).data[0].ST_NO) + ' 炉号：' + String(outInfo.getBlock(0).data[0].HEAT_NO)
                v_text += '控制要点：\n' + String(outInfo.getBlock(0).data[0].MEMO_DETAIL);
                erFormHelper.mergeDataToGrid(outInfo.getBlock(2), gridView_tab2.value);

                n_st_no = String(outInfo.getBlock(0).data[0].ST_NO);
                guicheng.value = String(outInfo.getBlock(0).data[0].GUICHENG);
                for (let index = 0; index < bt_gj.length; index++) {

                    miaoshu = miaoshu.replace(bt_gj[index], `<span style="${numberStyle}">${bt_gj[index]}</span>`)
                }
            }
            gxhx = String(outInfo.getBlock(3).data[0].MEMO_DETAIL);
            zyyd = String(outInfo.getBlock(4).data[0].MEMO_DETAIL1);
            console.log('oiuhgv', gxhx)
            console.log('awesfgtgfr', zyyd)
            console.log('iuyghjkl', outInfo)
            // 正则表达式匹配数字
            const numberRegex = new RegExp('[0-9A-Za-z' + biaoshifu + ']', 'g'); //   const numberRegex = /[0-9A-Za-z<>＞＜=≥≤.%-]/g;
            console.log('iuyghjkl', numberRegex)
            // 构建包含关键字的正则表达式
            const keywordRegex = new RegExp(guanjianci.join('|'), 'g');

            console.log('oiuhgv', key_bt)
            //console.log('iuyghjkl', keywordRegex)
            // 正则表达式替换回车换行
            //const formattedText = v_text.replace(/\n/g, '<br>');
            //console.log('iuyghjkl', formattedText)
            // 高亮数字
            const finalHighlightedText = v_text.replace(numberRegex, (match) => {
                return `<span style="${numberStyle}">${match}</span>`;
            });
            //console.log('iuyghjkl', finalHighlightedText)
            // 高亮关键字
            // miaoshu = miaoshu.replace(key_bt, (match) => {
            //     console.log('oiuhgv', match)
            //     return `<span style="${numberStyle}">${match}</span>`;
            // });

            const highlightedText = finalHighlightedText.replace(keywordRegex, (match) => {
                return `<span style="${keywordStyle}">${match}</span>`;
            });
            const formattedText = highlightedText.replace(/\n/g, '<br>');
            console.log('iuyghjkl', 176, formattedText, v_text)

            const miaoShu = document.getElementById('miaoshu') as HTMLTextAreaElement;
            miaoShu.innerHTML = miaoshu;
            console.log('wdefrds111', document.getElementById('miaoshu') );

            console.log('oiuhgv', miaoshu)
            if (tabActiveKey.value === 'tab1') {
                const textArea = document.getElementById('textArea') as HTMLTextAreaElement;
                textArea.innerHTML = formattedText;

                const textArea2 = document.getElementById('textArea2') as HTMLTextAreaElement;
                const textArea3 = document.getElementById('textArea3') as HTMLTextAreaElement;
                console.log('wdefrds', document.getElementById('textArea3') )

                textArea2.innerHTML = gdxf + gxhx;
                // 正则表达式替换回车换行
                textArea2.innerHTML = textArea2.innerHTML.replace(numberRegex, (match) => {
                    return `<span class="blink1" style="${numberStyle}">${match}</span>`;
                });
                textArea2.innerHTML = textArea2.innerHTML.replace(keywordRegex, (match) => {
                    return `<span style="${keywordStyle}">${match}</span>`;
                });
                textArea2.innerHTML = textArea2.innerHTML.replace(/\n/g, '<br>');

                textArea3.innerHTML = gdxf1 + zyyd;
                console.log('textArea3', textArea3);

                // 正则表达式替换回车换行
                textArea3.innerHTML = textArea3.innerHTML.replace(numberRegex, (match) => {
                    return `<span style="${numberStyle}">${match}</span>`;
                });
                textArea3.innerHTML = textArea3.innerHTML.replace(keywordRegex, (match) => {
                    return `<span style="${keywordStyle}">${match}</span>`;
                });
                textArea3.innerHTML = textArea3.innerHTML.replace(/\n/g, '<br>');
            }
        }

        const font_plus = () => {
            console.log('字体加一', v_font_size.value)
            if (v_font_size.value < 40) {
                v_font_size.value = v_font_size.value + 1;
                v_font_size_l = v_font_size.value + v_font_size_c
            }
        }
        const font_minus = () => {
            console.log('字体减一', v_font_size.value)
            if (v_font_size.value > 20) {
                v_font_size.value = v_font_size.value - 1;
                v_font_size_l = v_font_size.value + v_font_size_c;
            }
        }

        const handleColorChange = (e: any) => {
            console.log('asdv ', e.target.value)
            v_font_color.value = e.target.value
        }

        // 定义关键字和数字的样式
        const keywordStyle = `font-weight: bold; color: blue;font-size:${v_font_size_l}px`;
        const numberStyle = `font-weight: bold; color: red;font-size:${v_font_size_l}px`;

        const tabActiveKey = ref('tab1')
        const handleTabChange = (activeKey: string) => {
            console.log(activeKey);
            // if (activeKey === 'tab1') {
            //     tabActiveKey.value = 'tab1';
            //     tab_n = STA_1.value;
            //     guicheng.value = '<p>请输入...</p>'

            // } 
            // else if (activeKey === 'tab2') {
            //     tabActiveKey.value = 'tab2';
            //     tab_n = STA_2.value;
            //     guicheng.value = '<p>请输入...</p>'
            // }
            // if (heat_now.value === '当前炉') {
            //     queryMat();
            // }
            // if (heat_now.value === '下一炉') {
            //     queryMat_n();
            // }
        };
        const fullsc = () => {
            console.log('xcvbnmwsedfc')
            const element = document.documentElement;

            if (document.fullscreenElement) {
                document.exitFullscreen();
                var newVw = window.innerWidth / 100;
                var newVh = window.innerHeight / 100;
                console.log('dfghjkl;', newVw, newVh)
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
                console.log('dfghjkl;', newVw, newVh)
                document.documentElement.style.setProperty('--vw', newVw + 'px');
                document.documentElement.style.setProperty('--vh', newVh + 'px');
            }
        }


        return {
            erFormHelper,
            initializeFlag,
            F2_DO, 
            ifview,
            layout,
            gridview, 
            efFormReady, 
            v_font_size, 
            v_font_color, 
            v_text, 
            font_plus, 
            font_minus, 
            handleColorChange, 
            numberStyle, 
            // heat_now, 
            handleTabChange, 
            tabActiveKey, 
            STA_1, 
            STA_2, 
            time_Now, 
            guicheng, 
            if_xianshi, 
            fullsc, 
            erGrid1Ready, 
            if_xs_height, 
            // grid1_title,
            GridView1FocusChanged
        };
    }
});
