<template>
  <v-content>
    <v-responsive style="height:100px;">
      <v-layout row align-start>
        <v-flex text-xs-left>
          <h3 class="headline font-weight-medium" style="color:#5C5C5C;">Wildcard Participants</h3>
        </v-flex>
      </v-layout>
    </v-responsive>
    <v-divider/>
    <v-layout row justify-end>
      <v-btn color="green" @click="csvExport(csvData)">Export all to CSV</v-btn>
    </v-layout>
    <v-layout row wrap>
      <v-hover v-slot:default="{ hover }" v-for="wildcard in wildcards" :key="wildcard._id">
        <v-card
          width="300px"
          :elevation="hover ? 12 : 2"
          style="margin-top:2%; margin-right:2%;"
        >
              <v-card-media
                contain
                height="150"
                width="auto"
              :src="wildcard.cloudImage"
              >
              </v-card-media>
          <v-card-title primary-title>

            <div
              class="headline mb-3 green--text text--darken-4"
            >{{ wildcard.surname }} , {{ wildcard.names }}</div>
          </v-card-title>
          <v-card-text>
            <div class="subtitle text-uppercase">{{ wildcard.noc }}</div>
            <div style="margin-top:5%">{{ wildcard.email }}</div>
          </v-card-text>
           <v-divider/>
          <v-card-text>
            <v-btn outline small color="red" dark @click.prevent="deleteForm(wildcard._id)">Delete </v-btn>
          </v-card-text>

        </v-card>
      </v-hover>
    </v-layout>
    <v-layout row wrap></v-layout>
  </v-content>
</template>

<script>
import axios from 'axios'
export default {
  name: 'dash_company',
  data() {
    return {
      wildcards: {},
      errors: ''
    }
  },
  computed: {
    csvData() {
      return this.wildcards.map(item => ({
        ...item,
        'type of form': 'wildcard'
      }))
    }
  },
  methods: {
    csvExport(arrData) {
      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        Object.keys(arrData[0]).join(';'),
        ...arrData.map(item => Object.values(item).join(';'))
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const data = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', 'company.csv')
      link.click()
    },

    deleteForm(id) {
      let uri = `https://www.purplemovi.gq/wildcard/delete/${id}`
      axios.delete(uri).then(response => {
        this.wildcards.splice(this.wildcards.indexOf(id),1)
      })
    }
  },

  created() {
    axios.get('https://www.purplemovi.gq/wildcard/')
      .then(res => {
        this.wildcards = res.data
      })
      .catch(err => {
        this.errors.push(err)
      })
  }
}
</script>

<style>
.input{
 border: 1px solid rgb(219, 219, 219);
 margin-top: 2%;
 height:38px;
 width: 250px;
 border-radius: 10px;
 padding: 10px;
}
.input:hover .input:focus{
  outline: none;
}
</style>
