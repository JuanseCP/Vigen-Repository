import { Component, OnInit } from '@angular/core';
import { circle, latLng, LatLng, map, Map, marker, tileLayer } from 'leaflet';
import { circle, latLng, LatLng, Map, marker, tileLayer } from 'leaflet';
import {InverseService} from '../api/MyServices/inverse.service'
import { RecordUserComponent } from '../record-user/record-user.component';

export let latlong =new LatLng(0,0);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private reverse: InverseService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    const map = new Map('map').setView([4.82882, -74.35513], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);
    
  /* ----Encontrar Ubicación por medio del GPS---- */

  map.on('locationfound', (e : {
    accuracy: number, latlng: LatLng
  }) => {
    const markerItem = marker(e.latlng).addTo(map);
   
    map.fitBounds([
      [markerItem.getLatLng().lat, markerItem.getLatLng().lng] //gps
    ])
    /*----------Se elimina cada vez que cambia de ubicacion------*/
    map.on('click',()=>map.removeLayer(markerItem));
    this.reverse.inverse(markerItem.getLatLng().lat+"", markerItem.getLatLng().lng+"")
  });
  map.on('locationerror', (e : {message: string} ) => console.error(e.message));
  map.locate();

  /* ----agregar marcadores con click---- */
  
  map.on('click', (e : {
    latlng: LatLng
  }) => {
    const markerItem = marker(e.latlng).addTo(map);
    map.fitBounds([
      [markerItem.getLatLng().lat, markerItem.getLatLng().lng]
    ])
    latlong=new LatLng(e.latlng.lat,e.latlng.lng);
    console.log('click', e.latlng.lat, e.latlng.lng)

    /*----------Se elimina cada vez que cambia de ubicacion------*/
    map.on('click',()=>map.removeLayer(markerItem));
    this.reverse.inverse(e.latlng.lat+"", e.latlng.lng+"");
  });

  


  }
 
 
}
