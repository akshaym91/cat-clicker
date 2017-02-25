var Cat = function(cat) {
    this.clickCount = ko.observable(0);
    this.name = ko.observable(cat.name);
    this.imgSrc = ko.observable(cat.image);
    this.catlevel = ko.computed(function() {
        var level;
        if (this.clickCount() < 10) {
            level = 'Beginner';
        } else if (this.clickCount() >=10 && this.clickCount() < 20) {
            level = 'Midlevel';
        } else if (this.clickCount() >=20 && this.clickCount() < 30) {
            level = 'Professional';
        } else {
            level = 'Cult';
        }
        return level;
    }, this);
};

var ViewModel = function() {
    var self = this;
    this.catlist = ko.observableArray([]);

    cats.forEach(function(cat){
        self.catlist.push(new Cat(cat));
    });

    this.currentCat = ko.observable(self.catlist()[0]);

    this.incrementCounter = function() {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    this.setCat = function(cat) {
        self.currentCat(cat);
    };
};

ko.applyBindings(new ViewModel());