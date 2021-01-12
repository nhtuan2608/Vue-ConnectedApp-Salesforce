<template>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" style="height: 100%;">
        
        <v-card elevation="14" outlined shaped style="width: 50%">
            
            <v-card-title>Welcome To Đào Qua Đảo</v-card-title>
            <v-alert type="error" v-if="errMessage[0] == 'Access denied'">{{errMessage}}</v-alert>
            <v-alert type="success" v-if="errMessage[0] == 'Success'">Logging in.....</v-alert>
            <v-card-text>
                <v-form>
                    <v-container>
                    <v-col>
                        <v-row cols="1" sm="6">
                            <v-text-field
                                hint="Your name"
                                label="Username"
                                id="nameText"
                                v-model="name"
                            ></v-text-field>
                        </v-row>

                        <v-row cols="1" sm="6">
                            <v-text-field
                                type="password"
                                hint="Your password"
                                label="Password" 
                                id="pwdText"
                                v-model="password"
                            ></v-text-field>
                        </v-row>
                    </v-col>
                    <v-btn @click="login()"  depressed color="primary" rounded> Login </v-btn>

                    </v-container>
                </v-form>
                </v-card-text>
        </v-card>
    </v-parallax>
</template>

<script>
import { getAuthUser } from '../js/common';
export default {
  
  name: 'Login',
  data() {
    return {
      name: '',
      password: '',
      errMessage: '',
      isErr: false,
    }
  },
  props: {
    msg: String
  },
  methods: {
    login: function (event) {
      // `this` inside methods points to the Vue instance
      var data = getAuthUser(this.name, this.password);
      // setInterval(()=>{
      //   console.log(data);
      // }, 1000);
      // if(data.length > 0) {
        this.errMessage = data;
      // }
      if(this.errMessage) {
        this.isErr = true;
      }
      alert('Hello ' + this.name + this.password +'!');
      
      // `event` is the native DOM event
      if (event) {
        alert(event.target.tagName);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
