export declare const makeStore: () => import("@reduxjs/toolkit").EnhancedStore<{
    app: unknown;
}, import("@reduxjs/toolkit").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("@reduxjs/toolkit").StoreEnhancer<{
    dispatch: import("@reduxjs/toolkit").ThunkDispatch<{
        app: unknown;
    }, undefined, import("@reduxjs/toolkit").UnknownAction>;
}>, import("@reduxjs/toolkit").StoreEnhancer]>>;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
//# sourceMappingURL=store.d.ts.map