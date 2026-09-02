import { EI } from "EIX/ei";
import { ER } from "ERX/Er";
import {
    defineComponent,
    onMounted,
    reactive,
    ref
} from "vue";
import { Obj, toJSON } from '../../components/utils/util';
import SUBPAGE from "../../components/disPlayDiy/SubPage.vue"
import xrEfForm from "EFX/xrEfForm";







export default defineComponent({
    name: 'WMSMSHOWS2N',
    components: {
        SUBPAGE, xrEfForm
    },
    methods: {},
    setup() {
        const initializeFlag = ref(0);
        const erFormHelper: ER.FormHelper = new ER.FormHelper() as any;
        let form_count = ref(3)
        const offsetX = ref(0);
        const root = ref<HTMLElement | null>(null);
        const form_info = ref<Array<Object>>([])
        const form_data = ref<Array<Object>>([])
        const inBlock = new Set<string>();
        const fullsc = () => {
            const element = document.documentElement;

            if (document.fullscreenElement) {
                document.exitFullscreen();

            } else {
                element.requestFullscreen().catch((err) => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });

            }
        }
        const scrollPage = (e: any) => {

            e.preventDefault();

            offsetX.value -= e.deltaY

        }

        onMounted(async () => {
            const eiInfo = new EI.EIInfo();
            const eiInblock = new EI.EiBlock();
            eiInblock.addColumn("TABLE");
            const outBlock = await erFormHelper.callService('wmsmshow_init', eiInfo, true, true);
            form_count.value = outBlock.getBlock(0).data.length;
            console.log('kjhgfcx', outBlock)
            for (let i = 0; i < outBlock.getBlock(0).data.length; i++) {
                let aa = toJSON(String(outBlock.getBlock(0).data[i].CONDITIONS));

                if (aa[0].i == '') {
                    aa = aa.slice(1);
                }

                for (let j = 0; j < aa.length; j++) {
                    for (let k = 0; k < outBlock.getBlock("CON").data.length; k++) {
                        if (aa[j].i === outBlock.getBlock("CON").data[k].EQUIP_CODE) {
                            aa[j].CON_INFO = outBlock.getBlock("CON").data[k]

                            eiInblock.addRow({ TABLE: outBlock.getBlock("CON").data[k].EQUIP_CODE })
                        }
                    }
                }
                outBlock.getBlock(0).data[i].CONDITIONS = aa;
                form_info.value.push(outBlock.getBlock(0).data[i])
            }
            initializeFlag.value = 1;

            console.log('kjhgfcx', form_info)
            eiInfo.addBlock(eiInblock)

            const outBlock1 = await erFormHelper.callService('wmsmshow_inq', eiInfo, true, true);
 console.log('sasxdsxdcxsazxcxscxszxc', eiInblock,outBlock1)
            for (let i = 0; i < Object.keys(outBlock1.blocks).length; i++) {
                const blk_name = outBlock1.getBlock(i).name;


                if (blk_name == 'Table0') continue;

                form_data.value.push(outBlock1.getBlock(i));
            }

        })


        return {
            fullsc, scrollPage, form_count, root, offsetX, form_info, form_data

        };
    }
});
