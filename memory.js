const os = require('os');
const Pusher = require('pusher');

// Set up Pusher
const pusher = new Pusher({
  appId: '<INSERT_PUSHER_APP_ID>',
  key: '<INSERT_PUSHER_APP_KEY>',
  secret: '<INSERT_PUSHER_APP_SECRET>',
  cluster: '<INSERT_PUSHER_APP_CLUSTER>',
  encrypted: true,
});

// To convert from bytes to gigabytes
const bytesToGigaBytes = 1024 * 1024 * 1024;
// To specify the interval (in milliseconds)
const intervalInMs = 10000;

setInterval(() => {
  const totalMemGb = os.totalmem()/bytesToGigaBytes;
  const freeMemGb = os.freemem()/bytesToGigaBytes;
  const usedMemGb = totalMemGb - freeMemGb;

  console.log(`Total: ${totalMemGb}`);
  console.log(`Free: ${freeMemGb}`);
  console.log(`Used: ${usedMemGb}`);

  // To publish to the channel 'stats' the event 'new_memory_stat' 
  pusher.trigger('stats', 'new_memory_stat', {
    memory: usedMemGb,
  });
}, intervalInMs);