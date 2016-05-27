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
  'ep_mod_hp/views/filter_simple.view',
  'ep_mod_hp/views/filter_min_max.view',
  'text!ep_mod_hp/templates/filters.template.html'
  ], function ( Backbone,
                FilterSimpleView, FilterMinMaxView,
                filtersTemplate ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var
    configMap = {
      container : {
        filters : '#ep-mod-hp-filters-container'
      }
    },

    FiltersView;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  FiltersView = Backbone.View.extend({
    classId : 'EP_MOD_HP_FILTERS_VIEW',

    template : _.template( filtersTemplate ),

    initialize : function () {
      this.render();
    },

    render : function () {
      this.$el.html( this.template );

      this.renderFilters();

      return this;
    },

    // Begin View method /renderProjects/
    //
    // Example   : view.renderFilters()
    // Purpose   : render all filters
    // Arguments : none
    // Action    : render each filter model of this view collection
    // Return    : none
    // Throws    : none
    //
    renderFilters : function () {
      this.collection.each( function( filter_model ) {
        this.renderFilter( filter_model );
      }, this );
    },
    // End View method /renderFilters/

    // Begin View method /renderFilter/
    //
    // Example   : view.renderFilter( <filter_model> )
    // Purpose   : render filter view
    // Arguments :
    //   * filter_model - Backbone filter model
    // Action    :
    //   * create new filter view with given model
    //   * append view to proper container
    // Return    : none
    // Throws    : none
    //
    renderFilter : function ( filter_model ) {
      var filterView, filter_type;

      filter_type = filter_model.get( 'filter_type' );

      switch ( filter_type ) {
        case "simple"  :
          filterView = new FilterSimpleView({
            model : filter_model
          });
          break;

        case "min_max" :
          filterView = new FilterMinMaxView({
            model : filter_model
          });
          break;
      }

      this.$( configMap.container.filters )
        .append( filterView.render().el );
    }
    // End View method /renderProject/
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return view constructor
  return FiltersView;

});
