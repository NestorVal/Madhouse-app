import React from 'react';
import ItemCard from '../components/ItemCard';
import corteClasico from '../assets/img/corte-clasico.png';
import corteModerno from '../assets/img/corte-moderno.png';
import cortePremium from '../assets/img/corte-premium.png';
import arregloBarba from '../assets/img/arreglo-barba2.png';
import barbaCompleta from '../assets/img/barba-completa.png';
import afeitado from '../assets/img/afeitado.png';
import cera from '../assets/img/cera.png';
import shampoo from '../assets/img/shampoo-cabello.png';
import espuma from '../assets/img/espuma-afeitar.png';

const Servicios = () => {
    return (
        <main className="pagina-servicios">
            <div className="container-general">
                <h1 className="titulo-seccion">Servicios</h1>
                
                <div className="grid-tarjetas">
                    <ItemCard 
                        imagen={corteClasico}
                        titulo="Corte Clásico"
                        descripcion="Corte tradicional con técnicas profesionales. Incluye lavado, corte personalizado y acabado con secador. Perfecto para un look atemporal y elegante."
                        precio="$25.000"
                        duracion="45 minutos"
                        textoBoton="Reservar"
                        linkBoton="/reservas"
                    />
                    <ItemCard 
                        imagen={corteModerno}
                        titulo="Corte Moderno"
                        descripcion="Corte contemporáneo siguiendo las últimas tendencias. Diseño personalizado que se adapta a tu estilo con técnicas avanzadas."
                        precio="$30.000"
                        duracion="60 minutos"
                        textoBoton="Reservar"
                        linkBoton="/reservas"
                    />
                    <ItemCard 
                        imagen={cortePremium}
                        titulo="Corte Premium"
                        descripcion="La experiencia completa con corte, masaje capilar, tratamiento de hidratación y styling. El servicio más exclusivo de nuestra barbería."
                        precio="$45.000"
                        duracion="90 minutos"
                        textoBoton="Reservar"
                        linkBoton="/reservas"
                    />
                    <ItemCard 
                        imagen={arregloBarba}
                        titulo="Arreglo de Barba"
                        descripcion="Perfilado profesional de barba con navaja caliente, recorte preciso y productos premium para un acabado suave e impecable."
                        precio="$15.000"
                        duracion="30 minutos"
                        textoBoton="Reservar"
                        linkBoton="/reservas"
                    />
                    <ItemCard 
                        imagen={barbaCompleta}
                        titulo="Barba Completa"
                        descripcion="Servicio completo de barba: diseño, perfilado, afeitado con toalla caliente, exfoliación facial y aplicación de aceites y bálsamos."
                        precio="$25.000"
                        duracion="45 minutos"
                        textoBoton="Reservar"
                        linkBoton="/reservas"
                    />
                    <ItemCard 
                        imagen={afeitado}
                        titulo="Afeitado Tradicional"
                        descripcion="Experiencia clásica de afeitado con navaja recta, toallas calientes, pre-afeitado y mascarilla facial post-afeitado."
                        precio="$20.000"
                        duracion="40 minutos"
                        textoBoton="Reservar"
                        linkBoton="/reservas"
                    />
                </div>

                <h1 className="titulo-seccion mt-50">Productos</h1>
                <div className="grid-tarjetas">
                    <ItemCard 
                        imagen={cera}
                        titulo="Cera para Cabello"
                        descripcion="Cera profesional de alta fijación con acabado mate. Ideal para crear estilos definidos que duran todo el día sin apelmazar."
                        precio="$18.000"
                        textoBoton="Reservar"
                        linkBoton="/reservas"
                    />
                    <ItemCard 
                        imagen={shampoo}
                        titulo="Shampoo Premium"
                        descripcion="Shampoo fortificante con ingredientes naturales. Limpia profundamente mientras nutre y fortalece el cabello desde la raíz."
                        precio="$22.000"
                        textoBoton="Reservar"
                        linkBoton="/reservas"
                    />
                    <ItemCard 
                        imagen={espuma}
                        titulo="Espuma de Afeitar"
                        descripcion="Espuma cremosa de afeitado que protege la piel. Proporciona un deslizamiento suave y previene irritaciones."
                        precio="$16.000"
                        textoBoton="Reservar"
                        linkBoton="/reservas"
                    />
                </div>
            </div>
        </main>
    );
};

export default Servicios;