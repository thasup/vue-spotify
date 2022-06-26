<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus et dolor mollis, congue augue non, venenatis elit.
            Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
            sapien. Duis sed magna pulvinar, fringilla lorem eget,
            ullamcorper urna.
          </p>
        </div>
      </div>

      <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="assets/img/introduction-music.png" alt="intro picture" />
    </section>

    <div class="test-box">
      <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
      <button class="test-link" @click="handleDetect">Detect</button>

      <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
      <button class="test-link" @click="handleOriginal">Original</button>

      <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
      <button class="test-link" @click="handleLink">OPEN</button>

      <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
      <button class="test-link" @click="handleLink2">BLANK</button>

      <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
      <button class="test-link" @click="handleLink3">NON-FOCUS</button>

      <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
      <button class="test-link" @click="handleLink4">location</button>
    </div>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <song-item v-for="song in songs" :key="song.docId" :song="song"></song-item>
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from '@/includes/firebase';
import SongItem from '@/components/SongItem.vue';

export default {
  name: 'HomeView',
  components: {
    SongItem,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 8,
      pendingRequest: false,
    };
  },
  async created() {
    this.getSongs();

    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;
      let snapshots;

      if (this.songs.length) {
        const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docId).get();
        snapshots = await songsCollection.orderBy('modified_name').startAfter(lastDoc).limit(this.maxPerPage).get();
      } else {
        snapshots = await songsCollection.orderBy('modified_name').limit(this.maxPerPage).get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docId: document.id,
          ...document.data(),
        });
      });

      this.pendingRequest = false;
    },

    handleDetect() {
      const link = 'https://storage.googleapis.com/chanintr-media-staging/dev/products/sku_spec_sheet_1656275929.pdf';

      console.log(navigator.userAgent);
      if (link) {
        let win;
        if (navigator.userAgent.indexOf('Chrome') !== -1) {
          console.log('Google Chrome');
          win = window.open(link, '_blank');
        } else if (navigator.userAgent.indexOf('Safari') !== -1) {
          console.log('Safari');
          win = window.open();
          win.location.href = link;
        } else {
          console.log('ELSE!!!');
          win = window.open(link, '_blank');
        }

        if (win) { // Prevent Browser error
          win.focus();
        }
      }
    },

    handleOriginal() {
      const link = 'https://storage.googleapis.com/chanintr-media-staging/dev/products/sku_spec_sheet_1656275929.pdf';

      if (link) {
        const win = window.open(link, '_blank');

        if (win) { // Prevent Browser error
          win.focus();
        }
      }
    },

    handleLink() {
      const link = 'https://storage.googleapis.com/chanintr-media-staging/production/products/sku_spec_sheet_1656263279.pdf';
      if (link) {
        // Open new tab and focus that tab
        const win = window.open();
        console.log(win);
        win.location.href = link;

        if (win) { // Prevent Browser error
          win.focus();
        }
      }
    },

    handleLink2() {
      const link = 'https://storage.googleapis.com/chanintr-media-staging/production/products/sku_spec_sheet_1656275531.pdf';
      if (link) {
        // Open new tab and focus that tab
        const win = window.open('about:blank', '_blank');
        console.log(win);
        win.location.href = link;

        if (win) { // Prevent Browser error
          win.focus();
        }
      }
    },

    handleLink3() {
      const link = 'https://storage.googleapis.com/chanintr-media-staging/dev/products/sku_spec_sheet_1656277318.pdf';
      if (link) {
        // Open new tab and focus that tab
        const win = window.open();
        console.log(win);
        win.location.href = link;
      }
    },

    handleLink4() {
      const link = 'https://storage.googleapis.com/chanintr-media-staging/dev/products/sku_spec_sheet_1656278681.pdf';
      if (link) {
        // Open new tab and focus that tab
        const win = window.open(link, '_blank');
        // eslint-disable-next-line no-unused-expressions
        win.location;

        if (win) { // Prevent Browser error
          win.focus();
        }
      }
    },
  },
};
</script>

<style scoped>
.test-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.test-link {
  padding: 5px 15px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  text-transform: uppercase;
}
</style>
