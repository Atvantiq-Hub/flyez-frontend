import { create } from 'zustand';

export interface MultiCityFlight {
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  date: string;
}

interface FlightSearchState {
  tripType: 'round' | 'one' | 'multicity';
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  departDate: string;
  returnDate: string;
  cabin: string;
  preferredAirline: string;
  adults: number;
  childrenCount: number;
  childAges: string[];
  infants: number;
  directFlights: boolean;
  flexibleDates: boolean;
  nearOrigin: boolean;
  nearDest: boolean;
  validationError: string | null;
  multiFlights: MultiCityFlight[];

  setTripType: (type: 'round' | 'one' | 'multicity') => void;
  setOrigin: (origin: string, originName?: string) => void;
  setDestination: (destination: string, destinationName?: string) => void;
  setDepartDate: (date: string) => void;
  setReturnDate: (date: string) => void;
  setCabin: (cabin: string) => void;
  setPreferredAirline: (airline: string) => void;
  setAdults: (adults: number) => void;
  setChildrenCount: (count: number) => void;
  setChildAges: (ages: string[]) => void;
  setInfants: (infants: number) => void;
  setDirectFlights: (direct: boolean) => void;
  setFlexibleDates: (flexible: boolean) => void;
  setNearOrigin: (near: boolean) => void;
  setNearDest: (near: boolean) => void;
  setValidationError: (error: string | null) => void;
  setMultiFlights: (flights: MultiCityFlight[]) => void;
  addMultiFlight: () => void;
  removeMultiFlight: (index: number) => void;
  updateMultiFlight: (index: number, field: 'origin' | 'destination' | 'date', code: string, name?: string) => void;
  resetSearch: () => void;
}

export const useFlightSearchStore = create<FlightSearchState>((set, get) => ({
  tripType: 'round',
  origin: 'JFK',
  originName: 'New York John F. Kennedy (JFK)',
  destination: 'LAX',
  destinationName: 'Los Angeles International (LAX)',
  departDate: '',
  returnDate: '',
  cabin: 'E',
  preferredAirline: '',
  adults: 1,
  childrenCount: 0,
  childAges: [],
  infants: 0,
  directFlights: false,
  flexibleDates: false,
  nearOrigin: false,
  nearDest: false,
  validationError: null,
  multiFlights: [
    { origin: '', originName: '', destination: '', destinationName: '', date: '' },
    { origin: '', originName: '', destination: '', destinationName: '', date: '' }
  ],

  setTripType: (tripType) => set({ tripType }),
  setOrigin: (origin, originName = '') => set({ origin, originName }),
  setDestination: (destination, destinationName = '') => set({ destination, destinationName }),
  setDepartDate: (departDate) => set({ departDate }),
  setReturnDate: (returnDate) => set({ returnDate }),
  setCabin: (cabin) => set({ cabin }),
  setPreferredAirline: (preferredAirline) => set({ preferredAirline }),
  setAdults: (adults) => set({ adults }),
  setChildrenCount: (childrenCount) => set({ childrenCount }),
  setChildAges: (childAges) => set({ childAges }),
  setInfants: (infants) => set({ infants }),
  setDirectFlights: (directFlights) => set({ directFlights }),
  setFlexibleDates: (flexibleDates) => set({ flexibleDates }),
  setNearOrigin: (nearOrigin) => set({ nearOrigin }),
  setNearDest: (nearDest) => set({ nearDest }),
  setValidationError: (validationError) => set({ validationError }),
  setMultiFlights: (multiFlights) => set({ multiFlights }),

  addMultiFlight: () => {
    const { multiFlights } = get();
    if (multiFlights.length >= 5) return;
    set({
      multiFlights: [
        ...multiFlights,
        { origin: '', originName: '', destination: '', destinationName: '', date: '' }
      ]
    });
  },

  removeMultiFlight: (index) => {
    const { multiFlights } = get();
    if (multiFlights.length <= 2) return;
    set({
      multiFlights: multiFlights.filter((_, idx) => idx !== index)
    });
  },

  updateMultiFlight: (index, field, code, name) => {
    const { multiFlights } = get();
    const updated = [...multiFlights];
    
    updated[index] = {
      ...updated[index],
      [field]: code,
      ...(name ? { [`${field}Name`]: name } : {})
    };
    
    set({ multiFlights: updated });
  },

  resetSearch: () => set({
    tripType: 'round',
    origin: '',
    originName: '',
    destination: '',
    destinationName: '',
    departDate: '',
    returnDate: '',
    cabin: 'E',
    preferredAirline: '',
    adults: 1,
    childrenCount: 0,
    childAges: [],
    infants: 0,
    directFlights: false,
    flexibleDates: false,
    nearOrigin: false,
    nearDest: false,
    validationError: null,
    multiFlights: [
      { origin: '', originName: '', destination: '', destinationName: '', date: '' },
      { origin: '', originName: '', destination: '', destinationName: '', date: '' }
    ],
  })
}));
