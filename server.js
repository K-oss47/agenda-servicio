import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const URL_AGENDA = "http://www.raydelto.org/agenda.php";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Página de la agenda (carpeta public)
const carpeta = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(carpeta, "public")));

// GET /contactos -> lista los contactos de la agenda
app.get("/contactos", async (req, res) => {
  try {
    const respuesta = await fetch(URL_AGENDA);
    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
    const contactos = await respuesta.json();
    res.json(contactos);
  } catch (error) {
    res.status(502).json({ error: "No se pudo obtener la agenda." });
  }
});

// POST /contactos -> almacena un contacto nuevo en la agenda
app.post("/contactos", async (req, res) => {
  const { nombre, apellido, telefono } = req.body ?? {};
  const valido = [nombre, apellido, telefono].every(
    (campo) => typeof campo === "string" && campo.trim() !== ""
  );
  if (!valido) {
    return res
      .status(400)
      .json({ error: "Se requieren los campos nombre, apellido y telefono." });
  }

  const contacto = {
    nombre: nombre.trim(),
    apellido: apellido.trim(),
    telefono: telefono.trim(),
  };

  try {
    const respuesta = await fetch(URL_AGENDA, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contacto),
    });
    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
    res.status(201).json({ mensaje: "Contacto guardado.", contacto });
  } catch (error) {
    res.status(502).json({ error: "No se pudo guardar el contacto." });
  }
});

// Errores de JSON mal formado u otros
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: "Solicitud inválida." });
});

app.listen(PORT, () => {
  console.log("Servicio escuchando en http://localhost:" + PORT);
});
