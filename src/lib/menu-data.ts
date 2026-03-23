export interface MenuItem {
  name: string;
  description: string;
  price: number;
  tags?: ("seafood" | "vegetarian" | "spicy" | "signature" | "premium")[];
}

export interface MenuCategory {
  id: string;
  name: string;
  nameEn: string;
  items: MenuItem[];
}

export interface DrinkItem {
  name: string;
  price: number;
}

export interface DrinkCategory {
  id: string;
  name: string;
  nameEn: string;
  items: DrinkItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "entradas",
    name: "Entradas",
    nameEn: "Appetizers",
    items: [
      {
        name: "Rollitos Crocantes",
        description:
          "Rellenos de rabo de toro con sus jugos de cocción lenta, mayonesa de hongos y queso de cabra.",
        price: 65000,
        tags: ["signature"],
      },
      {
        name: "Tiradito de Pescado Blanco",
        description:
          "En aderezo acevichado de carambola, cebollitas encurtidas, pimientos tatemados, y aceite de eneldo.",
        price: 65000,
        tags: ["seafood"],
      },
      {
        name: "Ceviche de Pescado Blanco",
        description:
          "Marinado al estilo mediterráneo con un toque de leche de coco, plumas de cebolla roja, cremoso de pimientos ahumados, salsa huancaína, perejil fresco, todo puesto sobre bocados de pan ciabatta tostado.",
        price: 65000,
        tags: ["seafood", "signature"],
      },
      {
        name: "Tartar de Res",
        description:
          "Carne magra de res finamente picada adobada al estilo clásico francés, con un cremoso de aguacate, servido en bocados de pan de masa madre tostado, alioli, aceite de trufa blanca y chips de pan baguette.",
        price: 65000,
        tags: ["premium"],
      },
      {
        name: "Tostada de Salmón",
        description:
          "Filete de salmón curado por 48hrs aromatizado con piel de naranja y limón, servido en una tostada de pan ciabatta, con queso crema, cebollitas encurtidas, alcaparras, mayonesa de eneldo y alioli.",
        price: 60000,
        tags: ["seafood"],
      },
      {
        name: "Taquitos de Camarón",
        description:
          "Salteados en mantequilla de ajo con vino blanco y un toque de paprika, servidos con alioli de la casa, cama de aguacate majado, cebollitas encurtidas, perejil fresco y mayonesa de eneldo.",
        price: 60000,
        tags: ["seafood"],
      },
      {
        name: "Tartar Salmón",
        description:
          "Marinado en yogur griego de búfala, pimentón rojo, pepino, toque fresco de albahaca y hierbabuena, con un toque de peperoncino y paprika, servidos en pan pita crujiente y mayonesa de eneldo.",
        price: 65000,
        tags: ["seafood"],
      },
      {
        name: "Tartar de Atún",
        description:
          "Con mango y aguacate, aceite de olivas, mayonesa de aceitunas, kalamata y un toque refrescante de hierbabuena, servido sobre pan tostado de masa madre.",
        price: 65000,
        tags: ["seafood"],
      },
      {
        name: "Berenjena Tres Quesos",
        description:
          "Servidos en una cama de salsa pomodoro al estilo clásico italiano, aromatizado con albahaca, bañados en miel ahumada de la casa y aceite trufado.",
        price: 60000,
        tags: ["vegetarian"],
      },
      {
        name: "Pulpo Rostizado",
        description:
          "Pulpo a la parrilla sobre puré cremoso de yuca y chimichurri de la casa.",
        price: 65000,
        tags: ["seafood", "signature"],
      },
      {
        name: "Bruschetta Capresse",
        description:
          "Clásico italiano, en pan de masa madre tostado sobre una cama de pesto de albahaca, servido con tomates horneados, bocconcini di búfala y aguacate majado.",
        price: 65000,
        tags: ["vegetarian"],
      },
      {
        name: "Wrap de Pollo Parrillado",
        description:
          "Con cebollas y pimientos rostizados, envueltos en tortilla de trigo dorada con un toque de mantequilla, rellena con queso mozzarella y una cama cremosa de mayonesa de la casa picante.",
        price: 55000,
        tags: ["spicy"],
      },
    ],
  },
  {
    id: "ensaladas",
    name: "Ensaladas",
    nameEn: "Salads",
    items: [
      {
        name: "Ensalada Mediterránea",
        description:
          "Con tomates, pepino, aceitunas verdes y moradas, un toque de cebolla morada, aderezada con aceite de oliva, perejil fresco y coronada con queso feta.",
        price: 65000,
        tags: ["vegetarian"],
      },
      {
        name: "Ensalada César Clásica",
        description:
          "Lechuga romana, queso parmesano y crotones de pan tostado.",
        price: 50000,
        tags: ["vegetarian"],
      },
      {
        name: "Ensalada de Quinoa",
        description:
          "Con vegetales rostizados, toque cítrico, alioli, perejil y chips de pan pita.",
        price: 65000,
        tags: ["vegetarian"],
      },
      {
        name: "Ensalada Nicoise",
        description:
          "Atún sellado, tomates uvalina, aceitunas, huevo cocido, papa cocida, anchoas, cebolla encurtida y mix asiático aderezado con aceite de oliva y vinagre balsámico.",
        price: 65000,
        tags: ["seafood"],
      },
      {
        name: "Ensalada de Sandía Comprimida",
        description:
          "Queso feta, almendras tostadas vinagreta clásica y miel ahumada.",
        price: 65000,
        tags: ["vegetarian"],
      },
      {
        name: "Ensalada de Atún Veggie",
        description:
          "Sandía macerada en ron Caldas y jugo de granada, aromatizada con albahaca y hierbabuena, servida en una cama de mix asiático con aceite virgen extra de oliva, limón, almendras tostadas, queso feta, miel ahumada y aceite de trufa blanca.",
        price: 65000,
        tags: ["seafood"],
      },
    ],
  },
  {
    id: "pizzas",
    name: "Pizzas Artesanales",
    nameEn: "Artisan Pizzas",
    items: [
      {
        name: "Margherita Clásica",
        description:
          "Base artesanal con salsa napolitana, mozzarella, bocconcine y albahaca.",
        price: 40000,
        tags: ["vegetarian"],
      },
      {
        name: "Cuatro Quesos",
        description: "Mozzarella, parmesano, de cabra y burrata.",
        price: 50000,
        tags: ["vegetarian"],
      },
      {
        name: "Hongos Confitados y Trufa",
        description:
          "Hongos lentamente cocinados en aceite aromático, realizados con el delicado y elegante perfume de la trufa.",
        price: 60000,
        tags: ["vegetarian", "premium"],
      },
      {
        name: "Stracciatella",
        description:
          "Masa fina y crujiente con burrata, tomate y berenjena asada con pesto de albaca.",
        price: 55000,
        tags: ["vegetarian"],
      },
      {
        name: "Pepperoni",
        description:
          "Base artesanal de salsa napolitana, mozzarella fundida y pepperoni seleccionado.",
        price: 45000,
      },
    ],
  },
  {
    id: "hamburguesas",
    name: "Hamburguesas",
    nameEn: "Burgers",
    items: [
      {
        name: "Classic Burguer",
        description:
          "Pan brioche artesanal, 160 g de carne de res premium, queso americano, acompañado de papas fritas.",
        price: 60000,
      },
      {
        name: "Cheese Burguer",
        description:
          "Pan brioche artesanal, 160 g de carne de res premium, queso americano, pepinillos, cebolla roja, tomate, lechuga y acompañado de papas fritas.",
        price: 65000,
      },
      {
        name: "Parisian Burguer",
        description:
          "Pan brioche artesanal, 160 g de carne de res premium, cebollas caramelizadas, queso de cabra, mix de rúcula, aguacate y salsa aioli, servido con papas fritas.",
        price: 70000,
        tags: ["signature"],
      },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    nameEn: "Pasta",
    items: [
      {
        name: "Penne al Pesto",
        description:
          "Pasta corta mezclada con salsa pesto de albahaca, aceite de oliva, ajo, nueces o piñones y queso parmesano. Fresca, aromática y herbal.",
        price: 55000,
        tags: ["vegetarian"],
      },
      {
        name: "Penne a la Carbonara",
        description:
          "Penne en cremosa salsa a base de yema de huevo, queso parmesano o pecorino y panceta dorada. Intensa y reconfortante.",
        price: 65000,
      },
      {
        name: "Penne a la Marinera",
        description:
          "Penne en base de tomate con almejas, mejillones, calamar y camaron.",
        price: 65000,
        tags: ["seafood"],
      },
      {
        name: "Penne al Pistacho",
        description:
          "Pasta corta en una cremosa salsa de pistachos, queso parmesano y aceite de trufa blanca, servido con tostadas de pan baguette.",
        price: 65000,
        tags: ["vegetarian", "premium"],
      },
      {
        name: "Penne a la Puttanesca",
        description:
          "Penne en salsa de tomate con aceitunas, alcaparras, ajo y anchoas. Sabor mediterráneo, intenso y salino.",
        price: 65000,
      },
    ],
  },
  {
    id: "pescado",
    name: "Pescado",
    nameEn: "Seafood",
    items: [
      {
        name: "Arroz Meloso de Mariscos",
        description:
          "Mix de mariscos al ajillo servidos en una cama de arroz cremoso hecho a base de caldo de pescado y un sofrito de tomates y pimientos rostizados, con alioli y mayonesa de kalamata.",
        price: 80000,
        tags: ["seafood", "signature"],
      },
      {
        name: "Risotto Negro",
        description:
          "En tinta de calamar con Langostinos rostizados en una mantequilla ahumada de paprika y vino blanco, toque de ajo, servido con cebollitas encurtidas, salsa huancaína y perejil fresco.",
        price: 135000,
        tags: ["seafood", "premium"],
      },
      {
        name: "Clásico Fish & Chips",
        description:
          "Filete de pescado blanco rebozado en fécula de maíz, paprika y pimienta negra, acompañado de chips de papa artesanal y una clásica salsa tártara.",
        price: 70000,
        tags: ["seafood"],
      },
      {
        name: "Mejillones Provenzal",
        description:
          "Salteados con mantequilla de ajo, vino blanco, caldo de pescado, pimientos y cebollas, aromatizado con perejil fresco servido con tostones de pan masa madre.",
        price: 70000,
        tags: ["seafood"],
      },
      {
        name: "Filete de Tilapia a la Plancha",
        description:
          "Filete de tilapia fresco, sazonado y cocinado a la plancha hasta lograr un exterior dorado y jugoso por dentro. Ligero, saludable y de sabor suave.",
        price: 65000,
        tags: ["seafood"],
      },
      {
        name: "Fettuccini Marinera",
        description:
          "Un clásico isleño, con mix de mariscos frescos al ajillo, caldo de pescado, vino blanco perejil y un toque de peperoncino.",
        price: 65000,
        tags: ["seafood"],
      },
    ],
  },
  {
    id: "aves",
    name: "Aves",
    nameEn: "Poultry",
    items: [
      {
        name: "Pollo Rostizado al Horno",
        description: "Con papitas criollas fritas y alioli de la casa.",
        price: 70000,
      },
      {
        name: "Pechuga al Grill",
        description:
          "Pechuga deshuesada y marinada con ajo y rub de la casa, grillada a la parrilla con una mantequilla compuesta de ajo y romero, servida con papa francesa y alioli de la casa.",
        price: 70000,
      },
      {
        name: "Clásico Chicken & Chips",
        description:
          "Crujientes piezas de pollo dorado acompañadas de papas fritas. Un clásico reconfortante, crocante por fuera y jugoso por dentro.",
        price: 65000,
      },
      {
        name: "Chicken Finger y Miel Mostaza Ahumada",
        description:
          "Pechuga de pollo marinada y tempurizada acompañado de papa francesa y una deliciosa miel mostaza ahumada y ligeramente picante.",
        price: 65000,
        tags: ["spicy"],
      },
    ],
  },
  {
    id: "cortes",
    name: "Cortes Angus",
    nameEn: "Black Angus Cuts",
    items: [
      {
        name: "Entraña 350 g",
        description:
          "Corte fino y jugoso a la parrilla, sazonado con sal marina y acompañado de mantequilla de hierbas.",
        price: 235000,
        tags: ["premium"],
      },
      {
        name: "Cowboy 1 kg",
        description:
          "Corte premium jugoso y lleno de sabor, ideal para compartir y disfrutar a la parrilla.",
        price: 650000,
        tags: ["premium", "signature"],
      },
      {
        name: "Rib Eye 350 g",
        description:
          "Corte marmoleado y tierno, sellado a fuego alto para conservar todo su jugo.",
        price: 285000,
        tags: ["premium"],
      },
      {
        name: "Picaña 350 g",
        description:
          "Corte jugoso con capa de grasa dorada y crujiente, asado lentamente para potenciar su sabor.",
        price: 195000,
        tags: ["premium"],
      },
      {
        name: "New York 300 g",
        description:
          "Corte firme, sellado al carbón para lograr un equilibrio perfecto entre jugosidad y sabor ahumado.",
        price: 235000,
        tags: ["premium"],
      },
    ],
  },
  {
    id: "compartir",
    name: "Para Compartir",
    nameEn: "Sharing Plates",
    items: [
      {
        name: "Fritos de Mar",
        description:
          "Anillos de Calamar, Camarones, Pescado Blanco y Brócoli tempurizados, servidos con salsa tártara clásica, cascos de limón y tajín, ideal para compartir en familia (4 personas).",
        price: 110000,
        tags: ["seafood"],
      },
      {
        name: "Fritos Típicos Bellini",
        description:
          "Arepa e'huevo y camarón, carimañolas de pulpo y empanadas de salpicón de pescado, acompañados de nuestra salsa picante de la casa y suero costeño, una combinación que se remonta a la historia del caribe colombiano con un toque novedoso y creativo.",
        price: 110000,
        tags: ["seafood", "signature"],
      },
    ],
  },
  {
    id: "adicionales",
    name: "Adicionales",
    nameEn: "Sides",
    items: [
      {
        name: "Patatas Bravas",
        description:
          "Cubos dorados de papa servidos con alioli suave y salsa brava ligeramente picante.",
        price: 20000,
        tags: ["vegetarian", "spicy"],
      },
      {
        name: "Patatas Francesas",
        description: "Papas fritas clásicas.",
        price: 15000,
        tags: ["vegetarian"],
      },
      {
        name: "Papas en Casco",
        description:
          "Papas rústicas horneadas con piel, sazonadas con hierbas y sal marina.",
        price: 15000,
        tags: ["vegetarian"],
      },
    ],
  },
];

