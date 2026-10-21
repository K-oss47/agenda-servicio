# Servicio web de agenda (Express)

Servicio web hecho con Node.js y Express que expone dos operaciones sobre la agenda de `http://www.raydelto.org/agenda.php`: listar y almacenar contactos.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/contactos` | Devuelve el listado de contactos en JSON |
| `POST` | `/contactos` | Almacena un contacto nuevo |

Cuerpo del `POST`:

```json
{ "nombre": "Ana", "apellido": "Pérez", "telefono": "809-555-0101" }
```

Respuestas:

- `GET /contactos` → `200` con el arreglo de contactos.
- `POST /contactos` → `201` con `{ "mensaje": "Contacto guardado.", "contacto": { ... } }`.
- `400` si falta `nombre`, `apellido` o `telefono`.
- `502` si la agenda de raydelto.org no responde.

## Cómo ejecutarlo

Requiere Node.js 18 o superior.

```bash
npm install
npm start
```

El servicio queda en `http://localhost:3000`.

## Cómo probarlo (PowerShell)

Listar contactos:

```powershell
Invoke-RestMethod http://localhost:3000/contactos
```

Agregar un contacto:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/contactos -ContentType "application/json" -Body '{"nombre":"Ana","apellido":"Perez","telefono":"809-555-0101"}'
```

También puede abrir `http://localhost:3000/contactos` en el navegador para ver el listado en JSON.

## Interfaz web

El servicio también sirve una página de agenda en `http://localhost:3000/`. La página consume los endpoints `GET /contactos` y `POST /contactos` del propio servicio.

## Capturas

## Listado de contactos (GET)
![Listado de contactos](<Lista de contactos.png>)

## Almacenar un contacto (POST)
![POST de un contacto](<POST de un contacto.png>)

## Contacto agregado a la lista
![Contacto agregado](<Contacto agregado.png>)





## Estructura

```
agenda-servicio/
├── public/
│   └── index.html
├── server.js
├── package.json
├── .gitignore
├── README.md
├── listado.png
├── post.png
└── agregado.png
```

## Autor

Kelvin Mercedes — ITLA
