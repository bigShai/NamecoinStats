define([
    'models/Global',
    'models/News',
    'views/NewsView',
    'models/Calc',
    'views/CalcView',
    'views/SettingsView'
], function(Global, News, NewsView, Calc, CalcView, SettingsView){

    var MainView = Backbone.View.extend({

        events: {
            'click .footer ul li a' : 'panelItemClicked',
            'click #left-panel a' : 'panelItemClicked'
        },

        initialize: function () {
            this.bigTickerTemplate = Handlebars.compile(this.$('.ticker-content').html());

            this.model = new Global({});
            this.listenTo(this.model, 'change', this.render);

            this.fetchTicker('usd');
            this.fetchTicker('btc');
//            gaPlugin = window.plugins.gaPlugin;
//            gaPlugin.init(function() {}, function() {}, "", 10);

            var newsModel = new News({});

            new NewsView({
                el: this.$('.news-content'),
                model: newsModel
            });
        },

        fetchTicker: function (currency) {
            var thisView = this;
            var success = function(data) {
                data = $.parseJSON(data);
                thisView.prevLast = localStorage.getItem('last-'+currency);
                localStorage.setItem('last-'+currency, data.ticker.last);

                if (thisView.prevLast) {
                    data.percentage = ((data.ticker.last - thisView.prevLast) / thisView.prevLast)*100;
                    data.up = (data.percentage >= 0);
                    data.percentage = data.percentage.toFixed(2);
                }
                data.ticker.last = data.ticker.last.toFixed((currency=='usd')? 3 : 6);
                thisView.model.set(currency, data);
            };

            var btceurl = 'https://btc-e.com/api/2/nmc_'+currency+'/ticker';

            $.ajax({
                url: btceurl,
                type: "GET",
                cache: false,
                success: success
            });

        },

        render: function () {
            this.$('.content').html(this.bigTickerTemplate(this.model.toJSON()));
            return this;
        },

        panelItemClicked: function (e) {
            var itemName = $(e.target).attr('name');
            this.$('#left-panel').panel( "close" );
            this.$('.header-text').html($(e.target).html());

            switch (itemName){
                case 'panel-ticker':
                    this.$('.content').html(this.bigTickerTemplate(this.model.toJSON()));
                    break;
                case 'panel-news':
                    var template = Handlebars.compile(this.$('.news-content').html());
                    this.$('.content').html(template);
                    break;
                case 'panel-calc':
                    var template = Handlebars.compile(this.$('.calc-content').html());
                    this.$('.content').html(template);

                    new CalcView({
                        el: this.$('.content'),
                        model: this.model
                    });

                    break;
                case 'panel-settings':
                    var template = Handlebars.compile(this.$('.settings-content').html());
                    this.$('.content').html(template);

                    this.settingsView = new SettingsView({
                        el: this.$('.content')
                    });

                    break;
            }

        }



    });

    return MainView;
});




