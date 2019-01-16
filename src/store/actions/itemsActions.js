import * as actionType from './actionType'

export const fetchingArticles = (data) => {
    return {
        type: actionType.GET_ITEMS,
        data
    }
}

export const addArticleToCart = (articles, title, img, price, id) => {
    price = Number(price);
    const index = Object.keys(articles).filter(article => {
        return articles[article].id === id
    });
    if(index.length) {
        return {
            type: actionType.COUNT_ARTICLE_SELECTED,
            id,
            price
        }
    }
    return {
        type: actionType.ARTICLES_SELECTED,
        title,
        img,
        price,
        id
    }
}

export const deleteArticlesSelected = (articles, price, id) => {
    price = Number(price)
    const copy = {
        ...articles
    }

    if(copy[id].count > 1) {
        return {
            type: actionType.REMOVE_COUNT_ARTICLE_SELECTED,
            id,
            price
        }
    }
    delete copy[id]
    return {
        type: actionType.DELETE_ARTICLE,
        articles: copy,
        price
    }
}

export const searchSuggest = (data) => {
    return {
        type: actionType.GET_SEARCH_SUGGEST,
        data
    }
}

export const getAllImg = () => {
    return {
        type: actionType.GET_IMGS
    }
}

export const clearSearchSuggest = () => {
    return {
        type: actionType.CLEAR_SEARCH_SUGGEST
    }
}