package com.madhouse.madhouse_app.controller;

import com.madhouse.madhouse_app.model.Usuario;
import com.madhouse.madhouse_app.repo.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth") // Ruta separada para autenticación
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inyectamos el encriptador

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            // 1. Verificamos si el correo ya existe
            Optional<Usuario> usuarioExistente = usuarioRepository.findByCorreo(usuario.getCorreo());
            if (usuarioExistente.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: El correo ya está registrado.");
            }

            // 2. Encriptamos la contraseña antes de guardarla
            String hashPassword = passwordEncoder.encode(usuario.getContrasena());
            usuario.setContrasena(hashPassword);

            // 3. Asignamos rol por defecto si no viene en el JSON
            if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
                usuario.setRol("ROLE_CLIENTE");
            }

            // 4. Guardamos
            Usuario nuevoUsuario = usuarioRepository.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario datosLogin) {
        // Usamos un Map para devolver un JSON estructurado con mensajes claros
        Map<String, Object> response = new HashMap<>();

        // 1. Buscamos al usuario SOLO por su correo
        Optional<Usuario> usuarioFisico = usuarioRepository.findByCorreo(datosLogin.getCorreo());

        if (usuarioFisico.isPresent()) {
            Usuario usuario = usuarioFisico.get();

            // 2. Comparamos la contraseña enviada en texto con la encriptada en la BD
            boolean contrasenaCoincide = passwordEncoder.matches(datosLogin.getContrasena(), usuario.getContrasena());

            if (contrasenaCoincide) {
                // Login Exitoso: Devolvemos 200 OK y los datos útiles (Sin devolver la contraseña)
                response.put("status", "success");
                response.put("mensaje", "Autenticación satisfactoria");
                response.put("idUsuario", usuario.getIdUsuario());
                response.put("nombre", usuario.getNombre());
                response.put("rol", usuario.getRol());
                return ResponseEntity.ok(response);
            } else {
                // Contraseña incorrecta
                response.put("status", "error");
                response.put("mensaje", "Credenciales inválidas");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            // Correo no encontrado
            response.put("status", "error");
            response.put("mensaje", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}