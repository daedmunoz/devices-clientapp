import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { servicesProvider } from '../../../app/common/services-provider';
import { Device } from '../../../app/model/device';
import DeviceFormPage from '../../../app/pages/devices/device-form-page';

const devicesApiService = servicesProvider.getDevicesApiService();

const UpdateDevicePage = (): JSX.Element => {
  const [device, setDevice] = useState<Device | null>(null);
  const [queried, setQueried] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter()
  const { id } = router.query;

  useEffect(() => {
    const getDevice = async () => {
      try {
        const device = await devicesApiService.getDevice(`${id}` as string);
        setDevice(device);
        setQueried(false)
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setQueried(true);
      }
    }
    getDevice();
  }, [id]);

  return (
    <div>
      {!queried && <p>Loading...</p>}
      {queried && !errorMessage && !device && <p>Device not found!</p>}
      {device && <DeviceFormPage device={device} />}
      {!device && errorMessage && <p>Something went wrong!</p>}
    </div>
  );
};

export default UpdateDevicePage;
