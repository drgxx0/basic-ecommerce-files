import * as actionTypes from 'store/actions/actionType'


const initialState = {
    fetchArticles: [], 
    articlesSelected: [],
    totalPrice: 0,
    searchSug: [],
    renderImg: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ARTICLES:
            return {
                ...state,
                fetchArticles: action.articles
            }
        case actionTypes.ARTICLES_SELECTED:
            return {
                ...state,
                articlesSelected: {
                    ...state.articlesSelected,
                    [action.id]: {
                        title: action.title,
                        img: action.img,
                        price: action.price,
                        id: action.id,
                        count: 1
                    }
                },
                totalPrice: state.totalPrice + action.price 
            }
        case actionTypes.COUNT_ARTICLE_SELECTED:
            return {
                ...state,
                articlesSelected: {
                    ...state.articlesSelected,
                    [action.id]: {
                        ...state.articlesSelected[action.id],
                        count: state.articlesSelected[action.id].count + 1
                    }
                },
                totalPrice: state.totalPrice + action.price
            }
        case actionTypes.DELETE_ARTICLE:
            return {
                ...state,
                articlesSelected: action.articles,
                totalPrice: state.totalPrice - action.price
            }
        case actionTypes.REMOVE_COUNT_ARTICLE_SELECTED:
            return {
                ...state,
                articlesSelected: {
                    ...state.articlesSelected,
                    [action.id]: {
                        ...state.articlesSelected[action.id],
                        count: state.articlesSelected[action.id].count - 1
                    }
                },
                totalPrice: state.totalPrice - action.price
            }
        case actionTypes.SEARCH_SUGGEST:
            return {
                ...state,
                searchSug: action.search
            }
        case actionTypes.EMPTY_SEARCH:
            return {
                ...state,
                searchSug: []
            }
        case actionTypes.RENDER_IMG:
            return {
                ...state,
                renderImg: action.img
            }
        case actionTypes.CLEAR_SEARCH_SUGGEST:
            return {
                ...state,
                searchSug: []
            }
        default:
            return state;
    }
}

export default reducer