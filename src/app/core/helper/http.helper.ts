import { HttpParams } from "@angular/common/http";

export function toHttpParams(params): HttpParams {
    return Object.getOwnPropertyNames(params)
        .reduce((p, key) => p.set(key, params[key]), new HttpParams());
}
