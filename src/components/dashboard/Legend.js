


import markerAccepted from './icons/accept.png';
import markerDeclined from './icons/decline.png';
import markerEnCours from './icons/encours.png';


const Legend = () => {
    const legendItems = [
      { status: 'Acceptée', icon: markerAccepted },
      { status: 'En cours de traitement', icon: markerEnCours },
      { status: 'Rejetée', icon: markerDeclined },
    ];
  
    return (
      <div className="legend" style={{ position: 'absolute', bottom: '310px', right: '200px', backgroundColor: 'white', padding: '10px', fontSize: '25px'}}>
        <h3>Légende</h3>
        {legendItems.map((item) => (
          <div key={item.status}>
            <img src={item.icon} alt={`${item.status} marker`} style={{ width: '20px', height: '20px', marginRight: '5px' }} />
            <span>{item.status}</span>
          </div>
        ))}
      </div>
    );
  };

  export default Legend;
  