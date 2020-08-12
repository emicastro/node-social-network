const { response } = require('express')
const { nanoid } = require('nanoid')
const { default: user } = require('../user')

const TABLE = 'post'

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  function list() {
    return store.list(TABLE)
  }

  function get(id) {
    return store.get(TABLE, id)
  }

  function upsert({ id = null, text, user }) {
    const post = {
      text: text,
      user: user
    }

    if (id) {
      post.id = id
    } else {
      post.id = nanoid()
    }

    return store.upsert(TABLE, post)
  }

  function remove(id) {
    store.remove(TABLE, id)
  }

  return { list, get, upsert, remove }
}
