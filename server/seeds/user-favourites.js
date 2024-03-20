/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const userData = [
  {
    id: 1,
    email: "bethcan@email.com",
    password: "pass",
    first_name: "Beth",
    last_name: "Can",
    avatar: "http://localhost:8080/avatars/avatar1.png",
    date_created: "1710898351488",
    date_updated: "1710898351488",

  },
];

const favoutitesData = [
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
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert(userData)
  await knex('favoutites').del()
  await knex('favoutites').insert(favoutitesData)
};
