function getApi() {
  const layerSelect = document.getElementById("layerSelect");
  const selectedLayer = layerSelect.value;
  var gslayer;
  if (selectedLayer === "Phoenix") {
    gslayer = "Bangalore_Poi_V1.0";
  } else if (selectedLayer === "Roads") {
    gslayer = "Roads_Bangalore_V4.42";
  } else if (selectedLayer === "Nilaya") {
    gslayer = "Bangalore_BFP_Nilaya_V.3";
  }

  const form = document.getElementById("login-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const layer = form.elements.layer.value;
    const token = localStorage.getItem("access_token");
    fetch("http://10.10.5.171/maps/getapikey/", {
      method: "POST",
      body: JSON.stringify({
        layer: gslayer,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer  ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        // Store the response in a cookie
        //console.log(json.token)
        localStorage.setItem("api_key", json.key);
        const myParagraph = document.getElementById("myParagraph");
        myParagraph.innerHTML = json.key;
        console.log(json);
        //document.cookie = `access_token=${json.token}; path=/`;
        //document.cookie = `session=${JSON.stringify(json)}; path=/`;
        //console.log(`Cookie set: session=${JSON.stringify(json)}; path=/`);

        console.log(json);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}
