import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import MockMenu from '../../helpers/mock-menu';

var run = Ember.run;
var menu;

moduleForComponent('input-file-save', 'Unit - Input File Save Component', {
  beforeEach: function() {
    menu = MockMenu.create();
  },

  afterEach: function() {
    run(menu, 'destroy');
  }
});

test("should open a file dialog when the 'File > Save' menu is selected, and saveAs is set", function(assert) {
  assert.expect(1);

  var component = this.subject({
    menu: menu,
    saveAs: true
  });

  var openFileDialog = sinon.stub(component, 'openFileDialog');

  this.render();
  run(menu, 'trigger', 'fileSave');
  assert.ok(openFileDialog.called, "the file dialog is open");

  openFileDialog.restore();
});

test("should trigger the primary action when the 'File > Save' menu is selected, and saveAs is not set", function(assert) {
  assert.expect(1);

  var component = this.subject({
    menu: menu,
    action: 'save',
    targetObject: {
      save: Ember.K
    }
  });

  var action = sinon.stub(component.get('targetObject'), 'save');

  run(menu, 'trigger', 'fileSave');
  assert.ok(action.called, "action was called");

  action.restore();
});
