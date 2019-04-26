exports.getHour = function (timestamp, callback) {
    var hour = timestamp.toString().split('-')[1];
    callback(hour)
}
