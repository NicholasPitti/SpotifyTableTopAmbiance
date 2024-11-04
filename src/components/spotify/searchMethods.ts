
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
    const encodedTrack = encodeURIComponent(track)
    const encodedArtist = encodeURIComponent(artist)
    const url = `https://api.spotify.com/v1/search?q=track:${encodedTrack} artist:${encodedArtist}&type=track`

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