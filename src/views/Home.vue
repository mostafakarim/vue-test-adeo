<template>
  <div>
    <form
      action=""
      @submit="searchArticles"
      class="bg-white shadow-md rounded-md w-fit mx-auto"
    >
      <input
        type="text"
        v-model="articleNumber"
        name="numero"
        placeholder="Numéro de l'article"
        class="p-4"
        id=""
      />
      <button
        :class="[
          { 'cursor-not-allowed': !articleNumber },
          'mr-2',
        ]"
        :disabled="!articleNumber"
        type="submit"
      >
        Rechercher
      </button>
    </form>
    <div
      v-if="isResultEmpty"
      class="bg-white shadow-md rounded-md mt-10 p-5 text-left"
    >
      <div
        class="justify-center flex flex-row items-center"
      >
        <Icon
          icon="quill:user-sad"
          class="size-10 text-yellow-500 mr-3"
        />
        <div class="text-[20px]">Pas de résultats</div>
      </div>
    </div>
    <div
      v-if="articles.length > 0"
      class="bg-white shadow-md rounded-md mt-10 p-5 text-left"
    >
      <h2 class="text-[30px] mb-5">
        Résultats des articles:
      </h2>
      <div
        v-for="article in mainStore.articles"
        class="odd:bg-gray-100/50 hover:bg-gray-200"
      >
        <router-link :to="`./article/${article.id}`">
          <div class="flex p-3">
            <Icon
              class="size-16 pr-3"
              icon="mdi:child-toy"
            />
            <div class="text-left text-black pt-2">
              <span>Titre: {{ article.label }}</span
              ><br />
              <b>#{{ article.numero }}</b>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMainStore } from '@/stores'
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'

const mainStore = useMainStore()
const articleNumber = defineModel()
const articles = computed(() => mainStore.articles)
const isResultEmpty = ref(false)

const searchArticles = async (e) => {
  e.preventDefault()

  await mainStore.searchArticles(
    String(articleNumber.value),
  )
  isResultEmpty.value = !(articles.value.length > 0)
}
</script>
