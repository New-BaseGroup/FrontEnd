<template>
	<div class="base-card">
		<div class="base-card-Container">
			<div
			    v-for="widget in siteStore.getWidgets"
			    :key="widget.id"
			>
				<Widget
				    :header="widget.header"
				    :data="widget.data"
				    :key="widget.id"
				>
					</Widget>
					<font-awesome-icon
					    icon="fa-gear"
					    class="text-xl text-[#fff] hover:text-[#2b2b2b]"
					    @click="setOpenSetting(widget.id)"
					/>
					<li
					    v-if="openSetting == widget.id"
					    v-for="option in settings"
					    :key="option"
					>
						<ul @click="changeWidget(widget.id, option)">
							{{option}}
						</ul>
						</li>
		</div>

	</div>
	</div>
</template>

<script setup>
import Widget from "../components/UI/Widget.vue";
import { useSiteStore } from "../stores/site";
import { ref } from "vue";
const siteStore = useSiteStore();

const openSetting = ref(null);
const settings = ref([
    "Latest Transaction",
    "Budget Info",
    "Budget amount used / total amount",
    "Category usage",
]);
function setOpenSetting(id) {
    this.openSetting == id
        ? (this.openSetting = null)
        : (this.openSetting = id);
}
function changeWidget(id, option) {
    const widget = siteStore.getWidgets.find((widget) => widget.id == id);
    widget.data = option;
}
</script>
