import { useContext, useEffect, useState } from 'react';
import { servicesProvider } from '../../../common/services-provider';
import Button from '../../../components/button';
import LinkButton from '../../../components/link-button';
import Message from '../../../components/message';
import { AppContext } from '../../../contexts/app-context';
import { Device } from '../../../model/device';
import { allSystemType, deviceTypeMapper } from '../common/common-values';
import { SortByOption } from '../common/models/sort-by-option';
import DeleteDeviceDialog from '../delete-device-dialog';
import { devicesRoutes } from '../routes';
import styles from './devices-list.module.css';
import DevicesFilters from './filters';

const devicesApiService = servicesProvider.getDevicesApiService();

const sorters: { [key in SortByOption]: (a: Device, b: Device) => number } = {
  'HDD': (a, b) => +a.hdd_capacity > +b.hdd_capacity ? 1 : -1,
  'System Name': (a, b) => a.system_name > b.system_name ? 1 : -1,
}

const defaultSortByOption: SortByOption = 'HDD';

const DevicesList = (): JSX.Element => {
  const { devices: { filters, updateFilters } } = useContext(AppContext);

  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [visibleDevices, setVisibleDevices] = useState<Device[]>([]);
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);

  // Load initial data
  useEffect(() => {
    if (initialDataLoaded) {
      return;
    }
    const loadDevices = async () => {
      const devices = await devicesApiService.getDevices();
      devices.sort(sorters[filters.sortByOption]);
      setDevices(devices);
      setVisibleDevices(devices);
      setInitialDataLoaded(true);
    }
    loadDevices();
  }, [filters, initialDataLoaded]);

  // Filter devices
  useEffect(() => {
    let newVisibleDevices = [...devices];
    if (!filters.systemTypes.includes(allSystemType) && filters.systemTypes.length > 0) {
      newVisibleDevices = newVisibleDevices.filter(d => filters.systemTypes.includes(d.type));
    }

    if (filters.sortByOption) {
      newVisibleDevices.sort(sorters[filters.sortByOption]);
    }

    setVisibleDevices(newVisibleDevices);
  }, [filters, devices])

  const onDeleteClicked = (device: Device) => () => {
    setDeviceToDelete(device);
  };

  const onDeleteDeviceCancel = () => {
    setDeviceToDelete(null);
  }

  const onDeviceDeleted = (device: Device) => {
    setDevices(devices.filter(d => d.id !== device.id));
    setVisibleDevices(visibleDevices.filter(d => d.id !== device.id));
    setDeviceToDelete(null);
  }

  const mapDevice = (device: Device) => {
    return (
      <li key={device.id} className={styles.listItem}>
        <div className={styles.deviceInfo}>
          <h3>{device.system_name}</h3>
          <h4 className={styles.deviceType}>{deviceTypeMapper[device.type]}</h4>
          <h4>{device.hdd_capacity} GB</h4>
        </div>
        <div className={styles.deviceOptions}>
          <LinkButton id={`updateLnk${device.id}`} href={devicesRoutes.update.build(device.id)} title="Update device">Update</LinkButton>
          <Button id={`deleteBtn${device.id}`} onClick={onDeleteClicked(device)} title="Delete device">Delete</Button>
        </div>
      </li>
    );
  }

  return (
    <div className="content">
      {!initialDataLoaded && <Message id="loadingDevicesMsg">Loading...</Message>}
      {initialDataLoaded && (
        <>
          <div className={styles.filtersAndOptions}>
            <div className={styles.options}>
              <LinkButton id="addLnk" href={devicesRoutes.add} title="Add new device">Add</LinkButton>
            </div>
            <div className={styles.filters}>
              <DevicesFilters />
            </div>
          </div>
          <p>Total: {visibleDevices.length}</p>
          {visibleDevices.length === 0 && <Message id="noDevicesFoundMsg" type="warning">No devices found!</Message>}
          {visibleDevices.length > 0 && (
            <ul id="devicesList" className={styles.list}>
              {visibleDevices.map(mapDevice)}
            </ul>
          )}
          {deviceToDelete && <DeleteDeviceDialog device={deviceToDelete} onDeleted={onDeviceDeleted} onCancel={onDeleteDeviceCancel} />}
        </>
      )}
    </div>
  )
};

export default DevicesList;
