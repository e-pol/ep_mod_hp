/**
 * Created by 123 on 25.05.2016.
 * main.view.js
 * Main module view
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
  'ep_mod_hp/views/projects.view',
  'ep_mod_hp/views/project_detailed.view',
  'text!ep_mod_hp/templates/main.template.html'
  ], function ( Backbone, ProjectsView, ProjectDetailedView, mainTemplate ) {
  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var
    configMap = {
      container : {
        projectsView        : '#ep-mod-hp-projects',
        projectDetailedView : '#ep-mod-hp-project-detailed'
      }
    },

    MainView;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  MainView = Backbone.View.extend({

    classId : 'EP_MOD_HP_MAIN_VIEW',

    template : _.template( mainTemplate ),

    initialize : function() {
      this.$el.addClass('container');

      this.render();

      this.projectsView = new ProjectsView({
        el : this.$( configMap.container.projectsView )
      });

      this.listenTo( this.projectsView, 'requestDetailedProject',
        this.onDetailedProjectRequest );
    },

    render : function () {
      this.$el.html( this.template );
    },

    onDetailedProjectRequest : function ( data ) {

      this.projectsView.$el.hide();

      console.log( '(' + this.classId + ') Project id = | ' + data
        + ' | requested' );

      this.projectDetailedView = new ProjectDetailedView({
        el        : this.$( configMap.container.projectDetailedView ),
        project_data : {
          project_id : data
        }
      });
    }

  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------

  // Return view constructor
  return MainView;

});