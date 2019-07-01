$(document).ready(function() {
    let content = [{
            img: 'nas-life-is-good.jpg'
        },
        {
            img: 'nas-illmatic.jpg'
        },
        {
            img: 'nas-it-was-written.jpg'
        },
        {
            img: 'nas-hip-hop-is-dead.jpg'
        },
        {
            img: 'nas-the-lost-tapes.jpg'
        },
        {
            img: 'nas-street-disciple.jpg'
        },
        {
            img: 'nas-distant-relatives.jpg'
        },
        {
            img: 'nas-stillmatic.jpg'
        },
        {
            img: 'nas-gods-son.jpg'
        },
        {
            img: 'nas-untitled.jpg'
        },
        {
            img: 'nas-i-am.jpg'
        },
        {
            img: 'nas-nastradamus.jpg'
        },
        {
            img: 'nas-nasir.jpg'
        },
        {
            img: 'nas-the-firm.jpg'
        }
    ];

    function MainViewModel() {
        let _this = this;
        let pair = 2;
        _this.tiles = ko.observableArray();
        _this.activeTiles = ko.computed(function() {
            return $.grep(_this.tiles(), function(t) {
                return t.active()
            })
        });
        _this.disabled = ko.computed(function() {
            return _this.activeTiles().length >= pair;
        });

        _this.flipTile = function(tile) {
            if (_this.disabled() || tile.solved()) return;
            tile.flip();
            if (_this.disabled()) {
                let win = $.grep(_this.activeTiles(), function(t) {
                    return t.id == _this.activeTiles()[0].id;
                }).length === pair;

                if (win) {
                    $.each(_this.activeTiles(), function(i, t) {
                        t.solved(true);
                    });
                } else {
                    setTimeout(function() {
                        $.each(_this.activeTiles(), function(i, t) {
                            t.closed(true);
                        });
                    }, 1000);
                }
            }
        }

        this.initGame = function() {
            let t = [];
            for (let i = 0; i < content.length; i++) {
                for (let j = 0; j < pair; j++) {
                    t.push(new Tile(i, content[i].img));
                }
            }
            t.sort(function() {
                return 0.5 - Math.random()
            });
            _this.tiles(t);
        }

        _this.initGame();

    }

    function Tile(id, img) {
        let _this = this;
        _this.id = id;
        _this.img = 'assets/' + img;
        _this.closed = ko.observable(true);
        _this.solved = ko.observable(false);
        _this.active = ko.computed(function() {
            return _this.closed() === false && _this.solved() === false
        });
        _this.flip = function() {
            _this.closed(!_this.closed());
        }
    }

    ko.applyBindings(new MainViewModel());
})