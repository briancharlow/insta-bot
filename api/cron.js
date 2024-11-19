require("dotenv").config();
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');

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

module.exports = async (req, res) => {
    try {
        await postToInsta();
        res.status(200).send('Post made successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error posting to Instagram');
    }
};