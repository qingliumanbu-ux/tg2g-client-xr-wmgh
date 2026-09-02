<template>
    <div id="root" @wheel="scrollPage" >
        <header @click="fullsc">
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
        <section class="mainbox">

            <div class="column">
                <WMSMFOSMS />
            </div>
            <div class="column">
                <WMSMFOSMQ />
            </div>
            <div class="column">
                <WMSMFOSMC />
            </div>
        </section>
    </div>
</template>

<script lang="ts" src="./WMSMFOSM.ts"></script>

<style scoped>
@import "./WMSMFOSM.scss";
</style>
