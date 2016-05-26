/**
 * Created by 123 on 25.05.2016.
 * filters.view.js
 * Projects collection filter view
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
  'text!ep_mod_hp/templates/filters.template.html'
  ], function ( Backbone, filtersTemplate ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var FiltersView;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  FiltersView = Backbone.View.extend({
    classId : 'EP_MOD_HP_FILTERS_VIEW',

    template : _.template( filtersTemplate ),

    initialize : function () {
      this.render();

      // ------------ BEGIN DEVELOP ONLY -------------
      console.log( this.classId + ' initiated...' );
      // ------------- END DEVELOP ONLY --------------
    },

    render : function () {
      this.$el.html( this.template );
      return this;
    }
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return view constructor
  return FiltersView;

});
