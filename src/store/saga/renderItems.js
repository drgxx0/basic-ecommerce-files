import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios'

import * as actionType from 'store/actions/actionType';

//WATCHING FOR CHANGES
function* watchFetchProducts() {
  yield takeEvery(actionType.GET_ITEMS, render)
}

function* watchSearchSuggest() {
    yield takeLatest(actionType.GET_SEARCH_SUGGEST, search)
}

function* watchFetchImgs() {
    yield takeEvery(actionType.GET_IMGS, img)
}

//GETTING DATAS
const getItemsData = (data) => {
    return axios({
        method: "get",
        url: `https://7af22ckd7e.execute-api.us-east-2.amazonaws.com/prod/cat/${data}`
    })
}

const getSearchData = (data) => {
    return axios({
        method: 'get',
        url: `https://7af22ckd7e.execute-api.us-east-2.amazonaws.com/prod/search/${data}`
    })
}

const getImgs = () => {
    return axios({
        method: 'get',
        url: 'https://7af22ckd7e.execute-api.us-east-2.amazonaws.com/prod/img'
    })
}

//SEARCH FUNCTION GENERATOR
function* search(data) {
    if(data.data.length >= 1) {
        try {
            const items = yield call(getSearchData, data.data)
                if(items.data.length) {
                    const searchResult = items.data.map(item => item)
                    yield put({
                        type: actionType.SEARCH_SUGGEST,
                        search: searchResult
                    })
                } else {
                    yield put({
                        type: actionType.SEARCH_SUGGEST,
                        search: [items.data]
                    })
                }
            } catch (e) {
                console.log(e)
            }
    } else {
        yield put({
            type: actionType.EMPTY_SEARCH
        })
    }
}

//RENDER FUNCTION GENERATOR
function* render(data) {
    try {
        const items = yield call(getItemsData, data.data);
        yield put({
        type: actionType.FETCH_ARTICLES,
        articles: items.data
    })
    } catch (e) {
        console.log(e)
    }
}

//IMAGES FUNCTION GENERATOR
function* img() {
    try {
        const img = yield call(getImgs)
        yield put({
            type: actionType.RENDER_IMG,
            img: img.data.body
        })
    } catch (e) {
        console.log(e)
    }
}
export default function* renderItems() {
    yield all([
        watchFetchProducts(),
        watchSearchSuggest(),
        watchFetchImgs()
    ])
}