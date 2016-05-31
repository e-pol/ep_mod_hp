/**
 * Created by 123 on 25.05.2016.
 * filter_simple.view.js
 * Simple filter view
 */

/*jslint
 browser : true,   continue : true,    devel : true,     indent   : 2,
 maxerr  : 50,     newcap   : true,    nomen : true,     plusplus : true,
 regexp  : true,   sloppy   : true,    vars : false,     white    : true
 */

/*global
 define
 */

define([
  'jquery',
  'jquery_ui',
  'underscore',
  'backbone',
  'text!ep_mod_hp/templates/filter_min_max.template.html'
], function (  $, jQuery_ui, _, Backbone, filterMinMaxTemplate ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var FilterSimpleView;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  FilterSimpleView = Backbone.View.extend({
    classId : 'EP_MOD_HP_PROJECT_BRIEF_VIEW',

    tagName     : 'fieldset',
    className   : '',

    ui : {
      slider : '.ep-mod-hp-filter-min-max-slider',
      minVal : '.ep-mod-hp-filter-min-max-val-min',
      maxVal : '.ep-mod-hp-filter-min-max-val-max'
    },

    template : _.template( filterMinMaxTemplate ),

    initialize : function () {
      this.render();
      this.listenTo( this.model, 'resetFilter', this.render );
    },

    render : function () {
      this.$el.html( this.template( this.model.toJSON() ) );

      this.setEvents();
      this.setSlider();

      return this;
    },

    setEvents : function () {
      var events_hash = {},
        event_selector;

      event_selector = 'keypress ' + this.ui.minVal;
      events_hash[ event_selector ] = 'onKeypressMin';

      event_selector = 'keypress ' + this.ui.maxVal;
      events_hash[ event_selector ] = 'onKeypressMax';

      this.delegateEvents( events_hash );
    },

    setSlider : function () {
      var
        self = this;

      self.$slider = this.$( self.ui.slider ).slider( {
        range  : true,
        values : [ 0, 300 ],
        min    : 0,
        max    : 300,
        step   : 1,

        change : function () {
          self.onChangeSlider();
        },

        slide  : function () {
          self.onSlideSlider();
        }
      } );
    },

    onKeypressMin : function ( event ) {
      var $elem, value;

      if ( event.keyCode === 13 ) {
        event.preventDefault();
        $elem  = $( event.target );
        value =  $elem.val();
        this.$slider.slider( 'values', 0, value );
        $elem.blur();
      }
    },

    onKeypressMax : function ( event ) {
      var $elem, value;

      if ( event.keyCode === 13 ) {
        event.preventDefault();
        $elem  = $( event.target );
        value =  $elem.val();
        this.$slider.slider( 'values', 1, value );
        $elem.blur();
      }
    },

    onChangeSlider : function () {
      this.model.setFilter({
        min : this.$( this.ui.minVal).val(),
        max : this.$( this.ui.maxVal).val()
      });
    },

    onSlideSlider : function () {
      var min, max;

      min = this.$slider.slider( 'option', 'values' )[0];
      max = this.$slider.slider( 'option', 'values' )[1];

      this.$( this.ui.minVal ).val( min );
      this.$( this.ui.maxVal ).val( max );
    }
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return view constructor
  return FilterSimpleView;

});
