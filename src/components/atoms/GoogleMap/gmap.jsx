import { useRef, useEffect, useState } from "react";
export const MAP_KEY = import.meta.env.VITE_MAP_API_KEY;


const GMapDetails = ( zip, id ) => {
  const mapRef = useRef(null);
  const [showError, setShowError] = useState("");

  useEffect(() => {
    if (mapRef.current) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}`;
      script.async = true;
      script.onload = () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: zip?.bzip }, (results, status) => {
          if (status === "OK") {
            setShowError("");
            const location = results[0].geometry.location;
            const map = new window.google.maps.Map(mapRef.current, {
              center: location,
              zoom: 18,
            });
            const marker = new window.google.maps.Marker({
              position: location,
              map,
              title: "Listing location",
            });
          } else if (
            status === "ZERO_RESULTS" ||
            status === "INVALID_REQUEST"
          ) {
            setShowError("ZERO_RESULTS");
            const location = new window.google.maps.LatLng(
              29.619652,
              -81.180978
            );
            const map = new window.google.maps.Map(mapRef.current, {
              center: location,
              zoom: 4,
            });
            // const marker = new window.google.maps.Marker({
            //   position: location,
            //   map,
            //   title: "Listing location",
            // });
          }
        });
      };
      document.body.appendChild(script);
    }
  }, [zip, id]);

  useEffect(() => {
    setShowError("");
  }, [zip]);

  return (
    <div>
      {showError === "ZERO_RESULTS" || showError === "INVALID_REQUEST" ? (
        // <div
        //   className="d-flex justify-content-center align-items-center "
        //   style={{ height: "400px", pointerEvents: "none" }}
        // >
        //   Zip code is incorrect
        // </div>
        <div style={{ height: "400px" }} ref={mapRef}></div>
      ) : (
        <div style={{ height: "400px" }} ref={mapRef}></div>
      )}
    </div>
  );
};
export default GMapDetails;
