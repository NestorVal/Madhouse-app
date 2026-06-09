import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.*;

public class PasswordEncoderTest {

    @Test
    public void validarEncriptacionContrasena() {
        
        // ARRANGE (Arrancar)
        // Instanciamos la herramienta que hace la encriptación
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String clavePlana = "admin123";
        
        // ACT (Actuar)
        // Encriptamos la misma clave dos veces para ver cómo se comporta
        String hash1 = encoder.encode(clavePlana);
        String hash2 = encoder.encode(clavePlana);
        
        // Imprimimos en consola para ver los resultados visualmente durante la prueba
        System.out.println("Clave plana: " + clavePlana);
        System.out.println("Hash 1: " + hash1);
        System.out.println("Hash 2: " + hash2);

        // ASSERT (Afirmar)
        // Validar que la contraseña no se guarde en texto plano
        assertNotEquals(clavePlana, hash1, "Error: El hash es igual al texto plano");
        
        // Validar que la semilla (salting) genere hashes diferentes para la misma clave
        assertNotEquals(hash1, hash2, "Error: Los hashes generados son idénticos");
        
        // Validar que el sistema reconozca que ambos hashes pertenecen a la clave original
        assertTrue(encoder.matches(clavePlana, hash1), "Error: El Hash 1 no coincide con la clave");
        assertTrue(encoder.matches(clavePlana, hash2), "Error: El Hash 2 no coincide con la clave");
    }
}