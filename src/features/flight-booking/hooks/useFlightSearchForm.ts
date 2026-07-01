import { useFlightSearchStore } from '../store/useFlightSearchStore';

const formatDateToBackend = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  const shortYear = year.slice(-2);
  return `${month}/${day}/${shortYear}`;
};

export function useFlightSearchForm() {
  const store = useFlightSearchStore();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.setValidationError(null);

    // Validate inputs
    if (store.tripType !== 'multicity') {
      if (!store.origin) {
        store.setValidationError('Please select an origin airport.');
        return;
      }
      if (!store.destination) {
        store.setValidationError('Please select a destination airport.');
        return;
      }
      if (!store.departDate) {
        store.setValidationError('Please select a departure date.');
        return;
      }
      
      const today = new Date();
      today.setHours(0,0,0,0);
      const selectedDepart = new Date(store.departDate);
      selectedDepart.setMinutes(selectedDepart.getMinutes() + selectedDepart.getTimezoneOffset());
      selectedDepart.setHours(0,0,0,0);
      
      if (selectedDepart < today) {
        store.setValidationError('Departure date cannot be in the past.');
        return;
      }

      if (store.tripType === 'round' && !store.returnDate) {
        store.setValidationError('Please select a return date.');
        return;
      }
    } else {
      // Multi-city validation
      for (let i = 0; i < store.multiFlights.length; i++) {
        const seg = store.multiFlights[i];
        if (!seg.origin || !seg.destination || !seg.date) {
          store.setValidationError(`Please complete all fields for Flight Segment #${i + 1}.`);
          return;
        }
      }
    }

    // Build URLSearchParams
    const params = new URLSearchParams();
    params.set('type', store.tripType);
    params.set('cabin', store.cabin);
    if (store.preferredAirline) params.set('airline', store.preferredAirline);
    params.set('adults', String(store.adults));
    if (store.childrenCount > 0) {
      params.set('children', String(store.childrenCount));
      params.set('childages', store.childAges.join(','));
    }
    if (store.infants > 0) params.set('infants', String(store.infants));
    if (store.directFlights) params.set('direct', '1');
    if (store.flexibleDates) params.set('flex', '1');
    
    if (store.tripType !== 'multicity') {
      params.set('origin', store.origin);
      params.set('destination', store.destination);
      params.set('depart', formatDateToBackend(store.departDate));
      if (store.nearOrigin) params.set('nearOrigin', '1');
      if (store.nearDest) params.set('nearDest', '1');
      if (store.tripType === 'round') params.set('return', formatDateToBackend(store.returnDate));
    } else {
      // Map multi flights
      store.multiFlights.forEach((flight, idx) => {
        params.set(`origin_${idx}`, flight.origin);
        params.set(`destination_${idx}`, flight.destination);
        params.set(`depart_${idx}`, formatDateToBackend(flight.date));
      });
    }

    // Redirect to local flight list with params
    window.location.href = `/flights?${params.toString()}`;
  };

  const handleSwap = () => {
    const tempOrigin = store.origin;
    const tempOriginName = store.originName;
    store.setOrigin(store.destination, store.destinationName);
    store.setDestination(tempOrigin, tempOriginName);
  };

  return {
    ...store,
    handleSearchSubmit,
    handleSwap,
  };
}
