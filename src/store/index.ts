import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { Persistor, WebStorage } from "redux-persist/es/types";
import { composeWithDevTools } from "redux-devtools-extension";
import { formReducer } from "./form/reducer";

type persistConfigType = {
  key: string, blacklist: string[], storage: WebStorage
}

const persistConfig: persistConfigType = {
  key: "convert-app",
  blacklist: [],
  storage,
};

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));

const persistedReducer = persistReducer(persistConfig, formReducer);

export const store = createStore(
  persistedReducer,
  composedEnhancers
);

export const persistor: Persistor = persistStore(store);