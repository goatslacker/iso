import Iso from '../src/iso';
import {expect} from 'chai';

describe('#iso.render()', () => {
  
  var iso;
  var markup;
  var html;

  beforeEach(() => {
    iso = new Iso();
    iso.add('<html id="root-markup" class="iso-root" data-key><span><!--___iso-state___--></span></html>', {name: 'isomorphic'});
    html = iso.render();
    document.write(html);
  });

  it("should exist on instance", () => {
    expect(iso.render).to.exist;
  });

  it("should exist as static method", () => {
    expect(Iso.render).to.exist;
  });

  it("should return wrapped markup", () => {
    expect(html).to.be.a('string');
  });

  it("should bootstrap", (done) => {
    Iso.bootstrap((state, meta, node) => {
      expect(state).to.exist;
      expect(meta).to.exist;
      expect(node).to.exist;
      done();
    });
  });

  it("should not wrap the markup with ___iso-html___", (done) => {
    Iso.bootstrap((state, meta, node) => {
      var node = document.querySelector('.___iso-html___');
      var found = node.querySelector('#root-markup');
      expect(!!found).to.be.false;
      done();
    });
  });

  it("should add ___iso-html___ class to root element", (done) => {
    Iso.bootstrap((state, meta, node) => {
      var node = document.querySelector('.___iso-html___');
      expect(node.id).to.equal('root-markup');
      done();
    });
  });

  it("should add ___iso-state___ within the root element", () => {
    Iso.bootstrap((state, meta, node) => {
      var node = document.querySelector('.___iso-html___');
      var stateNode = node.querySelector('.___iso-state___');
      expect(stateNode).to.be.ok;
    });
  });

});