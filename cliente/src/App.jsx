import { FiCheckCircle, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/actividades';

function App() {
  const [actividades, setActividades] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [formData, setFormData] = useState({ actividad: '', descripcion: '', estatus: 1 });

  useEffect(() => {
    fetchActividades();
  }, []);

  const fetchActividades = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (Array.isArray(data)) {
      setActividades(data);
      setMensaje('');
    } else {
      setActividades([]);
      setMensaje(data.mensaje || 'Sin Información');
    }
  };

  const fetchPorEstatus = async (estatus) => {
    try {
      const res = await fetch(`${API_URL}/estatus/${estatus}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setActividades(data);
        setMensaje('');
      } else {
        setActividades([]);
        setMensaje(data.mensaje || 'Sin Información');
      }

      setEstadoFiltro(estatus);
    } catch (error) {
      console.error('Error al obtener actividades por estatus:', error);
      setMensaje('Error de conexión con el servidor');
    }
  };

  const actualizarEstatus = async (actividad) => {
    const nuevoEstatus = actividad.estatus === 1 ? 0 : 1;

    try {
      await fetch(`${API_URL}/${actividad.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estatus: nuevoEstatus }),
      });

      setActividades((prev) =>
        prev.map((act) =>
          act.id === actividad.id ? { ...act, estatus: nuevoEstatus } : act
        )
      );
    } catch (error) {
      console.error('Error actualizando estatus:', error);
    }
  };

  const crearActividad = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    await res.json();
    setFormData({ actividad: '', descripcion: '', estatus: 1 }); // Limpiar campos
    fetchActividades();
  };

  const eliminarActividad = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchActividades();
  };

  return (
    <div className="flex flex-col justify-center bg-blue-100 min-h-screen w-full">
      <div className="flex flex-col justify-center items-center bg-white/80 mx-4 md:mx-36 p-6 md:p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl md:text-5xl py-2 px-5 text-center font-extrabold text-blue-900 mb-6">
          Gestión de Actividades
        </h1>
        <div className="flex flex-row justify-center gap-4 mb-6">
          <button
            className="btn px-6 py-2 rounded-full font-semibold bg-blue-400 text-white shadow hover:bg-blue-600 transition"
            onClick={() => fetchPorEstatus(1)}
          >
            Activas
          </button>
          <button
            className="btn px-6 py-2 rounded-full font-semibold bg-gray-400 text-white shadow hover:bg-gray-600 transition"
            onClick={() => fetchPorEstatus(0)}
          >
            Inactivas
          </button>
          <button
            className="btn px-6 py-2 rounded-full font-semibold bg-blue-900 text-white shadow hover:bg-blue-700 transition"
            onClick={fetchActividades}
          >
            Todas
          </button>
        </div>
        {mensaje && <div className="text-center text-red-500 mb-4 font-medium">{mensaje}</div>}
        <div className="w-full mb-8">
          {actividades.map((act) => (
            <div
              className="flex justify-between items-center bg-blue-50 rounded-xl shadow p-4 mb-4"
              key={act.id}
            >
              <div className="flex flex-col">
                <span className="font-bold text-blue-900 text-lg">{act.actividad}</span>
                <span className="text-gray-700 text-base">{act.descripcion}</span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 border ${
                    act.estatus === 1
                      ? 'bg-blue-100 text-blue-700 border-blue-400'
                      : 'bg-gray-200 text-gray-600 border-gray-400'
                  }`}
                >
                  {act.estatus === 1 ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full hover:bg-red-100 text-red-500 transition"
                  onClick={() => eliminarActividad(act.id)}
                  title="Eliminar"
                >
                  <FiTrash2 size={22} />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-blue-100 text-blue-500 transition"
                  onClick={() => actualizarEstatus(act)}
                  title="Cambiar estatus"
                >
                  <FiCheckCircle size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <form
          className="flex flex-col gap-3 bg-blue-50 rounded-xl shadow p-6 w-full max-w-md"
          onSubmit={crearActividad}
        >
          <h2 className="text-blue-900 text-xl font-bold mb-2">Nueva Actividad</h2>
          <input
            type="text"
            placeholder="Actividad"
            className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:border-blue-400 bg-white"
            value={formData.actividad}
            onChange={e => setFormData({ ...formData, actividad: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:border-blue-400 bg-white"
            value={formData.descripcion}
            onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
            required
          />
          <select
            className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:border-blue-400 bg-white"
            value={formData.estatus}
            onChange={e => setFormData({ ...formData, estatus: Number(e.target.value) })}
          >
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
          <button
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-full font-semibold bg-blue-500 text-white shadow hover:bg-blue-700 transition mt-2"
            type="submit"
          >
            <FiPlusCircle />
            Crear Actividad
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;