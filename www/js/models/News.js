define([
], function(){

    var News = Backbone.Model.extend({

        events: {

        },

        initialize: function () {
            this.createBlogSearch();
        },

        createBlogSearch : function () {
            var blogSearch;

            var searchComplete = function () {
                // Check that we got results
                if (blogSearch.results && blogSearch.results.length > 0) {
                    this.set('blogSearch', blogSearch);
                }
            };
            // Create a BlogSearch instance.
            blogSearch = new google.search.BlogSearch();

            // Set searchComplete as the callback function when a search is complete.  The
            // blogSearch object will have results in it.
            blogSearch.setSearchCompleteCallback(this, searchComplete, null);

            // Specify search quer(ies)
            blogSearch.execute('Namecoin');

//            // Include the required Google branding
//            google.search.Search.getBranding('branding');
        }



    });

    return News;
});




