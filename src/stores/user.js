import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
    //State
    const user = ref("");
    const loggedin = ref(false);
    const token = ref("");

    //Getters
    const getUser = computed(() => user.value);
    const getLoggedin = computed(() => loggedin.value);
    const getToken = computed(() => token.value);

    //Actions
    function setUser(newUser) {
        user.value = newUser;
    }

    function setLoggedin(bool) {
        loggedin.value = bool;
    }
    function logOutUser(){ 
        loggedin.value = false;
        token.value = "";
        user.value = "";
    }
    function setToken(newToken){
        token.value = newToken;
    }
    return { user, loggedin,token, getUser, getLoggedin,getToken, setLoggedin,setToken, setUser,logOutUser };
});
