import Ember from 'ember';
import { test, module } from 'qunit';
import MenuEventHandlerMixin from '../../../mixins/menu-event-handler';
import MockMenu from '../../helpers/mock-menu';

var run = Ember.run;
var Subject, menu;

module('Unit - Menu Event Handler', {
  beforeEach: function() {
    menu = MockMenu.create();

    Subject = Ember.Object.extend(MenuEventHandlerMixin, {
      init: function() {
        this.set('menu', menu);
      },
      menuEvents: {
        fileOpen: Ember.K,
        fileSave: Ember.K
      }
    });
  },

  afterEach: function() {
    run(menu, 'destroy');
  }
});

test("should register menu event handlers on init", function(assert) {
  assert.expect(4);

  assert.equal(menu.has('fileOpen'), false, "has no subscription for fileOpen event");
  assert.equal(menu.has('fileSave'), false, "has no subscription for fileSave event");

  run(Subject, 'create');

  assert.ok(menu.has('fileOpen'), "has subscription for fileOpen event");
  assert.ok(menu.has('fileSave'), "has subscription for fileSave event");
});

test("should unregister menu event handlers on destroy", function(assert) {
  assert.expect(4);

  var subject;

  run(function() {
    subject = Subject.create();
  });

  assert.ok(menu.has('fileOpen'), "has subscription for fileOpen event");
  assert.ok(menu.has('fileSave'), "has subscription for fileSave event");

  run(subject, 'destroy');

  assert.equal(menu.has('fileOpen'), false, "has no subscription for fileOpen event");
  assert.equal(menu.has('fileSave'), false, "has no subscription for fileSave event");
});
