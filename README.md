# auto-retweet

A node thing to auto RT statuses posted by specified accounts on Twitter.

## Configuration

Copy the `.env.example` file renamed to `.env` and fill in your own values.

* `RT_USERNAME_LIST`, default: `''` (comma separated)
* `YOUR_USERNAME`, default: `''`
* `INCLUDE_RTS`, default: `false`
* `INCLUDE_MENTIONS`, default: `false`
* `CHECK_INTERVAL`, default: `300000` (5 minutes)
* `CONSUMER_KEY`, default: `nil`
* `CONSUMER_SECRET`, default: `nil`
* `ACCESS_TOKEN_KEY`, default: `nil`
* `ACCESS_TOKEN_SECRET`, default: `nil`

## Run it!

Make sure all necessary ENV vars are set and run `npm start`.

## The fuuuuuture

* Add env var to filter out posts containing certain keywords.
* Refactor a bit, you're better than this.
* Add tests? Seems like the right thing to do.
