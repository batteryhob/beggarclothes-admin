<template>
  <v-container>

    <v-row>
        <v-col cols="12" md="3" v-for="(feed, index) in feedList" :key="index" >
          <v-card
            class="mx-auto"
            max-width="300"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              :src="feed.logo"
            >
              <v-card-title>{{ feed.name }}</v-card-title>
            </v-img>
        
            <v-card-subtitle class="pb-0">{{ feed.korean }}</v-card-subtitle>
        
            <v-card-text class="text--primary">
              <div>{{ feed.desc.substring(0,80) }}</div>
            </v-card-text>
        
            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                수정
              </v-btn>
        
              <v-btn
                color="orange"
                text
              >
                삭제
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
    </v-row>


    
  </v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Feedist',

    mounted(){
      this.getDesignerList();
    },

    methods: {
      getDesignerList(){
        axios.get('/api/feed').then((res)=>{

          if(res.data.result){
            console.log(res.data.list)
            this.$data.feedList = res.data.list
          }

        }).catch((ex)=>{

          console.log(ex)

        })
      }
    },

    data: () => ({
      feedList: [1,2,3,4,5,6]
    }),
  }
</script>
