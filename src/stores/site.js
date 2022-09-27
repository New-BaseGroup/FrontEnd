import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSiteStore = defineStore('site', () => {
    //State
    const view = ref('')
    const loading = ref(false)

    //Getters
    const getView = computed(() => view.value)
    const getLoading = computed(() => loading.value)

    //Actions
    function setView(newView){
        view.value = newView;
    }
    function setLoading(bool){
        loading.value = bool;
    }
    return { view, loading, getView, getLoading, setView, setLoading}
  })
  