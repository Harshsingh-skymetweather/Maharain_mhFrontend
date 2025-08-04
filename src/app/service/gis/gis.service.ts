import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GisService {

  private districts: { [key: string]: string } = {
    'Nagpur': 'Nagpur',
    'Kolhapur': 'Kolhapur',
    'Buldhana': 'Buldana',
    'Latur': 'Latur',
    'Osmanabad': 'Osmanabad',
    'Wardha': 'Wardha',
    'Amravati': 'Amravati',
    'Akola': 'Akola',
    'Palghar': 'Palghar',
    'Aurangabad': 'Aurangabad',
    'ch.sambhajinagar': 'Aurangabad',
    'Thane': 'Thane',
    'Nasik': 'Nashik',
    'Satara': 'Satara',
    'Nandurbar': 'Nandurbar',
    'Raigadh': 'Raigarh',
    'Ahamadnagar': 'Ahmadnagar',
    'Sangli': 'Sangli',
    'Dhule': 'Dhule',
    'Bhandara': 'Bhandara',
    'Nanded': 'Nanded',
    'Chandrapur': 'Chandrapur',
    'Sindhudurg': 'Sindhudurg',
    'Parabhani': 'Parbhani',
    'Hingoli': 'Hingoli',
    'Yavatmal': 'Yavatmal',
    'Beed': 'Bid',
    'Ratnagiri': 'Ratnagiri',
    'Mumbai Suburban': 'Mumbai Suburban',
    'Solapur': 'Solapur',
    'Pune': 'Pune',
    'Gadchiroli': 'Gadchiroli',
    'Jalgaon': 'Jalgaon',
    'Gondia': 'Gondiya',
    'Jalna': 'Jalna',
    'Washim': 'Washim'
  };

  private lonLat: { [key: string]: [number, number] } = {
    "Ahmadnagar": [74.67785981788, 19.204129866934],
    "Akola": [77.0586722531298, 20.749471519275],
    "Amravati": [77.5728873404755, 21.1882651723921],
    "Aurangabad": [75.2831823744114, 20.0290602306744],
    "ch.sambhajinagar": [75.2831823744114, 20.0290602306744],
    "Bhandara": [79.7649978642666, 21.1147578743957],
    "Bid": [75.8395029344793, 18.9477210666198],
    "Buldana": [76.4091795896147, 20.5116228290047],
    "Chandrapur": [79.4441356363333, 20.1184819297135],
    "Dhule": [74.6020470390206, 21.1104265394433],
    "Gadchiroli": [80.2413419910824, 19.7856130438498],
    "Gondiya": [80.2177082798815, 21.1620861903357],
    "Hingoli": [77.1056873636471, 19.6429300780154],
    "Jalgaon": [75.4903288421292, 20.9364902269508],
    "Jalna": [75.9826112716331, 19.8078348688187],
    "Kolhapur": [74.1616428744309, 16.4692353884841],
    "Latur": [76.7616892515605, 18.3748239766441],
    "Mumbai": [72.8306387752116, 18.9682520250296],
    "Mumbai Suburban": [72.889054748515, 19.1173043199745],
    "Nagpur": [79.0882045020241, 21.17697811496],
    "Nanded": [77.6246602835126, 19.1166304751378],
    "Nandurbar": [74.2199265079155, 21.5503421908388],
    "Nashik": [74.0724853711924, 20.2597963744019],
    "Osmanabad": [76.0396577545284, 18.1898254285223],
    "Palghar": [73.0176633397987, 19.7875641145141],
    "Parbhani": [76.6970272798187, 19.2693350463251],
    "Pune": [74.0701176973828, 18.5716028171501],
    "Raigadh": [73.2241025174191, 18.5115356270008],
    "Raigarh": [73.2241025174191, 18.5115356270008],
    "Ratnagiri": [73.4577940756644, 17.2738550750167],
    "Sangli": [74.7717101301966, 17.1130601782317],
    "Satara": [74.1745038106732, 17.6692141512365],
    "Sindhudurg": [73.7417244135335, 16.1342746905678],
    "Solapur": [75.4847206062335, 17.7920552664447],
    "Thane": [73.3251989221807, 19.3567868707731],
    "Wardha": [78.5883188921866, 20.7964224167491],
    "Washim": [77.2158067358588, 20.2329731861582],
    "Yavatmal": [78.1627828064892, 20.0844273124666]
  };


  constructor() { }

  getDistrictName(districtName: string): string {
    return this.districts[districtName];
  }



  getLatLon(districtName: string): [number, number] {
    const latLon = this.lonLat[districtName];

    if (latLon) {
      console.log(`Coordinates for ${districtName}:`, latLon);
      return latLon;
    } else {
      console.error(`No coordinates found for ${districtName}`);
      return [0, 0];
    }
  }



}
