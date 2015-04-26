import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import MockMenu from '../../helpers/mock-menu';

var run = Ember.run;
var menu;

moduleForComponent('input-file-open', 'Unit - Input File Open Component', {
  beforeEach: function() {
    menu = MockMenu.create();
  },

  afterEach: function() {
    run(menu, 'destroy');
  }
});

test("should open a file dialog when the 'File > Open' menu is selected", function(assert) {
  assert.expect(1);

  var component = this.subject({ menu: menu });
  var openFileDialog = sinon.stub(component, 'openFileDialog');

  this.render();
  run(menu, 'trigger', 'fileOpen');
  assert.ok(openFileDialog.called, "the file dialog is open");

  openFileDialog.restore();
});

test("should trigger the primary action when the input is changed", function(assert) {
  assert.expect(1);

  var component = this.subject({
    menu: menu,
    action: 'open',
    targetObject: {
      open: Ember.K
    }
  });

  var action = sinon.stub(component.get('targetObject'), 'open');

  this.render();
  this.$().change();
  assert.ok(action.called, "action was called");

  action.restore();
});

test("should trigger the primary action when the 'File > New' menu is selected", function(assert) {
  assert.expect(1);

  var component = this.subject({
    menu: menu,
    action: 'open',
    targetObject: {
      open: Ember.K
    }
  });

  var action = sinon.stub(component.get('targetObject'), 'open');

  run(menu, 'trigger', 'fileNew');
  assert.ok(action.called, "action was called");

  action.restore();
});
