
//is blend about vol exclusively

//start w onStart event
//how to make a track check inside playlist only so that flaged tracks(w bad intro/outros) get set to a point(onStart/onFinishing event listen?)
//onFinishing once it reaches a point in the player itll skip to next song
async function seekToPosition(accessToken:string, trackId:string) {
    console.log('hi'+accessToken+trackId)
}


async function addToQueue(accessToken:string, trackId:string) {
    //console.log("passed track id:"+trackId)
    const uri:string|null=`spotify:track:${trackId}`
    //this specific Spotify API endpoint because it expects query parameters, not a request body
    const url = new URL('https://api.spotify.com/v1/me/player/queue');
    url.searchParams.append('uri', uri);
    const result = await fetch(url, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        //body: body
    })

    if (!result.ok) {
        const errorText = await result.text()
        throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`)
    }

    return result.status === 204
}


async function startPlayback(accessToken:string|null, playlistId:string|null, position:number,getLikes:boolean,trackId:string) {
    //console.log("passed track id:"+trackId)

    const contextUri:string|null=null
    const uri:string[]|null=[`spotify:track:${trackId}`]
    //let uri:string[]|null=null
    //console.log(trackId+"DIFFERENT???")

    //getLikes=true
    /*
    if(getLikes){
        //contextUri='https://api.spotify.com/v1/me/tracks'
        uri=[`spotify:track:${trackId}`]
        contextUri=null
        console.log('using URI')
    }else{
        contextUri=`spotify:playlist:${playlistId}:${trackId}`
        uri=null
        console.log('using contextURI')
    }
*/
    //console.log(position+"as index not working for getlikes")

    
    const body = JSON.stringify({
        context_uri: contextUri,
        uris:uri
    })
    const result = await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: body
    })

    if (!result.ok) {
        const errorText = await result.text()
        throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`)
    }

    
    return result.status === 204
}

export { startPlayback, seekToPosition,addToQueue }