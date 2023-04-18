import { connections, connect, disconnect } from 'mongoose';
import { green, yellow, blue } from 'colors';
import { config } from '@/config/config';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const dbConnections = {
  isConnected: 0
}


export const db = {

  connect: async () => {

    const { isConnected } = dbConnections;

    if (isConnected)
      return console.log(`${blue('Already connected')}`);


    if (!!connections.length) {
      dbConnections.isConnected = connections[0].readyState;

      if (isConnected === 1)
        return console.log(`${blue('Using previous connection')}`);

      await disconnect();
    }

    await connect(config.MONGO_URL || '');
    dbConnections.isConnected = 1;
    console.log(`${green('Connected to MongoDB:')}`, `${yellow(config.MONGO_URL as string)}`);
  },

  disconnect: async () => {

    const { isConnected } = dbConnections

    if (process.env.NODE_ENV === 'development') return;
    if (!isConnected) return;

    await disconnect();
    dbConnections.isConnected = 0;

    console.log(`${yellow('Disconnected from MongoDB')}`);
  }
}