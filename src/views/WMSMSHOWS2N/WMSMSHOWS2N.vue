<template>
    
        <div  id="root" ref="root" @wheel="scrollPage"
            :style="{ height: 1080 + 'px', width: `${form_count * 1920}` + 'px', transform: `translateX(${offsetX}px)` }">
            
            <header @click="fullsc" :style="{ height: 100 + 'px', width: `${form_count * 1920}` + 'px', backgroundSize: 'cover' }">
                <div class="title">
                    <p>炼钢智慧大屏</p>
                </div>
                <div class="example">
                    <div class="example_content">
                        <div class="colorBox" style="background: #F6DA30;"></div>
                        <div>
                            <p>甲</p>
                        </div>
                        <div class="colorBox" style="background: #00AEFF;"></div>
                        <div>
                            <p>乙</p>
                        </div>
                        <div class="colorBox" style="background: #29EFFA;"></div>
                        <div>
                            <p>丙</p>
                        </div>
                        <div class="colorBox" style="background: #1DF296;"></div>
                        <div>
                            <p>丁</p>
                        </div>
                    </div>


                </div>
            </header>
            <section class="mainbox" :style="{ flex: `${form_count}`, width: `${form_count * 1920}` + 'px', height: '980px' }">

                <div class="column" v-for="(item, index) in form_info" :key="index">
                    <SUBPAGE :form_conf="item" :form_data="form_data"/>
                </div>

            </section>
        </div>
  

</template>

<script lang="ts" src="./WMSMSHOWS2N.ts"></script>

<style scoped>
@import "./WMSMSHOWS2N.scss";
</style>
