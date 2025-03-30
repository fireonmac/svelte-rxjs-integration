import { Observable } from "rxjs";
import type { Writable } from "svelte/store";

export const toObservable = <T>(store: Writable<T>) => {
  return new Observable<T>(observer => {
    return store.subscribe((value: T) => observer.next(value));
  });
}