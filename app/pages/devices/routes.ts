export const devicesRoutes = {
  list: "/devices",
  add: "/devices/new",
  update: {
    build: (deviceId: string) => `/devices/update/${deviceId}`
  }
}