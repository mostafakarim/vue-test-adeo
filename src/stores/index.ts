import { defineStore } from 'pinia'
import {Article} from '@/models/article'
import {Period} from '@/models/period'
import {getArticle, searchArticles, getPeriods} from '@/services/article.services'

export const useMainStore = defineStore('main', {
  state: () => ({ 
    articles: [] as unknown as Article[],
    article: {} as unknown as Article,
    }),
    actions: {
      async searchArticles(query: String) {
        this.articles = await searchArticles(query)
      },
      async getArticleById(id: Number) {
        this.article = await getArticle(id)
        this.article.periods = await getPeriods(id)
      },
      addNewPeriod(period: Period) {
        this.article.periods.push({...period})
      },
      editPeriod(period: Period) {
        this.article.periods = this.article.periods.map((_period, index) =>{
          if(index === this.article.periods.length - 1) {
            return {...period}
          } else {
            return _period
          }
          
        })
      }
    },
  }
)