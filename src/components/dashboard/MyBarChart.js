import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import TitleChart from './TitleChart';
import { useEffect, useState } from 'react';

import { getCountDemandesByCommune } from '../../API';

let labelsBarChart, valuesBarChart;





// Generate Order Data
function createBarChartLabels(nom_commune) {
  return nom_commune;
}

// Generate Order Data
function createBarChartValues(num_demandes) {
  return num_demandes;
}

export default function MyBarChart({ title }) {
  const [uData, setuData] = useState([]);
  const [xLabels, setxLabels] = useState([]);

  useEffect(() => {
    getCountDemandesByCommune().then((res) => {
      labelsBarChart = res.map((item) => createBarChartLabels(item.nom_commune));
      valuesBarChart = res.map((item) => createBarChartValues(item.num_demandes));

      setxLabels(labelsBarChart);
      setuData(valuesBarChart);

      console.log("Labels to show: " + labelsBarChart);
      console.log("Values to show: " + valuesBarChart);
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TitleChart style={{ marginBottom: '20px' }}>{title}</TitleChart>
      <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        {xLabels.length > 0 && uData.length > 0 && (
          <BarChart
            sx={{
              width: '80%', 
              height: '80%', 
            }}
            series={[
              {
                data: uData,
                label: 'Nombre de demandes',
                id: 'uvId',
                barWidth: 10, 
              },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
          />
        )}
      </div>
    </div>
  );
}