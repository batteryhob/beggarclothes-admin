<template>
  <v-app>
    <v-app-bar
      app
      color="#000"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">        
      </v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink ml-5 hidden-sm-and-down"
          contain
          min-width="80"
          src="/imgs/admin.png"
          width="80"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Go Beggar Clothes</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main>
       <router-view/>
    </v-main>

    <v-spacer></v-spacer>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
  
        <v-divider></v-divider>
  
        <v-list dense>
  
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <!-- <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon> -->
  
            <v-list-item-content @click="goMenu(item.title)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>


    <v-footer        
        class="font-weight-medium"
      >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Beggar Clothes</strong>
      </v-col>
    </v-footer>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {},

  methods: {
    goMenu(title){
      console.log(title)
      this.$router.push({ path: `/admin/${title}` })
    }
  },

  data: () => ({
    drawer: false,
    items: [{
      title: 'Designer',
      icon: 'dashboard'
    },
    {
      title: 'Feed',
      icon: 'dashboard'
    }]
  }),
};
</script>
