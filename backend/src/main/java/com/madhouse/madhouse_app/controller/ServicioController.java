package com.madhouse.madhouse_app.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.madhouse.madhouse_app.model.Servicio;
import com.madhouse.madhouse_app.repo.ServicioRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController// Agrega esta anotación para indicar que es un controlador REST
@RequestMapping("/api/servicios") // Agrega esta anotación para definir la ruta base del controlador, que en este caso es "/api/servicios". Esto significa que todas las rutas definidas en este controlador estarán bajo esta ruta base. Por ejemplo, si definimos un método con @GetMapping("/todos"), la ruta completa para acceder a ese método sería "/api/servicios/todos".
public class ServicioController { // Agrega esta anotación para indicar que es un controlador REST
    @Autowired // Agrega esta anotación para inyectar el repositorio de servicios, lo que permite acceder a la base de datos para realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre los servicios
    private ServicioRepository servicioRepository; // define el repositorio de servicios que se utilizará para acceder a la base de datos, para realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre los servicios

    @GetMapping("/servicio") // Agrega esta anotación para definir la ruta del método que obtiene todos los servicios, que en este caso es "/servicio". Esto significa que para acceder a este método, la ruta completa sería "/api/servicios/servicio".
    public List<Servicio> getFindAll() { // Agrega esta anotación para indicar que el método devolverá una lista de objetos Servicio, que representa todos los servicios disponibles en la base de datos
        return servicioRepository.findAll(); // Utiliza el método findAll() del repositorio de servicios para obtener todos los servicios de la base de datos y devolverlos como una lista de objetos Servicio
    }
    
    @PostMapping("/crear") // Agrega esta anotación para definir la ruta del método de creación de servicios y para indicar que el método recibirá un objeto JSON en el cuerpo de la solicitud
    public Servicio createServicio(@RequestBody Servicio servicio) { // Agrega esta anotación para indicar que el método recibirá un objeto JSON en el cuerpo de la solicitud, que debe tener la estructura definida en la clase Servicio (que incluye campos como nombre, descripción, precio, duración, etc.)
        return servicioRepository.save(servicio); // Guarda el servicio en la base de datos utilizando el método save() del repositorio de servicios y devuelve el objeto guardado, que ahora incluye el ID generado por la base de datos
    }

    @PutMapping("/actualizar/{id}") // Agrega esta anotación para definir la ruta del método de actualización de servicios y para indicar que el método recibirá un objeto JSON en el cuerpo de la solicitud, así como un parámetro de ruta llamado "id" que representa el ID del servicio a actualizar
    public Servicio actualizarServicio(@PathVariable Integer id, @RequestBody Servicio servicioActualizado) { // Agrega esta anotación para indicar que el método recibirá un parámetro de ruta llamado "id" y un objeto JSON en el cuerpo de la solicitud, que debe tener la estructura definida en la clase Servicio (que incluye los campos que se desean actualizar, como nombre, descripción, precio, duración, etc.)
        return servicioRepository.findById(id) // Utiliza el método findById() del repos
                .map(servicio -> { // Agrega esta anotación para indicar que el método buscará un servicio en la base de datos por su ID y, si lo encuentra, actualizará sus datos con los datos proporcionados en el cuerpo de la solicitud    
                    servicio.setNombre(servicioActualizado.getNombre()); // Actualiza el nombre del servicio con el valor proporcionado en el cuerpo de la solicitud
                    servicio.setDescripcion(servicioActualizado.getDescripcion()); // Actualiza la descripción del servicio con el valor proporcionado en el cuerpo de la solicitud
                    servicio.setPrecio(servicioActualizado.getPrecio());    // Actualiza el precio del servicio con el valor proporcionado en el cuerpo de la solicitud
                    servicio.setDuracion(servicioActualizado.getDuracion());   // Actualiza la duración del servicio con el valor proporcionado en el cuerpo de la solicitud
                    return servicioRepository.save(servicio); // Guarda los cambios en la base de datos y devuelve el objeto actualizado
                })
                .orElse(null); // Retorna nulo si el servicio no existe con el ID proporcionado, lo que indica que no se pudo actualizar porque no se encontró el servicio en la base de datos
    }

    @DeleteMapping("/eliminar/{id}")    // Agrega esta anotación para definir la ruta del método de eliminación de servicios y para indicar que el método recibirá un parámetro de ruta llamado "id" que representa el ID del servicio a eliminar
    public void eliminarServicio(@PathVariable Integer id) { // Agrega esta anotación para indicar que el método recibirá un parámetro de ruta llamado "id"
        servicioRepository.deleteById(id); // Elimina el registro directamente usando el ID proporcionado, lo que es más eficiente que buscar el servicio primero y luego eliminarlo, ya que deleteById() realiza la eliminación directamente en la base de datos sin necesidad de cargar el objeto completo en memoria
    }
}
