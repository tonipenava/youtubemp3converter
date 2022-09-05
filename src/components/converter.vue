<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12">
        <h4 class="text-center">
          Enter the URL of the video you want to convert to mp3
        </h4>
      </v-col>
      <v-col cols="6" md="4">
        <h2>Enter youtube URL</h2>
        <v-text-field v-model="url" outlined dense label="Search..."></v-text-field>
        <v-btn @click="search">Submit</v-btn>

        <v-divider class="mt-5 mb-5"></v-divider>

        <v-skeleton-loader v-show="skeleton" :types="types" type="youtube" v-model="skeleton"></v-skeleton-loader>

        <v-card v-show="card" elevation="0">
          <v-row>
            <v-col cols="12" sm="6">
              <v-img style="margin: 0; display: inline-block" width="120"
                     :src="thumbnail">
              </v-img>
            </v-col>
            <v-col style="padding: 0" cols="12" sm="6">
              <h4 style="display: inline-block">{{ data.title }}</h4>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6">
              <v-btn :href="data.link" color="green" style="color: white" rounded>Download</v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

        </v-card>
      </v-col>

    </v-row>

  </v-container>

</template>

<script>

import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "converter",

  data: () => ({
    url: "",
    skeleton: false,
    card: false,
    data: [],
    thumbnail: "",
    mp3_link: "",
    types: {
      youtube: 'card, actions',
    },
    id: "",
  }),

  methods: {

    youtube_parser(url) {
      let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      let match = url.match(regExp);
      return (match&&match[7].length===11)? match[7] : false;
    },

    async youtubeAPI(id) {
      const options = {
        method: 'GET',
        url: 'https://youtube138.p.rapidapi.com/video/details/',
        params: {id: id, hl: 'en', gl: 'US'},
        headers: {
          'X-RapidAPI-Key': '7cfcf9a02emshf2bb227dbff7966p10630cjsnec10b86140de',
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
      };

      let thumbnail = "";
      await axios.request(options).then(function (response) {
        console.log("youtube api: ", response.data);
        thumbnail = response.data.thumbnails[response.data.thumbnails.length -1].url;
      }).catch(function (error) {
        console.error(error);
      });
      this.thumbnail = thumbnail;
    },

    async search() {

      // const options = {
      //   url: 'https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess',
      //   params: {
      //     url: this.url,
      //     format: 'mp3',
      //     responseFormat: 'json',
      //     lang: 'en'
      //   },
      //   headers: {
      //     'X-RapidAPI-Key': 'dcdbe67010msh679513e3f177285p1e845cjsn5e8afce90296',
      //     'X-RapidAPI-Host': 't-one-youtube-converter.p.rapidapi.com'
      //   }
      // };

      this.id = this.youtube_parser(this.url);
      await this.youtubeAPI(this.id);
      const options = {
        method: 'GET',
        url: 'https://youtube-mp36.p.rapidapi.com/dl',
        params: {id: this.id},
        headers: {
          'X-RapidAPI-Key': '7cfcf9a02emshf2bb227dbff7966p10630cjsnec10b86140de',
          'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
      };

      let data = [];
      let skeleton = true;
      // let thumbnail = "";
      this.skeleton = true;
      await axios.request(options).then(function (response) {
        data = response.data;
        skeleton = false;
        // thumbnail = response.data['YoutubeAPI']['thumbUrl'];
      }).catch(function (error) {
        console.error(error);
        skeleton = false;
      });

      this.data = data;
      this.skeleton = skeleton;
      this.card = true;
      // this.thumbnail = thumbnail;
      console.log("data", this.data);
    },
  },
}
</script>

<style scoped>

</style>