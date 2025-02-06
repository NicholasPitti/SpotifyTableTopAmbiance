
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

  //option 1 is track search
  //option 2 is artist search
async function searchTrack(accessToken: string, track: string, artist: string,option:number): Promise<SearchedTracks> {
    const encodedTrack = encodeURIComponent(track)
    console.log(encodedTrack)
    const encodedArtist = encodeURIComponent(artist)
    let queryOptions:string=""
    if(option===0){
        queryOptions=`track:${encodedTrack}&type=track&limit=20`
    }else if(option===1){
        queryOptions=`artist:${encodedArtist}&type=track&limit=20`
    }else{
        console.log('invalid option')
    }

    const url = `https://api.spotify.com/v1/search?q=track:${queryOptions}`

    try {
        const result = await fetch(url, {
            method: "GET",
            headers: { 
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })

        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`)
        }

        return await result.json()
    } catch (error) {
        console.error("Error fetching track:", error)
        throw error
    }
}

export { searchTrack }