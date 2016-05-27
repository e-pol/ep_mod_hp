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
  'backbone',
  'text!ep_mod_hp/templates/filter_simple.template.html'
], function ( Backbone, filterSimpleTemplate ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var FilterSimpleView;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  FilterSimpleView = Backbone.View.extend({
    classId : 'EP_MOD_HP_PROJECT_BRIEF_VIEW',

    tagName : 'fieldset',
    className : '',

    template : _.template( filterSimpleTemplate ),

    initialize : function () {
      this.render();
    },

    render : function () {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return view constructor
  return FilterSimpleView;

});
