export async function up(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('auth0_id').unique().nullable()
    table.dropColumn('password_hash')
    table.dropColumn('email')
    table.dropColumn('name')
  })
}

export async function down(knex) {
  
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('auth0_id')
  })
  await knex.schema.alterTable('users', (table) => {
    table.string('password_hash').notNullable()
    table.string('email').notNullable().unique()
    table.string('name').notNullable()
  })
}
