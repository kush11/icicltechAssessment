import Thumbnail from '../source/YoutubeThumbnail'

test('should return the link of Thumbnail ', () => {
    const imageLink =Thumbnail('https://youtu.be/jPBgGA4sVmQ')
    expect(imageLink.split('.')[3]).toBe('jpg')
})
