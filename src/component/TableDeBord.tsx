import React from 'react';
import General from './General';

const TableDeBord: React.FC = () => {
  return (
    <>
      <div>
        <div className="project-table">
           <table className="table-auto ">
                    <thead className="bg-gradient-to-tl from-gray-800 to-blue-500 text-white" >
                        <tr>
                            <th className="border px-10 py-2">Nom du Projet</th>
                            <th className="border px-10  py-2">Participant</th>
                            <th className="border px-10  py-2">Temps de Début</th>
                            <th className="border px-10  py-2">Durée</th>
                            <th className="border px-4  py-2">Coût</th>
                            <th className="border px-4  py-2">Type de Projet</th>
                           <th className="border px-10  py-2">État du Projet</th>
                            <th className="border px-10  py-2">Actions</th>
                            {/* Ajoutez d'autres colonnes au besoin */}
                        </tr>
                    </thead>
                    <tbody>
                        
                            <tr>
                                <td className="border px-10  py-2"></td>
                                <td className="border px-10  py-2"></td>
                                <td className="border px-10  py-2"></td>
                                <td className="border px-10  py-2"></td>
                                <td className="border px-10  py-2"></td>
                                <td className="border px-10  py-2"></td>
                                <td className="border px-10  py-2"></td>
                               <td className="border px-10  py-2"></td>
                                {/* Ajoutez d'autres colonnes au besoin */}
                            </tr>
                    

                    </tbody>
                </table>
        </div>
      </div>

      <General />
    </>
  );
}

export default TableDeBord;
