/**
 * Created by 123 on 25.05.2016.
 * filters.collection.js
 * Collection of filters models
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
  'ep_mod_hp/models/filter_simple.model',
  'ep_mod_hp/models/filter_min_max.model'
], function ( Backbone, FilterSimpleModel, FilterMinMaxModel ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var FiltersCollection;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  FiltersCollection = Backbone.Collection.extend({
    classId : 'EP_MOD_HP_FILTERS_COLLECTION',

    initialize : function( models, init_data ) {
      this.addFilters( init_data.filter_list );
    },

    // Begin Collection method /addFilters/
    //
    // Example   : collection.addFilters( <JSON> )
    // Purpose   : populates collection with models created from JSON
    // Arguments :
    //   * filter_list - array with filters data (JSON)
    // Action    :
    //   * iterate through the list of filters
    //     and add each of them to collection
    // Return    : none
    // Throws    : none
    //
    addFilters : function ( filter_list ) {
      filter_list.forEach( function( filter_data ) {
        this.addFilter( filter_data );
      }, this );
    },
    // End Collection method /addFilters/

    // Begin Collection method /addFilter/
    //
    // Example   : collection.addFilter( <JSON> )
    // Purpose   : add different types of filters to collection
    // Arguments :
    //   * filter_data - filter data (JSON)
    // Action    :
    //   * create new filter model from JSON
    //   * add model to collection
    // Return    : none
    // Throws    : none
    //
    addFilter : function ( filter_data ) {
      switch ( filter_data.filter_type ) {
        case 'simple'  :
          this.addSimpleFilter( filter_data );
          break;

        case 'min_max' :
          this.addMinMaxFilter( filter_data );
          break;
      }
    },
    // End Collection method /addFilter/

    // Begin Collection method /addSimpleFilter/
    //
    // Example   : collection.addSimpleFilter( <JSON> )
    // Purpose   : instantiate and add simple filter model to collection
    // Arguments :
    //   * filter_data - filter data (JSON)
    // Action    :
    //   * create new filter model from JSON
    //   * begin listen event 'onFilterValueChange'
    //   * add model to collection
    // Return    : none
    // Throws    : none
    //
    addSimpleFilter : function ( filter_data ) {
      var filterModel = new FilterSimpleModel( filter_data );
      this.listenTo( filterModel, 'changeFilter', this.onChangeFilter );
      this.add( filterModel );
    },
    // End Collection method /addSimpleFilter/

    // Begin Collection method /addMinMaxFilter/
    //
    // Example   : collection.addMinMaxFilter( <JSON> )
    // Purpose   : instantiate and add min max filter model to collection
    // Arguments :
    //   * filter_data - filter data (JSON)
    // Action    :
    //   * create new filter model from JSON
    //   * begin listen event 'onFilterValueChange'
    //   * add model to collection
    // Return    : none
    // Throws    : none
    //
    addMinMaxFilter : function ( filter_data ) {
      var filterModel = new FilterMinMaxModel( filter_data );
      this.listenTo( filterModel, 'changeFilter', this.onChangeFilter );
      this.add( filterModel );
    },
    // End Collection method /addMinMaxFilter/

    // Begin Collection method /onChangeFilter/
    //
    // Example   : collection.onChangeFilter()
    // Purpose   : trigger event, requesting estimate filtered project models
    // Arguments : none
    // Action    :
    //   * trigger event 'requestFilteredEstimate' on self
    // Return    : none
    // Throws    : none
    //
    onChangeFilter : function () {
      this.trigger( 'requestFilteredEstimate' );
    },
    // End Collection method /onChangeFilter/

    // Begin Collection method /setFilteredEstimate/
    //
    // Example   : collection.setFilteredEstimate()
    // Purpose   : set estimate filtered projects number and inform this change
    // Arguments : projects_list - artray of filtered projects
    // Action    :
    //   * set filtered_estimate_number to number of filtered projects
    //   * trigger event 'changeFilteredEstimate' on self with a value of
    //     filtered_estimate_number
    // Return    : none
    // Throws    : none
    //
    setFilteredEstimate : function ( projects_list ) {
      this.filtered_estimate_number = projects_list.length;
      this.trigger( 'changeFilteredEstimate', this.filtered_estimate_number );
    },
    // End Collection method /setFilteredEstimate/
    
    applyFilters : function () {
      this.trigger( 'applyFilters' );
    },

    resetFilters : function () {
      this.each( function ( filter_model ) {
        filter_model.resetFilter();
      });
      this.trigger('resetFilters');
    },

    // Begin Collection method /getFiltersState/
    //
    // Example   : collection.getFiltersStateJSON()
    // Purpose   : makes filter state map from collection filter models
    // Arguments : none
    // Action    :
    //   * create new filter map (empty object)
    //   * get each model in collection
    //     ** create filter id ( <key>--<filter_type> )
    //     ** add filter state map
    //   * return filters map
    // Return    : filters_state_map {Obj}
    // Throws    : none
    //
    getFiltersStateJSON : function () {
      var
        filters_state_map = {},
        filter_id;

      this.each( function ( filter_model ) {

        if ( filter_model.get( 'set_values' ) === undefined
          || filter_model.get( 'set_values' ).length === 0 ) {
          return;
        }

        filter_id = filter_model.get( 'key' );
        filter_id += '--';
        filter_id += filter_model.get( 'filter_type' ) ;

        filters_state_map[ filter_id ] = filter_model.get( 'set_values' );
      } );

      return filters_state_map;
    }
    // End Collection method /getFiltersState/
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return collection constructor
  return FiltersCollection;

});
