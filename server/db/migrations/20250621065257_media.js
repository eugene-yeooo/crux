/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('media', (table) => {
    table.increments('id').primary()

    table
      .integer('log_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('logs')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    table.string('type').notNullable() // 'photo' or 'video'
    table.string('url').notNullable()
    table.text('caption')
    table.integer('position') // for ordering media items
    table.string('thumbnail_url') // optional, for images or videos
    table.integer('file_size')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('media')
}
