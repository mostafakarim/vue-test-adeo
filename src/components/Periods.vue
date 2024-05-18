<template>
  <div>
    <h2 class="mb-3 text-2xl font-semibold leading-tight">
      Périodes
    </h2>
    <div class="overflow-x-auto">
      <table class="min-w-full text-xs">
        <thead class="rounded-t-lg dark:bg-gray-300">
          <tr class="text-right">
            <th title="Type" class="p-3">Type</th>
            <th title="Date de début" class="p-3">
              Date de début
            </th>
            <th title="Date de fin" class="p-3">
              Date de fin
            </th>
            <th title="Score" class="p-3">Score</th>
            <th title="Editier" class="p-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100"
            v-for="period in article.periods"
          >
            <template
              v-if="editMode && period.type === 'CUSTOM'"
            >
              <td class="px-3 py-2 w-1/4">
                <select
                  name="typz"
                  v-model="newPeriodData.type"
                  form="edit-period"
                >
                  <option value="SEASON">SEASON</option>
                  <option value="OPERATION">
                    OPERATION
                  </option>
                  <option value="CUSTOM">CUSTOM</option>
                </select>
              </td>
              <td class="px-3 py-2 w-1/4">
                <input
                  type="date"
                  required
                  name="start_date"
                  :min="moment().format('YYYY-MM-DD')"
                  v-model="newPeriodData.start_date"
                  form="edit-period"
                />
              </td>
              <td class="px-3 py-2 w-1/4">
                <input
                  type="date"
                  required
                  name="end_date"
                  v-model="newPeriodData.end_date"
                  form="edit-period"
                  :min="
                    moment(newPeriodData.start_date)
                      .add(1, 'days')
                      .format('YYYY-MM-DD')
                  "
                />
              </td>
              <td class="px-3 py-2 w-[100px]">
                <input
                  v-model="newPeriodData.score"
                  form="edit-period"
                  :min="0"
                  type="number"
                  name="score"
                  class="text-right w-[50px] rounded-md border border-gray-200"
                />
              </td>
              <td class="w-[120px]">
                <form
                  @submit="
                    editPeriod($event, newPeriodData)
                  "
                  id="edit-period"
                ></form>
                <button
                  type="submit"
                  class="bg-blue-500 text-white"
                  form="edit-period"
                >
                  <span>Enregistrer</span>
                </button>
              </td>
            </template>
            <template v-else>
              <td class="px-3 py-2 w-1/4">
                <span>{{ period.type }}</span>
              </td>
              <td class="px-3 py-2 w-1/4">
                <span>{{
                  moment(period.start_date).format(
                    'DD-MM-YYYY',
                  )
                }}</span>
              </td>
              <td class="px-3 py-2 w-1/4">
                <span>{{
                  moment(period.end_date).format(
                    'DD-MM-YYYY',
                  )
                }}</span>
              </td>
              <td class="px-3 py-2 w-[100px]">
                <span>{{ period.score }}</span>
              </td>
              <td class="w-[120px]">
                <button
                  v-if="
                    !editMode && period.type === 'CUSTOM'
                  "
                  type="button"
                  class="bg-blue-500 text-white"
                  @click="editMode = true"
                >
                  Editer
                </button>
              </td>
            </template>
          </tr>
          <tr
            v-if="
              newPeriodData &&
              setNewPeriod &&
              !isNewPeriodAdded
            "
          >
            <td class="px-3 py-2 text-right">
              <select
                name="type"
                v-model="newPeriodData.type"
                form="create-period"
              >
                <option value="SEASON">SEASON</option>
                <option value="OPERATION">OPERATION</option>
                <option value="CUSTOM">CUSTOM</option>
              </select>
            </td>
            <td class="px-3 py-2 text-right">
              <input
                type="date"
                required
                name="start_date"
                :min="moment().format('YYYY-MM-DD')"
                v-model="newPeriodData.start_date"
                form="create-period"
              />
            </td>
            <td class="px-3 py-2 text-right">
              <input
                type="date"
                required
                name="end_date"
                form="create-period"
                :min="
                  moment(newPeriodData.start_date)
                    .add(1, 'days')
                    .format('YYYY-MM-DD')
                "
                v-model="newPeriodData.end_date"
              />
            </td>
            <td class="px-3 py-2 text-right">
              <input
                v-model="newPeriodData.score"
                form="create-period"
                type="number"
                name="score"
                placeholder="Score"
                required
                class="text-right"
              />
            </td>
            <td class="text-right w-[120px]">
              <form
                @submit="addNewPeriod"
                id="create-period"
              ></form>
              <button
                type="submit"
                class="bg-blue-500 text-white"
                form="create-period"
              >
                <span>Enregistrer</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
      v-if="!setNewPeriod"
      @click="setNewPeriod = true"
      type="button"
      class="bg-blue-500 text-white mt-10"
    >
      Ajouter une période
    </button>
  </div>
</template>
<script lang="ts" setup>
import { useMainStore } from '@/stores/index.ts'
import { computed, onMounted, ref } from 'vue'
import moment from 'moment'

const mainStore = useMainStore()
const article = computed(() => mainStore.article)
const props = defineProps(['id'])
const setNewPeriod = ref(false)
const isNewPeriodAdded = ref(false)
const editMode = ref(false)
const newPeriodData = ref()

onMounted(() => {
  newPeriodData.value = {
    article_id: props.id,
    type: 'CUSTOM',
    start_date: moment().format('YYYY-MM-DD'),
    end_date: moment(new Date('2999/12/13')).format(
      'YYYY-MM-DD',
    ),
    score: 12,
  }
})

const addNewPeriod = async (e) => {
  e.preventDefault()
  mainStore.addNewPeriod(newPeriodData.value)
  isNewPeriodAdded.value = true
}

const editPeriod = async (e, period) => {
  e.preventDefault()
  mainStore.editPeriod(period)
  editMode.value = false
}
</script>
