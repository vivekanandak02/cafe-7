export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isVeg: boolean;
  image: string;
  badge?: string;
  description?: string;
  isSpicy?: boolean;
  pieces?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    "id": "chicken-crunch-burgers",
    "name": "Chicken Crunch Burgers",
    "description": "Crispy, juicy chicken patties with signature sauces & fresh brioche buns",
    "items": [
      {
        "id": "cb-1",
        "name": "Classic Big Crunch Burger",
        "category": "chicken-crunch-burgers",
        "price": 259,
        "isVeg": false,
        "image": "/images/items/classic-big-crunch-burger.webp",
        "badge": "Popular",
        "description": "Golden fried crispy chicken breast patty, fresh iceberg lettuce, house mayo on toasted brioche."
      },
      {
        "id": "cb-2",
        "name": "Powerhouse BBQ Burger",
        "category": "chicken-crunch-burgers",
        "price": 269,
        "isVeg": false,
        "image": "/images/items/powerhouse-bbq-burger.webp",
        "description": "Crunchy fried chicken smothered with smoky BBQ glaze, caramelized onions and melted cheese."
      },
      {
        "id": "cb-3",
        "name": "Thriller Burger",
        "category": "chicken-crunch-burgers",
        "price": 279,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/thriller-burger.webp",
        "badge": "Chef's Special",
        "description": "Spicy crunch chicken patty dressed in fiery relish, jalapeños, and spiced signature sauce."
      },
      {
        "id": "cb-4",
        "name": "Honey Queen Burger",
        "category": "chicken-crunch-burgers",
        "price": 289,
        "isVeg": false,
        "image": "/images/items/honey-queen-burger.webp",
        "description": "Crispy chicken glazed in sweet hot honey mustard, crispy slaw and creamy cheese."
      },
      {
        "id": "cb-5",
        "name": "K-Pop Sesame Burger",
        "category": "chicken-crunch-burgers",
        "price": 299,
        "isVeg": false,
        "image": "/images/items/k-pop-sesame-burger.webp",
        "badge": "Trending",
        "description": "Korean glazed crunchy chicken patty topped with toasted sesame seeds and tangy kimchi slaw."
      },
      {
        "id": "cb-6",
        "name": "Wildfire Chipotle Burger",
        "category": "chicken-crunch-burgers",
        "price": 299,
        "isVeg": false,
        "image": "/images/items/wildfire-chipotle-burger.webp",
        "description": "Smoky chipotle infused crispy chicken, pepper jack melt, and crispy golden onion rings."
      }
    ]
  },
  {
    "id": "grilled-chicken-burgers",
    "name": "Grilled Chicken Burgers",
    "description": "Tender herb-marinated grilled chicken fillets flame-seared to perfection",
    "items": [
      {
        "id": "gb-1",
        "name": "Signature Grilled Burger",
        "category": "grilled-chicken-burgers",
        "price": 249,
        "isVeg": false,
        "image": "/images/items/signature-grilled-burger.webp",
        "description": "Herb marinated flame-grilled chicken breast, garlic aioli, tomato and fresh crisp greens."
      },
      {
        "id": "gb-2",
        "name": "Spicy Grilled Burger",
        "category": "grilled-chicken-burgers",
        "price": 249,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/spicy-grilled-burger.webp",
        "description": "Fiery flame-grilled chicken patty topped with spicy dip and charred peppers."
      },
      {
        "id": "gb-3",
        "name": "Double Stack Grilled Burger",
        "category": "grilled-chicken-burgers",
        "price": 299,
        "isVeg": false,
        "image": "/images/items/double-stack-grilled-burger.webp",
        "badge": "Heavy Hitter",
        "description": "Twin grilled chicken patties, double cheddar slice, and Café 7 signature smokey sauce."
      },
      {
        "id": "gb-4",
        "name": "Double Stack Spicy Grilled Burger",
        "category": "grilled-chicken-burgers",
        "price": 299,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/double-stack-spicy-grilled-burger.webp",
        "description": "Double flame-grilled spicy patties loaded with spicy jalapeño sauce and Monterey cheese."
      }
    ]
  },
  {
    "id": "veg-burgers",
    "name": "Veg Burgers",
    "description": "Artisanal vegetarian patties prepared with premium veggies, paneer & melted cheeses",
    "items": [
      {
        "id": "vb-1",
        "name": "Garden Crunch Burger",
        "category": "veg-burgers",
        "price": 209,
        "isVeg": true,
        "image": "/images/items/gardern-crunch-burger.webp",
        "description": "Crisp seasoned garden vegetable patty, crisp lettuce, sliced tomatoes and tangy herb mayo."
      },
      {
        "id": "vb-2",
        "name": "Spicy Garden Burger",
        "category": "veg-burgers",
        "price": 209,
        "isVeg": true,
        "isSpicy": true,
        "image": "/images/items/spicy-gardern-burger.webp",
        "description": "Zesty spiced veggie patty with spicy chipotle sauce, pickled gherkins and jalapeños."
      },
      {
        "id": "vb-3",
        "name": "Mushroom Cheese Melt Burger",
        "category": "veg-burgers",
        "price": 249,
        "isVeg": true,
        "image": "/images/items/mushroom-burger.webp",
        "badge": "Gourmet",
        "description": "Sautéed garlic button mushrooms, Swiss cheese melt, and savoury caramelized onion spread."
      },
      {
        "id": "vb-4",
        "name": "Paneer Royal Burger",
        "category": "veg-burgers",
        "price": 249,
        "isVeg": true,
        "image": "/images/items/panner-burger.webp",
        "badge": "Bestseller",
        "description": "Crispy crusted spiced cottage cheese block, makhani drizzle, crisp onions and minted yogurt spread."
      }
    ]
  },
  {
    "id": "wraps",
    "name": "Wraps",
    "description": "Freshly rolled soft tortillas packed with fresh greens, signature fillings & dips",
    "items": [
      {
        "id": "wr-1",
        "name": "Persian Roast Shawarma Wrap",
        "category": "wraps",
        "price": 229,
        "isVeg": false,
        "image": "/images/items/persian-shawarma-wrap.webp",
        "badge": "Authentic",
        "description": "Slow-roasted marinated chicken strips, pickled turnip, fries, and authentic garlic toum."
      },
      {
        "id": "wr-2",
        "name": "Golden Honey Wrap",
        "category": "wraps",
        "price": 239,
        "isVeg": false,
        "image": "/images/items/goldern-honey-wrap.webp",
        "description": "Crispy golden chicken tenders, honey mustard sauce, shredded iceberg and cheddar."
      },
      {
        "id": "wr-3",
        "name": "Mushroom Melt Wrap",
        "category": "wraps",
        "price": 239,
        "isVeg": true,
        "image": "/images/items/mushroom-melt-burger.webp",
        "description": "Pan-roasted mushrooms smothered in molten cheddar and mozzarella blend in a warm tortilla."
      },
      {
        "id": "wr-4",
        "name": "Smoky Paneer BBQ Wrap",
        "category": "wraps",
        "price": 239,
        "isVeg": true,
        "image": "/images/items/smokey-panner-wrap.webp",
        "description": "Clay oven smoked paneer cubes, charred peppers, BBQ glaze and spiced onions."
      },
      {
        "id": "wr-5",
        "name": "Wildfire Grill Wrap",
        "category": "wraps",
        "price": 269,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/wildfire-chipotle-wrap.webp",
        "description": "Flame-grilled chicken strips, habanero chipotle glaze, bell peppers and shredded cheese."
      }
    ]
  },
  {
    "id": "appetizers",
    "name": "Appetizers",
    "description": "Crowd favorite crunchies, poppers and cheesy bites for sharing",
    "items": [
      {
        "id": "ap-1",
        "name": "Jalapeño Cheese Poppers",
        "category": "appetizers",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/jalapeno-cheese-poppers.webp",
        "badge": "Hot & Cheesy",
        "description": "Golden crumbed bite-sized bites bursting with molten cheddar and spicy jalapeño bits."
      },
      {
        "id": "ap-2",
        "name": "Golden Chicken Nuggets",
        "category": "appetizers",
        "price": 249,
        "isVeg": false,
        "image": "/images/items/chicken-nuggets.webp",
        "badge": "Kids & All",
        "description": "Tender minced chicken breast nuggets fried to deep golden crunch, served with tangy dip."
      },
      {
        "id": "ap-3",
        "name": "Chicken Cheese Balls",
        "category": "appetizers",
        "price": 249,
        "isVeg": false,
        "image": "/images/items/chicken-cheese-balls.webp",
        "badge": "Must Try",
        "description": "Crispy seasoned chicken spheres oozing with molten gooey mozzarella cheese."
      },
      {
        "id": "ap-4",
        "name": "Firecracker Chicken Bites",
        "category": "appetizers",
        "price": 219,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/fire-crackers-chicken-bites.webp",
        "badge": "Fiery",
        "description": "Crunchy bite-sized chicken pops tossed in a fiery, lip-smacking firecracker seasoning."
      },
      {
        "id": "ap-5",
        "name": "Honey Blaze Popcorn",
        "category": "appetizers",
        "price": 229,
        "isVeg": false,
        "image": "/images/items/honey-glaze-popcorn.webp",
        "description": "Crispy chicken popcorn tossed in rich sweet honey glaze with mild smoky spices."
      },
      {
        "id": "ap-6",
        "name": "Paneer Fire Bites",
        "category": "appetizers",
        "price": 249,
        "isVeg": true,
        "isSpicy": true,
        "image": "/images/items/paneer-fire-bites.webp",
        "badge": "Fiery Crunch",
        "description": "Spiced crispy golden paneer cubes dusted with fiery red chili seasonings and fresh herbs."
      }
    ]
  },
  {
    "id": "chicken-wings",
    "name": "Chicken Wings",
    "description": "Juicy jumbo wings glazed in chef's artisanal sauces and peri peri sprinkles",
    "items": [
      {
        "id": "cw-1",
        "name": "Fire Kiss BBQ Wings",
        "category": "chicken-wings",
        "price": 289,
        "isVeg": false,
        "image": "/images/items/fire-kiss-bbq-wings.webp",
        "badge": "BBQ Classic",
        "description": "Crispy chicken wings generously coated in sweet, smoky and thick fire-kissed BBQ sauce."
      },
      {
        "id": "cw-2",
        "name": "Volcano Wings (Peri Peri)",
        "category": "chicken-wings",
        "price": 299,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/volcano-peri-peri-wings.webp",
        "badge": "Hot Favorite",
        "description": "Jumbo wings tossed in hot African bird's eye peri-peri seasoning and citrus herb dust."
      },
      {
        "id": "cw-3",
        "name": "Korean Wings (Korean Sauce)",
        "category": "chicken-wings",
        "price": 299,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/korean-hot-wings.webp",
        "badge": "Sweet & Spicy",
        "description": "Authentic gochujang glazed sticky wings garnished with toasted sesame seeds and spring onion."
      },
      {
        "id": "cw-4",
        "name": "Red Blast Wings (Hot Wing Sauce)",
        "category": "chicken-wings",
        "price": 299,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/red-blast-hot-wings1.webp",
        "badge": "Extra Hot",
        "description": "Blistering hot buffalo-style red blast glaze that delivers an unforgettable kick."
      }
    ]
  },
  {
    "id": "chicken-tenders",
    "name": "Chicken Tenders",
    "description": "100% whole muscle chicken breast strips, breaded and fried to crisp perfection",
    "items": [
      {
        "id": "ct-1",
        "name": "2 Pieces + Fries",
        "category": "chicken-tenders",
        "price": 239,
        "isVeg": false,
        "image": "/images/items/chicken-tender-2-pcs.webp",
        "pieces": "2 Pieces + Fries",
        "description": "Hand-breaded whole white chicken breast tenders served hot with crispy fries & choice of dip."
      },
      {
        "id": "ct-2",
        "name": "3 Pieces Tender",
        "category": "chicken-tenders",
        "price": 239,
        "isVeg": false,
        "image": "/images/items/chicken-tender-3-pcs.webp",
        "pieces": "3 Pieces",
        "description": "Tender, crispy whole white chicken breast strips served hot with signature dip."
      },
      {
        "id": "ct-3",
        "name": "4 Pieces Tender",
        "category": "chicken-tenders",
        "price": 299,
        "isVeg": false,
        "image": "/images/items/chicken-tender-4-pcs.webp",
        "pieces": "4 Pieces",
        "description": "4 jumbo crispy whole chicken tenders paired with our signature creamy dip."
      },
      {
        "id": "ct-4",
        "name": "Texas BBQ Tenders (4 Pieces)",
        "category": "chicken-tenders",
        "price": 309,
        "isVeg": false,
        "image": "/images/items/texas-bbq-tender.webp",
        "pieces": "4 Pieces",
        "description": "4 signature chicken tenders drenched in rich hickory Texas barbecue glaze."
      },
      {
        "id": "ct-5",
        "name": "Seoul Spice Tenders (4 Pieces)",
        "category": "chicken-tenders",
        "price": 319,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/seoul-spice-tender.webp",
        "pieces": "4 Pieces",
        "description": "Korean style sweet-spicy glazed chicken tenders with toasted sesame seeds."
      },
      {
        "id": "ct-6",
        "name": "Cajun Spice Tenders (4 Pieces)",
        "category": "chicken-tenders",
        "price": 319,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/cajun-spice-tender.webp",
        "pieces": "4 Pieces",
        "description": "Deep south Louisiana Cajun dusted crispy tenders bursting with bold aromatics."
      },
      {
        "id": "ct-7",
        "name": "Café 7 Spicy Tenders (4 Pieces)",
        "category": "chicken-tenders",
        "price": 319,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/cafe-7-signature-spicy-tender.webp",
        "pieces": "4 Pieces",
        "badge": "House Special",
        "description": "Drizzled with our proprietary house-made spiced ranch and signature seasoning."
      }
    ]
  },
  {
    "id": "fries",
    "name": "Fries",
    "description": "Golden imported potatoes fried to golden crunch with artisanal seasonings",
    "items": [
      {
        "id": "fr-1",
        "name": "Classic Fries",
        "category": "fries",
        "price": 129,
        "isVeg": true,
        "image": "/images/items/classic-fries.webp",
        "description": "Crisp, golden shoestring potatoes salted to perfection."
      },
      {
        "id": "fr-2",
        "name": "Nashville Hot Fries",
        "category": "fries",
        "price": 139,
        "isVeg": true,
        "isSpicy": true,
        "image": "/images/items/nashville-fries.webp",
        "description": "Dusted with authentic fiery Nashville cayenne pepper and brown sugar spice blend."
      },
      {
        "id": "fr-3",
        "name": "Peri Peri Fries",
        "category": "fries",
        "price": 159,
        "isVeg": true,
        "isSpicy": true,
        "image": "/images/items/periperi-fries.webp",
        "description": "Shaken with zesty peri peri spice seasoning for that punchy kick."
      },
      {
        "id": "fr-4",
        "name": "Cheesy Melt Fries",
        "category": "fries",
        "price": 189,
        "isVeg": true,
        "image": "/images/items/cheesy-melt-fries.webp",
        "badge": "Cheesy Favorite",
        "description": "Golden shoestring crispy fries smothered with molten warm cheddar cheese sauce."
      }
    ]
  },
  {
    "id": "loaded-fries",
    "name": "Loaded Fries",
    "description": "Generous platters of hot fries topped with cheeses, jalapeños and meats",
    "items": [
      {
        "id": "lf-1",
        "name": "Commando Loaded Fries (Veg)",
        "category": "loaded-fries",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/commando-loaded-fries.webp",
        "description": "Fries loaded with liquid cheese, sliced jalapeños, olives, and Café 7 secret spicy sauce."
      },
      {
        "id": "lf-2",
        "name": "Battlefield Loaded Fries (Chicken)",
        "category": "loaded-fries",
        "price": 279,
        "isVeg": false,
        "image": "/images/items/battlefield-loaded-fries.webp",
        "badge": "Carnivore Feast",
        "description": "Heaped with shredded seasoned chicken, smoked bacon bits, melted cheddar, and ranch."
      },
      {
        "id": "lf-3",
        "name": "Volcano Loaded Fries (Spicy Chicken)",
        "category": "loaded-fries",
        "price": 299,
        "isVeg": false,
        "isSpicy": true,
        "image": "/images/items/volcano-spicy-loaded-fries.webp",
        "description": "Spicy chicken bites, hot peri-peri cheese sauce, crushed chilies, and fiery jalapeños."
      }
    ]
  },
  {
    "id": "hot-cold-coffee",
    "name": "Hot & Cold Coffee",
    "description": "Brewed from 100% Arabica specialty coffee beans, expertly pulled and styled",
    "items": [
      {
        "id": "cf-1",
        "name": "Americano",
        "category": "hot-cold-coffee",
        "price": 119,
        "isVeg": true,
        "image": "/images/items/americano.webp",
        "badge": "Pure Brew",
        "description": "Rich freshly pulled double espresso poured over hot water with a golden layer of crema."
      },
      {
        "id": "cf-2",
        "name": "Latte / Cappuccino",
        "category": "hot-cold-coffee",
        "price": 139,
        "isVeg": true,
        "image": "/images/items/latte.webp",
        "description": "Smooth espresso poured over creamy steamed milk with a silky layer of microfoam."
      },
      {
        "id": "cf-3",
        "name": "Classic Cappuccino",
        "category": "hot-cold-coffee",
        "price": 139,
        "isVeg": true,
        "image": "/images/items/cappuccino.webp",
        "badge": "Barista Classic",
        "description": "Equal parts rich espresso, steamed velvety milk, and thick frothy foam dusted with dark cocoa."
      },
      {
        "id": "cf-4",
        "name": "Vanilla Velvet Latte",
        "category": "hot-cold-coffee",
        "price": 179,
        "isVeg": true,
        "image": "/images/items/vanilla-velvet-latte.webp",
        "badge": "Signature",
        "description": "Madagascar vanilla infused velvety milk combined with our medium dark roast espresso."
      },
      {
        "id": "cf-5",
        "name": "Mocha Indulgence Latte",
        "category": "hot-cold-coffee",
        "price": 179,
        "isVeg": true,
        "image": "/images/items/mocha-indulgence-latte.webp",
        "badge": "Indulgent",
        "description": "Rich dark chocolate ganache layered with espresso, silky steamed milk and whipped foam."
      },
      {
        "id": "cf-6",
        "name": "Irish Cream Latte",
        "category": "hot-cold-coffee",
        "price": 189,
        "isVeg": true,
        "image": "/images/items/irish-latte.webp",
        "badge": "Staff Pick",
        "description": "Non-alcoholic smooth Irish cream syrup folded into dark espresso and topped with cocoa."
      },
      {
        "id": "cf-7",
        "name": "Spanish Velvet Latte",
        "category": "hot-cold-coffee",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/spanish-latte.webp",
        "badge": "Bestseller",
        "description": "Condensed milk base layered with espresso and textured milk for an ultra silky sweet finish."
      },
      {
        "id": "cf-8",
        "name": "Spanish Velvet Iced Latte",
        "category": "hot-cold-coffee",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/spanish-velvet-ice-latte.webp",
        "badge": "Cold Signature",
        "description": "Chilled condensed milk espresso blend poured over ice with a rich velvety cascade."
      },
      {
        "id": "cf-9",
        "name": "Hazelnut Harmony Latte",
        "category": "hot-cold-coffee",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/hazelnut-latte.webp",
        "description": "Aromatic toasted hazelnut notes harmonized with smooth espresso and frothy milk."
      },
      {
        "id": "cf-10",
        "name": "Coconut Bliss Latte",
        "category": "hot-cold-coffee",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/coconut-latte.webp",
        "description": "Creamy coconut notes paired with espresso for a tropical coffee experience."
      },
      {
        "id": "cf-11",
        "name": "Caramel Latte",
        "category": "hot-cold-coffee",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/caramel-latte.webp",
        "badge": "Featured",
        "description": "Buttery English caramel syrup swirled into rich espresso and steamed velvety milk."
      }
    ]
  },
  {
    "id": "iced-tea",
    "name": "Iced Tea",
    "description": "Slow-brewed artisanal leaf teas shaken fresh with natural fruit infusions and ice",
    "items": [
      {
        "id": "it-1",
        "name": "Classic Lemon Iced Tea",
        "category": "iced-tea",
        "price": 149,
        "isVeg": true,
        "image": "/images/items/classic-lemon-iced-tea.webp",
        "badge": "Classic",
        "description": "Slow brewed premium tea shaken with fresh citrus lemon and ice cubes."
      },
      {
        "id": "it-2",
        "name": "Peach Breeze Iced Tea",
        "category": "iced-tea",
        "price": 149,
        "isVeg": true,
        "image": "/images/items/peach-breeze-iced-tea.webp",
        "badge": "Refreshing",
        "description": "Delicate peach nectar harmonized with brisk chilled tea and mint leaves."
      },
      {
        "id": "it-3",
        "name": "Watermelon Chill Iced Tea",
        "category": "iced-tea",
        "price": 179,
        "isVeg": true,
        "image": "/images/items/watermelon-chill-iced-tea.webp",
        "description": "Juicy summer watermelon juice infused with crisp iced tea for ultimate hydration."
      },
      {
        "id": "it-4",
        "name": "Strawberry Bloom Iced Tea",
        "category": "iced-tea",
        "price": 179,
        "isVeg": true,
        "image": "/images/items/strawberry-bloom-iced-tea.webp",
        "badge": "Berry Fresh",
        "description": "Muddled ripe strawberries blended with botanical tea notes and chilled ice."
      },
      {
        "id": "it-5",
        "name": "Mango Tango Iced Tea",
        "category": "iced-tea",
        "price": 179,
        "isVeg": true,
        "image": "/images/items/mango-tango-iced-tea.webp",
        "description": "Tropical Alphonso mango puree shaken with chilled tea and sweet fruit accents."
      }
    ]
  },
  {
    "id": "signature-milk-shakes",
    "name": "Signature Milk Shakes",
    "description": "Thick, indulgent craft shakes churned with rich cream and gourmet flavors",
    "items": [
      {
        "id": "ms-1",
        "name": "Vanilla Velvet Milkshake",
        "category": "signature-milk-shakes",
        "price": 189,
        "isVeg": true,
        "image": "/images/items/vanilla-velvet-milkshake.webp",
        "description": "Old-school Madagascar vanilla bean ice cream spun thick with fresh cold milk."
      },
      {
        "id": "ms-2",
        "name": "Salted Caramel Shake",
        "category": "signature-milk-shakes",
        "price": 189,
        "isVeg": true,
        "image": "/images/items/salted-caramel-shake.webp",
        "badge": "Popular",
        "description": "Rich gooey salted caramel ribbon churned into creamy vanilla ice cream."
      },
      {
        "id": "ms-3",
        "name": "Strawberry Bliss Shake",
        "category": "signature-milk-shakes",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/strawberry-bliss-shake.webp",
        "description": "Real strawberry crush whipped with thick dairy cream and chilled whole milk."
      },
      {
        "id": "ms-4",
        "name": "Midnight Chocolate Shake",
        "category": "signature-milk-shakes",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/midnight-chocolate-shake.webp",
        "badge": "Chocoholic",
        "description": "Intense dark Dutch cocoa and rich fudge blended into a velvety chocolate shake."
      },
      {
        "id": "ms-5",
        "name": "Mango Paradise Shake",
        "category": "signature-milk-shakes",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/mango-paradise-shake.webp",
        "description": "Luscious golden mango pulp blended with rich vanilla cream and crushed ice."
      },
      {
        "id": "ms-6",
        "name": "Blueberry Milkshake",
        "category": "signature-milk-shakes",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/blueberry-milkshake.webp",
        "badge": "Berry Rich",
        "description": "Wild mountain blueberries blended into a gorgeous purple thick shake."
      },
      {
        "id": "ms-7",
        "name": "Mocha Frost",
        "category": "signature-milk-shakes",
        "price": 229,
        "isVeg": true,
        "image": "/images/items/mocha-frost.webp",
        "badge": "Barista Shake",
        "description": "Espresso and rich Belgian chocolate blended with creamy ice cream, topped with chocolate flakes."
      }
    ]
  },
  {
    "id": "lemonades",
    "name": "Lemonade",
    "description": "Handcrafted sparkling thirst quenchers with fresh citrus zest and botanical notes",
    "items": [
      {
        "id": "lm-1",
        "name": "Classic Citrus Lemonade",
        "category": "lemonades",
        "price": 99,
        "isVeg": true,
        "image": "/images/items/classic-citrus-lemonade.webp",
        "badge": "Classic",
        "description": "Zesty freshly squeezed lemons with pure cane sweetness and chilled sparkling water."
      },
      {
        "id": "lm-2",
        "name": "Lemon with Mint Zest",
        "category": "lemonades",
        "price": 139,
        "isVeg": true,
        "image": "/images/items/lemon-with-mint-zest-lemonade.webp",
        "badge": "Cooler",
        "description": "Crushed spearmint sprigs and citrus lemon juice for crisp, cooling rejuvenation."
      },
      {
        "id": "lm-3",
        "name": "Mango Splash Lemonade",
        "category": "lemonades",
        "price": 179,
        "isVeg": true,
        "image": "/images/items/mango-splash-lemonade.webp",
        "description": "Sweet tropical mango nectar with tangy lemon fizz and crushed ice."
      },
      {
        "id": "lm-4",
        "name": "Blueberry Burst Lemonade",
        "category": "lemonades",
        "price": 179,
        "isVeg": true,
        "image": "/images/items/blueberry-burst-lemonade.webp",
        "badge": "Bursting",
        "description": "Plump wild blueberries muddled with fresh lemon juice and effervescent bubbles."
      },
      {
        "id": "lm-5",
        "name": "Strawberry Pop Lemonade",
        "category": "lemonades",
        "price": 179,
        "isVeg": true,
        "image": "/images/items/strawberry-pop-lemonade.webp",
        "description": "Vibrant sweet strawberries blended with tart hand-squeezed lemon cooler."
      },
      {
        "id": "lm-6",
        "name": "Watermelon Wave Lemonade",
        "category": "lemonades",
        "price": 179,
        "isVeg": true,
        "image": "/images/items/watermelon-wave-lemonade.webp",
        "description": "Hydrating fresh watermelon wave married with crisp lemon citrus tang."
      }
    ]
  },
  {
    "id": "refreshers",
    "name": "Refreshers",
    "description": "Sparkling effervescent specialty coolers with colorful flavor bursts",
    "items": [
      {
        "id": "rf-1",
        "name": "Blue Angel",
        "category": "refreshers",
        "price": 149,
        "isVeg": true,
        "image": "/images/items/blue-angel.webp",
        "badge": "Electric",
        "description": "Electric blue curacao citrus refresher with sparkling fizz and fresh mint leaves."
      },
      {
        "id": "rf-2",
        "name": "Cherry Fizz",
        "category": "refreshers",
        "price": 149,
        "isVeg": true,
        "image": "/images/items/cherry-fizz.webp",
        "description": "Ruby sweet wild cherries topped with sparkling soda, lime and crushed ice."
      },
      {
        "id": "rf-3",
        "name": "Midnight Cola",
        "category": "refreshers",
        "price": 149,
        "isVeg": true,
        "image": "/images/items/midnight-cola.webp",
        "badge": "Craft Cooler",
        "description": "Botanical spiced craft dark cola infused with citrus lime wheels and ice."
      },
      {
        "id": "rf-4",
        "name": "Pink Diamond",
        "category": "refreshers",
        "price": 159,
        "isVeg": true,
        "image": "/images/items/pink-diamond.webp",
        "badge": "Signature",
        "description": "Sparkling blush berry cooler with pomegranate jewels and sweet floral fizz."
      }
    ]
  },
  {
    "id": "mojitos",
    "name": "Mojitos",
    "description": "Freshly muddled garden mint, citrus wedges & effervescent sparkling soda",
    "items": [
      {
        "id": "mj-1",
        "name": "Classic Mint Mojito",
        "category": "mojitos",
        "price": 169,
        "isVeg": true,
        "image": "/images/items/classic-mint-mojito.webp",
        "badge": "Classic",
        "description": "Fresh mint leaves gently muddled with lime wedges, cane sugar and sparkling soda."
      },
      {
        "id": "mj-2",
        "name": "Blue Lagoon Mojito",
        "category": "mojitos",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/blue-lagoon-mojito.webp",
        "badge": "Trending",
        "description": "Vibrant oceanic blue citrus mojito with tangy lime, mint sprigs and fizz."
      },
      {
        "id": "mj-3",
        "name": "Strawberry Splash Mojito",
        "category": "mojitos",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/strawberry-splash-mojito.webp",
        "description": "Crushed sweet strawberries tossed with zesty lime wedges and garden mint."
      },
      {
        "id": "mj-4",
        "name": "Mango Sunset Mojito",
        "category": "mojitos",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/mango-sunset-mojito.webp",
        "description": "Golden mango purée muddled with tart lime, mint and effervescent soda."
      },
      {
        "id": "mj-5",
        "name": "Watermelon Breeze Mojito",
        "category": "mojitos",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/watermelon-breeze-mojito.webp",
        "description": "Refreshing crisp watermelon juice muddled with garden mint and sparkling soda."
      },
      {
        "id": "mj-6",
        "name": "Blueberry Mojito",
        "category": "mojitos",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/blueberry-mojito.webp",
        "description": "Freshly muddled wild blueberries, crushed lime, fresh mint and chilled bubbles."
      }
    ]
  },
  {
    "id": "beverages",
    "name": "Beverages",
    "description": "Chilled mineral waters and canned carbonated soft drinks",
    "items": [
      {
        "id": "bv-1",
        "name": "Mineral Water (Small)",
        "category": "beverages",
        "price": 10,
        "isVeg": true,
        "image": "/images/items/chilled-beverages.webp",
        "description": "Pure packaged chilled mineral drinking water (small bottle)."
      },
      {
        "id": "bv-2",
        "name": "Mineral Water (Large)",
        "category": "beverages",
        "price": 20,
        "isVeg": true,
        "image": "/images/items/chilled-beverages.webp",
        "description": "Pure packaged chilled mineral drinking water (large bottle)."
      },
      {
        "id": "bv-3",
        "name": "Soft Drinks",
        "category": "beverages",
        "price": 60,
        "isVeg": true,
        "image": "/images/items/chilled-beverages.webp",
        "badge": "Chilled Cans",
        "description": "Chilled aerated canned beverages (Coke, Sprite, Thums Up, Fanta)."
      },
      {
        "id": "bv-4",
        "name": "Energy Drink",
        "category": "beverages",
        "price": 60,
        "isVeg": true,
        "image": "/images/items/chilled-beverages.webp",
        "badge": "Boost",
        "description": "Ice cold energizing canned beverage for instant vitality."
      }
    ]
  },
  {
    "id": "combos",
    "name": "Combos",
    "description": "Value combos available exclusively when you order any burger or wrap",
    "items": [
      {
        "id": "co-1",
        "name": "Fries + Any Soft Drink",
        "category": "combos",
        "price": 159,
        "isVeg": true,
        "image": "/images/items/cafe-combo-meal.webp",
        "badge": "Combo Value",
        "description": "Golden crispy fries paired with your choice of chilled soft drink. Available with burger or wrap."
      },
      {
        "id": "co-2",
        "name": "Fries + Any Refreshers",
        "category": "combos",
        "price": 199,
        "isVeg": true,
        "image": "/images/items/cafe-combo-meal.webp",
        "badge": "Best Pairing",
        "description": "Golden crispy fries paired with any artisanal sparkling refresher. Available with burger or wrap."
      },
      {
        "id": "co-3",
        "name": "Fries + Lemonade",
        "category": "combos",
        "price": 209,
        "isVeg": true,
        "image": "/images/items/cafe-combo-meal.webp",
        "badge": "Thirst Quencher",
        "description": "Golden crispy fries paired with a chilled zesty lemonade. Available with burger or wrap."
      }
    ]
  }
];
