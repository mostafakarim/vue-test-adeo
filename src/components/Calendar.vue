<template>
  <div class="text-left mt-10 flex">
    <VDatePicker
      mode="date"
      v-model="selectedDate"
      :attributes="calendarAttributes"
      @dayclick="setTotalScore"
    />
    <div class="ml-5" v-if="currentPeriods.total > 0">
      <span class="font-bold mb-5">Score total :</span>
      {{ currentPeriods.total }}
      <div v-for="period in currentPeriods.periods">
        <div class="my-3">
          <p>
            <b>Type :</b> {{ period.type }}<br />
            <b>Date de début :</b>
            {{
              moment(period.start_date).format(
                'DD-MM-YYYY',
              )
            }}<br />
            <b>Date de fin :</b>
            {{ moment(period.end_date).format('DD-MM-YYYY')
            }}<br />
            <b>Score :</b> {{ period.score }}<br />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMainStore } from '@/stores/index.ts'
import { computed, ref, watch } from 'vue'
import moment from 'moment'

const mainStore = useMainStore()
const article = computed(() => mainStore.article)
const selectedDate = ref(new Date())
const calendarAttributes = ref([])
const currentPeriods = ref({ total: 0, periods: [] })

watch(
  () => mainStore.article.periods,
  async () => {
    displayPeriodsOnCalendar()
  },
  { deep: true },
)

const displayPeriodsOnCalendar = () => {
  calendarAttributes.value = []
  article.value.periods?.forEach((period) => {
    calendarAttributes.value.push({
      key: period.type,
      customData: {
        ...period,
      },
      dot: true,
      dates: getDateRange(
        period.start_date,
        period.end_date,
      ),
    })
  })
  setTotalScore()
}

const getDateRange = (firstDate, lastDate) => {
  if (
    moment(firstDate, 'YYYY-MM-DD').isSame(
      moment(lastDate, 'YYYY-MM-DD'),
      'day',
    )
  )
    return [lastDate]
  let date = firstDate
  const dates = [date]
  do {
    date = moment(date).add(1, 'day')
    dates.push(date.format('YYYY-MM-DD'))
  } while (moment(date).isBefore(lastDate))
  return dates
}

const setTotalScore = () => {
  let total = 0
  const periods = []
  article.value.periods?.forEach((period) => {
    if (
      moment(selectedDate.value).isBetween(
        period.start_date,
        period.end_date,
        undefined,
        '[]',
      )
    ) {
      periods.push(period)
      total += Number(period.score)
    }
  })
  currentPeriods.value = {
    total,
    periods,
  }
}
</script>
