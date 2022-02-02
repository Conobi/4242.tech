const imageToAscii = require('image-to-ascii');
const superagent = require('superagent');

async function funCurl(req, res, splited) {
    if (splited[2] === 'waifu') {
        let {body} = await superagent
        .get(`https://nekos.life/api/v2/img/waifu`);
        imageToAscii(body.url, {
            pxWidth: 1,
            size: {
                height: 50,
                width: 50
            },
            colored: true,
            pixels: "42@#"
        }, (err, converted) => {
            if (err)
                return res.send(err);
            return res.send(converted);
        });
    } else {
        res.status(404).send({'error': '404'});
    }
}

module.exports = {
    funCurl
};
