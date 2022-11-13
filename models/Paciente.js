import mongose from 'mongoose';

const pacientesSchema = mongose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  propietario: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now()
  },
  sintomas: {
    type: String,
    required: true,
  },
  veterinario: {
    type: mongose.Schema.Types.ObjectId,
    ref: 'Veterinario'
  }
},
  {
    timestamps: true,
  });

const Paciente = mongose.model('Paciente', pacientesSchema);

export default Paciente;
