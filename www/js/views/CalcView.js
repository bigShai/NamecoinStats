define([
], function(){

    var CalcView = Backbone.View.extend({

        events: {
            'keyup input#calc-usd': 'usdChanged',
            'keyup input#calc-nmc': 'nmcChanged',
            'keyup input#calc-btc': 'btcChanged'

        },

        initialize: function () {
            this.$('.calc-content-wrapper').trigger( "create" );
        },

        usdChanged: function (e) {
            var usdVal = $(e.target).val();
            var nmcVal = usdVal / this.model.get('usd').ticker.last;
            var btcVal = nmcVal * this.model.get('btc').ticker.last;

            this.$('#calc-nmc').val(nmcVal);
            this.$('#calc-btc').val(btcVal);
        },

        nmcChanged: function (e) {
            var nmcVal = $(e.target).val();
            var usdVal = nmcVal * this.model.get('usd').ticker.last;
            var btcVal = nmcVal * this.model.get('btc').ticker.last;

            this.$('#calc-usd').val(usdVal);
            this.$('#calc-btc').val(btcVal);

        },

        btcChanged: function (e) {
            var btcVal = $(e.target).val();
            var nmcVal = btcVal / this.model.get('btc').ticker.last;
            var usdVal = nmcVal * this.model.get('usd').ticker.last;

            this.$('#calc-usd').val(usdVal);
            this.$('#calc-nmc').val(nmcVal);

        }

    });

    return CalcView;
});




