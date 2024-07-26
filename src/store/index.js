import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/apiSlice";

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (defaultMiddlewares) => [...defaultMiddlewares(), api.middleware],
});
