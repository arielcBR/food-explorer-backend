const dishes = [
		{
			"name": "Salada Ravanello",
			"category": "meal",
			"price": 49.97,
			"description": "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.",
			"ingredients": [
				{id: null, name: "rabanete"}, 
				{id: null, name: "folhas verdes"},
				{id: null, name: "molho agridoce"},
				{id: null, name:  "gergelim"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Spaguetti Gambe",
			"category": "meal",
			"price": 79.97,
			"description": "Massa fresca com camarões e pesto.",
			"ingredients": [
				{id: null, name: "massa fresca"}, 
				{id: null, name: "camarões"}, 
				{id: null, name: "pesto"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Pizza de Mussarela",
			"category": "meal",
			"price": 49.99,
			"description": "Pizza crocante com molho de tomate e mussarela derretida.",
			"ingredients": [
				{id: null, name: "massa"}, 
				{id: null, name: "molho de tomate"}, 
				{id: null, name: "mussarela"}, 
				{id: null, name: "orégano"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Empanada de Carne",
			"category": "meal",
			"price": 5.99,
			"description": "massa folhada crocante com recheio de carne bovina.",
			"ingredients": [
				{id: null, name: "massa folhada"}, 
				{id: null, name: "carne"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Bife de Chorizo",
			"category": "meal",
			"price": 70.99,
			"description": "bife de chorizo suculento e macio assado na brasa.",
			"ingredients": [
				{id: null, name: "carne"},
				{id: null, name: "ervas finas"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Massa Carbonara",
			"category": "meal",
			"price": 27.99,
			"description": "Massa italiana com molho cremoso e bacon.",
			"ingredients": [
				{id: null, name:"massa"}, 
				{id: null, name:"bacon"}, 
				{id: null, name:"ovos"}, 
				{id: null, name:"queijo parmesão"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Strogonoff de Frango",
			"category": "meal",
			"price": 34.99,
			"description": "Delicioso frango com molho cremoso de strogonoff.",
			"ingredients": [
				{id: null, name:"frango"}, 
				{id: null, name:"creme de leite"}, 
				{id: null, name:"champignon"}, 
				{id: null, name:"molho de tomate"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Prugna Pie",
			"category": "dessert",
			"price": 24.99,
			"description": "Torta de ameixa com massa amanteigada, polvilho em açúcar.",
			"ingredients": [
				{id: null, name:"ameixa"}, 
				{id: null, name:"manteiga"}, 
				{id: null, name:"açucar"}, 
				{id: null, name:"licor"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Peachy Pastrie",
			"category": "dessert",
			"price": 32.99,
			"description": "Delicioso folheado de pêssego com folhas de hortelã.",
			"ingredients": [
				{id: null, name:"massa folhada"}, 
				{id: null, name:"manteiga"}, 
				{id: null, name:"pessêgo"}, 
				{id: null, name:"hortelã"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Macarons",
			"category": "dessert",
			"price": 29.99,
			"description": "Farinha de amêndoas, manteiga, claras e açúcar.",
			"ingredients": [
				{id: null, name:"farinha de amêndoa"}, 
				{id: null, name:"manteiga"}, 
				{id: null, name:"claras"}, 
				{id: null, name:"açucar"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Bolo de Damasco",
			"category": "dessert",
			"price": 29.99,
			"description": "Damascos frescos em uma massa sem glúten.",
			"ingredients": [
				{id: null, name:"damascos"}, 
				{id: null, name:"manteiga"}, 
				{id: null, name:"claras"}, 
				{id: null, name:"açucar"}
			],
			"picture": "standard_image.png"
		}
		,
		{
			"name": "Tiramisu",
			"category": "dessert",
			"price": 29.99,
			"description": "Camadas de mascarpone e biscoitos embebidos em café.",
			"ingredients": [
				{id: null, name: "mascarpone"}, 
				{id: null, name: "biscoitos"}, 
				{id: null, name: "café"}, 
				{id: null, name: "cacau"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Cheesecake de Morango",
			"category": "dessert",
			"price": 39.99,
			"description": "Cheesecake cremoso com calda de morango fresco.",
			"ingredients": [
				{id: null, name: "cream cheese"},
				{id: null, name: "morango"},
				{id: null, name: "biscoito"},
				{id: null, name: "açúcar"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Suco de Maracujá",
			"category": "drink",
			"price": 9.99,
			"description": "Suco de maracujá gelado, cremoso, docinho.",
			"ingredients": [
				{id: null, name: "água"},
				{id: null, name: "maracujá"},
				{id: null, name: "açucar"},
				{id: null, name: "gelo"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Tè d'autunno",
			"category": "drink",
			"price": 19.99,
			"description": "Chá de anis, canela e limão. Sinta o outono italiano.",
			"ingredients": [
				{id: null, name: "agua"},
				{id: null, name: "anis"},
				{id: null, name: "canela"},
				{id: null, name: "limão"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Pomo Bourbon",
			"category": "drink",
			"price": 9.99,
			"description": "Maçã, whisky, canela. On the rocks.",
			"ingredients": [
				{id: null, name: "Whisky"},
				{id: null, name: "maça"},
				{id: null, name: "canela"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Capuccino",
			"category": "drink",
			"price": 6.99,
			"description": "Café expresso com leite vaporizado e espuma.",
			"ingredients": [
				{id: null, name: "café expresso"},
				{id: null, name: "leite"},
				{id: null, name: "açúcar"},
				{id: null, name: "canela"},
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Caipirinha",
			"category": "drink",
			"price": 12.99,
			"description": "Tradicional bebida brasileira feita com cachaça.",
			"ingredients": [
				{id: null, name: "cachaça"},
				{id: null, name: "limão" },
				{id: null, name: "açúcar"},
				{id: null, name: "gelo"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Latte",
			"category": "drink",
			"price": 5.99,
			"description": "Café expresso com leite vaporizado, suave e cremoso.",
			"ingredients": [
				{id: null, name: "café expresso"},
				{id: null, name: "leite"},
				{id: null, name: "açúcar"},
				{id: null, name: "espuma de leite"}
			],
			"picture": "standard_image.png"
		},
		{
			"name": "Piña Colada",
			"category": "drink",
			"price": 10.99,
			"description": "Bebida tropical com rum, abacaxi e coco.",
			"ingredients": [
				{id: null, name: "rum"},
				{id: null, name: "abacaxi"},
				{id: null, name: "leite de coco"},
				{id: null, name: "gelo"}
			],
			"picture": "standard_image.png"
		},			
];

module.exports = dishes;