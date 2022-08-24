<template>
    <div>
        <h3>This is the register.</h3>
        <div>
            <form @submit.prevent="register">
                <div class="inputWrapper">
                    <label>Username</label><br/>
                    <input type="text" v-model="input.user" placeholder="Username"/>
                </div>
                <div class="inputWrapper">
                    <label>Password</label><br/>
                    <input type="password" v-model="input.password" placeholder="Password"/>
                </div>
                <div class="inputWrapper">
                    <label>Confirm password</label><br/>
                    <input type="password" placeholder="Confirm Password"/>
                </div>
                <div class="inputWrapper">
                    <label>Email</label><br/>
                    <input type="password" v-model="input.email" placeholder="Email"/>
                </div>
                <button v-on:submit="register">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
import API_Service from '../API/API_Service.js'

export default {
    name:'register', 
    mounted () {
        console.log("started registration");
    },
    data() {
        return {
            input: {
                user: '',
                password: '',
                email: ''
            },
            users: []
        }
    },
    methods: {
        async register () {
            await API_Service.PostService('Account/register', this.input)
            .then(function(response){
            if(response?.status == 'success'){
                alert("You're now registered " + response?.message);
            } else {
                alert(response.message);
            }
            });
        },
        ValidateForm (string) {

        }
    }
}
</script>
<style scoped>
.inputWrapper{
    margin: auto;
}
</style>