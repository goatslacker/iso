import Iso from '../src/iso';

describe('#iso.render()', () => {
  
  var iso;
  var markup;
  var html;
  var component;

  beforeEach(() => {
    iso = new Iso();
    component = '<html class="___iso-html___"><head></head><body></body></html>';
    iso.add(component, {name: 'isomorphic'});
    html = iso.render();
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

  it("should retain the correct checksum", (done) => {
    Iso.bootstrap((state, container) => {
      expect(html).to.equal(container);
      done();
    });
  });

  it("should bootstrap", (done) => {
    Iso.bootstrap((state, node) => {
      expect(state).to.exist;
      expect(node).to.exist;
      done();
    });
  });

  xit("should add ___iso-html___ class to root element", (done) => {
    Iso.bootstrap((state, node) => {
      var node = document.querySelector('.___iso-html___');
      expect(node.id).to.equal('root-markup');
      done();
    });
  });

  xit("should add ___iso-state___ within the root element", (done) => {
    Iso.bootstrap((state, node) => {
      var node = document.querySelector('.___iso-html___');
      var stateNode = node.querySelector('.___iso-state___');
      expect(stateNode).to.be.ok;
      done();
    });
  });

  xit("should contain json within script tag", (done) => {
    Iso.bootstrap((state, node) => {
      var el = document.querySelector('.___iso-state___');
      expect(el.tagName).to.equal('SCRIPT');
      expect(JSON.parse(el.innerHTML).name).to.equal('isomorphic');
      done();
    });
  });

});