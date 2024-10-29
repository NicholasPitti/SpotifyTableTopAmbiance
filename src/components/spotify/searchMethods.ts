/**
curl -H "Authorization: Bearer BQDQm6A77uZiZ-DHOVOzwcR2zke8CPMV54mhM8IaKhdf2nJHzrrCKmdKOO5D4X5hadawdpIpH31qJbhowxy2zzId1rqJFhKgJYrVxjITKr4KD7Q7IPrGLXy1wQuOviqeWzIPw43WiUiXohDWt_uruTQ9xEQCOaTMaudbTsss3LI4f-LacKFxx0hZyCUty9d9wGFOxbij9y8KYoXkPUmnSbUF"
 https://api.spotify.com/v1/playlists/4H79OTkphBH4pVyPu7aeD7/tracks
 */
/*
why is const good practice
what about my solution to it needing to be dynamic?
const accessToken = await getAccessToken(clientId, code);
const accessToken = localStorage.getItem("access_token")
*/

//type track
//

//query (remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis) 
//is URL encoded, where %2520 

//track
//artist
/*
async function searchTrack(accessToken:string, track: string,artist:string):Promise<PlaylistTracks> {

    const result = await fetch(`https://api.spotify.com/v1/search?q=%2520+track%${track}%2520artist%${artist}&type=track`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });

    return await result.json();
}
*/

//i know this is obvious but, there can be multiple artists Artists[0] gets the first
export interface Artists{
    href:string,
    id:string,
    name:string
    uri:string
}

export interface TrackItems{
    artists: Artists[]
    href:string
    id: string,
    name:string
    type: string,
    uri: string
}

export interface SearchedTracks{
    href: string,
    tracks: {
        items: TrackItems[]
    }
  }



async function searchTrack(accessToken: string, track: string, artist: string): Promise<SearchedTracks> {
    const encodedTrack = encodeURIComponent(track);
    const encodedArtist = encodeURIComponent(artist);
    const url = `https://api.spotify.com/v1/search?q=track:${encodedTrack} artist:${encodedArtist}&type=track`;

    try {
        const result = await fetch(url, {
            method: "GET",
            headers: { 
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }

        return await result.json();
    } catch (error) {
        console.error("Error fetching track:", error);
        throw error;
    }
}

export { searchTrack }