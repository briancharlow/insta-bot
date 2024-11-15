require("dotenv").config();

const express = require('express')
const app = express()
const port = process.env.PORT || 4000;


const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const CronJob = require("cron").CronJob;



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
const postToInsta = async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    const imageBuffer = await get({
        url: 'https://i.imgur.com/BZBHsauh.jpg',
        encoding: null,
    });

    await ig.publish.photo({
        file: imageBuffer,
        caption: 'Really nice photo from the internet!',
    });
}

const cronInsta = new CronJob("* * * * *", async () => {
    postToInsta();
});

cronInsta.start();