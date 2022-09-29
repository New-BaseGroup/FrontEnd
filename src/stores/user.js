import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
    //State
    const user = ref('')
    const loggedin = ref(false)

    //Getters
    const getUser = computed(() => user.value)
    const getLoggedin = computed(() => loggedin.value)

    //Actions
    function setUser(newUser){
        user.value = newUser;
    }
    
    function setLoggedin(bool) {
        loggedin.value = bool;
    }
    return { user, loggedin, getUser, getLoggedin, setLoggedin, setUser }
  })
  