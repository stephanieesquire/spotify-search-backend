const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function artistAlbums(req, res) {
  try {
    //get api token
    const resultToken = await fetch(
      `${process.env.SPOTIFY_API_URL_AUTHENTICATION}/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      }
    );

    const dataToken = await resultToken.json();

    //get artists (first artist of the returned list needed)
    const resultArtists = await fetch(
      `${process.env.SPOTIFY_API_URL}/search?type=artist&q=${req.params.artist}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${dataToken.access_token}}`,
        },
      }
    );

    const dataArtists = await resultArtists.json();

    //get artist albums
    const resultArtistAlbumsPerPage = await fetch(
      `${process.env.SPOTIFY_API_URL}/artists/${dataArtists.artists.items[0].id}/albums?limit=50&include_groups=album`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${dataToken.access_token}}`,
        },
      }
    );

    let dataArtistAlbumsPerPage = await resultArtistAlbumsPerPage.json();
    const dataArtistAlbums = [];
    dataArtistAlbums.push(...dataArtistAlbumsPerPage.items);

    //api pager
    while (dataArtistAlbumsPerPage.next !== null) {
      const resultArtistAlbumsPerPage = await fetch(
        `${dataArtistAlbumsPerPage.next}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${dataToken.access_token}}`,
          },
        }
      );
      dataArtistAlbumsPerPage = await resultArtistAlbumsPerPage.json();
      dataArtistAlbums.push(...dataArtistAlbumsPerPage.items);
    }

    //get albums data
    let albumsIds = "";
    const albumsData = [];

    for (let i = 0; i < dataArtistAlbums.length; i++) {
      albumsIds += dataArtistAlbums[i].id + ",";

      //get several albums (max 20 ids)
      if ((i + 1) % 20 === 0) {
        const resultAlbumsDetails = await fetch(
          `${process.env.SPOTIFY_API_URL}/albums/?ids=${albumsIds.slice(
            0,
            -1
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${dataToken.access_token}}`,
            },
          }
        );

        const dataAlbumsDetails = await resultAlbumsDetails.json();

        albumsData.push(...dataAlbumsDetails.albums);
        albumsIds = "";
      }

      //last call
      else if (
        dataArtistAlbums.length -
          albumsData.length -
          albumsIds.slice(0, -1).split(",").length ===
        0
      ) {
        const resultAlbumsDetails = await fetch(
          `${process.env.SPOTIFY_API_URL}/albums/?ids=${albumsIds.slice(
            0,
            -1
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${dataToken.access_token}}`,
            },
          }
        );
        const dataAlbumsDetails = await resultAlbumsDetails.json();

        albumsData.push(...dataAlbumsDetails.albums);
        albumsIds = "";
      }
    }

    res.json(albumsData.sort((a, b) => b.popularity - a.popularity));
  } catch (error) {
    res.status(400).json({ message: "an error has ocurred" });
  }
}

module.exports = { artistAlbums };
