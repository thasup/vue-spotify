<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload-file ref="upload" :add-song="addSong"></upload-file>
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t("manage.my_songs") }}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item v-for="(song, index) in songs"
              :key="song.docId" :song="song" :update-song="updateSong"
              :index="index" :remove-song="removeSong" :update-unsaved-flag="updateUnsavedFlag">
            </composition-item>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from '@/store';
import UploadFile from '@/components/UploadFile.vue';
import CompositionItem from '@/components/CompositionItem.vue';
import { songsCollection, auth } from '@/includes/firebase';

export default {
  name: 'ManageView',
  components: { UploadFile, CompositionItem },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();

    snapshot.forEach(this.addSong);
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.userLoggedIn) {
      next();
    } else {
      next({ name: 'home' });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      this.$refs.upload.cancelUploads();
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
      this.$refs.upload.cancelUploads();
      next(leave);
    }
  },
  methods: {
    updateSong(index, values) {
      this.songs[index].modified_name = values.modified_name;
      this.songs[index].genre = values.genre;
    },
    removeSong(index) {
      this.songs.splice(index, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docId: document.id,
      };

      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
};
</script>
