import {Button, React, Suspense, useRef, useState, useTranslation} from "libraries";
import GoogleMapReact from "google-map-react";
import {isValidSelectedLocation} from "utils";

const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));

const ShippingAddressLocation = (props) => {
    const { valueAddress, customerAddress, coordinates, setChooseCoordinates, handleChooseLocation } = props;
    const t = useTranslation();
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'error',
        message: 'Error'
    });
    const [addressError, setAddressError] = useState(false);
    const placeAutoCompleteInput = useRef(null);
    const placeInfoContent = useRef(null);

    const handleApiLoaded = (map, maps) => {
        const geocoder = new maps.Geocoder();
        const marker = new maps.Marker({
            map: map,
            position: coordinates.center,
            draggable: true
        });
        const infoWindow = new maps.InfoWindow();

        // Add event draggable to marker
        marker.addListener("dragend", () => {
            const locationParams = {
                location: marker.getPosition()
            };
            gecodeService(geocoder, map, marker, infoWindow, locationParams);
        });

        // Initial start position map
        const street = valueAddress // It must be get from address value
        const city = customerAddress.value.replace(/\//g, ","); // it must be get from selected city value
        const address = `${street},${city}`; // address params must be combine from street and city
        const location = {
            lat: coordinates.center.lat,
            lng: coordinates.center.lng
        }

        if (coordinates.center.lat === 0 && coordinates.center.lng === 0) {
            const addressParams = {
                address: address
            };
            gecodeService(geocoder, map, marker, infoWindow, addressParams);
        } else {
            const locationParams = {
                location: location
            };
            gecodeService(geocoder, map, marker, infoWindow, locationParams);
        }

        // Add autocomplete function
        const autocomplete = new maps.places.Autocomplete(placeAutoCompleteInput.current);
        autocomplete.bindTo("bounds", map);
        autocomplete.setFields(["place_id", "geometry", "name", "formatted_address"]);
        map.controls[maps.ControlPosition.TOP_LEFT].push(placeAutoCompleteInput.current);
        autocomplete.addListener("place_changed", () => {
            infoWindow.close();
            const place = autocomplete.getPlace();
            if (!place.place_id) {
                return;
            }
            const placeParams = { placeId: place.place_id };
            gecodeService(geocoder, map, marker, infoWindow, placeParams);
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const gecodeService = (geocoder, map, marker, infoWindow, params) => {
        const infoWindowContent = placeInfoContent.current;
        infoWindow.setContent(infoWindowContent);

        geocoder.geocode(params, (results, status) => {
            if (status === "OK") {
                const coordinate = {
                    center: {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    }
                }
                setChooseCoordinates(coordinate);
                map.setZoom(17);
                map.setCenter(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                marker.setVisible(true);

                // Show InfoWindows
                infoWindowContent.children["place-address"].textContent = results[0].formatted_address;
                infoWindow.open(map, marker);

                // Validate Selected Location
                if (!isValidSelectedLocation(results, customerAddress)) {
                    setAddressError(true);
                } else {
                    setAddressError(false);
                }
            } else {
                setSnackbar({
                    type: 'error',
                    message: `Geocode was not successful for the following reason: ${status}`
                });
                setOpen(true);
            }
        });
    }

    return(
        <Suspense fallback={null}>
            <div className={'fs-18 tx-c mb-20'}>
                <label>{t('label.labelLocation')}</label>
            </div>
            <div>
                <input
                    id="pac-input"
                    className="controls mt-10"
                    type="text"
                    placeholder={t('form.searchLocation')}
                    ref={placeAutoCompleteInput}
                />
                <div id="infowindow-content" ref={placeInfoContent}>
                    <span id="place-address"/>
                </div>
            </div>
            <div style={{ height: '45vh' }} className="mb-10">
                <GoogleMapReact
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_MAPS_API_KEY,
                        libraries: ['places', 'geometry']
                    }}
                    center={coordinates.center}
                    zoom={17}
                    yesIWantToUseGoogleMapApiInternals
                >
                </GoogleMapReact>
            </div>
            {addressError &&
            <div className={'tc-p fs-14 mb-10'}>{t('label.notMatchLocation')}</div>
            }
            <div className={'mb-20'}>
                <Button variant="outlined" onClick={handleChooseLocation} disabled={addressError}
                        className={addressError ? "choose__location__button" : "choose__location__button product__detail__button--cart"}>
                    {t('form.chooseLocation')}
                </Button>
            </div>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
        </Suspense>
    )
}

export default ShippingAddressLocation;