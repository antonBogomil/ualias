import Store from "./index";
import rootStore from 'store'


// function add(a, b) {
//   return a + b
// }

describe('Teams Data', function () {
  it('should create Teams with initial data', function () {
	const store = new Store(rootStore)
	expect(store).toBe(true)
  });
});
