import dotenv from "dotenv";
import mongoose from "mongoose";
import Destination from "./models/Destination.js";

dotenv.config();

const destinations = [
  {
    city: "Paris",
    country: "France",
    clues: [
      "I'm known as the City of Light.",
      "I have a famous iron tower that was initially criticized by locals.",
      "My river splits the city into Left and Right Banks.",
    ],
    funFacts: [
      "The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!",
      "Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules.",
      "This city has more than 470 parks and gardens.",
    ],
    trivia: [
      "This city is famous for its croissants and macarons. Bon appétit!",
      "Paris was originally a Roman city called Lutetia.",
      "There are 20 arrondissements (administrative districts) arranged in a spiral pattern.",
    ],
    options: ["Paris", "London", "Tokyo", "New York"],
  },
  {
    city: "Tokyo",
    country: "Japan",
    clues: [
      "I'm the most populous metropolitan area in the world.",
      "I'm home to the world's busiest pedestrian crossing.",
      "My imperial palace is situated on grounds reportedly worth more than all the real estate in California.",
    ],
    funFacts: [
      "Tokyo was originally a small fishing village called Edo before becoming the bustling capital it is today!",
      "More than 14 million people live in Tokyo, making it one of the most populous cities in the world.",
      "This city has more Michelin-starred restaurants than any other city in the world.",
    ],
    trivia: [
      "The city has over 160,000 restaurants, more than any other city in the world.",
      "Tokyo’s subway system is so efficient that train delays of just a few minutes come with formal apologies.",
      "The metro system here carries over 3.5 billion passengers annually.",
    ],
    options: ["Tokyo", "Paris", "New York", "London"],
  },
  {
    city: "New York",
    country: "USA",
    clues: [
      "Home to a green statue gifted by France in the 1800s.",
      "Nicknamed 'The Big Apple' and known for its Broadway theaters.",
    ],
    funFacts: [
      "The Statue of Liberty was originally a copper color before oxidizing to its iconic green patina.",
      "Times Square was once called Longacre Square before being renamed in 1904.",
    ],
    trivia: [
      "New York City has 468 subway stations, making it one of the most complex transit systems in the world.",
      "The Empire State Building has its own zip code: 10118.",
    ],
    options: ["New York", "Paris", "Tokyo", "London"],
  },
  {
    city: "Machu Picchu",
    country: "Peru",
    clues: [
      "I'm an ancient city built high in the mountains by the Inca civilization.",
      "I was 'lost' for centuries until being rediscovered in 1911.",
      "My name means 'Old Peak' in the local language.",
    ],
    funFacts: [
      "This site was built around 1450 AD and was abandoned just over 100 years later.",
      "The stones used to build the structures here fit together so perfectly that you can't even slide a piece of paper between them.",
      "Despite its remote location, this site receives over a million visitors annually.",
    ],
    trivia: [
      "This ancient city was built without the use of wheels or mortar.",
      "Many of its buildings align with astronomical events.",
    ],
    options: ["Machu Picchu", "Petra", "Great Barrier Reef", "Taj Mahal"],
  },
  {
    city: "Great Barrier Reef",
    country: "Australia",
    clues: [
      "I'm the world's largest coral reef system, composed of over 2,900 individual reefs.",
      "I'm so large that I can be seen from outer space.",
      "I'm home to more than 1,500 species of fish.",
    ],
    funFacts: [
      "This ecosystem is actually made up of billions of tiny organisms called coral polyps.",
      "This is the world's largest structure made by living organisms.",
      "This natural wonder is threatened by climate change, with rising ocean temperatures causing coral bleaching.",
    ],
    trivia: [
      "The Great Barrier Reef spans over 2,300 kilometers along the Australian coast.",
      "It is one of the Seven Natural Wonders of the World.",
    ],
    options: ["Great Barrier Reef", "Petra", "Machu Picchu", "Taj Mahal"],
  },
  {
    city: "Petra",
    country: "Jordan",
    clues: [
      "I'm an ancient city carved into rose-red cliffs.",
      "I was 'lost' to the Western world for hundreds of years.",
      "My most famous structure is a temple with a Greek-inspired facade.",
    ],
    funFacts: [
      "This site was established as early as 312 BC as the capital city of the Nabataeans.",
      "Only about 15% of this ancient city has been uncovered to date.",
      "This location was used as a filming location for Indiana Jones and the Last Crusade.",
    ],
    trivia: [
      "Petra is also known as the 'Rose City' because of its pink sandstone cliffs.",
      "This UNESCO World Heritage Site was named one of the New Seven Wonders of the World in 2007.",
    ],
    options: ["Petra", "Great Barrier Reef", "Machu Picchu", "Taj Mahal"],
  },
  {
    city: "Cairo",
    country: "Egypt",
    clues: [
      "I'm home to one of the Seven Wonders of the Ancient World.",
      "My river is the longest in the world.",
      "I have a historic market called Khan el-Khalili.",
    ],
    funFacts: [
      "The Great Pyramid of Giza was the tallest man-made structure for over 3,800 years!",
      "Cairo is known as the 'City of a Thousand Minarets' due to its many mosques.",
      "It is the largest city in the Arab world.",
    ],
    trivia: [
      "The Sphinx near the pyramids is missing its nose, but no one knows for sure how it was lost!",
      "Ancient Egyptians believed in over 2,000 gods and goddesses.",
    ],
    options: ["Cairo", "Athens", "Rome", "Istanbul"],
  },
  {
    city: "Athens",
    country: "Greece",
    clues: [
      "I'm the birthplace of democracy.",
      "I have an ancient temple dedicated to Athena.",
      "My city hosted the first modern Olympic Games.",
    ],
    funFacts: [
      "The Parthenon has stood for over 2,400 years!",
      "Athens is one of the oldest continuously inhabited cities in the world, dating back over 3,000 years.",
      "The Marathon race originates from a historical event in ancient Athens.",
    ],
    trivia: [
      "Ancient Greek philosophers like Socrates and Plato lived here.",
      "Athens has over 148 theatrical stages, more than any other city in the world.",
    ],
    options: ["Athens", "Rome", "Cairo", "Paris"],
  },
  {
    city: "Rio de Janeiro",
    country: "Brazil",
    clues: [
      "I'm famous for a giant statue of Christ on a mountain.",
      "My city hosts one of the biggest carnival festivals in the world.",
      "I have a beach named Copacabana.",
    ],
    funFacts: [
      "Christ the Redeemer is one of the New Seven Wonders of the World.",
      "Rio was the capital of Brazil until 1960.",
      "Sugarloaf Mountain offers one of the best views in the city.",
    ],
    trivia: [
      "Rio means 'River of January' in Portuguese.",
      "The city has the largest urban forest in the world—Tijuca Forest.",
    ],
    options: ["Rio de Janeiro", "Buenos Aires", "Lisbon", "Sydney"],
  },
  {
    city: "Barcelona",
    country: "Spain",
    clues: [
      "I'm known for my unique architecture, especially by Antoni Gaudí.",
      "My famous street, La Rambla, is a hub for tourists and performers.",
      "I hosted the 1992 Summer Olympics.",
    ],
    funFacts: [
      "The Sagrada Familia has been under construction for over 140 years!",
      "Barcelona has its own language: Catalan, in addition to Spanish.",
      "Park Güell, designed by Gaudí, was initially meant to be a residential area.",
    ],
    trivia: [
      "Barcelona has more than 20 Michelin-starred restaurants.",
      "The city has the largest football stadium in Europe, Camp Nou.",
    ],
    options: ["Barcelona", "Madrid", "Lisbon", "Seville"],
  },
  {
    city: "Moscow",
    country: "Russia",
    clues: [
      "I'm home to a famous colorful cathedral in Red Square.",
      "I have the world’s busiest metro system outside of Asia.",
      "My iconic towers include the Kremlin and Ostankino Tower.",
    ],
    funFacts: [
      "The Moscow Metro has over 200 stations, many of which look like palaces.",
      "St. Basil’s Cathedral was ordered by Ivan the Terrible.",
      "Moscow is the northernmost and coldest megacity in the world.",
    ],
    trivia: [
      "Moscow’s underground system serves over 9 million passengers daily.",
      "Tverskaya Street is one of the most expensive streets in the world.",
    ],
    options: ["Moscow", "Saint Petersburg", "Kyiv", "Warsaw"],
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    clues: [
      "I have the world’s tallest building.",
      "My city has an artificial island shaped like a palm tree.",
      "I turned from a small desert town into a global business hub.",
    ],
    funFacts: [
      "Dubai's Burj Khalifa is over 828 meters tall!",
      "The Dubai Mall is one of the largest malls in the world.",
      "Dubai has the world’s busiest airport for international passengers.",
    ],
    trivia: [
      "Dubai police use supercars like Bugatti and Lamborghini.",
      "The city gets less than 100mm of rain per year.",
    ],
    options: ["Dubai", "Abu Dhabi", "Doha", "Riyadh"],
  },
  {
    city: "Cape Town",
    country: "South Africa",
    clues: [
      "I have a mountain named after a piece of furniture.",
      "I was the first city in Africa to host the FIFA World Cup.",
      "I'm famous for my penguin colony at Boulders Beach.",
    ],
    funFacts: [
      "Table Mountain is estimated to be over 260 million years old!",
      "Cape Town was originally a supply station for Dutch traders.",
      "Robben Island, where Nelson Mandela was imprisoned, is nearby.",
    ],
    trivia: [
      "Cape Town's Kirstenbosch Garden is one of the greatest botanical gardens in the world.",
      "The city has some of the world's best beaches for surfing.",
    ],
    options: ["Cape Town", "Johannesburg", "Nairobi", "Lagos"],
  },
  {
    city: "Kyoto",
    country: "Japan",
    clues: [
      "I have over 1,600 Buddhist temples.",
      "I'm famous for my cherry blossoms and traditional tea houses.",
      "I was Japan’s capital for over 1,000 years before Tokyo.",
    ],
    funFacts: [
      "Kyoto was once considered as a target for the atomic bomb but was spared due to its cultural importance.",
      "The city is home to the famous Fushimi Inari Shrine with thousands of red torii gates.",
      "Kyoto is famous for its geisha culture, particularly in the Gion district.",
    ],
    trivia: [
      "Kyoto's name means 'Capital City' in Japanese.",
      "Matcha (green tea powder) is a specialty of Kyoto.",
    ],
    options: ["Kyoto", "Osaka", "Tokyo", "Hiroshima"],
  },
  {
    city: "Edinburgh",
    country: "Scotland",
    clues: [
      "I'm home to a famous castle that sits on an extinct volcano.",
      "I host the world’s largest arts festival every August.",
      "My old town and new town together form a UNESCO World Heritage Site.",
    ],
    funFacts: [
      "Edinburgh’s underground city of vaults was once a refuge for the poor and is now a popular ghost tour attraction.",
      "The city inspired J.K. Rowling’s writing of Harry Potter.",
      "Arthur’s Seat is an ancient volcano that offers a panoramic view of the city.",
    ],
    trivia: [
      "The world’s first fire service was established here in 1824.",
      "Edinburgh has more listed buildings than anywhere else in the world.",
      "The city’s Hogmanay (New Year’s Eve) celebrations are among the biggest in the world.",
    ],
    options: ["Edinburgh", "Dublin", "London", "Berlin"],
  },
  {
    city: "Havana",
    country: "Cuba",
    clues: [
      "I’m famous for my colorful vintage cars and colonial architecture.",
      "I have a famous street called the Malecón that runs along the sea.",
      "My city was a popular destination for American tourists in the 1950s.",
    ],
    funFacts: [
      "Havana’s old town, Habana Vieja, is a UNESCO World Heritage Site.",
      "Cuba has two currencies: one for locals and one for tourists.",
      "Havana is home to one of the world's oldest baseball leagues.",
    ],
    trivia: [
      "Havana was once the third-largest city in the Americas.",
      "The city has an annual cigar festival celebrating Cuba’s famous cigars.",
      "Havana’s Capitolio building resembles the U.S. Capitol but is actually taller.",
    ],
    options: ["Havana", "Santo Domingo", "San Juan", "Cartagena"],
  },
  {
    city: "Seoul",
    country: "South Korea",
    clues: [
      "I'm home to one of the world’s fastest internet speeds.",
      "I have a historic palace called Gyeongbokgung.",
      "My city is known for its K-pop and tech industries.",
    ],
    funFacts: [
      "Seoul has more coffee shops per capita than any other city in the world.",
      "The Han River runs through the heart of the city.",
      "The city has heated floors, a tradition that dates back to ancient times.",
    ],
    trivia: [
      "Seoul's subway system is one of the most efficient and advanced in the world.",
      "The N Seoul Tower lights up in different colors to indicate air quality levels.",
      "The city’s name means ‘capital’ in Korean.",
    ],
    options: ["Seoul", "Tokyo", "Shanghai", "Bangkok"],
  },
  {
    city: "Sydney",
    country: "Australia",
    clues: [
      "I’m home to a world-famous opera house with a unique design.",
      "I have one of the most iconic harbors in the world.",
      "My city is known for its beautiful beaches like Bondi Beach.",
    ],
    funFacts: [
      "Sydney’s Harbour Bridge is the world’s largest steel arch bridge.",
      "The Sydney Opera House took 14 years to build.",
      "Sydney has more than 100 beaches.",
    ],
    trivia: [
      "Sydney was the first city in the world to celebrate the New Year.",
      "The Great Barrier Reef is closer to Sydney than it is to Perth.",
      "Sydney Tower Eye offers a 360-degree view of the city.",
    ],
    options: ["Sydney", "Melbourne", "Brisbane", "Perth"],
  },
  {
    city: "Reykjavik",
    country: "Iceland",
    clues: [
      "I'm the northernmost capital in the world.",
      "I have a church that looks like a spaceship.",
      "My country is known for its geothermal hot springs and northern lights.",
    ],
    funFacts: [
      "Reykjavik’s name means ‘Smoky Bay’ due to steam from hot springs.",
      "The city has no McDonald’s.",
      "Iceland runs almost entirely on renewable energy.",
    ],
    trivia: [
      "The country has more sheep than people.",
      "Reykjavik’s Sun Voyager sculpture represents a dream of undiscovered lands.",
      "Beer was banned in Iceland until 1989.",
    ],
    options: ["Reykjavik", "Helsinki", "Oslo", "Stockholm"],
  },
  {
    city: "Marrakech",
    country: "Morocco",
    clues: [
      "I'm known as the ‘Red City’ due to my red sandstone buildings.",
      "My medina is a UNESCO World Heritage Site.",
      "I have a famous market square called Jemaa el-Fnaa.",
    ],
    funFacts: [
      "Marrakech is home to the largest traditional market (souk) in Morocco.",
      "The city is famous for its luxurious riads.",
      "Mint tea is a staple of local hospitality.",
    ],
    trivia: [
      "Yves Saint Laurent’s ashes are scattered in the Majorelle Garden here.",
      "The Koutoubia Mosque’s minaret inspired the Giralda Tower in Seville.",
      "The city was founded in 1070.",
    ],
    options: ["Marrakech", "Casablanca", "Fes", "Rabat"],
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    clues: [
      "I'm the birthplace of tango.",
      "My most famous neighborhood is La Boca, known for its colorful houses.",
      "My city has one of the widest avenues in the world, Avenida 9 de Julio.",
    ],
    funFacts: [
      "Buenos Aires has the most bookstores per capita in the world.",
      "The city is home to the world’s most beautiful bookstore, El Ateneo Grand Splendid.",
      "The Obelisk is one of the city's most famous landmarks.",
    ],
    trivia: [
      "Buenos Aires means ‘Fair Winds’ in Spanish.",
      "The city has more psychoanalysts per capita than any other city.",
      "The Teatro Colón is considered one of the best opera houses in the world.",
    ],
    options: ["Buenos Aires", "Santiago", "Lima", "Montevideo"],
  },
  {
    city: "Prague",
    country: "Czech Republic",
    clues: [
      "I'm home to the largest ancient castle in the world.",
      "My city has a famous medieval astronomical clock.",
      "I have a bridge with 30 statues crossing the Vltava River.",
    ],
    funFacts: [
      "Prague Castle is over 1,000 years old.",
      "The city’s Charles Bridge was built in 1357 and is adorned with Baroque statues.",
      "The John Lennon Wall is covered in graffiti inspired by peace and freedom.",
    ],
    trivia: [
      "Prague is known as the ‘City of a Hundred Spires.’",
      "The city’s beer consumption is among the highest in the world.",
      "The world’s first Pilsner beer was brewed near Prague.",
    ],
    options: ["Prague", "Vienna", "Budapest", "Berlin"],
  },
  {
    city: "Mexico City",
    country: "Mexico",
    clues: [
      "I'm built on the ruins of an ancient Aztec city.",
      "I have a famous muralist named Diego Rivera.",
      "My city has a floating garden area called Xochimilco.",
    ],
    funFacts: [
      "Mexico City was originally built on a lake by the Aztecs.",
      "The city sinks about 50 cm per year due to its foundation.",
      "Mexico City has more museums than any other city in the world.",
    ],
    trivia: [
      "The city’s original name was Tenochtitlán.",
      "Chapultepec Park is twice the size of Central Park in NYC.",
      "Mexico City’s metro is one of the largest in the world.",
    ],
    options: ["Mexico City", "Lima", "Bogotá", "Santiago"],
  },
  {
    city: "Istanbul",
    country: "Turkey",
    clues: [
      "I am the only city in the world that spans two continents.",
      "I have a famous blue mosque.",
      "My city was once called Constantinople.",
    ],
    funFacts: [
      "Istanbul has the world’s second-oldest underground railway, after London.",
      "The Grand Bazaar has over 4,000 shops.",
      "The city’s Hagia Sophia has been a church, a mosque, and a museum.",
    ],
    trivia: [
      "Istanbul is home to the world’s largest tulip festival.",
      "The city has more than 3,000 mosques.",
      "The Bosphorus Strait divides Europe and Asia.",
    ],
    options: ["Istanbul", "Athens", "Cairo", "Dubai"],
  },
  {
    city: "Vancouver",
    country: "Canada",
    clues: [
      "I am surrounded by mountains and the Pacific Ocean.",
      "I have one of the world’s largest urban parks, Stanley Park.",
      "My city hosted the 2010 Winter Olympics.",
    ],
    funFacts: [
      "Vancouver consistently ranks as one of the most livable cities in the world.",
      "Hollywood North is another name for Vancouver due to its film industry.",
      "The city has one of the largest Chinatowns in North America.",
    ],
    trivia: [
      "Vancouver is one of the rainiest cities in Canada.",
      "The city has a floating gas station for boats in the harbor.",
      "Vancouver's seawall is the longest uninterrupted waterfront path in the world.",
    ],
    options: ["Vancouver", "Toronto", "Seattle", "Montreal"],
  },
  {
    city: "Stockholm",
    country: "Sweden",
    clues: [
      "I am the capital of a Scandinavian country.",
      "My city is built on 14 islands connected by 57 bridges.",
      "I have a famous museum dedicated to the Vasa, a 17th-century warship.",
    ],
    funFacts: [
      "Stockholm’s subway stations are known as the 'world’s longest art gallery.'",
      "The Nobel Prizes are awarded here every year.",
      "The city has more than 30,000 islands in its archipelago.",
    ],
    trivia: [
      "Stockholm is home to the world’s first open-air museum, Skansen.",
      "The ABBA Museum celebrates Sweden’s most famous pop band.",
      "The Stockholm City Hall features the Golden Hall, covered in 18 million gold mosaic tiles.",
    ],
    options: ["Stockholm", "Oslo", "Copenhagen", "Helsinki"],
  },
  {
    city: "Kuala Lumpur",
    country: "Malaysia",
    clues: [
      "I have the tallest twin towers in the world.",
      "My city’s name means 'muddy confluence' in Malay.",
      "I am known for my diverse culture, including Malay, Chinese, and Indian influences.",
    ],
    funFacts: [
      "Kuala Lumpur’s Petronas Towers were the tallest buildings in the world from 1998 to 2004.",
      "The Batu Caves have a giant golden statue of Lord Murugan at the entrance.",
      "KL Sentral is one of the busiest railway stations in Southeast Asia.",
    ],
    trivia: [
      "Kuala Lumpur’s Chinatown is famous for its street food and markets.",
      "The city has one of the largest indoor amusement parks in the world.",
      "Kuala Lumpur Tower has a revolving restaurant with panoramic views.",
    ],
    options: ["Kuala Lumpur", "Bangkok", "Jakarta", "Singapore"],
  },
  {
    city: "Lisbon",
    country: "Portugal",
    clues: [
      "I'm one of the oldest cities in the world, older than Rome and London.",
      "I have a famous yellow tram that goes up steep hills.",
      "My city is known for pastel de nata, a delicious custard tart.",
    ],
    funFacts: [
      "Lisbon was almost entirely rebuilt after a massive earthquake in 1755.",
      "The city's Vasco da Gama Bridge is the longest in Europe.",
      "Lisbon’s Fado music is recognized as a UNESCO Intangible Cultural Heritage.",
    ],
    trivia: [
      "Lisbon is known as the ‘City of Seven Hills.’",
      "The iconic Torre de Belém was built in the 16th century.",
      "Lisbon’s Santa Justa Lift was designed by an apprentice of Gustave Eiffel.",
    ],
    options: ["Lisbon", "Madrid", "Barcelona", "Rome"],
  },
  {
    city: "Jakarta",
    country: "Indonesia",
    clues: [
      "I'm the capital city of the world's largest archipelago nation.",
      "My city is home to the world's largest mosque in Southeast Asia.",
      "I am known for my street food and bustling nightlife.",
    ],
    funFacts: [
      "Jakarta has more than 13 rivers flowing through it.",
      "The city was formerly known as Batavia during Dutch colonial rule.",
      "The Monas Tower is a symbol of Indonesia’s independence.",
    ],
    trivia: [
      "Jakarta has one of the worst traffic congestions in the world.",
      "The city is sinking at an alarming rate due to excessive groundwater use.",
      "Jakarta’s Thousand Islands are a popular escape from the busy city.",
    ],
    options: ["Jakarta", "Bangkok", "Manila", "Singapore"],
  },
  {
    city: "Helsinki",
    country: "Finland",
    clues: [
      "I’m the northernmost capital of the European Union.",
      "I have a famous rock church carved into solid stone.",
      "My city is known for its saunas—there are over 3 million in Finland!",
    ],
    funFacts: [
      "Helsinki’s subway is the world’s northernmost metro system.",
      "The city was once the design capital of the world.",
      "Helsinki’s Market Square is a must-visit for Finnish delicacies.",
    ],
    trivia: [
      "Helsinki has more islands than any other capital city in the world.",
      "Every February, people participate in an ice-swimming championship here.",
      "The Helsinki Cathedral is one of the most photographed landmarks in Finland.",
    ],
    options: ["Helsinki", "Stockholm", "Oslo", "Copenhagen"],
  },
  {
    city: "Berlin",
    country: "Germany",
    clues: [
      "I was once divided into two by a wall.",
      "My city is home to the Brandenburg Gate.",
      "I have a famous island dedicated to museums.",
    ],
    funFacts: [
      "Berlin has more bridges than Venice—around 1,700!",
      "The Berlin Wall fell in 1989, uniting East and West Germany.",
      "The city has the largest train station in Europe.",
    ],
    trivia: [
      "Berlin's TV Tower is the tallest building in Germany.",
      "The city has more doner kebab shops than Istanbul.",
      "Berlin’s underground bunkers are open for public tours.",
    ],
    options: ["Berlin", "Munich", "Vienna", "Amsterdam"],
  },
  {
    city: "Oslo",
    country: "Norway",
    clues: [
      "I'm the capital of the Land of the Midnight Sun.",
      "My city has a museum dedicated to Viking ships.",
      "I host the Nobel Peace Prize ceremony every year.",
    ],
    funFacts: [
      "Oslo’s metro is one of the most scenic in the world.",
      "Norway has more electric cars per capita than any other country.",
      "Oslo’s fjords offer some of the most breathtaking views in Scandinavia.",
    ],
    trivia: [
      "The world’s largest sculpture park made by a single artist is in Oslo.",
      "Oslo was once called Christiania.",
      "The city has a ski jump that doubles as an observation deck.",
    ],
    options: ["Oslo", "Stockholm", "Helsinki", "Copenhagen"],
  },
  {
    city: "Manila",
    country: "Philippines",
    clues: [
      "I'm the capital of a country made up of over 7,000 islands.",
      "I have a historic Spanish fortress called Intramuros.",
      "My city is known for its jeepneys, colorful public transport vehicles.",
    ],
    funFacts: [
      "Manila’s Chinatown is the oldest in the world.",
      "The city was heavily bombed during World War II, leading to extensive rebuilding.",
      "Manila Bay offers some of the most beautiful sunsets in the world.",
    ],
    trivia: [
      "Manila’s San Agustin Church is the oldest stone church in the Philippines.",
      "Jeepneys were originally made from leftover U.S. military jeeps.",
      "The country’s national hero, José Rizal, has a monument here.",
    ],
    options: ["Manila", "Jakarta", "Bangkok", "Ho Chi Minh City"],
  },
  {
    city: "Toronto",
    country: "Canada",
    clues: [
      "I'm home to one of the tallest freestanding towers in the world.",
      "I have an underground city called PATH.",
      "My city is the most multicultural in the world, with over 200 ethnic origins represented.",
    ],
    funFacts: [
      "Toronto’s CN Tower was the tallest building in the world until 2007.",
      "The Toronto Islands are the largest urban car-free community in North America.",
      "Toronto’s St. Lawrence Market has been named the best food market in the world.",
    ],
    trivia: [
      "Toronto is often referred to as 'The Six' due to rapper Drake's influence.",
      "Toronto’s name comes from an indigenous word meaning 'place where trees stand in water'.",
      "The city has more than 1,500 parks and green spaces.",
    ],
    options: ["Toronto", "Vancouver", "Montreal", "New York"],
  },
  {
    city: "Singapore",
    country: "Singapore",
    clues: [
      "I'm a city-state known for my futuristic skyline.",
      "I have a famous infinity pool on top of a three-tower hotel.",
      "Chewing gum is banned in my city!",
    ],
    funFacts: [
      "Singapore has a man-made waterfall inside an airport.",
      "The city is home to the world’s first night zoo.",
      "Singapore has more trees than buildings, making it a ‘City in a Garden’.",
    ],
    trivia: [
      "Singapore was once part of Malaysia before becoming independent in 1965.",
      "The city’s hawker centers serve Michelin-starred street food.",
      "The national symbol of Singapore is the Merlion, a half-fish, half-lion creature.",
    ],
    options: ["Singapore", "Bangkok", "Kuala Lumpur", "Hong Kong"],
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
    clues: [
      "I'm known for my canals, bicycles, and tulips.",
      "My city has a famous red-light district and coffee shops.",
      "The Anne Frank House is one of my most visited sites.",
    ],
    funFacts: [
      "Amsterdam has more bicycles than people!",
      "The city is built on over 11 million wooden poles.",
      "Amsterdam’s canal ring is a UNESCO World Heritage Site.",
    ],
    trivia: [
      "The name Amsterdam comes from 'Amstelredamme,' referring to a dam on the Amstel River.",
      "There are more than 1,500 bridges in the city.",
      "Amsterdam has the highest museum density in the world.",
    ],
    options: ["Amsterdam", "Brussels", "Copenhagen", "Vienna"],
  },
  {
    city: "Boston",
    country: "USA",
    clues: [
      "I'm one of the oldest cities in the United States.",
      "My city played a key role in the American Revolution.",
      "I have a famous baseball stadium called Fenway Park.",
    ],
    funFacts: [
      "Boston’s subway system is the oldest in the U.S., opened in 1897.",
      "Harvard University, the oldest university in the U.S., is located nearby.",
      "Boston has more than 100 colleges and universities.",
    ],
    trivia: [
      "Boston was home to the first public park in America, the Boston Common.",
      "The Boston Tea Party was a key event in American history.",
      "The city's nickname is 'Beantown' due to its colonial-era baked beans.",
    ],
    options: ["Boston", "Philadelphia", "New York", "Washington D.C."],
  },
  {
    city: "Venice",
    country: "Italy",
    clues: [
      "I’m a city built on water with no roads, only canals.",
      "I host a famous festival where people wear masks.",
      "My most famous bridge is the Rialto Bridge.",
    ],
    funFacts: [
      "Venice is built on 118 small islands connected by bridges.",
      "The city's gondolas have been used for transportation for over 1,000 years.",
      "St. Mark’s Basilica has a history dating back to the 9th century.",
    ],
    trivia: [
      "Venice was once a powerful maritime republic.",
      "There are about 400 bridges in the city.",
      "The city is slowly sinking due to rising sea levels.",
    ],
    options: ["Venice", "Florence", "Rome", "Milan"],
  },
  {
    city: "Bangkok",
    country: "Thailand",
    clues: [
      "I'm known for my vibrant street markets and floating markets.",
      "My city is home to the Grand Palace and the Emerald Buddha.",
      "I have one of the longest official city names in the world.",
    ],
    funFacts: [
      "Bangkok’s full ceremonial name is 168 letters long!",
      "The city has one of the busiest and most chaotic street food scenes in the world.",
      "Bangkok’s Chatuchak Market is one of the largest weekend markets in the world.",
    ],
    trivia: [
      "Bangkok is also called 'Krung Thep,' meaning 'City of Angels.'",
      "The city’s tuk-tuks are a popular mode of transportation.",
      "Thailand's monarchy has a grand residence here.",
    ],
    options: ["Bangkok", "Jakarta", "Manila", "Hanoi"],
  },
  {
    city: "Casablanca",
    country: "Morocco",
    clues: [
      "I'm Morocco’s largest city and a major port.",
      "My city has a famous mosque with the tallest minaret in the world.",
      "I share my name with a classic Hollywood film.",
    ],
    funFacts: [
      "Casablanca is Morocco’s economic and business hub.",
      "The Hassan II Mosque can accommodate 25,000 worshippers inside.",
      "The city’s old medina is a mix of French colonial and Moroccan architecture.",
    ],
    trivia: [
      "Casablanca was once a small Berber settlement.",
      "The name Casablanca means 'White House' in Spanish.",
      "The city's coastline has stunning Atlantic Ocean views.",
    ],
    options: ["Casablanca", "Marrakech", "Rabat", "Tangier"],
  },
  {
    city: "Lima",
    country: "Peru",
    clues: [
      "I'm the capital of a South American country known for ceviche.",
      "I was once the most important city in the Spanish Viceroyalty of Peru.",
      "My historic center is a UNESCO World Heritage Site.",
    ],
    funFacts: [
      "Lima is one of the few capital cities located on the coast.",
      "The city has the largest fountain complex in the world.",
      "It is home to pre-Columbian pyramids right in the middle of urban neighborhoods.",
    ],
    trivia: [
      "Lima was founded by Spanish conquistador Francisco Pizarro in 1535.",
      "The city is known as 'The City of Kings.'",
      "Lima's Miraflores district is famous for its cliffside parks and paragliding.",
    ],
    options: ["Lima", "Bogotá", "Santiago", "Quito"],
  },
  {
    city: "Kraków",
    country: "Poland",
    clues: [
      "I'm known for my medieval Old Town and Wawel Castle.",
      "I have a famous dragon legend.",
      "My city survived World War II largely intact.",
    ],
    funFacts: [
      "Kraków was Poland’s capital before Warsaw.",
      "The Wieliczka Salt Mine, near Kraków, has an underground chapel carved from salt.",
      "The city’s Cloth Hall was one of the world’s first shopping malls.",
    ],
    trivia: [
      "Kraków’s main square is the largest medieval town square in Europe.",
      "The city has a famous fire-breathing dragon statue.",
      "Kraków has one of the oldest universities in Europe, Jagiellonian University.",
    ],
    options: ["Kraków", "Warsaw", "Prague", "Budapest"],
  },
  {
    city: "Budapest",
    country: "Hungary",
    clues: [
      "I'm actually two cities divided by a river.",
      "My city has a famous parliament building along the Danube.",
      "I’m known for my thermal baths and ruin bars.",
    ],
    funFacts: [
      "Budapest was originally two cities, Buda and Pest, before uniting in 1873.",
      "The city has the world's largest thermal water cave system.",
      "Budapest’s Chain Bridge was the first permanent bridge to connect both sides of the city.",
    ],
    trivia: [
      "Hungary’s Rubik’s Cube was invented here.",
      "The city’s Fisherman’s Bastion looks like a fairytale castle.",
      "Budapest's metro is the oldest in mainland Europe.",
    ],
    options: ["Budapest", "Vienna", "Bucharest", "Belgrade"],
  },
  {
    city: "Kathmandu",
    country: "Nepal",
    clues: [
      "I'm the capital of a country with the world's highest mountain.",
      "My city is famous for its Durbar Square and Buddhist stupas.",
      "I'm a major starting point for Mount Everest expeditions.",
    ],
    funFacts: [
      "Kathmandu is home to the Living Goddess, known as Kumari.",
      "The city’s Pashupatinath Temple is one of the most sacred Hindu temples.",
      "Kathmandu Valley has seven UNESCO World Heritage Sites.",
    ],
    trivia: [
      "The city’s name is derived from a wooden temple called Kasthamandap.",
      "Nepal's flag is the only national flag that is not a rectangle.",
      "The city is known for its vibrant festivals like Holi and Dashain.",
    ],
    options: ["Kathmandu", "Thimphu", "Lhasa", "Varanasi"],
  },
  {
    city: "Copenhagen",
    country: "Denmark",
    clues: [
      "I’m the capital of a Scandinavian country known for its bicycles.",
      "I have a famous mermaid statue by the harbor.",
      "My city is home to Tivoli Gardens, one of the world's oldest amusement parks.",
    ],
    funFacts: [
      "Copenhagen consistently ranks as one of the world’s happiest cities.",
      "The city has more bicycles than cars.",
      "The Danish concept of 'hygge' originated here.",
    ],
    trivia: [
      "Copenhagen’s Metro runs 24/7, making it one of the few in the world to do so.",
      "The city’s Freetown Christiania is an alternative neighborhood with its own rules.",
      "The Carlsberg brewery was founded here.",
    ],
    options: ["Copenhagen", "Oslo", "Stockholm", "Helsinki"],
  },
  {
    city: "Dublin",
    country: "Ireland",
    clues: [
      "I'm the capital of a country known for its green landscapes.",
      "My city is home to the Guinness Storehouse.",
      "I have a famous book-filled library at Trinity College.",
    ],
    funFacts: [
      "Dublin has more than 750 pubs.",
      "The city’s name comes from 'Dubh Linn,' meaning 'Black Pool.'",
      "Bram Stoker, the author of Dracula, was born here.",
    ],
    trivia: [
      "Dubliners speak a dialect called 'Hiberno-English.'",
      "The city’s Ha’penny Bridge is one of its most iconic landmarks.",
      "Dublin was founded by the Vikings in the 9th century.",
    ],
    options: ["Dublin", "Belfast", "Edinburgh", "Cardiff"],
  },
  {
    city: "Mumbai",
    country: "India",
    clues: [
      "I'm the financial capital of India.",
      "My city is home to Bollywood, India’s film industry.",
      "I have a famous arch called the Gateway of India.",
    ],
    funFacts: [
      "Mumbai’s local train system carries over 7.5 million passengers daily.",
      "The city was originally made up of seven islands.",
      "Mumbai’s dabbawalas deliver 200,000 lunches daily with near-perfect accuracy.",
    ],
    trivia: [
      "The city was formerly known as Bombay.",
      "Mumbai’s Chhatrapati Shivaji Terminus is a UNESCO World Heritage Site.",
      "Mumbai’s Marine Drive is known as the 'Queen’s Necklace' when lit up at night.",
    ],
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
  },

  {
    city: "Bengaluru",
    country: "India",
    clues: [
      "I'm known as the 'Silicon Valley of India' due to my thriving tech industry.",
      "My city enjoys a pleasant climate year-round, often called the 'Garden City.'",
      "I'm home to numerous parks, including the famous Lalbagh Botanical Garden.",
    ],
    funFacts: [
      "Bengaluru has the highest number of engineering colleges in India.",
      "The city is known for its vibrant startup ecosystem.",
      "Bengaluru's Cubbon Park spans over 300 acres in the heart of the city.",
    ],
    trivia: [
      "The city was founded in 1537 by Kempe Gowda.",
      "Bengaluru is one of the fastest-growing metropolitan areas in India.",
      "The city is a major center for Indian classical music and dance.",
    ],
    options: ["Bengaluru", "Hyderabad", "Chennai", "Pune"],
  },
  {
    city: "Hyderabad",
    country: "India",
    clues: [
      "I'm known as the 'City of Pearls' for my historical pearl and diamond trading centers.",
      "My city is famous for the iconic Charminar monument.",
      "I'm renowned for my unique Hyderabadi biryani.",
    ],
    funFacts: [
      "Hyderabad's Ramoji Film City is the largest film studio complex in the world.",
      "The city has a rich history blending Hindu and Muslim traditions.",
      "Hussain Sagar, a heart-shaped lake, separates Hyderabad from its twin city, Secunderabad.",
    ],
    trivia: [
      "Hyderabad was founded in 1591 by Muhammad Quli Qutb Shah.",
      "The city is a major hub for the information technology industry.",
      "Hyderabad's Golconda Fort was once a center for diamond trade.",
    ],
    options: ["Hyderabad", "Bengaluru", "Lucknow", "Jaipur"],
  },
  {
    city: "Ahmedabad",
    country: "India",
    clues: [
      "I'm the largest city in the state of Gujarat.",
      "My city is known for the Sabarmati Ashram, associated with Mahatma Gandhi.",
      "I'm famous for my intricate pol architecture in the old city.",
    ],
    funFacts: [
      "Ahmedabad was India's first UNESCO World Heritage City.",
      "The city hosts the vibrant nine-night Navratri festival.",
      "Kankaria Lake is a popular recreational spot in Ahmedabad.",
    ],
    trivia: [
      "Ahmedabad was founded in 1411 by Sultan Ahmed Shah.",
      "The city is known for its thriving textile industry.",
      "The Calico Museum of Textiles in Ahmedabad is one of the finest in the world.",
    ],
    options: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  },
  {
    city: "Jaipur",
    country: "India",
    clues: [
      "I'm known as the 'Pink City' due to the distinct color of my buildings.",
      "My city is home to the Hawa Mahal, a palace with 953 windows.",
      "I'm part of the popular tourist circuit called the Golden Triangle.",
    ],
    funFacts: [
      "Jaipur's Jantar Mantar is the largest stone astronomical observatory in the world.",
      "The city was founded in 1727 by Maharaja Sawai Jai Singh II.",
      "Amber Fort, located near Jaipur, is a UNESCO World Heritage Site.",
    ],
    trivia: [
      "Jaipur is renowned for its gemstone jewelry and textiles.",
      "The city hosts the annual Jaipur Literature Festival, the world's largest free literary festival.",
      "Jaipur's planning is based on Vastu Shastra, an ancient Indian architectural doctrine.",
    ],
    options: ["Jaipur", "Udaipur", "Jodhpur", "Bikaner"],
  },
  {
    city: "Kolkata",
    country: "India",
    clues: [
      "I'm known as the 'City of Joy' and was the capital of British India until 1911.",
      "My city is famous for the Howrah Bridge and Victoria Memorial.",
      "I'm considered the cultural capital of India, with a rich literary and artistic heritage.",
    ],
    funFacts: [
      "Kolkata is home to the oldest operating port in India, the Port of Kolkata.",
      "The city hosts the largest book fair in Asia, the Kolkata Book Fair.",
      "Kolkata's trams are the oldest operating electric tram system in Asia.",
    ],
    trivia: [
      "The Bengali film industry, known as Tollywood, is based in Kolkata.",
      "The city celebrates the grand Durga Puja festival annually.",
      "Kolkata's Indian Museum is the oldest and largest museum in India.",
    ],
    options: ["Kolkata", "Mumbai", "Chennai", "Delhi"],
  },
  {
    city: "Varanasi",
    country: "India",
    clues: [
      "I'm one of the oldest continuously inhabited cities in the world, situated on the banks of the Ganges River.",
      "My city is a major center for Hindu pilgrimage, known for its ghats and the Kashi Vishwanath Temple.",
      "I'm famous for silk weaving, especially Banarasi sarees.",
    ],
    funFacts: [
      "Varanasi is often referred to as the 'Spiritual Capital of India.'",
      "The city has been a cultural and religious hub for thousands of years.",
      "Varanasi is renowned for its classical music and dance traditions.",
    ],
    trivia: [
      "The city is also known as Kashi and Benares.",
      "Mark Twain once wrote that Varanasi is 'older than history, older than tradition.'",
      "The Banaras Hindu University, located here, is one of Asia's largest residential universities.",
    ],
    options: ["Varanasi", "Allahabad", "Haridwar", "Rishikesh"],
  },
  {
    city: "Jodhpur",
    country: "India",
    clues: [
      "I'm known as the 'Blue City' due to the blue-painted houses in my old town.",
      "My city is dominated by the imposing Mehrangarh Fort.",
      "I'm located on the edge of the Thar Desert.",
    ],
    funFacts: [
      "Jodhpur was formerly the capital of the Marwar kingdom.",
      "The city is famous for its traditional Marwari cuisine.",
      "Jodhpur's Umaid Bhawan Palace is one of the world's largest private residences.",
    ],
    trivia: [
      "The city experiences bright, sunny weather year-round, earning it the nickname 'Sun City.'",
      "Jodhpur is a popular destination for destination weddings.",
      "The city has been featured in numerous Bollywood and Hollywood films.",
    ],
    options: ["Jodhpur", "Jaipur", "Udaipur", "Bikaner"],
  },
  {
    city: "Amritsar",
    country: "India",
    clues: [
      "I'm home to the Harmandir Sahib, also known as the Golden Temple.",
      "My city is a spiritual center for Sikhism.",
      "I'm located in the northwestern state of Punjab.",
    ],
    funFacts: [
      "Amritsar was founded in 1577 by the fourth Sikh Guru, Guru Ram Das.",
      "The city is known for its rich Punjabi cuisine.",
      "The Wagah Border, a ceremonial border crossing between India and Pakistan, is located near Amritsar.",
    ],
    trivia: [
      "The Jallianwala Bagh massacre, a pivotal event in India's independence movement, took place here in 1919.",
      "Amritsar literally means 'Pool of Nectar' in Punjabi.",
      "The city is a major producer of textiles and handicrafts.",
    ],
    options: ["Amritsar", "Ludhiana", "Chandigarh", "Patiala"],
  },
  {
    city: "Mysuru",
    country: "India",
    clues: [
      "I'm known as the 'City of Palaces' and located in the southern state of Karnataka.",
      "My city is famous for the grand Mysore Palace.",
      "I'm renowned for my Dussehra festival celebrations.",
    ],
    funFacts: [
      "Mysuru was the capital of the Kingdom of Mysore for nearly six centuries.",
      "The city is famous for its silk sarees, known as Mysore silk.",
      "Mysuru is also known for its yoga centers, attracting practitioners worldwide.",
    ],
    trivia: [
      "The name 'Mysore' is derived from 'Mahishuru,' meaning the abode of Mahishasura, a demon from Hindu mythology.",
      "Mysuru Zoo is one of the oldest and most well-maintained zoos in India.",
      "The city has been a center for sandalwood carving and incense production.",
    ],
    options: ["Mysuru", "Bengaluru", "Coimbatore", "Mangalore"],
  },
  {
    city: "Pondicherry",
    country: "India",
    clues: [
      "I'm a Union Territory with a distinct French colonial heritage.",
      "My city is known for its serene beaches and the Aurobindo Ashram.",
      "I'm often referred to as the 'French Riviera of the East.'",
    ],
    funFacts: [
      "Pondicherry was under French rule until 1954.",
      "The city has well-preserved French architecture and street names.",
      "Pondicherry is known for its vibrant café culture and French cuisine.",
    ],
    trivia: [
      "The city is officially known as Puducherry.",
      "Pondicherry has four beaches: Promenade Beach, Paradise Beach, Serenity Beach, and Auroville Beach.",
      "The experimental township of Auroville, aiming for human unity, is located near Pondicherry.",
    ],
    options: ["Pondicherry", "Chennai", "Kochi", "Trivandrum"],
  },
  {
    city: "Udaipur",
    country: "India",
    clues: [
      "I'm known as the 'City of Lakes' due to my numerous interconnected lakes.",
      "My city is home to the grand City Palace overlooking Lake Pichola.",
      "I'm renowned for my romantic ambiance and historic havelis.",
    ],
    funFacts: [
      "Udaipur's Lake Palace, situated on Jag Niwas Island, is now a luxury hotel.",
      "The city has been featured in several Hollywood and Bollywood films.",
      "Udaipur hosts the annual Mewar Festival, celebrating the arrival of spring.",
    ],
    trivia: [
      "Udaipur was founded in 1559 by Maharana Udai Singh II.",
      "The city served as the capital of the Mewar Kingdom.",
      "Udaipur's Jagdish Temple is a significant example of Indo-Aryan architecture.",
    ],
    options: ["Udaipur", "Jaipur", "Jodhpur", "Bikaner"],
  },
  {
    city: "Chennai",
    country: "India",
    clues: [
      "I'm known as the 'Gateway to South India.'",
      "My city is home to Marina Beach, one of the longest urban beaches in the world.",
      "I'm renowned for my classical music and dance traditions.",
    ],
    funFacts: [
      "Chennai hosts the annual Madras Music Season, a five-week-long Carnatic music festival.",
      "The city is a major center for the Tamil film industry, known as Kollywood.",
      "Chennai's Fort St. George is the first English fortress built in India.",
    ],
    trivia: [
      "Chennai was formerly known as Madras until 1996.",
      "The city serves as the capital of Tamil Nadu state.",
      "Chennai's Kapaleeshwarar Temple is a fine example of Dravidian architecture.",
    ],
    options: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  },
  {
    city: "Pune",
    country: "India",
    clues: [
      "I'm known as the 'Oxford of the East' due to my numerous educational institutions.",
      "My city is home to the historic Aga Khan Palace.",
      "I'm renowned for my vibrant cultural scene and festivals.",
    ],
    funFacts: [
      "Pune was the center of the Maratha Empire in the 18th century.",
      "The city hosts the Sawai Gandharva Bhimsen Festival, celebrating Hindustani classical music.",
      "Pune's Osho International Meditation Resort attracts visitors worldwide.",
    ],
    trivia: [
      "Pune is one of India's fastest-growing cities and a major IT hub.",
      "The city is surrounded by scenic hills and forts, popular for trekking.",
      "Pune's Shaniwar Wada was the seat of the Peshwas of the Maratha Empire.",
    ],
    options: ["Pune", "Mumbai", "Nagpur", "Nashik"],
  },
  {
    city: "Goa",
    country: "India",
    clues: [
      "I'm India's smallest state by area, known for my pristine beaches.",
      "My region was a former Portuguese colony until 1961.",
      "I'm renowned for my vibrant nightlife and seafood cuisine.",
    ],
    funFacts: [
      "Goa's Basilica of Bom Jesus houses the remains of St. Francis Xavier.",
      "The state hosts the annual Goa Carnival, a legacy of its Portuguese past.",
      "Goa's Dudhsagar Falls is one of the tallest waterfalls in India.",
    ],
    trivia: [
      "Goa is divided into North Goa and South Goa districts.",
      "The state's official language is Konkani.",
      "Goa's spice plantations are popular tourist attractions.",
    ],
    options: ["Goa", "Kerala", "Maharashtra", "Karnataka"],
  },
  {
    city: "Los Angeles",
    country: "USA",
    clues: [
      "I'm known as the 'Entertainment Capital of the World' and home to Hollywood.",
      "My city boasts iconic landmarks like the Hollywood Sign and Griffith Observatory.",
      "I'm famous for my diverse neighborhoods, including Beverly Hills and Venice Beach.",
    ],
    funFacts: [
      "Los Angeles hosted the Summer Olympics twice, in 1932 and 1984.",
      "The city is home to the largest historical theater district on the National Register of Historic Places.",
      "L.A.'s original name was 'El Pueblo de Nuestra Señora la Reina de los Ángeles de Porciúncula.'",
    ],
    trivia: [
      "Los Angeles is the second-most populous city in the United States.",
      "The city has more museums per capita than any other city in the world.",
      "L.A. is known for its car culture, with the highest number of automobiles per capita globally.",
    ],
    options: ["Los Angeles", "San Francisco", "San Diego", "Las Vegas"],
  },
  {
    city: "Chicago",
    country: "USA",
    clues: [
      "I'm known as the 'Windy City' and famous for my deep-dish pizza.",
      "My skyline features architectural marvels like the Willis Tower and John Hancock Center.",
      "I'm home to the historic Wrigley Field, one of the oldest baseball stadiums in the U.S.",
    ],
    funFacts: [
      "Chicago River is the only river in the world that flows backward.",
      "The city introduced the first skyscraper in 1885.",
      "Chicago's O'Hare International Airport was once the busiest airport in the world.",
    ],
    trivia: [
      "Chicago is the third-largest city in the United States.",
      "The city has over 200 theaters and 200 art galleries.",
      "Chicago's nickname, 'The Windy City,' refers to its politicians, not its weather.",
    ],
    options: ["Chicago", "New York", "Boston", "Philadelphia"],
  },
  {
    city: "New Orleans",
    country: "USA",
    clues: [
      "I'm known as the 'Big Easy' and famous for my vibrant music scene, especially jazz.",
      "My city hosts the annual Mardi Gras festival, attracting visitors worldwide.",
      "I'm renowned for my Creole cuisine, including dishes like gumbo and jambalaya.",
    ],
    funFacts: [
      "New Orleans has the world's largest concentration of historic districts.",
      "The city is built on a crescent-shaped bend of the Mississippi River.",
      "New Orleans' streetcars are the oldest continuously operating streetcar system in the world.",
    ],
    trivia: [
      "The French Quarter is the oldest neighborhood in the city.",
      "New Orleans was the birthplace of poker and craps.",
      "The city has a tradition of above-ground tombs due to its high water table.",
    ],
    options: ["New Orleans", "Atlanta", "Houston", "Miami"],
  },
  {
    city: "San Francisco",
    country: "USA",
    clues: [
      "I'm known for my iconic Golden Gate Bridge and historic cable cars.",
      "My city is home to Alcatraz Island, a former federal prison.",
      "I'm famous for my steep hills and eclectic architecture.",
    ],
    funFacts: [
      "San Francisco was built on 43 hills.",
      "The city was part of Mexico until the Mexican-American War.",
      "Fortune cookies were invented in San Francisco.",
    ],
    trivia: [
      "The city's Chinatown is the oldest and one of the largest in North America.",
      "San Francisco has more dogs than children.",
      "The United Nations Charter was signed in San Francisco in 1945.",
    ],
    options: ["San Francisco", "Los Angeles", "Seattle", "Portland"],
  },
  {
    city: "Miami",
    country: "USA",
    clues: [
      "I'm known for my beautiful beaches and vibrant nightlife.",
      "My city has a strong Cuban influence, especially in Little Havana.",
      "I'm famous for my Art Deco Historic District in South Beach.",
    ],
    funFacts: [
      "Miami is the only major U.S. city founded by a woman.",
      "The city is home to the world's largest collection of Art Deco architecture.",
      "Miami's port is known as the 'Cruise Capital of the World.'",
    ],
    trivia: [
      "Miami has more than 800 parks and is the only U.S. city bordered by two national parks.",
      "The city's name comes from one of the native tribes that lived in the region.",
      "Miami is the warmest major city in the U.S. during winter.",
    ],
    options: ["Miami", "Orlando", "Tampa", "Fort Lauderdale"],
  },
  {
    city: "Seattle",
    country: "USA",
    clues: [
      "I'm known for my iconic Space Needle and coffee culture.",
      "My city is home to tech giants like Amazon and Microsoft.",
      "I'm surrounded by water, mountains, and evergreen forests.",
    ],
    funFacts: [
      "Seattle is the birthplace of Starbucks and grunge music.",
      "The city has more houseboats than any other city in the U.S.",
      "Seattle’s Pike Place Market is one of the oldest continuously operating public markets in the country.",
    ],
    trivia: [
      "Seattle is one of the most literate cities in the U.S., with a high number of library visits per capita.",
      "The city’s underground tour takes visitors through the buried remains of old Seattle.",
      "Mount Rainier, visible from Seattle, is an active stratovolcano.",
    ],
    options: ["Seattle", "Portland", "San Francisco", "Denver"],
  },
  {
    city: "Houston",
    country: "USA",
    clues: [
      "I'm the largest city in Texas and known for my space industry.",
      "My city is home to NASA’s Johnson Space Center.",
      "I have one of the most diverse food scenes in the country.",
    ],
    funFacts: [
      "Houston is the most diverse city in the U.S., with over 145 languages spoken.",
      "The city has an underground pedestrian tunnel system spanning 7 miles.",
      "Houston’s Museum District has 19 museums within a 1.5-mile radius.",
    ],
    trivia: [
      "Houston was named after Sam Houston, a leader in Texas' independence from Mexico.",
      "The Astrodome, built here, was the world’s first domed sports stadium.",
      "The city has no formal zoning laws, leading to unique urban development.",
    ],
    options: ["Houston", "Dallas", "Austin", "San Antonio"],
  },
  {
    city: "Philadelphia",
    country: "USA",
    clues: [
      "I'm known as the 'City of Brotherly Love' and home to the Liberty Bell.",
      "My city was the first U.S. capital and hosted the signing of the Declaration of Independence.",
      "I'm famous for my cheesesteaks and Rocky steps.",
    ],
    funFacts: [
      "Philadelphia was the first city to have a zoo in the U.S.",
      "The Philadelphia Museum of Art's front steps are famous due to the movie 'Rocky.'",
      "The city is home to the oldest continuously inhabited street in America, Elfreth’s Alley.",
    ],
    trivia: [
      "Philadelphia’s name means 'brotherly love' in Greek.",
      "It was the first U.S. city to provide free library services.",
      "Benjamin Franklin founded the University of Pennsylvania here.",
    ],
    options: ["Philadelphia", "Boston", "New York", "Washington D.C."],
  },
  {
    city: "Las Vegas",
    country: "USA",
    clues: [
      "I'm known as 'Sin City' and famous for my casinos and nightlife.",
      "My city is home to some of the world's largest hotels and resorts.",
      "I'm located in the Mojave Desert and get more than 300 days of sunshine a year.",
    ],
    funFacts: [
      "Las Vegas has more hotel rooms than any other city in the world.",
      "The Las Vegas Strip is not technically within the city limits—it’s in an unincorporated area called Paradise.",
      "The famous 'Welcome to Fabulous Las Vegas' sign has been standing since 1959.",
    ],
    trivia: [
      "The city was founded in 1905 and officially became a city in 1911.",
      "More than 41 million people visit Las Vegas each year.",
      "Vegas is home to the largest mechanical neon sign collection in the world.",
    ],
    options: ["Las Vegas", "Los Angeles", "Phoenix", "Denver"],
  },
  {
    city: "Washington, D.C.",
    country: "USA",
    clues: [
      "I'm the capital of the United States.",
      "My city is home to the White House and the U.S. Capitol.",
      "I have some of the most famous museums and monuments in the country.",
    ],
    funFacts: [
      "Washington, D.C. has no skyscrapers due to height restrictions.",
      "The Library of Congress is the largest library in the world.",
      "The city has more than 160 monuments and memorials.",
    ],
    trivia: [
      "D.C. was established in 1790 and designed by French architect Pierre L’Enfant.",
      "The National Mall is 2 miles long and hosts many major events.",
      "Washington, D.C. is not part of any U.S. state.",
    ],
    options: ["Washington, D.C.", "New York", "Boston", "Philadelphia"],
  },
  {
    city: "Bristol",
    country: "England",
    clues: [
      "I'm known for my vibrant arts scene and historic maritime heritage.",
      "My city features the iconic Clifton Suspension Bridge.",
      "I'm home to the annual International Balloon Fiesta, one of Europe's largest hot air balloon events.",
    ],
    funFacts: [
      "Bristol was a significant port in the transatlantic slave trade.",
      "The city has its own currency, the Bristol Pound, to support local businesses.",
      "Famous street artist Banksy hails from Bristol, and his artwork can be found throughout the city.",
    ],
    trivia: [
      "Bristol was named the UK's first 'Cycling City' in 2008.",
      "The city has been a filming location for numerous movies and TV shows, including 'Doctor Who' and 'Skins.'",
      "Bristol's harbour has been transformed into a cultural hub with museums, galleries, and restaurants.",
    ],
    options: ["Bristol", "Bath", "Liverpool", "Manchester"],
  },
  {
    city: "Leicester",
    country: "England",
    clues: [
      "I'm one of the oldest cities in England, with Roman and medieval history.",
      "My city gained international attention with the discovery of King Richard III's remains.",
      "I'm known for my vibrant Diwali celebrations, among the largest outside India.",
    ],
    funFacts: [
      "Leicester's National Space Centre is the UK's largest space-related attraction.",
      "The city has a rich sporting heritage, with successful football and rugby teams.",
      "Leicester Market is one of the largest outdoor covered markets in Europe.",
    ],
    trivia: [
      "Leicester was the birthplace of modern standard English.",
      "The city played a pivotal role in the English Civil War.",
      "Leicester's cultural diversity is reflected in its wide array of festivals and cuisines.",
    ],
    options: ["Leicester", "Nottingham", "Coventry", "Derby"],
  },
  {
    city: "Brighton and Hove",
    country: "England",
    clues: [
      "I'm a seaside city known for my vibrant arts scene and LGBTQ+ community.",
      "My city features the iconic Royal Pavilion and a historic pier.",
      "I'm often referred to as 'London by the Sea' due to my popularity among Londoners.",
    ],
    funFacts: [
      "Brighton hosts the UK's largest arts festival, the Brighton Festival, every May.",
      "The city is home to Britain's oldest cinema, the Duke of York's Picturehouse.",
      "Brighton's beachfront has over 400,000,000 pebbles.",
    ],
    trivia: [
      "Brighton was a major center for smuggling in the 18th century.",
      "The city has more restaurants per resident than any other city in the UK.",
      "Brighton's Volks Electric Railway is the world's oldest operating electric railway.",
    ],
    options: ["Brighton and Hove", "Portsmouth", "Southampton", "Bournemouth"],
  },
  {
    city: "Newcastle upon Tyne",
    country: "England",
    clues: [
      "I'm known for my vibrant nightlife and the iconic Tyne Bridge.",
      "My city has a rich industrial history, particularly in shipbuilding and coal mining.",
      "I'm home to the historic Newcastle Castle, which gave the city its name.",
    ],
    funFacts: [
      "Newcastle's residents are known as 'Geordies,' and the city has its own distinct dialect.",
      "The city hosts the Great North Run, the world's largest half marathon.",
      "Newcastle was the first city in the world to be lit by electric street lighting.",
    ],
    trivia: [
      "Newcastle's Grey Street was voted the best street in the UK.",
      "The city has more bridges than Venice, with seven crossing the River Tyne.",
      "Newcastle's university is a member of the prestigious Russell Group.",
    ],
    options: ["Newcastle upon Tyne", "Sunderland", "Durham", "Carlisle"],
  },
  {
    city: "Nottingham",
    country: "England",
    clues: [
      "I'm famously associated with the legend of Robin Hood.",
      "My city has a rich lace-making history and was once known as the 'City of Lace.'",
      "I'm home to the historic Nottingham Castle and the City of Caves.",
    ],
    funFacts: [
      "Nottingham has the oldest pub in England, 'Ye Olde Trip to Jerusalem,' established in 1189.",
      "The city was a major center during the Industrial Revolution, particularly in textiles.",
      "Nottingham's Goose Fair is one of the oldest and largest traveling fairs in Europe.",
    ],
    trivia: [
      "Nottingham is known as the 'Queen of the Midlands' due to its central location.",
      "The city has a network of over 800 man-made caves, some dating back to medieval times.",
      "Nottingham's university is consistently ranked among the top in the UK.",
    ],
    options: ["Nottingham", "Leicester", "Derby", "Sheffield"],
  },
  {
    city: "São Paulo",
    country: "Brazil",
    clues: [
      "I'm the largest city in Brazil and South America.",
      "My name translates to 'Saint Paul' in English.",
      "I'm known as the financial center of Brazil, hosting the São Paulo Stock Exchange.",
    ],
    funFacts: [
      "São Paulo has the largest Japanese community outside Japan.",
      "The city hosts the world's largest gay pride parade annually.",
      "São Paulo's Avenida Paulista is a major cultural and financial avenue, often compared to New York's Wall Street.",
    ],
    trivia: [
      "São Paulo's cuisine is a melting pot, reflecting its diverse immigrant communities.",
      "The city experiences a subtropical climate, with frequent rain showers.",
      "São Paulo's public transportation system includes a vast network of buses and a rapidly expanding metro system.",
    ],
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
  },
  {
    city: "Bogotá",
    country: "Colombia",
    clues: [
      "I'm the capital and largest city of Colombia.",
      "I'm located on a high plateau in the Andes Mountains at an altitude of 2,640 meters (8,660 ft).",
      "I'm known as the 'Athens of South America' due to my many universities and libraries.",
    ],
    funFacts: [
      "Bogotá has a unique public transportation system called the TransMilenio, a bus rapid transit system that serves millions daily.",
      "The city hosts the largest theater festival in the world, the Ibero-American Theater Festival.",
      "Bogotá's Ciclovía is a weekly event where main streets are closed to cars, allowing cyclists and pedestrians to enjoy the city.",
    ],
    trivia: [
      "Bogotá's Gold Museum houses the largest collection of pre-Columbian gold artifacts in the world.",
      "The city experiences a subtropical highland climate, with relatively consistent temperatures year-round.",
      "Bogotá's Monserrate mountain offers panoramic views of the city and is a popular pilgrimage site.",
    ],
    options: ["Bogotá", "Medellín", "Cali", "Cartagena"],
  },
  {
    city: "Santiago",
    country: "Chile",
    clues: [
      "I'm the capital and largest city of Chile.",
      "I'm nestled in a valley surrounded by the Andes and the Chilean Coastal Range.",
      "I'm known for my neoclassical architecture and vibrant cultural scene.",
    ],
    funFacts: [
      "Santiago's Costanera Center is the tallest building in Latin America, standing at 300 meters (984 ft).",
      "The city experiences a Mediterranean climate, with hot, dry summers and mild, wet winters.",
      "Santiago's Barrio Bellavista is a bohemian neighborhood famous for its street art, nightlife, and as the former home of poet Pablo Neruda.",
    ],
    trivia: [
      "Santiago's Metropolitan Park is one of the largest urban parks in the world, offering hiking trails and a zoo.",
      "The city is a major financial hub, often referred to as 'Chile's Silicon Valley' due to its growing tech industry.",
      "Santiago's central market, Mercado Central, is renowned for its fresh seafood and traditional Chilean dishes.",
    ],
    options: ["Santiago", "Valparaíso", "Concepción", "La Serena"],
  },
  {
    city: "Quito",
    country: "Ecuador",
    clues: [
      "I'm the capital city of Ecuador.",
      "I'm located high in the Andes at an elevation of 2,850 meters (9,350 ft), making me the second-highest capital city in the world.",
      "I'm known for my well-preserved historic center, which was among the first UNESCO World Heritage Sites.",
    ],
    funFacts: [
      "Quito is just 25 kilometers (16 miles) south of the equator, and you can visit the 'Middle of the World' monument to stand in both hemispheres.",
      "The city's historic center features numerous 16th and 17th-century churches and other structures, showcasing Spanish colonial architecture.",
      "Quito's annual Fiestas de Quito celebrate the city's founding with parades, concerts, and cultural events.",
    ],
    trivia: [
      "Quito's TelefériQo is one of the highest aerial lifts in the world, offering panoramic views of the city and surrounding mountains.",
      "The city experiences a subtropical highland climate, with mild temperatures year-round.",
      "Quito's La Mariscal neighborhood, also known as 'Gringolandia,' is popular among tourists for its vibrant nightlife and dining options.",
    ],
    options: ["Quito", "Guayaquil", "Cuenca", "Ambato"],
  },
  {
    city: "Ho Chi Minh City",
    country: "Vietnam",
    clues: [
      "I'm the largest city in Vietnam, formerly known as Saigon.",
      "I played a pivotal role during the Vietnam War.",
      "I'm famous for my French colonial landmarks, including the Notre-Dame Cathedral and the Central Post Office.",
    ],
    funFacts: [
      "Ho Chi Minh City is often referred to as the 'Pearl of the Far East.'",
      "The city has a vibrant street food culture, with dishes like pho and banh mi originating here.",
      "The Saigon River runs through the city, providing scenic views and transportation routes.",
    ],
    trivia: [
      "The city's Ben Thanh Market is one of the oldest surviving markets and a symbol of the city.",
      "Ho Chi Minh City experiences a tropical climate, with a distinct rainy season from May to November.",
      "The War Remnants Museum offers insights into the Vietnam War from the Vietnamese perspective.",
    ],
    options: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Can Tho"],
  },
  {
    city: "Osaka",
    country: "Japan",
    clues: [
      "I'm Japan's third-largest city, located in the Kansai region.",
      "I'm known as the 'Nation's Kitchen' due to my rich culinary history.",
      "I host the historic Osaka Castle, a symbol of my city.",
    ],
    funFacts: [
      "Osaka will host the World Expo 2025, focusing on future society and sustainability.",
      "The city is famous for its street food, including takoyaki (octopus balls) and okonomiyaki (savory pancakes).",
      "Osaka's Universal Studios Japan was the first Universal Studios theme park built in Asia.",
    ],
    trivia: [
      "Osaka's Dotonbori district is renowned for its vibrant nightlife and illuminated billboards.",
      "The city has a unique dialect called 'Osaka-ben,' distinct from standard Japanese.",
      "Osaka's Kaiyukan is one of the largest public aquariums in the world, featuring diverse marine life.",
    ],
    options: ["Osaka", "Tokyo", "Kyoto", "Nagoya"],
  },
  {
    city: "Karachi",
    country: "Pakistan",
    clues: [
      "I'm Pakistan's largest city and main seaport.",
      "I'm located on the Arabian Sea coastline.",
      "I'm known as the 'City of Lights' due to my vibrant nightlife.",
    ],
    funFacts: [
      "Karachi contributes approximately 25% to Pakistan's GDP, serving as its financial hub.",
      "The city is home to the Quaid-e-Azam's Mausoleum, the resting place of Pakistan's founder, Muhammad Ali Jinnah.",
      "Karachi's diverse population includes numerous ethnic groups, making it a melting pot of cultures.",
    ],
    trivia: [
      "Karachi's Clifton Beach is a popular destination for locals and tourists alike.",
      "The city experiences a hot desert climate, with mild winters and hot summers.",
      "Karachi's public transport includes colorful minibuses, often adorned with elaborate artwork.",
    ],
    options: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
  },
  {
    city: "Dhaka",
    country: "Bangladesh",
    clues: [
      "I'm the capital and largest city of Bangladesh.",
      "I'm situated on the banks of the Buriganga River.",
      "I'm known as the 'City of Mosques' due to my numerous Islamic places of worship.",
    ],
    funFacts: [
      "Dhaka is one of the most densely populated cities in the world.",
      "The city is famous for its rickshaws, with an estimated half a million operating daily.",
      "Dhaka hosts the annual Dhaka Art Summit, a significant event for South Asian contemporary art.",
    ],
    trivia: [
      "The historic Lalbagh Fort is a prominent Mughal-era fort complex in Dhaka.",
      "The city experiences a tropical savanna climate, with distinct monsoon seasons.",
      "Dhaka's textile industry plays a crucial role in the global garment sector.",
    ],
    options: ["Dhaka", "Chittagong", "Khulna", "Rajshahi"],
  },
  {
    city: "Chongqing",
    country: "China",
    clues: [
      "I'm a major city in southwest China, known for my mountainous terrain.",
      "I'm one of China's four direct-controlled municipalities.",
      "I'm famous for my spicy hotpot cuisine.",
    ],
    funFacts: [
      "Chongqing is often referred to as the 'Mountain City' due to its hilly landscape.",
      "The city serves as a significant manufacturing and transportation hub in western China.",
      "Chongqing's Yangtze River Cableway offers scenic views of the river and cityscape.",
    ],
    trivia: [
      "The city experiences a humid subtropical climate, with hot summers and mild winters.",
      "Chongqing's Dazu Rock Carvings, a UNESCO World Heritage Site, showcase Buddhist, Confucian, and Taoist sculptures.",
      "The city is known for its foggy weather, earning the nickname 'Fog Capital.'",
    ],
    options: ["Chongqing", "Chengdu", "Wuhan", "Xi'an"],
  },
  {
    "city": "Auckland",
    "country": "New Zealand",
    "clues": [
        "I'm the largest city in New Zealand, often referred to as the 'City of Sails' due to my numerous marinas and love for sailing.",
        "I am built on a volcanic field, with approximately 53 dormant volcanoes.",
        "I host the iconic Sky Tower, the tallest freestanding structure in the Southern Hemisphere."
    ],
    "funFacts": [
        "Auckland consistently ranks among the world's most livable cities.",
        "The city has a diverse population, with over 40% of residents born overseas.",
        "Auckland's Viaduct Harbour was the base for the America's Cup yachting regattas in 2000 and 2003."
    ],
    "trivia": [
        "Auckland is one of the few cities in the world to have harbors on two separate major bodies of water: the Tasman Sea and the Pacific Ocean.",
        "The city's Māori name is Tāmaki Makaurau, meaning 'desired by many,' reflecting its fertile land and strategic location.",
        "Auckland's Rangitoto Island is the youngest and largest of the city's volcanoes, having erupted around 600 years ago."
    ],
    "options": ["Auckland", "Wellington", "Christchurch", "Hamilton"]
}
,{
    "city": "Wellington",
    "country": "New Zealand",
    "clues": [
        "I'm the capital city of New Zealand, located at the southern tip of the North Island.",
        "I'm known as the 'Windy City' due to my frequent strong winds.",
        "I host the Beehive, the distinctive executive wing of the New Zealand Parliament Buildings."
    ],
    "funFacts": [
        "Wellington is often hailed as the 'coolest little capital in the world' by travel guides.",
        "The city has a vibrant arts scene, hosting events like the New Zealand International Arts Festival.",
        "Wellington's cable car offers panoramic views of the city and access to the Botanic Garden."
    ],
    "trivia": [
        "Wellington is the southernmost capital city in the world.",
        "The city is built on the edge of a fault line, making it prone to earthquakes.",
        "Wellington's Te Papa Tongarewa is the national museum and art gallery of New Zealand."
    ],
    "options": ["Wellington", "Auckland", "Dunedin", "Nelson"]
}
,{
    "city": "Christchurch",
    "country": "New Zealand",
    "clues": [
        "I'm the largest city in the South Island of New Zealand.",
        "I'm known as the 'Garden City' due to my numerous parks and public gardens.",
        "I have been rebuilding and revitalizing since the significant earthquakes in 2010 and 2011."
    ],
    "funFacts": [
        "Christchurch is home to the International Antarctic Centre, serving as a base for Antarctic exploration.",
        "The city hosts the World Buskers Festival, attracting performers from around the globe.",
        "Christchurch's Avon River offers scenic punting tours reminiscent of English traditions."
    ],
    "trivia": [
        "Christchurch has a strong English heritage, reflected in its architecture and place names.",
        "The city is a gateway to the Canterbury Plains and Southern Alps, offering diverse outdoor activities.",
        "Christchurch's Cardboard Cathedral was built as a temporary replacement after the original cathedral was damaged in the earthquakes."
    ],
    "options": ["Christchurch", "Dunedin", "Wellington", "Queenstown"]
}
,{
    "city": "Hamilton",
    "country": "New Zealand",
    "clues": [
        "I'm located in the Waikato region of the North Island.",
        "I'm situated along the banks of the Waikato River, New Zealand's longest river.",
        "I host the annual Balloons over Waikato festival, attracting hot air balloonists from around the world."
    ],
    "funFacts": [
        "Hamilton Gardens is a major attraction, featuring themed gardens from different cultures and historical periods.",
        "The city has a vibrant music scene, being the birthplace of several notable New Zealand bands.",
        "Hamilton Zoo is home to over 600 native and exotic animals, emphasizing conservation and education."
    ],
    "trivia": [
        "Hamilton was originally a military settlement established during the New Zealand Wars.",
        "The city has a youthful population, partly due to the presence of the University of Waikato.",
        "Hamilton's central location makes it a hub for exploring nearby attractions like Hobbiton and Waitomo Caves."
    ],
    "options": ["Hamilton", "Auckland", "Tauranga", "Rotorua"]
}
,{
    "city": "Brussels",
    "country": "Belgium",
    "clues": [
        "I'm the de facto capital of the European Union, hosting major institutions like the European Commission and the European Parliament.",
        "I'm known for my historic Grand Place, a UNESCO World Heritage Site.",
        "I feature a famous statue called Manneken Pis, a symbol of my city's irreverent humor."
    ],
    "funFacts": [
        "Brussels is renowned for its chocolate and hosts numerous chocolatiers offering exquisite pralines.",
        "The Atomium, a landmark building, represents an iron crystal magnified 165 billion times.",
        "The city has a rich tradition of comic strips, being the birthplace of 'The Adventures of Tintin.'"
    ],
    "trivia": [
        "Brussels is officially bilingual, with both French and Dutch as official languages.",
        "The city hosts the Ommegang, an annual historical procession recognized by UNESCO.",
        "Brussels' Meyboom tradition, celebrating the 'May tree,' dates back to 1308."
    ],
    "options": ["Brussels", "Antwerp", "Ghent", "Bruges"]
}
,{
    "city": "Vienna",
    "country": "Austria",
    "clues": [
        "I'm the capital and largest city of Austria, known for my imperial palaces.",
        "I was home to famous composers like Mozart and Beethoven.",
        "The historic center of my city is a UNESCO World Heritage Site."
    ],
    "funFacts": [
        "Vienna is often called the 'City of Music' due to its musical legacy.",
        "The city hosts over 450 balls annually, continuing a grand tradition.",
        "Vienna's coffee house culture is listed as an intangible cultural heritage by UNESCO."
    ],
    "trivia": [
        "Vienna's Schönbrunn Palace has 1,441 rooms and is a major tourist attraction.",
        "The city has consistently ranked high in global quality of life surveys.",
        "Vienna's Prater park features one of the world's oldest Ferris wheels, the Wiener Riesenrad."
    ],
    "options": ["Vienna", "Salzburg", "Graz", "Innsbruck"]
}
,{
    "city": "Melbourne",
    "country": "Australia",
    "clues": [
        "I'm the capital of Victoria and Australia's second-largest city.",
        "I'm renowned for my vibrant arts scene and numerous cultural festivals.",
        "My city is often referred to as the 'Sporting Capital of Australia.'"
    ],
    "funFacts": [
        "Melbourne's tram network is the largest urban tramway system in the world.",
        "The city hosts the Australian Open, the first Grand Slam tennis tournament of the year.",
        "Melbourne's laneways are famous for their street art and hidden cafes."
    ],
    "trivia": [
        "Melbourne was the capital of Australia from 1901 to 1927 before Canberra was established.",
        "The city experiences four seasons in one day due to its unpredictable weather.",
        "Melbourne's Royal Exhibition Building is one of the world's oldest remaining exhibition pavilions."
    ],
    "options": ["Melbourne", "Sydney", "Adelaide", "Brisbane"]
}
,{
    "city": "Brisbane",
    "country": "Australia",
    "clues": [
        "I'm the capital city of Queensland, known for my sunny weather.",
        "I host the annual Riverfire festival, featuring spectacular fireworks over the Brisbane River.",
        "My South Bank Parklands offer a man-made beach in the heart of the city."
    ],
    "funFacts": [
        "Brisbane's Story Bridge Adventure Climb offers panoramic views of the city.",
        "The city is a gateway to major tourist destinations like the Gold Coast and Sunshine Coast.",
        "Brisbane hosted the World Expo in 1988, boosting its international profile."
    ],
    "trivia": [
        "Brisbane is nicknamed 'BrisVegas' due to its vibrant nightlife.",
        "The city experiences a subtropical climate, with hot, humid summers and mild winters.",
        "Brisbane's Lone Pine Koala Sanctuary is the world's oldest and largest koala sanctuary."
    ],
    "options": ["Brisbane", "Perth", "Sydney", "Melbourne"]
}
,{
    "city": "Perth",
    "country": "Australia",
    "clues": [
        "I'm the capital city of Western Australia, known for my isolated location.",
        "I boast Kings Park, one of the world's largest inner-city parks.",
        "My city is closer to Jakarta than to Sydney."
    ],
    "funFacts": [
        "Perth enjoys more sunny days than any other Australian capital city.",
        "The city is home to the Swan Bells, a set of 18 bells ringing daily.",
        "Perth's Cottesloe Beach is famous for its clear waters and white sands."
    ],
    "trivia": [
        "Perth is one of the world's most isolated major cities.",
        "The city has a strong mining industry, contributing significantly to Australia's economy.",
        "Perth's population has a high proportion of British-born residents."
    ],
    "options": ["Perth", "Adelaide", "Brisbane", "Melbourne"]
}
,{
    "city": "Adelaide",
    "country": "Australia",
    "clues": [
        "I'm the capital city of South Australia, known for my festivals and food.",
        "I host the annual Adelaide Fringe, the world's second-largest arts festival.",
        "My city is surrounded by world-renowned wine regions like Barossa Valley."
    ],
    "funFacts": [
        "Adelaide is nicknamed the 'City of Churches' due to its many historic places of worship.",
        "The city was planned with wide boulevards and large public squares.",
        "Adelaide's Central Market is one of the largest fresh produce markets in the Southern Hemisphere."
    ],
    "trivia": [
        "Adelaide was the first Australian city to give women the right to vote.",
        "The city experiences a Mediterranean climate, with hot, dry summers and mild winters.",
        "Adelaide's coastline stretches over 70 kilometers, offering numerous pristine beaches."
    ],
    "options": ["Adelaide", "Perth", "Melbourne", "Sydney"]
}
,{
    "city": "Lagos",
    "country": "Nigeria",
    "clues": [
        "I'm the largest city in Nigeria and one of the fastest-growing cities in the world.",
        "I am known for my bustling ports and as a major financial center in Africa.",
        "I host the annual Lagos Carnival, a vibrant cultural festival."
    ],
    "funFacts": [
        "Lagos was the capital of Nigeria until 1991, when Abuja became the capital.",
        "The city is built on a series of islands and mainland areas connected by bridges.",
        "Lagos is often referred to as 'Eko' by locals, a name derived from its early settlers, the Awori people."
    ],
    "trivia": [
        "Lagos has one of the largest and busiest ports in Africa.",
        "The city is home to Nollywood, Nigeria's booming film industry, which is one of the largest in the world.",
        "Lagos' Lekki Conservation Centre is one of the few urban nature reserves in Nigeria."
    ],
    "options": ["Lagos", "Abuja", "Kano", "Ibadan"]
}
,{
    "city": "Nairobi",
    "country": "Kenya",
    "clues": [
        "I'm the capital and largest city of Kenya, known as the 'Green City in the Sun.'",
        "I am the only city in the world with a national park within my boundaries.",
        "I host the United Nations Environment Programme headquarters."
    ],
    "funFacts": [
        "Nairobi was founded in 1899 as a railway depot on the Uganda Railway.",
        "The city's name comes from the Maasai phrase 'Enkare Nairobi,' meaning 'cool water.'",
        "Nairobi is a major hub for business and culture in East Africa."
    ],
    "trivia": [
        "The Nairobi National Park is home to endangered black rhinos, lions, and giraffes.",
        "The city has a vibrant music scene, with genres like Benga and Genge originating here.",
        "Nairobi's Karura Forest offers urban hiking trails and is a popular recreational spot."
    ],
    "options": ["Nairobi", "Mombasa", "Kisumu", "Nakuru"]
}
,{
    "city": "Johannesburg",
    "country": "South Africa",
    "clues": [
        "I'm the largest city in South Africa and a major economic hub.",
        "I am often referred to as 'Egoli,' meaning 'City of Gold,' due to my gold mining history.",
        "I host the Apartheid Museum, which chronicles South Africa's journey to democracy."
    ],
    "funFacts": [
        "Johannesburg is one of the world's largest urban forests, with over 10 million trees.",
        "The city was established in 1886 following the discovery of gold.",
        "Johannesburg's Soweto township was home to Nelson Mandela and Desmond Tutu."
    ],
    "trivia": [
        "The city has no major river or lake, relying on man-made dams for water.",
        "Johannesburg's OR Tambo International Airport is the busiest in Africa.",
        "The city experiences frequent thunderstorms in the summer, earning the nickname 'The Lightning Capital.'"
    ],
    "options": ["Johannesburg", "Cape Town", "Durban", "Pretoria"]
},
{
    "city": "Addis Ababa",
    "country": "Ethiopia",
    "clues": [
        "I'm the capital and largest city of Ethiopia, often called the 'Political Capital of Africa' due to my diplomatic significance.",
        "I am home to the African Union headquarters.",
        "I host the National Museum of Ethiopia, where the fossilized remains of 'Lucy' are displayed."
    ],
    "funFacts": [
        "Addis Ababa means 'New Flower' in Amharic, the official language of Ethiopia.",
        "The city is situated at an elevation of 2,355 meters (7,726 feet), making it one of the highest capitals in the world.",
        "Addis Ababa hosts the largest open-air market in Africa, known as Merkato."
    ],
    "trivia": [
        "The city experiences a mild climate year-round, often referred to as 'Eternal Spring.'",
        "Addis Ababa University, established in 1950, is the oldest university in Ethiopia.",
        "The city is known for its vibrant coffee culture, with Ethiopia being the birthplace of coffee."
    ],
    "options": ["Addis Ababa", "Mekelle", "Gondar", "Dire Dawa"]
},{
    "city": "Tehran",
    "country": "Iran",
    "clues": [
        "I'm the capital and largest city of Iran, located at the foot of the Alborz mountain range.",
        "I am known for my vibrant bazaars, such as the Grand Bazaar, and historic sites like the Golestan Palace.",
        "My city has a diverse climate, with cold winters and hot summers."
    ],
    "funFacts": [
        "Tehran's Milad Tower is one of the tallest towers in the world, standing at 435 meters.",
        "The city has a rich cultural scene, with numerous museums, art galleries, and theaters.",
        "Tehran's name is believed to mean 'warm slope,' referring to its geographical location."
    ],
    "trivia": [
        "The city experiences frequent earthquakes due to its location on several fault lines.",
        "Tehran's metro system is one of the busiest in the Middle East, serving millions of passengers daily.",
        "The city has been the capital of Iran since 1796, during the Qajar dynasty."
    ],
    "options": ["Tehran", "Mashhad", "Isfahan", "Shiraz"]
}
,{
    "city": "Baghdad",
    "country": "Iraq",
    "clues": [
        "I'm the capital and largest city of Iraq, situated along the Tigris River.",
        "Founded in the 8th century, I was once the center of the Islamic Golden Age.",
        "My city has faced significant challenges in recent decades but remains a cultural hub."
    ],
    "funFacts": [
        "Baghdad was designed in a circular layout, earning it the nickname 'Round City.'",
        "The House of Wisdom, an ancient center of learning, was located here.",
        "Despite conflicts, Baghdad continues to be a symbol of resilience and cultural richness."
    ],
    "trivia": [
        "The city's name is believed to derive from Middle Persian, meaning 'God's gift.'",
        "Baghdad's population is estimated to be over 7 million, making it one of the largest cities in the Arab world.",
        "The city has a hot desert climate, with extremely hot summers and mild winters."
    ],
    "options": ["Baghdad", "Basra", "Mosul", "Erbil"]
}
,{
    "city": "Riyadh",
    "country": "Saudi Arabia",
    "clues": [
        "I'm the capital and largest city of Saudi Arabia, located in the heart of the Arabian Peninsula.",
        "I am known for my modern skyscrapers, such as the Kingdom Centre and Al Faisaliyah Center.",
        "My city has undergone rapid development, transforming from a small desert town to a major metropolis."
    ],
    "funFacts": [
        "Riyadh means 'gardens' in Arabic, reflecting the city's historical lushness.",
        "The city hosts the annual Riyadh Season, a cultural and entertainment festival attracting millions.",
        "Riyadh's population has grown from 150,000 in the 1960s to over 7 million today."
    ],
    "trivia": [
        "The city experiences extreme temperatures, with scorching summers and mild winters.",
        "Riyadh is divided into 15 municipal districts, each with its own unique character.",
        "The city is a major financial hub, housing the headquarters of numerous banks and corporations."
    ],
    "options": ["Riyadh", "Jeddah", "Mecca", "Medina"]
}
,{
    "city": "Beirut",
    "country": "Lebanon",
    "clues": [
        "I'm the capital and largest city of Lebanon, located on the Mediterranean coast.",
        "Known as the 'Paris of the Middle East,' I have a rich history and vibrant cultural scene.",
        "My city has been rebuilt multiple times due to its tumultuous past but remains resilient."
    ],
    "funFacts": [
        "Beirut is one of the oldest continuously inhabited cities in the world, with a history spanning over 5,000 years.",
        "The city is known for its diverse architecture, blending Ottoman, French colonial, and modern styles.",
        "Beirut's nightlife is renowned, with numerous bars, clubs, and restaurants offering a lively atmosphere."
    ],
    "trivia": [
        "The city has been destroyed and rebuilt seven times, earning it the nickname 'Phoenix.'",
        "Beirut is home to the American University of Beirut, one of the leading institutions in the region.",
        "The city experiences a Mediterranean climate, with mild, rainy winters and hot, dry summers."
    ],
    "options": ["Beirut", "Tripoli", "Sidon", "Byblos"]
},{
    "city": "Saint Petersburg",
    "country": "Russia",
    "clues": [
        "Known as the 'Cultural Capital of Russia,' I was founded by Tsar Peter the Great in 1703.",
        "Home to the Hermitage Museum, one of the largest and oldest art museums in the world.",
        "The city is renowned for its network of canals and baroque architecture."
    ],
    "funFacts": [
        "Saint Petersburg served as the capital of Russia for over 200 years before the government moved to Moscow.",
        "The city experiences the 'White Nights' phenomenon during summer, with nearly 24 hours of daylight.",
        "Saint Petersburg's historic center is a UNESCO World Heritage Site."
    ],
    "trivia": [
        "The city was formerly known as Petrograd and later Leningrad.",
        "Saint Petersburg hosts the annual 'Scarlet Sails' celebration, marking the end of the school year.",
        "The city's metro stations are among the deepest in the world."
    ],
    "options": ["Saint Petersburg", "Moscow", "Kazan", "Sochi"]
}
,{
    "city": "Novosibirsk",
    "country": "Russia",
    "clues": [
        "As the largest city in Siberia, I'm often referred to as the 'Capital of Siberia.'",
        "Home to the Novosibirsk Opera and Ballet Theatre, the largest of its kind in Russia.",
        "The city is a major hub for science and education, hosting numerous research institutions."
    ],
    "funFacts": [
        "Novosibirsk is the third-largest city in Russia, following Moscow and Saint Petersburg.",
        "The Trans-Siberian Railway passes through the city, contributing to its rapid growth.",
        "Despite its size, Novosibirsk is relatively young, founded in 1893."
    ],
    "trivia": [
        "The city experiences a continental climate, with cold winters and warm summers.",
        "Novosibirsk Zoo is one of the largest in Russia, housing over 11,000 animals.",
        "The Ob River flows through the city, providing scenic views and recreational opportunities."
    ],
    "options": ["Novosibirsk", "Omsk", "Yekaterinburg", "Vladivostok"]
}
,{
    "city": "Yekaterinburg",
    "country": "Russia",
    "clues": [
        "Located on the eastern side of the Ural Mountains, I'm considered the gateway between Europe and Asia.",
        "Known as the city where the last Russian Tsar, Nicholas II, and his family were executed.",
        "The city has a vibrant cultural scene, with numerous theaters, museums, and music venues."
    ],
    "funFacts": [
        "Yekaterinburg is Russia's fourth-largest city, with a population exceeding 1.4 million.",
        "The city played a significant role during the industrialization of Russia, becoming a major industrial hub.",
        "Yekaterinburg's Vysotsky skyscraper offers panoramic views of the city and surrounding areas."
    ],
    "trivia": [
        "The city was named after Catherine I, the wife of Peter the Great.",
        "Yekaterinburg served as a key military supply center during World War II.",
        "The Europe-Asia border monument is located near the city, symbolizing its transcontinental position."
    ],
    "options": ["Yekaterinburg", "Chelyabinsk", "Perm", "Ufa"]
}
,{
    "city": "Nizhny Novgorod",
    "country": "Russia",
    "clues": [
        "Situated at the confluence of the Volga and Oka rivers, I'm a major economic and cultural center.",
        "Home to the Nizhny Novgorod Kremlin, a historic fortress offering panoramic city views.",
        "The city is known for its well-preserved historic architecture and vibrant arts scene."
    ],
    "funFacts": [
        "Nizhny Novgorod was closed to foreigners during the Soviet era due to its military industry.",
        "The city hosts the annual 'Gorky Fest,' an international film festival named after the writer Maxim Gorky.",
        "Nizhny Novgorod's cable car connects the city to the town of Bor, offering scenic views over the Volga River."
    ],
    "trivia": [
        "The city was formerly known as Gorky, in honor of the writer Maxim Gorky.",
        "Nizhny Novgorod is a major center for the IT industry in Russia.",
        "The city has a rich tradition in trade and commerce, dating back to the 19th century."
    ],
    "options": ["Nizhny Novgorod", "Kazan", "Samara", "Rostov-on-Don"]
}
,



];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await Destination.deleteMany({});
    console.log("Cleared existing destinations");

    await Destination.insertMany(destinations);
    console.log(`Seeded ${destinations.length} destinations`);

    // Get and print all cities
    const allCities = await Destination.find({}, { city: 1, _id: 0 });
    console.log("All seeded cities:");
    allCities.forEach((destination) => console.log(destination.city));

    await mongoose.disconnect();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
