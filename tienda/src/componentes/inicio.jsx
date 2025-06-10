import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../estilos/inicio.css";
import imagen1 from '../imagenes/imagen1.png';
import imagen2 from '../imagenes/imagen2.png';
import imagen3 from '../imagenes/imagen3.png';
import imagen4 from '../imagenes/imagen4.png';
import imagen5 from '../imagenes/imagen5.png';
import gabinete from '../imagenes/productos/gabinete.png';
import placavideo from '../imagenes/productos/placavideo.png';
import auricular from '../imagenes/productos/auricularGamer.png';


function Inicio() {
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [isTransitioning, setIsTransitioning] = useState(true);

    const navigate = useNavigate();

    const imagenes = [
        imagen1,
        imagen2,
        imagen3,
        imagen4,
        imagen5,
    ];

    
    const extendedImages = [imagenes[imagenes.length - 1], ...imagenes];

    AOS.init({
        duration: 1000, 
        once: false, 
    });      

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 2500);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handlePrev = () => {
        if (currentIndex === 0) {
            setIsTransitioning(false);
            setCurrentIndex(extendedImages.length - 2);
            setTimeout(() => {
                setIsTransitioning(true);
            }, 0);
        } else {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex === extendedImages.length - 1) {
            setIsTransitioning(false);
            setCurrentIndex(1); 
            setTimeout(() => {
                setIsTransitioning(true);
            }, 0);
        } else {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <div className="inicio">
            <div className="carousel">
                <div
                    className="carousel-images-container"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                    }}
                >
                    {extendedImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Imagen ${index + 1}`}
                            className="carousel-image"
                        />
                    ))}
                </div>
                <button className="prev" onClick={handlePrev}>
                    &#10094;
                </button>
                <button className="next" onClick={handleNext}>
                    &#10095;
                </button>
            </div>
            <div className='texto'>
                <h1 className='titulo'>Bienvenid@ a nuestra tienda</h1>
                <p className='descripcion'>Aquí encontrarás una variedad de productos para satisfacer tus necesidades.</p>
                <p className='descripcion'>¡Explora nuestra colección y encuentra lo que más te gusta!</p>
                <p className='descripcion'>¡No olvides registrarte para acceder a todos los productos!</p>
                <p className='descripcion'>¡Contáctanos si tienes alguna pregunta o necesitas asistencia!</p>
                <p className='descripcion'>¡Gracias por elegir nuestra tienda!</p>
                <br />
                <br />
                <br />
            </div>
            <u><i><h1 className='titulo' data-aos = "fade-down" >Productos Destacados</h1></i></u>
            <div className='productos-destacados' data-aos="zoom-in"> 
                <img className='imagen' src={gabinete} />
                    <p className='descripcionProductoDestacado' data-aos="fade-up"> 
                        <i><strong> Gabinete Gamer de Alto Rendimiento – Diseno, Potencia y Estilo <br /> </strong></i>
                        <br />
                        Lleva tu experiencia de juego al siguiente nivel con nuestro Gabinete Gamer de última generación, disenado para ofrecer rendimiento, estética y funcionalidad en un solo equipo. 
                        Con un diseno agresivo y moderno, este gabinete combina paneles de vidrio templado, iluminación RGB personalizable y una estructura optimizada para un excelente flujo de aire.
                        Cuenta con amplio espacio interior para tarjetas gráficas de gran tamano, múltiples unidades de almacenamiento y sistemas de refrigeración líquida o por aire. Además, 
                        incluye filtros antipolvo, gestión de cables mejorada y puertos de conectividad frontal para un acceso rápido y cómodo.
                        Ideal para gamers exigentes y entusiastas del hardware que buscan un chasis robusto, funcional y con estilo.
                        Convierte tu setup en una estación de batalla con estilo profesional. ¡Construye tu próxima bestia gamer aquí!
                    </p>

                    <div className='producto2' data-aos="zoom-in">
                        <img className='imagen2' src={placavideo} /> 
                            <p className='descripcionProductoDestacado2' data-aos="fade-up"> 
                            <i><strong>Placa de Video de Alto Rendimiento – Gráficos que Superan los Límites </strong></i>
                            <br />
                            
                            Impulsa tu experiencia visual con nuestra tarjeta gráfica de última generación, 
                            disenada para ofrecer un rendimiento gráfico superior tanto en videojuegos como en aplicaciones profesionales.
                            Equipada con una arquitectura avanzada, memoria de alta velocidad y tecnologías de vanguardia, esta GPU brinda imágenes ultra nítidas,
                            tasas de refresco fluidas y soporte para resoluciones 4K (e incluso 8K en modelos superiores).                                     
                            Gracias a su sistema de refrigeración optimizado y componentes de calidad premium, garantiza un funcionamiento silencioso y estable, 
                            incluso en las sesiones de juego más intensas o durante trabajos creativos exigentes como edición de video, diseno 3D o renderizado.
                            </p>
                    </div>

                    <div className='producto3' data-aos="zoom-in">
                        <img className='imagen3' src={auricular} /> 
                            <p className='descripcionProductoDestacado3' data-aos="fade-up"> 
                            <i><strong>Auriculares Gaming de Alta Fidelidad – Sonido Inmersivo y Comodidad Extrema </strong></i>
                            <br />
                            Sumérgete en un universo sonoro con nuestros auriculares gaming de última tecnología, pensados para ofrecer una experiencia auditiva 
                            excepcional en cualquier situación. Disenados para largas sesiones de juego, trabajo o entretenimiento, estos auriculares combinan un sonido de alta fidelidad,
                            aislamiento de ruido superior y una comodidad insuperable.
                            Equipados con drivers de alta calidad, micrófono de cancelación de ruido y tecnología surround 7.1, te garantizan una precisión sonora que te permite escuchar hasta el más mínimo detalle.
                            Ya sea que estés explorando mundos virtuales o participando en videollamadas de trabajo, tu experiencia será clara y envolvente.
                            </p>
                    </div>
            </div>
        </div>
    );
}

export default Inicio;