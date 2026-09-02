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

import { ER } from "ERX/Er";
import { EI, EIManager } from "EIX/ei";

import xrEfForm from "EFX/xrEfForm";

import erLayout from "ERX/ErLayout";
import RichTextEditor from "@/components/RichTextEditor.vue";
import wanged from "@/components/wanged.vue";





export default defineComponent({
    name: '',
    components: {
        xrEfForm,

        erLayout, RichTextEditor, wanged

    },
    setup: () => {
        // 获取画面的分区信息及设置画面初始化service
        const efFormInfo = ref<{ [key: string]: any }>({});
        let formPartition: string;
        let formName_Now: string;
        const initializeService = 'wm00_form_get';

        // 变量定义
        let formName = 'WMSMGCLRS2N';
        const erFormHelper: ER.FormHelper = new ER.FormHelper();
        const initializeFlag = ref(0);
        const layout = ref();
        const guicheng = ref('<p>请输入...</p>')



        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName_Now = efFormInfo.value.formName;
            formName_Now = formName_Now.substring(0, formName_Now.length - 3)

            initializePage();

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

                    console.log('顺序', 5)
                    erFormHelper.setControlValue('layout1', 'FACTORY_2', 'C');
                });
            } else {
                erFormHelper.messageError(
                    'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
                );
            }
        };

       
        onMounted(async () => {
          console.log('顺序',1)
        });

        const F2_DO = async (e: any) => {
           
            let info = erFormHelper.getAllControlValueAsEiBlock('layout1').data[0];
            // guicheng.FACTORY_2 = String(info.FACTORY_2);
            // guicheng.GRADE_TYPE2 = String(info.GRADE_TYPE2);
            // guicheng.C_DIV = String(info.C_DIV);

            let sqlstr = `select GUICHENG from TWMSMCZTS where GRADE_TYPE2='${info.GRADE_TYPE2}' and C_DIV='${info.C_DIV}' and FACTORY_2='${info.FACTORY_2}' `;

            const out = await erFormHelper.querySql('', sqlstr);
            console.log('iuygfvbhnjkl', out.getBlock(0).data)
            guicheng.value = String(out.getBlock(0).data[0].GUICHENG)
        };
        const F3_DO = async (e: any) => {
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock('layout1', { GUICHENG: guicheng.value }));
            if (inInfo.getBlock(0).data[0].GRADE_TYPE2?.toString().trim() === '') {
                erFormHelper.messageError('请输入钢种分类！')
                return false;
            }
            if (inInfo.getBlock(0).data[0].C_DIV?.toString().trim() === '') {
                erFormHelper.messageError('请输入碳锈区分！')
                return false;
            }
            if (inInfo.getBlock(0).data[0].FACTORY_2?.toString().trim() === '') {
                erFormHelper.messageError('请输入工序！')
                return false;
            }
            console.log('uhgfghjk', inInfo)
            const out = await erFormHelper.callService('wmsmgclr_ins', inInfo, false, true);
            if (out?.sys.status < 0) {
                // erFormHelper.messageError('操作失败');
                return false;
            }
            F2_DO(1);
        };
        const queryMat = async () => {

        }



        const wangchange = (e: any) => {
            console.log('ytgfghuji', e)
            guicheng.value = e;
         
        }






        return {
            erFormHelper,
            initializeFlag,
            F2_DO, F3_DO,
            layout,
            efFormReady, guicheng, wangchange, 
        };
    }
});
