/*
 * Catálogo editable de PAI.
 * Cambia aquí nombres, descripciones, precios, imágenes y stock de cada formato.
 * Los precios son valores de ejemplo en bolivianos (Bs), aún no conectados a pagos.
 */
const PAI_PRODUCTS = [
  {
    id: "pai-lata",
    name: "PAI · Lata individual",
    description: "Una lata fría de 330 ml. Ideal para probar el sabor.",
    size: "330 ml",
    price: 8,
    pack: "330 ML",
    image: "assets/products/pai-lata.svg",
    featured: false
  },
  {
    id: "pai-pack-4",
    name: "PAI · Pack de 4",
    description: "Cuatro latas para compartir o probar en compañía.",
    size: "4 × 330 ml",
    price: 30,
    pack: "PACK DE 4",
    image: "assets/products/pai-pack-4.svg",
    featured: false
  },
  {
    id: "pai-pack-6",
    name: "PAI · Pack de 6",
    description: "Seis latas para compartir o guardar para después.",
    size: "6 × 330 ml",
    price: 42,
    pack: "PACK DE 6",
    image: "assets/products/pai-pack-6.svg",
    featured: true
  },
  {
    id: "pai-pack-12",
    name: "PAI · Pack de 12",
    description: "Doce latas para tener siempre PAI a mano.",
    size: "12 × 330 ml",
    price: 78,
    pack: "PACK DE 12",
    image: "assets/products/pai-pack-12.svg",
    featured: false
  },
  {
    id: "pai-pack-24",
    name: "PAI · Pack de 24",
    description: "Veinticuatro latas para tener PAI listo para cualquier plan.",
    size: "24 × 330 ml",
    price: 144,
    pack: "PACK DE 24",
    image: "assets/products/pai-pack-24.svg",
    featured: false
  }
];
