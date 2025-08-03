/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('log_climbs', (table) => {
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
    table.string('send')
    table.string('route_style')
    table.integer('height')
    table.integer('pitches')
    table.integer('attempts')
    table.string('team')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('log_climbs')
}
