import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";

let latitude: number;
let longitude: number;

function App() {
  const [restaurant, setRestaurant] = useState({
    name: "pls enable location permissions...",
  });

  useLayoutEffect(() => {
    findLocation();
  })

  const successCallback = (position: GeolocationPosition) => {
    console.log("sucess location:" + position);
    updateRestaurantName('try out the button...')

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    console.log("tried name change..");
  };

  const errorCallback = (error: any) => {
    console.log("error location:" + error);
  };

  return (
    <>
      <h1>Hungry ??</h1>
      <div className="card">
        <button onClick={() => generateNewRandom()}>find something</button>
      </div>
      <h4>{restaurant.name}</h4>
    </>
  );

  function findLocation() {
    if(latitude == undefined && longitude == undefined) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  }

  function updateRestaurantName(name: string): void {
    setRestaurant({ name: name });
  }

  function generateNewRandom() {
    getRestaurants(latitude, longitude).then((data) => {
      console.log(data);

      const randomIndex = Math.floor(Math.random() * data.length);
      console.log(data[randomIndex]);
      setRestaurant({ name: data[randomIndex].tags.name });
    });
  }

  async function getRestaurants(
    latitude: number,
    longitude: number,
    range: number = 5000
  ) {
    console.log(latitude);
    console.log(longitude);

    let q =
      "data=" +
      encodeURIComponent(`
      [out:json];
      node(around:${range},${latitude},${longitude})["amenity"="restaurant"];
      out;
    `);

    let url = "https://overpass-api.de/api/interpreter?" + q;
    var response = await fetch(url, {
      method: "GET",
    });

    const data = await response.json();

    return data.elements;
  }
}

export default App;
