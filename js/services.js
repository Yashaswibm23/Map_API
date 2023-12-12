// function showlayer() {
//     const form = document.getElementById('api-form');

//             form.addEventListener('submit', (event) => {
//                 event.preventDefault();

//                 const api_key = form.elements.api.value;

//                 fetch(`http://10.10.7.21:8002/account/verifyapikey/?api_key=${api_key}`, {
//                   method: 'POST',
//                   body: JSON.stringify({
//                 //   access_layer:
//                   api_key: api_key,
//                   }),
//                   headers: {
//                     'Content-type': 'application/json; charset=UTF-8',
//                   },
//                 })
//                   .then((response) => {
//                     // console.log(detail)
//                     // console.log(response)
//                     if (response.ok) {
//                       window.location.href = 'index.html';
//                     }

//                     return (response.json());
//                   })
//                   .then((json) => {
//                     alert(json.detail);
//                     // console.log(json.details);
//                   })
//                   .catch((error) => {
//                     console.log('Error:', error);
//                     alert(error.response.json().detail);
//                   });
//               });
//             }

function showLayerDetails(access_layer) {
  const api_key = document.getElementById("api-form").elements.api.value;
  const token = localStorage.getItem("access_token");
  fetch(`http://10.10.2.36:8000/account/verifyapikey/?api_key=${api_key}`, {
    method: "POST",
    body: JSON.stringify({
      access_layer: access_layer,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `token ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if ("detail" in data) {
        if (
          data.detail === "You do not have permission to perform this action."
          ) {
            const errorMessage = document.getElementById("errormsg");
            errorMessage.innerHTML ="";
            if (access_layer ==="POI_BANGALORE"){
              const errorMessage = document.getElementById("phoenixError");
              errorMessage.innerHTML ="You do not have permission to view Phoenix.";
            }
            else if (access_layer ==="Roads_Bangalore_V4.42"){
              const errorMessage = document.getElementById("roadError");
              errorMessage.innerHTML ="You do not have permission to view Roads.";

            }
            else if (access_layer ==="BUILDINGS_NILAYA_BANGALORE"){
              const errorMessage = document.getElementById("nilayaError");
              errorMessage.innerHTML ="You do not have permission to view Nilaya.";

            }
          // const errorMessage = document.getElementById("phoenixError");
          // errorMessage.innerHTML ="You do not have permission to perform this action.";
        } else if (data.detail === "Please enter API Key."
        ) {
          console.log('hello')
          const errorMessage = document.getElementById("errormsg");
          errorMessage.innerHTML ="Please enter API Key.";
          //alert("Please enter API Key.");
          
        } else if (data.detail === "access granted"
        ) {
          window.location.href = "layers.html";
          
        }
         else {
          console.log(data)
          const errorMessage = document.getElementById("errormsg");
          errorMessage.innerHTML = "Please enter the correct api key.";
        }
      } else {
        //localStorage.setItem("access_token", data.tokens.access);
        window.location.href = "index.html";
      }
    })
    // .then((response) => {
    //   if (response.ok) {
    //     window.location.href = "index.html";
    //   } else {
    //     console.log(response.detail);
    //   }
    //   return response.json();
    // })
    // .then((json) => {
    //   // alert(json.detail);
    //   const errorMessage = document.getElementById('errormsg');
    //   errorMessage.innerHTML = json.detail;
    // })
    .catch((error) => {
      console.log("Error:", error);
      //alert(error.response.json().detail);
    });
}
