import firebase from "firebase";

var redux = require("redux");

const noteInitialState = {
  isEdit: false,
  editItem: {},
  AlertShow: false,
  AlertContent: "",
};

const allReducer = (state = noteInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

var store = redux.createStore(allReducer);

store.subscribe(function () {
  console.log(JSON.stringify(store.getState()));
});

export default store;
