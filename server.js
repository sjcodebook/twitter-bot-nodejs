const Twitter = require('twitter-lite')
let cron = require('node-cron');

const client = new Twitter({
    consumer_key: "paste_your_key",
    consumer_secret: "paste_your_key",
    access_token_key: "paste_your_key",
    access_token_secret: "paste_your_key"
});

const getTweetLikesAndUpdateProfile = async () => {
    const tweetData = await client.get("statuses/show", {
        id: "1315114170933628929"
    }).catch(err => {
        console.log(err)
    })

    if ("favorite_count" in tweetData && "retweet_count" in tweetData) {
        const name = `SJ - this tweet has ${tweetData.favorite_count} likes and ${tweetData.retweet_count} retweets`
        await client.post("account/update_profile", {
            name
        }).catch(err => {
            console.log(err)
        })
    }

}

cron.schedule('*/1 * * * *', () => {
    console.log('running a task every 1 minutes');
    getTweetLikesAndUpdateProfile()
});

console.log('started')
