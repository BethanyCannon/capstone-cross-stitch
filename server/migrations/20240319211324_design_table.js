/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("design", (table) => {
    table.increments("id").primary();
    table
        .foreign("favourite_id")
        .references("id")
        .inTable("favourite")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    table.integer("thread_count").notNullable();
    table.integer("height_size").notNullable();
    table.integer("height_width").notNullable();
    table.string("description");
    table.string("design_name");
    table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  })
  .createTable("creator", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  }).createTable("images", (table) => {
    table.increments("id").primary();
    table
        .foreign("design_id")
        .references("id")
        .inTable("design")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    table.string("image_url").notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("images").dropTable("creator").dropTable("design");
};
