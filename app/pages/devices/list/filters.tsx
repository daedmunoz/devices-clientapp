import { ChangeEvent, useState } from 'react';
import Select from '../../../components/select';
import { deviceTypeMapper, deviceTypes } from '../common/common-values';
import { SortByOption } from '../common/models/sort-by-option';
import styles from './filters.module.css';

const allSystemType = 'All';
const deviceTypeOptions = [allSystemType, ...deviceTypes];

const sortByOptions: SortByOption[] = ['HDD', 'System Name'];

type OnFilterChangeOptions = { sortByOption: SortByOption; systemType: string; };
type Props = {
  onFiltersChange(options: OnFilterChangeOptions): void;
};

const DevicesFilters = ({ onFiltersChange }: Props): JSX.Element => {
  const [systemType, setSystemType] = useState(allSystemType);
  const [sortBy, setSortBy] = useState<SortByOption>('HDD');

  const mapDeviceTypeOption = (option: string) => {
    return <option key={option} value={option}>{deviceTypeMapper[option] || option}</option>
  };

  const mapSortByOption = (option: string) => {
    return <option key={option}>{option}</option>
  };

  const buildFilterValues = (options: OnFilterChangeOptions): OnFilterChangeOptions => {
    return {
      sortByOption: options.sortByOption,
      systemType: options.systemType !== allSystemType ? options.systemType : '',
    }
  };

  const handleSystemTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSystemType(e.target.value);
    onFiltersChange(buildFilterValues({
      sortByOption: sortBy,
      systemType: e.target.value,
    }));
  }

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortByOption);
    onFiltersChange(buildFilterValues({
      sortByOption: e.target.value as SortByOption,
      systemType,
    }));
  }

  return (
    <div className={styles.filters}>
      <div className={styles.filterWraper}>
        <label htmlFor="deviceTapSel" className={styles.label}>Device Type:</label>
        <Select id="deviceTapSel" onChange={handleSystemTypeChange} value={systemType}>
          {deviceTypeOptions.map(mapDeviceTypeOption)}
        </Select>
      </div>
      <div className={styles.filterWraper}>
        <label htmlFor="sortBySel" className={`${styles.label} ${styles.sortByLabel}`}>Sort by:</label>
        <Select id="sortBySel" onChange={handleSortChange} value={sortBy}>
          {sortByOptions.map(mapSortByOption)}
        </Select>
      </div>
    </div>
  )
};

export default DevicesFilters;