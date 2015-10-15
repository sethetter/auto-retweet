// Load vars from .env file
require('dotenv').load();

var Twitter = require('twitter');

var USER_ACCOUNT = process.env.YOUR_USERNAME;
var ACCOUNTS_TO_RT_STR = process.env.RT_USERNAME_LIST;
var ACCOUNTS_TO_RT = ACCOUNTS_TO_RT_STR.split(',');

var INCLUDE_RTS = process.env.INCLUDE_RTS || false;
var INCLUDE_MENTIONS = process.env.INCLUDE_MENTIONS || false;
var CHECK_INTERVAL = process.env.CHECK_INTERVAL || 300000;

var MOST_RECENT_TWEET_ID;

// Strip any possible spaces left from comma separation
ACCOUNTS_TO_RT.forEach((account, i) => {
  ACCOUNTS_TO_RT[i] = account.trim();
});

// Create our Twitter client, all of these ENV vars are required
var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret:process.env.ACCESS_TOKEN_SECRET
});

function getMostRecentStatusID() {

  client.get('statuses/home_timeline', {
    count: 1
  }, (err, tweets, response) => {
    if (err) throw err;
    MOST_RECENT_TWEET_ID = tweets[0].id_str;
    console.log(`Set most recent tweet ID to prevent backlog: ${MOST_RECENT_TWEET_ID}`);
  });
}

// Get a list of most recent statuses for an account
function getStatusesForAccount(username) {
  console.log(`Grabbing statuses for ${username}`);

  client.get('statuses/user_timeline', {
    screen_name: username,
    exclude_replies: !INCLUDE_MENTIONS,
    include_rts: INCLUDE_RTS,
    count: 10,
    since_id: MOST_RECENT_TWEET_ID
  }, (err, tweets, response) => {
    if (err) throw err;
    processStatuses(tweets)
  });
}

// Check each status for already RT'd, and RT if not already
function processStatuses(statuses) {
  statuses.forEach((status) => {
    console.log(`-- Processing status ${status.id_str}`);
    // Don't RT if we already have
    if (!status.retweeted) retweetStatus(status.id_str);
  });
}

function retweetStatus(statusID) {
  client.post('statuses/retweet', {
    id: statusID
  }, (err, retweetedStatus, response) => {
    if (err) throw err;
    console.log(`-- Retweeting status ${status.id_str} from ${retweetStatus.screen_name}`);
  });
}

// Do it!
getMostRecentStatusID();

setInterval(() => {
  ACCOUNTS_TO_RT.forEach(getStatusesForAccount)
}, CHECK_INTERVAL);
