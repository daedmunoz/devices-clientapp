import { useState } from 'react';
import { servicesProvider } from '../../../common/services-provider';
import Dialog from '../../../components/dialog';
import { Device } from '../../../model/device';

const devicesApiService = servicesProvider.getDevicesApiService();

type Props = {
  device: Device;
  onDeleted(device: Device): void;
  onCancel(): void;
};

const DeleteDeviceDialog = ({ device, onCancel, onDeleted }: Props): JSX.Element => {
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const deleteDevice = async () => {
    try {
      setDeleting(true);
      await devicesApiService.deleteDevice(device.id as string);
      setDeleting(false);
      onDeleted(device);
    } catch (error: any) {
      console.error('Error deleting device', error);
      setErrorMessage(error.message);
      setDeleting(false);
    }
  }

  return (
    <Dialog title="Confirmation" onAccept={deleteDevice} onCancel={onCancel} acceptDisabled={deleting} cancelDisabled={deleting}>
      Are you sure you want to delete the device called <b>{device.system_name}</b> ?

      {errorMessage && <p>Oops! Something went wrong...</p>}
    </Dialog>
  )
};

export default DeleteDeviceDialog;
