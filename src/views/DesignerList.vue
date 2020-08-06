<template>
  <v-container>

    <v-row>
        <v-col cols="12" md="3" v-for="(designer, index) in designerList" :key="index" >
          <v-card
            class="mx-auto"
            max-width="300"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              :src="designer.logo"
            >
              <v-card-title>{{ designer.name }}</v-card-title>
            </v-img>
        
            <v-card-subtitle class="pb-0">{{ designer.korean }}</v-card-subtitle>
        
            <v-card-text class="text--primary">
              <div>{{ designer.desc ? designer.desc.substring(0,80) : '' }}</div>
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
    name: 'DesignerList',

    mounted(){
      this.getDesignerList();
    },

    methods: {
      getDesignerList(){
        axios.get('/api/designer').then((res)=>{

          if(res.data.result){
            console.log(res.data.list)
            this.$data.designerList = res.data.list
          }

        }).catch((ex)=>{

          console.log(ex)

        })
      }
    },

    data: () => ({
      designerList: [1,2,3,4,5,6]
    }),
  }
</script>
