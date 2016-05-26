/**
 * Created by 123 on 25.05.2016.
 * projects_brief.collection.js
 * Collection of projects brief models
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
  'ep_mod_hp/collections/filters.collection',
  'ep_mod_hp/models/project_brief.model'
  ], function ( Backbone, FiltersCollection, ProjectBriefModel ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var ProjectsBriefCollection;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  ProjectsBriefCollection = Backbone.Collection.extend({
    classId : 'EP_MOD_HP_PROJECTS_BRIEF_COLLECTION',

    initialize : function ( models, init_data ) {

      this.filtersCollection
        = new FiltersCollection( null, init_data.filter_list );

      // ------------ BEGIN DEVELOP ONLY -------------
      new ProjectBriefModel();
      console.log( this.classId + ' initiated...' );
      // ------------- END DEVELOP ONLY --------------
      
    }
  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return collection constructor
  return ProjectsBriefCollection;

});
