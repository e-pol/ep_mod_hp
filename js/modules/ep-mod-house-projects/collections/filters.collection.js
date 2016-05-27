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
    // Purpose   : instantiate and add filter model to collection
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
          this.add( new FilterSimpleModel( filter_data ) );
          break;

        case 'min_max' :
          this.add( new FilterMinMaxModel( filter_data ) );
          break;
      }
    }
    // End Collection method /addFilter/
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return collection constructor
  return FiltersCollection;

});
