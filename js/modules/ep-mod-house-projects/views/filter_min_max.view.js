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

    // Begin View method /setEvents/
    //
    // Example   : view.setEvents()
    // Purpose   : setup event handling
    // Arguments : none
    // Action    :
    //   * make event hash map
    //   * delegate event handlers
    // Return    : none
    // Throws    : none
    //
    setEvents : function () {
      var events_hash = {},
        event_selector;

      event_selector = 'keypress ' + this.ui.minVal;
      events_hash[ event_selector ] = 'onKeypressMin';

      event_selector = 'keypress ' + this.ui.maxVal;
      events_hash[ event_selector ] = 'onKeypressMax';

      this.delegateEvents( events_hash );
    },
    // End View method /setEvents/

    // Begin View method /setSlider/
    //
    // Example   : view.setSlider()
    // Purpose   : create jquery_ui slider
    // Arguments : none
    // Action    : create and setup slider
    // Return    : none
    // Throws    : none
    //
    setSlider : function () {
      var self = this;

      this.$slider = this.$( this.ui.slider ).slider( {
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
    // End View method /seSlider/

    // Begin View method /onKeypressMin/
    //
    // Example   : view.onKeypressMin( event )
    // Purpose   : handle 'keypress' event for minimum value elem
    // Arguments : event object
    // Action    :
    //   * if pressed 'enter' in input area
    //     ** prevent default action
    //     ** get min value
    //     ** update slider state ( its min value )
    //     ** make elem loose focus
    // Return    : none
    // Throws    : none
    //
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
    // End View method /onKeypressMax/

    // Begin View method /onKeypressMax/
    //
    // Example   : view.onKeypressMax( event )
    // Purpose   : handle 'keypress' event for maximum value elem
    // Arguments : event object
    // Action    :
    //   * if pressed 'enter' in input area
    //     ** prevent default action
    //     ** get max value
    //     ** update slider state ( its max value )
    //     ** make elem loose focus
    // Return    : none
    // Throws    : none
    //
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
    // End View method /onKeypressMax/

    // Begin View method /onChangeSlider/
    //
    // Example   : view.onChangeSlider()
    // Purpose   : handle 'change' event for slider
    // Arguments : none
    // Action    :
    //   * set filter model min and max values with present values from ui elems
    // Return    : none
    // Throws    : none
    //
    onChangeSlider : function () {
      this.model.setFilter({
        min : this.$( this.ui.minVal).val(),
        max : this.$( this.ui.maxVal).val()
      });
    },
    // End View method /onChangeSlider/

    // Begin View method /onSlideSlider/
    //
    // Example   : view.onSlideSlider()
    // Purpose   : handle 'slide' event for slider
    // Arguments : none
    // Action    :
    //   * get min and max values from slider
    //   * update ui min and max values
    // Return    : none
    // Throws    : none
    //
    onSlideSlider : function () {
      var min, max;

      min = this.$slider.slider( 'option', 'values' )[0];
      max = this.$slider.slider( 'option', 'values' )[1];

      this.$( this.ui.minVal ).val( min );
      this.$( this.ui.maxVal ).val( max );
    }
    // End View method /onSlideSlider/
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return view constructor
  return FilterSimpleView;

});
