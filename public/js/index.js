$(function () {
    $('body').on('click', '#off_1', function () {
        $('#radio_1').addClass('off');
    })

    $('body').on('click', '#on_1', function () {
        $('#radio_1').removeClass('off');
    });
    $('body').on('click', '#off_2', function () {
        $('#radio_2').addClass('off');
    })

    $('body').on('click', '#on_2', function () {
        $('#radio_2').removeClass('off');
    });
    $('body').on('click', '#off_3', function () {
        $('#radio_3').addClass('off');
    })

    $('body').on('click', '#on_3', function () {
        $('#radio_3').removeClass('off');
    });




});