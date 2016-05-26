/**
 * Created by 123 on 25.05.2016.
 * filter_simple.model.js
 * Simple filter model
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
  'backbone'
], function ( Backbone ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var FilterSimpleModel;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  FilterSimpleModel = Backbone.Model.extend({
    classId : 'EP_MOD_HP_FILTER_SIMPLE_MODEL',
    initialize : function () {

      // ------------ BEGIN DEVELOP ONLY -------------
      console.log( this.classId + ' initiated...' );
      // ------------- END DEVELOP ONLY --------------

    }
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return model constructor
  return FilterSimpleModel;

});
