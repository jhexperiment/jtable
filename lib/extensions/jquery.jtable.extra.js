(function($) {
  $.extend(true, $.hik.jtable.prototype, {
    options: {
      toolbarsearch: false,
      toolbaradvancedsearch: false
    },
    _createToolBar: function () {
      this._$toolbarDiv = $('<div />')
      .addClass('jtable-toolbar')
      .appendTo(this._$titleDiv);

      for (var i = 0; i < this.options.toolbar.items.length; i++) {
        this._addToolBarItem(this.options.toolbar.items[i]);
      }
      
      if (this.options.toolbarsearch) {
        this._addToolBarSearch();
        
        
      }
      
      
    },
    /* Adds a new item to the toolbar.
     *************************************************************************/
    _addToolBarSearch: function() {
      var sHtml = 
        '<span id="filter_results" class="input-group" style="height:28px;">' +
          '<input name="query" id="query" type="text" class="form-control"/>' +
          '<button type="submit" id="load_records" class="btn btn-xs">Search</button>' +
        '</span>';
        if (this.options.toolbaradvancedsearch) {
          sHtml +=
        '<span id="advanced_search">' +
          '<a href="#">Advanced Search<a>' +
          '<table style="display:none;">' +
            '<tr>' +
              '<th>Column</th>' + 
              '<th>Operator</th>' +
              '<th>Value</th>' +
            '</tr>';
          $.each(this.options.fields, function() {
            sHtml += 
            '<tr>' +
              '<td>' + this.title + '</td>' +
              '<td>' + 
                '<select>' +
                  '<option value="eq">=</option>' +
                  '<option value="like">LIKE</option>' + 
                '</select>' +
              '</td>' +
              '<td>' + 
                '<input type="text">' +
              '</td>' +
            '</tr>';
          });
            
          sHtml +=      
          '</table>'
        '</span>';
        }
      var $toolBarItem = $(sHtml).addClass('jtable-toolbar-item').prependTo(this._$toolbarDiv);

      //this._jqueryuiThemeAddClass($toolBarItem, 'ui-widget ui-state-default ui-corner-all', 'ui-state-hover');

      //click event
      $toolBarItem.find("input#query").keypress(function(oEvent) {
        if (14 == oEvent.keyCode || 13 == oEvent.keyCode) {
          $(this).next().trigger('click');
        }
      });
      $toolBarItem.find("button").click(function() {
        var sQuery = $(this).prev().val();
        if ('' == sQuery) {
          $(this).parents('.jtable-main-container').parent().jtable('load');
        }
        $(this).parents('.jtable-main-container').parent().jtable('load', {'query': sQuery});
      });
      
      return $toolBarItem;
    },
    _addToolBarAdvancedSearch: function() {
      var sHtml = 
        '<span id="advanced_search">' +
          '<label>Advanced Search<label>' +
          '<div style="display:none;">';
      $.each(this.options.fields, function() {
        sHtml += 
            '';
      });
          
      sHtml +=      
          '</div>'
        '</span>';
      var $toolBarItem = $(sHtml).addClass('jtable-toolbar-item').prependTo(this._$toolbarDiv);

      //this._jqueryuiThemeAddClass($toolBarItem, 'ui-widget ui-state-default ui-corner-all', 'ui-state-hover');

      //click event
      $toolBarItem.find("input#query").keypress(function(oEvent) {
        if (14 == oEvent.keyCode || 13 == oEvent.keyCode) {
          $(this).next().trigger('click');
        }
      });
      $toolBarItem.find("button").click(function() {
        var sQuery = $(this).prev().val();
        if ('' == sQuery) {
          $(this).parents('.jtable-main-container').parent().jtable('load');
        }
        $(this).parents('.jtable-main-container').parent().jtable('load', {'query': sQuery});
      });
      
      return $toolBarItem;
    },
    _addToolBarWithSelected: function() {
      var sHtml = 
        '<span id="with_selected" style="height:28px;">' +
          '<label class="jtable-toolbar-item-text">With selected:</label>'
          '<select>' +
            '<option>Update</option>' + 
            '<option>Delete</option>' + 
          '</select>' +
        '</span>';
      var $toolBarItem = $(sHtml).addClass('jtable-toolbar-item').prependTo(this._$toolbarDiv);

      //this._jqueryuiThemeAddClass($toolBarItem, 'ui-widget ui-state-default ui-corner-all', 'ui-state-hover');

      //click event
      $toolBarItem.find("button").click(function() {
        var sQuery = $(this).prev().val();
        if ('' == sQuery) {
          return false;
        }
        $(this).parents('.jtable-main-container').parent().jtable('load', {'query': sQuery});
      });
      
      return $toolBarItem;
    }


  });

})(jQuery);