export const getDemandes = () => {
    return fetch("http://172.19.1.141:8085/demandes").then((res) => res.json());
};

  export const updateStatus = () => {  
    return fetch("http://172.19.1.141:8085/demandes/updateStatut").then((res) => res.json());
  };
  
  export const getTotalDemandes = () => {
    return fetch("http://172.19.1.141:8085/demandes/total").then((res) => res.json());
  };
  
  export const getDemandesEnInstance = () => {
    return fetch("http://172.19.1.141:8085/demandes/statut/4").then((res) => res.json());
  };

  export const getDemandesEnCours = () => {
    return fetch("http://172.19.1.141:8085/demandes/statut/3").then((res) => res.json());
  };

  export const getDemandesTraitees = () => {
    return fetch("http://172.19.1.141:8085/demandes/statutnotlike/3").then((res) => res.json());
  };

  export const getCountDemandesByCommune = () => {
    return fetch("http://172.19.1.141:8085/demandes/total-commune").then((res) => res.json());
  };

  export const updateStatutUser = () => {  
    return fetch("http://172.19.1.141:8085/utilisateurs/updateStatut").then((res) => res.json());
  };

 

  export const getTotalDemandesValidees = () => {
    return fetch("http://172.19.1.141:8085/demandes/total/1").then((res) => res.json());
  };

  export const getTotalDemandesRejetees = () => {
    return fetch("http://172.19.1.141:8085/demandes/total/2").then((res) => res.json());
  };

  export const getTotalDemandesEnInstance= () => {
    return fetch("http://172.19.1.141:8085/demandes/total/4").then((res) => res.json());
  };
  
  export const getCitoyens= () => {
    return fetch("http://172.19.1.141:8085/utilisateurs/2").then((res) => res.json());
  };

  export const getTotalConstruction= () => {
    return fetch("http://172.19.1.141:8085/demandes/total-autorisation/1").then((res) => res.json());
  };
  export const getTotalExtension= () => {
    return fetch("http://172.19.1.141:8085/demandes/total-autorisation/2").then((res) => res.json());
  };
  export const getTotalDemolition= () => {
    return fetch("http://172.19.1.141:8085/demandes/total-autorisation/3").then((res) => res.json());
  };

  export const getTotalVilla= () => {
    return fetch("http://172.19.1.141:8085/demandes/total-occupation/1").then((res) => res.json());
  };

  export const getTotalImmeuble= () => {
    return fetch("http://172.19.1.141:8085/demandes/total-occupation/2").then((res) => res.json());
  };

  export const getTotalFerme= () => {
    return fetch("http://172.19.1.141:8085/demandes/total-occupation/3").then((res) => res.json());
  };

  export const getTotalTerrain= () => {
    return fetch("http://172.19.1.141:8085/demandes/total-occupation/4").then((res) => res.json());
  };



  


  //Citoyen APIs

  export const getDemandesByUser = (userId) => {
    return fetch("http://172.19.1.141:8085/demandes_par_utilisateur/"+userId).then((res) => res.json());
  };
  
  export const getCitoyenTotalDemandes = (userId) => {
    return fetch("http://172.19.1.141:8085/demandes/total-user/"+userId).then((res) => res.json());
  };

  export const getCitoyenTotalDemandesAcceptees = (userId) => {
    return fetch("http://172.19.1.141:8085/demandes/demandes-by-user/"+userId+"/1").then((res) => res.json());
  };

  export const getCitoyenTotalDemandesRejetees = (userId) => {
    return fetch("http://172.19.1.141:8085/demandes/demandes-by-user/"+userId+"/2").then((res) => res.json());
  };

  export const getCitoyenTotalDemandesEnInstance = (userId) => {
    return fetch("http://172.19.1.141:8085/demandes/demandes-by-user/"+userId+"/4").then((res) => res.json());
  };

  
  
  