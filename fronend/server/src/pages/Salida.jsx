import { useEffect, useState } from "react";
import axios from "axios";

const Salida = () => {
  const [vehiculos, setVehiculos] = useState([]);

  // Cargar lista de vehículos
  const cargarVehiculos = async () => {
    const res = await axios.get("http://localhost:5000/vehiculos");
    setVehiculos(res.data);
  };

  // Eliminar un vehículo
  const eliminarVehiculo = async (id) => {
    await axios.delete(`http://localhost:5000/vehiculos/${id}`);
    cargarVehiculos();
  };

  // Registrar la hora de salida (PUT)
  const registrarSalida = async (id) => {
    const hora_salida = new Date();
    try {
      const vehiculo = vehiculos.find((v) => v.id === id);
      await axios.put(`http://localhost:5000/vehiculos/${id}`, {
        placa: vehiculo.placa,
        marca: vehiculo.marca,
        color: vehiculo.color,
        hora_salida,
      });
      alert("Hora de salida registrada");
      cargarVehiculos();
    } catch (err) {
      console.error(err);
      alert("Error al registrar salida");
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarVehiculos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vehículos Registrados</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Color</th>
            <th>Ingreso</th>
            <th>Salida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.placa}</td>
              <td>{v.marca}</td>
              <td>{v.color}</td>
              <td>
                {v.hora_ingreso
                  ? new Date(v.hora_ingreso).toLocaleString()
                  : "—"}
              </td>
              <td>
                {v.hora_salida
                  ? new Date(v.hora_salida).toLocaleString()
                  : "Pendiente"}
              </td>
              <td>
                <button onClick={() => eliminarVehiculo(v.id)}>Eliminar</button>{" "}
                <button onClick={() => registrarSalida(v.id)}>Salida</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Salida;
