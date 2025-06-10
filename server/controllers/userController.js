const User = require("../models/user.js")
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

console.log(process.env.STRIPE_SECRET_KEY)
exports.getAllUsers = async (req,res)=>{

    try{

      const usuarios = await User.find()
    
      res.json(usuarios)
    }
    catch(err){
        console.log("se econtro un error")
    }
}
exports.Register = async(req,res)=>{

    try{
       
        const {nombre,apellido,email,password,rol} = req.body
        const nuevoU = await new User({nombre,apellido,email,password,  rol: rol || "cliente"})
        nuevoU.save()
        res.status(201).json({ message: "Usuario registrado con éxito" });

    }
    catch(err){
        console.log("ocurrio un error",err)
    }
}
exports.Login = async(req,res)=>{
    try{
       
        const {email,password} = req.body
        const user = await User.findOne({email})

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if(user.email !== email){
        return res.status(401).json({ message: "Email incorrecto" });
    }
    
    if(user.password !== password){
        return res.status(401).json({ message: "Contrasena incorrecta" });
    }   
   

const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol        
      }
    });
  }
catch(err){
    console.log("ocurrio un error" +err)
}
}
exports.pago = async (req, res) => {
  try {
    const { items } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.nombre, // nombre del producto
          },
          unit_amount: item.precio * 100, // en centavos
        },
        quantity: item.cantidad,
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success?status=success&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel?status=cancel",
      customer_email: req.user?.email || undefined, // email del cliente
      metadata: {
        userId: req.userId, 
        items: JSON.stringify(items) 
      }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear sesión de Stripe" });
  }
};

exports.obtenerRecibo = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    res.json({
      session,
      lineItems
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el recibo" });
  }
}