<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!isShowForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong">
        <i class="fa fa-times"></i>
      </button>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      @click.prevent="isShowForm = !isShowForm">
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="isShowForm">
      <div v-if="showAlert" :class="alertVariant"
        class="text-white text-center font-bold p-4 mb-4">
        {{ alertMessage }}
      </div>
      <vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ song.modified_name }}</label>
          <vee-field name="modified_name" type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
              transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title" @input="updateUnsavedFlag(true)"/>
            <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ song.genre }}</label>
          <vee-field name="genre" type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
              transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre" @input="updateUnsavedFlag(true)"/>
            <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="isSubmission">
          {{ $t("manage.upload_file.submit") }}
        </button>
        <button type="button" class="ml-2 py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="isSubmission" @click.prevent="showForm = false">
          {{ $t("manage.upload_file.back") }}
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase';

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      isShowForm: false,
      schema: {
        modified_name: 'required',
        genre: 'alpha_spaces',
      },
      isSubmission: false,
      showAlert: false,
      alertVariant: 'bg-red-500',
      alertMessage: 'Please wait, Updating song info.',
    };
  },
  methods: {
    async edit(values) {
      this.isSubmission = true;
      this.showAlert = true;
      this.alertVariant = 'bg-blue-500';
      this.alertMessage = 'Please wait, Updating song info.';

      try {
        await songsCollection.doc(this.song.docId).update(values);
      } catch (error) {
        this.isSubmission = false;
        this.alertVariant = 'bg-red-500';
        this.alertMessage = 'Something went wrong! Try again later.';
      }

      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);

      this.isSubmission = true;
      this.alertVariant = 'bg-green-500';
      this.alertMessage = 'Success!';
    },
    async deleteSong() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);

      await songRef.delete();

      await songsCollection.doc(this.song.docId).delete();

      this.removeSong(this.index);
    },
  },
};
</script>
