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
            header: "Widget",
            data: "Please select a setting",
        },
        {
            id: 1,
            header: "Widget 1",
            data: "Please select a setting",
        },
        {
            id: 2,
            header: "Widget 2",
            data: "Please select a setting",
        },
    ]);
    const widgetLimit = ref(6);

    //Getters
    const getView = computed(() => view.value);
    const getLoading = computed(() => loading.value);
    const getTheme = computed(() => theme.value);
    const getWidgets = computed(() => widgets.value);
    const getWidgetLimit = computed(() => widgetLimit.value);

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
    function addWidget() {
        widgets.value.push({
            id: widgets.value.length,
            header: `Widget ${widgets.value.length}`,
            data: "Please select a setting",
        });
    }
    function removeWidget(id) {
        const widgetIndex = widgets.value.findIndex(
            (widget) => widget.id === id
        );
        widgets.value.splice(widgetIndex, 1);
    }
    return {
        view,
        loading,
        theme,
        widgets,
        widgetLimit,
        getView,
        getLoading,
        getTheme,
        getWidgets,
        getWidgetLimit,
        setView,
        setLoading,
        setTheme,
        addWidget,
        removeWidget,
    };
});
