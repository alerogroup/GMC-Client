<template>
<v-content>
  <v-flex fluid>
  <v-toolbar height="95">
    <v-toolbar-title >
      <img src="../../assets/imgs/logo.png" alt="GMClogo" height="95" style="margin-left:8%;">
    </v-toolbar-title>
      <v-spacer />
      <v-btn to="/register" flat large color="#0074C1">Back</v-btn>
    </v-toolbar>
  </v-flex>
      <v-jumbotron color="#C1ECF9" style="height:300px;">
       <v-container fill-height>
          <v-layout align-center>
           <v-flex text-xs-left>
              <h3 class="display-1 font-weight-medium" style="color:#5C5C5C;">Company Participants</h3>
           </v-flex>
          </v-layout>
      </v-container>
      </v-jumbotron>

    <v-content style="margin-bottom:3%;">
    <v-flex  xs12 sm12 md12 class="justify-center" style="margin-top:5%;">
      <!-- This is the company form -->
      <form ref="form"  @submit.prevent="submitForm" enctype="multipart/form-data">
        <v-layout row wrap justify-center>
          <v-flex xs12 sm4 md3 style="margin-left: 0.8%;">
              <v-text-field
                v-model="form.surname"
                :rules="rules.surname"
                label="Surname"
                required
                id="surname"
                ></v-text-field>
          </v-flex>
           <v-flex xs12 sm4 md3 style="margin-left: 0.8%;">
              <v-text-field
                v-model="form.names"
                name="names"
                :rules="rules.names"
                label="Given Names*"
                 required
                id="givenNames"
                ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout justify-center>
           <v-flex xs12 sm8 md6 class="justify-center">
            <v-text-field
              v-model="form.dob"
              :rules="rules.dob"
              color="primary"
              hint="dd/mm/yyyy"
              required
              label="Date of Birth*">
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout justify-center>
           <v-flex xs12 sm4 md3 style="margin-left: 0.8%;">
            <v-text-field
              v-model="form.noc"
              :rules="rules.noc"
              color="primary"
              hint="'Company name'.ltd"
              label="Name of your company*"
               required>
            ></v-text-field>
           </v-flex>
            <v-flex xs12 sm4 md3 style="margin-left: 0.8%;">
            <v-text-field
              v-model="form.jobPosition"
              :rules="rules.jobPosition"
              color="primary"
              label="Job title*"
              required
              >
            ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout justify-center style="margin-top:3%;">
           <v-flex xs12 sm8 md6 class="justify-center">
            <v-text-field
              v-model="form.email"
              :rules="rules.email"
              color="primary"
              label="Your email*"
              type="email"
              required
              >
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout justify-center>
           <v-flex xs12 sm8 md6 class="justify-center">
            <v-text-field
              v-model="form.phone"
              :rules="rules.phone"
              color="primary"
              label="Telephone number*"
              required
              >
            ></v-text-field>
          </v-flex>
        </v-layout>

         <v-layout justify-center >
           <v-flex xs12 sm8 md6 class="justify-center">
           <v-card class="elevation-0 transparent" v-if="!image">
               <v-card-title class="subheading card-main">
                  Upload your photo
               </v-card-title>
               <img
                 contain
                :src="imgUrl" height="150" v-if="imgUrl" />
               <v-text-field
                  label="Select Image"
                  v-model="imgName"
                  prepend-icon='attach_file'
                  hint="Please upload a file thats less than 4MB"
                  @click='imgFile'>
                </v-text-field>
                  <input
					        	type="file"
						        style="display: none"
						        ref="image"
						        accept="image/*"
						        @change="onFilePicked">
             </v-card>

           <v-card class="elevation-0 transparent">
               <v-card-title class="subheading card-main">
                  Upload your CV
               </v-card-title>
               <v-text-field
                  label="Select CV doc"
                  v-model="cvName"
                  prepend-icon='attach_file'
                  @click='cvFile' >
                </v-text-field>
                  <input
					        	type="file"
						        style="display: none"
						        ref="cv"
						        accept="application/*"
						        @change="onFileChange">
             </v-card>
          </v-flex>
        </v-layout>

        <v-layout justify-center style="margin-top:3%;">
           <v-flex xs12 sm8 md6 class="justify-center">
            <v-textarea
              v-model="form.list"
              color="primary"
              label="Names and email of your accountability partner (one should be your current employer)*"
              hint="John Doe/johndoe@example.com, Jane Doe/janedoe123@example.com,"
              >
            ></v-textarea>
          </v-flex>
        </v-layout>

        <v-layout justify-center style="margin-top:3%;">
           <v-flex xs12 sm8 md6 class="justify-center">
            <v-textarea
              v-model="form.desc"
              color="primary"
              label="What are your expectations for Great Minds Challenge?"
              >
            ></v-textarea>
          </v-flex>
        </v-layout>

        <v-layout justify-center style="margin-top:3%;">
           <v-flex xs12 sm8 md6 class="justify-center">
            <v-checkbox
              v-model="form.terms"
              :rules="[v => !!v || 'You must agree to continue!']"
              color="green"
            >
              <template v-slot:label>
                <div @click.stop="">
                  Do you accept the
                  <a href="javascript:;" @click.stop="terms = true">Terms</a>?
                </div>
              </template>
            </v-checkbox>
          </v-flex>
        </v-layout>

        <v-layout justify-center style="margin-top:3%;">
          <v-flex xs12 sm8 md6 class="justify-center">
            <v-card-actions>
               <button flat @click="resetForm()">Cancel</button>
               <v-spacer></v-spacer>
                <nuxt-link to="/welcome" style="text-decoration:none;">
                <v-btn
                :loading="loading"
                :disabled="loading"
                flat
                color="primary"
                @click="submitForm();loader = 'loading'">
                  Apply
                </v-btn>
                </nuxt-link>

            </v-card-actions>
          </v-flex>
        </v-layout>
        <p v-if="error" style="color:red;"><strong>Error {{ error.status }}</strong><br>{{ error.data }}</p>
      </form>
    </v-flex>
  </v-content>

  <!--These are the models for the application terms-->
