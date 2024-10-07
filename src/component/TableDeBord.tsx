import React, { useState } from 'react';
import General from './General';

// Example data structure
interface Project {
  nomDuProjet: string;
  participant: string;
  tempsDeDebut: string;
  duree: string;
  cout: string;
  typeDeProjet: string;
  etatDuProjet: string;
}

const TableDeBord: React.FC = () => {
  // Sample project data
  const [projects, setProjects] = useState<Project[]>([
    {
      nomDuProjet: 'Projet Alpha',
      participant: 'John Doe',
      tempsDeDebut: '2024-10-01',
      duree: '6 mois',
      cout: '5000 USD',
      typeDeProjet: 'Développement Web',
      etatDuProjet: 'En cours',
    },
    {
      nomDuProjet: 'Projet Beta',
      participant: 'Jane Smith',
      tempsDeDebut: '2024-09-15',
      duree: '3 mois',
      cout: '2000 USD',
      typeDeProjet: 'Marketing',
      etatDuProjet: 'Terminé',
    },
    // Add more projects as needed
  ]);

  return (
    <>
      <div className="p-6">
        <div className="overflow-x-auto shadow-md sm:rounded-lg"  style={{ marginTop: '10%' }}>
          <table className="min-w-full table-auto text-left text-sm">
            <thead className="bg-gradient-to-tl from-gray-800 to-blue-500 text-white">
              <tr>
                <th className="border px-6 py-3 text-center">Nom du Projet</th>
                <th className="border px-6 py-3 text-center">Participant</th>
                <th className="border px-6 py-3 text-center">Temps de Début</th>
                <th className="border px-6 py-3 text-center">Durée</th>
                <th className="border px-6 py-3 text-center">Coût</th>
                <th className="border px-6 py-3 text-center">Type de Projet</th>
                <th className="border px-6 py-3 text-center">État du Projet</th>
                <th className="border px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {projects.map((project, index) => (
                <tr key={index} className="hover:bg-gray">
                  <td className="border px-6 py-4 text-center">{project.nomDuProjet}</td>
                  <td className="border px-6 py-4 text-center">{project.participant}</td>
                  <td className="border px-6 py-4 text-center">{project.tempsDeDebut}</td>
                  <td className="border px-6 py-4 text-center">{project.duree}</td>
                  <td className="border px-6 py-4 text-center">{project.cout}</td>
                  <td className="border px-6 py-4 text-center">{project.typeDeProjet}</td>
                  <td className="border px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.etatDuProjet === 'En cours' 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      {project.etatDuProjet}
                    </span>
                  </td>
                  <td className="border px-6 py-4 text-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
                      Download
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md ml-3">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <General />
    </>
  );
};

export default TableDeBord;
