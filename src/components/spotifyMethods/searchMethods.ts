
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
    //const track=await searchTrack(accessToken,"3's & 7's","Queens of the Stone Age",0)
    //track="3's & 7's"
    //artist="Queens of the Stone Age"
    ///console.log(track)
    const encodedTrack = encodeURIComponent(track)
    //const encodedArtist = encodeURIComponent(artist)
    
    //let queryOptions=''
    const queryOptions=`track:${encodedTrack}`
/*
    if(option===0){
        queryOptions=`track:${encodedTrack}`
    }else if(option===1){
        queryOptions=`artist:${encodedArtist}`
    }else{
        console.log('invalid option')
    }
*/

 ///console.log(queryOptions)
    const url = `https://api.spotify.com/v1/search?q=${queryOptions}&type=track&limit=10`
 //const url = `https://api.spotify.com/v1/search?q=Alchemist&type=track`
//const url = `https://api.spotify.com/v1/search?q=track:${encodedTrack}%20artist:${encodedArtist}&type=track`

    try {
        const result = await fetch(url, {
            method: "GET",
            headers: { 
                'Authorization': `Bearer ${accessToken}`
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

    //const url = `https://api.spotify.com/v1/search?q=${queryOptions1}${queryOptions2}type=track&limit=20`
    //const url = `https://api.spotify.com/v1/search?q=remaster%20track:Doxy%20 artist:Miles%20Davis`
//const url='https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis'