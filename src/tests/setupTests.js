/**
 * @doc http://airbnb.io/enzyme/docs/installation/react-16.html
 */

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({
	adapter: new Adapter()
})