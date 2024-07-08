var colors = [
    { "color": "Amarillo", "codigo": "rgb(255, 255, 0)" },
    { "color": "Negro", "codigo": "rgb(0, 0, 0)" },
    { "color": "Blanco", "codigo": "rgb(255, 255, 255)" },
    { "color": "Naranja", "codigo": "rgb(255, 165, 0)" },
    { "color": "Morado", "codigo": "rgb(128, 0, 128)" },
    { "color": "Azul Rey", "codigo": "rgb(0, 35, 102)" },
    { "color": "Verde Limón", "codigo": "rgb(173, 255, 47)" },
    { "color": "Verde Esmeralda", "codigo": "rgb(80, 200, 120)" },
    { "color": "Rojo", "codigo": "rgb(255, 0, 0)" },
    { "color": "Tricolor", "codigo": "rgb(255, 255, 0), rgb(0, 0, 255), rgb(0, 128, 0)" },
    { "color": "Blanco y Negro", "codigo": "rgb(255, 255, 255), rgb(0, 0, 0)" },
    { "color": "Rosado", "codigo": "rgb(255, 192, 203)" },
    { "color": "Rojo ", "codigo": "rgb(255, 0, 0)" },
    { "color": "Naranja ", "codigo": "rgb(255, 165, 0)" },
    { "color": "Azul y Verde", "codigo": "rgb(0, 0, 255), rgb(0, 128, 0)" },
    { "color": "Transparente / Negro", "codigo": "rgba(0, 0, 0, 0.5), rgb(0, 0, 0)" },
    { "color": "Transparente / Azul Rey", "codigo": "rgba(0, 35, 102, 0.5), rgb(0, 35, 102)" },
    { "color": "Azul Rey / Negro", "codigo": "rgb(0, 35, 102), rgb(0, 0, 0)" },
    { "color": "Azul Claro", "codigo": "rgb(173, 216, 230)" },
    { "color": "Plateado", "codigo": "rgb(192, 192, 192)" },
    { "color": "Azul", "codigo": "rgb(0, 0, 255)" },
    { "color": "Verde Oscuro", "codigo": "rgb(0, 100, 0)" },
    { "color": "Azul Cielo", "codigo": "rgb(135, 206, 235)" },
    { "color": "Transparente", "codigo": "rgba(255, 255, 255, 0.5)" },
    { "color": "Café", "codigo": "rgb(139, 69, 19)" },
    { "color": "Kakhi", "codigo": "rgb(195, 176, 145)" },
    { "color": "Natural", "codigo": "rgb(240, 235, 220)" },
    { "color": "Bamboo", "codigo": "rgb(224, 214, 186)" },
    { "color": "Verde Limon", "codigo": "rgb(173, 255, 47)" },
    { "color": "Azul Oscuro", "codigo": "rgb(0, 0, 139)" },
    { "color": "Gris", "codigo": "rgb(128, 128, 128)" },
    { "color": "Gris Oscuro", "codigo": "rgb(105, 105, 105)" },
    { "color": "Camel", "codigo": "rgb(193, 154, 107)" },
    { "color": "Burgundy", "codigo": "rgb(128, 0, 32)" },
    { "color": "Fucsia", "codigo": "rgb(255, 0, 255)" },
    { "color": "Khaki", "codigo": "rgb(240, 230, 140)" },
    { "color": "Verde", "codigo": "rgb(0, 128, 0)" },
    { "color": "Negro / Gris", "codigo": "rgb(0, 0, 0), rgb(128, 128, 128)" },
    { "color": "Blanco Sólido", "codigo": "rgb(255, 255, 255)" },
    { "color": "Plateado / Azul Rey", "codigo": "rgb(192, 192, 192), rgb(0, 35, 102)" },
    { "color": "Plateado / Negro", "codigo": "rgb(192, 192, 192), rgb(0, 0, 0)" },
    { "color": "Rosado, Amarillo, Azul", "codigo": "rgb(255, 192, 203), rgb(255, 255, 0), rgb(0, 0, 255)" },
    { "color": "Rosado, Amarillo, Verde", "codigo": "rgb(255, 192, 203), rgb(255, 255, 0), rgb(0, 128, 0)" },
    { "color": "Blanco / Rsd, Amr, Az", "codigo": "rgb(255, 255, 255), rgb(255, 192, 203), rgb(255, 255, 0), rgb(0, 0, 255)" },
    { "color": "Azul Rey / Rsd, Amr, Vr", "codigo": "rgb(0, 35, 102), rgb(255, 192, 203), rgb(255, 255, 0), rgb(0, 128, 0)" },
    { "color": "Blanco / Rsd, Amr, Vr", "codigo": "rgb(255, 255, 255), rgb(255, 192, 203), rgb(255, 255, 0), rgb(0, 128, 0)" },
    { "color": "Rosado, Amarillo. Verde", "codigo": "rgb(255, 192, 203), rgb(255, 255, 0), rgb(0, 128, 0)" },
    { "color": "Azul Petróleo", "codigo": "rgb(0, 107, 127)" },
    { "color": "Vinotinto", "codigo": "rgb(128, 0, 0)" },
    { "color": "Blanco / Colores", "codigo": "rgb(255, 255, 255), rgb(255, 0, 0), rgb(0, 0, 255)" },
    { "color": "Blanco / Blanco", "codigo": "rgb(255, 255, 255)" },
    { "color": "Amarillo Neón", "codigo": "rgb(255, 255, 0)" },
    { "color": "Naranja Neón", "codigo": "rgb(255, 165, 0)" },
    { "color": "NEgro", "codigo": "rgb(0, 0, 0)" },
    { "color": "Oro", "codigo": "rgb(255, 215, 0)" },
    { "color": "Rosado Oro", "codigo": "rgb(255, 192, 203)" },
    { "color": "Blanco / Rojo", "codigo": "rgb(255, 255, 255), rgb(255, 0, 0)" },
    { "color": "Blanco / Negro", "codigo": "rgb(255, 255, 255), rgb(0, 0, 0)" },
    { "color": "Blanco / Azul Rey", "codigo": "rgb(255, 255, 255), rgb(0, 35, 102)" },
    { "color": "Blanco / Verde", "codigo": "rgb(255, 255, 255), rgb(0, 128, 0)" },
    { "color": "Naranja Neón / Blanco", "codigo": "rgb(255, 165, 0), rgb(255, 255, 255)" },
    { "color": "Blanco / Azul Oscuro", "codigo": "rgb(255, 255, 255), rgb(0, 0, 139)" },
    { "color": "Blanco / Rosado Neón", "codigo": "rgb(255, 255, 255), rgb(255, 0, 128)" },
    { "color": "Azul Royal", "codigo": "rgb(0, 35, 102)" },
    { "color": "Blanco / Azul", "codigo": "rgb(255, 255, 255), rgb(0, 0, 255)" },
    { "color": "Azul Traslúcido", "codigo": "rgba(0, 0, 255, 0.5)" },
    { "color": "Morado Sólido", "codigo": "rgb(128, 0, 128)" },
    { "color": "Naranja Sólido", "codigo": "rgb(255, 165, 0)" },
    { "color": " Rojo", "codigo": "rgb(255, 0, 0)" },
    { "color": "Blanco Traslúcido", "codigo": "rgba(255, 255, 255, 0.5)" },
    { "color": "Azul Turquesa", "codigo": "rgb(64, 224, 208)" },
    { "color": "Amarillo Limón", "codigo": "rgb(255, 255, 0)" },
    { "color": "Negro / Rojo", "codigo": "rgb(0, 0, 0), rgb(255, 0, 0)" },
    { "color": "Negro / Azul Rey", "codigo": "rgb(0, 0, 0), rgb(0, 35, 102)" },
    { "color": "Negro / Negro", "codigo": "rgb(0, 0, 0), rgb(0, 0, 0)" },
    { "color": "Negro / Azul Oscuro", "codigo": "rgb(0, 0, 0), rgb(0, 0, 139)" },
    { "color": "Naranja Traslúcido", "codigo": "rgba(255, 165, 0, 0.5)" },
    { "color": "Rosado Traslúcido", "codigo": "rgba(255, 192, 203, 0.5)" },
    { "color": "Rojo Sólido", "codigo": "rgb(255, 0, 0)" },
    { "color": "Verde Esmeralda Traslúcido", "codigo": "rgba(80, 200, 120, 0.5)" },
    { "color": "Morado Traslúcido", "codigo": "rgba(128, 0, 128, 0.5)" },
    { "color": "Azul Rey Sólido", "codigo": "rgb(0, 35, 102)" },
    { "color": "Amarillo Traslúcido", "codigo": "rgba(255, 255, 0, 0.5)" },
    { "color": "Rojo Traslúcido", "codigo": "rgba(255, 0, 0, 0.5)" },
    { "color": "Azul Rey Traslúcido", "codigo": "rgba(0, 35, 102, 0.5)" },
    { "color": "Morado ", "codigo": "rgb(128, 0, 128)" },
    { "color": "Rosado ", "codigo": "rgb(255, 192, 203)" }
];