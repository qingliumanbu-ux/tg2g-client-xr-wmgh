<template>
    <div id="root_s" class="backGround_s">
        <div class="head_s" style="display: flex;flex-direction: row;">
            <div class="border"> </div>
            <div class="title_s">不锈钢</div>
        </div>
        <div style="height: 825px;">
            <div style="display: flex;flex-direction: row;height: 50%;">
                <div style="width: 50%;">
                    <div class="s_title_1" style="height: 10%;">AOD</div>
                    <div style="height: 90%; display: flex; flex-direction: row;">
                        <div style="width: 20%;margin-left: 5%;">
                            <div class="s_title_2">当前炉数</div>
                            <div id="t_s_1">
                                <p class="s_num">{{ db_num }}</p>
                                <p class="s_text">{{ db_name }}</p>
                            </div>
                        </div>
                        <div style="width: 5%;"></div>
                        <div id="t_s_2" style="width: 70%;display: flex;">
                            <div style="width: 24%;height: 100%;position: relative;">
                                <div class="s_title_3"
                                    style="bottom: 160px;position: absolute;text-align: center;width: 100%;">{{ aod_4 }}</div>
                                <img :src="imageUrl4" alt="Dynamic Image"
                                    style="position: absolute;bottom: 50px;width: 100%;">
                                <div class="s_title_4"
                                    style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                    :style="{ color: fir_col }">{{ aod_4_n }}</div>
                            </div>
                            <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                                <div class="s_title_3"
                                    style="bottom: 200px;position: absolute;text-align: center;width: 100%;">{{ aod_3 }}</div>
                                <img :src="imageUrl3" alt="Dynamic Image"
                                    style="position: absolute;bottom: 50px;width: 100%;">
                                <div class="s_title_4"
                                    style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                    :style="{ color: sec_col }">{{ aod_3_n }}</div>
                            </div>
                            <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                                <div class="s_title_3"
                                    style="bottom: 240px;position: absolute;text-align: center;width: 100%;">{{ aod_2 }}</div>
                                <img :src="imageUrl2" alt="Dynamic Image"
                                    style="position: absolute;bottom: 50px;width: 100%;">
                                <div class="s_title_4"
                                    style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                    :style="{ color: tir_col }">{{ aod_2_n }}</div>
                            </div>
                            <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                                <div class="s_title_3"
                                    style="bottom: 280px;position: absolute;text-align: center;width: 100%;">{{ aod_1 }}
                                    <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                                        style="position: absolute;bottom: 20px;width: 60px;">
                                </div>
                                <img :src="imageUrl1" alt="Dynamic Image"
                                    style="position: absolute;bottom: 50px;width: 100%;">
                                <div class="s_title_4"
                                    style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                    :style="{ color: fou_col }">{{ aod_1_n }}</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div style="width: 50%;">
                    <div class="s_title_1" style="height: 10%;">合金熔化炉</div>
                    <div style="height: 90%; display: flex;flex-direction: row;">
                        <div style="width: 20%;margin-left: 2%;">
                            <div class="s_title_2">当前炉数</div>
                            <div id="t_s_3">
                                <p class="s_num">{{ db_num1 }}</p>
                                <p class="s_text">{{ db_name1 }}</p>
                            </div>
                        </div>
                        <div style="width: 7%;"></div>
                        <div id="t_s_4" style="width: 70%;display: flex;">
                            <div style="width: 24%;height: 100%;position: relative;">
                                <div class="s_title_3"
                                    style="bottom: 160px;position: absolute;text-align: center;width: 100%;">{{ IF_4 }}</div>
                                <img :src="imageUrlZ4" alt="Dynamic Image"
                                    style="position: absolute;bottom: 50px;width: 100%;">
                                <div class="s_title_4"
                                    style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                    :style="{ color: fir_col }">{{ IF_4_n }}</div>
                            </div>
                            <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                                <div class="s_title_3"
                                    style="bottom: 200px;position: absolute;text-align: center;width: 100%;">{{ IF_3 }}</div>
                                <img :src="imageUrlZ3" alt="Dynamic Image"
                                    style="position: absolute;bottom: 50px;width: 100%;">
                                <div class="s_title_4"
                                    style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                    :style="{ color: sec_col }">{{ IF_3_n }}</div>
                            </div>
                            <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                                <div class="s_title_3"
                                    style="bottom: 240px;position: absolute;text-align: center;width: 100%;">{{ IF_2 }}</div>
                                <img :src="imageUrlZ2" alt="Dynamic Image"
                                    style="position: absolute;bottom: 50px;width: 100%;">
                                <div class="s_title_4"
                                    style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                    :style="{ color: tir_col }">{{ IF_2_n }}</div>
                            </div>
                            <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                                <div class="s_title_3"
                                    style="bottom: 280px;position: absolute;text-align: center;width: 100%;">{{ IF_1 }}
                                    <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                                        style="position: absolute;bottom: 20px;width: 60px;">
                                </div>
                                <img :src="imageUrlZ1" alt="Dynamic Image"
                                    style="position: absolute;bottom: 50px;width: 100%;">
                                <div class="s_title_4"
                                    style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                    :style="{ color: fou_col }">{{ IF_1_n }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div style=" height: 50%;display: flex;flex-direction: row;">
                <div id="t_s_5" style="width: 33%;padding: 10px 30px;">
                    <div class="s_title_2">还原硅耗合格率排名</div>
                    <div style="padding: 30px 0;">
                        <div style="display: flex;flex-direction: row;position: relative;">
                            <div class="s_tag" :style="{ 'background': `${rgbColor1}` }">
                                <div class="s_tag_1" :style="{ 'background': `${hexColor1}` }">
                                </div>
                                <p style="color: #fff;text-align: center;">NO.1</p>
                            </div>
                            <div class="s_title_5" style="margin-left: 10px;">甲</div>
                            <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                                style="position: absolute;bottom: 10px;left: 400px;width: 40px;">
                            <div class="s_title_5" style="left: 450px;position: absolute;">90%</div>
                        </div>
                        <div class="g-progress"
                            :style="{ '--progress': 90 + '%', 'background': `linear-gradient(90deg, ${endColor1}, ${startColor1} var(--progress), transparent 0)` }">
                            <div class="circle"
                                :style="{ 'background': `radial-gradient(circle, ${startColor1}, ${endColor1})`, 'margin-left': 90 + '%' }">
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: row;position: relative;">
                            <div class="s_tag" :style="{ 'background': `${rgbColor2}` }">
                                <div class="s_tag_1" :style="{ 'background': `${hexColor2}` }">
                                </div>
                                <p style="color: #fff;text-align: center;">NO.2</p>
                            </div>
                            <div class="s_title_5" style="margin-left: 10px;">乙</div>

                            <div class="s_title_5" style="left: 450px;position: absolute;">80%</div>
                        </div>
                        <div class="g-progress"
                            :style="{ '--progress': 80 + '%', 'background': `linear-gradient(90deg, ${endColor2}, ${startColor2} var(--progress), transparent 0)` }">
                            <div class="circle"
                                :style="{ 'background': `radial-gradient(circle, ${startColor2}, ${endColor2})`, 'margin-left': 80 + '%' }">
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: row;position: relative;">
                            <div class="s_tag" :style="{ 'background': `${rgbColor3}` }">
                                <div class="s_tag_1" :style="{ 'background': `${hexColor3}` }">
                                </div>
                                <p style="color: #fff;text-align: center;">NO.3</p>
                            </div>
                            <div class="s_title_5" style="margin-left: 10px;">丙</div>

                            <div class="s_title_5" style="left: 450px;position: absolute;">70%</div>
                        </div>
                        <div class="g-progress"
                            :style="{ '--progress': 70 + '%', 'background': `linear-gradient(90deg, ${endColor3}, ${startColor3} var(--progress), transparent 0)` }">
                            <div class="circle"
                                :style="{ 'background': `radial-gradient(circle, ${startColor3}, ${endColor3})`, 'margin-left': 70 + '%' }">
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: row;position: relative;">
                            <div class="s_tag" :style="{ 'background': `${rgbColor4}` }">
                                <div class="s_tag_1" :style="{ 'background': `${hexColor4}` }">
                                </div>
                                <p style="color: #fff;text-align: center;">NO.4</p>
                            </div>
                            <div class="s_title_5" style="margin-left: 10px;">丁</div>

                            <div class="s_title_5" style="left: 450px;position: absolute;">60%</div>
                        </div>
                        <div class="g-progress"
                            :style="{ '--progress': 60 + '%', 'background': `linear-gradient(90deg, ${endColor4}, ${startColor4} var(--progress), transparent 0)` }">
                            <div class="circle"
                                :style="{ 'background': `radial-gradient(circle, ${startColor4}, ${endColor4})`, 'margin-left': 60 + '%' }">
                            </div>
                        </div>
                    </div>


                </div>
                <div id="t_s_6" style="width: 33%; ">
                    <div class="s_title_2">AOD 炉次间隔时间合格率排名</div>
                    <div style="padding: 30px 0;">
                        <div style="display: flex;flex-direction: row;position: relative;">
                            <div class="s_tag" :style="{ 'background': `${rgbColor1}` }">
                                <div class="s_tag_1" :style="{ 'background': `${hexColor1}` }">
                                </div>
                                <p style="color: #fff;text-align: center;">NO.1</p>
                            </div>
                            <div class="s_title_5" style="margin-left: 10px;">甲</div>
                            <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                                style="position: absolute;bottom: 10px;left: 400px;width: 40px;">
                            <div class="s_title_5" style="left: 450px;position: absolute;">90%</div>
                        </div>
                        <div class="g-progress"
                            :style="{ '--progress': 90 + '%', 'background': `linear-gradient(90deg, ${endColor1}, ${startColor1} var(--progress), transparent 0)` }">
                            <div class="circle"
                                :style="{ 'background': `radial-gradient(circle, ${startColor1}, ${endColor1})`, 'margin-left': 90 + '%' }">
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: row;position: relative;">
                            <div class="s_tag" :style="{ 'background': `${rgbColor2}` }">
                                <div class="s_tag_1" :style="{ 'background': `${hexColor2}` }">
                                </div>
                                <p style="color: #fff;text-align: center;">NO.2</p>
                            </div>
                            <div class="s_title_5" style="margin-left: 10px;">乙</div>

                            <div class="s_title_5" style="left: 450px;position: absolute;">78%</div>
                        </div>
                        <div class="g-progress"
                            :style="{ '--progress': 80 + '%', 'background': `linear-gradient(90deg, ${endColor2}, ${startColor2} var(--progress), transparent 0)` }">
                            <div class="circle"
                                :style="{ 'background': `radial-gradient(circle, ${startColor2}, ${endColor2})`, 'margin-left': 80 + '%' }">
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: row;position: relative;">
                            <div class="s_tag" :style="{ 'background': `${rgbColor3}` }">
                                <div class="s_tag_1" :style="{ 'background': `${hexColor3}` }">
                                </div>
                                <p style="color: #fff;text-align: center;">NO.3</p>
                            </div>
                            <div class="s_title_5" style="margin-left: 10px;">丙</div>

                            <div class="s_title_5" style="left: 450px;position: absolute;">70%</div>
                        </div>
                        <div class="g-progress"
                            :style="{ '--progress': 70 + '%', 'background': `linear-gradient(90deg, ${endColor3}, ${startColor3} var(--progress), transparent 0)` }">
                            <div class="circle"
                                :style="{ 'background': `radial-gradient(circle, ${startColor3}, ${endColor3})`, 'margin-left': 70 + '%' }">
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: row;position: relative;">
                            <div class="s_tag" :style="{ 'background': `${rgbColor4}` }">
                                <div class="s_tag_1" :style="{ 'background': `${hexColor4}` }">
                                </div>
                                <p style="color: #fff;text-align: center;">NO.4</p>
                            </div>
                            <div class="s_title_5" style="margin-left: 10px;">丁</div>

                            <div class="s_title_5" style="left: 450px;position: absolute;">60%</div>
                        </div>
                        <div class="g-progress"
                            :style="{ '--progress': 60 + '%', 'background': `linear-gradient(90deg, ${endColor4}, ${startColor4} var(--progress), transparent 0)` }">
                            <div class="circle"
                                :style="{ 'background': `radial-gradient(circle, ${startColor4}, ${endColor4})`, 'margin-left': 60 + '%' }">
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="s_title_2">中包温度命中率比较</div>
                    <div id=" t_s_7" class="grid-container" style="width: 30%;">

                        <div class="grid-item" style="position: relative;width: 280px;height: 170px;">
                            <img src="../../assets/images/元素3.png" alt="Dynamic Image"
                                style="width: 150px;height: 140px;left: 10px;position: absolute;">
                            <div class="s_num_per" style="position: absolute;right: 10px;">95%</div>
                        </div>
                        <div class="grid-item" style="position: relative;width: 280px;height: 170px;">
                            <img src="../../assets/images/元素4.png" alt="Dynamic Image"
                                style="width: 150px;height: 140px;left: 10px;position: absolute;">
                            <div class="s_num_per" style="position: absolute;right: 10px;">95%</div>
                        </div>
                        <div class="grid-item" style="position: relative;width: 280px;height: 170px;">
                            <img src="../../assets/images/元素5.png" alt="Dynamic Image"
                                style="width: 150px;height: 140px;left: 10px;position: absolute;">
                            <div class="s_num_per" style="position: absolute;right: 10px;">95%</div>
                        </div>
                        <div class="grid-item" style="position: relative;width: 280px;height: 170px;">
                            <img src="../../assets/images/元素6.png" alt="Dynamic Image"
                                style="width: 150px;height: 140px;left: 10px;position: absolute;">
                            <div class="s_num_per" style="position: absolute;right: 10px;">95%</div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>

<script lang="ts" src="./WMSMFOSMS.ts">
                    </script>

<style scoped>
@import "./WMSMFOSMS.scss";
</style>
