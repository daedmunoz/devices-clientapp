import { ChangeEvent, useContext } from 'react';
import Select from '../../../components/select';
import { AppContext } from '../../../contexts/app-context';
import { allSystemType, deviceTypeMapper, deviceTypes } from '../common/common-values';
import { SortByOption } from '../common/models/sort-by-option';
import styles from './filters.module.css';

const deviceTypeOptions = [allSystemType, ...deviceTypes];

const sortByOptions: SortByOption[] = ['HDD', 'System Name'];

const DevicesFilters = (): JSX.Element => {
  const { devices: { filters, updateFilters } } = useContext(AppContext);

  const mapDeviceTypeOption = (option: string) => {
    return <option key={option} value={option}>{deviceTypeMapper[option] || option}</option>
  };

  const mapSortByOption = (option: string) => {
    return <option key={option}>{option}</option>
  };

  const handleSystemTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSystemTypes = Array.from(e.target.selectedOptions, option => option.value);
    updateFilters({
      sortByOption: filters.sortByOption,
      systemTypes: newSystemTypes,
    });
  }

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateFilters({
      sortByOption: e.target.value as SortByOption,
      systemTypes: filters.systemTypes,
    });
  }

  return (
    <div className={styles.filters}>
      <div className={styles.filterWraper}>
        <label htmlFor="deviceTapSel" className={styles.label}>Device Type:</label>
        <Select id="deviceTapSel" onChange={handleSystemTypeChange} value={filters.systemTypes} multiple>
          {deviceTypeOptions.map(mapDeviceTypeOption)}
        </Select>
      </div>
      <div className={styles.filterWraper}>
        <label htmlFor="sortBySel" className={`${styles.label} ${styles.sortByLabel}`}>Sort by:</label>
        <Select id="sortBySel" onChange={handleSortChange} value={filters.sortByOption}>
          {sortByOptions.map(mapSortByOption)}
        </Select>
      </div>
    </div>
  )
};

export default DevicesFilters;
