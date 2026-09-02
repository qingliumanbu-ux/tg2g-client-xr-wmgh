<template>
    <div id="root_q" class="backGround_q">
        <div class="head_q" style="display: flex;flex-direction: row;">
            <div class="border"> </div>
            <div class="title_q">全厂信息</div>
        </div>
        <div style="height: 825px;">
            <div style="display: flex;flex-direction: row;height: 50%;">
                <div style="width: 33%;padding: 20px;position: relative;">

                    <div id="t_q_1" style="width: 100%;height: 100%;">

                    </div>
                    <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                        style="position: absolute;bottom: 250px;left: 50px; width: 40px;">
                </div>
                <div style="width: 33%;padding: 20px;position: relative;">
                    <div id="t_q_2" style="width: 100%;height: 100%;"></div>
                    <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                        style="position: absolute;bottom: 250px;left: 50px; width: 40px;">
                </div>
                <div style="width: 33%;padding: 20px;position: relative;">
                    <div id="t_q_3" style="width: 100%;height: 100%;"></div>
                    <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                        style="position: absolute;bottom: 250px;left: 50px; width: 40px;">
                </div>
            </div>
            <div class="area_2" style="display: flex;flex-direction: row;height: 50%;">
                <div style="width: 50%;margin-left: 20px;">
                    <div class="q_title_2">还原硅耗合格率排名</div>
                    <div id="t_q_4" style="width: 100%;display: flex;height: 100%;padding: 20px;">
                        <div style="width: 24%;height: 100%;position: relative;">
                            <div class="q_title_3"
                                style="bottom: 160px;position: absolute;text-align: center;width: 100%;">丁</div>
                            <img :src="imageUrl1" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="q_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: fir_col }">70</div>
                        </div>
                        <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                            <div class="q_title_3"
                                style="bottom: 210px;position: absolute;text-align: center;width: 100%;">乙</div>
                            <img :src="imageUrl2" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="q_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: sec_col }">72</div>
                        </div>
                        <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                            <div class="q_title_3"
                                style="bottom: 250px;position: absolute;text-align: center;width: 100%;">甲</div>
                            <img :src="imageUrl3" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="q_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: tir_col }">75</div>
                        </div>
                        <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                            <div class="q_title_3"
                                style="bottom: 300px;position: absolute;text-align: center;width: 100%;">丙
                                <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                                    style="position: absolute;bottom: 20px;width: 60px;">
                            </div>
                            <img :src="imageUrl4" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="q_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: fou_col }">80</div>
                        </div>
                    </div>
                </div>
                <div style="width: 50%;margin-left: 20px;">
                    <div class="q_title_2">不锈钢特定钢种的吨钢成本比较</div>
                    <div id="t_q_4" style="width: 100%;display: flex;height: 100%;padding: 20px;">
                        <div style="width: 24%;height: 100%;position: relative;">
                            <div class="q_title_3"
                                style="bottom: 160px;position: absolute;text-align: center;width: 100%;">甲</div>
                            <img :src="imageUrl_1" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="q_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: fir_col }">15</div>
                        </div>
                        <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                            <div class="q_title_3"
                                style="bottom: 210px;position: absolute;text-align: center;width: 100%;">乙</div>
                            <img :src="imageUrl_2" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="q_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: sec_col }">17</div>
                        </div>
                        <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                            <div class="q_title_3"
                                style="bottom: 250px;position: absolute;text-align: center;width: 100%;">丙</div>
                            <img :src="imageUrl_3" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="q_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: tir_col }">18</div>
                        </div>
                        <div style="width: 24%;height: 100%;position: relative;margin-left: -2%;">
                            <div class="q_title_3"
                                style="bottom: 300px;position: absolute;text-align: center;width: 100%;">丁
                                <img src="../../assets/images/元素2.png" alt="Dynamic Image"
                                    style="position: absolute;bottom: 20px;width: 60px;">
                            </div>
                            <img :src="imageUrl_4" alt="Dynamic Image"
                                style="position: absolute;bottom: 50px;width: 100%;">
                            <div class="q_title_4"
                                style="bottom: 50px;position: absolute;text-align: center;width: 100%;"
                                :style="{ color: fou_col }">20</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./WMSMFOSMQ.ts"></script>

<style scoped>
@import "./WMSMFOSMQ.scss";
</style>
