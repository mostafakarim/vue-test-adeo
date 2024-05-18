<template>
  <div
    v-show="isArticleLoaded"
    class="bg-white mx-auto rounded-md shadow-md p-5 container w-full"
  >
    <router-link to="/" class="block text-left mb-5">
      Précédent
    </router-link>
    <div class="flex max-sm:flex-col" v-if="article">
      <img
        class="size-60 mr-3 max-sm:size-full"
        :src="String(article.photo)"
        :alt="`Photo de l'article: ${article.label}`"
      />
      <p class="text-left">
        <b class="text-[25px]">{{ article.label }}</b
        ><br />
        <b>Numéro: </b> {{ article.numero }} <br />
        <b>Rayon: </b> {{ article.Rayon }} <br />
      </p>
    </div>
    <div class="container p-2 mx-auto rounded-md sm:p-4">
      <Periods :id="id" />
      <Calendar />
    </div>
  </div>
  <div
    v-show="!isArticleLoaded"
    class="text-bold text-[20px]"
  >
    Chargement de l'article ...
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useMainStore } from '@/stores/index.ts'
import Periods from '@/components/Periods.vue'
import Calendar from '@/components/Calendar.vue'
import { computed, onBeforeMount, ref } from 'vue'

const route = useRoute()
const id = ref()
const mainStore = useMainStore()
const article = computed(() => mainStore.article)
const isArticleLoaded = ref(false)

onBeforeMount(async () => {
  if (route.params.query) {
    id.value = Number(route.params.query)
    await mainStore.getArticleById(id.value)
    isArticleLoaded.value = true
  }
})
</script>
