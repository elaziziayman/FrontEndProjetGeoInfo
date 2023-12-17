import React from 'react';
import { MapContainer, TileLayer, Marker, Popup , GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from "react";

import { getDemandes } from '../../API';






import markerAccepted from './icons/accept.png';
import markerDeclined from './icons/decline.png';
import markerEnCours from './icons/encours.png';



export default function Map() {
  const position = [33.48, -7.61];
  const [communes, setCommunes] = useState(null);
  const [dataSource, setDataSource] = useState([]);


  useEffect(() => {
    getDemandes().then((res) => {
      setDataSource(res);
    });
    fetchCommunesData();
  }, []);

  const fetchCommunesData = () => {
    fetch('http://172.16.18.100:8085/communes')
      .then((response) => response.json())
      .then((data) => {
        setCommunes(data);
      })
      .catch((error) => {
        console.error('Error fetching communes data:', error);
      });
  };

  let iconImage = "";



  return (
    <MapContainer center={[33.48, -7.61]} zoom={10} style={{ height: '400px', width: '100%', zIndex: 0 }}>

    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
   {/* <Legend > */}


    {dataSource.map((demande) => {
      if (demande.y !== undefined && demande.x !== undefined) {
        if(demande.statut.type==="Acceptée"){
            iconImage = markerAccepted;  
        }
        else if(demande.statut.type==="En cours de traitement"){
          iconImage = markerEnCours;  
      }
      else if(demande.statut.type==="Rejetée"){
        iconImage = markerDeclined;  
    }
      
        return (
          <Marker
            key={demande.num_demande}
            position={[demande.y, demande.x]}
            
            icon={L.icon({
              iconUrl: iconImage,
              iconSize: [25, 25],
              iconAnchor: [20, 30],
            })}
          >
            <Popup>
              <div>
                <p>Numéro de demande: {demande.num_demande}</p>
                <p>Demandeur: {demande.demandeur.nom} {demande.demandeur.prenom}</p>
                <p>Autorisation: {demande.autorisation.type}</p>
                <p>Occupation de terrain: {demande.occupation.type}</p>

              </div>
            </Popup>
          </Marker>
          
        );
      }
      return null;
    })}

    {communes && communes.map((commune) => (
      <GeoJSON
        key={commune.nom}
        data={{
          "type": "Feature",
          "properties": {
            "nom": commune.nom,
            "surface": commune.surface
          },
          "geometry": {
            "type": "MultiPolygon",
            "coordinates": commune.geom.coordinates
          }
        }}
        style={{
          fillColor: 'blue',
          weight: 2,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.5
        }}
      >
        <Popup>
          <div>
            <p>Nom: {commune.nom}</p>
            <p>Surface: {commune.surface}</p>
          </div>
        </Popup>
      </GeoJSON>
    ))}
  </MapContainer>
  );
}
