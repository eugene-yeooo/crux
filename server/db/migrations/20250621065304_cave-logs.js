/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('log-caves', (table) => {
    table
      .integer('log_id')
      .unsigned()
      .notNullable()
      .primary()
      .references('id')
      .inTable('logs')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.string('trip-companions')
    table.integer('duration')
    table.text('tech-style').notNullable().defaultTo('[]')
    table.string('route-style')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('log-caves')
}
