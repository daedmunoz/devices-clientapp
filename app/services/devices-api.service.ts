import { Device } from '../model/device';

export interface DevicesApiService {
  createDevice(device: Device): Promise<Device>;
  updateDevice(device: Device): Promise<Device>;
  deleteDevice(deviceId: string): Promise<void>;
  getDevice(deviceId: string): Promise<Device>;
  getDevices(): Promise<Device[]>;
}