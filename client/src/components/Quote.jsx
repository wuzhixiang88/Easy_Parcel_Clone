import React, { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const STANDARD_RATE = 0.3;

const Quote = ({ showPage, setShowPage, setQuotation, setDuration }) => {
  const [distance, setDistance] = useState();
  const [parcelWeight, setParcelWeight] = useState();

  const mapRef = useRef();
  const inputLocationARef = useRef();
  const inputLocationBRef = useRef();

  const handleParcelWeightInput = (e) => {
    setParcelWeight(e.target.value);
  };

  const handleClickRequestQuotation = () => {
    const distanceInNum = Number(distance.split(" ")[0]);
    const quotePrice = distanceInNum * parcelWeight * STANDARD_RATE;

    setShowPage({ ...showPage, showQuote: true });
    setQuotation(quotePrice.toFixed(2));
  };

  useEffect(() => {
    (async () => {
      const loader = new Loader({
        apiKey: "AIzaSyBpIWS_8jsYNEW7R5-e0G43TZiIHdkg914",
        version: "weekly",
        libraries: ["places"],
      });

      const mapOptions = {
        center: {
          lat: 1.3521,
          lng: 103.8198,
        },
        zoom: 12,
      };

      if (mapRef.current) {
        const google = await loader.load();
        const map = new google.maps.Map(mapRef.current, mapOptions);

        // Create the search box and link it to the UI element.
        const searchBoxA = new google.maps.places.SearchBox(
          inputLocationARef.current
        );
        const searchBoxB = new google.maps.places.SearchBox(
          inputLocationBRef.current
        );

        // Bias the SearchBox results towards current map's viewport.
        map.addListener("bounds_changed", () => {
          searchBoxA.setBounds(map.getBounds());
          searchBoxB.setBounds(map.getBounds());
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();

        // Existing map object displays directions
        directionsRenderer.setMap(map);

        const displayRoute = () => {
          const locationA = searchBoxA.getPlaces();
          const locationB = searchBoxB.getPlaces();

          // Create route from existing points used for markers
          const route = {
            origin: {
              lat: locationA[0].geometry.location.lat(),
              lng: locationA[0].geometry.location.lng(),
            },
            destination: {
              lat: locationB[0].geometry.location.lat(),
              lng: locationB[0].geometry.location.lng(),
            },
            travelMode: "DRIVING",
          };

          directionsService.route(route, function (response, status) {
            // anonymous function to capture directions
            if (status !== "OK") {
              window.alert("Directions request failed due to " + status);
              return;
            } else {
              directionsRenderer.set("directions", null); // Clear previous directions result
              directionsRenderer.setDirections(response); // Add route to the map

              const directionsData = response.routes[0].legs[0]; // Get data about the mapped route
              if (!directionsData) {
                window.alert("Directions request failed");
                return;
              } else {
                setDistance(directionsData.distance.text);
                setDuration(directionsData.duration.text);
              }
            }
          });
        };

        // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
        searchBoxA.addListener("places_changed", () => {
          searchBoxB.addListener("places_changed", displayRoute);
        });
        searchBoxB.addListener("places_changed", () => {
          searchBoxA.addListener("places_changed", displayRoute);
        });
      }
    })();
  }, []);

  return (
    <div>
      <div id="quote">
        <h3>quote component</h3>

        <div>
          <input
            ref={inputLocationARef}
            id="pac-input"
            class="controls"
            type="text"
            placeholder="Origin"
          />
          <input
            ref={inputLocationBRef}
            id="pac-input2"
            class="controls"
            type="text"
            placeholder="Destination"
          />
          <div ref={mapRef} id="map" style={{ display: "none" }}></div>
        </div>

        <input disabled type="text" placeholder="Distance" value={distance} />
        <br />

        <input
          type="number"
          placeholder="Parcel Weight (kg)"
          value={parcelWeight}
          onChange={handleParcelWeightInput}
        />
        <br />
        <button onClick={handleClickRequestQuotation}>Quote</button>
        <br />
      </div>
    </div>
  );
};

export default Quote;
