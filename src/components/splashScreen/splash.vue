<template>
    <div class="parallax img3 text-center text-textcolor-input">
        <h1 class="font-mono p-10 text-9xl font-bold drop-shadow-xl">
            SkyBudget<span class="font-mono text-white-400">™</span>
        </h1>
        <h1 class="font-mono text-2xl font-semibold drop-shadow-xl">
            The budget app for you.
        </h1>
    </div>
    <div
        class="w-full flex m-auto place-items-center bg-white h-72 place-content-center">
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
    <div class="parallax img1"></div>
    <div class="bg-blue-300 w-full text-center h-80">
        <h2 class="font-mono p-5 text-xl font-semibold">
            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by
            Cicero in 45 BC "
        </h2>
        <p class="font-mono p-20 text-sm font-semibold">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?"
        </p>
    </div>
    <div class="parallax img2"></div>
    <div class="bg-white w-full flex m-10 h-80">
        <h4 class="font-mono m-10 text-5xl font-semibold">
            "Best working budget app in the business." - Albert Einstein
        </h4>
        <img
            src="../../assets/images/team power.jpg"
            alt="Italian Trulli"
            class="w-50 h-4/5 justify-self-center rounded-xl" />
    </div>
</template>
<script setup></script>
<style>
.img1 {
    background-image: url("../../assets/images/calc.jpg");
}
.img2 {
    background-image: url("../../assets/images/notes.jpg");
}
.img3 {
    background-image: url("../../assets/images/working.jpg");
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
