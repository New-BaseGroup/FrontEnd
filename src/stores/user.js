import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { GetCookie, DeleteCookie } from "../Service/Cookie.js";
import { useRouter } from "vue-router";
import { useBudgetStore } from "./budget.js";
export const useUserStore = defineStore("user", () => {
    const router = useRouter();
    const budgetStore = useBudgetStore();
    //State
    const user = ref("");
    const loggedin = ref(false);
    const token = ref("");

    //Getters
    const getUser = computed(() => user.value);
    const getLoggedin = computed(() => {
        const loggedCookie = GetCookie("token");
        if (loggedCookie) {
            user.value = GetCookie("user");
            setToken(loggedCookie);
            setLoggedin(true);
        }
        return loggedin.value;
    });
    const getToken = computed(() => token.value);

    //Actions
    function setUser(newUser) {
        user.value = newUser;
    }
    function CreateLoginToken(token) {
        let expires = new Date(Date.now() + 86400 * 1000).toUTCString();
        document.cookie = `token=${token};expires=${expires + 86400};path=/;`;
        document.cookie = `user=${user.value};expires=${
            expires + 86400
        };path=/;`;
    }
    function setLoggedin(bool) {
        loggedin.value = bool;
    }
    function logOutUser() {
        loggedin.value = false;
        token.value = "";
        user.value = "";
        DeleteCookie("token");
        DeleteCookie("user");
        budgetStore.resetAll();
        router.push({ name: "home" });
    }
    function setToken(newToken) {
        token.value = newToken;
        CreateLoginToken(token.value);
    }
    return {
        user,
        loggedin,
        token,
        getUser,
        getLoggedin,
        getToken,
        setLoggedin,
        setToken,
        setUser,
        logOutUser,
    };
});
