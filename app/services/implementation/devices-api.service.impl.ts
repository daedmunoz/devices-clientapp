import { Device } from '../../model/device';
import { DevicesApiService } from '../devices-api.service';
import { HTTPService } from '../http.service';

export class DevicesApiServiceImpl implements DevicesApiService {
  private httpService: HTTPService;
  private apiBaseURL: string;

  constructor(opts: { httpService: HTTPService, apiBaseURL: string; }) {
    this.httpService = opts.httpService;
    this.apiBaseURL = opts.apiBaseURL;
  }

  async createDevice(device: Device): Promise<Device> {
    return this.httpService.post<Device>({ url: `${this.apiBaseURL}devices`, body: device });
  }

  async updateDevice(device: Device): Promise<Device> {
    return this.httpService.put<Device>({ url: `${this.apiBaseURL}devices/${device.id}`, body: device });
  }

  async deleteDevice(deviceId: string): Promise<void> {
    return this.httpService.delete({ url: `${this.apiBaseURL}devices/${deviceId}` });
  }

  async getDevice(deviceId: string): Promise<Device> {
    return this.httpService.get({ url: `${this.apiBaseURL}devices/${deviceId}` });
  }

  async getDevices(): Promise<Device[]> {
    const devices = await this.httpService.get<Device[]>({ url: `${this.apiBaseURL}devices` });
    return devices || [];
  }
}