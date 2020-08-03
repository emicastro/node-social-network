const db = {
  user: [{ id: '1', name: 'Alan Turing' }]
}

async function list(table) {
  return db[table] || []
}

async function get(table, id) {
  let collection = await list(table)
  return collection.filter((item) => item.id === id)[0] || null
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = []
  }
  db[table].push(data)
  console.log(db)
}

async function query(table, q) {
  let col = await list(table)
  let keys = Object.keys(q)
  let key = keys[0]

  return col.filter((item) => item[key] === q[key])[0] || null
}

async function remove(table, id) {
  const indexToDelete = db[table].findIndex((item) => {
    item.id === id
  })
  if (indexToDelete === -1) {
    throw new Error('User not found')
  }
  db[table].splice(indexToDelete, 1)
  return id
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}
