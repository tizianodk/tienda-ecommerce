import React, { useState } from 'react';
import "../estilos/footer.css";
import facebook from '../imagenes/fb.png';
import instagram from '../imagenes/ig.png';


function Footer() {
  return (
    <footer className="footer">
      <div className="container mx-auto text-center">
        <p>&copy; 2025. Todos los derechos reservados.</p>
        <div className='redes'>
            <button >
                <a href="/#"><img className= "facebook" src={facebook}/></a>
            </button>

            <button>
                <a href=""><img src={instagram}/></a>
            </button>
        </div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Fuga cupiditate non magnam sequi, at quis fugit obcaecati? 
            Inventore tenetur, nostrum fugit nisi quod possimus 
            quo optio qui, dolores, eligendi vitae.</p>
      </div>
    </footer>
  );
}

export default Footer;