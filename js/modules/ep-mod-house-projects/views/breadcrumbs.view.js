/**
 * Created by 123 on 20.06.2016.
 * breadcrumbs.view.js
 * Module breadcrumbs view
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
  'text!ep_mod_hp/templates/breadcrumbs.template.html'
], function ( Backbone, breadcrumbsTemplate ) {
  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var
    init_data = {
      path : [
        {
          name : 'projects',
          text : 'проекты'
        },
        {
          name : 'project/16001',
          text : 'ПБ-16.001'
        }
      ]
    },

    BreadcrumbsView;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // -------------------------- BEGIN VIEW CONSTRUCTOR ----------------------

  BreadcrumbsView = Backbone.View.extend({
    template : _.template( breadcrumbsTemplate ),

    events : {
      'click ul a' : 'onClick'
    },

    initialize : function ( init_data ) {
      var path_map = init_data.data
          || { path : [ { name : 'projects', text : 'проекты' } ] };

      this.render( path_map );
    },

    render : function ( path_map ) {
      this.$el.html( this.template( path_map ) );
      return this;
    },

    onClick : function( event ) {
      event.preventDefault();
      this.trigger( $( event.target ).attr( 'href' ).slice(1) );
    },

    setPath : function ( path_map ) {
      this.render( path_map );
    }

  });

  // --------------------------- END VIEW CONSTRUCTOR -----------------------


  // return view constructor
  return BreadcrumbsView;

});
