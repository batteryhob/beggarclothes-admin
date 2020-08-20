<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card ref="form">
              <v-card-text>              
                
                <v-row>
                  <v-col cols="12">
                    <header>Priview</header>
                  </v-col>
                  <v-col
                    v-for="(data, idx) in images"
                    :key="idx"
                    class="d-flex child-flex"
                    cols="4"
                  >
                    <v-card flat tile class="d-flex">
                      <v-img
                        :src="data.url"                        
                        aspect-ratio=".5"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-card>
                  </v-col>
                </v-row>

                <!--타이틀-->
                <v-row>
                  <v-col cols="12">
                    <header>Title</header>
                  </v-col>
                  <v-col cols="12">
                    <v-row>
                      <v-switch v-model="New" class="mx-2" label="New"></v-switch>
                      <v-switch v-model="Hot" class="mx-2" label="Hot"></v-switch>
                      <v-switch v-model="Recommend" class="mx-2" label="Recommend"></v-switch>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete class=""
                      ref="Designer"
                      v-model="Designer"
                      :rules="[() => !!Designer || 'This field is required' ]"
                      :items="Designers"
                      item-text="name"
                      label="Designer"
                      placeholder="디자이너를 선택하세요."
                      required
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      ref="Name"
                      v-model="Name"
                      :rules="[() => !!Name || 'This field is required']"
                      label="Name"
                      placeholder="상품명"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-select
                      :items="currencys"
                      :label="Currency"
                      outlined
                      v-model="Currency"
                    ></v-select>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      ref="BeforePrice"
                      v-model="BeforePrice"
                      :rules="[() => !!BeforePrice || 'This field is required']"
                      label="Before Price"
                      placeholder="1,000"
                      required                      
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      ref="AfterPrice"
                      v-model="AfterPrice"
                      :rules="[() => !!AfterPrice || 'This field is required']"
                      label="After Price"
                      placeholder="1,000"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      ref="Link"
                      v-model="Link"
                      :rules="[() => !!Link || 'This field is required']"
                      label="Link"
                      placeholder="https://"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!--콘텐츠-->
                <v-row>
                  <v-col cols="12">
                    <header>Content</header>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      ref="Description"
                      v-model="Description"
                      :rules="[() => !!Description || 'This field is required']"
                      label="Description"
                      placeholder="상품 설명을 작성하세요."
                      required
                    ></v-textarea>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      ref="DesignerPoint"
                      v-model="DesignerPoint"
                      :rules="[() => !!DesignerPoint || 'This field is required']"
                      label="Designer Point"
                      placeholder="1-99"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      ref="PricePoint"
                      v-model="PricePoint"
                      :rules="[() => !!PricePoint || 'This field is required']"
                      label="Price Point"
                      placeholder="1-99"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      ref="DailyPoint"
                      v-model="DailyPoint"
                      :rules="[() => !!DailyPoint || 'This field is required']"
                      label="Daily Point"
                      placeholder="1-99"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                     <v-text-field
                      ref="EssentialPoint"
                      v-model="EssentialPoint"
                      :rules="[() => !!EssentialPoint || 'This field is required']"
                      label="Essential Point"
                      placeholder="1-99"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

              </v-card-text>

              <v-divider class="mt-12"></v-divider>

              <v-card-actions>
                <v-btn text @click="cancle">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-slide-x-reverse-transition>
                  <v-tooltip
                    v-if="formHasErrors"
                    left
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        class="my-0"
                        v-bind="attrs"
                        @click="resetForm"
                        v-on="on"
                      >
                        <v-icon>mdi-refresh</v-icon>
                      </v-btn>
                    </template>
                    <span>Refresh form</span>
                  </v-tooltip>
                </v-slide-x-reverse-transition>
                <v-btn color="primary" text @click="submit">Submit</v-btn>
              </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'FeedMod',

    components: {
    },

    computed: {
      form () {
        return {

          newflag: this.$data.New,
          hot: this.$data.Hot,
          recommend: this.$data.Recommend,
          designer_seq: this.$data.Designers.find(o => o.name === this.$data.Designer).seq,
        
          name: this.$data.Name,

          currency: this.$data.Currency,

          before: this.$data.BeforePrice,
          after: this.$data.AfterPrice,

          link: this.$data.Link,
          desc: this.$data.Description,

          designer_point: this.$data.DesignerPoint,
          price_point: this.$data.PricePoint,
          daily_point: this.$data.DailyPoint,
          essential_point: this.$data.EssentialPoint

        }
      },
    },

    mounted(){
      this.getDesignerList().then(()=>{
        this.getFeed(this.$route.params.seq)
      });      
    },

    methods: {
      //디자이너리스트가져오기
      getDesignerList() {
        return axios.get(`/api/designer`).then((res)=>{
          if(res.data.result){            
            if(res.data.list.length > 0){
              this.$data.Designers = res.data.list
            }
          }
        }).catch((ex)=>{
          console.log(ex)
        })
      },

      //피드정보가져오기
      getFeed(seq) {

        axios.get(`/api/feed/${seq}`).then((res)=>{
          if(res.data.result){

            const data = res.data.list[0];
            const imgs = res.data.imgs;
            console.log(imgs)

            this.$data.images = imgs;

            this.$data.New = data.newflag;
            this.$data.Hot = data.hot;
            this.$data.Recommend = data.recommend;

            this.$data.Designer = this.$data.Designers.find(o => o.seq === data.designer_seq).name,

            this.$data.Name = data.name;

            this.$data.Currency = data.currency;
            this.$data.BeforePrice = data.before;
            this.$data.AfterPrice = data.after;

            this.$data.Link = data.link;
            this.$data.Desc = data.desc;

            this.$data.Description = data.desc;
            this.$data.Homepage = data.homepage;
            this.$data.preview = data.logo;

            this.$data.DesignerPoint = data.designer_point
            this.$data.PricePoint = data.price_point
            this.$data.DailyPoint = data.daily_point
            this.$data.EssentialPoint = data.essential_point

          }
        }).catch((ex)=>{
          console.log(ex)
        })

      },

      cancle () {
        this.$router.push({ path: `/feed` })
      },

      //벨리데이션
      resetForm () {
        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },      
      submit () {

        this.formHasErrors = false
        var BreakException = {};

        try{
          Object.keys(this.form).forEach(f => {

            if(f==='newflag'|| f==='hot'|| f ==='recommend') {
              //pass
            }else{
              if (!this.form[f]) {
                this.formHasErrors = true
                alert("항목을 확인해주세요.")
                throw BreakException;
              }
            }

          })
        }catch(e){
          if (e !== BreakException) throw e;
        }

        if(!this.formHasErrors){
          this.modeFeed(this.$route.params.seq)
        }

      },

      //피드등록
      modeFeed (seq) {

        // 폼 데이터 객체 생성
        let params = new FormData();
        
        Object.keys(this.form).forEach(f => {
          params.append(f, this.form[f]);
        })

        axios.put(`/api/feed/${seq}`, params).then((res)=>{
          console.log(res)
        }).catch((ex)=>{
          console.log(ex)
        })
      }

    },

    data: () => ({
      New: false,
      Hot: false,
      Recommend: false,
      Designer: null,
      Designers: [],
      Name: null,
      Currency: '$',
      BeforePrice: 0,
      AfterPrice: 0,
      Link: null,
      Description: null,
      DesignerPoint: 0,
      PricePoint: 0,
      DailyPoint: 0,
      EssentialPoint: 0,

      images: [],

      currencys: ['$', '€', '£', '₩'],
     
      formHasErrors: false,
    }),

  }
</script>
