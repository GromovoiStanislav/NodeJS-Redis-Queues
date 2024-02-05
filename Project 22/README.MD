## Bull reusing Redis connections (ioredis) examples

A standard queue requires 3 connections to the Redis server.
In some situations you might want to re-use connections.
You can do this with the createClient option in the Queue constructor.

#### Start:

```
npm run startManager
npm run startWorker
```
