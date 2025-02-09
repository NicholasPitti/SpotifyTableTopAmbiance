
const scope = "user-read-private user-read-email user-library-read playlist-read-private user-modify-playback-state playlist-modify-public"
import { useAccessTokenStore } from '@/stores/accessToken'
/**
    async checkAndGetAccessToken(){ //refreshing an api call while no acces Token will trigger this.. is there a way to pause that like a modal subroutine?
      if(this.token===0){
        await  this.reAuthenticateToken; //call method of this object
      }
    },
    async reAuthenticateToken(){
      await
      redirectToAuthCodeFlow(clientId);//get verifier
      //updat token after getting verifier
      this.token = 
    }
 */

    /*
export async function getOrRetrieveAccessToken(clientId: string, code: string) {

}
*/

export async function redirectToAuthCodeFlow(clientId:string) {
    const verifier = generateCodeVerifier(128)
    const challenge = await generateCodeChallenge(verifier)

    localStorage.setItem("verifier", verifier)

    const params = new URLSearchParams()
    params.append("client_id", clientId)
    params.append("response_type", "code")
    params.append("redirect_uri", "http://localhost:5173/callback")
    params.append("scope", scope)
    params.append("code_challenge_method", "S256")
    params.append("code_challenge", challenge)

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`


}

export function generateCodeVerifier(length:number) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

export async function generateCodeChallenge(codeVerifier:string) {
    const data = new TextEncoder().encode(codeVerifier)
    const digest = await window.crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
}

//This function sets the value of the store and does not return the access token
//This funciton is called in App.vue to initialize the store
export async function getAccessToken(clientId:string, code:string) {

    const storeToken = useAccessTokenStore()
    const verifier = localStorage.getItem("verifier")
    const redirectUri = "http://localhost:5173/callback"

    const body = new URLSearchParams()
    body.append("client_id", clientId)
    body.append("grant_type", "authorization_code")
    body.append("code", code)
    body.append("redirect_uri", redirectUri)
    body.append("code_verifier", verifier!)

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })

        if (!response.ok) {
            const responseText = await response.text()
            throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`)
        }

        const data = await response.json()

        if (data.access_token) {
            const accessToken = data.access_token
            storeToken.storedToken=accessToken //set store to accessToken
        } else {
            throw new Error("No access token in response")
        }
    } catch (error) {
        console.error("Error fetching access token:", error)
        throw error
    }

}