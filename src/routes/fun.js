import imageToAscii from 'image-to-ascii';
import superagent from 'superagent';

async function renderFun(req, res, name) {

    if (name === 'waifu') {
        if (req.useragent.isCurl) {
            let {body} = await superagent
            .get(`https://nekos.life/api/v2/img/waifu`);

            imageToAscii(body.url, {
                pxWidth: 1,
                size: {
                    height: 50,
                    width: 50
                },
                colored: true,
                pixels: "01"
            }, (err, converted) => {
                if (err)
                    return res.send(err);
                res.send(converted);
            });
        } else {
            return (res.redirect('/'));
        }
    }
}

export default renderFun;
