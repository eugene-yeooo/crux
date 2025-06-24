/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('log_caves', (table) => {
    table
      .integer('log_id')
      .unsigned()
      .notNullable()
      .primary()
      .references('id')
      .inTable('logs')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.string('team')
    table.integer('duration')
    table.text('tech_style').notNullable().defaultTo('[]')
    table.string('route_style')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('log_caves')
}
