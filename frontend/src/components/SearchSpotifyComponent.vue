<script setup lang="ts">
import {ref} from "vue"
import { useSpotifyStore } from "@/stores/spotify";
const  spotifyStore = useSpotifyStore()

const emit = defineEmits<{
  (e: "result", searchString: string): void;
}>();

const speechRecognitionSupported = ref<boolean>(true);
const {webkitSpeechRecognition, SpeechRecognition} = (window as any)

const recognition = ref();
const result = ref<string>("");
let listening = ref<boolean>(false);

if ("SpeechRecognition" in window) {
  recognition.value = new SpeechRecognition();
} else if ("webkitSpeechRecognition" in window) {
  recognition.value = new webkitSpeechRecognition();
} else {
  speechRecognitionSupported.value = false;
}

const startRecognition = () => {
  try {
    recognition.value.start();
    listening.value = true;
  } catch (e) {
    console.log("Could not start recognition", e);
  }
};

const stopRecognition = () => {
  try {
    recognition.value.stop();
    listening.value = false;
  } catch (e) {
    console.log("Could not stop recognition", e);
  }
};

const emitSearch = () => {
  emit("result", result.value);
  spotifyStore.$patch({
    searchString: result.value,
  });
};

if (recognition.value) {
  recognition.value.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    result.value = transcript;
    listening.value = false;
    emitSearch();
  };

  recognition.value.onaudioend = () => {
    listening.value = false;
  };
}
</script>

<template>
  <div id="speech-recognition">
    <h3>Search</h3>
    <div class="supported">
      <div class="input-group mb-3">
        <div class="input-group mb-3">
          <input type="text" name="search-input" id="search-input" class="form-control" v-model="result" />
          <span
            class="input-group-text"
            v-if="speechRecognitionSupported"
            @click="listening ? stopRecognition() : startRecognition()"
          >
            {{ listening ? "Cancel" : "Voice Search" }}
          </span>
          <span class="input-group-text" v-else @click="emitSearch">
            Search
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

#speech-recognition {
  h3 {
    color: $spotify-green;
  }

  .input-group {
    input {
    }

    .input-group-text {
      cursor: pointer;
    }
  }
}
</style>