/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// https://www.antiquepatternlibrary.org/html/warm/main.htm


// https://www.antiquepatternlibrary.org/pub/PDF/6-JA030PrisCross1.pdf
// https://www.antiquepatternlibrary.org/pub/PDF/DMCAlpha2.pdf
// https://www.antiquepatternlibrary.org/pub/PDF/DMCAlpha1.pdf
// https://www.antiquepatternlibrary.org/pub/PDF/6-JA044PrisCross2.pdf
// https://www.antiquepatternlibrary.org/pub/PDF/JSTapisserie.pdf
// https://www.antiquepatternlibrary.org/pub/PDF/ArteEDiletto.pdf
// https://www.antiquepatternlibrary.org/pub/PDF/DMCPointdeMarque5.pdf


//https://www.antiquepatternlibrary.org/pub/PDF/HKBerlinModerneStick.pdf
//https://www.antiquepatternlibrary.org/pub/PDF/DMCPdeCNou3redrawn.pdf
//https://www.antiquepatternlibrary.org/pub/PDF/FischbackSudslavischeOrnamente.pdf

const userData = [
  {
    id: 1,
    email: "bethcan@email.com",
    password: "$2a$10$c/mGZ3Opysa.2jFwYAnohO.fAUXBiBXMDCLkj84artv9T5s2NLn.e",
    first_name: "Beth",
    last_name: "Can",
    avatar: "avatar1.png",
  },
];

const creatorData =[
  {
    id: 1,
    first_name: "Jane",
    last_name: "Doe",
  },
  {
    id: 2,
    first_name: "John",
    last_name: "Smith",
  },
  {
    id: 3,
    first_name: "Antique",
    last_name: "Pattern Library",
  }
];

const designData =[
  {
    id: 1,
    design_name: "flower designs",
    creator_id: 1,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "beautiful flower designs  ",
  },
  {
    id: 2,
    design_name: "border grapes",
    creator_id: 2,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "grapes and flowers  ",
  },
  {
    id: 3,
    design_name: "plants",
    creator_id: 3,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "truely amazing  ",
  },
  {
    id: 4,
    design_name: "alphabet and flowers",
    creator_id: 3,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "inspiring  ",
  },
  {
    id: 5,
    design_name: "patterns",
    creator_id: 2,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "complex patterns  ",
  }, 
  {
    id: 6,
    design_name: "plant designs",
    creator_id: 1,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "Art Nouveau",
  },
  {
    id: 7,
    design_name: "borders",
    creator_id: 1,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "borders  ",
  },
  {
    id: 8,
    design_name: "alphabets",
    creator_id: 3,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "alphabets",
  },
  {
    id: 9,
    design_name: "designs",
    creator_id: 2,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "Art",
  },
  {
    id: 10,
    design_name: "chair cover",
    creator_id: 3,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "pattern for chairs  ",
  },
  {
    id: 11,
    design_name: "bird",
    creator_id: 2,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "bird  ",
  },
  {
    id: 12,
    design_name: "flowers",
    creator_id: 1,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "spring flowers  ",
  },
  {
    id: 13,
    design_name: "borders",
    creator_id: 1,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "colourful borders  ",
  },
  {
    id: 14,
    design_name: "bees",
    creator_id: 3,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "honey bees  ",
  },
  {
    id: 15,
    design_name: "birds",
    creator_id: 3,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "multiple bird patterns  ",
  },
  {
    id: 16,
    design_name: "fish",
    creator_id: 2,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "fishies  ",
  },
  {
    id: 17,
    design_name: "winter animals",
    creator_id: 2,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "winter animals  ",
  },
  {
    id: 18,
    design_name: "savannah animals",
    creator_id: 2,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "savannah mammals  ",
  },
  {
    id: 19,
    design_name: "northern animals",
    creator_id: 1,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "Canadian wildlief  ",
  },
  {
    id: 20,
    design_name: "birds",
    creator_id: 3,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "birds of prey  ",
  },
  {
    id: 21,
    design_name: "barnyard birds",
    creator_id: 1,
    thread_count: 5,
    height_size: 5,
    height_width: 5,
    description: "birds on the barn  ",
  },
];

