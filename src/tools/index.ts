import {Store} from "../store";
import {inject, observer} from "mobx-react";
import React from "react";
import {IReactComponent} from "mobx-react/dist/types/IReactComponent";

let previusGenerated = Date.now()

export function generateId() {
  const value = previusGenerated + 1 + Math.random() * 10000
  previusGenerated = value
  return `id_${value}`
}

export function withStore(mapStore: (store: Store) => any) {
  return function (WrappedComponent: IReactComponent) {
	return inject(({store}) => ({store: mapStore(store)}))(observer(WrappedComponent))
  }
}

export function serialzr(object: Object): string {
  const cache: string[] = []
  return JSON.stringify(object, (_key, value) => {
	if (typeof value === 'object' && value !== null) {
	  // Duplicate reference found, discard key
	  if (cache.includes(value)) return;
	  // Store value in our collection
	  cache.push(value);
	}
	return value;
  });
}

export function deserialize(serializedString: string): Object {
  return JSON.parse(serializedString)
}


