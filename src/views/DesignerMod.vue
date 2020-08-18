<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card ref="form">
              <v-card-text>

                <!--로고-->
                <v-row align="center" justify="center">
                  <v-col cols="12">
                    <header>Logo</header>
                  </v-col>
                  <v-col cols="3" >
                    <v-img
                      :src="preview"
                      max-width="80"
                      max-height="80"
                    >
                    </v-img>
                  </v-col>
                  <v-col cols="9">
                      <v-file-input
                        :rules="[value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!']"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="로고를 등록하세요."
                        prepend-icon="mdi-camera"
                        label="Image"
                        @change="onFileChange"
                      ></v-file-input>
                  </v-col>
                </v-row>

                
                <!--디자이너-->
                <v-row class="mt-5">
                  <v-col cols="12">
                    <header>Designer</header>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      ref="Name"
                      v-model="Name"
                      :rules="[() => !!Name || 'This field is required']"
                      label="Name"
                      placeholder="Acne Studio"
                      required
                    ></v-text-field>
                    <v-text-field
                      ref="Korean"
                      v-model="Korean"
                      :rules="[() => !!Korean || 'This field is required']"
                      label="Korean"
                      placeholder="아크네 스튜디오"
                      required
                    ></v-text-field>
                    <v-textarea
                      ref="Tags"
                      v-model="Tags"
                      :rules="[() => !!Tags || 'This field is required',]"
                      label="Tags"
                      placeholder="태그를 '|' 로 구분해주세요."
                      required
                    ></v-textarea>
                    <v-textarea
                      ref="Description"
                      v-model="Description"
                      :rules="[() => !!Description || 'This field is required']"
                      label="Description"
                      placeholder="디자이너 설명을 작성해주세요."
                      required
                    ></v-textarea>
                    <v-text-field
                      ref="Homepage"
                      v-model="Homepage"
                      :rules="[() => !!Homepage || 'This field is required']"
                      label="Homepage"
                      placeholder="https://beggarclothes.io"
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
                <v-btn color="primary" text @click="fix">fix</v-btn>
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
    name: 'Designer',

    computed: {
      form () {
        return {
          fileAttach: this.$data.Logo,
          name: this.$data.Name,
          korean: this.$data.Korean,
          tagstring: this.$data.Tags,
          desc: this.$data.Description,
          homepage: this.$data.Homepage
        }
      },
    },

    mounted(){
      this.getDesigner(this.$route.params.seq)
    },

    methods: {
      //파일업로드
      onFileChange(file) {
        if(typeof file === 'undefined'){
          this.$data.Logo = null;
          this.preview = null;
        }else{
           this.$data.Logo = file
           this.preview = URL.createObjectURL(file);           
        }
      },

      //벨리데이션
      resetForm () {

        this.getDesigner(this.$route.params.seq)

      },
      fix () {

        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {
          if(f !== 'fileAttach'){
            if (!this.form[f]) {
              this.formHasErrors = true
              alert("항목을 확인해주세요.")
            }
          }
        })

        if(!this.formHasErrors){
          this.modDesigner(this.$route.params.seq)
        }

      },

      cancle () {
        this.$router.push({ path: `/designer` })
      },

      getDesigner(seq) {

        axios.get(`/api/designer/${seq}`).then((res)=>{
          if(res.data.result){

            const data = res.data.list[0];
            const tags = res.data.tags;

            let tagstring = '';
            tags.forEach(el => {
              tagstring += el.tag + '|' 
            });
            tagstring = tagstring.substring(0, tagstring.length-1);

            this.$data.Name = data.name;
            this.$data.Korean = data.korean;
            this.$data.Tags = tagstring;
            this.$data.Description = data.desc;
            this.$data.Homepage = data.homepage;
            this.$data.preview = data.logo;

          }
        }).catch((ex)=>{
          console.log(ex)
        })

      },

      //디자이너등록
      modDesigner(seq) {

        // 폼 데이터 객체 생성
        let params = new FormData();

        Object.keys(this.form).forEach(f => {
          params.append(f, this.form[f]);
        })

        axios.put(`/api/designer/${seq}`, params).then((res)=>{
          if(res.data.result){
            Object.keys(this.form).forEach(f => {
              this.$refs[f].reset()
            })
          }
        }).catch((ex)=>{
          console.log(ex)
        })

      }

    },

    data: () => ({    

      Name: null,
      Korean: null,
      Tags: null,
      Description: null,
      Logo: null,
      Homepage: null,

      preview: null,
      formHasErrors: false

    }),

  }
</script>
