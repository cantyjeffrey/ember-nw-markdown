import Ember from 'ember';
import env from '../environment';
import MenuEventHandler from '../mixins/menu-event-handler';

var run = Ember.run;

export default Ember.Component.extend(MenuEventHandler, {
  tagName: 'input',
  attributeBindings: ['type', 'nwworkingdir'],

  type: 'file',

  nwworkingdir: Ember.computed(function() {
    return env.get('userHome');
  }),

  change: function() {
    var filePath = this.$().val();
    this.sendAction('action', filePath);
    this.$().val('');
  },

  openFileDialog: function() {
    run.scheduleOnce('afterRender', this, function() {
      this.$().click();
    });
  }
});