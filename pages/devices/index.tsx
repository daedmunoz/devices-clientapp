import type { NextPage } from 'next';
import DevicesList from '../../app/pages/devices/list';

const Home: NextPage = (): JSX.Element => {
  return (
    <DevicesList />
  );
}

export default Home;
