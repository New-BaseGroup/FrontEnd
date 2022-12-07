import { defineStore } from "pinia";
import { ref, computed } from "vue";
import API_Service from "../API/API_Service.js";
import { useUserStore } from "./user.js";

export const useSiteStore = defineStore("site", () => {
    const userStore = useUserStore();
    //State
    const view = ref("");
    const loading = ref(false);
    const theme = ref("light-theme");
    const isMobile = ref(false);
    const widgets = ref();
    const widgetLimit = ref(6);
    const changesMade = ref(false);
    const widgetEdit = ref(false);

    //Getters
    const getView = computed(() => view.value);
    const getLoading = computed(() => loading.value);
    const getTheme = computed(() => theme.value);
    const getWidgets = computed(() => widgets.value);
    const getWidgetLimit = computed(() => widgetLimit.value);
    const getEditState = computed(() => widgetEdit.value);

    //Actions
    function setView(newView) {
        view.value = newView;
    }
    function SetwidgetEdit() {
        widgetEdit.value = !widgetEdit.value;
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
            data: "WidgetStandard",
        });
        changesMade.value = true;
    }
    function removeWidget(id) {
        const widgetIndex = widgets.value.findIndex(
            (widget) => widget.id === id
        );
        widgets.value.splice(widgetIndex, 1);
        changesMade.value = true;
    }
    async function loadWidgets() {
        await API_Service.GetService(
            `Account/Widgets`,
            userStore.getToken
        ).then((data) => {
            if (data) {
                console.log(data);
                widgets.value = data.data.message;
            } else {
                widgets.value = [
                    {
                        position: 0,
                        header: "Widget 1",
                        data: "WidgetStandard",
                    },
                    {
                        position: 1,
                        header: "Widget 2",
                        data: "WidgetStandard",
                    },
                    {
                        position: 2,
                        header: "Widget 3",
                        data: "WidgetStandard",
                    },
                ];
            }
        });
    }
    async function saveWidgets() {
        if (userStore.loggedin) {
            await API_Service.PostService(
                "Account/Widgets",
                widgets.value,
                userStore.getToken
            ).then((result) => {
                changesMade.value = false;
                return result;
            });
        }
    }
    function siteResize() {
        isMobile.value = window.innerWidth < 800;
    }
    function setChangesMade(bool) {
        changesMade.value = bool;
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
        isMobile,
        siteResize,
        loadWidgets,
        changesMade,
        saveWidgets,
        setChangesMade,
        getEditState,
        SetwidgetEdit,
    };
});
