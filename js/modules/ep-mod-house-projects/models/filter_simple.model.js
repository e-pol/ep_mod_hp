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

    setValue   : function ( value ) {
      var set_values = this.get( 'set_values' );

      if ( set_values.indexOf( value ) < 0 ) {
        set_values.push( value );
        this.set({ set_values : set_values });
        this.trigger( 'valueChange', value );
        return true;
      }
      return false;
    },

    unsetValue : function ( value ) {
      var
        set_values = this.get( 'set_values' ),
        value_pos;

      if ( set_values.indexOf( value ) < 0 ) {
        return false;
      }
      value_pos = set_values.indexOf( value );
      set_values.splice( value_pos, 1 );
      this.set({ set_values : set_values });
      this.trigger( 'valueChange', value );
      return true;
    },

    getFilterState : function () {
      var filter_state_map = {};
    }

  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return model constructor
  return FilterSimpleModel;

});
