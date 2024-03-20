/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//npx knex migrate:latest
//npx knex seed:run
exports.up = function(knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary;
    table.string("first_name").notNullable;
    table.string("last_name").notNullable;
    table.string("email").notNullable;
    table.string("password").notNullable;
    table.string("avatar").notNullable;
    table.string("firt_name").notNullable;
    table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  })
  .createTable("favourites", (table) => {
    table.increments("id").primary;
    table
        .foreign("user_id")
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    table
        .foreign("design_id")
        .references("id")
        .inTable("design")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("favourites").dropTable("user");
};
