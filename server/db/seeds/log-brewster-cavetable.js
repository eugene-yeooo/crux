export async function seed(knex) {
  
  const log = await knex('logs')
  .select('id')
  .where({ objective: 'Brewster Glacier', date: '2024-05-04' })
  .first()

  // Clear tables
  await knex('log_caves').del()


  // Insert cave log details
  await knex('log_caves').insert({
    log_id: log.id,
    team: 'Anna Petersen, Drew Fuller, Aaron Madigan',
    duration: 10,
    'tech_style': JSON.stringify(['Ice Cave']),
    'route_style': 'In/Out',
  })
}