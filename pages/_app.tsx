import type { AppProps } from 'next/app';
import { useState } from 'react';
import { AppContext } from '../app/contexts/app-context';
import { SortByOption } from '../app/pages/devices/common/models/sort-by-option';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [devicesFilters, setDevicesFilters] = useState<{ sortByOption: SortByOption; systemTypes: string[] }>({
    sortByOption: 'HDD',
    systemTypes: []
  });

  return (
    <AppContext.Provider value={{
      devices: {
        filters: devicesFilters,
        updateFilters: setDevicesFilters,
      }
    }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
export default MyApp;
