
export async function seed(knex) {
  // Clear tables
  await knex('media').del()

  const log = await knex('logs')
  .select('id')
  .where({ objective: 'Brewster Glacier', date: '2024-05-04' })
  .first()

  // Insert media
  await knex('media').insert([
    {
      'log_id': log.id,
      type: 'photo',
      url: '/uploads/brewster/DSC00607.avif',
      'thumbnail_url': null,
      'file_size': null,
      caption: 'Anna dropping in',
      position: 1,
      created_at: new Date(),
    },
    {
      'log_id': log.id,
      type: 'photo',
      url: '/uploads/brewster/DSC00187.avif',
      'thumbnail_url': null,
      'file_size': null,
      caption: 'The main chamber',
      position: 2,
      created_at: new Date(),
    },
    {
      'log_id': log.id,
      type: 'photo',
      url: '/uploads/brewster/DSC00926.avif',
      'thumbnail_url': null,
      'file_size': null,
      caption: 'Drew climbing back out the moulin',
      position: 3,
      created_at: new Date(),
    },
    {
      'log_id': log.id,
      type: 'video',
      url: '/uploads/brewster/heli-rescue.mp4',
      'thumbnail_url': null,
      'file_size': null,
      caption: 'Air-lifting hiker with broken leg',
      position: 4,
      created_at: new Date(),
    },
    {
      'log_id': log.id,
      type: 'video',
      url: '/uploads/brewster/camp.mp4',
      'thumbnail_url': null,
      'file_size': null,
      caption: 'Bed for the night',
      position: 5,
      created_at: new Date(),
    },
    {
      'log_id': log.id,
      type: 'video',
      url: '/uploads/brewster/moulin.mp4',
      'thumbnail_url': null,
      'file_size': null,
      caption: null,
      position: 6,
      created_at: new Date(),
    },
    {
      'log_id': log.id,
      type: 'photo',
      url: '/uploads/brewster/DSC00804.avif',
      'thumbnail_url': null,
      'file_size': null,
      caption: null,
      position: 7,
      created_at: new Date(),
    },
  ])
}
