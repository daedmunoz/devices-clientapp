import { createContext } from 'react';
import { SortByOption } from '../pages/devices/common/models/sort-by-option';

type DeviceFilters = { sortByOption: SortByOption; systemTypes: string[] };
export const AppContext = createContext<{
  devices: {
    filters: DeviceFilters;
    updateFilters(filters: DeviceFilters): void
  }
}>({
  devices: {
    filters: {
      sortByOption: 'HDD',
      systemTypes: []
    },
    updateFilters: () => { },
  }
});
