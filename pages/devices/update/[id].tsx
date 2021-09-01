import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { servicesProvider } from '../../../app/common/services-provider';
import Message from '../../../app/components/message';
import { Device } from '../../../app/model/device';
import DeviceFormPage from '../../../app/pages/devices/device-form-page';

const devicesApiService = servicesProvider.getDevicesApiService();

const UpdateDevicePage = (): JSX.Element => {
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter()
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    const getDevice = async () => {
      try {
        const device = await devicesApiService.getDevice(`${id}` as string);
        setDevice(device);
      } catch (error) {
        console.error('Error loading device', error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    getDevice();
  }, [id]);

  return (
    <div>
      {loading && <Message id="loadingDeviceMsg">Loading...</Message>}
      {!loading && !errorMessage && !device && <Message id="deviceNotFoundMsg" type="warning">Device not found!</Message>}
      {!loading && !device && errorMessage && (
        <Message id="errorLoadingDeviceMsg" type="error">Something went wrong! {errorMessage}</Message>
      )}
      {device && <DeviceFormPage device={device} />}
    </div>
  );
};

export default UpdateDevicePage;
