import React, { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const STANDARD_RATE = 0.3;

const Quote = ({
  showPage,
  setShowPage,
  setQuotation,
  setDuration,
  setLocation,
  parcelWeight,
  setParcelWeight,
}) => {
  const [distance, setDistance] = useState();
  const mapRef = useRef();
  const inputLocationARef = useRef();
  const inputLocationBRef = useRef();
  const [errors, setErrors] = useState({});

  const findFormErrors = () => {
    const newErrors = {};

    // pickup point errors
    if (
      !inputLocationARef.current.value ||
      inputLocationARef.current.value === ""
    ) {
      newErrors.origin = "Pickup point cannot be blank!";
    }
    // dropoff point errors
    if (
      !inputLocationBRef.current.value ||
      inputLocationBRef.current.value === ""
    ) {
      newErrors.destination = "Dropoff point cannot be blank!";
    }
    // parcel weight errors
    if (!parcelWeight || parcelWeight === "") {
      newErrors.parcelWeight = "Parcel weight cannot be blank!";
    } else if (parcelWeight > 20) {
      newErrors.parcelWeight = "Parcel weight cannot exceed 20 kg!";
    }

    return newErrors;
  };

  const handleParcelWeightInput = (e) => {
    setParcelWeight(e.target.value);
  };

  const handleClickRequestQuotation = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const distanceInNum = Number(distance.split(" ")[0]);
      const quotePrice = distanceInNum * parcelWeight * STANDARD_RATE;

      setShowPage({ ...showPage, showQuote: true });
      setQuotation(quotePrice.toFixed(2));
      setErrors({});
    }
  };

  useEffect(() => {
    (async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GMAP_API_KEY,
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
                setLocation({
                  origin: inputLocationARef.current.value,
                  destination: inputLocationBRef.current.value,
                });
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
  }, [setDuration, setLocation]);

  const style = {
    color: "red",
    marginLeft: "0.5rem",
  };

  return (
    <div>
      <div id="quote">
        <Form>
          <h4 className="quote-header">
            Enter Pickup, Dropoff & Parcel Weight
          </h4>
          <Form.Group>
            <Form.Control
              ref={inputLocationARef}
              id="pac-input"
              className="input-group"
              type="text"
              placeholder="Pickup Point"
              isInvalid={!!errors.origin}
            />
            <Form.Control.Feedback type="invalid" style={style}>
              {errors.origin}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              ref={inputLocationBRef}
              id="pac-input2"
              className="input-group"
              type="text"
              placeholder="Dropoff Point"
              isInvalid={!!errors.destination}
            />
            <Form.Control.Feedback type="invalid" style={style}>
              {errors.destination}
            </Form.Control.Feedback>
          </Form.Group>
          <div ref={mapRef} id="map" style={{ display: "none" }}></div>
          <Form.Group>
            <Form.Control
              disabled
              type="text"
              placeholder="Distance (Auto)"
              value={distance}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="number"
              className="input-group"
              placeholder="Parcel Weight (Kg)"
              value={parcelWeight}
              onChange={handleParcelWeightInput}
              isInvalid={!!errors.parcelWeight}
            />
            <Form.Control.Feedback type="invalid" style={style}>
              {errors.parcelWeight}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group style={{ marginLeft: "-5px" }}>
            <Button
              type="submit"
              variant="secondary"
              onClick={handleClickRequestQuotation}
            >
              Quote
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Quote;
