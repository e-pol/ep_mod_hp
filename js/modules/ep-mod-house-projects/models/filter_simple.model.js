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
  'backbone',
  'ep_mod_hp/models/abstract.model'
], function ( Backbone, AbstractModel ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var FilterSimpleModel;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  FilterSimpleModel = AbstractModel.extend({
    classId : 'EP_MOD_HP_FILTER_SIMPLE_MODEL',

    initialize : function () {
      this.setFilterKeyName();
      this.setFilterValueNames();
      this.set({ set_values : [] });
    },

    validate : function () {

    },

    setFilter : function ( value_map ) {
      var
        value_pos,
        value        = value_map.value,
        value_is_set = value_map.is_set,
        set_values   = this.get( 'set_values' );

      if ( value_is_set ) {
        if ( set_values.indexOf( value ) < 0 ) {
          set_values.push( value );
          this.set( { set_values : set_values } );
          this.trigger( 'changeFilter' );
          return true;
        }
        return false;
      }

      value_pos = set_values.indexOf( value );

      if ( value_pos >= 0) {
        set_values.splice( value_pos, 1 );
        this.set( { set_values : set_values } );
        this.trigger( 'changeFilter' );
        return true;
      }
      return false;

    },

    resetFilter : function () {
      this.set( { set_values : [] } );
    },

    getFilterState : function () {
      var filter_state_map = {};
    }

  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return model constructor
  return FilterSimpleModel;

});
