<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card ref="form">
              <v-card-text>

                <!--이미지-->
                <v-row>
                  <v-col cols="12">
                    <header>Image</header>
                  </v-col>
                  <v-col cols="12">
                    <vue-upload-multiple-image
                    @upload-success="uploadImageSuccess"
                    @before-remove="beforeRemove"
                    @edit-image="editImage"
                    :data-images="images"
                    ></vue-upload-multiple-image>
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
                  <v-col cols="6">
                    <v-text-field
                      ref="BeforePrice"
                      v-model="BeforePrice"
                      :rules="[() => !!BeforePrice || 'This field is required']"
                      label="Before Price"
                      placeholder="1,000"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
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
                <v-btn text>Cancel</v-btn>
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
  import VueUploadMultipleImage from 'vue-upload-multiple-image'
  import axios from 'axios'

  export default {
    name: 'Feed',

    components: {
      VueUploadMultipleImage,
    },

    computed: {
      form () {
        return {

          newflag: this.$data.New,
          hot: this.$data.Hot,
          recommend: this.$data.Recommend,
          designer_seq: this.$data.Designer,
        
          name: this.$data.Name,
          before: this.$data.BeforePrice,
          after: this.$data.AfterPrice,

          link: this.$data.Link,
          desc: this.$data.Description,

          designer_point: this.$data.DesignerPoint,
          price_point: this.$data.PricePoint,
          daily_point: this.$data.DailyPoint,
          essential_point: this.$data.EssentialPoint

          //files: this.$data.UploadFileList

        }
      },
    },

    mounted(){
      this.getDesignerList();
    },

    methods: {
      //디자이너리스트가져오기
      getDesignerList() {
        axios.get(`/api/designer`).then((res)=>{
          if(res.data.result){
            
            if(res.data.list.length > 0){
              let designers = []
              res.data.list.forEach((e)=>{
                designers.push(e.name)
              })
              this.$data.Designers = designers
            }
          }
        }).catch((ex)=>{
          console.log(ex)
        })
      },

      //이미지업로드
      uploadImageSuccess(formData, index, fileList) {
        this.$data.UploadFileList = fileList;
      },
      beforeRemove (index, done, fileList) {
        let r = confirm("상품 이미지를 삭제하시겠습니까?")
        if (r === true) {
          this.$data.UploadFileList = fileList;
          done()
        }
      },
      editImage (formData, index, fileList) {
        this.$data.UploadFileList = fileList;
      },

      //벨리데이션
      resetForm () {
        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },      
      submit () {
        if(this.$data.UploadFileList.length < 2)
        {
          alert("상품 이미지를 2개 이상 등록해주세요.")
          return
        }

        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {

          console.log(this.form[f])
          if (!this.form[f]) {
            this.formHasErrors = true
            this.$refs[f].validate(true)
          }

        })

        if(!this.formHasErrors){
          this.uploadFeed()
        }

      },

      //피드등록
      uploadFeed () {
        function DataURIToBlob(dataURI) {
          const splitDataURI = dataURI.split(',')
          const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
          const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

          const ia = new Uint8Array(byteString.length)
          for (let i = 0; i < byteString.length; i++)
              ia[i] = byteString.charCodeAt(i)

          return new Blob([ia], { type: mimeString })
        }

        // 폼 데이터 객체 생성
        let params = new FormData();
        
        for(var obj of this.$data.UploadFileList){          
          let file = DataURIToBlob(obj.path)
          console.log(file)
          params.append('files', file, obj.name)
        }

        Object.keys(this.form).forEach(f => {
          params.append(f, this.form[f]);
        })

        axios.post('/api/feed', params).then((res)=>{
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
      BeforePrice: 0,
      AfterPrice: 0,
      Link: null,
      Description: null,
      DesignerPoint: 0,
      PricePoint: 0,
      DailyPoint: 0,
      EssentialPoint: 0,

      UploadFileList: [],
      images: [],
     
      formHasErrors: false,
    }),

  }
</script>
