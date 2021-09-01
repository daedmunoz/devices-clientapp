import { DevicesApiService } from '../services/devices-api.service';
import { DevicesApiServiceImpl } from '../services/implementation/devices-api.service.impl';
import { HTTPServiceImpl } from '../services/implementation/http.service.impl';
import { appConfig } from './app-config';

class ServicesProvider {
  private devicesApiService: DevicesApiService;
  constructor() {
    const httpService = new HTTPServiceImpl();
    this.devicesApiService = new DevicesApiServiceImpl({
      httpService,
      apiBaseURL: appConfig.apiBaseURL
    });
  }

  getDevicesApiService(): DevicesApiService {
    return this.devicesApiService;
  }
}

export const servicesProvider = new ServicesProvider();