export const drinkCategories: DrinkCategory[] = [
  {
    id: "soft-drinks",
    name: "Bebidas Suaves",
    nameEn: "Soft Drinks",
    items: [
      { name: "Agua Manantial", price: 15000 },
      { name: "Agua Manantial con Gas", price: 15000 },
      { name: "Coca Cola Original", price: 16000 },
      { name: "Coca Cola Zero", price: 16000 },
      { name: "Tonica", price: 16000 },
      { name: "Ginger Beer", price: 18000 },
      { name: "Monster", price: 25000 },
      { name: "Ginger", price: 16000 },
      { name: "Sprite", price: 16000 },
      { name: "Quatro", price: 16000 },
      { name: "Soda", price: 16000 },
    ],
  },
  {
    id: "coffee",
    name: "Café",
    nameEn: "Coffee",
    items: [{ name: "Americano", price: 15000 }],
  },
  {
    id: "beers",
    name: "Cervezas",
    nameEn: "Beers",
    items: [
      { name: "Costeñita", price: 15000 },
      { name: "Coronita", price: 18000 },
      { name: "Stella Artois", price: 20000 },
      { name: "Michelado", price: 7000 },
    ],
  },
  {
    id: "cocktails",
    name: "Cócteles",
    nameEn: "Cocktails",
    items: [
      { name: "Aperol Spritz", price: 65000 },
      { name: "Mojito", price: 65000 },
      { name: "Piña Colada", price: 65000 },
      { name: "Paloma", price: 65000 },
      { name: "Tequila Sunrise", price: 65000 },
      { name: "Moscow Mule", price: 65000 },
      { name: "Daiquiri", price: 65000 },
      { name: "Margarita Mezcal", price: 65000 },
      { name: "Cuba Libre", price: 65000 },
      { name: "Negroni", price: 65000 },
      { name: "Gin Tonic", price: 65000 },
      { name: "Margarita", price: 65000 },
    ],
  },
  {
    id: "spirits",
    name: "Tragos",
    nameEn: "Spirits",
    items: [
      { name: "Montelobos", price: 70000 },
      { name: "Ojo de Tigre", price: 60000 },
      { name: "Patrón Silver", price: 65000 },
      { name: "Patrón Reposado", price: 70000 },
      { name: "Patrón Cristiano", price: 90000 },
      { name: "Don Julio 70", price: 90000 },
      { name: "Grey Goose", price: 85000 },
      { name: "SKY", price: 60000 },
      { name: "Hechicera", price: 80000 },
      { name: "Havana 7 Años", price: 65000 },
      { name: "Bacardi Añejo", price: 55000 },
      { name: "Jagermeister", price: 65000 },
    ],
  },
  {
    id: "bottles-tequila",
    name: "Tequilas y Mezcales",
    nameEn: "Tequilas & Mezcals",
    items: [
      { name: "Patrón Silver", price: 550000 },
      { name: "Patrón Reposado", price: 600000 },
      { name: "Don Julio 70", price: 900000 },
      { name: "Patrón Añejo", price: 550000 },
      { name: "Patrón Cristalino", price: 700000 },
      { name: "Don Julio 1942", price: 2400000 },
    ],
  },
  {
    id: "bottles-gin",
    name: "Ginebra",
    nameEn: "Gin",
    items: [
      { name: "Hendricks", price: 850000 },
      { name: "Bulldog", price: 750000 },
      { name: "Beefeater 24", price: 800000 },
      { name: "Bombay Sapphire", price: 600000 },
    ],
  },
  {
    id: "bottles-vodka",
    name: "Vodka",
    nameEn: "Vodka",
    items: [
      { name: "Grey Goose", price: 700000 },
      { name: "Belvedere 1.75 lt", price: 1500000 },
      { name: "SKY", price: 400000 },
    ],
  },
  {
    id: "bottles-whisky",
    name: "Whisky",
    nameEn: "Whisky",
    items: [
      { name: "The Macallan 12 años", price: 900000 },
      { name: "Blue Label", price: 1500000 },
    ],
  },
  {
    id: "bottles-rum",
    name: "Ron",
    nameEn: "Rum",
    items: [
      { name: "Havana 7 Años", price: 400000 },
      { name: "Bacardi Añejo", price: 380000 },
      { name: "Hechicera", price: 650000 },
    ],
  },
  {
    id: "bottles-aguardiente",
    name: "Aguardiente",
    nameEn: "Aguardiente",
    items: [
      { name: "Amarillo", price: 350000 },
      { name: "Tapa Azul", price: 300000 },
      { name: "Tapa Verde", price: 280000 },
      { name: "Real", price: 450000 },
    ],
  },
  {
    id: "champagne",
    name: "Champagne",
    nameEn: "Champagne",
    items: [
      { name: "Veuve Clicquot", price: 1100000 },
      { name: "Don Periñong", price: 3000000 },
      { name: "Moet Imperial", price: 900000 },
      { name: "Chandon Brut", price: 230000 },
    ],
  },
  {
    id: "wines",
    name: "Vinos",
    nameEn: "Wines",
    items: [
      { name: "Sauvignon Blanc", price: 120000 },
      { name: "Cabernet Sauvignon", price: 120000 },
      { name: "Rosé", price: 120000 },
      { name: "Merlot", price: 120000 },
    ],
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
