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
        let formName = 'WMSMCZTSS2N';
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
        // let order_thick: any = '';
        const order_thick = ref('');
        const heat_now = ref('当前炉');
        const STA_1 = ref('');
        const STA_2 = ref('');
        let tab_n = '';
        let v_userid = '';
        const time_Now = ref();
        const guicheng = ref('<p>请输入...</p>')
        const grid1_title = ref('过程内控');
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
            "日" +
            " " +
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

            gridView1.gridOptions.getRowStyle = (params: any) => {
                console.log('params', params);
                if (params.data) {

                    if ((params.data.ELM_FieldNameACT < params.data.SPE_MIN ||
                        params.data.ELM_ACT > params.data.SPE_MAX) && params.data.ELM_ACT !== 0) {

                        return {
                            fontweight: 'blod',
                            background: '#F78084',

                        };
                    }

                }
            };
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
        const initializePage = async() => {
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
                nextTick(async() => {
                    // 获取画面上的主要控件信息
                    let sqlstr = `select CODE from TWMSMZD02 t WHERE CODE_CLASS='WMGJC' `;
                    const out = await erFormHelper.querySql('', sqlstr);
                    console.log('iuygfvbhnjkl', out.getBlock(0).data)
                    for (let i = 0; i < out.getBlock(0).data.length; i++) {
                    guanjianci.push(out.getBlock(0).data[i].CODE);
                }
                    //console.log('iuygfvbhnjkl', guanjianci)

                    sqlstr = `select CODE from TWMSMZD02 t WHERE CODE_CLASS='WMBSF' `;
                    const out1 = await erFormHelper.querySql('', sqlstr);
                console.log('iuygfvbhnjkl', out1.getBlock(0).data)
                    for (let i = 0; i < out1.getBlock(0).data.length; i++) {
    biaoshifu += out1.getBlock(0).data[i].CODE;
}
                    //console.log('iuygfcvbhjko',biaoshifu)
                    sqlstr = `select CODE_DESC_2_CONTENT from TWMSMZD02 where CODE_CLASS = 'WMCZT' AND CODE_DESC_1_CONTENT = '${v_userid}' ORDER BY CODE_DESC_2_CONTENT `;
                    const out2 = await erFormHelper.querySql('', sqlstr);
console.log('iuygfvbhnjkl', out2.getBlock(0).data)
                    for (let i = 0; i < out2.getBlock(0).data.length; i++) {
    if (i === 0) {
        STA_1.value = String(out2.getBlock(0).data[i].CODE_DESC_2_CONTENT);
        tab_n = STA_1.value
                            if (STA_1.value.substring(0, 1) === 'A' || STA_1.value.substring(0, 1) === 'B') {
            grid1_title.value = '过程内控';
        }
        else {
            grid1_title.value = '成品成分';
        }
        grid1_t_tmp = grid1_title.value
                        }
    if (i === 1) {
        STA_2.value = String(out2.getBlock(0).data[i].CODE_DESC_2_CONTENT);
    }
}

// sqlstr = `SELECT * FROM (SELECT T.*,ROW_NUMBER() OVER (PARTITION BY T.REMARK ORDER BY T.REC_CREATE_TIME DESC) RN FROM TWMSMZHZLLL T WHERE T.HEAT_NO = '${heat_now}') WHERE RN = '1' `;
// const out3 = await erFormHelper.querySql('', sqlstr);
// console.log('gfred', out3.getBlock(0).data)
// for (let i = 0; i < out3.getBlock(0).data.length; i++) {
//     biaoshifu += out3.getBlock(0).data[i].CODE;
// }

queryMat();
                    const textArea = document.getElementById('tsxx') as HTMLTextAreaElement;
                    //textArea.innerHTML = "判定信息111";
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
        const F2_DO = async(e: any) => {
    if (heat_now.value === "当前炉") {
        erFormHelper.messageInfo('已是当前炉，无法向前！')
                return false;
    }
    heat_now.value = '当前炉';
    queryMat();
    clearInterval(timeId);
    timeId = setInterval(queryMat, 1000 * 60 * 1);
};
        const F3_DO = async(e: any) => {
    if (heat_now.value === "下一炉") {
        erFormHelper.messageInfo('已是下一炉，无法向后！')
                return false;
    }
    heat_now.value = '下一炉';
    queryMat_n();
    clearInterval(timeId);
    timeId = setInterval(queryMat_n, 1000 * 60 * 1);
};
        const if_xianshi = ref(true)
        const if_xs_height = ref(60)
        let miaoshu = '';
        let bt_gj = []

        const queryMat = async() => {

            let gdxf = '工序红线' + '\n';
            let gdxf1 = '作业区要点' + '\n';
            let gxhx: any = '';
            let zyyd: any = '';

            const inInfo = new EI.EIInfo();
    console.log('wsedsdxc', 'now', tab_n)


            //当前炉订单厚度
            let sqlstr_1 = `SELECT DISTINCT DECODE(SIGN(MIN(NVL(T3.ORDER_THICK, 0.7)) - 0.7), -1, '1', '0') AS THICKNESS_STATUS FROM(SELECT HEAT_NO FROM V_PSSM_DEV_ST_NO WHERE DEV_CODE = '${tab_n}') T LEFT JOIN TPSSM11 T1 ON T.HEAT_NO = T1.HEAT_NO LEFT JOIN TPSSM03 T2 ON T1.PONO = T2.PONO LEFT JOIN TQMOM01 T3 ON T2.ORDER_NO = T3.ORDER_NO WHERE T3.ORDER_THICK IS NOT NULL `;
            const out_1 = await erFormHelper.querySql('', sqlstr_1);
    console.log('order_thick', out_1.getBlock(0).data)
            let order_thick_now = out_1.getBlock(0).data[0].THICKNESS_STATUS;
    console.log('order_thick_now', order_thick_now);
    if (order_thick_now == '1') {
        order_thick.value = '薄规格';
    } else {
        order_thick.value = ' ';
    }
    console.log('order_thick', order_thick);

    inInfo.addBlock(erFormHelper.buildEiBlock([{ HEAT: 'NOW', STATION_NO: tab_n }]));

            const outInfo = await erFormHelper.callService('wmsmczts_inq', inInfo, true, false, true);
    console.log('fghjikop', outInfo)
            v_text = ' ';
    miaoshu = '';
    bt_gj = [];
    bt_gj = [String(outInfo.getBlock(1).data[0].CODE_DESC_2_CONTENT), String(outInfo.getBlock(0).data[0].ST_NO), String(outInfo.getBlock(0).data[0].HEAT_NO)]
            const key_bt = new RegExp(bt_gj.join('|'), 'g');
    console.log('qwdfsdfv', bt_gj)
            let n_st_no: any;
    if (outInfo.getBlock(0).data[0].OK_FLAG !== '1') {
        miaoshu = "提示:" + outInfo.getBlock(0).data[0].MSG
                if (STA_1.value === '') {
            STA_1.value = '提示';
        }
        //
        // n_st_no = outInfo.sys.msg.substring(outInfo.sys.msg.lastIndexOf('[') + 1, outInfo.sys.msg.lastIndexOf('[') + 1 + 6);
        miaoshu = miaoshu.replace(key_bt, (match) => {
            console.log('oiuhgv', match)
                    return `<span style = "${numberStyle}" > ${match }< / span>`;
        });
    } else {
        miaoshu = '当前工序：' + String(outInfo.getBlock(1).data[0].CODE_DESC_2_CONTENT) + ' 当前钢种：' + String(outInfo.getBlock(0).data[0].ST_NO) + ' 炉号：' + String(outInfo.getBlock(0).data[0].HEAT_NO);
        v_text += '控制要点：\n' + String(outInfo.getBlock(0).data[0].MEMO_DETAIL);
        //erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(2), true, 'GridView1');
        n_st_no = String(outInfo.getBlock(0).data[0].ST_NO);
        guicheng.value = String(outInfo.getBlock(0).data[0].GUICHENG);
                for (let index = 0; index < bt_gj.length; index++) {

            miaoshu = miaoshu.replace(bt_gj[index], `<span style = "${numberStyle}" > ${bt_gj[index] } </span>`)
                }
    }
    erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(2), true, 'GridView1');
    if (tab_n.substring(0, 1) === 'A' || tab_n.substring(0, 1) === 'B') {
        grid1_title.value = '过程内控';
    }
    else {
        grid1_title.value = '成品成分';
    }
    if (outInfo.getBlock(2).data.length > 0) {
        if (tab_n.substring(0, 1) === 'A' || tab_n.substring(0, 1) === 'B') {
            grid1_title.value = '过程内控' + ' ' + (outInfo.getBlock(2).data[0]['ST_SAMPLE_NO'] === null ? ' ' : outInfo.getBlock(2).data[0]['ST_SAMPLE_NO']);
        }
        else {
            grid1_title.value = '成品成分' + ' ' + (outInfo.getBlock(2).data[0]['ST_SAMPLE_NO'] === null ? ' ' : outInfo.getBlock(2).data[0]['ST_SAMPLE_NO']);
        }
    }

    gxhx = String(outInfo.getBlock(3).data[0].MEMO_DETAIL);
    zyyd = String(outInfo.getBlock(3).data[0].MEMO_DETAIL1);
    // let n_st_no = outInfo.getBlock(0).data.length === 0 ? outInfo.sys.msg.substring(outInfo.sys.msg.lastIndexOf('[') + 1, outInfo.sys.msg.lastIndexOf('[') + 1 + 6) : String(outInfo.getBlock(0).data[0].ST_NO);
    console.log('oiuhgv', gxhx)
            // let sqlstr = `with t1 as (select * from (select row_number() over (partition by HEAT_NO,WHOLE_BACKLOG_CODE order by REC_CREATE_TIME DESC ) ROW_ID, t.* from (SELECT HEAT_NO, ST_SAMPLE_NO, WHOLE_BACKLOG_CODE, REC_CREATE_TIME FROM TQMTS24 where 1 = 1) t) where ROW_ID = 1 ), T3 AS (select ELM_NAME, SPE_MIN, SPE_MAX, MAIN_AIM, '1A1033' ST_NO from TWMSMCZTS_GC A WHERE ST_NO LIKE '%1A1033%' AND FACTORY_2 = 'A' AND DIS_FLAG = '1')
            // select T2.ELM_ACT,  t1.HEAT_NO, t2.ST_NO,T3.ELM_NAME from t1 left join TQMTS25 t2
            // on t1.ST_SAMPLE_NO=t2.ST_SAMPLE_NO LEFT JOIN TWMSMCZTS_GC T3 ON T2.ST_NO = T3.ST_NO AND T2.ELM_NAME=T3.ELM_NAME AND T1.WHOLE_BACKLOG_CODE=T3.FACTORY_2
            // where 1=1 AND t1.HEAT_NO='"A0404696"' AND T3.ELM_NAME IS NOT NULL `;
            // console.log('oiuhgv', sqlstr)
            // const out = await erFormHelper.querySql('', sqlstr);
            // erFormHelper.mergeDataToLayoutOrGrid(out.getBlock(0), true, 'GridView1');

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
                return `<span style = "${numberStyle}" > ${match }< / span>`;
    });
            //console.log('iuyghjkl', finalHighlightedText)
            // 高亮关键字
            // miaoshu = miaoshu.replace(key_bt, (match) => {
            //     console.log('oiuhgv', match)
            //     return `<span style="${numberStyle}">${match}</span>`;
            // });

            const highlightedText = finalHighlightedText.replace(keywordRegex, (match) => {
                return `<span style = "${keywordStyle}" > ${match }< / span>`;
    });
            const formattedText = highlightedText.replace(/\n/g, '<br>');
    console.log('iuyghjkl', 176, formattedText, v_text)

            const miaoShu = document.getElementById('miaoshu') as HTMLTextAreaElement;
    miaoShu.innerHTML = miaoshu;
    console.log('oiuhgv', miaoshu)
            if (tabActiveKey.value === 'tab1') {
                const textArea = document.getElementById('textArea') as HTMLTextAreaElement;
        textArea.innerHTML = formattedText;

                const textArea2 = document.getElementById('textArea2') as HTMLTextAreaElement;
                const textArea4 = document.getElementById('textArea4') as HTMLTextAreaElement;
        textArea2.innerHTML = gdxf + gxhx;
        // 正则表达式替换回车换行
        textArea2.innerHTML = textArea2.innerHTML.replace(numberRegex, (match) => {
                    return `<span class="blink1" style = "${numberStyle}" > ${match }< / span>`;
        });
        textArea2.innerHTML = textArea2.innerHTML.replace(keywordRegex, (match) => {
                    return `<span style = "${keywordStyle}" > ${match }< / span>`;
        });
        textArea2.innerHTML = textArea2.innerHTML.replace(/\n/g, '<br>');

        textArea4.innerHTML = gdxf1 + zyyd;
        // 正则表达式替换回车换行
        textArea4.innerHTML = textArea4.innerHTML.replace(numberRegex, (match) => {
                    return `<span style = "${numberStyle}" > ${match }< / span>`;
        });
        textArea4.innerHTML = textArea4.innerHTML.replace(keywordRegex, (match) => {
                    return `<span style = "${keywordStyle}" > ${match }< / span>`;
        });
        textArea4.innerHTML = textArea4.innerHTML.replace(/\n/g, '<br>');
                // const elementsWithAA = document.getElementsByTagName('span')
                // console.log('cvghjklwedfgvb', elementsWithAA)
                // for (let i = 0; i < elementsWithAA.length; i++) {
                //     elementsWithAA[i].classList.add('blink');
                // }
                //textArea2.classList.add('blink');
            }
    if (tabActiveKey.value === 'tab2') {
                const textArea = document.getElementById('textArea1') as HTMLTextAreaElement;
        textArea.innerHTML = formattedText;

                const textArea3 = document.getElementById('textArea3') as HTMLTextAreaElement;
                const textArea5 = document.getElementById('textArea5') as HTMLTextAreaElement;

        textArea3.innerHTML = gdxf + gxhx;
        // 正则表达式替换回车换行
        textArea3.innerHTML = textArea3.innerHTML.replace(numberRegex, (match) => {
                    return `<span style = "${numberStyle}" > ${match }< / span>`;
        });
        textArea3.innerHTML = textArea3.innerHTML.replace(keywordRegex, (match) => {
                    return `<span style = "${keywordStyle}" > ${match }< / span>`;
        });
        textArea3.innerHTML = textArea3.innerHTML.replace(/\n/g, '<br>');

        textArea5.innerHTML = gdxf1 + zyyd;
        textArea5.innerHTML = textArea5.innerHTML.replace(numberRegex, (match) => {
                    return `<span style = "${numberStyle}" > ${match }< / span>`;
        });
        textArea5.innerHTML = textArea5.innerHTML.replace(keywordRegex, (match) => {
                    return `<span style = "${keywordStyle}" > ${match }< / span>`;
        });
        // 正则表达式替换回车换行
        textArea5.innerHTML = textArea5.innerHTML.replace(/\n/g, '<br>');
            }
    if (tab_n.substring(0, 1) !== 'C') {
        if_xianshi.value = false
                if_xs_height.value = 100;
    }
    else {
        if_xianshi.value = true
                if_xs_height.value = 67;
    }

    console.log('getBlock(4)', outInfo.getBlock(4).data.length)
            console.log('getBlock(4)', outInfo.getBlock(4))
            erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(4), true, 'GridView3');
            
        }
        const queryMat_n = async() => {

            let gdxf = '工序红线' + '\n';
            let gdxf1 = '作业区要点' + '\n';
            let gxhx: any = '';
            let zyyd: any = '';

            const inInfo = new EI.EIInfo();

    // //下一炉订单厚度
    // let sqlstr_1 = `SELECT DISTINCT DECODE(SIGN(MIN(NVL(T3.ORDER_THICK, 0.7)) - 0.7),-1,'1','0') AS THICKNESS_STATUS FROM (SELECT HEAT_NO FROM V_PSSM_DEV_ST_NO WHERE DEV_CODE = '${tab_n}') T LEFT JOIN TPSSM11 T1 ON T.HEAT_NO = T1.HEAT_NO LEFT JOIN TPSSM03 T2 ON T1.PONO = T2.PONO LEFT JOIN TQMOM01 T3 ON T2.ORDER_NO = T3.ORDER_NO WHERE T3.ORDER_THICK IS NOT NULL `;
    // const out_1 = await erFormHelper.querySql('', sqlstr_1);
    // console.log('order_thick', out_1.getBlock(0).data)
    // let order_thick_now = out_1.getBlock(0).data[0].THICKNESS_STATUS;
    // console.log('order_thick_now',order_thick_now);
    // if (order_thick_now == '1') {
    //     order_thick.value = '薄';
    // }else{
    //     order_thick.value = ' ';
    // }
    // console.log('order_thick',order_thick);

    console.log('wsedsdxc', 'next', tab_n)
            inInfo.addBlock(erFormHelper.buildEiBlock([{ HEAT: 'NEXT', STATION_NO: tab_n }]));
            const outInfo = await erFormHelper.callService('wmsmczts_n_inq', inInfo, true,
        false,
        true);
    console.log('wsedsdxc', 'next', outInfo)
            v_text = ' ';
            let n_st_no: any;
    miaoshu = '';
    bt_gj = [];
    bt_gj = [String(outInfo.getBlock(1).data[0].CODE_DESC_2_CONTENT), String(outInfo.getBlock(0).data[0].ST_NO), String(outInfo.getBlock(0).data[0].HEAT_NO)]
            const key_bt = new RegExp(bt_gj.join('|'), 'g');
    if (outInfo.getBlock(0).data[0].OK_FLAG !== '1') {
        miaoshu = "提示:" + outInfo.getBlock(0).data[0].MSG
                console.log('wsedsdxc', 'next', miaoshu)
                if (STA_1.value === '') {
            STA_1.value = '提示';
        }
        //
        // n_st_no = outInfo.sys.msg.substring(outInfo.sys.msg.lastIndexOf('[') + 1, outInfo.sys.msg.lastIndexOf('[') + 1 + 6);
        miaoshu = miaoshu.replace(key_bt, (match) => {
            console.log('oiuhgv', match)
                    return `<span style = "${numberStyle}" > ${match }< / span>`;
        });
    } else {
        miaoshu = '当前工序：' + String(outInfo.getBlock(1).data[0].CODE_DESC_2_CONTENT) + ' 当前钢种：' + String(outInfo.getBlock(0).data[0].ST_NO) + ' 炉号：' + String(outInfo.getBlock(0).data[0].HEAT_NO);
        v_text += '控制要点：\n' + String(outInfo.getBlock(0).data[0].MEMO_DETAIL);
        //erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(2), true, 'GridView1');
        n_st_no = String(outInfo.getBlock(0).data[0].ST_NO);
        guicheng.value = String(outInfo.getBlock(0).data[0].GUICHENG);
                for (let index = 0; index < bt_gj.length; index++) {
            console.log('dfghjkl', bt_gj[index])
                    miaoshu = miaoshu.replace(bt_gj[index], `<span style = "${numberStyle}" > ${bt_gj[index] } </span>`)
                }
    }
    erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(2), true, 'GridView1');
    if (tab_n.substring(0, 1) === 'A' || tab_n.substring(0, 1) === 'B') {
        grid1_title.value = '过程内控';
    }
    else {
        grid1_title.value = '成品成分';
    }
    if (outInfo.getBlock(2).data.length > 0) {
        if (tab_n.substring(0, 1) === 'A' || tab_n.substring(0, 1) === 'B') {
            grid1_title.value = '过程内控' + ' ' + (outInfo.getBlock(2).data[0]['ST_SAMPLE_NO'] === null ? ' ' : outInfo.getBlock(2).data[0]['ST_SAMPLE_NO']);
        }
        else {
            grid1_title.value = '成品成分' + ' ' + (outInfo.getBlock(2).data[0]['ST_SAMPLE_NO'] === null ? ' ' : outInfo.getBlock(2).data[0]['ST_SAMPLE_NO']);
        }
    }
    gxhx = String(outInfo.getBlock(3).data[0].MEMO_DETAIL);
    zyyd = String(outInfo.getBlock(3).data[0].MEMO_DETAIL1);


    console.log('iuyghjkl', outInfo)
            // 正则表达式匹配数字
            const numberRegex = new RegExp('[0-9A-Za-z' + biaoshifu + ']', 'g'); //   const numberRegex = /[0-9A-Za-z<>＞＜=≥≤.%-]/g;
    console.log('iuyghjkl', numberRegex)
            // 构建包含关键字的正则表达式
            const keywordRegex = new RegExp(guanjianci.join('|'), 'g');
            //console.log('iuyghjkl', keywordRegex)
            // 正则表达式替换回车换行
            //const formattedText = v_text.replace(/\n/g, '<br>');
            //console.log('iuyghjkl', formattedText)
            // 高亮数字

            const finalHighlightedText = v_text.replace(numberRegex, (match) => {
                return `<span style = "${numberStyle}" > ${match }< / span>`;
    });
            //console.log('iuyghjkl', finalHighlightedText)
            // 高亮关键字
            const highlightedText = finalHighlightedText.replace(keywordRegex, (match) => {
                return `<span style = "${keywordStyle}" > ${match }< / span>`;
    });
            const formattedText = highlightedText.replace(/\n/g, '<br>');
            // console.log('iuyghjkl', highlightedText)
            const miaoShu = document.getElementById('miaoshu') as HTMLTextAreaElement;
    miaoShu.innerHTML = miaoshu;
    console.log('oiuhgv', miaoshu)
            if (tabActiveKey.value === 'tab1') {
                const textArea = document.getElementById('textArea') as HTMLTextAreaElement;
        textArea.innerHTML = formattedText;
                const textArea2 = document.getElementById('textArea2') as HTMLTextAreaElement;
                const textArea4 = document.getElementById('textArea4') as HTMLTextAreaElement;
        textArea2.innerHTML = gdxf + gxhx;
        // 正则表达式替换回车换行
        textArea2.innerHTML = textArea2.innerHTML.replace(numberRegex, (match) => {
                    return `<span class="blink" style = "${numberStyle}" > ${match }< / span>`;
        });
        textArea2.innerHTML = textArea2.innerHTML.replace(keywordRegex, (match) => {
                    return `<span style = "${keywordStyle}" > ${match }< / span>`;
        });
        textArea2.innerHTML = textArea2.innerHTML.replace(/\n/g, '<br>');

        textArea4.innerHTML = gdxf1 + zyyd;
        // 正则表达式替换回车换行
        textArea4.innerHTML = textArea4.innerHTML.replace(numberRegex, (match) => {
                    return `<span style = "${numberStyle}" > ${match }< / span>`;
        });
        textArea4.innerHTML = textArea4.innerHTML.replace(keywordRegex, (match) => {
                    return `<span style = "${keywordStyle}" > ${match }< / span>`;
        });
        textArea4.innerHTML = textArea4.innerHTML.replace(/\n/g, '<br>');
            }
    if (tabActiveKey.value === 'tab2') {
                const textArea = document.getElementById('textArea1') as HTMLTextAreaElement;
        textArea.innerHTML = formattedText;
                const textArea3 = document.getElementById('textArea3') as HTMLTextAreaElement;
                const textArea5 = document.getElementById('textArea5') as HTMLTextAreaElement;
        textArea3.innerHTML = gdxf + gxhx;
        // 正则表达式替换回车换行
        textArea3.innerHTML = textArea3.innerHTML.replace(numberRegex, (match) => {
                    return `<span style = "${numberStyle}" > ${match }< / span>`;
        });
        textArea3.innerHTML = textArea3.innerHTML.replace(keywordRegex, (match) => {
                    return `<span style = "${keywordStyle}" > ${match }< / span>`;
        });
        textArea3.innerHTML = textArea3.innerHTML.replace(/\n/g, '<br>');

        textArea5.innerHTML = gdxf1 + zyyd;
        textArea5.innerHTML = textArea5.innerHTML.replace(numberRegex, (match) => {
                    return `<span style = "${numberStyle}" > ${match }< / span>`;
        });
        textArea5.innerHTML = textArea5.innerHTML.replace(keywordRegex, (match) => {
                    return `<span style = "${keywordStyle}" > ${match }< / span>`;
        });
        // 正则表达式替换回车换行
        textArea5.innerHTML = textArea5.innerHTML.replace(/\n/g, '<br>');
            }
    if (tab_n.substring(0, 1) !== 'C') {
        if_xianshi.value = false
                if_xs_height.value = 100;
    }
    else {
        if_xianshi.value = true
                if_xs_height.value = 67;
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
        const keywordStyle = `font-weight: bold; color: blue;font-size:${v_font_size_l }px`;
        const numberStyle = `font-weight: bold; color: red;font-size:${v_font_size_l }px`;

        const tabActiveKey = ref('tab1')
        const handleTabChange = (activeKey: string) => {
    console.log(activeKey);
    if (activeKey === 'tab1') {
        tabActiveKey.value = 'tab1';
        tab_n = STA_1.value;
        guicheng.value = '<p>请输入...</p>'

            } else if (activeKey === 'tab2') {
        tabActiveKey.value = 'tab2';
        tab_n = STA_2.value;
        guicheng.value = '<p>请输入...</p>'
            }
    if (heat_now.value === '当前炉') {
        queryMat();
    }
    if (heat_now.value === '下一炉') {
        queryMat_n();
    }
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
            console.error(`Error attempting to enable full - screen mode: ${err.message } (${err.name })`);
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
            F2_DO, F3_DO, ifview,
            layout,
            gridview, efFormReady, v_font_size, v_font_color, v_text, font_plus, font_minus, handleColorChange, numberStyle,order_thick, heat_now, handleTabChange, tabActiveKey, STA_1, STA_2, time_Now, guicheng, if_xianshi, fullsc, erGrid1Ready, if_xs_height, grid1_title
        };
    }
});
