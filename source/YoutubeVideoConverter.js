
import youtubedl from 'react-native-ytdl';

async function Converter(link) {
    await youtubedl.getInfo(link, (err, info) => {
        if (err) console.log(err);
        console.log('url link', info.formats[0].url);
    });
    if (info.formats[0].url)
        return info.formats[0].url;        
}

export default Converter;