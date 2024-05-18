import { Article } from '@/models/article';
import articles from '@/assets/data/articles.json'
import periods from '@/assets/data/periods.json'
import { Period } from '@/models/period';

export const searchArticles = (query: String) => { 
  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredArticles: Article[] = articles.filter(article => String(article.numero).includes(String(query)))
      resolve(filteredArticles);
    }, 300);
  });
}

export const getArticle = (id: Number) => { 
  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      const article: Article = articles.find(article => article.id === id)
      resolve(article);
    }, 300);
  });
}

export const getPeriods = (id: Number) => { 
  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredPeriods: Period[] = periods.filter(periods => periods.article_id === id)
      resolve(filteredPeriods);
    }, 300);
  });
}
