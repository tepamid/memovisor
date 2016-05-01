export default function getAlbumImages(albumId, cliendId) {

  return fetch('https://api.imgur.com/3/album/' + albumId + '/images', {
    headers: {
      'Authorization': 'Client-ID ' + cliendId
    }
  })  
  .then((res) => {
      return res.json()
    })
}
