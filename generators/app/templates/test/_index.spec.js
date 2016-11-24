const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const add = require('../lib/index');

lab.experiment('math', () => {
  lab.test('returns true when 1 + 1 equals 2', (done) => {
    Code.expect(add(1, 1)).to.equal(2);
    done();
  });
});
