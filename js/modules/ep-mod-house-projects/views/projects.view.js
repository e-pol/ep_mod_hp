/**
 * Created by 123 on 25.05.2016.
 * projects.view.js
 * Projects collection view
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
  'ep_mod_hp/views/filters.view',
  'ep_mod_hp/views/project_brief.view',
  'ep_mod_hp/collections/projects_brief.collection',
  'json!ep_mod_hp/data/projects.json',
  'json!ep_mod_hp/data/filters.json',
  'text!ep_mod_hp/templates/projects.template.html'
  ], function ( Backbone,
                FiltersView, ProjectBriefView,
                ProjectsBriefCollection,
                projectsData, filtersData,
                projectsTemplate ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var
    configMap = {
      container : {
        filtersView : '#ep-mod-hp-filters'
      }
    },

    ProjectsView;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  ProjectsView = Backbone.View.extend({
    classId : 'EP_MOD_HP_PROJECTS_VIEW',
    template : _.template( projectsTemplate ),

    initialize : function () {
      this.render();

      this.collection = new ProjectsBriefCollection( null, {
        projects_data : projectsData,
        filters_data  : filtersData
      } );

      this.filtersView = new FiltersView({
        el : this.$( configMap.container.filtersView ),
        collection : this.collection.filtersCollection
      });

      // ------------ BEGIN DEVELOP ONLY -------------
      console.log( this.classId + ' initiated...' );
      // ------------- END DEVELOP ONLY --------------

    },

    render : function () {
      this.$el.html( this.template );
      return this;
    }
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return view constructor
  return ProjectsView;

});
