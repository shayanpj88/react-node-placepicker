import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        // navigator.geolocation.getCurrentPosition((position) => {
        //   const sortedLocations = sortPlacesByDistance(
        //     places,
        //     position.coords.latitude,
        //     position.coords.longitude
        //   );
        //   setAvailablePlaces(sortedLocations);
        //   setIsFetching(false);
        // });
        setAvailablePlaces(places);
        setIsFetching(false);
      } catch (error) {
        setError({
          message: error.message || "Fetching Error.",
        });
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error accured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
