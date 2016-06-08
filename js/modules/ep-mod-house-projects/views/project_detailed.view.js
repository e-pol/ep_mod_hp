/**
 * Created by 123 on 01.06.2016.
 * project_detailed.view.js
 * Project detailed view
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
  'ep_mod_hp/models/project_detailed.model',
  'text!ep_mod_hp/templates/project_detailed.template.html',
  'json!ep_mod_hp/data/projects.json'
], function ( Backbone, ProjectDetailedModel,
              projectDetailedTemplate, projectsData ) {

  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var ProjectDetailedView;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // -------------------------- BEGIN VIEW CONSTRUCTOR ----------------------

  ProjectDetailedView = Backbone.View.extend({
    classId : 'EP_MOD_HP_PROJECT_DETAILED_VIEW',

    tagName   : 'div',

    template : _.template( projectDetailedTemplate ),

    ui : {},

    initialize : function ( init_data ) {
      this.setModel( init_data.project_data.project_id );
      this.$el.addClass( 'ep-mod-hp-project-detailed' );
    },

    render : function () {
      this.$el.html( this.template ( this.model.toJSON() ) );
      this.setImageViewer( this.$( '.ep-mod-hp-jquery-image-viewer' ) );
      return this;
    },

    setModel : function ( project_id ) {
      var
        self = this,
        project_brief_data, rev_project_full_data, project_full_data_path;

      project_brief_data = this.getProjectBriefData( project_id );

      rev_project_full_data = {
        id     : project_brief_data.id,
        path   : project_brief_data.path,
        title  : project_brief_data.title
      };

      project_full_data_path = 'json!ep_mod_hp/';
      project_full_data_path += rev_project_full_data.path;
      project_full_data_path += '/project_data.json';

      require([ project_full_data_path ], function ( project_full_data ) {
        var key;

        for ( key in project_full_data ) {
          if ( project_full_data.hasOwnProperty( key ) ) {
            rev_project_full_data[ key ] = project_full_data[ key ];
          }
        }

        self.model = new ProjectDetailedModel( rev_project_full_data );

        self.render();
      });
    },

    getProjectBriefData : function ( project_id ) {
      var project_list, project_brief_data;

      project_list = projectsData.project_list;

      project_list.forEach( function ( project_data ) {
        if ( project_data.id === project_id ) {
          project_brief_data = project_data;
        }
      } );

      return project_brief_data;
    },

    setImageViewer : function () {
      this.$( '.ep-mod-hp-image-viewer' ).imageViewer({
        img_paths : [
          {
            img       : 'js/modules/ep-mod-house-projects/data/projects/14009/img/project_pb-16_001.jpg',
            thumb_img : 'js/modules/ep-mod-house-projects/data/projects/14009/img/img001.jpg'
          },
          {
            img       : 'js/modules/ep-mod-house-projects/data/projects/14009/img/img002.jpg',
            thumb_img : 'js/modules/ep-mod-house-projects/data/projects/14009/img/img002.jpg'
          },
          {
            img       : 'js/modules/ep-mod-house-projects/data/projects/14009/img/img003.jpg',
            thumb_img : 'js/modules/ep-mod-house-projects/data/projects/14009/img/img003.jpg'
          }
        ]
      });
    },

    crossFade : function ( map ) {
      var
        $img     = map.$img,
        $current = map.$current;

      if ( $current ) {
        $current.stop().fadeOut( 'slow' );
      }

      $img.css({
        marginLeft : -$img.width() / 2,
        marginTop  : -$img.height() / 2
      });

      $img.stop().fadeTo( 'slow', 1 );
      $current = $img;
    },

    onClickImageViewThumb : function ( event ) {
      var
        target, src, request;

      alert('1');

      event.preventDefault();

      target  = event.target;
      src     = target.href;
      request = src;

      console.log( target );
    }

  });

  // -------------------------- END VIEW CONSTRUCTOR ------------------------


  // Return View constructor
  return ProjectDetailedView;

});
