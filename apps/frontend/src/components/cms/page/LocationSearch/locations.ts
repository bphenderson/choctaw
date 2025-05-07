export interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  note?: string;
  type?: "bank" | "credit-union" | "financial-group";
}

export const locations: Location[] = [
  {
    name: "Crescent Valley Bank",
    address: "1234 Moonlight Drive, Silverton, CA 90210",
    latitude: 34.0901,
    longitude: -118.4065,
    type: "bank",
    note: "",
  },
  {
    name: "Horizon Trust Bank",
    address: "5678 Starfield Avenue, Bluemont, TX 75001",
    latitude: 32.9476,
    longitude: -96.8035,
    note: "Assumed Bluemont as Addison, TX based on ZIP 75001",
  },
  {
    name: "Oakwood Financial",
    address: "9101 Maple Grove Lane, Greenhaven, NY 10012",
    latitude: 40.7267,
    longitude: -73.9981,
    note: "Assumed Greenhaven as New York, NY (Greenwich Village) based on ZIP 10012",
  },
  {
    name: "Pinnacle Savings Bank",
    address: "3456 Riverstone Road, Clearview, FL 33101",
    latitude: 25.7615,
    longitude: -80.2939,
    note: "Assumed Clearview as Miami, FL based on ZIP 33101",
  },
  {
    name: "Summit Commerce Bank",
    address: "7890 Cedar Crest Boulevard, Hilldale, IL 60614",
    latitude: 41.9211,
    longitude: -87.6486,
    note: "Assumed Hilldale as Chicago, IL (Lincoln Park) based on ZIP 60614",
  },
  {
    name: "Blue Harbor Bank",
    address: "2345 Ocean Breeze Way, Coralton, WA 98101",
    latitude: 47.6101,
    longitude: -122.3344,
    note: "Assumed Coralton as Seattle, WA based on ZIP 98101",
  },
  {
    name: "Golden Anchor Bank",
    address: "6789 Sunridge Parkway, Amberfield, AZ 85004",
    latitude: 33.4486,
    longitude: -112.074,
    note: "Assumed Amberfield as Phoenix, AZ based on ZIP 85004",
  },
  {
    name: "Evergreen Community Bank",
    address: "1213 Pine Hollow Court, Forestville, CO 80203",
    latitude: 39.7358,
    longitude: -104.9788,
    note: "Assumed Forestville as Denver, CO based on ZIP 80203",
  },
  {
    name: "Starlight Credit Union",
    address: "4567 Twilight Lane, Dawnview, GA 30303",
    latitude: 33.755,
    longitude: -84.388,
    type: "credit-union",
    note: "Assumed Dawnview as Atlanta, GA based on ZIP 30303",
  },
  {
    name: "Unity National Bank",
    address: "8901 Harmony Street, Bridgeport, OH 44114",
    latitude: 41.5055,
    longitude: -81.6858,
    note: "Assumed Bridgeport as Cleveland, OH based on ZIP 44114",
  },
  {
    name: "Sapphire Financial Group",
    address: "3214 Crystal Road, Lakemont, NV 89109",
    latitude: 36.1268,
    longitude: -115.1718,
    type: "financial-group",
    note: "Assumed Lakemont as Las Vegas, NV based on ZIP 89109",
  },
  {
    name: "Liberty Heritage Bank",
    address: "5670 Freedom Plaza, Patriotville, MA 02108",
    latitude: 42.3588,
    longitude: -71.0578,
    note: "Assumed Patriotville as Boston, MA based on ZIP 02108",
  },
];
