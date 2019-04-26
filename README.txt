app.get('/createData',function (req, res) {
    function GetRandomNum(Min,Max)
    {
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }

    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 5; j++) {
            var temperature = GetRandomNum(1,30);
            var humidy = GetRandomNum(1,30);
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var hour = i;
            var minute = j*12;
            var timestamp = year+''+month+''+day+'-'+hour+'-'+minute;
            DB.insert("sensorData",{temperature:temperature,humidy:humidy,timestamp:timestamp,location:'102-2'},function (err) {
                if (err) {
                    console.log(err)
                }
            })
        }
    }
    res.send('insert successfully')

})