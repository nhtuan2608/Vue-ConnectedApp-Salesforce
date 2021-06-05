<template>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" style="height: 100%;">
        
        <v-card elevation="14" outlined shaped style="width: 80%" min-width="300px;">
            
            <v-card-title style="display: inline-block">
              <div>
                Welcome To <div style="display: inline-block">Đào Qua Đảo</div>
              </div>
            </v-card-title>
            <v-alert type="error" v-if="errMessage[0] == 'Access denied'">{{errMessage}}</v-alert>
            <v-alert type="success" v-if="errMessage[0] == 'Success'" >Logging in..... with {{username}}</v-alert>
            <v-card-text class="card_container">
                <v-form>
                    <v-container>
                      <v-row>
                        <!-- <v-img alt="Article" lazy-src="@/assets/images/top-left.jpg" 
                              width="300" height="300" /> -->
                        <v-col>
                          <v-row cols="6" sm="4">
                              <v-text-field
                                  hint="Your name"
                                  label="Username"
                                  id="nameText"
                                  v-model="username"
                                  v-bind:disabled="isLoading"
                              ></v-text-field>
                          </v-row>
                          <v-row cols="6" sm="4">
                              <v-text-field
                                  type="password"
                                  hint="Your password"
                                  label="Password" 
                                  id="pwdText"
                                  v-model="password"
                                  v-bind:disabled="isLoading"
                              ></v-text-field>
                          </v-row>
                          <v-row style="margin-top: 20px;">
                            <v-btn @click="login()" depressed color="primary" rounded v-bind:loading="isLoading">
                              {{btnTitle}}
                            </v-btn>
                          </v-row>
                        </v-col>
                      </v-row>  
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
      // Data from Server
      username: '',
      password: '',

      // Constant
      errMessage: '',
      isErr: false,
      isLoading: false,
      btnTitle: 'Login'
    }
  },
  props: {
    msg: String
  },
  methods: {
    login: function (event) {
      this.isLoading = true;
      // `this` inside methods points to the Vue instance
      var data = getAuthUser(this.username, this.password);
      this.errMessage = data;

      if(!this.errMessage) {
        this.isErr = true;
        alert('Error fetch data!');
        return false;
      } 
      else {
        // alert('Hello ' + this.name + this.password +'!');
        setInterval(() => {
          this.isLoading = false;
          return false;
        }, 2000);
      }
      
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
