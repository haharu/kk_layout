import chai from 'chai'
import rootReducer from '../src/app/reducers'

describe('Reducers', function() {
	it('must return a function to reduce actions', function() {
		chai.assert.isFunction(rootReducer);
		chai.assert.strictEqual(rootReducer.length, 1);
	})
})
