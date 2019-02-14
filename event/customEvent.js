define(function (require) {
    'use strict';

    // deps
    var Postmonger = require('js/postmonger');

    // instance vars
    var connection = new Postmonger.Session();
    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('clickedNext', onClickedNext);

    $(window).ready(onRender);

    function onRender() {
        connection.trigger('ready');
        connection.trigger('requestTokens');
    }

    function initialize (data) {
        if (data) {
            payload = data;
        }
    }

    function onGetTokens (tokens) {
        if( tokens ) {
            $.each( tokens, function(key, value) {
                $('#token #data').append('<div><span class="key"></span>' + key + ': <span class="value">' + value + '</span></div>');
            });

            if( tokens.fuel2token ) {
                var env = tokens.stackKey === 'QA1S1' ? 'qa1' : 'qa3';
                $('#api-button').click( function() {
                    $.ajax({
                        url: 'https://www-' + env + '.exacttargetapis.com/platform/v1/endpoints?access_token=' + tokens.fuel2token,
                        dataType: 'json',
                        contentType: 'application/json',
                        method: 'GET',
                        success: function() {
                            console.log('success');
                        },
                        error: function() {
                            console.log('failure');
                        }
                    });
                });
                $('#api-button').show();
            }
        }
    }

    function onClickedNext () {
        connection.trigger('updateActivity', {});
    }
});