const imageData =[
  {
    id: 1,
    design_id: 1,
    image_url: "http://localhost:8080/designs/design1.png"
  },
  {
    id: 2,
    design_id: 1,
    image_url: "http://localhost:8080/designs/design2.png"
  },
  {
    id: 3,
    design_id: 2,
    image_url: "http://localhost:8080/designs/design3.png"
  },
  {
    id: 4,
    design_id: 3,
    image_url: "http://localhost:8080/designs/design4.png"
  },
  {
    id: 5,
    design_id: 4,
    image_url: "http://localhost:8080/designs/design5.png"
  },
  {
    id: 6,
    design_id: 4,
    image_url: "http://localhost:8080/designs/design6.png"
  },
  {
    id: 7,
    design_id: 5,
    image_url: "http://localhost:8080/designs/design7.png"
  },
  {
    id: 8,
    design_id: 5,
    image_url: "http://localhost:8080/designs/design8.png"
  },
  {
    id: 9,
    design_id: 5,
    image_url: "http://localhost:8080/designs/design9.png"
  },
  {
    id: 10,
    design_id: 5,
    image_url: "http://localhost:8080/designs/design10.png"
  },
  {
    id: 11,
    design_id: 6,
    image_url: "http://localhost:8080/designs/design11.png"
  },
  {
    id: 12,
    design_id: 7,
    image_url: "http://localhost:8080/designs/design12.png"
  },
  {
    id: 13,
    design_id: 7,
    image_url: "http://localhost:8080/designs/design13.png"
  },
  {
    id: 14,
    design_id: 7,
    image_url: "http://localhost:8080/designs/design14.png"
  },
  {
    id: 15,
    design_id: 8,
    image_url: "http://localhost:8080/designs/design15.png"
  },
  {
    id: 16,
    design_id: 8,
    image_url: "http://localhost:8080/designs/design16.png"
  },
  {
    id: 17,
    design_id: 9,
    image_url: "http://localhost:8080/designs/design17.png"
  },
  {
    id: 18,
    design_id: 10,
    image_url: "http://localhost:8080/designs/design18.png"
  },
  {
    id: 19,
    design_id: 10,
    image_url: "http://localhost:8080/designs/design19.png"
  },
  {
    id: 20,
    design_id: 11,
    image_url: "http://localhost:8080/designs/design20.png"
  },
  {
    id: 21,
    design_id: 12,
    image_url: "http://localhost:8080/designs/design21.png"
  },
  {
    id: 22,
    design_id: 13,
    image_url: "http://localhost:8080/designs/design22.png"
  },
  {
    id: 23,
    design_id: 13,
    image_url: "http://localhost:8080/designs/design23.png"
  },
  {
    id: 24,
    design_id: 13,
    image_url: "http://localhost:8080/designs/design24.png"
  },
  {
    id: 25,
    design_id: 13,
    image_url: "http://localhost:8080/designs/design25.png"
  },
  {
    id: 26,
    design_id: 14,
    image_url: "http://localhost:8080/designs/design26.png"
  },
  {
    id: 27,
    design_id: 15,
    image_url: "http://localhost:8080/designs/design27.png"
  },
  {
    id: 28,
    design_id: 16,
    image_url: "http://localhost:8080/designs/design28.png"
  },
  {
    id: 29,
    design_id: 17,
    image_url: "http://localhost:8080/designs/design29.png"
  },
  {
    id: 30,
    design_id: 18,
    image_url: "http://localhost:8080/designs/design30.png"
  },
  {
    id: 31,
    design_id: 19,
    image_url: "http://localhost:8080/designs/design31.png"
  },
  {
    id: 32,
    design_id: 20,
    image_url: "http://localhost:8080/designs/design32.png"
  },
  {
    id: 33,
    design_id: 21,
    image_url: "http://localhost:8080/designs/design33.png"
  },
];

const favouritesData = [
  {
    id: 1,
    user_id: 1,
    design_id: 2,
  },
  {
    id: 2,
    user_id: 1,
    design_id: 3,
  },
  {
    id: 3,
    user_id: 1,
    design_id: 5,
  },
  {
    id: 4,
    user_id: 1,
    design_id: 7,
  },
  {
    id: 5,
    user_id: 1,
    design_id: 10,
  },
];

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('creator').del()
  await knex('design').del()
  await knex('images').del()
  await knex('favourites').del()
  await knex('user').insert(userData)
  await knex('creator').insert(creatorData)
  await knex('design').insert(designData)
  await knex('images').insert(imageData)
  await knex('favourites').insert(favouritesData)
};