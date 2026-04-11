package com.madhouse.madhouse_app.repo;
import com.madhouse.madhouse_app.model.Usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Nuevo método: Busca un usuario solo por el correo y devuelve un "Optional" (puede existir o no)
    Optional<Usuario> findByCorreo(String correo);

    Usuario findByCorreoAndContrasena(String correo, String contrasena); // Método para autenticar al usuario, busca un usuario por correo y contraseña, si encuentra uno que coincida, lo devuelve; de lo contrario, devuelve null.

    List<Usuario> findByRol(String rol); // Método para obtener todos los usuarios con un rol específico, busca todos los usuarios que tengan el rol especificado ("barbero" o "cliente") y devuelve una lista de esos usuarios.

}
