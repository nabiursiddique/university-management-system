import mongoose from 'mongoose';
import { app } from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    const port = config.port;
    app.listen(port, () => {
      console.log(`university management app is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
