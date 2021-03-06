
import {keno} from '../services/keno'
export default {
  namespace: "keno",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const width = window.innerWidth - 24;
      const drawCodeKeno = yield call(keno.getDrawPeriod);
      yield put({ type: "save", drawCodeKeno: drawCodeKeno ,fee:"" });

      const tutorialKeno = yield call(keno.getTutorial, width);
      yield put({ type: "save", tutorialKeno: tutorialKeno ,fee:"" });
    },
    *getDrawCode({}, { call, put }) {
      const drawCodeKeno = yield call(keno.getDrawPeriod);
      yield put({ type: "save", drawCodeKeno: drawCodeKeno ,fee:""});
    },
    *getFee({ payload: data }, { call, put }) {
      // console.log(data)
      const response = yield call(keno.getFee, data);
      // console.log(response)
      yield put({ type: "save", fee: response });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/keno" && history.location.payload === undefined) {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};