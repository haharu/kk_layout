import {fetchFinanceIfNeeded} from '../src/app/actions/index'
import chai from 'chai'

import configureStore from '../src/app/store/configureStore'



describe('Actions', function() {
	describe('fetchFinance', function() {
		it('should be function', function() {
			chai.assert.isFunction(fetchFinanceIfNeeded);
		});
	});

});
