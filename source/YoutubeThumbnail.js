const thumbnail = (link)=>{      
    const result = link.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    const videoIdWithParams = result[2];
    if (videoIdWithParams !== undefined) {
        const videoId = videoIdWithParams.split(/[^0-9a-z_-]/i)[0];
        const baseUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        console.log('dsdsd', baseUrl)
        return baseUrl;
      }    
      return null;    
}

export default thumbnail;