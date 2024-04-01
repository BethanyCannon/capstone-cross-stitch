/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//npx knex migrate:latest
//npx knex seed:run
exports.up = function(knex) {
  return knex.schema
  .createTable("user", (table) => {
    table.increments("id").primary;
    table.string("first_name").notNullable;
    table.string("last_name").notNullable;
    table.string("email").notNullable;
    table.string("password").notNullable;
    table.string("avatar");
    table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  })
  .createTable("creator", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
  .createTable("design", (table) => {
    table.increments("id").primary();
    table.string("design_name").notNullable();
    table.integer("thread_count");
    table.integer("height_size");
    table.integer("height_width");
    table.string("description");
    table
    .integer("creator_id")
    .unsigned()
    .references("creator.id")
    .onUpdate("CASCADE")
    .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
  })
  .createTable("images", (table) => {
    table.increments("id").primary();
    table.string("image_url").notNullable();
    table
        .integer("design_id")
        .unsigned()
        .references("design.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
  })
  .createTable("favourites", (table) => {
    table.increments("id").primary;
    table
        .integer('user_id')
        .unsigned()
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    table
        .integer('design_id')
        .unsigned()
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
    return knex.schema
    .dropTable("favourites")
    .dropTable("images")
    .dropTable("design")
    .dropTable("creator")
    .dropTable("user");
};
