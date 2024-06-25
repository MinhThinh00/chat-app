import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messageReducer from './messageSlice'; // Đổi tên thành messageReducer
import socketReducer from './socketSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// Combine các reducer
const rootReducer = combineReducers({
  socket: socketReducer,
  user: userReducer,
  message: messageReducer, 
});

// Cấu hình redux-persist
const persistConfig = {
  key: 'root', // Khóa để lưu trữ trong storage
  storage, // Sử dụng storage (ví dụ: localStorage)
  version: 1, // Phiên bản của persisted state
  blacklist: ['socket']
};

// Tạo persistedReducer sử dụng persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store Redux với persistedReducer và cấu hình middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt serializableCheck nếu cần
    }),
});

// Tạo persistor để khởi chạy persisted state
export const persistor = persistStore(store);
