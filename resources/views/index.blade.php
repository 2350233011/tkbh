<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>上传</title>
</head>
<body>

<input type="file" id="upload" accept="">
<input type="hidden" id="csrf_token" name="_token" value="{{ csrf_token() }}">


<script type="text/javascript" src="home/js/jquery-1.12.4.min.js"></script>
<script type="text/javascript">
    $('#upload').on("change", function () {
        let pic = $(this)[0].files[0];
        let file = new FormData();
        file.append('excelfile', pic);

        $.ajax({
            data: file,
            url: "import",
            method: "post",
            header: {'content-type': 'application/x-www-form-urlencoded'},
            timeout: 30000,
            cache: false,
            async: false,
            contentType: false,
            processData: false,
            _token:$("#csrf_token").val(),
            success: function (res) {
                let data = JSON.parse(res)
                console.log(data)
            },
            fail: function (err) {
                console.log(err);
            }
        })


    });

</script>
</body>
</html>
