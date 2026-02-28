
async function fetchCredibility(data){
    resp = await fetch("https://resectional-ruttily-gaylene.ngrok-free.dev/ans",{
      method: 'POST', // *MUST* be 'POST' or another method that allows a body
      headers: {
        'Content-Type':'application/json' // Inform the server the body is JSON
      },
      body: JSON.stringify(data)// Convert the JavaScript object to a JSON string
    })
    if (resp){ 
      return resp.json() // Parse the response as JSON and return it
    }
    else {
      return null // Return null if the response is not successful
    }

}

module.exports = {
    fetchCredibility
}