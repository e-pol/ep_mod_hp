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

      this.addProjects( init_data.projects_data.project_list );

      this.filtersCollection
        = new FiltersCollection( null, init_data.filters_data );
    },

    // Begin Collection method /addProjects/
    //
    // Example   : collection.addProjects( <JSON> )
    // Purpose   : populates collection with models created from JSON
    // Arguments :
    //   * project_list - array with projects data (JSON)
    // Action    :
    //   * iterate through the list of projects
    //     and add each of them to collection
    // Return    : none
    // Throws    : none
    //
    addProjects : function ( project_list ) {
      project_list.forEach( function( project_data ) {
        this.addProject( project_data );
      }, this );
    },
    // End Collection method /addProjects/

    // Begin Collection method /addProject/
    //
    // Example   : collection.addProjects( <JSON> )
    // Purpose   : instantiate and add project model to collection
    // Arguments :
    //   * project_data - project data (JSON)
    // Action    :
    //   * create ne model from JSON
    //   * add model to collection
    // Return    : none
    // Throws    : none
    //
    addProject : function( project_data ) {
      this.add( new ProjectBriefModel( project_data ) );
    },
    // End Collection method /addProject/

    // Begin Collection method /sortByKey/
    //
    // Example   : collection.sortByKey( 'key', 'asc' )
    // Purpose   : sort collection by key in asc/desc order
    // Arguments :
    //   * key   - model key
    //   * order - could be 'asc' or 'desc'
    // Action    :
    //   * set collection comparator
    //     ** get model_a and model_b key values
    //     ** set boolean is_asc true/false depending on requested order
    //     ** return -1 / 0 / 1 depending on key values and order
    //   * sort collection with revised comparator
    // Return    : none
    // Throws    : none
    //
    sortByKey : function ( key, order ) {

      this.comparator = function ( model_a, model_b ) {
        var val_a, val_b, is_asc;
        val_a = model_a.get( key );
        val_b = model_b.get( key );

        is_asc = ( order === 'asc' );

        if ( val_a > val_b ) {
          return  is_asc ? 1 : -1 ;
        }
        else if ( val_a < val_b ) {
          return is_asc ? -1 : 1 ;
        }
        else {
          return 0;
        }
      };

      this.sort();
    }
    // End Collection method /sortByKey/

  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return collection constructor
  return ProjectsBriefCollection;

});
