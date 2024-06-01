/* eslint-disable no-console */

import mongoose from 'mongoose';
import { app } from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    const port = config.port;
    server = app.listen(port, () => {
      console.log(`university management app is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

// for asynchronous
process.on('unhandledRejection', () => {
  console.log(`unhandledRejection is detected, shutting down the server`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// for synchronous
process.on('uncaughtException', () => {
  console.log(`uncaught exception is detected, shutting down the server`);
  process.exit(1);
});
