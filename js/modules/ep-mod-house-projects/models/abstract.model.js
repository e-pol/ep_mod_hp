/**
 * Created by 123 on 27.05.2016.
 * abstract.model.js
 * Abstract model class
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
  'json!ep_mod_hp/config/language.json'
], function ( Backbone, lang ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var
    configMap = {
      allowed_key_list : [
        'area', 'floors', 'type', 'tech'
      ],
      changeable_key_list : [
        'type', 'tech'
      ]
    },

    stateMap = {
      lang : 'ru'
    },

    AbstractModel;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  AbstractModel = Backbone.Model.extend({
    classId : 'EP_MOD_HP_ABSTRACT_MODEL',

    initialize : function () {
      throw new Error( '(' + this.classId + ') Could not initialize abstract class' );
    },

    setFilterKeyName : function () {
      var key = this.get( 'key' );
      this.set({ key_name : lang[ stateMap.lang ].key_name[ key ] });
    },

    setFilterValueNames : function () {
      var key_name, changeable_key_list, prev_value_list, rev_value_list;

      changeable_key_list = configMap.changeable_key_list;
      key_name = this.get( 'key' );

      if ( changeable_key_list.indexOf( key_name ) < 0 ) {
        this.set({ value_names : this.get( 'values' ) });
        return;
      }

      prev_value_list = this.get( 'values' );
      rev_value_list = [];

      prev_value_list.forEach( function ( prev_value ) {
        var rev_value = lang[ stateMap.lang ].value_name[ prev_value ];
        rev_value_list.push( rev_value );
      }, this );

      this.set({ value_names : rev_value_list });
    },

    setValueNames : function () {
      var value_name = lang[ stateMap.lang ].value_name;
      this.set({ value_name : value_name });
    }
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return model constructor
  return AbstractModel;

});
