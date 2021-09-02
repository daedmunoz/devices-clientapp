# Devices Client App
This is a simple project to manage devices built with Vercel and React.

## Software used in the development of this project:
- Node v14.17.3
- npm 7.20.5

## Server App
In order to run this project successfully, you need to run the server app. You can download the [repo](https://github.com/NinjaMSP/devicesTask_serverApp) and run the server following the instructions in its README.

## Install Project dependencies
```sh
npm install
```

## Enviroment variables
Some environment variables are necessary to run this project. Check the `.env.sample` to see the variables used. For local development, you can create a file called `.env.local` which can contain the following variables:

- `NEXT_PUBLIC_API_BASE_URL`, this is the base URL of the server app. Remember to put a slash (`/`) at the end of it. It defaults to `http://localhost:3000/`.

## Run tests
```
npm run test
```

## Run the project
```sh
npm run dev
```

By default, it runs on port 3001. If you want to change the port, run:
```sh
npm run dev -- -p <your-port>
```

## Open the project on a browser
After you run the project, you can visit [http://localhost:3001/devices](http://localhost:3001/devices) to see the main page with the list of devices.

_Note: The port might be different._