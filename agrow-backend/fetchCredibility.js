const { response } = require("express");

async function fetchCredibility(data){
    resp = await fetch("https://resectional-ruttily-gaylene.ngrok-free.dev/ans",{
      method: 'POST', // *MUST* be 'POST' or another method that allows a body
      headers: {
        'Content-Type':'application/json' // Inform the server the body is JSON
      },
      body: JSON.stringify(data)// Convert the JavaScript object to a JSON string
    }).then(response => response.json()).catch(error =>{
        console.error('Error:', error);
    });
    return resp;

}

module.exports = {
    fetchCredibility
}