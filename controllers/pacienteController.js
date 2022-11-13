import Paciente from "../models/Paciente.js";
import mongoose from "mongoose";
import { veterinarioAuth } from "./veterinarioController.js";

const agregarPaciente = async (req, res) => {

  const paciente = new Paciente(req.body);
  paciente.veterinario = veterinarioAuth._id;


  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);

  } catch (error) {
    console.log(error);
  }
}

const obtenerPacientes = async (req, res) => {

  const pacientes = await Paciente.find().where('veterinario').equals(veterinarioAuth._id);
  res.json(pacientes)
}

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);


  if (!paciente) return res.status(404).json({ msg: 'No encontrado' });
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "Accion no válida" })
  }

  res.json(paciente)

}

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);


  if (!paciente) {
    return res.status(404).json({ msg: 'No encontrado' });
  }



  if (paciente.veterinario._id.toString() !== veterinarioAuth._id.toString()) {
    return res.json({ msg: "Accion no válida" })
  }


  // Actualizar Paciente
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;


  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);
  } catch (error) {
    console.clear(error);
  }
}

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Id no válido');
    return res.status(403).json({ msg: error.message });
  }

  const paciente = await Paciente.findById(id);

  console.log(paciente);
  if (!paciente) {
    return res.status(404).json({ msg: 'No encontrado' });
  }



  if (paciente.veterinario._id.toString() !== veterinarioAuth._id.toString()) {
    return res.json({ msg: "Accion no válida" })
  }

  try {
    await paciente.deleteOne();
    res.json({ msg: 'Paciente eliminado' })
  } catch (error) {
    console.log(error);
  }
}

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente
}