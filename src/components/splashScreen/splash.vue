<template>
    <div class="snap-y snap-mandatory h-screen overflow-scroll">
        <div
            class="parallax img4 text-center text-textcolor-input drop-shadow-lg snap-start">
            <h1
                class="font-mono p-10 text-9xl font-bold drop-shadow-xl"
                data-aos="zoom-in"
                data-aos-duration="1500"
                data-aos-delay="500">
                SkyBudget
            </h1>
            <h1
                class="font-mono text-2xl font-semibold drop-shadow-xl"
                data-aos="zoom-in"
                data-aos-duration="1500"
                data-aos-delay="500">
                The budget app for you.
            </h1>
        </div>
        <div class="bg-purple-400 w-full text-center h-80 snap-start">
            <video
                class="h-full m-auto"
                autoplay
                loop
                :muted="mutedVideo"
                @click="mutedVideo = !mutedVideo">
                <font-awesome-icon icon="fa-angle-right" @click="" />
                <source
                    src="../../assets/videos/character-explainer-ad-copy.mp4"
                    type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="parallax img3 mb-1 brightness-75"></div>
        <div class="bg-blue-300 w-full p-12 snap-start">
            <h2 class="font-mono p-5 text-3xl font-semibold">
                EFFECTPLAN REVOLUTIONIZES YOUR BUDGETING AND FORECASTING
                PROCESSES
            </h2>
            <p
                class="font-mono p-20 text-2xl font-semibold"
                data-aos="fade-left">
                Preparing, maintaining and compiling budgets often requires a
                lot of time and manual work. Forecasts may be overplayed before
                they are completed, and new plans are needed as operations
                change. Effectplan takes your organization from traditional
                budget processes to proactive business planning based on current
                data.
            </p>
            <ul
                class="font-mono p-20 text-2xl font-semibold"
                data-aos="fade-right">
                Benefits
                <li>Effective planning and budget work on a new level</li>
                <li>
                    No hassle with Excel and time-consuming organization of data
                </li>
                <li>
                    Clear overview of the economy with dynamically updated
                    reports
                </li>
                <li>
                    Access to accurate ongoing forecasts for better
                    decision-making heheh
                </li>
                <li>
                    Time saving and reduced risk of mistakes due to the human
                    factor
                </li>
                <li>
                    Improved decision-making with real-time access to key
                    figures
                </li>
            </ul>
        </div>
        <div class="parallax img1"></div>
        <div
            class="w-full flex m-auto place-items-center bg-white h-72 place-content-center snap-start">
            <img
                src="../../assets/images/hardly working.jpg"
                alt="Italian Trulli"
                class="w-50 h-4/5 rounded-xl" />
            <h4 class="font-mono text-5xl m-5 p-5 font-semibold h-1/3">
                Meet the team.
            </h4>
            <button class="h-1/6">
                <font-awesome-icon icon="fa-angles-right" @click="" />
            </button>
        </div>

        <div class="parallax img2 brightness-75"></div>
        <!-- <div class="bg-white w-full flex h-80">
        <h4 class="font-mono m-10 text-5xl font-semibold">
            "Best working budget app in the business." - Albert Einstein
        </h4>
        <img
            src="../../assets/images/team power.jpg"
            alt="Italian Trulli"
            class="w-50 h-4/5 justify-self-center rounded-xl" />
    </div> -->
    </div>
</template>
<script setup>
import { ref } from "vue";
const mutedVideo = ref(true);
</script>
<style>
.img1 {
    background-image: url("../../assets/images/calc.jpg");
    filter: brightness(0);
    filter: blur(1px);
}
.img2 {
    background-image: url("../../assets/images/notes.jpg");
    filter: brightness(0.75);
    filter: blur(1px);
}
.img3 {
    background-image: url("../../assets/images/working.jpg");
    filter: brightness(50%);
    filter: blur(1px);
}
.img4 {
    background-image: url("../../assets/images/businessmen-working-strategic-planning.jpg");
}
.parallax {
    min-height: 500px;

    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

h1 {
    color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
        1px 1px 0 #000;
}
</style>
