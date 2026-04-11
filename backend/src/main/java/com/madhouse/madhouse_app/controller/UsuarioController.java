package com.madhouse.madhouse_app.controller;

import com.madhouse.madhouse_app.model.Usuario;
import com.madhouse.madhouse_app.repo.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Necesario para cambiar la contraseña

    // 1. OBTENER DATOS DEL PERFIL
    // Se usa cuando el usuario entra a "Mi Perfil" o a "Editar Perfil"
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuario(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }

    // 2. ACTUALIZAR INFORMACIÓN BÁSICA (EditarPerfil.jsx)
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarPerfil(@PathVariable Integer id, @RequestBody Usuario datosActualizados) {
        Optional<Usuario> usuarioFisico = usuarioRepository.findById(id);

        if (usuarioFisico.isPresent()) {
            Usuario usuario = usuarioFisico.get();
            
            // Solo actualizamos los datos permitidos (Ignoramos correo, contraseña y rol por seguridad)
            usuario.setNombre(datosActualizados.getNombre());
            usuario.setApellido(datosActualizados.getApellido());
            usuario.setTelefono(datosActualizados.getTelefono());
            usuario.setFechaNacimiento(datosActualizados.getFechaNacimiento());
            usuario.setDireccion(datosActualizados.getDireccion());
            
            // Si es un barbero, también actualizamos su especialidad
            if(datosActualizados.getEspecialidad() != null) {
                usuario.setEspecialidad(datosActualizados.getEspecialidad());
            }

            Usuario usuarioGuardado = usuarioRepository.save(usuario);
            return ResponseEntity.ok(usuarioGuardado);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }

    // 3. CAMBIAR CONTRASEÑA (CambiarContrasena.jsx)
    @PutMapping("/cambiar-password/{id}")
    public ResponseEntity<?> cambiarContrasena(@PathVariable Integer id, @RequestBody Map<String, String> passwords) {
        Optional<Usuario> usuarioFisico = usuarioRepository.findById(id);

        if (usuarioFisico.isPresent()) {
            Usuario usuario = usuarioFisico.get();
            String passwordActualRecibida = passwords.get("actual");
            String passwordNueva = passwords.get("nueva");

            // Validar que la contraseña actual que escribió coincida con la de la base de datos
            if (passwordEncoder.matches(passwordActualRecibida, usuario.getContrasena())) {
                // Encriptar la nueva y guardarla
                usuario.setContrasena(passwordEncoder.encode(passwordNueva));
                usuarioRepository.save(usuario);
                
                Map<String, String> response = new HashMap<>();
                response.put("mensaje", "Contraseña actualizada exitosamente");
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("La contraseña actual es incorrecta");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }

    // 4. LISTAR BARBEROS (Ya lo tenías, lo mantenemos para la pantalla de Barberos)
    @GetMapping("/barberos")
    public List<Usuario> obtenerBarberos() {
        return usuarioRepository.findByRol("ROLE_BARBERO"); 
    }
}