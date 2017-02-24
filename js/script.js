var ViewModel = function() {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
};

ko.applyBindings(new ViewModel());

var model = {
    clicked: [0, 0, 0, 0, 0, 0],
    init: function() {
        this.clicked = [0, 0, 0, 0, 0, 0];
    },
    increment: function(index) {
        this.clicked[index]++;
    },
    getClicks: function(index) {
        return this.clicked[index];
    }
};
var list_view = {
    init: function() {
        $.ajax({
            url: 'mock-data.json',
            success: function(result) {
                $.each(result.cats, function(index, cat) {
                    $('<a/>', {
                        'id': 'cat' + (index),
                        'class': 'list-group-item',
                        'html': cat.name,
                        'onclick': 'octopus.onNameClick(id)'
                    }).appendTo('#cat-list');
                });
            }
        }).error(function(e) {
            console.log(e);
        });
    }
};
var canvas_view = {
    init: function() {
        $('.cat').remove();
        $('.counter').remove();
    },
    display: function(index) {
        $('<img/>', {
            'id': 'cat' + index + '-img',
            'class': 'cat',
            'src': 'img/cat' + index + '.jpg',
            'onclick': 'octopus.onCatClick(id)'
        }).appendTo('#cat-canvas').fadeIn();
        $('.cat-name').text('Cat '+ index);
        $('.click-counter').text(octopus.getMyClicks(index));
    },
    update: function(index) {
        $('.click-counter').text(octopus.getMyClicks(index));
    }
};
var octopus = {
    onCatClick: function(catid) {
        var catname = catid.split('-')[0];
        var catindex = parseInt(catname.split('')[catname.length - 1]);
        model.increment(catindex);
        canvas_view.update(catindex);
    },
    onNameClick: function(catid) {
        var catindex = parseInt(catid.split('')[catid.length - 1]);
        canvas_view.init();
        canvas_view.display(catindex);
    },
    getMyClicks: function(index) {
        // debugger;
        return model.getClicks(index);
    }
};

$(document).ready(function() {
    canvas_view.init();
    list_view.init();
});
