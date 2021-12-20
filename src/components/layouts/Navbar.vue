<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" :to="{name:'login'}">Jala</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
                    <router-link class="nav-link" :to="{name:'members'}">Members</router-link>
            </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">{{user.name}}</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout" style="cursor:pointer;">Logout</a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'login'}">Login</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
  import {mapGetters} from 'vuex'
  
  export default {
    computed: {
      ...mapGetters({
        isLoggedIn: 'isLoggedIn',
        user: 'user',
      })
    },
    methods: {
      logout() {
            this.$store.dispatch("logout").then(() => {
                this.$router.push("/");
            });
        }
    }
  }
</script>