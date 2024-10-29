
async function seekToPosition(access_token:string, trackId:string) {
    console.log('hi'+access_token+trackId);
}

async function startPlayback(accessToken:string|null, playlistId:string|null, position:number,getlikes:boolean,trackId:string) {
    let contextUri:string|null=null
    let uri:string[]|null=[`spotify:track:${trackId}`]
    console.log(trackId+"DIFFERENT???")

    if(getlikes){
        //contextUri='https://api.spotify.com/v1/me/tracks'
        uri=[`spotify:track:${trackId}`]
        contextUri=null
        console.log('using URI')
    }else{
        contextUri=`spotify:playlist:${playlistId}`
        uri=null
        console.log('using contextURI')
    }

    console.log(position+"as index not working for getlikes")
    const body = JSON.stringify({
        context_uri: contextUri,
        uris:uri
    });
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