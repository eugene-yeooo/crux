/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('log_canyons', (table) => {
    table
      .integer('log_id')
      .unsigned()
      .notNullable()
      .primary()
      .references('id')
      .inTable('logs')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.string('grade')
    table.integer('pitches')
    table.string('team')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('log_canyons')
}
