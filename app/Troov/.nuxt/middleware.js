const middleware = {}

middleware['is-auth'] = require('../middleware/is-auth.js')
middleware['is-auth'] = middleware['is-auth'].default || middleware['is-auth']

middleware['not-auth'] = require('../middleware/not-auth.js')
middleware['not-auth'] = middleware['not-auth'].default || middleware['not-auth']

export default middleware
