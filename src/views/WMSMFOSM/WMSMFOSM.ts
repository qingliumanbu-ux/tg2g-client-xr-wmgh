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
import WMSMFOSMC from "../WMSMFOSMC/WMSMFOSMC.vue";
import WMSMFOSMS from "../WMSMFOSMS/WMSMFOSMS.vue";
import WMSMFOSMQ from "../WMSMFOSMQ/WMSMFOSMQ.vue";






export default defineComponent({
    name: 'WMSMFOSM',
    components: {
        WMSMFOSMC, WMSMFOSMS, WMSMFOSMQ
    },
    methods: {},
    setup() {
       
        const fullsc = () => {
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
        const scrollPage = (e: any) => {
           
        }
       
        onMounted(() => {

            //scroll(tableRef.value.$refs.bodyWrapper) //设置滚动

        })
       

        return {
            fullsc, scrollPage, 

        };
    }
});
