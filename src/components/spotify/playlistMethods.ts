
//interface to make PLaylistTracks more readable

interface PlaylistTrackDetails {
      album: {
        name: string;
        release_date: string;
      };
      artists: Array<{
        name: string;
        id: string;
      }>;
      name: string;
      id: string;
  }

  //All items in the Playlist.items array have this type
  export interface PlaylistTracks{
    added_at: string,
    added_by: {
      external_urls: {
        spotify: string
      },
      followers: {
        href: string,
        total: number
      },
      href: string,
      id: string,
      type: string,
      uri: string
    },
    is_local: boolean,
    track: PlaylistTrackDetails
  }

export interface Playlist {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number,
    items: PlaylistTracks[]
}
//[] abs neccesary here? @@@

interface newPlaylist{
    id: string
}


async function getPlaylists(accessToken:string|null):Promise<Playlist> {
    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });

    return await result.json();
}

//Always make sure you have the scope
//doesnt use string literal unless you use back ticks.. also python uses @{} and js uses ${}
//PLaylistTracks[]
//is this the issue @@@
async function getPlaylistItems(accessToken:string|null, id:string):Promise<Playlist> {
    //get rid of the ME !!!!!
    //const result = await fetch(`https://api.spotify.com/v1/me/playlists/4H79OTkphBH4pVyPu7aeD7/tracks`, {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });

    return await result.json();
}


async function addToPlaylist(accessToken:string|null, playlistId:string, trackId:string) {
    const trackUri = "spotify:track:" + trackId

    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: [trackUri]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Spotify API error: ${errorData.error.message}`);
        }

        return response.status === 204;

    } catch (error) {
        console.error('Error adding tracks to playlist:', error);
        throw error;
    }

}

//this is huge
async function createPlaylist(accessToken:string|null, name:string):Promise<newPlaylist> {
    const body = JSON.stringify({
        name: name,
        public: true
    });

    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: body
    });


    return result.json();
}

//accesss,name,
async function duplicatePlaylist(accessToken:string|null, name:string, playlistItems:PlaylistTracks[]) {
    const newPlaylist = await createPlaylist(accessToken, name);
    //const tracks = playlistItems.items

    
    //technically i need an item from playlist items
    //and each item has a track property
    const tracks = playlistItems
    for (const track of tracks) {
        await addToPlaylist(accessToken, newPlaylist.id, track.track.id);
        //console.log(track.track.id);
    }

    return newPlaylist
}

export { getPlaylists, getPlaylistItems, addToPlaylist, createPlaylist, duplicatePlaylist }