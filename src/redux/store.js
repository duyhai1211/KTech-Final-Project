import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'; // Đúng cú pháp import từ redux-thunk
import rootReducer from './reducer/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Cấu hình redux-persist
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Kiểm tra xem Redux DevTools có sẵn không, nếu không thì dùng `compose`
const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Tạo store với middleware và redux-persist
const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)) // Sử dụng đúng import
);

let persistor = persistStore(store);

export { store, persistor };
