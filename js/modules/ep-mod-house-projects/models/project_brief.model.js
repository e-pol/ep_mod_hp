/**
 * Created by 123 on 25.05.2016.
 * projects_brief.model.js
 * Project model with general data
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

  var
    stateMap = {
      lang : 'ru'
    },

    ProjectsBriefModel;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODULE CONSTRUCTORS ---------------------

  ProjectsBriefModel = AbstractModel.extend({
    classId    : 'EP_MOD_HP_PROJECT_BRIEF_MODEL',

    initialize : function () {
      /*this.setProjectKeyName();*/
      this.setValueNames();
    }

  });

  // ------------------------ END MODULE CONSTRUCTORS ----------------------


  // Return model constructor
  return ProjectsBriefModel;

});
