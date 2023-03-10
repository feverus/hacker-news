import { hydrateRoot } from 'react-dom/client';
import { RemixBrowser } from "@remix-run/react";

import { Provider } from 'mobx-react'
import { setStore } from "./store/setStore"

const stores = {
  setStore,
}


hydrateRoot(document, 
	<Provider {...stores}>
		<RemixBrowser />
	</Provider>
);