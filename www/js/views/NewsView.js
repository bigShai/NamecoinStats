define([
], function(){

    var NewsView = Backbone.View.extend({

        events: {

        },

        initialize: function () {
            this.listenTo(this.model, 'change:blogSearch', this.blogSearchChanged);
            this.listItemTemplate = Handlebars.compile($('.news-list-item-template').html());
        },

        blogSearchChanged: function () {
            var thisView = this;
            var results = this.model.get('blogSearch').results;

            results =_.sortBy(results, function(res){ return Date.parse(res.publishedDate)  });
            results = results.reverse();

            _.each(results, function(result){
                result.titleNoFormatting = $('<div/>').html(result.titleNoFormatting).html();
                result.content = $('<div/>').html(result.content).text();
                result.publishedDate = new Date(result.publishedDate).toDateString();
                thisView.$('.news-content-list').append(thisView.listItemTemplate(result));
            });
            this.$('.news-content-wrapper').trigger( "create" );
        }



    });

    return NewsView;
});




