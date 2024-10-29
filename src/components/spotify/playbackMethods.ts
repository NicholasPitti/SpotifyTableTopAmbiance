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

async function seekToPosition(access_token:string, trackId:string) {
    console.log('hi'+access_token+trackId);
}

async function startPlayback(accessToken:string|null, playlistId:string|null, position:number,getlikes:boolean,trackId:string) {
    //`Bearer  
    //context_uri:"spotify:album:5ht7ItJgpBH7W6vJ5BqpPr"
    //let contextUri:string|null
    //let uri:string[]|null
    const contextUri:string|null=null
    const uri:string[]|null=[`spotify:track:${trackId}`]
    //const uri:string[]|null=[`spotify:track:1fURQrd4K4b43ULvwbP9oC`]
    console.log(trackId+"DIFFERENT???")

    if(getlikes){
        //console.log('hi')
        //return
        //https://api.spotify.com/v1/me/tracks?offset=0&limit=50&locale=en-US,en;q%3D0.9
        //contextUri='https://api.spotify.com/v1/me/tracks'
        //uri=[`spotify:track:${trackId}`]
        //contextUri=null
        console.log('URI')
    }else{
        //contextUri=`spotify:playlist:${playlistId}`
        //uri=null
        console.log('contextURI')
    }

    console.log(position+"as index not working for getlikes")
    const body = JSON.stringify({
        context_uri: contextUri,
        uris:uri
    });
    //@@@ rename to result
    const result = await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: body
    });

    if (!result.ok) {
        const errorText = await result.text();
        throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`);
    }

    console.log(trackId)
    return result.status === 204;
}

export { startPlayback, seekToPosition }