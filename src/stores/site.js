import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSiteStore = defineStore("site", () => {
    //State
    const view = ref("");
    const loading = ref(false);
    const theme = ref("light-theme");
    const widgets = ref([
        {
            id: 0,
            header: "Test",
            data: "String",
        },
        {
            id: 1,
            header: "Test 1",
            data: "String",
        },
        {
            id: 2,
            header: "Test 2",
            data: "String",
        },
    ]);

    //Getters
    const getView = computed(() => view.value);
    const getLoading = computed(() => loading.value);
    const getTheme = computed(() => theme.value);
    const getWidgets = computed(() => widgets.value);

    //Actions
    function setView(newView) {
        view.value = newView;
    }
    function setLoading(bool) {
        loading.value = bool;
    }
    function setTheme() {
        theme.value = localStorage.getItem("theme");
    }
    return {
        view,
        loading,
        theme,
        widgets,
        getView,
        getLoading,
        getTheme,
        getWidgets,
        setView,
        setLoading,
        setTheme,
    };
});
