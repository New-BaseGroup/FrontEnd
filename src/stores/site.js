import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSiteStore = defineStore('site', () => {
    //State
    const view = ref("")
    const loading = ref(false)
    const theme = ref("light-theme")

    //Getters
    const getView = computed(() => view.value)
    const getLoading = computed(() => loading.value)
    const getTheme = computed(() => theme.value)

    //Actions
    function setView(newView){
        view.value = newView;
    }
    function setLoading(bool){
        loading.value = bool;
    }
    function setTheme() {
        theme.value = localStorage.getItem("theme");
    }
    return { view, loading, theme, getView, getLoading, getTheme, setView, setLoading, setTheme}
  })
  