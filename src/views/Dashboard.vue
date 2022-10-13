<template>
    <div class="base-card">
        <div class="base-card-Container">
            <div
                v-for="widget in siteStore.getWidgets"
                :key="widget.id"
            >
                <Widget
                    :id="widget.id"
                    :header="widget.header"
                    :data="widget.data"
                    :key="widget.id"
                    @changeWidget="(id, option) => changeWidget(id, option)"
                >
                    </Widget>
        </div>
        <div
            v-for="empty in siteStore.getWidgetLimit - siteStore.getWidgets.length"
            :key="empty"
        >
            <button
                @click="siteStore.addWidget"
                class="m-5"
            >Add Widget</button>
    </div>
    </div>
    </div>
</template>

<script setup>
import Widget from "../components/UI/Widget.vue";
import { useSiteStore } from "../stores/site";
const siteStore = useSiteStore();

function changeWidget(id, option) {
    const widget = siteStore.getWidgets.find((widget) => widget.id == id);
    widget.data = option.getter;
    widget.header = option.title;
}
</script>
