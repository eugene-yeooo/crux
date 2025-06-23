export async function seed(knex) {
  // Clear tables
  await knex('logs').del()

// Insert log entry
  await knex('logs').insert({
    user_id: 1,
    type: 'cave',
    objectiveName: 'Brewster Glacier',
    title: null,
    notes: 'Epic ice cave. Cool sleeping spot inside the ice. Found a hiker with a broken leg - organised Search & Rescue.',
    location: 'Mt Aspiring National Park',
    date: '2024-05-04',
    created_at: new Date(),
    updated_at: new Date(),
  })
}