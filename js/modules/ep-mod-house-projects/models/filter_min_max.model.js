/**
 * Created by 123 on 25.05.2016.
 * filter_min_max.model.js
 * Min_max filter model
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
  'ep_mod_hp/models/abstract.model'
], function ( Backbone, AbstractModel ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var FilterMinMaxModel;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  FilterMinMaxModel = AbstractModel.extend({
    classId : 'EP_MOD_HP_FILTER_MIN_MAX_MODEL',
    
    initialize : function () {

    }
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return model constructor
  return FilterMinMaxModel;

});
