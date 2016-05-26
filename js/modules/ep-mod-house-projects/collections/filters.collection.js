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

      // ------------ BEGIN DEVELOP ONLY -------------
      new FilterSimpleModel();
      new FilterMinMaxModel();
      console.log( this.classId + ' initiated...' );
      // ------------- END DEVELOP ONLY --------------

    }
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return collection constructor
  return FiltersCollection;

});