<v-dialog v-model="terms" width="70%">
    <v-card>
      <v-card-title class="title"> Terms</v-card-title>
      <v-card-text>
        {{ termsContent }}
      </v-card-text>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            color="#0074C1"
            @click="terms = false"
          >Ok</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>

</v-content>
</template>

<script>
import axios from 'axios';


  export default{
    asyncData () {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve({})
      }, 1000)
    })
  },
    head () {
      return {
        title: "Company application form • Great Minds Challenge Nairobi",
      }
  },
  data () {
  return {
    image:'',
    form: {
      surname: '',
      names: '',
      dob: '',
      noc: '',
      jobPosition:'',
      email:'',
      phone: '',
      list: '',
      desc:'',
      cloudImage: '',
      cloudFile: '',
      terms: false,
    },
        rules: {
          surname: [val => (val || '').length > 0 || 'This field is required'],
          names: [val => (val || '').length > 0 || 'This field is required'],
          dob: [val => (val || '').length > 0 || 'This field is required'],
          noc: [val => (val || '').length > 0 || 'This field is required'],
          jobPosition: [val => (val || '').length > 0 || 'This field is required'],
        },

        termsContent: `Esteemed Great Mind, by submitting this application form, you unconditionally and without any reservation agree to abide by all Great Minds Challenge TCs. You faithfully declare that all the information provided above is true to the best of your knowledge. You agree not to hold us liable for any accidents or incidents when travelling to and from Diani, during meet and greet and during your stay on the 3 exclusive days. You agree to fully take responsibility of your actions and indemnify Great Minds Challenge from any accidents or incidents. You declare to freely attend in good faith and be committed during the 2 months engagement with GMC. We commit to endeavour to offer you a world class experience observing international best practice standards.
        `,
        terms:false,
        loading: false,
        loader: null,
        error:'',
        valid: true,
        imgUrl: '',
        imgName:'',
        cvUrl: '',
        cvName:'',


     }
  },
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
  },
methods: {
 imgFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imgName = files[0].name;
        if (this.imgName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imgUrl = fr.result;
          this.cloudImage = files[0];
        });
      } else {
        console.log("not posted");
      }
    },

    cvFile() {
      this.$refs.cv.click();
    },
    onFileChange(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.cvName = files[0].name;
        if (this.cvName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.cvUrl = fr.result;
          this.cloudFile = files[0];
        });
      } else {
        console.log("not posted");
      }
    },
  submitForm() {

      let formData = new FormData()
      formData.append("image", this.cloudImage)
      formData.append("doc", this.cloudFile)

      formData.append("surname", this.form.surname)
      formData.append("names", this.form.names)
      formData.append("email", this.form.email)

      formData.append("dob", this.form.dob)
      formData.append("noc", this.form.noc)
      formData.append("job position", this.form.jobPosition)

      formData.append("phone", this.form.phone)
      formData.append("list", this.form.list)
      formData.append("desc", this.form.desc)

      axios.post('https://www.purplemovi.gq/company/postcompany/',formData).then(res =>{
        this.$router.push('/welcome')
        console.log('uploaded')
      }).catch(err => {
            this.errors.push(error);
            console.log('error')
      })

      },
    resetForm() {
      this.$refs.form.resetFields()
      this.terms = false
      this.error = null
    }
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
