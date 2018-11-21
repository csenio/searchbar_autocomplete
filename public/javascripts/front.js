$('.searchbar').bind("change paste keyup", function () {
    search($(this).val());
});


function search(input) {
    if (input) {
        axios({
            method: 'POST',
            url: '/query',
            data: {
                input
            }
        }).then((result) => {
            // debugger
            var results = []
            for (let i = 0; i < 10; i++) {
                if (result.data.data[i]) results.push(result.data.data[i].title)
            }
            $('.searchresults').children("li").remove();
            results.forEach((el) => {
                if (el) $('.searchresults').append(`<li class='suggestion'>${el}</li>`);
            })

            $('.one').text(results[0])

            $('.suggestion').click(function () {
                console.log(this.innerHTML)
                $('.searchbar').val(this.innerHTML)
            });
        });
    }else{
        $('.searchresults').children("li").remove();
    }


}

