import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { Device } from '../../../model/device';
import { noDeviceType } from '../common/common-values';
import DeviceForm from '../form';
import { devicesRoutes } from '../routes';
import styles from './device-form-page.module.css';

type Props = {
  device?: Device;
}
const DeviceFormPage = ({ device = {
  id: '',
  hdd_capacity: '',
  system_name: '',
  type: noDeviceType,
} }: Props) => {
  const router = useRouter();

  const goToDevicesList = async () => {
    await router.push(devicesRoutes.list);
  };

  return (
    <div className="content">
      <Link href={devicesRoutes.list} passHref><a className={styles.link}>To devices list</a></Link>
      <div className={styles.formContainer}>
        <DeviceForm device={device} onCancel={goToDevicesList} />
      </div>
    </div>
  );
}

export default DeviceFormPage;
