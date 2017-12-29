(function($d, Eb) {
    function T(a, b) {
        function c() {}
        c.prototype = a;
        var d = new c,
            e;
        for (e in b) d[e] = b[e];
        b.toString !== Object.prototype.toString && (d.toString = b.toString);
        return d
    }

    function de(a) {
        return a instanceof Array ? function() {
            return v.iter(a)
        } : "function" == typeof a.iterator ? M(a, a.iterator) : a.iterator
    }

    function M(a, b) {
        if (null == b) return null;
        null == b.__id__ && (b.__id__ = ie++);
        var c;
        null == a.hx__closures__ ? a.hx__closures__ = {} : c = a.hx__closures__[b.__id__];
        null == c && (c = function() {
            return c.method.apply(c.scope, arguments)
        }, c.scope = a, c.method = b, a.hx__closures__[b.__id__] = c);
        return c
    }
    Eb.kha = Eb.kha || {};
    Eb.kha.input = Eb.kha.input || {};
    var m = {},
        x = function() {
            return G.__string_rec(this, "")
        },
        fa = function(a, b) {
            null == b && (b = 0);
            null == a && (a = 0);
            this.components = [];
            this.renderers = [];
            this.scrollFactorX = this.scrollFactorY = 1;
            this._x = this._y = this.localX = this.localY = 0;
            this.enabled = this.active = this.visible = !0;
            this.children = [];
            this.name = "";
            this.id = -1;
            this.id = ++fa.ID;
            this.set_x(a);
            this.set_y(b)
        };
    m["wyn.WynObject"] = fa;
    fa.__name__ = ["wyn", "WynObject"];
    fa.prototype = {
        id: null,
        name: null,
        screen: null,
        parent: null,
        children: null,
        enabled: null,
        active: null,
        visible: null,
        _x: null,
        _y: null,
        localX: null,
        localY: null,
        scrollFactorX: null,
        scrollFactorY: null,
        renderers: null,
        components: null,
        update: function() {
            if (this.active)
                for (var a = 0, b = this.components; a < b.length;) {
                    var c = b[a];
                    ++a;
                    c.update()
                }
        },
        destroy: function() {
            this.renderers = [];
            this.components = []
        },
        revive: function() {
            this.active = !0
        },
        kill: function() {
            this.active = !1
        },
        addComponent: function(a) {
            -1 == v.indexOf(this.components, a, 0) && (this.components.push(a), a.parent = this, a.init())
        },
        removeComponent: function(a) {
            v.remove(this.components, a)
        },
        getComponent: function(a) {
            for (var b = 0, c = this.components; b < c.length;) {
                var d = c[b];
                ++b;
                if (G.__instanceof(d, a)) return d
            }
            return null
        },
        getComponents: function(a) {
            for (var b = [], c = 0, d = this.components; c < d.length;) {
                var e = d[c];
                ++c;
                G.__instanceof(e, a) && b.push(e)
            }
            return b
        },
        addRenderer: function(a) {
            -1 == v.indexOf(this.renderers, a, 0) && this.renderers.push(a)
        },
        removeRenderer: function(a) {
            v.remove(this.renderers, a)
        },
        getPosition: function() {
            return new ca(this.get_x(), this.get_y())
        },
        setPosition: function(a, b) {
            this.set_x(a);
            this.set_y(b)
        },
        add: function(a) {
            a.parent = this;
            this.children.push(a)
        },
        remove: function(a) {
            a.parent = null;
            v.remove(this.children, a)
        },
        addTo: function(a) {
            this.parent = a;
            a.children.push(this)
        },
        get_x: function() {
            return null != this.screen ? this._x + (this.screen.scrollX - this.screen.shakeX) * this.scrollFactorX : this._x
        },
        get_y: function() {
            return null != this.screen ? this._y + (this.screen.scrollY - this.screen.shakeY) * this.scrollFactorY : this._y
        },
        set_x: function(a) {
            fa.delta = a - this._x;
            for (var b = 0, c = this.children; b < c.length;) {
                var d = c[b];
                ++b;
                d.set_x(d.get_x() + fa.delta)
            }
            this.localX = null != this.parent ? this._x - this.parent.get_x() : this._x;
            return this._x = a
        },
        set_y: function(a) {
            fa.delta = a - this._y;
            for (var b = 0, c = this.children; b < c.length;) {
                var d = c[b];
                ++b;
                d.set_y(d.get_y() + fa.delta)
            }
            this.localY = null != this.parent ? this._y - this.parent.get_y() : this._y;
            return this._y = a
        },
        __class__: fa,
        __properties__: {
            set_y: "set_y",
            get_y: "get_y",
            set_x: "set_x",
            get_x: "get_x"
        }
    };
    var ab = function(a, b) {
        this.actorHeight = this.groundZ = 0;
        fa.call(this, a, b);
        this.currZ = this.groundZ = this.localY;
        this.actorHeight = 10
    };
    m.Actor = ab;
    ab.__name__ = ["Actor"];
    ab.__super__ = fa;
    ab.prototype = T(fa.prototype, {
        shadow: null,
        spr_char: null,
        col_char: null,
        actorHeight: null,
        currZ: null,
        groundZ: null,
        update: function() {
            fa.prototype.update.call(this);
            null != this.shadow && (this.shadow.set_x(this.get_x()), this.shadow.set_y(this.get_y() + 40))
        },
        revive: function() {
            this.visible = this.active = !0
        },
        kill: function() {
            this.visible = this.active = !1;
            null != this.shadow && (this.shadow.kill(), this.shadow = null)
        },
        checkCollision: function(a) {
            if (!this.active || !this.enabled) return !1;
            var b = this.groundZ - this.currZ,
                c = a.groundZ - a.currZ,
                d = !1;
            return d = b < c ? c < b + this.actorHeight : b < c + a.actorHeight
        },
        __class__: ab
    });
    var ba = function() {};
    ba.onAdComplete = function() {};
    ba.setup = function() {};
    ba.toggleBannerAd = function(a) {};
    ba.toggleGameOverAd = function(a) {};
    ba.onResizeScreen = function() {
        ba.resizeBanner(ba.adGameoverWrapper, "top", 1.2);
        ba.resizeBanner(ba.adBannerWrapper, "bottom")
    };
    ba.resizeBanner = function(a, b, c) {
        null == c && (c = 0);
        a = a.getElementsByClassName("gp-ad")[0];
        var d = E.parseInt(a.style.width),
            e = 1,
            d = F.get_pixelWidth() / d,
            e = 0 == c ? d : p.gameScale * c;
        a.style.transform = "scale(" + e + "," + e + ")";
        a.style.transformOrigin = b
    };
    var Fb = function(a, b) {
        b = b.split("u").join("");
        this.r = new RegExp(a, b)
    };
    m.EReg = Fb;
    Fb.__name__ = ["EReg"];
    Fb.prototype = {
        r: null,
        match: function(a) {
            this.r.global && (this.r.lastIndex = 0);
            this.r.m = this.r.exec(a);
            this.r.s = a;
            return null != this.r.m
        },
        matched: function(a) {
            if (null != this.r.m && 0 <= a && a < this.r.m.length) return this.r.m[a];
            throw new u("EReg::matched");
        },
        matchedPos: function() {
            if (null == this.r.m) throw new u("No string matched");
            return {
                pos: this.r.m.index,
                len: this.r.m[0].length
            }
        },
        split: function(a) {
            return a.replace(this.r, "#__delim__#").split("#__delim__#")
        },
        replace: function(a, b) {
            return a.replace(this.r, b)
        },
        __class__: Fb
    };
    var xa = function() {
        this.intensity = this.weakenRate = this.shakeX = this.shakeY = 0;
        this.shakeHorizontal = this.shakeVertical = !1;
        this.scrollX = this.scrollY = 0;
        this.persistentUpdate = this.persistentRender = !1;
        this.children = [];
        this.alive = !1;
        this.name = "";
        this.id = ++xa.ID;
        this.children = [];
        this.openCallbacks = [];
        this.closeCallbacks = []
    };
    m["wyn.WynScreen"] = xa;
    xa.__name__ = ["wyn", "WynScreen"];
    xa.prototype = {
        id: null,
        name: null,
        alive: null,
        children: null,
        persistentUpdate: null,
        persistentRender: null,
        scrollX: null,
        scrollY: null,
        shakeHorizontal: null,
        shakeVertical: null,
        intensity: null,
        weakenRate: null,
        shakeX: null,
        shakeY: null,
        openCallbacks: null,
        closeCallbacks: null,
        update: function() {
            if (0 < this.intensity) {
                var a = la.randomInCircle(),
                    b = this.intensity,
                    c = a.x * b,
                    a = a.y * b;
                this.shakeX = this.shakeHorizontal ? c : 0;
                this.shakeY = this.shakeVertical ? a : 0;
                this.intensity -= p.dt * this.weakenRate;
                0 >= this.intensity && (this.shakeY = this.shakeX = 0)
            }
            c = 0;
            for (a = this.children; c < a.length;)
                if (b = a[c], ++c, null != b)
                    for (var d = 0; d < b.length;) {
                        var e = b[d];
                        ++d;
                        e.enabled && e.active && e.update()
                    }
        },
        render: function(a) {
            for (var b = 0, c = this.children; b < c.length;) {
                var d = c[b];
                ++b;
                if (null != d)
                    for (var e = 0; e < d.length;) {
                        var f = d[e];
                        ++e;
                        if (f.enabled && f.visible)
                            for (var h = 0, f = f.renderers; h < f.length;) {
                                var n = f[h];
                                ++h;
                                n(a)
                            }
                    }
            }
        },
        destroy: function() {
            for (var a = 0, b = this.children; a < b.length;) {
                var c = b[a];
                ++a;
                for (var d = 0; d < c.length;) {
                    var e = c[d];
                    ++d;
                    e.destroy()
                }
            }
            this.children = [];
            this.openCallbacks = [];
            this.closeCallbacks = []
        },
        swapLayers: function(a, b) {
            if (null != this.children[a] && null != this.children[b]) {
                var c = this.children[a];
                this.children[a] = this.children[b];
                this.children[b] = c
            }
        },
        addAt: function(a, b, c) {
            null == b && (b = 0);
            null == this.children[b] && (this.children[b] = []);
            a.screen = this;
            this.children[b].splice(c, 0, a)
        },
        addToFront: function(a, b, c) {
            null == c && (c = 0);
            null == b && (b = 0);
            null == this.children[b] && (this.children[b] = []);
            a.screen = this;
            0 == c ? this.children[b].push(a) : this.children[b].splice(c, 0, a)
        },
        addToBack: function(a, b, c) {
            null == c && (c = 0);
            null == b && (b = 0);
            null == this.children[b] && (this.children[b] = []);
            a.screen = this;
            0 == c ? this.children[b].unshift(a) : this.children[b].splice(this.children.length -
                c, 0, a)
        },
        remove: function(a, b) {
            null == b && (b = 0);
            null == this.children[b] ? R.trace("layer not found : " + b, {
                fileName: "WynScreen.hx",
                lineNumber: 168,
                className: "wyn.WynScreen",
                methodName: "remove"
            }) : (a.screen = null, v.remove(this.children[b], a))
        },
        open: function() {
            this.onOpen()
        },
        onOpen: function() {
            this.alive = !0;
            for (var a = 0, b = this.openCallbacks; a < b.length;) {
                var c = b[a];
                ++a;
                c()
            }
        },
        close: function() {
            this.onClose()
        },
        onClose: function() {
            for (var a = 0, b = this.closeCallbacks; a < b.length;) {
                var c = b[a];
                ++a;
                c()
            }
            this.alive = !1
        },
        shake: function(a, b, c, d) {
            null == d && (d = !0);
            null == c && (c = !0);
            null == b && (b = 20);
            null == a && (a = 10);
            this.intensity = a;
            this.weakenRate = b;
            this.shakeHorizontal = c;
            this.shakeVertical = d
        },
        cancelEffects: function() {
            this.shakeVertical = this.shakeHorizontal = !1;
            this.shakeY = this.shakeX = this.weakenRate = this.intensity = 0
        },
        __class__: xa
    };
    var Ca = function() {
        xa.call(this);
        var a = new fa(0, 0);
        this.spr_curtain = new na(p.gameWidth, p.gameHeight);
        this.spr_curtain.setImage(la.createRectImageFilled(2, 2, -1728053248), {
            x: 0,
            y: 0,
            w: 2,
            h: 2
        });
        this.spr_curtain.alpha = 0;
        a.addComponent(this.spr_curtain);
        this.addToFront(a)
    };
    m.Popup = Ca;
    Ca.__name__ = ["Popup"];
    Ca.__super__ = xa;
    Ca.prototype = T(xa.prototype, {
        spr_curtain: null,
        open: function() {
            var a = this;
            this.alive = !0;
            N.tween(this.spr_curtain, {
                alpha: {
                    to: 1
                }
            }, .2, 5, 0, function() {
                a.onOpen()
            })
        },
        close: function() {
            var a = this;
            N.tween(this.spr_curtain, {
                alpha: {
                    to: 0
                }
            }, .2, 5, 0, function() {
                a.onClose()
            })
        },
        __class__: Ca
    });
    var cb = function() {
        this.panelState = this.stateElapsed = this.roundState = 0;
        Ca.call(this);
        var a = p.gameWidth / 2,
            b = p.gameHeight / 2;
        this.pane_score = new fa(-p.gameWidth, 0);
        this.pane_part1 = new fa(-p.gameWidth, 0);
        this.pane_part2 = new fa(-p.gameWidth, 0);
        this.pane_score.name = "score pane";
        this.pane_part1.name = "part1 pane";
        this.pane_part2.name = "part2 pane";
        var c = S.getRegionByName("sprites", "assets_ui_window.png");
        c.borderLeft = 40;
        c.borderRight = 40;
        c.borderTop = 40;
        c.borderBottom = 40;
        var d = p.gameWidth - 40,
            e = a - d / 2,
            f = new Bc(d, 250);
        f.setImage(B.images.sprites, c);
        f.offsetX = e;
        f.offsetY = b;
        this.pane_score.addComponent(f);
        c = {
            valign: Qa.TOP,
            halign: Ra.MIDDLE
        };
        this.txt_best = new qa("123456", "cartwheel-64", d, 100, c);
        this.txt_best.setOffset(a - d / 2, b + 30);
        this.pane_score.addComponent(this.txt_best);
        this.txt_score = new qa("123456", "cartwheel-128", d, 150, c);
        this.txt_score.setOffset(a - d / 2, b + 100);
        this.pane_score.addComponent(this.txt_score);
        c = S.getRegionByName("sprites", "assets_ui_hiscore.png");
        e = new na(110, 27);
        e.setImage(B.images.sprites, c);
        e.offsetX = a - d / 2 + 20;
        e.offsetY = b + 50;
        this.pane_score.addComponent(e);
        c = S.getRegionByName("sprites", "assets_ui_score.png");
        e = new na(78, 27);
        e.setImage(B.images.sprites, c);
        e.offsetX = a - d / 2 + 20;
        e.offsetY = b + 160;
        this.pane_score.addComponent(e);
        c = S.getRegionByName("sprites", "assets_ui_new.png");
        this.spr_new = new na(80, 36);
        this.spr_new.setImage(B.images.sprites, c);
        this.spr_new.setOffset(a + 50, b + 100);
        this.spr_new.angle = 20;
        this.pane_score.addComponent(this.spr_new);
        this.btn_logo = new Ka(99.33333333333333, 70.33333333333333);
        this.btn_logo.setImage(B.images.funfe_logo_white, {
            x: 0,
            y: 0,
            w: 298,
            h: 211
        });
        this.btn_logo.setOffset(a - 49.666666666666664, p.gameHeight - 70.33333333333333 - 10);
        this.btn_logo.notifyDown(M(this, this.onDownLogo));
        this.pane_score.addComponent(this.btn_logo);
        this.addToFront(this.pane_score);
        this.region_btn_yellow = S.getRegionByName("sprites", "assets_btn_yellow.png");
        this.region_btn_grey = S.getRegionByName("sprites", "assets_btn_grey.png");
        var h = S.getRegionByName("sprites", "assets_btn_blue_fb.png"),
            n = S.getRegionByName("sprites", "assets_btn_blue_tw.png"),
            k = S.getRegionByName("sprites", "assets_btn_green.png");
        this.updateBorder(this.region_btn_yellow);
        this.updateBorder(this.region_btn_grey);
        h.borderLeft = 40;
        h.borderRight = 40;
        h.borderTop = 40;
        h.borderBottom = 40;
        n.borderLeft = 40;
        n.borderRight = 40;
        n.borderTop = 40;
        n.borderBottom = 40;
        k.borderLeft = 40;
        k.borderRight = 40;
        k.borderTop = 40;
        k.borderBottom = 40;
        var A = S.getRegionByName("sprites", "assets_icon_video.png"),
            g = S.getRegionByName("sprites", "assets_icon_cancel.png"),
            f = S.getRegionByName("sprites", "assets_icon_fb.png"),
            c = S.getRegionByName("sprites", "assets_icon_tw.png"),
            e = S.getRegionByName("sprites", "assets_icon_retry.png"),
            q = S.getRegionByName("sprites", "assets_ui_continue.png"),
            J = .7 * d,
            l = .3 * d;
        this.btn_continue = new bb(J, 109);
        this.btn_continue.setImage(B.images.sprites, this.region_btn_yellow);
        this.btn_continue.setOffset(20, b + 250);
        this.btn_continue.notifyDown(M(this, this.onDownContinue));
        this.pane_part1.addComponent(this.btn_continue);
        this.icon_continue = new na(109, 109);
        this.icon_continue.setImage(B.images.sprites, A);
        this.icon_continue.setOffset(25, b + 250);
        this.pane_part1.addComponent(this.icon_continue);
        this.txt_continue = new na(180, 39);
        this.txt_continue.setImage(B.images.sprites, q);
        this.txt_continue.setOffset(20 + J - 195, b + 285);
        this.pane_part1.addComponent(this.txt_continue);
        this.btn_cancel = new bb(l, 109);
        this.btn_cancel.setImage(B.images.sprites, this.region_btn_grey);
        this.btn_cancel.setOffset(20 + J, b + 250);
        this.btn_cancel.notifyDown(M(this, this.onDownCancel));
        this.pane_part1.addComponent(this.btn_cancel);
        A = new na(109, 109);
        A.setImage(B.images.sprites, g);
        A.offsetX = 20 + J + (l / 2 - 54.5);
        A.offsetY = b + 250;
        this.pane_part1.addComponent(A);
        this.addToFront(this.pane_part1);
        J = .25 * d;
        l = .5 * d;
        g = .25 * d;
        this.btn_fb = new bb(J, 109);
        this.btn_fb.setImage(B.images.sprites, h);
        this.btn_fb.setOffset(20, b + 250);
        this.btn_fb.notifyDown(M(this, this.onDownFb));
        this.pane_part2.addComponent(this.btn_fb);
        this.btn_fb = new bb(l, 109);
        this.btn_fb.setImage(B.images.sprites, k);
        this.btn_fb.setOffset(20 + J, b + 250);
        this.btn_fb.notifyDown(M(this, this.onDownRetry));
        this.pane_part2.addComponent(this.btn_fb);
        this.btn_tw = new bb(g, 109);
        this.btn_tw.setImage(B.images.sprites, n);
        this.btn_tw.setOffset(20 + J + l, b + 250);
        this.btn_tw.notifyDown(M(this, this.onDownTw));
        this.pane_part2.addComponent(this.btn_tw);
        h = new na(109, 109);
        h.setImage(B.images.sprites, f);
        h.offsetX = 20 + (J / 2 - 54.5);
        h.offsetY = b + 250;
        this.pane_part2.addComponent(h);
        f = new na(109, 109);
        f.setImage(B.images.sprites, e);
        f.offsetX = a - 54.5;
        f.offsetY = b + 250;
        this.pane_part2.addComponent(f);
        a = new na(109, 109);
        a.setImage(B.images.sprites, c);
        a.offsetX = 20 + .75 * d + (g / 2 - 54.5);
        a.offsetY = b + 250;
        this.pane_part2.addComponent(a);
        this.addToFront(this.pane_part2);
        Sa.init("103000");
        Sa.setDebugMode(!1);
        Sa.setTestMode(!1);
        Sa.setCallbacks(function() {}, function() {}, function() {}, M(this, this.onVideoCompleted), function() {}, function() {})
    };
    m.GameOverScreen = cb;
    cb.__name__ = ["GameOverScreen"];
    cb.__super__ = Ca;
    cb.prototype = T(Ca.prototype, {
        panelState: null,
        stateElapsed: null,
        roundState: null,
        pane_score: null,
        pane_part1: null,
        pane_part2: null,
        btn_continue: null,
        icon_continue: null,
        txt_continue: null,
        btn_cancel: null,
        region_btn_yellow: null,
        region_btn_grey: null,
        btn_retry: null,
        btn_fb: null,
        btn_tw: null,
        btn_logo: null,
        spr_new: null,
        txt_score: null,
        txt_best: null,
        txt_notice: null,
        spr_adCurtain: null,
        website_url: null,
        game_url: null,
        fbAppImg: null,
        updateBorder: function(a) {
            a.borderLeft = 40;
            a.borderRight = 40;
            a.borderTop = 40;
            a.borderBottom = 40
        },
        update: function() {
            Ca.prototype.update.call(this);
            3 == this.panelState && D.keysDown.exists("z") && this.retryGame()
        },
        open: function() {
            var scorePlay68 = parseInt(L._gameElapsed * 10) / 10;
            // updateShare(scorePlay68);
            // Play68.setRankingScoreDesc(scorePlay68);
            var a = this;
            this.alive = !0;
            N.tween(this.spr_curtain, {
                alpha: {
                    to: 1
                }
            }, .2, 5, 0, null);
            this.panelState = 1;
            this.tweenPane(this.pane_score, -p.gameWidth);
            this.tweenPane(this.pane_part1, -p.gameWidth);
            this.tweenPane(this.pane_part2, -p.gameWidth);
            this.txt_score.text = la.roundToPrecisionString(L._gameElapsed, 1, ":", null);
            this.txt_best.text = la.roundToPrecisionString(L._bestGameElapsed, 1, ":", null);
            this.spr_new.set_visible(L.isNewHiscore);
            this.tweenPane(this.pane_score, 0);
            this.tweenPane(this.pane_part2, 0);
            r.addTimeTask(function() {
                a.panelState = 3;
                a.stateElapsed = 0;
                a.onOpen()
            }, .1)
        },
        tweenPane: function(a, b, c) {
            N.tween(a, {
                x: {
                    to: b
                }
            }, .2, 5, null, c)
        },
        onTriggerAdKeyboard: function(a) {},
        onTriggerAdTouch: function(a, b, c) {},
        triggerAd: function() {},
        onDownContinue: function(a) {
            R.trace("onDownContinue", {
                fileName: "GameOverScreen.hx",
                lineNumber: 484,
                className: "GameOverScreen",
                methodName: "onDownContinue"
            });
            Sa.canShow() && (Sa.show(), this.panelState = 4)
        },
        onVideoCompleted: function(a, b) {
            this.roundState = 1;
            this.close()
        },
        onDownCancel: function(a) {},
        onDownFb: function(a) {
            // Play68.shareFriend();
        },
        onDownRetry: function(a) {
            R.trace("onDownRetry", {
                fileName: "GameOverScreen.hx",
                lineNumber: 564,
                className: "GameOverScreen",
                methodName: "onDownRetry"
            });
            4 != this.panelState && this.retryGame()
        },
        onDownTw: function(a) {
            // Play68.goHome();
        },
        onDownLogo: function(a) {},
        retryGame: function() {
            4 == this.panelState ? R.trace("ad playing, do nothing.", {
                fileName: "GameOverScreen.hx",
                lineNumber: 630,
                className: "GameOverScreen",
                methodName: "retryGame"
            }) : 3 == this.panelState && (this.roundState = 0, this.close())
        },
        close: function() {
            var a = this;
            N.tween(this.spr_curtain, {
                alpha: {
                    to: 0
                }
            }, .2, 5, 0, null);
            this.panelState = 1;
            this.tweenPane(this.pane_score, -p.gameWidth);
            this.tweenPane(this.pane_part1, -p.gameWidth);
            this.tweenPane(this.pane_part2, -p.gameWidth, function() {
                a.panelState = 0;
                a.onClose();
                0 == a.roundState ? L.instance.resetRound(3) : L.instance.continueRound()
            })
        },
        __class__: cb
    });
    var L = function() {
        this._deathElapsed = this._nextLevelElapsed = this._nextPatternCooldown = this._nextPatternType = 0;
        this._gameState = this._gameLevel = 1;
        this._nextLevelInterval = 10;
        this._laneCount = 3;
        this._bgHeight = 299;
        this._bgCount = 5;
        this._gameMaxLevel = 0;
        xa.call(this);
        L.instance = this
    };
    m.GameScreen = L;
    L.__name__ = ["GameScreen"];
    L.__super__ = xa;
    L.prototype = T(xa.prototype, {
        _titleScreen: null,
        _gameOverScreen: null,
        _pauseScreen: null,
        _grp_hazards: null,
        _grp_shadows: null,
        _arr_heroes: null,
        _arr_hazards: null,
        _arr_touchboxes: null,
        _arr_laneX: null,
        _arr_bg: null,
        _pauseButton: null,
        _txt_score: null,
        _txt_bestScore: null,
        _gameMaxLevel: null,
        _bgCount: null,
        _bgHeight: null,
        _laneCount: null,
        _nextLevelInterval: null,
        _gameState: null,
        _gameLevel: null,
        _deathElapsed: null,
        _nextLevelElapsed: null,
        _nextPatternCooldown: null,
        _nextPatternType: null,
        _hazardQueue: null,
        _queuedHazards: null,
        onOpen: function() {
            xa.prototype.onOpen.call(this);
            this.setupEngine();
            this.setupGame();
            ba.setup();
            this.loadGame();
            this.resetRound();
            this.showPopup(this._titleScreen)
        },
        setupEngine: function() {
            p.addManager(new D);
            p.IS_MOBILE ? p.addManager(new z) : p.addManager(new I);
            p.addManager(new N);
            p.onResize = M(this, this.onResize);
            F.notifyOnApplicationState(function() {}, function() {}, M(this, this.onLoseFocus), M(this, this.onLoseFocus), function() {})
        },
        setupGame: function() {
            qa.loadFont("cartwheel-64", B.images.Cartwheel_64_squared, B.blobs.Cartwheel_64_squared_fnt);
            qa.loadFont("cartwheel-128", B.images.Cartwheel_128_squared, B.blobs.Cartwheel_128_squared_fnt);
            S.loadAtlasShoebox("sprites", B.images.sprites, B.blobs.sprites_xml);
            this.persistentRender = this.persistentUpdate = !0;
            this._gameMaxLevel = L.patternList.length;
            this._grp_hazards = new Dc;
            this._grp_shadows = new Dc;
            this._arr_heroes = [];
            this._arr_hazards = [
                [],
                [],
                []
            ];
            this._arr_touchboxes = [];
            this._arr_laneX = [];
            this._arr_bg = [];
            this._titleScreen = new Ec;
            this._gameOverScreen = new cb;
            this._pauseScreen = new Fc;
            var a = p.gameHeight,
                b = p.gameWidth / 2,
                c = a,
                d = S.getRegionByName("sprites", "assets_ground.png");
            this._bgHeight = d.h;
            for (var e = d.w, f = 0, h = this._bgCount; f < h;) {
                f++;
                var n = new fa(0, c),
                    k = new na(e, this._bgHeight);
                k.setImage(B.images.sprites, d);
                k.offsetX = -e / 2 + p.gameWidth / 2;
                k.offsetY = 0;
                n.addComponent(k);
                this.addToFront(n);
                this._arr_bg.push(n);
                c -= this._bgHeight
            }
            for (c = 0; 50 > c;) c++, d = new Gc(50, 20), d.kill(), this._grp_shadows.add(d), this.addToFront(d);
            for (c = 0; 3 > c;)
                for (c++, d = 0; 10 > d;) d++, e = new Tb(0, 0), e.kill(), this.addToFront(e, 5), this._grp_hazards.add(e);
            d = 0;
            p.gameWidth > p.oriWidth && (d = p.gameWidth / 2 - p.oriWidth / 2);
            c = d + 30 + 70;
            d += 30;
            e = 0;
            for (f = this._laneCount; e < f;) h = e++, n = new Xa(c, a - 200), n.name = "hero-" + h, this._arr_heroes.push(n), this.addToFront(n, 5), n = new Hc(d, .25 * a, 140, .75 * a), n.name = "button-" + h, n.enabled = !1, this._arr_touchboxes.push(n), this.addToFront(n), this._arr_laneX.push(c), c += 140, d += 140;
            this._pauseButton = new Ic;
            this._pauseButton.active = !1;
            this.addToFront(this._pauseButton, 10);
            a = {
                halign: Ra.MIDDLE,
                valign: Qa.TOP
            };
            c = new fa(b, 0);
            this._txt_score = new qa("SCORE", "cartwheel-64", 400, 150, a);
            this._txt_score.setOffset(-200, 0);
            c.addComponent(this._txt_score);
            this.addToFront(c, 10);
            b = new fa(b, 120);
            this._txt_bestScore = new qa("BEST\n99999", "cartwheel-128", 200, 200, a);
            this._txt_bestScore.setOffset(-100, 0);
            b.addComponent(this._txt_bestScore)
        },
        onResize: function() {
            ba.onResizeScreen()
        },
        continueRound: function() {
            this.initRound(!1);
            L._continued = !0;
            this.transitionToState(6)
        },
        resetRound: function(a) {
            null == a && (a = 1);
            this.initRound(!0);
            this.transitionToState(a)
        },
        initRound: function(a) {
            this._grp_hazards.forEach(function(a) {
                a.kill()
            });
            this._grp_shadows.forEach(function(a) {
                a.kill()
            });
            for (var b = 0, c = this._arr_heroes; b < c.length;) {
                var d = c[b];
                ++b;
                d.revive();
                d.shadow = this._grp_shadows.recycle();
                d.update()
            }
            this._arr_hazards = [
                [],
                [],
                []
            ];
            a && (this._gameState = 1, L._gameElapsed = 0, this._gameLevel = 1, this._nextPatternType = this._nextPatternCooldown = this._nextLevelElapsed = this._deathElapsed = 0, L._continued = !1);
            this._hazardQueue = [];
            this._queuedHazards = [];
            a = 0;
            for (b = this._laneCount; a < b;) a++, this._queuedHazards.push(0);
            this.toggleActiveUI(!0);
            this.toggleVisibleUI(!0);
            this.updateUI();
            this._txt_bestScore.text = la.roundToPrecisionString(L._bestGameElapsed, 1, ":", null);
            this._txt_bestScore.update();
            this._txt_score.update()
        },
        showPopup: function(a) {
            this.toggleActiveUI(!1);
            this.toggleVisibleUI(!1);
            p.addScreen(a)
        },
        toggleGameObjects: function(a) {
            for (var b = 0, c = this._arr_touchboxes.length; b < c;) {
                var d = b++;
                this._arr_touchboxes[d].enabled = a ? !0 : !1
            }
        },
        toggleActiveUI: function(a) {
            this._pauseButton.active = a;
            for (var b = 0, c = this._arr_touchboxes; b < c.length;) {
                var d = c[b];
                ++b;
                d.active = a
            }
        },
        toggleVisibleUI: function(a) {
            a ? (N.tween(this._pauseButton, {
                y: {
                    to: 0
                }
            }, .2, 5), N.tween(this._txt_score.parent, {
                y: {
                    to: 0
                }
            }, .2, 5), N.tween(this._txt_bestScore.parent, {
                y: {
                    to: 0
                }
            }, .2, 5)) : (N.tween(this._pauseButton, {
                y: {
                    to: -300
                }
            }, .2, 5), N.tween(this._txt_score.parent, {
                y: {
                    to: -300
                }
            }, .2, 5), N.tween(this._txt_bestScore.parent, {
                y: {
                    to: -300
                }
            }, .2, 5))
        },
        transitionToState: function(a) {
            this._gameState = a;
            switch (this._gameState) {
                case 1:
                    this.persistentUpdate = !0;
                    this.toggleGameObjects(!1);
                    this.toggleActiveUI(!1);
                    this.toggleVisibleUI(!1);
                    this.showPopup(this._titleScreen);
                    break;
                case 2:
                    this.persistentUpdate = !1;
                    this.toggleGameObjects(!1);
                    this.toggleActiveUI(!1);
                    this.toggleVisibleUI(!1);
                    break;
                case 3:
                    this.persistentUpdate = !0;
                    this.toggleGameObjects(!0);
                    this.toggleActiveUI(!0);
                    this.toggleVisibleUI(!0);
                    break;
                case 4:
                    this.persistentUpdate = !0;
                    this.toggleGameObjects(!1);
                    this.toggleActiveUI(!1);
                    this.toggleVisibleUI(!1);
                    break;
                case 5:
                    this.persistentUpdate = !1;
                    this.toggleGameObjects(!1);
                    this.toggleActiveUI(!1);
                    this.toggleVisibleUI(!1);
                    this.showPopup(this._gameOverScreen);
                    break;
                case 6:
                    this.persistentUpdate = !1, this.toggleGameObjects(!1), this.toggleActiveUI(!1), this.toggleVisibleUI(!1), this.showPopup(this._pauseScreen)
            }
        },
        update: function() {
            this.children[5].sort(function(a, b) {
                return a.get_y() > b.get_y() ? 1 : -1
            });
            this.updateDebug();
            switch (this._gameState) {
                case 1:
                    this.updateMovement();
                    xa.prototype.update.call(this);
                    break;
                case 3:
                    this.updateInput();
                    this.updateDirector();
                    this.updateMovement();
                    xa.prototype.update.call(this);
                    this.updateCollision();
                    this.updateUI();
                    break;
                case 4:
                    xa.prototype.update.call(this);
                    this._deathElapsed += p.dt;
                    1 <= this._deathElapsed && (this._deathElapsed = 0, this.transitionToState(5));
                    break;
                default:
                    xa.prototype.update.call(this)
            }
        },
        updateDebug: function() {
            if (D.keysDown.exists("p") || z.init && z.touches.h.hasOwnProperty(4) && z.touches.h[4].state == ma.DOWN) L._bestGameElapsed = 0, this.saveGame()
        },
        updateMovement: function() {
            var a = 350,
                b = 9 * this._nextLevelInterval;
            L._gameElapsed < b && (a = L._gameElapsed / b * 350);
            for (var a = p.dt * (700 + a), b = 0, c = this._arr_bg; b < c.length;) {
                var d = c[b];
                ++b;
                var e = d;
                e.set_y(e.get_y() + a);
                d.get_y() > p.gameHeight + 50 && d.set_y(d.get_y() - this._bgCount * this._bgHeight)
            }
            b = 0;
            c = null;
            d = 0;
            for (e = this._arr_hazards; d < e.length;) {
                var f = e[d];
                ++d;
                for (b = 0; b < f.length;) {
                    var h = c = f[b];
                    h.set_y(h.get_y() + a);
                    c.get_y() > p.gameHeight + 100 && (c.kill(), v.remove(f, c), b--);
                    b++
                }
            }
        },
        updateInput: function() {
            if (D.keysDown.exists("z") || D.keysDown.exists("j")) this.onDownHero(0);
            if (D.keysDown.exists("x") || D.keysDown.exists("k")) this.onDownHero(1);
            if (D.keysDown.exists("c") || D.keysDown.exists("l")) this.onDownHero(2);
            if (D.keysUp.exists("z") || D.keysUp.exists("j")) this.onUpHero(0);
            if (D.keysUp.exists("x") || D.keysUp.exists("k")) this.onUpHero(1);
            if (D.keysUp.exists("c") || D.keysUp.exists("l")) this.onUpHero(2);
            D.keysDown.exists(" ") && (L.instance.transitionToState(6));
            D.keysDown.exists("esc") && this.transitionToState(6);
            D.keysDown.exists("m") && (R.trace("screenshot", {
                fileName: "GameScreen.hx",
                lineNumber: 646,
                className: "GameScreen",
                methodName: "updateInput"
            }), window.open(g.khanvas.toDataURL("image/png")))
        },
        onDownHero: function(a) {
            this._arr_heroes[a].doJump()
        },
        onUpHero: function(a) {
            this._arr_heroes[a].endJump()
        },
        onLoseFocus: function() {
            3 == this._gameState && L.instance.transitionToState(6)
        },
        updateDirector: function() {
            L._gameElapsed += p.dt;
            this._nextLevelElapsed += p.dt;
            this._nextLevelElapsed >= this._nextLevelInterval && (this._nextLevelElapsed -= this._nextLevelInterval, this._gameLevel++, this._gameLevel > this._gameMaxLevel && (this._gameLevel = this._gameMaxLevel));
            this._nextPatternCooldown -= p.dt;
            0 >= this._nextPatternCooldown && (this.checkRefillPatternQueue(), this.spawnActor())
        },
        checkRefillPatternQueue: function() {
            if (0 >= this._hazardQueue.length)
                for (var a = la.randomInt(0, (this._gameLevel | 0) - 1), a = L.patternList[a], b = 0, c = a.length; b < c;) {
                    var d = b++;
                    this._hazardQueue.push(a[d])
                }
        },
        spawnActor: function() {
            for (var a = 0, b = this._queuedHazards.length; a < b;) {
                var c = a++;
                if (1 == this._queuedHazards[c]) {
                    var d = la.randomInt(0, 2 * this._gameLevel);
                    50 < d && (d = 50);
                    this.addHazardAt(c, -50 - d)
                }
            }
            b = this._hazardQueue.shift();
            a = [0, 0, 0];
            null == b && R.trace("This shouldn't happen -- handled by checkRefillPatternQueue()", {
                fileName: "GameScreen.hx",
                lineNumber: 751,
                className: "GameScreen",
                methodName: "spawnActor"
            });
            if (null != b) switch (b) {
                case 0:
                    b = -1;
                    do b = la.randomInt(0, this._laneCount - 1), 1 == this._queuedHazards[b] ? b = -1 : a[b] = 1; while (-1 == b);
                    break;
                case 1:
                    for (b = 0, c = this._laneCount; b < c;) d = b++, a[d] = 1 == this._queuedHazards[d] ? 0 : 1
            }
            this._queuedHazards = a;
            a = 0;
            b = 6 * this._nextLevelInterval;
            L._gameElapsed < b && (a = .5 * (1 - L._gameElapsed / b));
            this._nextPatternCooldown = .3 + a
        },
        addHazardAt: function(a, b) {
            var c = this._grp_hazards.recycle();
            c.revive();
            c.set_x(this._arr_laneX[a]);
            c.set_y(b);
            c.shadow = this._grp_shadows.recycle();
            var d = 0;
            if (.5 <= this._gameLevel / this._gameMaxLevel) {
                var e = .4;
                90 > L._gameElapsed && (e = L._gameElapsed / 90 * .4);
                Math.random() < e && (d = 1)
            }
            c.setHazardType(d);
            c.update();
            this._arr_hazards[a].push(c)
        },
        updateCollision: function() {
            for (var a = null, b = null, c = 0, d = this._arr_hazards.length; c < d;)
                for (var e = c++, a = this._arr_heroes[e], f = 0, h = this._arr_hazards[e].length; f < h;)
                    if (b = f++, b = this._arr_hazards[e][b], a.col_char.collide(b.col_char)) this.onHitActors(a, b)
        },
        onHitActors: function(a, b) {
            if (a.checkCollision(b)) {
                for (var c = 0, d = this._arr_heroes; c < d.length;) {
                    var e = d[c];
                    ++c;
                    e.hitWall()
                }
                L.isNewHiscore = !1;
                0 == L._bestGameElapsed ? (L._bestGameElapsed = L._gameElapsed, L.isNewHiscore = !0) : L._gameElapsed > L._bestGameElapsed && (L._bestGameElapsed = L._gameElapsed, L.isNewHiscore = !0);
                this.saveGame();
                this.intensity = 20;
                this.weakenRate = 40;
                this.shakeVertical = this.shakeHorizontal = !0;
                this.transitionToState(4)
            }
        },
        updateUI: function() {
            this._txt_score.text = la.roundToPrecisionString(L._gameElapsed, 1, ":", null)
        },
        render: function(a) {
            xa.prototype.render.call(this, a)
        },
        loadGame: function() {
            var a = Gb.loadData();
            null != a && (L._bestGameElapsed = null == a.bestTime ? 0 : a.bestTime)
        },
        saveGame: function() {
            Gb.saveData({
                bestTime: L._bestGameElapsed
            })
        },
        __class__: L
    });
    var Tb = function(a, b) {
        ab.call(this, a, b);
        this.currZ = this.groundZ = 0;
        S.getRegionByName("sprites", "assets_hazard.png");
        this.spr_char = new na(122, 55);
        this.addComponent(this.spr_char);
        this.col_char = new Da(40, 20);
        this.col_char.setOffset(-20, 45);
        this.addComponent(this.col_char)
    };
    m.Hazard = Tb;
    Tb.__name__ = ["Hazard"];
    Tb.__super__ = ab;
    Tb.prototype = T(ab.prototype, {
        setHazardType: function(a) {
            null == a && (a = 0);
            switch (a) {
                case 0:
                    this.currZ = this.groundZ;
                    this.actorHeight = 10;
                    a = S.getRegionByName("sprites", "assets_hazard.png");
                    this.spr_char.setSize(124, 55);
                    this.spr_char.setImage(B.images.sprites, a);
                    this.spr_char.setOffset(-62, -15);
                    break;
                case 1:
                    this.currZ = this.groundZ - 60, this.actorHeight = 10, a = S.getRegionByName("sprites", "assets_hazard2.png"), this.spr_char.setSize(140, 150), this.spr_char.setImage(B.images.sprites, a), this.spr_char.setOffset(-70, -90)
            }
        },
        __class__: Tb
    });
    var Xa = function(a, b) {
        this.isJumping = !1;
        this.hitWallDuration = 1;
        this.hitWallElapsed = 0;
        this.jumpGravity = -1600;
        this.jumpVelocity = 0;
        this.jumpForce = 400;
        this.currState = 1;
        ab.call(this, a, b);
        this.currZ = this.groundZ = -64;
        this.actorHeight = 40;
        this.spr_char = new na(128, 128);
        this.spr_char.setImage(B.images.sprites, null);
        this.spr_char.setOffset(-64, 0);
        this.addComponent(this.spr_char);
        this.animator = new Jc;
        this.animator.sprite = this.spr_char;
        this.animator.addAnimation("run", S.getRegionsByName("sprites", ["hurdles-hero-frameb1.png", "hurdles-hero-frameb2.png", "hurdles-hero-frameb3.png", "hurdles-hero-frameb4.png"]), 12);
        this.animator.addAnimation("jump", [S.getRegionByName("sprites", "hurdles-hero-frameb5.png")]);
        this.animator.addAnimation("fall", [S.getRegionByName("sprites", "hurdles-hero-frameb6.png")]);
        this.animator.addAnimation("die", [S.getRegionByName("sprites", "hurdles-hero-frameb7.png")]);
        this.animator.playAnimation("run", !0, !0);
        this.addComponent(this.animator);
        this.col_char = new Da(40, 20);
        this.col_char.setOffset(-20, 40);
        this.addComponent(this.col_char)
    };
    m.Hero = Xa;
    Xa.__name__ = ["Hero"];
    Xa.__super__ = ab;
    Xa.prototype = T(ab.prototype, {
        currState: null,
        jumpForce: null,
        jumpVelocity: null,
        jumpGravity: null,
        hitWallElapsed: null,
        hitWallDuration: null,
        isJumping: null,
        animator: null,
        update: function() {
            ab.prototype.update.call(this);
            switch (this.currState) {
                case 1:
                    this.isJumping && this.setHeroState(2);
                    break;
                case 2:
                    this.jumpVelocity = this.jumpForce;
                    this.setHeroState(3);
                    this.isJumping = !1;
                    break;
                case 3:
                    this.jumpVelocity = pb.computeVelocity(p.dt, this.jumpVelocity, this.jumpGravity, 0, 0);
                    this.currZ += p.dt * -this.jumpVelocity;
                    0 >= this.jumpVelocity && this.setHeroState(5);
                    this.spr_char.offsetY = this.currZ;
                    break;
                case 5:
                    this.jumpVelocity = pb.computeVelocity(p.dt, this.jumpVelocity, this.jumpGravity, 0, 0);
                    this.currZ += p.dt * -this.jumpVelocity;
                    this.currZ >= this.groundZ && (this.currZ = this.groundZ, this.setHeroState(1));
                    this.spr_char.offsetY = this.currZ;
                    break;
                case 7:
                    this.setHeroState(8)
            }
        },
        revive: function() {
            ab.prototype.revive.call(this);
            this.currZ = this.groundZ;
            this.spr_char.offsetY = this.currZ;
            this.setHeroState(1);
            this.hitWallElapsed = this.jumpVelocity = 0
        },
        doJump: function() {
            this.isJumping = !0
        },
        endJump: function() {
            1 != this.currState && (this.isJumping = !1)
        },
        hitWall: function() {
            this.hitWallElapsed = 0;
            this.setHeroState(6)
        },
        setHeroState: function(a) {
            this.currState = a;
            switch (a) {
                case 1:
                    this.animator.playAnimation("run", !0, !0);
                    break;
                case 3:
                    this.animator.playAnimation("jump", !0, !0);
                    break;
                case 5:
                    this.animator.playAnimation("fall", !0, !0);
                    break;
                case 6:
                    this.animator.playAnimation("die", !0, !0)
            }
        },
        __class__: Xa
    });
    var v = function() {};
    m.HxOverrides = v;
    v.__name__ = ["HxOverrides"];
    v.strDate = function(a) {
        switch (a.length) {
            case 8:
                a = a.split(":");
                var b = new Date;
                b.setTime(0);
                b.setUTCHours(a[0]);
                b.setUTCMinutes(a[1]);
                b.setUTCSeconds(a[2]);
                return b;
            case 10:
                return a = a.split("-"), new Date(a[0], a[1] - 1, a[2], 0, 0, 0);
            case 19:
                return b = a.split(" "), a = b[0].split("-"), b = b[1].split(":"), new Date(a[0], a[1] - 1, a[2], b[0], b[1], b[2]);
            default:
                throw new u("Invalid date format : " + a);
        }
    };
    v.cca = function(a, b) {
        var c = a.charCodeAt(b);
        return c != c ? void 0 : c
    };
    v.substr = function(a, b, c) {
        if (null != b && 0 != b && null != c && 0 > c) return "";
        null == c && (c = a.length);
        0 > b ? (b = a.length + b, 0 > b && (b = 0)) : 0 > c && (c = a.length + c - b);
        return a.substr(b, c)
    };
    v.indexOf = function(a, b, c) {
        var d = a.length;
        0 > c && (c += d, 0 > c && (c = 0));
        for (; c < d;) {
            if (a[c] === b) return c;
            c++
        }
        return -1
    };
    v.remove = function(a, b) {
        var c = v.indexOf(a, b, 0);
        if (-1 == c) return !1;
        a.splice(c, 1);
        return !0
    };
    v.iter = function(a) {
        return {
            cur: 0,
            arr: a,
            hasNext: function() {
                return this.cur < this.arr.length
            },
            next: function() {
                return this.arr[this.cur++]
            }
        }
    };
    var Kc = function() {};
    m.Lambda = Kc;
    Kc.__name__ = ["Lambda"];
    Kc.array = function(a) {
        var b = [];
        for (a = de(a)(); a.hasNext();) {
            var c = a.next();
            b.push(c)
        }
        return b
    };
    Kc.has = function(a, b) {
        for (var c = de(a)(); c.hasNext();)
            if (c.next() == b) return !0;
        return !1
    };
    var Hb = function() {
        this.length = 0
    };
    m.List = Hb;
    Hb.__name__ = ["List"];
    Hb.prototype = {
        h: null,
        q: null,
        length: null,
        add: function(a) {
            a = [a];
            null == this.h ? this.h = a : this.q[1] = a;
            this.q = a;
            this.length++
        },
        remove: function(a) {
            for (var b = null, c = this.h; null != c;) {
                if (c[0] == a) return null == b ? this.h = c[1] : b[1] = c[1], this.q == c && (this.q = b), this.length--, !0;
                b = c;
                c = c[1]
            }
            return !1
        },
        iterator: function() {
            return new gd(this.h)
        },
        __class__: Hb
    };
    var gd = function(a) {
        this.head = a;
        this.val = null
    };
    m["_List.ListIterator"] = gd;
    gd.__name__ = ["_List", "ListIterator"];
    gd.prototype = {
        head: null,
        val: null,
        hasNext: function() {
            return null != this.head
        },
        next: function() {
            this.val = this.head[0];
            this.head = this.head[1];
            return this.val
        },
        __class__: gd
    };
    var Lc = function() {
        this.loadPerc = 0;
        this.loadQueue = [];
        this.loadQueueCount = 0;
        xa.call(this);
        p.bgColor = -1;
        Ib.init();
        Ib.createBanner("bottomBanner", "ca-app-pub-0934157209270293/5718876652", "BANNER", "BOTTOM");
        Ib.createBanner("gameoverBanner", "ca-app-pub-0934157209270293/5718876652", "MEDIUM_RECTANGLE", "TOP");
    };
    m.LoadingScreen = Lc;
    Lc.__name__ = ["LoadingScreen"];
    Lc.__super__ = xa;
    Lc.prototype = T(xa.prototype, {
        loadQueueCount: null,
        loadQueue: null,
        loadPerc: null,
        oldColor: null,
        onOpen: function() {
            xa.prototype.onOpen.call(this);
            this.loadQueue.push((ga = B.images, M(ga, ga.spritesLoad)));
            this.loadQueue.push((ga = B.images, M(ga, ga.Cartwheel_64_squaredLoad)));
            this.loadQueue.push((ga = B.images, M(ga, ga.Cartwheel_128_squaredLoad)));
            this.loadQueue.push((ga = B.blobs, M(ga, ga.sprites_xmlLoad)));
            this.loadQueue.push((ga = B.blobs, M(ga, ga.Cartwheel_64_squared_fntLoad)));
            this.loadQueue.push((ga = B.blobs, M(ga, ga.Cartwheel_128_squared_fntLoad)));
            this.loadQueue.push((ga = B.fonts, M(ga, ga.negotiate_rgLoad)));
            this.loadQueue.push((ga = B.images, M(ga, ga.funfe_logo_blackLoad)));
            this.loadQueue.push((ga = B.images, M(ga, ga.funfe_logo_whiteLoad)));
            for (var a = 0, b = this.loadQueue; a < b.length;) {
                var c = b[a];
                ++a;
                c(M(this, this.onLoadAsset))
            }
            R.trace("WynIMA not loaded", {
                fileName: "LoadingScreen.hx",
                lineNumber: 77,
                className: "LoadingScreen",
                methodName: "onOpen"
            })
        },
        render: function(a) {
            this.oldColor = a.get_color();
            a.set_color(t.Black);
            a.fillRect(p.gameWidth / 4, p.gameHeight / 2 - 10, this.loadPerc * p.gameWidth / 2, 20);
            a.drawRect(p.gameWidth / 4, p.gameHeight / 2 - 10, p.gameWidth / 2, 20, 4);
            a.set_color(this.oldColor)
        },
        onLoadAsset: function() {
            this.loadQueueCount++;
            this.loadPerc = this.loadQueueCount / this.loadQueue.length;
            this.loadQueueCount >= this.loadQueue.length && this.close()
        },
        onClose: function() {
            xa.prototype.onClose.call(this);
            p.addScreen(new L)
        },
        __class__: Lc
    });
    var Mc = function() {};
    m.Main = Mc;
    Mc.__name__ = ["Main"];
    Mc.main = function() {
        F.init("Hurdles", 800, 600, Mc.onInit)
    };
    Mc.onInit = function() {
        var a = new p(480, 940, 2);
        p.addScreen(new Lc);
        F.notifyOnRender(M(a, a.render));
        r.addTimeTask(M(a, a.update), 0, .016666666666666666)
    };
    Math.__name__ = ["Math"];
    var Ic = function() {
        fa.call(this);
        this.set_x(p.gameWidth - 60);
        this.set_y(0);
        var a = S.getRegionByName("sprites", "assets_btn_pause.png");
        this.btn = new bb(100, 100);
        this.btn.setImage(B.images.sprites, a);
        this.btn.setOffset(-50, 10);
        this.btn.notifyDown(M(this, this.onPause));
        this.addComponent(this.btn)
    };
    m.PauseButton = Ic;
    Ic.__name__ = ["PauseButton"];
    Ic.__super__ = fa;
    Ic.prototype = T(fa.prototype, {
        btn: null,
        onPause: function(a) {
            L.instance.transitionToState(6)
        },
        __class__: Ic
    });
    var Fc = function() {
        Ca.call(this);
        var a = p.gameWidth / 2,
            b = p.gameHeight / 2,
            c = S.getRegionByName("sprites", "assets_btn_play.png");
        this.play = new fa(a, b);
        this.btn_play = new bb(150, 150);
        this.btn_play.tag = "pause screen button play";
        this.btn_play.setImage(B.images.sprites, c);
        this.btn_play.setOffset(-75, -75);
        this.btn_play.notifyUp(M(this, this.onClickPlay));
        this.play.addComponent(this.btn_play);
        this.addToFront(this.play)
    };
    m.PauseScreen = Fc;
    Fc.__name__ = ["PauseScreen"];
    Fc.__super__ = Ca;
    Fc.prototype = T(Ca.prototype, {
        play: null,
        btn_play: null,
        update: function() {
            Ca.prototype.update.call(this);
            if (this.btn_play.active && D.keysDown.exists("z")) this.onClickPlay(null)
        },
        onClickPlay: function(a) {
            this.close()
        },
        open: function() {
            var a = this;
            Ca.prototype.open.call(this);
            N.tween(this.play, {
                x: {
                    from: -300,
                    to: p.gameWidth / 2
                }
            }, .2, 5, null, function() {
                a.btn_play.set_active(!0)
            })
        },
        close: function() {
            Ca.prototype.close.call(this);
            this.btn_play.set_active(!1);
            N.tween(this.play, {
                x: {
                    from: p.gameWidth / 2,
                    to: p.gameWidth + 300
                }
            }, .2, 4, null, function() {
                L.instance.transitionToState(3)
            })
        },
        __class__: Fc
    });
    var Q = function() {};
    m.Reflect = Q;
    Q.__name__ = ["Reflect"];
    Q.field = function(a, b) {
        try {
            return a[b]
        } catch (c) {
            return c instanceof u && (c = c.val), null
        }
    };
    Q.setField = function(a, b, c) {
        a[b] = c
    };
    Q.getProperty = function(a, b) {
        var c;
        return null == a ? null : a.__properties__ && (c = a.__properties__["get_" + b]) ? a[c]() : a[b]
    };
    Q.setProperty = function(a, b, c) {
        var d;
        if (a.__properties__ && (d = a.__properties__["set_" + b])) a[d](c);
        else a[b] = c
    };
    Q.callMethod = function(a, b, c) {
        return b.apply(a, c)
    };
    Q.fields = function(a) {
        var b = [];
        if (null != a) {
            var c = Object.prototype.hasOwnProperty,
                d;
            for (d in a) "__id__" != d && "hx__closures__" != d && c.call(a, d) && b.push(d)
        }
        return b
    };
    Q.isFunction = function(a) {
        return "function" == typeof a && !(a.__name__ || a.__ename__)
    };
    Q.deleteField = function(a, b) {
        if (!Object.prototype.hasOwnProperty.call(a, b)) return !1;
        delete a[b];
        return !0
    };
    var Cc = Eb.WynGame = function() {};
    m.JsInterface = Cc;
    Cc.__name__ = ["JsInterface"];
    Cc.onAdComplete = function() {};
    Cc.onShareComplete = function() {};
    var Gb = function() {};
    m.Reg = Gb;
    Gb.__name__ = ["Reg"];
    Gb.clearGame = function() {
        Gb.saveData("")
    };
    Gb.saveData = function(a) {
        try {
            dc.defaultFile().writeObject(a)
        } catch (b) {
            b instanceof u && (b = b.val), R.trace("error saving : " +
                E.string(b), {
                    fileName: "Reg.hx",
                    lineNumber: 66,
                    className: "Reg",
                    methodName: "saveData"
                })
        }
    };
    Gb.loadData = function() {
        return dc.defaultFile().readObject()
    };
    var Gc = function(a, b) {
        fa.call(this, a, b);
        var c = S.getRegionByName("sprites", "assets_shadow.png");
        this.sprite = new na(95.5, 33.5);
        this.sprite.setImage(B.images.sprites, c);
        this.sprite.setOffset(-47.75, -16.75);
        this.addComponent(this.sprite)
    };
    m.Shadow = Gc;
    Gc.__name__ = ["Shadow"];
    Gc.__super__ = fa;
    Gc.prototype = T(fa.prototype, {
        sprite: null,
        revive: function() {
            this.visible = this.active = !0
        },
        kill: function() {
            this.visible = this.active = !1
        },
        __class__: Gc
    });
    var E = function() {};
    m.Std = E;
    E.__name__ = ["Std"];
    E.string = function(a) {
        return G.__string_rec(a, "")
    };
    E["int"] = function(a) {
        return a | 0
    };
    E.parseInt = function(a) {
        var b = parseInt(a, 10);
        0 != b || 120 != v.cca(a, 1) && 88 != v.cca(a, 1) || (b = parseInt(a));
        return isNaN(b) ? null : b
    };
    E.parseFloat = function(a) {
        return parseFloat(a)
    };
    var hb = function() {
        this.b = ""
    };
    m.StringBuf = hb;
    hb.__name__ = ["StringBuf"];
    hb.prototype = {
        b: null,
        add: function(a) {
            this.b += E.string(a)
        },
        addSub: function(a, b, c) {
            this.b = null == c ? this.b + v.substr(a, b, null) : this.b + v.substr(a, b, c)
        },
        __class__: hb
    };
    var oa = function() {};
    m.StringTools = oa;
    oa.__name__ = ["StringTools"];
    oa.endsWith = function(a, b) {
        var c = b.length,
            d = a.length;
        return d >= c && v.substr(a, d - c, c) == b
    };
    oa.fastCodeAt = function(a, b) {
        return a.charCodeAt(b)
    };
    var Ec = function() {
        Ca.call(this);
        var a = p.gameWidth / 2,
            b = p.gameHeight / 2,
            c = S.getRegionByName("sprites", "assets_btn_play.png");
        this.play = new fa(a, b);
        this.btn_play = new bb(150, 150);
        this.btn_play.tag = "title button";
        this.btn_play.setImage(B.images.sprites, c);
        this.btn_play.setOffset(-75, -75);
        this.btn_play.notifyUp(M(this, this.onClickPlay));
        this.play.addComponent(this.btn_play);
        this.addToFront(this.play);
        if (!p.IS_MOBILE) {
            var a = new fa(a, b + 200),
                b = new na(100, 100),
                c = new na(100, 100),
                d = new na(100, 100),
                e = new na(100, 100),
                f = new na(100, 100),
                h = new na(100, 100),
                n = S.getRegionByName("sprites", "assets_key_z.png"),
                k = S.getRegionByName("sprites", "assets_key_x.png"),
                A = S.getRegionByName("sprites", "assets_key_c.png"),
                g = S.getRegionByName("sprites", "assets_key_j.png"),
                q = S.getRegionByName("sprites", "assets_key_k.png"),
                J = S.getRegionByName("sprites", "assets_key_l.png");
            b.setImage(B.images.sprites, n);
            c.setImage(B.images.sprites, k);
            d.setImage(B.images.sprites, A);
            e.setImage(B.images.sprites, g);
            f.setImage(B.images.sprites, q);
            h.setImage(B.images.sprites, J);
            b.offsetX = -190;
            b.offsetY = -50;
            c.offsetX = -50;
            c.offsetY = -50;
            d.offsetX = 90;
            d.offsetY = -50;
            e.offsetX = -190;
            e.offsetY = 60;
            f.offsetX = -50;
            f.offsetY = 60;
            h.offsetX = 90;
            h.offsetY = 60;
            a.addComponent(b);
            a.addComponent(c);
            a.addComponent(d);
            a.addComponent(e);
            a.addComponent(f);
            a.addComponent(h);
            this.addToFront(a)
        }
    };
    m.TitleScreen = Ec;
    Ec.__name__ = ["TitleScreen"];
    Ec.__super__ = Ca;
    Ec.prototype = T(Ca.prototype, {
        play: null,
        btn_play: null,
        update: function() {
            Ca.prototype.update.call(this);
            if (this.btn_play.active && D.keysDown.exists("z")) this.onClickPlay(null)
        },
        onClickPlay: function(a) {
            this.close()
        },
        open: function() {
            var a = this;
            Ca.prototype.open.call(this);
            N.tween(this.play, {
                x: {
                    from: -300,
                    to: p.gameWidth / 2
                }
            }, .2, 5, null, function() {
                a.btn_play.set_active(!0)
            })
        },
        close: function() {
            Ca.prototype.close.call(this);
            this.btn_play.set_active(!1);
            N.tween(this.play, {
                x: {
                    from: p.gameWidth / 2,
                    to: p.gameWidth + 300
                }
            }, .2, 4, null, function() {
                L.instance.transitionToState(3)
            })
        },
        __class__: Ec
    });
    var Hc = function(a, b, c, d) {
        fa.call(this, a, b);
        this.btn = new Ka(c, d);
        this.btn.notify(M(this, this.onDownTouchbox), M(this, this.onUpTouchbox), null, null);
        this.addComponent(this.btn)
    };
    m.Touchbox = Hc;
    Hc.__name__ = ["Touchbox"];
    Hc.__super__ = fa;
    Hc.prototype = T(fa.prototype, {
        btn: null,
        onDownTouchbox: function(a) {
            a = this.name.split("-");
            a = E.parseInt(a[1]);
            L.instance.onDownHero(a)
        },
        onUpTouchbox: function(a) {
            a = this.name.split("-");
            a = E.parseInt(a[1]);
            L.instance.onUpHero(a)
        },
        __class__: Hc
    });
    var U = m.ValueType = {
        __ename__: ["ValueType"],
        __constructs__: "TNull TInt TFloat TBool TObject TFunction TClass TEnum TUnknown".split(" ")
    };
    U.TNull = ["TNull", 0];
    U.TNull.toString = x;
    U.TNull.__enum__ = U;
    U.TInt = ["TInt", 1];
    U.TInt.toString = x;
    U.TInt.__enum__ = U;
    U.TFloat = ["TFloat", 2];
    U.TFloat.toString = x;
    U.TFloat.__enum__ = U;
    U.TBool = ["TBool", 3];
    U.TBool.toString = x;
    U.TBool.__enum__ = U;
    U.TObject = ["TObject", 4];
    U.TObject.toString = x;
    U.TObject.__enum__ = U;
    U.TFunction = ["TFunction", 5];
    U.TFunction.toString = x;
    U.TFunction.__enum__ = U;
    U.TClass = function(a) {
        a = ["TClass", 6, a];
        a.__enum__ = U;
        a.toString = x;
        return a
    };
    U.TEnum = function(a) {
        a = ["TEnum", 7, a];
        a.__enum__ = U;
        a.toString = x;
        return a
    };
    U.TUnknown = ["TUnknown", 8];
    U.TUnknown.toString = x;
    U.TUnknown.__enum__ = U;
    var V = function() {};
    m.Type = V;
    V.__name__ = ["Type"];
    V.getClassName = function(a) {
        a = a.__name__;
        return null == a ? null : a.join(".")
    };
    V.getEnumName = function(a) {
        return a.__ename__.join(".")
    };
    V.resolveClass = function(a) {
        a = m[a];
        return null != a && a.__name__ ? a : null
    };
    V.resolveEnum = function(a) {
        a = m[a];
        return null != a && a.__ename__ ? a : null
    };
    V.createEmptyInstance = function(a) {
        function b() {}
        b.prototype = a.prototype;
        return new b
    };
    V.createEnum = function(a, b, c) {
        var d = Q.field(a, b);
        if (null == d) throw new u("No such constructor " + b);
        if (Q.isFunction(d)) {
            if (null == c) throw new u("Constructor " + b + " need parameters");
            return Q.callMethod(a, d, c)
        }
        if (null != c && 0 != c.length) throw new u("Constructor " + b + " does not need parameters");
        return d
    };
    V.createEnumIndex = function(a, b, c) {
        var d = a.__constructs__[b];
        if (null == d) throw new u(b + " is not a valid enum constructor index");
        return V.createEnum(a, d, c)
    };
    V.getInstanceFields = function(a) {
        var b = [],
            c;
        for (c in a.prototype) b.push(c);
        v.remove(b, "__class__");
        v.remove(b, "__properties__");
        return b
    };
    V.getEnumConstructs = function(a) {
        return a.__constructs__.slice()
    };
    V["typeof"] = function(a) {
        switch (typeof a) {
            case "boolean":
                return U.TBool;
            case "string":
                return U.TClass(String);
            case "number":
                return Math.ceil(a) == a % 2147483648 ? U.TInt : U.TFloat;
            case "object":
                if (null == a) return U.TNull;
                var b = a.__enum__;
                if (null != b) return U.TEnum(b);
                a = G.getClass(a);
                return null != a ? U.TClass(a) : U.TObject;
            case "function":
                return a.__name__ || a.__ename__ ? U.TObject : U.TFunction;
            case "undefined":
                return U.TNull;
            default:
                return U.TUnknown
        }
    };
    var W = {};
    m["_UInt.UInt_Impl_"] = W;
    W.__name__ = ["_UInt", "UInt_Impl_"];
    W.gt = function(a, b) {
        var c = 0 > a;
        return c != 0 > b ? c : a > b
    };
    W.gte = function(a, b) {
        var c = 0 > a;
        return c != 0 > b ? c : a >= b
    };
    W.toFloat = function(a) {
        return 0 > a ? 4294967296 + a : a + 0
    };
    var H = function(a) {
        this.nodeType = a;
        this.children = [];
        this.attributeMap = new Ja
    };
    m.Xml = H;
    H.__name__ = ["Xml"];
    H.parse = function(a) {
        return ub.parse(a)
    };
    H.createElement = function(a) {
        var b = new H(H.Element);
        if (b.nodeType != H.Element) throw new u("Bad node type, expected Element but found " + b.nodeType);
        b.nodeName = a;
        return b
    };
    H.createPCData = function(a) {
        var b = new H(H.PCData);
        if (b.nodeType == H.Document || b.nodeType == H.Element) throw new u("Bad node type, unexpected " +
            b.nodeType);
        b.nodeValue = a;
        return b
    };
    H.createCData = function(a) {
        var b = new H(H.CData);
        if (b.nodeType == H.Document || b.nodeType == H.Element) throw new u("Bad node type, unexpected " + b.nodeType);
        b.nodeValue = a;
        return b
    };
    H.createComment = function(a) {
        var b = new H(H.Comment);
        if (b.nodeType == H.Document || b.nodeType == H.Element) throw new u("Bad node type, unexpected " + b.nodeType);
        b.nodeValue = a;
        return b
    };
    H.createDocType = function(a) {
        var b = new H(H.DocType);
        if (b.nodeType == H.Document || b.nodeType == H.Element) throw new u("Bad node type, unexpected " +
            b.nodeType);
        b.nodeValue = a;
        return b
    };
    H.createProcessingInstruction = function(a) {
        var b = new H(H.ProcessingInstruction);
        if (b.nodeType == H.Document || b.nodeType == H.Element) throw new u("Bad node type, unexpected " + b.nodeType);
        b.nodeValue = a;
        return b
    };
    H.createDocument = function() {
        return new H(H.Document)
    };
    H.prototype = {
        nodeType: null,
        nodeName: null,
        nodeValue: null,
        parent: null,
        children: null,
        attributeMap: null,
        get_nodeName: function() {
            if (this.nodeType != H.Element) throw new u("Bad node type, expected Element but found " +
                this.nodeType);
            return this.nodeName
        },
        get: function(a) {
            if (this.nodeType != H.Element) throw new u("Bad node type, expected Element but found " + this.nodeType);
            return this.attributeMap.get(a)
        },
        set: function(a, b) {
            if (this.nodeType != H.Element) throw new u("Bad node type, expected Element but found " + this.nodeType);
            this.attributeMap.set(a, b)
        },
        exists: function(a) {
            if (this.nodeType != H.Element) throw new u("Bad node type, expected Element but found " + this.nodeType);
            return this.attributeMap.exists(a)
        },
        elementsNamed: function(a) {
            if (this.nodeType != H.Document && this.nodeType != H.Element) throw new u("Bad node type, expected Element or Document but found " + this.nodeType);
            for (var b = [], c = 0, d = this.children; c < d.length;) {
                var e = d[c];
                ++c;
                var f;
                if (f = e.nodeType == H.Element) {
                    f = void 0;
                    if (e.nodeType != H.Element) throw new u("Bad node type, expected Element but found " + e.nodeType);
                    f = e.nodeName;
                    f = f == a
                }
                f && b.push(e)
            }
            return v.iter(b)
        },
        firstElement: function() {
            if (this.nodeType != H.Document && this.nodeType != H.Element) throw new u("Bad node type, expected Element or Document but found " +
                this.nodeType);
            for (var a = 0, b = this.children; a < b.length;) {
                var c = b[a];
                ++a;
                if (c.nodeType == H.Element) return c
            }
            return null
        },
        addChild: function(a) {
            if (this.nodeType != H.Document && this.nodeType != H.Element) throw new u("Bad node type, expected Element or Document but found " + this.nodeType);
            null != a.parent && a.parent.removeChild(a);
            this.children.push(a);
            a.parent = this
        },
        removeChild: function(a) {
            if (this.nodeType != H.Document && this.nodeType != H.Element) throw new u("Bad node type, expected Element or Document but found " +
                this.nodeType);
            return v.remove(this.children, a) ? (a.parent = null, !0) : !1
        },
        __class__: H,
        __properties__: {
            get_nodeName: "get_nodeName"
        }
    };
    var ec = function() {};
    m["haxe.IMap"] = ec;
    ec.__name__ = ["haxe", "IMap"];
    ec.prototype = {
        get: null,
        set: null,
        exists: null,
        __class__: ec
    };
    var R = function() {};
    m["haxe.Log"] = R;
    R.__name__ = ["haxe", "Log"];
    R.trace = function(a, b) {
        G.__trace(a, b)
    };
    var db = function() {
        this.buf = new hb;
        this.cache = [];
        this.useCache = db.USE_CACHE;
        this.useEnumIndex = db.USE_ENUM_INDEX;
        this.shash = new Ja;
        this.scount = 0
    };
    m["haxe.Serializer"] = db;
    db.__name__ = ["haxe", "Serializer"];
    db.run = function(a) {
        var b = new db;
        b.serialize(a);
        return b.toString()
    };
    db.prototype = {
        buf: null,
        cache: null,
        shash: null,
        scount: null,
        useCache: null,
        useEnumIndex: null,
        toString: function() {
            return this.buf.b
        },
        serializeString: function(a) {
            var b = this.shash.get(a);
            null != b ? (this.buf.b += "R", this.buf.b = null == b ? this.buf.b + "null" : this.buf.b + ("" + b)) : (this.shash.set(a, this.scount++), this.buf.b += "y", a = encodeURIComponent(a), this.buf.b = null == a.length ? this.buf.b + "null" : this.buf.b + ("" + a.length), this.buf.b += ":", this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a))
        },
        serializeRef: function(a) {
            for (var b = typeof a, c = 0, d = this.cache.length; c < d;) {
                var e = c++,
                    f = this.cache[e];
                if (typeof f == b && f == a) return this.buf.b += "r", this.buf.b = null == e ? this.buf.b + "null" : this.buf.b + ("" + e), !0
            }
            this.cache.push(a);
            return !1
        },
        serializeFields: function(a) {
            for (var b = 0, c = Q.fields(a); b < c.length;) {
                var d = c[b];
                ++b;
                this.serializeString(d);
                this.serialize(Q.field(a, d))
            }
            this.buf.b += "g"
        },
        serialize: function(a) {
            var b = V["typeof"](a);
            switch (b[1]) {
                case 0:
                    this.buf.b += "n";
                    break;
                case 1:
                    if (0 == a) {
                        this.buf.b += "z";
                        break
                    }
                    this.buf.b += "i";
                    this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a);
                    break;
                case 2:
                    isNaN(a) ? this.buf.b += "k" : isFinite(a) ? (this.buf.b += "d", this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a)) : this.buf.b = 0 > a ? this.buf.b + "m" : this.buf.b + "p";
                    break;
                case 3:
                    this.buf.b = a ? this.buf.b + "t" : this.buf.b + "f";
                    break;
                case 6:
                    b = b[2];
                    if (b == String) {
                        this.serializeString(a);
                        break
                    }
                    if (this.useCache && this.serializeRef(a)) break;
                    switch (b) {
                        case Array:
                            b = 0;
                            this.buf.b += "a";
                            for (var c = a.length, d = 0; d < c;) {
                                var e = d++;
                                null == a[e] ? b++ : (0 < b && (1 == b ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b = null == b ? this.buf.b + "null" : this.buf.b + ("" + b)), b = 0), this.serialize(a[e]))
                            }
                            0 < b && (1 == b ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b = null == b ? this.buf.b + "null" : this.buf.b + ("" + b)));
                            this.buf.b += "h";
                            break;
                        case Hb:
                            this.buf.b += "l";
                            a = a.h;
                            for (b = null; null != a;) b = a[0], a = a[1], this.serialize(b);
                            this.buf.b += "h";
                            break;
                        case Date:
                            this.buf.b += "v";
                            this.buf.add(a.getTime());
                            break;
                        case Ja:
                            this.buf.b += "b";
                            for (b = a.keys(); b.hasNext();) c = b.next(), this.serializeString(c), this.serialize(null != qb[c] ? a.getReserved(c) : a.h[c]);
                            this.buf.b += "h";
                            break;
                        case Fa:
                            this.buf.b += "q";
                            for (b = a.keys(); b.hasNext();) c = b.next(), this.buf.b += ":", this.buf.b = null == c ? this.buf.b + "null" : this.buf.b + ("" + c), this.serialize(a.h[c]);
                            this.buf.b += "h";
                            break;
                        case Jb:
                            this.buf.b += "M";
                            for (b = a.keys(); b.hasNext();) c = b.next(), d = Q.field(c, "__id__"), Q.deleteField(c, "__id__"), this.serialize(c), c.__id__ = d, this.serialize(a.h[c.__id__]);
                            this.buf.b += "h";
                            break;
                        case da:
                            d = 0;
                            e = a.length -
                                2;
                            b = new hb;
                            for (c = db.BASE64; d < e;) {
                                var f = a.get(d++),
                                    h = a.get(d++),
                                    n = a.get(d++);
                                b.add(c.charAt(f >> 2));
                                b.add(c.charAt((f << 4 | h >> 4) & 63));
                                b.add(c.charAt((h << 2 | n >> 6) & 63));
                                b.add(c.charAt(n & 63))
                            }
                            d == e ? (e = a.get(d++), a = a.get(d++), b.add(c.charAt(e >> 2)), b.add(c.charAt((e << 4 | a >> 4) & 63)), b.add(c.charAt(a << 2 & 63))) : d == e + 1 && (a = a.get(d++), b.add(c.charAt(a >> 2)), b.add(c.charAt(a << 4 & 63)));
                            a = b.b;
                            this.buf.b += "s";
                            this.buf.b = null == a.length ? this.buf.b + "null" : this.buf.b + ("" + a.length);
                            this.buf.b += ":";
                            this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a);
                            break;
                        default:
                            this.useCache && this.cache.pop(), null != a.hxSerialize ? (this.buf.b += "C", this.serializeString(V.getClassName(b)), this.useCache && this.cache.push(a), a.hxSerialize(this), this.buf.b += "g") : (this.buf.b += "c", this.serializeString(V.getClassName(b)), this.useCache && this.cache.push(a), this.serializeFields(a))
                    }
                    break;
                case 4:
                    if (G.__instanceof(a, ee)) a = V.getClassName(a), this.buf.b += "A", this.serializeString(a);
                    else if (G.__instanceof(a, fe)) this.buf.b += "B", this.serializeString(V.getEnumName(a));
                    else {
                        if (this.useCache && this.serializeRef(a)) break;
                        this.buf.b += "o";
                        this.serializeFields(a)
                    }
                    break;
                case 7:
                    b = b[2];
                    if (this.useCache) {
                        if (this.serializeRef(a)) break;
                        this.cache.pop()
                    }
                    this.buf.b = this.useEnumIndex ? this.buf.b + "j" : this.buf.b + "w";
                    this.serializeString(V.getEnumName(b));
                    this.useEnumIndex ? (this.buf.b += ":", this.buf.b += E.string(a[1])) : this.serializeString(a[0]);
                    this.buf.b += ":";
                    b = a.length;
                    this.buf.b += E.string(b - 2);
                    for (c = 2; c < b;) d = c++, this.serialize(a[d]);
                    this.useCache && this.cache.push(a);
                    break;
                case 5:
                    throw new u("Cannot serialize function");
                default:
                    throw new u("Cannot serialize " + E.string(a));
            }
        },
        __class__: db
    };
    var ra = function(a) {
        this.buf = a;
        this.length = a.length;
        this.pos = 0;
        this.scache = [];
        this.cache = [];
        a = ra.DEFAULT_RESOLVER;
        null == a && (a = V, ra.DEFAULT_RESOLVER = a);
        this.setResolver(a)
    };
    m["haxe.Unserializer"] = ra;
    ra.__name__ = ["haxe", "Unserializer"];
    ra.initCodes = function() {
        for (var a = [], b = 0, c = ra.BASE64.length; b < c;) {
            var d = b++;
            a[ra.BASE64.charCodeAt(d)] = d
        }
        return a
    };
    ra.run = function(a) {
        return (new ra(a)).unserialize()
    };
    ra.prototype = {
        buf: null,
        pos: null,
        length: null,
        cache: null,
        scache: null,
        resolver: null,
        setResolver: function(a) {
            this.resolver = null == a ? {
                resolveClass: function(a) {
                    return null
                },
                resolveEnum: function(a) {
                    return null
                }
            } : a
        },
        get: function(a) {
            return this.buf.charCodeAt(a)
        },
        readDigits: function() {
            for (var a = 0, b = !1, c = this.pos;;) {
                var d = this.buf.charCodeAt(this.pos);
                if (d != d) break;
                if (45 == d) {
                    if (this.pos != c) break;
                    b = !0
                } else {
                    if (48 > d || 57 < d) break;
                    a = 10 * a + (d - 48)
                }
                this.pos++
            }
            b && (a *= -1);
            return a
        },
        readFloat: function() {
            for (var a = this.pos;;) {
                var b = this.buf.charCodeAt(this.pos);
                if (43 <= b && 58 > b || 101 == b || 69 == b) this.pos++;
                else break
            }
            return E.parseFloat(v.substr(this.buf, a, this.pos - a))
        },
        unserializeObject: function(a) {
            for (;;) {
                if (this.pos >= this.length) throw new u("Invalid object");
                if (103 == this.buf.charCodeAt(this.pos)) break;
                var b = this.unserialize();
                if ("string" != typeof b) throw new u("Invalid object key");
                var c = this.unserialize();
                a[b] = c
            }
            this.pos++
        },
        unserializeEnum: function(a, b) {
            if (58 != this.get(this.pos++)) throw new u("Invalid enum format");
            var c = this.readDigits();
            if (0 == c) return V.createEnum(a, b);
            for (var d = []; 0 < c--;) d.push(this.unserialize());
            return V.createEnum(a, b, d)
        },
        unserialize: function() {
            switch (this.get(this.pos++)) {
                case 110:
                    return null;
                case 116:
                    return !0;
                case 102:
                    return !1;
                case 122:
                    return 0;
                case 105:
                    return this.readDigits();
                case 100:
                    return this.readFloat();
                case 121:
                    var a = this.readDigits();
                    if (58 != this.get(this.pos++) || this.length - this.pos < a) throw new u("Invalid string length");
                    var b = v.substr(this.buf, this.pos, a);
                    this.pos += a;
                    b = decodeURIComponent(b.split("+").join(" "));
                    this.scache.push(b);
                    return b;
                case 107:
                    return NaN;
                case 109:
                    return -Infinity;
                case 112:
                    return Infinity;
                case 97:
                    a = [];
                    for (this.cache.push(a);;) {
                        b = this.buf.charCodeAt(this.pos);
                        if (104 == b) {
                            this.pos++;
                            break
                        }
                        117 == b ? (this.pos++, b = this.readDigits(), a[a.length + b - 1] = null) : a.push(this.unserialize())
                    }
                    return a;
                case 111:
                    return a = {}, this.cache.push(a), this.unserializeObject(a), a;
                case 114:
                    a = this.readDigits();
                    if (0 > a || a >= this.cache.length) throw new u("Invalid reference");
                    return this.cache[a];
                case 82:
                    a = this.readDigits();
                    if (0 > a || a >= this.scache.length) throw new u("Invalid string reference");
                    return this.scache[a];
                case 120:
                    throw new u(this.unserialize());
                case 99:
                    a = this.unserialize();
                    b = this.resolver.resolveClass(a);
                    if (null == b) throw new u("Class not found " + a);
                    a = V.createEmptyInstance(b);
                    this.cache.push(a);
                    this.unserializeObject(a);
                    return a;
                case 119:
                    a = this.unserialize();
                    b = this.resolver.resolveEnum(a);
                    if (null == b) throw new u("Enum not found " + a);
                    a = this.unserializeEnum(b, this.unserialize());
                    this.cache.push(a);
                    return a;
                case 106:
                    a = this.unserialize();
                    b = this.resolver.resolveEnum(a);
                    if (null == b) throw new u("Enum not found " +
                        a);
                    this.pos++;
                    var c = this.readDigits(),
                        d = V.getEnumConstructs(b)[c];
                    if (null == d) throw new u("Unknown enum index " + a + "@" + c);
                    a = this.unserializeEnum(b, d);
                    this.cache.push(a);
                    return a;
                case 108:
                    a = new Hb;
                    for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) a.add(this.unserialize());
                    this.pos++;
                    return a;
                case 98:
                    a = new Ja;
                    for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) b = this.unserialize(), a.set(b, this.unserialize());
                    this.pos++;
                    return a;
                case 113:
                    a = new Fa;
                    this.cache.push(a);
                    for (b = this.get(this.pos++); 58 == b;) b = this.readDigits(), a.set(b, this.unserialize()), b = this.get(this.pos++);
                    if (104 != b) throw new u("Invalid IntMap format");
                    return a;
                case 77:
                    a = new Jb;
                    for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) b = this.unserialize(), a.set(b, this.unserialize());
                    this.pos++;
                    return a;
                case 118:
                    return 48 <= this.buf.charCodeAt(this.pos) && 57 >= this.buf.charCodeAt(this.pos) && 48 <= this.buf.charCodeAt(this.pos + 1) && 57 >= this.buf.charCodeAt(this.pos + 1) && 48 <= this.buf.charCodeAt(this.pos + 2) && 57 >= this.buf.charCodeAt(this.pos +
                        2) && 48 <= this.buf.charCodeAt(this.pos + 3) && 57 >= this.buf.charCodeAt(this.pos + 3) && 45 == this.buf.charCodeAt(this.pos + 4) ? (a = v.substr(this.buf, this.pos, 19), a = v.strDate(a), this.pos += 19) : (a = this.readFloat(), b = new Date, b.setTime(a), a = b), this.cache.push(a), a;
                case 115:
                    a = this.readDigits();
                    d = this.buf;
                    if (58 != this.get(this.pos++) || this.length - this.pos < a) throw new u("Invalid bytes length");
                    var e = ra.CODES;
                    null == e && (e = ra.initCodes(), ra.CODES = e);
                    for (var f = this.pos, h = a & 3, n = f + (a - h), b = da.alloc(3 * (a >> 2) + (2 <= h ? h - 1 : 0)), c = 0; f < n;) {
                        var k = e[oa.fastCodeAt(d, f++)],
                            A = e[oa.fastCodeAt(d, f++)];
                        b.set(c++, k << 2 | A >> 4);
                        k = e[oa.fastCodeAt(d, f++)];
                        b.set(c++, A << 4 | k >> 2);
                        A = e[oa.fastCodeAt(d, f++)];
                        b.set(c++, k << 6 | A)
                    }
                    2 <= h && (A = e[oa.fastCodeAt(d, f++)], n = e[oa.fastCodeAt(d, f++)], b.set(c++, A << 2 | n >> 4), 3 == h && (d = e[oa.fastCodeAt(d, f++)], b.set(c++, n << 4 | d >> 2)));
                    this.pos += a;
                    this.cache.push(b);
                    return b;
                case 67:
                    a = this.unserialize();
                    b = this.resolver.resolveClass(a);
                    if (null == b) throw new u("Class not found " + a);
                    a = V.createEmptyInstance(b);
                    this.cache.push(a);
                    a.hxUnserialize(this);
                    if (103 != this.get(this.pos++)) throw new u("Invalid custom data");
                    return a;
                case 65:
                    a = this.unserialize();
                    b = this.resolver.resolveClass(a);
                    if (null == b) throw new u("Class not found " + a);
                    return b;
                case 66:
                    a = this.unserialize();
                    b = this.resolver.resolveEnum(a);
                    if (null == b) throw new u("Enum not found " + a);
                    return b
            }
            this.pos--;
            throw new u("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
        },
        __class__: ra
    };
    var Fa = function() {
        this.h = {}
    };
    m["haxe.ds.IntMap"] = Fa;
    Fa.__name__ = ["haxe", "ds", "IntMap"];
    Fa.__interfaces__ = [ec];
    Fa.prototype = {
        h: null,
        set: function(a, b) {
            this.h[a] = b
        },
        get: function(a) {
            return this.h[a]
        },
        exists: function(a) {
            return this.h.hasOwnProperty(a)
        },
        remove: function(a) {
            if (!this.h.hasOwnProperty(a)) return !1;
            delete this.h[a];
            return !0
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) && a.push(b | 0);
            return v.iter(a)
        },
        iterator: function() {
            return {
                ref: this.h,
                it: this.keys(),
                hasNext: function() {
                    return this.it.hasNext()
                },
                next: function() {
                    var a = this.it.next();
                    return this.ref[a]
                }
            }
        },
        __class__: Fa
    };
    var Jb = function() {
        this.h = {};
        this.h.__keys__ = {}
    };
    m["haxe.ds.ObjectMap"] = Jb;
    Jb.__name__ = ["haxe", "ds", "ObjectMap"];
    Jb.__interfaces__ = [ec];
    Jb.prototype = {
        h: null,
        set: function(a, b) {
            var c = a.__id__ || (a.__id__ = ++Jb.count);
            this.h[c] = b;
            this.h.__keys__[c] = a
        },
        get: function(a) {
            return this.h[a.__id__]
        },
        exists: function(a) {
            return null != this.h.__keys__[a.__id__]
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h.__keys__) this.h.hasOwnProperty(b) && a.push(this.h.__keys__[b]);
            return v.iter(a)
        },
        __class__: Jb
    };
    var Ja = function() {
        this.h = {}
    };
    m["haxe.ds.StringMap"] = Ja;
    Ja.__name__ = ["haxe", "ds", "StringMap"];
    Ja.__interfaces__ = [ec];
    Ja.prototype = {
        h: null,
        rh: null,
        set: function(a, b) {
            null != qb[a] ? this.setReserved(a, b) : this.h[a] = b
        },
        get: function(a) {
            return null != qb[a] ? this.getReserved(a) : this.h[a]
        },
        exists: function(a) {
            return null != qb[a] ? this.existsReserved(a) : this.h.hasOwnProperty(a)
        },
        setReserved: function(a, b) {
            null == this.rh && (this.rh = {});
            this.rh["$" + a] = b
        },
        getReserved: function(a) {
            return null == this.rh ? null : this.rh["$" + a]
        },
        existsReserved: function(a) {
            return null == this.rh ? !1 : this.rh.hasOwnProperty("$" + a)
        },
        remove: function(a) {
            if (null != qb[a]) {
                a = "$" + a;
                if (null == this.rh || !this.rh.hasOwnProperty(a)) return !1;
                delete this.rh[a]
            } else {
                if (!this.h.hasOwnProperty(a)) return !1;
                delete this.h[a]
            }
            return !0
        },
        keys: function() {
            var a = this.arrayKeys();
            return v.iter(a)
        },
        arrayKeys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) && a.push(b);
            if (null != this.rh)
                for (b in this.rh) 36 == b.charCodeAt(0) && a.push(b.substr(1));
            return a
        },
        __class__: Ja
    };
    var da = function(a) {
        this.length = a.byteLength;
        this.b = new eb(a);
        this.b.bufferValue = a;
        a.hxBytes = this;
        a.bytes = this.b
    };
    m["haxe.io.Bytes"] = da;
    da.__name__ = ["haxe", "io", "Bytes"];
    da.alloc = function(a) {
        return new da(new Md(a))
    };
    da.ofString = function(a) {
        for (var b = [], c = 0; c < a.length;) {
            var d = oa.fastCodeAt(a, c++);
            55296 <= d && 56319 >= d && (d = d - 55232 << 10 | oa.fastCodeAt(a, c++) & 1023);
            127 >= d ? b.push(d) : (2047 >= d ? b.push(192 | d >> 6) : (65535 >= d ? b.push(224 | d >> 12) : (b.push(240 | d >> 18), b.push(128 | d >> 12 & 63)), b.push(128 | d >> 6 & 63)), b.push(128 | d & 63))
        }
        return new da((new eb(b)).buffer)
    };
    da.ofData = function(a) {
        var b = a.hxBytes;
        return null != b ? b : new da(a)
    };
    da.prototype = {
        length: null,
        b: null,
        data: null,
        get: function(a) {
            return this.b[a]
        },
        set: function(a, b) {
            this.b[a] = b & 255
        },
        sub: function(a, b) {
            if (0 > a || 0 > b || a + b > this.length) throw new u(ya.OutsideBounds);
            return new da(this.b.buffer.slice(a + this.b.byteOffset, a + this.b.byteOffset + b))
        },
        getDouble: function(a) {
            null == this.data && (this.data = new DataView(this.b.buffer, this.b.byteOffset, this.b.byteLength));
            return this.data.getFloat64(a, !0)
        },
        getFloat: function(a) {
            null == this.data && (this.data = new DataView(this.b.buffer, this.b.byteOffset, this.b.byteLength));
            return this.data.getFloat32(a, !0)
        },
        setDouble: function(a, b) {
            null == this.data && (this.data = new DataView(this.b.buffer, this.b.byteOffset, this.b.byteLength));
            this.data.setFloat64(a, b, !0)
        },
        getUInt16: function(a) {
            null == this.data && (this.data = new DataView(this.b.buffer, this.b.byteOffset, this.b.byteLength));
            return this.data.getUint16(a, !0)
        },
        getInt32: function(a) {
            null == this.data && (this.data = new DataView(this.b.buffer, this.b.byteOffset, this.b.byteLength));
            return this.data.getInt32(a, !0)
        },
        setInt32: function(a, b) {
            null == this.data && (this.data = new DataView(this.b.buffer, this.b.byteOffset, this.b.byteLength));
            this.data.setInt32(a, b, !0)
        },
        getString: function(a, b) {
            if (0 > a || 0 > b || a + b > this.length) throw new u(ya.OutsideBounds);
            for (var c = "", d = this.b, e = String.fromCharCode, f = a, h = a + b; f < h;) {
                var n = d[f++];
                if (128 > n) {
                    if (0 == n) break;
                    c += e(n)
                } else if (224 > n) c += e((n & 63) << 6 | d[f++] & 127);
                else if (240 > n) var k = d[f++],
                    c = c + e((n & 31) << 12 | (k & 127) << 6 | d[f++] & 127);
                else var k = d[f++],
                    A = d[f++],
                    n = (n & 15) << 18 | (k & 127) << 12 | (A & 127) << 6 | d[f++] & 127,
                    c = c + e((n >> 10) + 55232),
                    c = c + e(n & 1023 | 56320)
            }
            return c
        },
        toString: function() {
            return this.getString(0, this.length)
        },
        __class__: da
    };
    var Nc = function() {
        this.b = []
    };
    m["haxe.io.BytesBuffer"] = Nc;
    Nc.__name__ = ["haxe", "io", "BytesBuffer"];
    Nc.prototype = {
        b: null,
        addBytes: function(a, b, c) {
            if (0 > b || 0 > c || b + c > a.length) throw new u(ya.OutsideBounds);
            a = a.b;
            var d = b;
            for (b += c; d < b;) c = d++, this.b.push(a[c])
        },
        getBytes: function() {
            var a = new da((new eb(this.b)).buffer);
            this.b = null;
            return a
        },
        __class__: Nc
    };
    var Oc = function() {};
    m["haxe.io.Input"] = Oc;
    Oc.__name__ = ["haxe", "io", "Input"];
    Oc.prototype = {
        bigEndian: null,
        readByte: function() {
            throw new u("Not implemented");
        },
        readBytes: function(a, b, c) {
            var d = c,
                e = a.b;
            if (0 > b || 0 > c || b + c > a.length) throw new u(ya.OutsideBounds);
            for (; 0 < d;) e[b] = this.readByte(), b++, d--;
            return c
        },
        readFullBytes: function(a, b, c) {
            for (; 0 < c;) {
                var d = this.readBytes(a, b, c);
                b += d;
                c -= d
            }
        },
        read: function(a) {
            for (var b = da.alloc(a), c = 0; 0 < a;) {
                var d = this.readBytes(b, c, a);
                if (0 == d) throw new u(ya.Blocked);
                c += d;
                a -= d
            }
            return b
        },
        readInt32: function() {
            var a = this.readByte(),
                b = this.readByte(),
                c = this.readByte(),
                d = this.readByte();
            return this.bigEndian ? d | c << 8 | b << 16 | a << 24 : a | b << 8 | c << 16 | d << 24
        },
        readString: function(a) {
            var b = da.alloc(a);
            this.readFullBytes(b, 0, a);
            return b.toString()
        },
        __class__: Oc
    };
    var Ub = function(a, b, c) {
        null == b && (b = 0);
        null == c && (c = a.length - b);
        if (0 > b || 0 > c || b + c > a.length) throw new u(ya.OutsideBounds);
        this.b = a.b;
        this.pos = b;
        this.totlen = this.len = c
    };
    m["haxe.io.BytesInput"] = Ub;
    Ub.__name__ = ["haxe", "io", "BytesInput"];
    Ub.__super__ = Oc;
    Ub.prototype = T(Oc.prototype, {
        b: null,
        pos: null,
        len: null,
        totlen: null,
        set_position: function(a) {
            0 > a ? a = 0 : a > this.totlen && (a = this.totlen);
            this.len = this.totlen - a;
            return this.pos = a
        },
        readByte: function() {
            if (0 == this.len) throw new u(new Kb);
            this.len--;
            return this.b[this.pos++]
        },
        readBytes: function(a, b, c) {
            if (0 > b || 0 > c || b + c > a.length) throw new u(ya.OutsideBounds);
            if (0 == this.len && 0 < c) throw new u(new Kb);
            this.len < c && (c = this.len);
            var d = this.b;
            a = a.b;
            for (var e = 0; e < c;) {
                var f = e++;
                a[b + f] = d[this.pos + f]
            }
            this.pos += c;
            this.len -= c;
            return c
        },
        __class__: Ub,
        __properties__: {
            set_position: "set_position"
        }
    });
    var Pc = function() {};
    m["haxe.io.Output"] = Pc;
    Pc.__name__ = ["haxe", "io", "Output"];
    Pc.prototype = {
        bigEndian: null,
        writeByte: function(a) {
            throw new u("Not implemented");
        },
        writeBytes: function(a, b, c) {
            var d = c,
                e = a.b.bufferValue;
            if (0 > b || 0 > c || b + c > a.length) throw new u(ya.OutsideBounds);
            for (; 0 < d;) this.writeByte(e[b]), b++, d--;
            return c
        },
        write: function(a) {
            for (var b = a.length, c = 0; 0 < b;) {
                var d = this.writeBytes(a, c, b);
                if (0 == d) throw new u(ya.Blocked);
                c += d;
                b -= d
            }
        },
        writeInt32: function(a) {
            this.bigEndian ? (this.writeByte(a >>> 24), this.writeByte(a >> 16 & 255), this.writeByte(a >> 8 & 255), this.writeByte(a & 255)) : (this.writeByte(a & 255), this.writeByte(a >> 8 & 255), this.writeByte(a >> 16 & 255), this.writeByte(a >>> 24))
        },
        __class__: Pc
    };
    var fc = function() {
        this.b = new Nc
    };
    m["haxe.io.BytesOutput"] = fc;
    fc.__name__ = ["haxe", "io", "BytesOutput"];
    fc.__super__ = Pc;
    fc.prototype = T(Pc.prototype, {
        b: null,
        writeByte: function(a) {
            this.b.b.push(a)
        },
        writeBytes: function(a, b, c) {
            this.b.addBytes(a, b, c);
            return c
        },
        getBytes: function() {
            return this.b.getBytes()
        },
        __class__: fc
    });
    var Kb = function() {};
    m["haxe.io.Eof"] = Kb;
    Kb.__name__ = ["haxe", "io", "Eof"];
    Kb.prototype = {
        toString: function() {
            return "Eof"
        },
        __class__: Kb
    };
    var ya = m["haxe.io.Error"] = {
        __ename__: ["haxe", "io", "Error"],
        __constructs__: ["Blocked", "Overflow", "OutsideBounds", "Custom"]
    };
    ya.Blocked = ["Blocked", 0];
    ya.Blocked.toString = x;
    ya.Blocked.__enum__ = ya;
    ya.Overflow = ["Overflow", 1];
    ya.Overflow.toString = x;
    ya.Overflow.__enum__ = ya;
    ya.OutsideBounds = ["OutsideBounds", 2];
    ya.OutsideBounds.toString = x;
    ya.OutsideBounds.__enum__ = ya;
    ya.Custom = function(a) {
        a = ["Custom", 3, a];
        a.__enum__ = ya;
        a.toString = x;
        return a
    };
    var Nd = function() {};
    m["haxe.io.FPHelper"] = Nd;
    Nd.__name__ = ["haxe", "io", "FPHelper"];
    Nd.floatToI32 = function(a) {
        if (0 == a) return 0;
        var b;
        b = 0 > a ? -a : a;
        var c = Math.floor(Math.log(b) / .6931471805599453); - 127 > c ? c = -127 : 128 < c && (c = 128);
        return (0 > a ? -2147483648 : 0) | c + 127 << 23 | Math.round(8388608 * (b / Math.pow(2, c) - 1)) & 8388607
    };
    var hd = function(a) {
        this.__x = a
    };
    m["haxe.xml._Fast.NodeAccess"] = hd;
    hd.__name__ = ["haxe", "xml", "_Fast", "NodeAccess"];
    hd.prototype = {
        __x: null,
        resolve: function(a) {
            var b = this.__x.elementsNamed(a).next();
            if (null == b) throw b = this.__x.nodeType == H.Document ? "Document" : this.__x.get_nodeName(), new u(b + " is missing element " + a);
            return new Vb(b)
        },
        __class__: hd
    };
    var id = function(a) {
        this.__x = a
    };
    m["haxe.xml._Fast.AttribAccess"] = id;
    id.__name__ = ["haxe", "xml", "_Fast", "AttribAccess"];
    id.prototype = {
        __x: null,
        resolve: function(a) {
            if (this.__x.nodeType == H.Document) throw new u("Cannot access document attribute " +
                a);
            var b = this.__x.get(a);
            if (null == b) throw new u(this.__x.get_nodeName() + " is missing attribute " + a);
            return b
        },
        __class__: id
    };
    var jd = function(a) {
        this.__x = a
    };
    m["haxe.xml._Fast.HasAttribAccess"] = jd;
    jd.__name__ = ["haxe", "xml", "_Fast", "HasAttribAccess"];
    jd.prototype = {
        __x: null,
        __class__: jd
    };
    var kd = function(a) {
        this.__x = a
    };
    m["haxe.xml._Fast.HasNodeAccess"] = kd;
    kd.__name__ = ["haxe", "xml", "_Fast", "HasNodeAccess"];
    kd.prototype = {
        __x: null,
        resolve: function(a) {
            return this.__x.elementsNamed(a).hasNext()
        },
        __class__: kd
    };
    var ld = function(a) {
        this.__x = a
    };
    m["haxe.xml._Fast.NodeListAccess"] = ld;
    ld.__name__ = ["haxe", "xml", "_Fast", "NodeListAccess"];
    ld.prototype = {
        __x: null,
        resolve: function(a) {
            var b = new Hb;
            for (a = this.__x.elementsNamed(a); a.hasNext();) {
                var c = a.next();
                b.add(new Vb(c))
            }
            return b
        },
        __class__: ld
    };
    var Vb = function(a) {
        if (a.nodeType != H.Document && a.nodeType != H.Element) throw new u("Invalid nodeType " + a.nodeType);
        this.x = a;
        this.node = new hd(a);
        this.nodes = new ld(a);
        this.att = new id(a);
        this.has = new jd(a);
        this.hasNode = new kd(a)
    };
    m["haxe.xml.Fast"] = Vb;
    Vb.__name__ = ["haxe", "xml", "Fast"];
    Vb.prototype = {
        x: null,
        node: null,
        nodes: null,
        att: null,
        has: null,
        hasNode: null,
        __class__: Vb
    };
    var ub = function() {};
    m["haxe.xml.Parser"] = ub;
    ub.__name__ = ["haxe", "xml", "Parser"];
    ub.parse = function(a, b) {
        null == b && (b = !1);
        var c = H.createDocument();
        ub.doParse(a, b, 0, c);
        return c
    };
    ub.doParse = function(a, b, c, d) {
        null == c && (c = 0);
        for (var e = null, f = 1, h = 1, n = null, k = 0, A = 0, g = 0, q = a.charCodeAt(c), J = new hb, l = 1, m = -1; q == q;) {
            switch (f) {
                case 0:
                    switch (q) {
                        case 10:
                        case 13:
                        case 9:
                        case 32:
                            break;
                        default:
                            f = h;
                            continue
                    }
                    break;
                case 1:
                    switch (q) {
                        case 60:
                            f = 0;
                            h = 2;
                            break;
                        default:
                            k = c;
                            f = 13;
                            continue
                    }
                    break;
                case 13:
                    60 == q ? (J.addSub(a, k, c - k), h = H.createPCData(J.b), J = new hb, d.addChild(h), A++, f = 0, h = 2) : 38 == q && (J.addSub(a, k, c - k), f = 18, l = 13, k = c + 1);
                    break;
                case 17:
                    93 == q && 93 == a.charCodeAt(c + 1) && 62 == a.charCodeAt(c + 2) && (q = H.createCData(v.substr(a, k, c - k)), d.addChild(q), A++, c += 2, f = 1);
                    break;
                case 2:
                    switch (q) {
                        case 33:
                            if (91 == a.charCodeAt(c + 1)) {
                                c += 2;
                                if ("CDATA[" != v.substr(a, c, 6).toUpperCase()) throw new u("Expected <![CDATA[");
                                c += 5;
                                f = 17
                            } else if (68 == a.charCodeAt(c + 1) || 100 == a.charCodeAt(c + 1)) {
                                if ("OCTYPE" != v.substr(a, c + 2, 6).toUpperCase()) throw new u("Expected <!DOCTYPE");
                                c += 8;
                                f = 16
                            } else {
                                if (45 != a.charCodeAt(c + 1) || 45 != a.charCodeAt(c + 2)) throw new u("Expected \x3c!--");
                                c += 2;
                                f = 15
                            }
                            k = c + 1;
                            break;
                        case 63:
                            f = 14;
                            k = c;
                            break;
                        case 47:
                            if (null == d) throw new u("Expected node name");
                            k = c + 1;
                            f = 0;
                            h = 10;
                            break;
                        default:
                            f = 3;
                            k = c;
                            continue
                    }
                    break;
                case 3:
                    if (!(97 <= q && 122 >= q || 65 <= q && 90 >= q || 48 <= q && 57 >= q || 58 == q || 46 == q || 95 == q || 45 == q)) {
                        if (c == k) throw new u("Expected node name");
                        e = H.createElement(v.substr(a, k, c - k));
                        d.addChild(e);
                        A++;
                        f = 0;
                        h = 4;
                        continue
                    }
                    break;
                case 4:
                    switch (q) {
                        case 47:
                            f = 11;
                            break;
                        case 62:
                            f = 9;
                            break;
                        default:
                            f = 5;
                            k = c;
                            continue
                    }
                    break;
                case 5:
                    if (!(97 <= q && 122 >= q || 65 <= q && 90 >= q || 48 <= q && 57 >= q || 58 == q || 46 == q || 95 == q || 45 == q)) {
                        if (k == c) throw new u("Expected attribute name");
                        n = v.substr(a, k, c - k);
                        if (e.exists(n)) throw new u("Duplicate attribute");
                        f = 0;
                        h = 6;
                        continue
                    }
                    break;
                case 6:
                    switch (q) {
                        case 61:
                            f = 0;
                            h = 7;
                            break;
                        default:
                            throw new u("Expected =");
                    }
                    break;
                case 7:
                    switch (q) {
                        case 34:
                        case 39:
                            J = new hb;
                            f = 8;
                            k = c + 1;
                            m = q;
                            break;
                        default:
                            throw new u('Expected "');
                    }
                    break;
                case 8:
                    switch (q) {
                        case 38:
                            J.addSub(a, k, c - k);
                            f = 18;
                            l = 8;
                            k = c + 1;
                            break;
                        case 62:
                            if (b) throw new u("Invalid unescaped " + String.fromCharCode(q) + " in attribute value");
                            q == m && (J.addSub(a, k, c - k), h = J.b, J = new hb, e.set(n, h), f = 0, h = 4);
                            break;
                        case 60:
                            if (b) throw new u("Invalid unescaped " + String.fromCharCode(q) + " in attribute value");
                            q == m && (J.addSub(a, k, c - k), h = J.b, J = new hb, e.set(n, h), f = 0, h = 4);
                            break;
                        default:
                            q == m && (J.addSub(a, k, c - k), h = J.b, J = new hb, e.set(n, h), f = 0, h = 4)
                    }
                    break;
                case 9:
                    k = c = ub.doParse(a, b, c, e);
                    f = 1;
                    break;
                case 11:
                    switch (q) {
                        case 62:
                            f = 1;
                            break;
                        default:
                            throw new u("Expected >");
                    }
                    break;
                case 12:
                    switch (q) {
                        case 62:
                            return 0 == A && d.addChild(H.createPCData("")), c;
                        default:
                            throw new u("Expected >");
                    }
                case 10:
                    if (!(97 <= q && 122 >= q || 65 <= q && 90 >= q || 48 <= q && 57 >= q || 58 == q || 46 == q || 95 == q || 45 == q)) {
                        if (k == c) throw new u("Expected node name");
                        h = v.substr(a, k, c - k);
                        if (d.nodeType != H.Element) throw new u("Bad node type, expected Element but found " + d.nodeType);
                        if (h != d.nodeName) {
                            c = u;
                            if (d.nodeType != H.Element) throw "Bad node type, expected Element but found " + d.nodeType;
                            throw new c("Expected </" + d.nodeName + ">");
                        }
                        f = 0;
                        h = 12;
                        continue
                    }
                    break;
                case 15:
                    45 == q && 45 == a.charCodeAt(c + 1) && 62 == a.charCodeAt(c + 2) && (q = H.createComment(v.substr(a, k, c - k)), d.addChild(q), A++, c += 2, f = 1);
                    break;
                case 16:
                    91 == q ? g++ : 93 == q ? g-- : 62 == q && 0 == g && (q = H.createDocType(v.substr(a, k, c - k)), d.addChild(q), A++, f = 1);
                    break;
                case 14:
                    63 == q && 62 == a.charCodeAt(c + 1) && (c++, q = v.substr(a, k + 1, c - k - 2), q = H.createProcessingInstruction(q), d.addChild(q), A++, f = 1);
                    break;
                case 18:
                    if (59 == q) {
                        k = v.substr(a, k, c - k);
                        if (35 == k.charCodeAt(0)) k = 120 == k.charCodeAt(1) ? E.parseInt("0" + v.substr(k, 1, k.length - 1)) : E.parseInt(v.substr(k, 1, k.length - 1)), J.b += String.fromCharCode(k);
                        else if (ub.escapes.exists(k)) J.add(ub.escapes.get(k));
                        else {
                            if (b) throw new u("Undefined entity: " + k);
                            J.b += E.string("&" + k + ";")
                        }
                        k = c + 1;
                        f = l
                    } else if (!(97 <= q && 122 >= q || 65 <= q && 90 >= q || 48 <= q && 57 >= q || 58 == q || 46 == q || 95 == q || 45 == q) && 35 != q) {
                        if (b) throw new u("Invalid character in entity: " + String.fromCharCode(q));
                        J.b += "&";
                        J.addSub(a, k, c - k);
                        c--;
                        k = c + 1;
                        f = l
                    }
            }
            q = oa.fastCodeAt(a, ++c)
        }
        1 == f && (k = c, f = 13);
        if (13 == f) {
            if (c != k || 0 == A) J.addSub(a, k, c - k), a = H.createPCData(J.b), d.addChild(a);
            return c
        }
        if (!b && 18 == f && 13 == l) return J.b += "&", J.addSub(a, k, c - k), a = H.createPCData(J.b), d.addChild(a), c;
        throw new u("Unexpected end");
    };
    var u = function(a) {
        Error.call(this);
        this.val = a;
        this.message = String(a);
        Error.captureStackTrace && Error.captureStackTrace(this, u)
    };
    m["js._Boot.HaxeError"] = u;
    u.__name__ = ["js", "_Boot", "HaxeError"];
    u.__super__ = Error;
    u.prototype = T(Error.prototype, {
        val: null,
        __class__: u
    });
    var G = function() {};
    m["js.Boot"] = G;
    G.__name__ = ["js", "Boot"];
    G.__unhtml = function(a) {
        return a.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;")
    };
    G.__trace = function(a, b) {
        var c;
        c = null != b ? b.fileName + ":" + b.lineNumber + ": " : "";
        c += G.__string_rec(a, "");
        if (null != b && null != b.customParams)
            for (var d = 0, e = b.customParams; d < e.length;) {
                var f = e[d];
                ++d;
                c += "," + G.__string_rec(f, "")
            }
        var h;
        "undefined" != typeof document && null != (h = document.getElementById("haxe:trace")) ? h.innerHTML += G.__unhtml(c) + "<br/>" : "undefined" != typeof $d && null != $d.log && $d.log(c)
    };
    G.getClass = function(a) {
        if (a instanceof Array && null == a.__enum__) return Array;
        var b = a.__class__;
        if (null != b) return b;
        a = G.__nativeClassName(a);
        return null != a ? G.__resolveNativeClass(a) : null
    };
    G.__string_rec = function(a, b) {
        if (null == a) return "null";
        if (5 <= b.length) return "<...>";
        var c = typeof a;
        "function" == c && (a.__name__ || a.__ename__) && (c = "object");
        switch (c) {
            case "object":
                if (a instanceof Array) {
                    if (a.__enum__) {
                        if (2 == a.length) return a[0];
                        c = a[0] + "(";
                        b += "\t";
                        for (var d = 2, e = a.length; d < e;) var f = d++,
                            c = 2 != f ? c + ("," + G.__string_rec(a[f], b)) : c + G.__string_rec(a[f], b);
                        return c + ")"
                    }
                    c = a.length;
                    d = "[";
                    b += "\t";
                    for (e = 0; e < c;) f = e++, d += (0 < f ? "," : "") + G.__string_rec(a[f], b);
                    return d + "]"
                }
                try {
                    d = a.toString
                } catch (h) {
                    return h instanceof u && (h = h.val), "???"
                }
                if (null != d && d != Object.toString && "function" == typeof d && (c = a.toString(), "[object Object]" != c)) return c;
                c = null;
                d = "{\n";
                b += "\t";
                e = null != a.hasOwnProperty;
                for (c in a) e && !a.hasOwnProperty(c) || "prototype" == c || "__class__" == c || "__super__" == c || "__interfaces__" == c || "__properties__" == c || (2 != d.length && (d += ", \n"), d += b + c + " : " + G.__string_rec(a[c], b));
                b = b.substring(1);
                return d + ("\n" + b + "}");
            case "function":
                return "<function>";
            case "string":
                return a;
            default:
                return String(a)
        }
    };
    G.__interfLoop = function(a, b) {
        if (null == a) return !1;
        if (a == b) return !0;
        var c = a.__interfaces__;
        if (null != c)
            for (var d = 0, e = c.length; d < e;) {
                var f = d++,
                    f = c[f];
                if (f == b || G.__interfLoop(f, b)) return !0
            }
        return G.__interfLoop(a.__super__, b)
    };
    G.__instanceof = function(a, b) {
        if (null == b) return !1;
        switch (b) {
            case je:
                return (a | 0) === a;
            case ge:
                return "number" == typeof a;
            case he:
                return "boolean" == typeof a;
            case String:
                return "string" == typeof a;
            case Array:
                return a instanceof Array && null == a.__enum__;
            case ke:
                return !0;
            default:
                if (null != a)
                    if ("function" == typeof b) {
                        if (a instanceof b || G.__interfLoop(G.getClass(a), b)) return !0
                    } else {
                        if ("object" == typeof b && G.__isNativeObj(b) && a instanceof b) return !0
                    } else return !1;
                return b == ee && null != a.__name__ || b == fe && null != a.__ename__ ? !0 : a.__enum__ == b
        }
    };
    G.__cast = function(a, b) {
        if (G.__instanceof(a, b)) return a;
        throw new u("Cannot cast " + E.string(a) + " to " + E.string(b));
    };
    G.__nativeClassName = function(a) {
        a = G.__toStr.call(a).slice(8, -1);
        return "Object" == a || "Function" == a || "Math" == a || "JSON" == a ? null : a
    };
    G.__isNativeObj = function(a) {
        return null != G.__nativeClassName(a)
    };
    G.__resolveNativeClass = function(a) {
        return Function("return typeof " + a + ' != "undefined" ? ' + a + " : null")()
    };
    var ib = function(a) {
        if (a instanceof Array && null == a.__enum__) this.a = a, this.byteLength = a.length;
        else {
            this.a = [];
            for (var b = 0; b < a;) {
                var c = b++;
                this.a[c] = 0
            }
            this.byteLength = a
        }
    };
    m["js.html.compat.ArrayBuffer"] = ib;
    ib.__name__ = ["js", "html", "compat", "ArrayBuffer"];
    ib.sliceImpl = function(a, b) {
        var c = new eb(this, a, null == b ? null : b - a),
            d = new Md(c.byteLength);
        (new eb(d)).set(c);
        return d
    };
    ib.prototype = {
        byteLength: null,
        a: null,
        slice: function(a, b) {
            return new ib(this.a.slice(a, b))
        },
        __class__: ib
    };
    var vb = function() {};
    m["js.html.compat.Uint8Array"] = vb;
    vb.__name__ = ["js", "html", "compat", "Uint8Array"];
    vb._new = function(a, b, c) {
        if ("number" == typeof a) {
            c = [];
            for (b = 0; b < a;) {
                var d = b++;
                c[d] = 0
            }
            c.byteLength = c.length;
            c.byteOffset = 0;
            c.buffer = new ib(c)
        } else if (G.__instanceof(a, ib)) null == b && (b = 0), null == c && (c = a.byteLength - b), c = 0 == b ? a.a : a.a.slice(b, b + c), c.byteLength = c.length, c.byteOffset = b, c.buffer = a;
        else if (a instanceof Array && null == a.__enum__) c = a.slice(), c.byteLength = c.length, c.byteOffset = 0, c.buffer = new ib(c);
        else throw new u("TODO " + E.string(a));
        c.subarray = vb._subarray;
        c.set = vb._set;
        return c
    };
    vb._set = function(a, b) {
        if (G.__instanceof(a.buffer, ib)) {
            if (a.byteLength +
                b > this.byteLength) throw new u("set() outside of range");
            for (var c = 0, d = a.byteLength; c < d;) {
                var e = c++;
                this[e + b] = a[e]
            }
        } else if (a instanceof Array && null == a.__enum__) {
            if (a.length + b > this.byteLength) throw new u("set() outside of range");
            c = 0;
            for (d = a.length; c < d;) e = c++, this[e + b] = a[e]
        } else throw new u("TODO");
    };
    vb._subarray = function(a, b) {
        var c = vb._new(this.slice(a, b));
        c.byteOffset = a;
        return c
    };
    var gc = function() {
        this.spritesDescription = {
            files: ["img/sprites.png?=3"],
            original_height: 1024,
            type: "image",
            original_width: 1024,
            name: "sprites"
        };
        this.spritesName = "sprites";
        this.sprites = null;
        this.funfe_logo_whiteDescription = {
            files: ["img/funfe-logo-white.png"],
            original_height: 211,
            type: "image",
            original_width: 298,
            name: "funfe_logo_white"
        };
        this.funfe_logo_whiteName = "funfe_logo_white";
        this.funfe_logo_white = null;
        this.funfe_logo_blackDescription = {
            files: ["img/funfe-logo-black.png"],
            original_height: 211,
            type: "image",
            original_width: 298,
            name: "funfe_logo_black"
        };
        this.funfe_logo_blackName = "funfe_logo_black";
        this.funfe_logo_black = null;
        this.Cartwheel_64_squaredDescription = {
            files: ["img/Cartwheel-64-squared.png"],
            original_height: 512,
            type: "image",
            original_width: 512,
            name: "Cartwheel_64_squared"
        };
        this.Cartwheel_64_squaredName = "Cartwheel_64_squared";
        this.Cartwheel_64_squared = null;
        this.Cartwheel_128_squaredDescription = {
            files: ["img/Cartwheel-128-squared.png"],
            original_height: 512,
            type: "image",
            original_width: 512,
            name: "Cartwheel_128_squared"
        };
        this.Cartwheel_128_squaredName = "Cartwheel_128_squared";
        this.Cartwheel_128_squared = null
    };
    m["kha.ImageList"] = gc;
    gc.__name__ = ["kha", "ImageList"];
    gc.prototype = {
        Cartwheel_128_squared: null,
        Cartwheel_128_squaredName: null,
        Cartwheel_128_squaredDescription: null,
        Cartwheel_128_squaredLoad: function(a) {
            B.loadImage("Cartwheel_128_squared", function(b) {
                a()
            })
        },
        Cartwheel_128_squaredUnload: function() {
            this.Cartwheel_128_squared.unload();
            this.Cartwheel_128_squared = null
        },
        Cartwheel_64_squared: null,
        Cartwheel_64_squaredName: null,
        Cartwheel_64_squaredDescription: null,
        Cartwheel_64_squaredLoad: function(a) {
            B.loadImage("Cartwheel_64_squared", function(b) {
                a()
            })
        },
        Cartwheel_64_squaredUnload: function() {
            this.Cartwheel_64_squared.unload();
            this.Cartwheel_64_squared = null
        },
        funfe_logo_black: null,
        funfe_logo_blackName: null,
        funfe_logo_blackDescription: null,
        funfe_logo_blackLoad: function(a) {
            B.loadImage("funfe_logo_black", function(b) {
                a()
            })
        },
        funfe_logo_blackUnload: function() {
            this.funfe_logo_black.unload();
            this.funfe_logo_black = null
        },
        funfe_logo_white: null,
        funfe_logo_whiteName: null,
        funfe_logo_whiteDescription: null,
        funfe_logo_whiteLoad: function(a) {
            B.loadImage("funfe_logo_white", function(b) {
                a()
            })
        },
        funfe_logo_whiteUnload: function() {
            this.funfe_logo_white.unload();
            this.funfe_logo_white = null
        },
        sprites: null,
        spritesName: null,
        spritesDescription: null,
        spritesLoad: function(a) {
            B.loadImage("sprites", function(b) {
                a()
            })
        },
        spritesUnload: function() {
            this.sprites.unload();
            this.sprites = null
        },
        __class__: gc
    };
    var hc = function() {};
    m["kha.SoundList"] = hc;
    hc.__name__ = ["kha", "SoundList"];
    hc.prototype = {
        __class__: hc
    };
    var ic = function() {
        this.sprites_xmlDescription = {
            files: ["XHR/sprites.xml"],
            type: "blob",
            name: "sprites_xml"
        };
        this.sprites_xmlName = "sprites_xml";
        this.sprites_xml = null;
        this.Cartwheel_64_squared_fntDescription = {
            files: ["XHR/Cartwheel-64-squared.fnt"],
            type: "blob",
            name: "Cartwheel_64_squared_fnt"
        };
        this.Cartwheel_64_squared_fntName = "Cartwheel_64_squared_fnt";
        this.Cartwheel_64_squared_fnt = null;
        this.Cartwheel_128_squared_fntDescription = {
            files: ["XHR/Cartwheel-128-squared.fnt"],
            type: "blob",
            name: "Cartwheel_128_squared_fnt"
        };
        this.Cartwheel_128_squared_fntName = "Cartwheel_128_squared_fnt";
        this.Cartwheel_128_squared_fnt = null
    };
    m["kha.BlobList"] = ic;
    ic.__name__ = ["kha", "BlobList"];
    ic.prototype = {
        Cartwheel_128_squared_fnt: null,
        Cartwheel_128_squared_fntName: null,
        Cartwheel_128_squared_fntDescription: null,
        Cartwheel_128_squared_fntLoad: function(a) {
            B.loadBlob("Cartwheel_128_squared_fnt", function(b) {
                a()
            })
        },
        Cartwheel_128_squared_fntUnload: function() {
            this.Cartwheel_128_squared_fnt.unload();
            this.Cartwheel_128_squared_fnt = null
        },
        Cartwheel_64_squared_fnt: null,
        Cartwheel_64_squared_fntName: null,
        Cartwheel_64_squared_fntDescription: null,
        Cartwheel_64_squared_fntLoad: function(a) {
            B.loadBlob("Cartwheel_64_squared_fnt", function(b) {
                a()
            })
        },
        Cartwheel_64_squared_fntUnload: function() {
            this.Cartwheel_64_squared_fnt.unload();
            this.Cartwheel_64_squared_fnt = null
        },
        sprites_xml: null,
        sprites_xmlName: null,
        sprites_xmlDescription: null,
        sprites_xmlLoad: function(a) {
            B.loadBlob("sprites_xml", function(b) {
                a()
            })
        },
        sprites_xmlUnload: function() {
            this.sprites_xml.unload();
            this.sprites_xml = null
        },
        __class__: ic
    };
    var jc = function() {
        this.negotiate_rgDescription = {
            files: ["XHR/negotiate-rg.ttf"],
            type: "font",
            name: "negotiate_rg"
        };
        this.negotiate_rgName = "negotiate_rg";
        this.negotiate_rg = null
    };
    m["kha.FontList"] = jc;
    jc.__name__ = ["kha", "FontList"];
    jc.prototype = {
        negotiate_rg: null,
        negotiate_rgName: null,
        negotiate_rgDescription: null,
        negotiate_rgLoad: function(a) {
            B.loadFont("negotiate_rg", function(b) {
                a()
            })
        },
        negotiate_rgUnload: function() {
            this.negotiate_rg.unload();
            this.negotiate_rg = null
        },
        __class__: jc
    };
    var kc = function() {};
    m["kha.VideoList"] = kc;
    kc.__name__ = ["kha", "VideoList"];
    kc.prototype = {
        __class__: kc
    };
    var B = function() {};
    m["kha.Assets"] = B;
    B.__name__ = ["kha", "Assets"];
    B.__properties__ = {
        get_videoFormats: "get_videoFormats",
        get_fontFormats: "get_fontFormats",
        get_soundFormats: "get_soundFormats",
        get_imageFormats: "get_imageFormats"
    };
    B.loadEverything = function(a) {
        for (var b = 0, c = 0, d = V.getInstanceFields(ic); c < d.length;) {
            var e = d[c];
            ++c;
            oa.endsWith(e, "Load") && ++b
        }
        c = 0;
        for (d = V.getInstanceFields(gc); c < d.length;) e = d[c], ++c, oa.endsWith(e, "Load") && ++b;
        c = 0;
        for (d = V.getInstanceFields(hc); c < d.length;) e = d[c], ++c, oa.endsWith(e, "Load") && ++b;
        c = 0;
        for (d = V.getInstanceFields(jc); c < d.length;) e = d[c], ++c, oa.endsWith(e, "Load") && ++b;
        c = 0;
        for (d = V.getInstanceFields(kc); c < d.length;) e = d[c], ++c, oa.endsWith(e, "Load") && ++b;
        if (0 == b) a();
        else {
            c = 0;
            for (d = V.getInstanceFields(ic); c < d.length;) e = d[c], ++c, oa.endsWith(e, "Load") && Q.field(B.blobs, e)(function() {
                --b;
                0 == b && a()
            });
            c = 0;
            for (d = V.getInstanceFields(gc); c < d.length;) e = d[c], ++c, oa.endsWith(e, "Load") && Q.field(B.images, e)(function() {
                --b;
                0 == b && a()
            });
            c = 0;
            for (d = V.getInstanceFields(hc); c < d.length;) e = d[c], ++c, oa.endsWith(e, "Load") && Q.field(B.sounds, e)(function() {
                --b;
                0 == b && a()
            });
            c = 0;
            for (d = V.getInstanceFields(jc); c < d.length;) e = d[c], ++c, oa.endsWith(e, "Load") && Q.field(B.fonts, e)(function() {
                --b;
                0 == b && a()
            });
            c = 0;
            for (d = V.getInstanceFields(kc); c < d.length;) e = d[c], ++c, oa.endsWith(e, "Load") && Q.field(B.videos, e)(function() {
                --b;
                0 == b && a()
            })
        }
    };
    B.loadImage = function(a, b) {
        var c = Q.field(B.images, a + "Description");
        ua.loadImageFromDescription(c, function(c) {
            B.images[a] = c;
            b(c)
        })
    };
    B.loadImageFromPath = function(a, b, c) {
        ua.loadImageFromDescription({
            files: [a],
            readable: b
        }, c)
    };
    B.get_imageFormats = function() {
        return ua.getImageFormats()
    };
    B.loadBlob = function(a, b) {
        var c = Q.field(B.blobs, a + "Description");
        ua.loadBlobFromDescription(c, function(c) {
            B.blobs[a] = c;
            b(c)
        })
    };
    B.loadBlobFromPath = function(a, b) {
        ua.loadBlobFromDescription({
            files: [a]
        }, b)
    };
    B.loadSound = function(a, b) {
        var c = Q.field(B.sounds, a + "Description");
        ua.loadSoundFromDescription(c, function(c) {
            B.sounds[a] = c;
            b(c)
        })
    };
    B.loadSoundFromPath = function(a, b) {
        ua.loadSoundFromDescription({
            files: [a]
        }, b)
    };
    B.get_soundFormats = function() {
        return ua.getSoundFormats()
    };
    B.loadFont = function(a, b) {
        var c = Q.field(B.fonts, a + "Description");
        ua.loadFontFromDescription(c, function(c) {
            B.fonts[a] = c;
            b(c)
        })
    };
    B.loadFontFromPath = function(a, b) {
        ua.loadFontFromDescription({
            files: [a]
        }, b)
    };
    B.get_fontFormats = function() {
        return ["ttf"]
    };
    B.loadVideo = function(a, b) {
        var c = Q.field(B.videos, a + "Description");
        ua.loadVideoFromDescription(c, function(c) {
            B.videos[a] = c;
            b(c)
        })
    };
    B.loadVideoFromPath = function(a, b) {
        ua.loadVideoFromDescription({
            files: [a]
        }, b)
    };
    B.get_videoFormats = function() {
        return ua.getVideoFormats()
    };
    var Qc = function() {};
    m["kha.Canvas"] = Qc;
    Qc.__name__ = ["kha", "Canvas"];
    Qc.prototype = {
        get_width: null,
        get_height: null,
        get_g1: null,
        get_g2: null,
        get_g4: null,
        width: null,
        height: null,
        g1: null,
        g2: null,
        g4: null,
        __class__: Qc,
        __properties__: {
            get_g4: "get_g4",
            get_g2: "get_g2",
            get_g1: "get_g1",
            get_height: "get_height",
            get_width: "get_width"
        }
    };
    var Lb = function() {};
    m["kha.Resource"] = Lb;
    Lb.__name__ = ["kha", "Resource"];
    Lb.prototype = {
        unload: null,
        __class__: Lb
    };
    var va = function() {};
    m["kha.Image"] = va;
    va.__name__ = ["kha", "Image"];
    va.__interfaces__ = [Lb, Qc];
    va.__properties__ = {
        get_nonPow2Supported: "get_nonPow2Supported",
        get_maxSize: "get_maxSize"
    };
    va.create = function(a, b, c, d, e) {
        null == c && (c = sa.RGBA32);
        return null == g.gl ? new ta(a, b, c, !1) : new za(a, b, c, !1, 0)
    };
    va.createRenderTarget = function(a, b, c, d, e) {
        null == d && (d = 0);
        null == c && (c = sa.RGBA32);
        return null == g.gl ? new ta(a, b, c, !0) : new za(a, b, c, !0, d)
    };
    va.fromImage = function(a, b) {
        if (null == g.gl) {
            var c = new ta(a.width, a.height, sa.RGBA32, !1);
            c.image = a;
            c.createTexture();
            return c
        }
        c = new za(a.width, a.height, sa.RGBA32, !1, 0);
        c.image = a;
        c.createTexture();
        return c
    };
    va.fromVideo = function(a) {
        if (null == g.gl) {
            var b = new ta(a.element.videoWidth, a.element.videoHeight, sa.RGBA32, !1);
            b.video = a.element;
            b.createTexture();
            return b
        }
        b = new za(a.element.videoWidth, a.element.videoHeight, sa.RGBA32, !1, 0);
        b.video = a.element;
        b.createTexture();
        return b
    };
    va.get_maxSize = function() {
        return null == g.gl ? 8192 : g.gl.getParameter(3379)
    };
    va.get_nonPow2Supported = function() {
        return null != g.gl
    };
    va.prototype = {
        isOpaque: function(a, b) {
            return !1
        },
        at: function(a, b) {
            return t.Black
        },
        unload: function() {},
        lock: function(a) {
            return null
        },
        unlock: function() {},
        width: null,
        get_width: function() {
            return 0
        },
        height: null,
        get_height: function() {
            return 0
        },
        realWidth: null,
        get_realWidth: function() {
            return 0
        },
        realHeight: null,
        get_realHeight: function() {
            return 0
        },
        g1: null,
        get_g1: function() {
            return null
        },
        g2: null,
        get_g2: function() {
            return null
        },
        g4: null,
        get_g4: function() {
            return null
        },
        __class__: va,
        __properties__: {
            get_g4: "get_g4",
            get_g2: "get_g2",
            get_g1: "get_g1",
            get_realHeight: "get_realHeight",
            get_realWidth: "get_realWidth",
            get_height: "get_height",
            get_width: "get_width"
        }
    };
    var ta = function(a, b, c, d) {
        this.g2canvas = null;
        this.myWidth = a;
        this.myHeight = b;
        this.format = c;
        this.renderTarget = d;
        this.video = this.image = null;
        d && this.createTexture()
    };
    m["kha.CanvasImage"] = ta;
    ta.__name__ = ["kha", "CanvasImage"];
    ta.init = function() {
        var a = window.document.createElement("canvas");
        null != a && (ta.context = a.getContext("2d"), a.width = 2048, a.height = 2048, ta.context.globalCompositeOperation = "copy")
    };
    ta.upperPowerOfTwo = function(a) {
        a--;
        a |= a >>> 1;
        a |= a >>> 2;
        a |= a >>> 4;
        a |= a >>> 8;
        a |= a >>> 16;
        a++;
        return a
    };
    ta.__super__ = va;
    ta.prototype = T(va.prototype, {
        image: null,
        video: null,
        data: null,
        myWidth: null,
        myHeight: null,
        format: null,
        renderTarget: null,
        frameBuffer: null,
        graphics1: null,
        g2canvas: null,
        get_g1: function() {
            null == this.graphics1 && (this.graphics1 = new Mb(this));
            return this.graphics1
        },
        get_g2: function() {
            if (null == this.g2canvas) {
                var a = window.document.createElement("canvas");
                this.image = a;
                var b = a.getContext("2d");
                a.width = this.get_width();
                a.height = this.get_height();
                this.g2canvas = new jb(b, this.get_width(), this.get_height())
            }
            return this.g2canvas
        },
        get_g4: function() {
            return null
        },
        get_width: function() {
            return this.myWidth
        },
        get_height: function() {
            return this.myHeight
        },
        get_realWidth: function() {
            return this.myWidth
        },
        get_realHeight: function() {
            return this.myHeight
        },
        isOpaque: function(a, b) {
            if (null == this.data) {
                if (null == ta.context) return !0;
                this.createImageData()
            }
            return 0 != this.data.data[b * E["int"](this.image.width) * 4 + 4 * a + 3]
        },
        at: function(a, b) {
            if (null == this.data) {
                if (null == ta.context) return t.Black;
                this.createImageData()
            }
            var c = this.data.data[b * E["int"](this.image.width) * 4 + 4 * a];
            return t._new(c)
        },
        createImageData: function() {
            ta.context.strokeStyle = "rgba(0,0,0,0)";
            ta.context.fillStyle = "rgba(0,0,0,0)";
            ta.context.fillRect(0, 0, this.image.width, this.image.height);
            ta.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.image.width, this.image.height);
            this.data = ta.context.getImageData(0, 0, this.image.width, this.image.height)
        },
        texture: null,
        createTexture: function() {
            null != g.gl && (this.texture = g.gl.createTexture(), g.gl.bindTexture(3553, this.texture), g.gl.texParameteri(3553, 10240, 9729), g.gl.texParameteri(3553, 10241, 9729), g.gl.texParameteri(3553, 10242, 33071), g.gl.texParameteri(3553, 10243, 33071), this.renderTarget ? (this.frameBuffer = g.gl.createFramebuffer(), g.gl.bindFramebuffer(36160, this.frameBuffer), g.gl.texImage2D(3553, 0, 6408, this.get_realWidth(), this.get_realHeight(), 0, 6408, 5121, null), g.gl.framebufferTexture2D(36160, 36064, 3553, this.texture, 0), g.gl.bindFramebuffer(36160, null)) : null != this.video ? g.gl.texImage2D(3553, 0, 6408, 6408, 5121, this.video) : g.gl.texImage2D(3553, 0, 6408, 6408, 5121, this.image), g.gl.bindTexture(3553, null))
        },
        set: function(a) {
            g.gl.activeTexture(33984 +
                a);
            g.gl.bindTexture(3553, this.texture);
            null != this.video && g.gl.texImage2D(3553, 0, 6408, 6408, 5121, this.video)
        },
        bytes: null,
        lock: function(a) {
            return this.bytes = da.alloc(this.format == sa.RGBA32 ? 4 * this.get_width() * this.get_height() : this.get_width() * this.get_height())
        },
        unlock: function() {
            if (null != g.gl) {
                this.texture = g.gl.createTexture();
                g.gl.bindTexture(3553, this.texture);
                g.gl.texParameteri(3553, 10240, 9729);
                g.gl.texParameteri(3553, 10241, 9729);
                g.gl.texParameteri(3553, 10242, 33071);
                g.gl.texParameteri(3553, 10243, 33071);
                g.gl.texImage2D(3553, 0, 6409, this.get_width(), this.get_height(), 0, 6409, 5121, new eb(this.bytes.b.bufferValue));
                if (1282 == g.gl.getError()) {
                    for (var a = da.alloc(this.get_width() * this.get_height() * 4), b = 0, c = this.get_height(); b < c;)
                        for (var d = b++, e = 0, f = this.get_width(); e < f;) {
                            var h = e++,
                                n = this.bytes.get(d * this.get_width() + h);
                            a.set(d * this.get_width() * 4 + 4 * h, n);
                            a.set(d * this.get_width() * 4 + 4 * h + 1, n);
                            a.set(d * this.get_width() * 4 + 4 * h + 2, n);
                            a.set(d * this.get_width() * 4 + 4 * h + 3, 255)
                        }
                    g.gl.texImage2D(3553, 0, 6408, this.get_width(), this.get_height(), 0, 6408, 5121, new eb(a.b.bufferValue))
                }
                g.gl.bindTexture(3553, null);
                this.bytes = null
            }
        },
        unload: function() {},
        __class__: ta
    });
    var t = {};
    m["kha._Color.Color_Impl_"] = t;
    t.__name__ = ["kha", "_Color", "Color_Impl_"];
    t.__properties__ = {
        set_value: "set_value",
        get_value: "get_value",
        set_A: "set_A",
        get_A: "get_A",
        set_B: "set_B",
        get_B: "get_B",
        set_G: "set_G",
        get_G: "get_G",
        set_R: "set_R",
        get_R: "get_R",
        set_Ab: "set_Ab",
        get_Ab: "get_Ab",
        set_Bb: "set_Bb",
        get_Bb: "get_Bb",
        set_Gb: "set_Gb",
        get_Gb: "get_Gb",
        set_Rb: "set_Rb",
        get_Rb: "get_Rb"
    };
    t.fromValue = function(a) {
        return t._new(a)
    };
    t.fromBytes = function(a, b, c, d) {
        null == d && (d = 255);
        return t._new(d << 24 | a << 16 | b << 8 | c)
    };
    t.fromFloats = function(a, b, c, d) {
        null == d && (d = 1);
        return t._new((255 * d | 0) << 24 | (255 * a | 0) << 16 | (255 * b | 0) << 8 | 255 * c | 0)
    };
    t.fromString = function(a) {
        if (7 != a.length && 9 != a.length || 35 != a.charCodeAt(0)) throw new u("Invalid Color string: '" + a + "'");
        var b = E.parseInt("0x" + v.substr(a, 1, null));
        7 == a.length && (b += -16777216);
        return t._new(b)
    };
    t._new = function(a) {
        return a
    };
    t.get_value = function(a) {
        return a
    };
    t.set_value = function(a, b) {
        return b
    };
    t.get_Rb = function(a) {
        return (a & 16711680) >>> 16
    };
    t.get_Gb = function(a) {
        return (a & 65280) >>> 8
    };
    t.get_Bb = function(a) {
        return a & 255
    };
    t.get_Ab = function(a) {
        return a >>> 24
    };
    t.set_Rb = function(a, b) {
        t.get_Ab(a);
        t.get_Gb(a);
        t.get_Bb(a);
        return b
    };
    t.set_Gb = function(a, b) {
        t.get_Ab(a);
        t.get_Rb(a);
        t.get_Bb(a);
        return b
    };
    t.set_Bb = function(a, b) {
        t.get_Ab(a);
        t.get_Rb(a);
        t.get_Gb(a);
        return b
    };
    t.set_Ab = function(a, b) {
        t.get_Rb(a);
        t.get_Gb(a);
        t.get_Bb(a);
        return b
    };
    t.get_R = function(a) {
        return .00392156862745098 * t.get_Rb(a)
    };
    t.get_G = function(a) {
        return .00392156862745098 * t.get_Gb(a)
    };
    t.get_B = function(a) {
        return .00392156862745098 * t.get_Bb(a)
    };
    t.get_A = function(a) {
        return .00392156862745098 * t.get_Ab(a)
    };
    t.set_R = function(a, b) {
        E["int"](1 * t.get_Ab(a));
        E["int"](1 * t.get_Gb(a));
        E["int"](1 * t.get_Bb(a));
        return b
    };
    t.set_G = function(a, b) {
        E["int"](1 * t.get_Ab(a));
        E["int"](1 * t.get_Rb(a));
        E["int"](1 * t.get_Bb(a));
        return b
    };
    t.set_B = function(a, b) {
        E["int"](1 * t.get_Ab(a));
        E["int"](1 * t.get_Rb(a));
        E["int"](1 * t.get_Gb(a));
        return b
    };
    t.set_A = function(a, b) {
        E["int"](1 * t.get_Rb(a));
        E["int"](1 * t.get_Gb(a));
        E["int"](1 * t.get_Bb(a));
        return b
    };
    var lc = function() {};
    m["kha.EnvironmentVariables"] = lc;
    lc.__name__ = ["kha", "EnvironmentVariables"];
    lc.prototype = {
        getVariable: function(a) {
            return ""
        },
        __class__: lc
    };
    var mc = function() {};
    m["kha.Font"] = mc;
    mc.__name__ = ["kha", "Font"];
    mc.__interfaces__ = [Lb];
    mc.prototype = {
        height: null,
        width: null,
        baseline: null,
        __class__: mc
    };
    var Rc = function(a, b, c) {
        this.bold = a;
        this.italic = b;
        this.underlined = c
    };
    m["kha.FontStyle"] = Rc;
    Rc.__name__ = ["kha", "FontStyle"];
    Rc.prototype = {
        bold: null,
        italic: null,
        underlined: null,
        getBold: function() {
            return this.bold
        },
        getItalic: function() {
            return this.italic
        },
        getUnderlined: function() {
            return this.underlined
        },
        __class__: Rc
    };
    var Wb = function(a, b, c) {
        this.graphics1 = a;
        this.graphics2 = b;
        this.graphics4 = c
    };
    m["kha.Framebuffer"] = Wb;
    Wb.__name__ = ["kha", "Framebuffer"];
    Wb.__interfaces__ = [Qc];
    Wb.prototype = {
        graphics1: null,
        graphics2: null,
        graphics4: null,
        init: function(a, b, c) {
            this.graphics1 = a;
            this.graphics2 = b;
            this.graphics4 = c
        },
        g1: null,
        get_g1: function() {
            return this.graphics1
        },
        g2: null,
        get_g2: function() {
            return this.graphics2
        },
        g4: null,
        get_g4: function() {
            return this.graphics4
        },
        width: null,
        get_width: function() {
            return F.get_pixelWidth()
        },
        height: null,
        get_height: function() {
            return F.get_pixelHeight()
        },
        __class__: Wb,
        __properties__: {
            get_height: "get_height",
            get_width: "get_width",
            get_g4: "get_g4",
            get_g2: "get_g2",
            get_g1: "get_g1"
        }
    };
    var y = m["kha.Key"] = {
        __ename__: ["kha", "Key"],
        __constructs__: "BACKSPACE TAB ENTER SHIFT CTRL ALT CHAR ESC DEL UP DOWN LEFT RIGHT BACK".split(" ")
    };
    y.BACKSPACE = ["BACKSPACE", 0];
    y.BACKSPACE.toString = x;
    y.BACKSPACE.__enum__ = y;
    y.TAB = ["TAB", 1];
    y.TAB.toString = x;
    y.TAB.__enum__ = y;
    y.ENTER = ["ENTER", 2];
    y.ENTER.toString = x;
    y.ENTER.__enum__ = y;
    y.SHIFT = ["SHIFT", 3];
    y.SHIFT.toString = x;
    y.SHIFT.__enum__ = y;
    y.CTRL = ["CTRL", 4];
    y.CTRL.toString = x;
    y.CTRL.__enum__ = y;
    y.ALT = ["ALT", 5];
    y.ALT.toString = x;
    y.ALT.__enum__ = y;
    y.CHAR = ["CHAR", 6];
    y.CHAR.toString = x;
    y.CHAR.__enum__ = y;
    y.ESC = ["ESC", 7];
    y.ESC.toString = x;
    y.ESC.__enum__ = y;
    y.DEL = ["DEL", 8];
    y.DEL.toString = x;
    y.DEL.__enum__ = y;
    y.UP = ["UP", 9];
    y.UP.toString = x;
    y.UP.__enum__ = y;
    y.DOWN = ["DOWN", 10];
    y.DOWN.toString = x;
    y.DOWN.__enum__ = y;
    y.LEFT = ["LEFT", 11];
    y.LEFT.toString = x;
    y.LEFT.__enum__ = y;
    y.RIGHT = ["RIGHT", 12];
    y.RIGHT.toString = x;
    y.RIGHT.__enum__ = y;
    y.BACK = ["BACK", 13];
    y.BACK.toString = x;
    y.BACK.__enum__ = y;
    var md = function() {};
    m["kha.AlignedQuad"] = md;
    md.__name__ = ["kha", "AlignedQuad"];
    md.prototype = {
        x0: null,
        y0: null,
        s0: null,
        t0: null,
        x1: null,
        y1: null,
        s1: null,
        t1: null,
        xadvance: null,
        __class__: md
    };
    var nd = function(a, b, c, d, e, f, h, n) {
        this.mySize = a;
        this.width = e;
        this.height = f;
        this.chars = h;
        this.baseline = b;
        for (a = 0; a < h.length;) b = h[a], ++a, b.yoff += this.baseline;
        this.texture = va.create(e, f, sa.L8);
        h = this.texture.lock();
        for (b = a = 0; b < f;)
            for (b++, c = 0; c < e;) c++, h.set(a, n.readU8(a)), ++a;
        this.texture.unlock()
    };
    m["kha.KravurImage"] = nd;
    nd.__name__ = ["kha", "KravurImage"];
    nd.prototype = {
        mySize: null,
        chars: null,
        texture: null,
        width: null,
        height: null,
        baseline: null,
        getTexture: function() {
            return this.texture
        },
        getBakedQuad: function(a, b, c) {
            if (a >= this.chars.length) return null;
            var d = 1 / this.width,
                e = 1 / this.height;
            a = this.chars[a];
            if (null == a) return null;
            b = Math.round(b + a.xoff);
            c = Math.round(c + a.yoff);
            var f = new md;
            f.x0 = b;
            f.y0 = c;
            f.x1 = b + a.x1 - a.x0;
            f.y1 = c + a.y1 - a.y0;
            f.s0 = a.x0 * d;
            f.t0 = a.y0 * e;
            f.s1 = a.x1 * d;
            f.t1 = a.y1 * e;
            f.xadvance = a.xadvance;
            return f
        },
        getCharWidth: function(a) {
            return 32 > a || a - 32 >= this.chars.length ? 0 : this.chars[a - 32].xadvance
        },
        getHeight: function() {
            return this.mySize
        },
        stringWidth: function(a) {
            a = new String(a);
            for (var b = 0, c = 0, d = a.length; c < d;) var e = c++,
                b = b + this.getCharWidth(v.cca(a, e));
            return b
        },
        getBaselinePosition: function() {
            return this.baseline
        },
        __class__: nd
    };
    var Xb = function(a) {
        this.images = new Fa;
        this.blob = a
    };
    m["kha.Kravur"] = Xb;
    Xb.__name__ = ["kha", "Kravur"];
    Xb.__interfaces__ = [mc];
    Xb.prototype = {
        blob: null,
        images: null,
        _get: function(a) {
            if (!this.images.h.hasOwnProperty(a)) {
                var b = 64,
                    c = 32,
                    d;
                d = Array(224);
                for (var e = 0, f = d.length; e < f;) {
                    var h = e++,
                        n = new od;
                    d[h] = n
                }
                e = null;
                for (f = -1; 0 > f;) c < b ? c *= 2 : b *= 2, e = X.alloc(b * c), f = l.stbtt_BakeFontBitmap(this.blob, 0, a, e, b, c, 32, 224, d);
                h = new Sc;
                l.stbtt_InitFont(h, this.blob, 0);
                f = l.stbtt_GetFontVMetrics(h);
                h = l.stbtt_ScaleForPixelHeight(h, a);
                b = new nd(a | 0, Math.round(f.ascent * h), Math.round(f.descent * h), Math.round(f.lineGap * h), b, c, d, e);
                this.images.h[a] = b;
                b;
                return b
            }
            return this.images.h[a]
        },
        height: function(a) {
            return this._get(a).getHeight()
        },
        width: function(a, b) {
            return this._get(a).stringWidth(b)
        },
        baseline: function(a) {
            return this._get(a).getBaselinePosition()
        },
        unload: function() {
            this.images = this.blob = null
        },
        __class__: Xb
    };
    var ua = function() {};
    m["kha.LoaderImpl"] = ua;
    ua.__name__ = ["kha", "LoaderImpl"];
    ua.getImageFormats = function() {
        return ["png", "jpg"]
    };
    ua.loadImageFromDescription = function(a, b) {
        var c = window.document.createElement("img");
        c.src = a.files[0];
        var d;
        d = Object.prototype.hasOwnProperty.call(a, "readable") ? a.readable : !1;
        c.onload = function(a) {
            b(va.fromImage(c, d))
        }
    };
    ua.getSoundFormats = function() {
        return g._hasWebAudio ? ["ogg"] : ["mp4", "ogg"]
    };
    ua.loadSoundFromDescription = function(a, b) {
        if (g._hasWebAudio)
            for (var c = 0, d = a.files.length; c < d;) {
                var e = c++,
                    e = a.files[e];
                if (oa.endsWith(e, ".ogg")) {
                    new Tc(e, b);
                    break
                }
            } else new Nb(a.files, b)
    };
    ua.getVideoFormats = function() {
        return ["mp4", "webm"]
    };
    ua.loadVideoFromDescription = function(a, b) {
        new kb(a.files, b)
    };
    ua.loadBlobFromDescription = function(a, b) {
        var c = new XMLHttpRequest;
        c.open("GET", a.files[0], !0);
        c.responseType = "arraybuffer";
        c.onreadystatechange = function() {
            if (4 == c.readyState)
                if (200 <= c.status && 400 > c.status) {
                    var d = null,
                        e = c.response;
                    if (null != e)
                        for (var e = new eb(e), d = da.alloc(e.byteLength), f = 0, h = e.byteLength; f < h;) {
                            var n = f++;
                            d.b[n] = e[n] & 255
                        } else if (null != c.responseBody)
                            for (e = VBArray(c.responseBody).toArray(), d = da.alloc(e.length), f = 0, h = e.length; f < h;) n = f++, d.b[n] = e[n] & 255;
                        else R.trace("Error loading " + a.files[0], {
                            fileName: "LoaderImpl.hx",
                            lineNumber: 90,
                            className: "kha.LoaderImpl",
                            methodName: "loadBlobFromDescription"
                        }), window.console.log("loadBlob failed");
                    b(new X(d))
                } else R.trace("Error loading " + a.files[0], {
                    fileName: "LoaderImpl.hx",
                    lineNumber: 96,
                    className: "kha.LoaderImpl",
                    methodName: "loadBlobFromDescription"
                }), window.console.log("loadBlob failed")
        };
        c.send(null)
    };
    ua.loadFontFromDescription = function(a, b) {
        ua.loadBlobFromDescription(a, function(a) {
            null == g.gl ? b(new nc(new Xb(a))) : b(new Xb(a))
        })
    };
    var Od = function(a, b) {
        this.center = a;
        this.angle = b
    };
    m["kha.Rotation"] = Od;
    Od.__name__ = ["kha", "Rotation"];
    Od.prototype = {
        center: null,
        angle: null,
        __class__: Od
    };
    var pd = function(a, b, c, d, e, f) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = d;
        this.scaleFactor = e;
        this.rotation = f
    };
    m["kha.TargetRectangle"] = pd;
    pd.__name__ = ["kha", "TargetRectangle"];
    pd.prototype = {
        x: null,
        y: null,
        width: null,
        height: null,
        scaleFactor: null,
        rotation: null,
        __class__: pd
    };
    var Ta = function() {};
    m["kha.Scaler"] = Ta;
    Ta.__name__ = ["kha", "Scaler"];
    Ta.targetRect = function(a, b, c, d, e) {
        var f, h, n, k, A;
        switch (e[1]) {
            case 0:
                a / b > c / d ? (A = c / a, n = a * A, k = b * A, f = 0, h = .5 * (d - k)) : (A = d / b, n = a * A, k = b * A, f = .5 * (c - n), h = 0);
                break;
            case 1:
                a / b > d / c ? (A = d / a, n = a * A, k = b * A, f = .5 * (c - k) + k, h = 0) : (A = c / b, n = a * A, f = k = b * A, h = .5 * (d - n));
                break;
            case 2:
                a / b > c / d ? (A = c / a, n = a * A, k = b * A, f = n, h = .5 * (d - k) + k) : (A = d / b, n = a * A, k = b * A, f = .5 * (c - n) + n, h = k);
                break;
            case 3:
                a / b > d / c ? (A = d / a, n = a * A, k = b * A, f = .5 * (c - k), h = n) : (A = c / b, n = a * A, k = b * A, f = 0, h = .5 * (d - n) + n)
        }
        return new pd(f, h, n, k, A, e)
    };
    Ta.transformXDirectly = function(a, b, c, d, e, f, h) {
        c = Ta.targetRect(c, d, e, f, h);
        switch (c.rotation[1]) {
            case 0:
                return (a - c.x) / c.scaleFactor | 0;
            case 1:
                return (b - c.y) / c.scaleFactor | 0;
            case 2:
                return (c.x - a) / c.scaleFactor | 0;
            case 3:
                return (c.y - b) / c.scaleFactor | 0
        }
    };
    Ta.transformX = function(a, b, c, d, e) {
        return Ta.transformXDirectly(a, b, c.get_width(), c.get_height(), d.get_width(), d.get_height(), e)
    };
    Ta.transformYDirectly = function(a, b, c, d, e, f, h) {
        c = Ta.targetRect(c, d, e, f, h);
        switch (c.rotation[1]) {
            case 0:
                return (b - c.y) / c.scaleFactor | 0;
            case 1:
                return (c.x - a) / c.scaleFactor | 0;
            case 2:
                return (c.y - b) / c.scaleFactor | 0;
            case 3:
                return (a - c.x) / c.scaleFactor | 0
        }
    };
    Ta.transformY = function(a, b, c, d, e) {
        return Ta.transformYDirectly(a, b, c.get_width(), c.get_height(), d.get_width(), d.get_height(), e)
    };
    Ta.scale = function(a, b, c) {
        var d = b.get_g2();
        d.set_transformation(Ta.getScaledTransformation(a.get_width(), a.get_height(), b.get_width(), b.get_height(), c));
        d.set_color(t.White);
        d.set_opacity(1);
        d.drawImage(a, 0, 0)
    };
    Ta.getScaledTransformation = function(a, b, c, d, e) {
        a = Ta.targetRect(a, b, c, d, e);
        b = a.scaleFactor;
        a = new pa(b, 0, a.x, 0, b, a.y, 0, 0, 1);
        switch (e[1]) {
            case 1:
                e = Math.PI / 2;
                e = new pa(Math.cos(e), -Math.sin(e), 0, Math.sin(e), Math.cos(e), 0, 0, 0, 1);
                a = new pa(a._00 * e._00 + a._10 * e._01 + a._20 * e._02, a._00 * e._10 + a._10 * e._11 + a._20 * e._12, a._00 * e._20 + a._10 * e._21 + a._20 * e._22, a._01 * e._00 + a._11 * e._01 + a._21 * e._02, a._01 * e._10 + a._11 * e._11 + a._21 * e._12, a._01 * e._20 + a._11 * e._21 + a._21 * e._22, a._02 * e._00 + a._12 * e._01 + a._22 * e._02, a._02 * e._10 + a._12 * e._11 + a._22 * e._12, a._02 * e._20 + a._12 * e._21 + a._22 * e._22);
                break;
            case 2:
                e = Math.PI;
                e = new pa(Math.cos(e), -Math.sin(e), 0, Math.sin(e), Math.cos(e), 0, 0, 0, 1);
                a = new pa(a._00 * e._00 + a._10 * e._01 + a._20 * e._02, a._00 * e._10 + a._10 * e._11 + a._20 * e._12, a._00 * e._20 + a._10 * e._21 + a._20 * e._22, a._01 * e._00 + a._11 * e._01 + a._21 * e._02, a._01 * e._10 + a._11 * e._11 + a._21 * e._12, a._01 * e._20 + a._11 * e._21 + a._21 * e._22, a._02 * e._00 + a._12 * e._01 + a._22 * e._02, a._02 * e._10 + a._12 * e._11 + a._22 * e._12, a._02 * e._20 + a._12 * e._21 + a._22 * e._22);
                break;
            case 3:
                e = 3 * Math.PI / 2, e = new pa(Math.cos(e), -Math.sin(e), 0, Math.sin(e), Math.cos(e), 0, 0, 0, 1), a = new pa(a._00 * e._00 + a._10 * e._01 + a._20 * e._02, a._00 * e._10 + a._10 * e._11 + a._20 * e._12, a._00 * e._20 + a._10 * e._21 + a._20 * e._22, a._01 * e._00 + a._11 * e._01 + a._21 * e._02, a._01 * e._10 + a._11 * e._11 + a._21 * e._12, a._01 * e._20 + a._11 * e._21 + a._21 * e._22, a._02 * e._00 + a._12 * e._01 + a._22 * e._02, a._02 * e._10 + a._12 * e._11 + a._22 * e._12, a._02 * e._20 + a._12 * e._21 + a._22 * e._22)
        }
        return a
    };
    var qd = function() {};
    m["kha.TimeTask"] = qd;
    qd.__name__ = ["kha", "TimeTask"];
    qd.prototype = {
        task: null,
        start: null,
        period: null,
        duration: null,
        next: null,
        id: null,
        groupId: null,
        active: null,
        paused: null,
        __class__: qd
    };
    var rd = function(a, b, c) {
        this.task = a;
        this.priority = b;
        this.id = c;
        this.active = !0;
        this.paused = !1
    };
    m["kha.FrameTask"] = rd;
    rd.__name__ = ["kha", "FrameTask"];
    rd.prototype = {
        task: null,
        priority: null,
        id: null,
        active: null,
        paused: null,
        __class__: rd
    };
    var r = function() {};
    m["kha.Scheduler"] = r;
    r.__name__ = ["kha", "Scheduler"];
    r.init = function() {
        r.deltas = [];
        for (var a = 0, b = r.DIF_COUNT; a < b;) {
            var c = a++;
            r.deltas[c] = 0
        }
        r.stopped = !0;
        r.frame_tasks_sorted = !0;
        r.current = r.realTime();
        r.lastTime = r.realTime();
        r.currentFrameTaskId = 0;
        r.currentTimeTaskId = 0;
        r.currentGroupId = 0;
        r.timeTasks = [];
        r.frameTasks = [];
        r.toDeleteTime = [];
        r.toDeleteFrame = []
    };
    r.start = function(a) {
        null == a && (a = !1);
        r.vsync = F.get_vsync();
        var b = F.get_refreshRate();
        57 <= b && 63 >= b && (b = 60);
        r.onedifhz = 1 / b;
        r.stopped = !1;
        r.resetTime();
        r.lastTime = r.realTime();
        for (var b = 0, c = r.DIF_COUNT; b < c;) {
            var d = b++;
            r.deltas[d] = 0
        }
        if (a) {
            a = 0;
            for (b = r.timeTasks; a < b.length;) c = b[a], ++a, c.paused = !1;
            a = 0;
            for (b = r.frameTasks; a < b.length;) c = b[a], ++a, c.paused = !1
        }
    };
    r.stop = function() {
        r.stopped = !0
    };
    r.isStopped = function() {
        return r.stopped
    };
    r.back = function(a) {
        r.lastTime = a;
        for (var b = 0, c = r.timeTasks; b < c.length;) {
            var d = c[b];
            ++b;
            if (d.start >= a) d.next = d.start;
            else
                for (d.next = d.start; d.next < a;) d.next += d.period
        }
    };
    r.executeFrame = function() {
        var a = r.realTime(),
            b = a - r.lastNow;
        r.lastNow = a;
        a = r.current;
        if (!(0 > b)) {
            if (b > r.maxframetime) b = r.maxframetime, a += b;
            else if (r.vsync) {
                for (var c = r.onedifhz; c < b - r.onedifhz;) c += r.onedifhz;
                for (var b = c, d = 0, e = r.DIF_COUNT - 2; d < e;) {
                    var f = d++,
                        b = b +
                        r.deltas[f];
                    r.deltas[f] = r.deltas[f + 1]
                }
                b += r.deltas[r.DIF_COUNT - 2];
                b /= r.DIF_COUNT;
                r.deltas[r.DIF_COUNT - 2] = c;
                a += b
            } else {
                c = 0;
                for (d = r.DIF_COUNT - 1; c < d;) e = c++, r.deltas[e] = r.deltas[e + 1];
                r.deltas[r.DIF_COUNT - 1] = b;
                d = c = 0;
                for (e = r.DIF_COUNT; d < e;) f = d++, c += r.deltas[f];
                c /= r.DIF_COUNT;
                a += c
            }
            r.lastTime = a;
            r.stopped || (r.current = a);
            c = 0;
            for (d = r.timeTasks; c < d.length;) e = d[c], ++c, r.activeTimeTask = e, r.stopped || r.activeTimeTask.paused ? r.activeTimeTask.next += b : r.activeTimeTask.next <= a && (r.activeTimeTask.next += e.period, v.remove(r.timeTasks, r.activeTimeTask), r.activeTimeTask.active && r.activeTimeTask.task() ? 0 < r.activeTimeTask.period && (0 == r.activeTimeTask.duration || r.activeTimeTask.duration >= r.activeTimeTask.start + r.activeTimeTask.next) && r.insertSorted(r.timeTasks, r.activeTimeTask) : r.activeTimeTask.active = !1);
            r.activeTimeTask = null;
            b = 0;
            for (a = r.timeTasks; b < a.length;) c = a[b], ++b, c.active || r.toDeleteTime.push(c);
            for (; 0 < r.toDeleteTime.length;) b = r.toDeleteTime.pop(), v.remove(r.timeTasks, b);
            r.sortFrameTasks();
            b = 0;
            for (a = r.frameTasks; b < a.length;) c = a[b], ++b, r.stopped || c.paused || c.task() || (c.active = !1);
            b = 0;
            for (a = r.frameTasks; b < a.length;) c = a[b], ++b, c.active || r.toDeleteFrame.push(c);
            for (; 0 < r.toDeleteFrame.length;) b = r.toDeleteFrame.pop(), v.remove(r.frameTasks, b)
        }
    };
    r.time = function() {
        return r.current
    };
    r.realTime = function() {
        return F.get_time() - r.startTime
    };
    r.resetTime = function() {
        var a = F.get_time();
        r.lastNow = 0;
        var b = a - r.startTime;
        r.startTime = a;
        for (var a = 0, c = r.timeTasks; a < c.length;) {
            var d = c[a];
            ++a;
            d.start -= b;
            d.next -= b
        }
        b = 0;
        for (a = r.DIF_COUNT; b < a;) c = b++, r.deltas[c] = 0;
        r.current = 0;
        r.lastTime = 0
    };
    r.addBreakableFrameTask = function(a, b) {
        r.frameTasks.push(new rd(a, b, ++r.currentFrameTaskId));
        r.frame_tasks_sorted = !1;
        return r.currentFrameTaskId
    };
    r.addFrameTask = function(a, b) {
        return r.addBreakableFrameTask(function() {
            a();
            return !0
        }, b)
    };
    r.pauseFrameTask = function(a, b) {
        for (var c = 0, d = r.frameTasks; c < d.length;) {
            var e = d[c];
            ++c;
            if (e.id == a) {
                e.paused = b;
                break
            }
        }
    };
    r.removeFrameTask = function(a) {
        for (var b = 0, c = r.frameTasks; b < c.length;) {
            var d = c[b];
            ++b;
            if (d.id == a) {
                d.active = !1;
                v.remove(r.frameTasks, d);
                break
            }
        }
    };
    r.generateGroupId = function() {
        return ++r.currentGroupId
    };
    r.addBreakableTimeTaskToGroup = function(a, b, c, d, e) {
        null == e && (e = 0);
        null == d && (d = 0);
        var f = new qd;
        f.active = !0;
        f.task = b;
        f.id = ++r.currentTimeTaskId;
        f.groupId = a;
        f.start = r.current + c;
        f.period = 0;
        0 != d && (f.period = d);
        f.duration = 0;
        0 != e && (f.duration = f.start + e);
        f.next = f.start;
        r.insertSorted(r.timeTasks, f);
        return f.id
    };
    r.addTimeTaskToGroup = function(a, b, c, d, e) {
        null == e && (e = 0);
        null == d && (d = 0);
        return r.addBreakableTimeTaskToGroup(a, function() {
            b();
            return !0
        }, c, d, e)
    };
    r.addBreakableTimeTask = function(a, b, c, d) {
        null == d && (d = 0);
        null == c && (c = 0);
        return r.addBreakableTimeTaskToGroup(0, a, b, c, d)
    };
    r.addTimeTask = function(a, b, c, d) {
        null == d && (d = 0);
        null == c && (c = 0);
        return r.addTimeTaskToGroup(0, a, b, c, d)
    };
    r.getTimeTask = function(a) {
        if (null != r.activeTimeTask && r.activeTimeTask.id == a) return r.activeTimeTask;
        for (var b = 0, c = r.timeTasks; b < c.length;) {
            var d = c[b];
            ++b;
            if (d.id == a) return d
        }
        return null
    };
    r.pauseTimeTask = function(a, b) {
        var c = r.getTimeTask(a);
        null != c && (c.paused = b)
    };
    r.pauseTimeTasks = function(a, b) {
        for (var c = 0, d = r.timeTasks; c < d.length;) {
            var e = d[c];
            ++c;
            e.groupId == a && (e.paused = b)
        }
        null != r.activeTimeTask && r.activeTimeTask.groupId == a && (r.activeTimeTask.paused = !0)
    };
    r.removeTimeTask = function(a) {
        a = r.getTimeTask(a);
        null != a && (a.active = !1, v.remove(r.timeTasks, a))
    };
    r.removeTimeTasks = function(a) {
        for (var b = 0, c = r.timeTasks; b < c.length;) {
            var d = c[b];
            ++b;
            d.groupId == a && (d.active = !1, r.toDeleteTime.push(d))
        }
        null != r.activeTimeTask && r.activeTimeTask.groupId == a && (r.activeTimeTask.paused = !1);
        for (; 0 < r.toDeleteTime.length;) a = r.toDeleteTime.pop(), v.remove(r.timeTasks, a)
    };
    r.numTasksInSchedule = function() {
        return r.timeTasks.length + r.frameTasks.length
    };
    r.insertSorted = function(a, b) {
        for (var c = 0, d = a.length; c < d;) {
            var e = c++;
            if (a[e].next > b.next) {
                a.splice(e, 0, b);
                return
            }
        }
        a.push(b)
    };
    r.sortFrameTasks = function() {
        r.frame_tasks_sorted || (r.frameTasks.sort(function(a, b) {
            return a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0
        }), r.frame_tasks_sorted = !0)
    };
    var La = m["kha.ScreenRotation"] = {
        __ename__: ["kha", "ScreenRotation"],
        __constructs__: ["RotationNone", "Rotation90", "Rotation180", "Rotation270"]
    };
    La.RotationNone = ["RotationNone", 0];
    La.RotationNone.toString = x;
    La.RotationNone.__enum__ = La;
    La.Rotation90 = ["Rotation90", 1];
    La.Rotation90.toString = x;
    La.Rotation90.__enum__ = La;
    La.Rotation180 = ["Rotation180", 2];
    La.Rotation180.toString = x;
    La.Rotation180.__enum__ = La;
    La.Rotation270 = ["Rotation270", 3];
    La.Rotation270.toString = x;
    La.Rotation270.__enum__ = La;
    var Z = function() {};
    m["kha.Shaders"] = Z;
    Z.__name__ = ["kha", "Shaders"];
    Z.init = function() {
        var a = Q.field(Z, "painter_colored_fragData"),
            a = ra.run(a);
        Z.painter_colored_frag = new Yb(X.fromBytes(a));
        a = Q.field(Z, "painter_colored_vertData");
        a = ra.run(a);
        Z.painter_colored_vert = new Zb(X.fromBytes(a));
        a = Q.field(Z, "painter_image_fragData");
        a = ra.run(a);
        Z.painter_image_frag = new Yb(X.fromBytes(a));
        a = Q.field(Z, "painter_image_vertData");
        a = ra.run(a);
        Z.painter_image_vert = new Zb(X.fromBytes(a));
        a = Q.field(Z, "painter_text_fragData");
        a = ra.run(a);
        Z.painter_text_frag = new Yb(X.fromBytes(a));
        a = Q.field(Z, "painter_text_vertData");
        a = ra.run(a);
        Z.painter_text_vert = new Zb(X.fromBytes(a));
        a = Q.field(Z, "painter_video_fragData");
        a = ra.run(a);
        Z.painter_video_frag = new Yb(X.fromBytes(a));
        a = Q.field(Z, "painter_video_vertData");
        a = ra.run(a);
        Z.painter_video_vert = new Zb(X.fromBytes(a))
    };
    var Ob = function() {};
    m["kha.Sound"] = Ob;
    Ob.__name__ = ["kha", "Sound"];
    Ob.__interfaces__ = [Lb];
    Ob.prototype = {
        data: null,
        compressed: null,
        unload: function() {},
        __class__: Ob
    };
    var Uc = function() {};
    m["kha.StorageFile"] = Uc;
    Uc.__name__ = ["kha", "StorageFile"];
    Uc.prototype = {
        read: function() {
            return null
        },
        write: function(a) {},
        append: function(a) {},
        canAppend: function() {
            return !1
        },
        maxSize: function() {
            return -1
        },
        writeString: function(a) {
            a = da.ofString(a);
            this.write(X.fromBytes(a))
        },
        appendString: function(a) {
            a = da.ofString(a);
            this.append(X.fromBytes(a))
        },
        readString: function() {
            var a = this.read();
            return null == a ? null : a.toString()
        },
        writeObject: function(a) {
            this.writeString(db.run(a))
        },
        readObject: function() {
            var a = this.readString();
            if (null == a) return null;
            try {
                return ra.run(a)
            } catch (b) {
                return b instanceof
                u && (b = b.val), null
            }
        },
        __class__: Uc
    };
    var wb = function(a) {
        this.name = a
    };
    m["kha.LocalStorageFile"] = wb;
    wb.__name__ = ["kha", "LocalStorageFile"];
    wb.encode = function(a) {
        var b = [0, 10, 13, 61],
            c = "",
            d;
        a = new eb(a);
        for (var e = 0, f = a.length; e < f;) d = e++, d = a[d], d = (d + 42) % 256, Kc.has(b, d) ? (d = (d + 64) % 256, c += "=" + String.fromCharCode(d)) : c += String.fromCharCode(d);
        return c
    };
    wb.decode = function(a) {
        for (var b = new Nc, c = !1, d, e = 0, f = a.length; e < f;) d = e++, d = a.charCodeAt(d), 13 != d && 10 != d && (61 != d || c ? (c && (c = !1, d -= 64), 42 > d && 0 < d ? b.b.push(d + 214) : b.b.push(d -
            42)) : c = !0);
        return b.getBytes()
    };
    wb.__super__ = Uc;
    wb.prototype = T(Uc.prototype, {
        name: null,
        read: function() {
            var a = window.localStorage;
            if (null == a) return null;
            a = a.getItem(this.name);
            return null == a ? null : X.fromBytes(wb.decode(a))
        },
        write: function(a) {
            var b = window.localStorage;
            null != b && b.setItem(this.name, wb.encode(a.bytes.b.bufferValue))
        },
        __class__: wb
    });
    var dc = function() {};
    m["kha.Storage"] = dc;
    dc.__name__ = ["kha", "Storage"];
    dc.namedFile = function(a) {
        return new wb(a)
    };
    dc.defaultFile = function() {
        return dc.namedFile("default.kha")
    };
    var F = function() {};
    m["kha.System"] = F;
    F.__name__ = ["kha", "System"];
    F.__properties__ = {
        get_systemId: "get_systemId",
        get_refreshRate: "get_refreshRate",
        get_vsync: "get_vsync",
        get_screenRotation: "get_screenRotation",
        get_pixelHeight: "get_pixelHeight",
        get_pixelWidth: "get_pixelWidth",
        get_time: "get_time"
    };
    F.init = function(a, b, c, d) {
        g.init(a, b, c, d)
    };
    F.notifyOnRender = function(a) {
        F.renderListeners.push(a)
    };
    F.notifyOnApplicationState = function(a, b, c, d, e) {
        F.foregroundListeners.push(a);
        F.resumeListeners.push(b);
        F.pauseListeners.push(c);
        F.backgroundListeners.push(d);
        F.shutdownListeners.push(e)
    };
    F.render = function(a) {
        for (var b = 0, c = F.renderListeners; b < c.length;) {
            var d = c[b];
            ++b;
            d(a)
        }
    };
    F.foreground = function() {
        for (var a = 0, b = F.foregroundListeners; a < b.length;) {
            var c = b[a];
            ++a;
            c()
        }
    };
    F.resume = function() {
        for (var a = 0, b = F.resumeListeners; a < b.length;) {
            var c = b[a];
            ++a;
            c()
        }
    };
    F.pause = function() {
        for (var a = 0, b = F.pauseListeners; a < b.length;) {
            var c = b[a];
            ++a;
            c()
        }
    };
    F.background = function() {
        for (var a = 0, b = F.backgroundListeners; a < b.length;) {
            var c = b[a];
            ++a;
            c()
        }
    };
    F.shutdown = function() {
        for (var a = 0, b = F.shutdownListeners; a < b.length;) {
            var c = b[a];
            ++a;
            c()
        }
    };
    F.get_time = function() {
        return g.getTime()
    };
    F.get_pixelWidth = function() {
        return g.getPixelWidth()
    };
    F.get_pixelHeight = function() {
        return g.getPixelHeight()
    };
    F.get_screenRotation = function() {
        return g.getScreenRotation()
    };
    F.get_vsync = function() {
        return g.getVsync()
    };
    F.get_refreshRate = function() {
        return g.getRefreshRate()
    };
    F.get_systemId = function() {
        return g.getSystemId()
    };
    F.requestShutdown = function() {
        g.requestShutdown()
    };
    F.changeResolution = function(a, b) {
        g.changeResolution(a, b)
    };
    F.loadUrl = function(a) {};
    var sd = function() {
        this.axes = [];
        this.buttons = []
    };
    m["kha.GamepadStates"] = sd;
    sd.__name__ = ["kha", "GamepadStates"];
    sd.prototype = {
        axes: null,
        buttons: null,
        __class__: sd
    };
    var g = function() {};
    m["kha.SystemImpl"] = g;
    g.__name__ = ["kha", "SystemImpl"];
    g.initPerformanceTimer = function() {
        g.performance = (null != window.performance ? window.performance : window.Date)
    };
    g.init = function(a, b, c, d) {
        g.init2();
        d()
    };
    g.setCanvas = function(a) {
        g.khanvas = a
    };
    g.getScreenRotation = function() {
        return La.RotationNone
    };
    g.getTime = function() {
        return g.performance.now() / 1E3
    };
    g.getPixelWidth = function() {
        return g.khanvas.width
    };
    g.getPixelHeight = function() {
        return g.khanvas.height
    };
    g.getVsync = function() {
        return !0
    };
    g.getRefreshRate = function() {
        return 60
    };
    g.getSystemId = function() {
        return "HTML5"
    };
    g.requestShutdown = function() {
        window.close()
    };
    g.init2 = function(a) {
        R.trace = G.__trace;
        g.keyboard = new xb;
        g.mouse = new Ea;
        g.surface = new Ma;
        g.gamepads = [];
        g.gamepadStates = [];
        a = 0;
        for (var b = g.maxGamepads; a < b;) {
            var c = a++;
            g.gamepads[c] = new yb(c);
            g.gamepadStates[c] = new sd
        }
        g.pressedKeys = [];
        for (a = 0; 256 > a;) a++, g.pressedKeys.push(!1);
        for (a = 0; 256 > a;) a++, g.pressedKeys.push(null);
        g.buttonspressed = [];
        for (a = 0; 10 > a;) a++, g.buttonspressed.push(!1);
        ta.init();
        g.initPerformanceTimer();
        r.init();
        g.loadFinished();
        lc.instance = new Vc
    };
    g.getMouse = function(a) {
        return 0 != a ? null : g.mouse
    };
    g.getKeyboard = function(a) {
        return 0 != a ? null : g.keyboard
    };
    g.checkGamepadButton = function(a, b) {
        g.buttonspressed[b] ? .5 > a.buttons[b] && (g.buttonspressed[b] = !1) : .5 < a.buttons[b] && (g.buttonspressed[b] = !0)
    };
    g.checkGamepad = function(a) {
        for (var b = 0, c = a.axes.length; b < c;) {
            var d = b++;
            if (null != a.axes[d] && g.gamepadStates[a.index].axes[d] != a.axes[d]) {
                var e = a.axes[d];
                1 == d % 2 && (e = -e);
                g.gamepadStates[a.index].axes[d] = e;
                g.gamepads[a.index].sendAxisEvent(d, e)
            }
        }
        b = 0;
        for (c = a.buttons.length; b < c;) d = b++, null != a.buttons[d] && g.gamepadStates[a.index].buttons[d] != a.buttons[d].value && (g.gamepadStates[a.index].buttons[d] = a.buttons[d].value, g.gamepads[a.index].sendButtonEvent(d, a.buttons[d].value));
        4 >= a.axes.length && 7 < a.buttons.length && (g.gamepadStates[a.index].axes[4] = a.buttons[6].value, g.gamepads[a.index].sendAxisEvent(4, a.buttons[6].value), g.gamepadStates[a.index].axes[5] = a.buttons[7].value, g.gamepads[a.index].sendAxisEvent(5, a.buttons[7].value))
    };
    g.loadFinished = function() {
        var a = window.document.getElementById("khanvas"),
            b = !1;
        try {
            g.gl = a.getContext("experimental-webgl", {
                alpha: !1,
                antialias: !1,
                stencil: !0
            }), null != g.gl && (g.gl.pixelStorei(37441, 1), g.gl.getExtension("OES_texture_float"), g.drawBuffers = g.gl.getExtension("WEBGL_draw_buffers"), b = !0, Z.init())
        } catch (f) {
            f instanceof u && (f = f.val), R.trace(f, {
                fileName: "SystemImpl.hx",
                lineNumber: 213,
                className: "kha.SystemImpl",
                methodName: "loadFinished"
            })
        }
        g.setCanvas(a);
        b ? (b = b ? new oc : null, g.frame = new Wb(null, null, b), g.frame.init(new Mb(g.frame), new pc(g.frame), b)) : (b = new jb(a.getContext("2d"), 640, 480), g.frame = new Wb(null, b, null), g.frame.init(new Mb(g.frame), b, null));
        ka._init() ? (g._hasWebAudio = !0, ha._init()) : (g._hasWebAudio = !1, Wc._compile(), ha = Wc);
        r.start();
        var b = window,
            c = b.requestAnimationFrame;
        null == c && (c = b.mozRequestAnimationFrame);
        null == c && (c = b.webkitRequestAnimationFrame);
        null == c && (c = b.msRequestAnimationFrame);
        var d, e = null;
        d = e = function(b) {
            b = window;
            null == c ? b.setTimeout(e, 16.666666666666668) : c(e);
            b = navigator.getGamepads && navigator.getGamepads() || navigator.webkitGetGamepads && navigator.webkitGetGamepads();
            if (null != b)
                for (var d = 0, n = b.length; d < n;) {
                    var k = d++,
                        k = b[k];
                    null != k && (g.checkGamepadButton(k, 0), g.checkGamepadButton(k, 1), g.checkGamepadButton(k, 12), g.checkGamepadButton(k, 13), g.checkGamepadButton(k, 14), g.checkGamepadButton(k, 15), g.checkGamepad(k))
                }
            r.executeFrame();
            if (a.getContext) {
                b = a.clientWidth;
                d = a.clientHeight;
                if (a.width != b || a.height != d) a.width = b, a.height = d;
                F.render(g.frame);
                null != g.gl && (g.gl.clearColor(1, 1, 1, 1), g.gl.colorMask(!1, !1, !1, !0), g.gl.clear(16384), g.gl.colorMask(!0, !0, !0, !0))
            }
        };
        null == c ? b.setTimeout(d, 16.666666666666668) : c(d);
        null == a.getAttribute("tabindex") && a.setAttribute("tabindex", "0");
        a.focus();
        a.oncontextmenu = function(a) {
            a.stopPropagation();
            a.preventDefault()
        };
        a.onmousedown = g.mouseDown;
        a.onmousemove = g.mouseMove;
        a.onkeydown = g.keyDown;
        a.onkeyup = g.keyUp;
        a.onblur = g.onBlur;
        a.onfocus = g.onFocus;
        a.onwheel ? a.onwheel = g.mouseWheel : a.onmousewheel && (a.onmousewheel = g.mouseWheel);
        a.addEventListener("wheel mousewheel", g.mouseWheel, !1);
        a.addEventListener("touchstart", g.touchDown, !1);
        a.addEventListener("touchend", g.touchUp, !1);
        a.addEventListener("touchmove", g.touchMove, !1);
        window.addEventListener("unload", g.unload)
    };
    g.lockMouse = function() {
        (ga = g.khanvas, M(ga, ga.requestPointerLock)) ? g.khanvas.requestPointerLock(): canvas.mozRequestPointerLock ? g.khanvas.mozRequestPointerLock() : canvas.webkitRequestPointerLock && g.khanvas.webkitRequestPointerLock()
    };
    g.unlockMouse = function() {
        document.exitPointerLock ? document.exitPointerLock() : document.mozExitPointerLock ? document.mozExitPointerLock() : document.webkitExitPointerLock && document.webkitExitPointerLock()
    };
    g.canLockMouse = function() {
        return "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in
            document
    };
    g.isMouseLocked = function() {
        return document.pointerLockElement === kha_Sys.khanvas || document.mozPointerLockElement === kha_Sys.khanvas || document.webkitPointerLockElement === kha_Sys.khanvas
    };
    g.notifyOfMouseLockChange = function(a, b) {
        window.document.addEventListener("pointerlockchange", a, !1);
        window.document.addEventListener("mozpointerlockchange", a, !1);
        window.document.addEventListener("webkitpointerlockchange", a, !1);
        window.document.addEventListener("pointerlockerror", b, !1);
        window.document.addEventListener("mozpointerlockerror", b, !1);
        window.document.addEventListener("webkitpointerlockerror", b, !1)
    };
    g.removeFromMouseLockChange = function(a, b) {
        window.document.removeEventListener("pointerlockchange", a, !1);
        window.document.removeEventListener("mozpointerlockchange", a, !1);
        window.document.removeEventListener("webkitpointerlockchange", a, !1);
        window.document.removeEventListener("pointerlockerror", b, !1);
        window.document.removeEventListener("mozpointerlockerror", b, !1);
        window.document.removeEventListener("webkitpointerlockerror", b, !1)
    };
    g.unload = function(a) {};
    g.setMouseXY = function(a) {
        var b = g.khanvas.getBoundingClientRect(),
            c = g.khanvas.clientLeft,
            d = g.khanvas.clientTop;
        g.mouseX = (a.clientX - b.left - c) * g.khanvas.width / (b.width - 2 * c) | 0;
        g.mouseY = (a.clientY - b.top - d) * g.khanvas.height / (b.height - 2 * d) | 0
    };
    g.mouseWheel = function(a) {
        g.mouse.sendWheelEvent(a.deltaY | 0)
    };
    g.mouseDown = function(a) {
        window.document.addEventListener("mouseup", g.mouseUp);
        g.setMouseXY(a);
        1 == a.which ? a.ctrlKey ? (g.leftMouseCtrlDown = !0, g.mouse.sendDownEvent(1, g.mouseX, g.mouseY)) : (g.leftMouseCtrlDown = !1, g.mouse.sendDownEvent(0, g.mouseX, g.mouseY)) : 2 == a.which ? g.mouse.sendDownEvent(2, g.mouseX, g.mouseY) : 3 == a.which && g.mouse.sendDownEvent(1, g.mouseX, g.mouseY)
    };
    g.mouseUp = function(a) {
        window.document.removeEventListener("mouseup", g.mouseUp);
        g.setMouseXY(a);
        1 == a.which ? (g.leftMouseCtrlDown ? g.mouse.sendUpEvent(1, g.mouseX, g.mouseY) : g.mouse.sendUpEvent(0, g.mouseX, g.mouseY), g.leftMouseCtrlDown = !1) : 2 == a.which ? g.mouse.sendUpEvent(2, g.mouseX, g.mouseY) : 3 == a.which && g.mouse.sendUpEvent(1, g.mouseX, g.mouseY)
    };
    g.mouseMove = function(a) {
        var b = g.mouseX,
            c = g.mouseY;
        g.setMouseXY(a);
        g.mouse.sendMoveEvent(g.mouseX, g.mouseY, a.movementX || a.mozMovementX || a.webkitMovementX || g.mouseX - b, a.movementY || a.mozMovementY || a.webkitMovementY || g.mouseY - c)
    };
    g.setTouchXY = function(a) {
        var b = g.khanvas.getBoundingClientRect(),
            c = g.khanvas.clientLeft,
            d = g.khanvas.clientTop;
        g.touchX = (a.clientX - b.left - c) * g.khanvas.width / (b.width - 2 * c) | 0;
        g.touchY = (a.clientY - b.top - d) * g.khanvas.height / (b.height - 2 * d) | 0
    };
    g.touchDown = function(a) {
        var b = 0;
        for (a = a.changedTouches; b < a.length;) {
            var c = a[b];
            ++b;
            g.setTouchXY(c);
            g.mouse.sendDownEvent(0, g.touchX, g.touchY);
            g.surface.sendTouchStartEvent(c.identifier, g.touchX, g.touchY)
        }
    };
    g.touchUp = function(a) {
        var b = 0;
        for (a = a.changedTouches; b < a.length;) {
            var c = a[b];
            ++b;
            g.setTouchXY(c);
            g.mouse.sendUpEvent(0, g.touchX, g.touchY);
            g.surface.sendTouchEndEvent(c.identifier, g.touchX, g.touchY)
        }
    };
    g.touchMove = function(a) {
        var b = 0,
            c = 0;
        for (a = a.changedTouches; c < a.length;) {
            var d = a[c];
            ++c;
            g.setTouchXY(d);
            if (0 == b) {
                var e = g.touchX -
                    g.lastFirstTouchX,
                    f = g.touchY - g.lastFirstTouchY;
                g.lastFirstTouchX = g.touchX;
                g.lastFirstTouchY = g.touchY;
                g.mouse.sendMoveEvent(g.touchX, g.touchY, e, f)
            }
            g.surface.sendMoveEvent(d.identifier, g.touchX, g.touchY);
            b++
        }
    };
    g.onBlur = function() {
        F.background()
    };
    g.onFocus = function() {
        F.foreground()
    };
    g.keycodeToChar = function(a, b, c) {
        if (null != a) {
            if (1 == a.length) return a;
            switch (a) {
                case "Add":
                    return "+";
                case "Subtract":
                    return "-";
                case "Multiply":
                    return "*";
                case "Divide":
                    return "/"
            }
        }
        switch (b) {
            case 187:
                return c ? "*" : "+";
            case 188:
                return c ? ";" : ",";
            case 189:
                return c ? "_" : "-";
            case 190:
                return c ? ":" : ".";
            case 191:
                return c ? "'" : "#";
            case 226:
                return c ? ">" : "<";
            case 106:
                return "*";
            case 107:
                return "+";
            case 109:
                return "-";
            case 111:
                return "/";
            case 49:
                return c ? "!" : "1";
            case 50:
                return c ? '"' : "2";
            case 51:
                return c ? "\u00a7" : "3";
            case 52:
                return c ? "$" : "4";
            case 53:
                return c ? "%" : "5";
            case 54:
                return c ? "&" : "6";
            case 55:
                return c ? "/" : "7";
            case 56:
                return c ? "(" : "8";
            case 57:
                return c ? ")" : "9";
            case 48:
                return c ? "=" : "0";
            case 219:
                return c ? "?" : "\u00df";
            case 212:
                return c ? "`" : "\u00b4"
        }
        return 96 <= b && 105 >= b ? String.fromCharCode(-48 + b) : 65 <= b && 90 >= b && !c ? String.fromCharCode(b - 65 + 97) : String.fromCharCode(b)
    };
    g.keyDown = function(a) {
        a.stopPropagation();
        if (g.pressedKeys[a.keyCode]) a.preventDefault();
        else switch (g.pressedKeys[a.keyCode] = !0, a.keyCode) {
            case 8:
                g.keyboard.sendDownEvent(y.BACKSPACE, "");
                a.preventDefault();
                break;
            case 9:
                g.keyboard.sendDownEvent(y.TAB, "");
                a.preventDefault();
                break;
            case 13:
                g.keyboard.sendDownEvent(y.ENTER, "");
                a.preventDefault();
                break;
            case 16:
                g.keyboard.sendDownEvent(y.SHIFT, "");
                a.preventDefault();
                break;
            case 17:
                g.keyboard.sendDownEvent(y.CTRL, "");
                a.preventDefault();
                break;
            case 18:
                g.keyboard.sendDownEvent(y.ALT, "");
                a.preventDefault();
                break;
            case 27:
                g.keyboard.sendDownEvent(y.ESC, "");
                a.preventDefault();
                break;
            case 32:
                g.keyboard.sendDownEvent(y.CHAR, " ");
                a.preventDefault();
                break;
            case 46:
                g.keyboard.sendDownEvent(y.DEL, "");
                a.preventDefault();
                break;
            case 38:
                g.keyboard.sendDownEvent(y.UP, "");
                a.preventDefault();
                break;
            case 40:
                g.keyboard.sendDownEvent(y.DOWN, "");
                a.preventDefault();
                break;
            case 37:
                g.keyboard.sendDownEvent(y.LEFT, "");
                a.preventDefault();
                break;
            case 39:
                g.keyboard.sendDownEvent(y.RIGHT, "");
                a.preventDefault();
                break;
            default:
                a.altKey || (a = g.keycodeToChar(a.key, a.keyCode, a.shiftKey), g.keyboard.sendDownEvent(y.CHAR, a))
        }
    };
    g.keyUp = function(a) {
        a.preventDefault();
        a.stopPropagation();
        g.pressedKeys[a.keyCode] = !1;
        switch (a.keyCode) {
            case 8:
                g.keyboard.sendUpEvent(y.BACKSPACE, "");
                break;
            case 9:
                g.keyboard.sendUpEvent(y.TAB, "");
                break;
            case 13:
                g.keyboard.sendUpEvent(y.ENTER, "");
                break;
            case 16:
                g.keyboard.sendUpEvent(y.SHIFT, "");
                break;
            case 17:
                g.keyboard.sendUpEvent(y.CTRL, "");
                break;
            case 18:
                g.keyboard.sendUpEvent(y.ALT, "");
                break;
            case 27:
                g.keyboard.sendUpEvent(y.ESC, "");
                break;
            case 32:
                g.keyboard.sendUpEvent(y.CHAR, " ");
                break;
            case 46:
                g.keyboard.sendUpEvent(y.DEL, "");
                break;
            case 38:
                g.keyboard.sendUpEvent(y.UP, "");
                break;
            case 40:
                g.keyboard.sendUpEvent(y.DOWN, "");
                break;
            case 37:
                g.keyboard.sendUpEvent(y.LEFT, "");
                break;
            case 39:
                g.keyboard.sendUpEvent(y.RIGHT, "");
                break;
            default:
                a.altKey || (a = g.keycodeToChar(a.key, a.keyCode, a.shiftKey), g.keyboard.sendUpEvent(y.CHAR, a))
        }
    };
    g.canSwitchFullscreen = function() {
        return "fullscreenElement " in document || "mozFullScreenElement" in document || "webkitFullscreenElement" in document || "msFullscreenElement" in document
    };
    g.isFullscreen = function() {
        return document.fullscreenElement === this.khanvas || document.mozFullScreenElement === this.khanvas || document.webkitFullscreenElement === this.khanvas || document.msFullscreenElement === this.khanvas
    };
    g.requestFullscreen = function() {
        (ga = g.khanvas, M(ga, ga.requestFullscreen)) ? g.khanvas.requestFullscreen(): g.khanvas.msRequestFullscreen ? g.khanvas.msRequestFullscreen() : g.khanvas.mozRequestFullScreen ? g.khanvas.mozRequestFullScreen() : g.khanvas.webkitRequestFullscreen && g.khanvas.webkitRequestFullscreen()
    };
    g.exitFullscreen = function() {
        document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
    };
    g.changeResolution = function(a, b) {};
    g.prototype = {
        notifyOfFullscreenChange: function(a, b) {
            window.document.addEventListener("fullscreenchange", a, !1);
            window.document.addEventListener("mozfullscreenchange", a, !1);
            window.document.addEventListener("webkitfullscreenchange", a, !1);
            window.document.addEventListener("MSFullscreenChange", a, !1);
            window.document.addEventListener("fullscreenerror", b, !1);
            window.document.addEventListener("mozfullscreenerror", b, !1);
            window.document.addEventListener("webkitfullscreenerror", b, !1);
            window.document.addEventListener("MSFullscreenError", b, !1)
        },
        removeFromFullscreenChange: function(a, b) {
            window.document.removeEventListener("fullscreenchange", a, !1);
            window.document.removeEventListener("mozfullscreenchange", a, !1);
            window.document.removeEventListener("webkitfullscreenchange", a, !1);
            window.document.removeEventListener("MSFullscreenChange", a, !1);
            window.document.removeEventListener("fullscreenerror", b, !1);
            window.document.removeEventListener("mozfullscreenerror", b, !1);
            window.document.removeEventListener("webkitfullscreenerror", b, !1);
            window.document.removeEventListener("MSFullscreenError", b, !1)
        },
        __class__: g
    };
    var qc = function() {};
    m["kha.Video"] = qc;
    qc.__name__ = ["kha", "Video"];
    qc.__interfaces__ = [Lb];
    qc.prototype = {
        width: function() {
            return 100
        },
        height: function() {
            return 100
        },
        play: function(a) {},
        pause: function() {},
        stop: function() {},
        getLength: function() {
            return 0
        },
        getCurrentPos: function() {
            return 0
        },
        getVolume: function() {
            return 1
        },
        setVolume: function(a) {},
        isFinished: function() {
            return this.getCurrentPos() >= this.getLength()
        },
        unload: function() {},
        __class__: qc
    };
    var za = function(a, b, c, d, e) {
        this.myWidth = a;
        this.myHeight = b;
        this.format = c;
        this.renderTarget = d;
        this.video = this.image = null;
        this.depthStencilFormat = e;
        d && this.createTexture()
    };
    m["kha.WebGLImage"] = za;
    za.__name__ = ["kha", "WebGLImage"];
    za.init = function() {
        var a = window.document.createElement("canvas");
        null != a && (za.context = a.getContext("2d"), a.width = 2048, a.height = 2048, za.context.globalCompositeOperation = "copy")
    };
    za.upperPowerOfTwo = function(a) {
        a--;
        a |= a >>> 1;
        a |= a >>> 2;
        a |= a >>> 4;
        a |= a >>> 8;
        a |= a >>> 16;
        a++;
        return a
    };
    za.__super__ = va;
    za.prototype = T(va.prototype, {
        image: null,
        video: null,
        data: null,
        myWidth: null,
        myHeight: null,
        format: null,
        renderTarget: null,
        frameBuffer: null,
        renderBuffer: null,
        texture: null,
        graphics1: null,
        graphics2: null,
        graphics4: null,
        depthStencilFormat: null,
        get_g1: function() {
            null == this.graphics1 && (this.graphics1 = new Mb(this));
            return this.graphics1
        },
        get_g2: function() {
            null == this.graphics2 && (this.graphics2 = new pc(this));
            return this.graphics2
        },
        get_g4: function() {
            null == this.graphics4 && (this.graphics4 = new oc(this));
            return this.graphics4
        },
        get_width: function() {
            return this.myWidth
        },
        get_height: function() {
            return this.myHeight
        },
        get_realWidth: function() {
            return this.myWidth
        },
        get_realHeight: function() {
            return this.myHeight
        },
        isOpaque: function(a, b) {
            if (null == this.data) {
                if (null == za.context) return !0;
                this.createImageData()
            }
            return 0 != this.data.data[b * E["int"](this.image.width) * 4 + 4 * a + 3]
        },
        at: function(a, b) {
            if (null == this.data) {
                if (null == za.context) return t.Black;
                this.createImageData()
            }
            var c = this.data.data[b * E["int"](this.image.width) * 4 + 4 * a];
            return t._new(c)
        },
        createImageData: function() {
            za.context.strokeStyle = "rgba(0,0,0,0)";
            za.context.fillStyle = "rgba(0,0,0,0)";
            za.context.fillRect(0, 0, this.image.width, this.image.height);
            za.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.image.width, this.image.height);
            this.data = za.context.getImageData(0, 0, this.image.width, this.image.height)
        },
        createTexture: function() {
            if (null != g.gl) {
                this.texture = g.gl.createTexture();
                g.gl.bindTexture(3553, this.texture);
                g.gl.texParameteri(3553, 10240, 9729);
                g.gl.texParameteri(3553, 10241, 9729);
                g.gl.texParameteri(3553, 10242, 33071);
                g.gl.texParameteri(3553, 10243, 33071);
                if (this.renderTarget) {
                    this.frameBuffer = g.gl.createFramebuffer();
                    g.gl.bindFramebuffer(36160, this.frameBuffer);
                    g.gl.texImage2D(3553, 0, 6408, this.get_realWidth(), this.get_realHeight(), 0, 6408, this.format == sa.RGBA128 ? 5126 : 5121, null);
                    g.gl.framebufferTexture2D(36160, 36064, 3553, this.texture, 0);
                    switch (this.depthStencilFormat) {
                        case 1:
                            this.renderBuffer = g.gl.createRenderbuffer();
                            g.gl.bindRenderbuffer(36161, this.renderBuffer);
                            g.gl.renderbufferStorage(36161, 33189, this.get_realWidth(), this.get_realHeight());
                            g.gl.framebufferRenderbuffer(36160, 36096, 36161, this.renderBuffer);
                            break;
                        case 2:
                            this.createDepthStencilBuffer();
                            break;
                        case 3:
                            this.createDepthStencilBuffer();
                            break;
                        case 4:
                            this.createDepthStencilBuffer()
                    }
                    g.gl.bindRenderbuffer(36161, null);
                    g.gl.bindFramebuffer(36160, null)
                } else null != this.video ? g.gl.texImage2D(3553, 0, 6408, 6408, 5121, this.video) : g.gl.texImage2D(3553, 0, 6408, 6408, this.format == sa.RGBA128 ? 5126 : 5121, this.image);
                g.gl.bindTexture(3553, null)
            }
        },
        createDepthStencilBuffer: function() {
            this.renderBuffer = g.gl.createRenderbuffer();
            g.gl.bindRenderbuffer(36161, this.renderBuffer);
            g.gl.renderbufferStorage(36161, 34041, this.get_realWidth(), this.get_realHeight());
            g.gl.framebufferRenderbuffer(36160, 33306, 36161, this.renderBuffer)
        },
        set: function(a) {
            g.gl.activeTexture(33984 + a);
            g.gl.bindTexture(3553, this.texture);
            null != this.video && g.gl.texImage2D(3553, 0, 6408, 6408, 5121, this.video)
        },
        bytes: null,
        lock: function(a) {
            return this.bytes = da.alloc(this.format == sa.RGBA32 ? 4 * this.get_width() * this.get_height() : this.format == sa.RGBA128 ? 16 * this.get_width() * this.get_height() : this.get_width() * this.get_height())
        },
        unlock: function() {
            if (null != g.gl) {
                this.texture = g.gl.createTexture();
                g.gl.bindTexture(3553, this.texture);
                g.gl.texParameteri(3553, 10240, 9729);
                g.gl.texParameteri(3553, 10241, 9729);
                g.gl.texParameteri(3553, 10242, 33071);
                g.gl.texParameteri(3553, 10243, 33071);
                switch (this.format[1]) {
                    case 1:
                        g.gl.texImage2D(3553, 0, 6409, this.get_width(), this.get_height(), 0, 6409, 5121, new eb(this.bytes.b.bufferValue));
                        if (1282 == g.gl.getError()) {
                            for (var a = da.alloc(this.get_width() * this.get_height() * 4), b = 0, c = this.get_height(); b < c;)
                                for (var d = b++, e = 0, f = this.get_width(); e < f;) {
                                    var h = e++,
                                        n = this.bytes.get(d * this.get_width() + h);
                                    a.set(d * this.get_width() * 4 + 4 * h, n);
                                    a.set(d * this.get_width() * 4 + 4 * h + 1, n);
                                    a.set(d * this.get_width() * 4 + 4 * h + 2, n);
                                    a.set(d * this.get_width() * 4 + 4 * h + 3, 255)
                                }
                            g.gl.texImage2D(3553, 0, 6408, this.get_width(), this.get_height(), 0, 6408, 5121, new eb(a.b.bufferValue))
                        }
                        break;
                    case 0:
                        g.gl.texImage2D(3553, 0, 6408, this.get_width(), this.get_height(), 0, 6408, 5121, new eb(this.bytes.b.bufferValue));
                        break;
                    case 2:
                        g.gl.texImage2D(3553, 0, 6408, this.get_width(), this.get_height(), 0, 6408, 5126, new eb(this.bytes.b.bufferValue))
                }
                g.gl.bindTexture(3553, null);
                this.bytes = null
            }
        },
        unload: function() {},
        __class__: za
    });
    var $b = {};
    m["kha.arrays._Float32Array.Float32Array_Impl_"] = $b;
    $b.__name__ = ["kha", "arrays", "_Float32Array", "Float32Array_Impl_"];
    $b.__properties__ = {
        get_length: "get_length"
    };
    $b._new = function(a) {
        return new Float32Array(a)
    };
    $b.get_length = function(a) {
        return a.length
    };
    $b.set = function(a, b, c) {
        return a[b] = c
    };
    $b.get = function(a, b) {
        return a[b]
    };
    $b.data = function(a) {
        return a
    };
    var Xc = function() {};
    m["kha.audio1.AudioChannel"] = Xc;
    Xc.__name__ = ["kha", "audio1", "AudioChannel"];
    Xc.prototype = {
        play: null,
        pause: null,
        stop: null,
        length: null,
        get_length: null,
        position: null,
        get_position: null,
        get_volume: null,
        set_volume: null,
        finished: null,
        get_finished: null,
        __class__: Xc,
        __properties__: {
            get_finished: "get_finished",
            set_volume: "set_volume",
            get_volume: "get_volume",
            get_position: "get_position",
            get_length: "get_length"
        }
    };
    var ka = function() {};
    m["kha.audio2.Audio"] = ka;
    ka.__name__ = ["kha", "audio2", "Audio"];
    ka.initContext = function() {
        try {
            ka._context = new AudioContext;
            return
        } catch (a) {
            a instanceof u && (a = a.val)
        }
        try {
            this._context = new webkitAudioContext
        } catch (a) {
            a instanceof u && (a = a.val)
        }
    };
    ka._init = function() {
        ka.initContext();
        if (null == ka._context) return !1;
        ka.buffer = new td(8192, 2, ka._context.sampleRate | 0);
        ka.processingNode = ka._context.createScriptProcessor(2048, 0, 2);
        ka.processingNode.onaudioprocess = function(a) {
            var b = a.outputBuffer.getChannelData(0),
                c = a.outputBuffer.getChannelData(1);
            if (null != ka.audioCallback) {
                ka.audioCallback(2 * a.outputBuffer.length, ka.buffer);
                var d = 0;
                for (a = a.outputBuffer.length; d < a;) {
                    var e = d++;
                    b[e] = ka.buffer.data[ka.buffer.readLocation];
                    ka.buffer.readLocation += 1;
                    c[e] = ka.buffer.data[ka.buffer.readLocation];
                    ka.buffer.readLocation += 1;
                    ka.buffer.readLocation >= ka.buffer.size && (ka.buffer.readLocation = 0)
                }
            } else
                for (d = 0, a = a.outputBuffer.length; d < a;) e = d++, b[e] = 0, c[e] = 0
        };
        ka.processingNode.connect(ka._context.destination);
        return !0
    };
    ka.play = function(a, b) {
        return null
    };
    var ha = function() {};
    m["kha.audio2.Audio1"] = ha;
    ha.__name__ = ["kha", "audio2", "Audio1"];
    ha._init = function() {
        ha.soundChannels = Array(16);
        ha.internalSoundChannels = Array(16);
        ha.sampleCache1 = Array(512);
        ha.sampleCache2 = Array(512);
        ka.audioCallback = ha._mix
    };
    ha.max = function(a, b) {
        return a > b ? a : b
    };
    ha.min = function(a, b) {
        return a < b ? a : b
    };
    ha._mix = function(a, b) {
        ha.sampleCache1.length < a && (ha.sampleCache1 = Array(a), ha.sampleCache2 = Array(a));
        for (var c = 0; c < a;) {
            var d = c++;
            ha.sampleCache2[d] = 0
        }
        for (c = 0; 16 > c;) d = c++, ha.internalSoundChannels[d] = ha.soundChannels[d];
        c = 0;
        for (d = ha.internalSoundChannels; c < d.length;) {
            var e = d[c];
            ++c;
            if (null != e && !e.get_finished()) {
                e.nextSamples(ha.sampleCache1, a, b.samplesPerSecond);
                for (var f = 0; f < a;) {
                    var h = f++,
                        n = h,
                        h = ha.sampleCache2[n] + ha.sampleCache1[h] * e.get_volume();
                    ha.sampleCache2[n] = h
                }
            }
        }
        for (c = 0; c < a;) d = c++, d = ha.max(ha.min(ha.sampleCache2[d], 1), -1), b.data[b.writeLocation] = d, b.writeLocation += 1, b.writeLocation >= b.size && (b.writeLocation = 0)
    };
    ha.play = function(a, b, c) {
        null == b && (b = !1);
        c = null;
        for (var d = 0; 16 > d;) {
            var e = d++;
            if (null == ha.soundChannels[e] || ha.soundChannels[e].get_finished()) {
                c = new Yc(b);
                c.data = a.data;
                ha.soundChannels[e] = c;
                break
            }
        }
        return c
    };
    var Yc = function(a) {
        this.paused = !1;
        this.looping = a;
        this.myVolume = 1;
        this.myPosition = 0
    };
    m["kha.audio2.AudioChannel"] = Yc;
    Yc.__name__ = ["kha", "audio2", "AudioChannel"];
    Yc.__interfaces__ = [Xc];
    Yc.prototype = {
        data: null,
        myVolume: null,
        myPosition: null,
        paused: null,
        looping: null,
        nextSamples: function(a, b, c) {
            if (this.paused)
                for (c = 0; c < b;) {
                    var d = c++;
                    a[d] = 0
                } else
                    for (c = 0; c < b;) d = c++, this.myPosition >= this.data.length && this.looping && (this.myPosition = 0), a[d] = this.myPosition < this.data.length ? this.data[this.myPosition] : 0, ++this.myPosition
        },
        play: function() {
            this.paused = !1
        },
        pause: function() {
            this.paused = !0
        },
        stop: function() {
            this.myPosition = this.data.length
        },
        length: null,
        get_length: function() {
            return this.data.length / 44100 / 2
        },
        position: null,
        get_position: function() {
            return this.myPosition / 44100 / 2
        },
        get_volume: function() {
            return this.myVolume
        },
        set_volume: function(a) {
            return this.myVolume = a
        },
        finished: null,
        get_finished: function() {
            return this.myPosition >= this.data.length
        },
        __class__: Yc,
        __properties__: {
            get_finished: "get_finished",
            set_volume: "set_volume",
            get_volume: "get_volume",
            get_position: "get_position",
            get_length: "get_length"
        }
    };
    var td = function(a, b, c) {
        this.size = a;
        this.data = Array(a);
        this.channels = b;
        this.samplesPerSecond = c;
        this.writeLocation = this.readLocation = 0
    };
    m["kha.audio2.Buffer"] = td;
    td.__name__ = ["kha", "audio2", "Buffer"];
    td.prototype = {
        channels: null,
        samplesPerSecond: null,
        data: null,
        size: null,
        readLocation: null,
        writeLocation: null,
        __class__: td
    };
    var fb = function() {};
    m["kha.audio2.ogg.tools.Crc32"] = fb;
    fb.__name__ = ["kha", "audio2", "ogg", "tools", "Crc32"];
    fb.init = function() {
        if (null == fb.table) {
            fb.table = Array(256);
            for (var a = 0; 256 > a;) {
                for (var b = a++, c = b << 24, d = 0; 8 > d;) {
                    d++;
                    var e;
                    e = W.gte(c, -2147483648) ? 79764919 : 0;
                    c = c << 1 ^ e
                }
                fb.table[b] = c
            }
        }
    };
    fb.update = function(a, b) {
        return a << 8 ^ fb.table[b ^ a >>> 24]
    };
    var lb = function() {};
    m["kha.audio2.ogg.tools.MathTools"] = lb;
    lb.__name__ = ["kha", "audio2", "ogg", "tools", "MathTools"];
    lb.ilog = function(a) {
        var b = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
        return 16384 > a ? 16 > a ? b[a] : 512 > a ? 5 + b[a >> 5] : 10 + b[a >> 10] : 16777216 > a ? 524288 > a ? 15 + b[a >> 15] : 20 + b[a >> 20] : 536870912 > a ? 25 + b[a >> 25] : -2147483648 > a ? 30 + b[a >> 30] : 0
    };
    var Ga = function() {};
    m["kha.audio2.ogg.tools.Mdct"] = Ga;
    Ga.__name__ = ["kha", "audio2", "ogg", "tools", "Mdct"];
    Ga.inverseTransform = function(a, b, c, d, e, f) {
        var h = b >> 1,
            n = b >> 2,
            k = b >> 3,
            A;
        A = Array(h);
        for (var g = h - 2, q = 0, l = 0; l != h;) A[g + 1] = a[l] * c[q] - a[l + 2] * c[q + 1], A[g] = a[l] * c[q + 1] + a[l + 2] * c[q], g -= 2, q += 2, l += 4;
        for (l = h - 3; 0 <= g;) A[g + 1] = -a[l + 2] * c[q] - -a[l] * c[q + 1], A[g] = -a[l + 2] * c[q + 1] + -a[l] * c[q], g -= 2, q += 2, l -= 4;
        for (var g = h - 8, q = n, l = 0, m = n, p = 0; 0 <= g;) {
            var r = A[q + 1] - A[l + 1],
                C = A[q] - A[l];
            a[m + 1] = A[q + 1] + A[l + 1];
            a[m] = A[q] + A[l];
            a[p + 1] = r * c[g + 4] - C * c[g + 5];
            a[p] = C * c[g + 4] + r * c[g + 5];
            r = A[q + 3] - A[l + 3];
            C = A[q + 2] - A[l + 2];
            a[m + 3] = A[q + 3] + A[l + 3];
            a[m + 2] = A[q + 2] + A[l + 2];
            a[p + 3] = r * c[g] - C * c[g + 1];
            a[p + 2] = C * c[g] + r * c[g + 1];
            g -= 8;
            m += 4;
            p += 4;
            q += 4;
            l += 4
        }
        g = lb.ilog(b) - 1;
        Ga.step3Iter0Loop(b >> 4, a, h - 1 - 0 * n, -(b >> 3), c);
        Ga.step3Iter0Loop(b >> 4, a, h - 1 - n, -(b >> 3), c);
        Ga.step3InnerRLoop(b >> 5, a, h - 1 - 0 * k, -(b >> 4), c, 16);
        Ga.step3InnerRLoop(b >> 5, a, h - 1 - k, -(b >> 4), c, 16);
        Ga.step3InnerRLoop(b >> 5, a, h - 1 - 2 * k, -(b >> 4), c, 16);
        Ga.step3InnerRLoop(b >> 5, a, h - 1 - 3 * k, -(b >> 4), c, 16);
        k = 2;
        for (q = g - 3 >> 1; k < q;)
            for (l = k++, m = b >> l + 2, p = m >> 1, r = 1 << l + 1, C = 0; C < r;) {
                var u = C++;
                Ga.step3InnerRLoop(b >> l + 4, a, h - 1 - m * u, -p, c, 1 << l + 3)
            }
        k = g - 3 >> 1;
        for (g -= 6; k < g;)
            for (u = k++, q = b >> u + 2, l = 1 << u + 3, m = q >> 1, p = 1 << u + 1, r = 0, C = h - 1, u = (b >> u + 6) + 1; 0 < --u;) Ga.step3InnerSLoop(p, a, C, -m, c, r, l, q), r += 4 * l, C -= 8;
        Ga.step3InnerSLoopLd654(b >> 5, a, h - 1, c, b);
        c = 0;
        n -= 4;
        for (k = h - 4; 0 <= n;) g = f[c], A[k + 3] = a[g], A[k + 2] = a[g + 1], A[n + 3] = a[g + 2], A[n + 2] = a[g + 3], g = f[c + 1], A[k + 1] = a[g], A[k] = a[g + 1], A[n + 1] = a[g + 2], A[n] = a[g + 3], n -= 4, k -= 4, c += 2;
        n = f = 0;
        for (c = h - 4; n < c;) g = A[n] - A[c + 2], q = A[n + 1] + A[c + 3], k = e[f + 1] * g + e[f] * q, g = e[f + 1] * q - e[f] * g, q = A[n] + A[c + 2], l = A[n + 1] - A[c + 3], A[n] = q + k, A[n + 1] = l + g, A[c + 2] = q - k, A[c + 3] = g - l, g = A[n + 2] - A[c], q = A[n + 3] + A[c + 1], k = e[f + 3] * g + e[f + 2] * q, g = e[f + 3] * q - e[f + 2] * g, q = A[n + 2] + A[c], l = A[n + 3] - A[c + 1], A[n + 2] = q + k, A[n + 3] = l + g, A[c] = q - k, A[c + 1] = g - l, f += 4, n += 4, c -= 4;
        e = h - 8;
        f = h - 8;
        n = 0;
        c = h - 4;
        for (b -= 4; 0 <= f;) k = A[f + 6] * d[e +
            7] - A[f + 7] * d[e + 6], g = -A[f + 6] * d[e + 6] - A[f + 7] * d[e + 7], a[n] = k, a[c + 3] = -k, a[h] = g, a[b + 3] = g, k = A[f + 4] * d[e + 5] - A[f + 5] * d[e + 4], g = -A[f + 4] * d[e + 4] - A[f + 5] * d[e + 5], a[n + 1] = k, a[c + 2] = -k, a[h + 1] = g, a[b + 2] = g, k = A[f + 2] * d[e + 3] - A[f + 3] * d[e + 2], g = -A[f + 2] * d[e + 2] - A[f + 3] * d[e + 3], a[n + 2] = k, a[c + 1] = -k, a[h + 2] = g, a[b + 1] = g, k = A[f] * d[e + 1] - A[f + 1] * d[e], g = -A[f] * d[e] - A[f + 1] * d[e + 1], a[n + 3] = k, a[c] = -k, a[h + 3] = g, a[b] = g, e -= 8, f -= 8, n += 4, h += 4, c -= 4, b -= 4
    };
    Ga.step3Iter0Loop = function(a, b, c, d, e) {
        var f = c;
        c += d;
        d = 0;
        for (a = (a >> 2) + 1; 0 < --a;) {
            var h = b[f] - b[c],
                n = b[f + -1] - b[c +
                    -1],
                k = f;
            b[k] += b[c];
            k = f + -1;
            b[k] += b[c + -1];
            b[c] = h * e[d] - n * e[d + 1];
            b[c + -1] = n * e[d] + h * e[d + 1];
            d += 8;
            h = b[f + -2] - b[c + -2];
            n = b[f + -3] - b[c + -3];
            k = f + -2;
            b[k] += b[c + -2];
            k = f + -3;
            b[k] += b[c + -3];
            b[c + -2] = h * e[d] - n * e[d + 1];
            b[c + -3] = n * e[d] + h * e[d + 1];
            d += 8;
            h = b[f + -4] - b[c + -4];
            n = b[f + -5] - b[c + -5];
            k = f + -4;
            b[k] += b[c + -4];
            k = f + -5;
            b[k] += b[c + -5];
            b[c + -4] = h * e[d] - n * e[d + 1];
            b[c + -5] = n * e[d] + h * e[d + 1];
            d += 8;
            h = b[f + -6] - b[c + -6];
            n = b[f + -7] - b[c + -7];
            k = f + -6;
            b[k] += b[c + -6];
            k = f + -7;
            b[k] += b[c + -7];
            b[c + -6] = h * e[d] - n * e[d + 1];
            b[c + -7] = n * e[d] + h * e[d + 1];
            d += 8;
            f -= 8;
            c -= 8
        }
    };
    Ga.step3InnerRLoop = function(a, b, c, d, e, f) {
        var h = 0,
            n = c;
        c += d;
        for (a = (a >> 2) + 1; 0 < --a;) {
            d = b[n] - b[c];
            var k = b[n + -1] - b[c + -1],
                g = n;
            b[g] += b[c];
            g = n + -1;
            b[g] += b[c + -1];
            b[c] = d * e[h] - k * e[h + 1];
            b[c + -1] = k * e[h] + d * e[h + 1];
            h += f;
            d = b[n + -2] - b[c + -2];
            k = b[n + -3] - b[c + -3];
            g = n + -2;
            b[g] += b[c + -2];
            g = n + -3;
            b[g] += b[c + -3];
            b[c + -2] = d * e[h] - k * e[h + 1];
            b[c + -3] = k * e[h] + d * e[h + 1];
            h += f;
            d = b[n + -4] - b[c + -4];
            k = b[n + -5] - b[c + -5];
            g = n + -4;
            b[g] += b[c + -4];
            g = n + -5;
            b[g] += b[c + -5];
            b[c + -4] = d * e[h] - k * e[h + 1];
            b[c + -5] = k * e[h] + d * e[h + 1];
            h += f;
            d = b[n + -6] - b[c + -6];
            k = b[n + -7] - b[c + -7];
            g = n + -6;
            b[g] += b[c + -6];
            g = n + -7;
            b[g] += b[c + -7];
            b[c + -6] = d * e[h] - k * e[h + 1];
            b[c + -7] = k * e[h] + d * e[h + 1];
            n -= 8;
            c -= 8;
            h += f
        }
    };
    Ga.step3InnerSLoop = function(a, b, c, d, e, f, h, n) {
        var k = e[f],
            g = e[f + 1],
            l = e[f + h],
            q = e[f + h + 1],
            J = e[f + 2 * h],
            m = e[f + 2 * h + 1],
            p = e[f + 3 * h];
        e = e[f + 3 * h + 1];
        f = c;
        c += d;
        for (a += 1; 0 < --a;) d = b[f] - b[c], h = b[f + -1] - b[c + -1], b[f] += b[c], b[f + -1] += b[c + -1], b[c] = d * k - h * g, b[c + -1] = h * k + d * g, d = b[f + -2] - b[c + -2], h = b[f + -3] - b[c + -3], b[f + -2] += b[c + -2], b[f + -3] += b[c + -3], b[c + -2] = d * l - h * q, b[c + -3] = h * l + d * q, d = b[f + -4] - b[c + -4], h = b[f + -5] - b[c + -5], b[f + -4] += b[c + -4], b[f + -5] += b[c + -5], b[c + -4] = d * J - h * m, b[c + -5] = h * J + d * m, d = b[f + -6] - b[c + -6], h = b[f + -7] - b[c + -7], b[f + -6] += b[c + -6], b[f + -7] += b[c + -7], b[c + -6] = d * p - h * e, b[c + -7] = h * p + d * e, f -= n, c -= n
    };
    Ga.iter54 = function(a, b) {
        var c = a[b],
            d = a[b + -4],
            e = c - d,
            f = c + d,
            c = a[b + -2],
            d = a[b + -6],
            h = c + d,
            n = c - d;
        a[b] = f + h;
        a[b + -2] = f - h;
        c = a[b + -3] - a[b + -7];
        a[b + -4] = e + c;
        a[b + -6] = e - c;
        c = a[b + -1];
        d = a[b + -5];
        e = c - d;
        c += d;
        d = a[b + -3] + a[b + -7];
        a[b + -1] = c + d;
        a[b + -3] = c - d;
        a[b + -5] = e - n;
        a[b + -7] = e + n
    };
    Ga.step3InnerSLoopLd654 = function(a, b, c, d, e) {
        d = d[e >> 3];
        e = c;
        for (a = c - 16 * a; e > a;) {
            c = b[e];
            var f = b[e + -8];
            b[e + -8] = c - f;
            b[e] = c + f;
            c = b[e + -1];
            f = b[e + -9];
            b[e + -9] = c - f;
            b[e + -1] = c + f;
            c = b[e + -2];
            var f = b[e + -10],
                h = c - f;
            b[e + -2] = c + f;
            c = b[e + -3];
            var f = b[e + -11],
                n = c - f;
            b[e + -3] = c + f;
            b[e + -10] = (h + n) * d;
            b[e + -11] = (n - h) * d;
            c = b[e + -4];
            f = b[e + -12];
            h = f - c;
            b[e + -4] = c + f;
            c = b[e + -5];
            f = b[e + -13];
            n = c - f;
            b[e + -5] = c + f;
            b[e + -12] = n;
            b[e + -13] = h;
            c = b[e + -6];
            f = b[e + -14];
            h = f - c;
            b[e + -6] = c + f;
            c = b[e + -7];
            f = b[e + -15];
            n = c - f;
            b[e + -7] = c + f;
            b[e + -14] = (h + n) * d;
            b[e + -15] = (h - n) * d;
            Ga.iter54(b, e);
            Ga.iter54(b, e - 8);
            e -= 16
        }
    };
    var mb = function(a, b, c) {
        this.seekFunc = b;
        this.inputLength = c;
        this.decoder = Pb.start(a);
        this.decoder.setupSampleNumber(b, c);
        this.loopStart = this.get_header().comment.get_loopStart();
        this.loopLength = this.get_header().comment.get_loopLength()
    };
    m["kha.audio2.ogg.vorbis.Reader"] = mb;
    mb.__name__ = ["kha", "audio2", "ogg", "vorbis", "Reader"];
    mb.openFromBytes = function(a) {
        var b = new Ub(a);
        return new mb(b, function(a, b) {
            return function(e) {
                a(b, e)
            }
        }(mb.seekBytes, b), a.length)
    };
    mb.seekBytes = function(a, b) {
        a.set_position(b)
    };
    mb.readAll = function(a, b, c) {
        null == c && (c = !1);
        var d = new Ub(a),
            e = Pb.start(d);
        e.setupSampleNumber(function(a, b) {
            return function(c) {
                a(b, c)
            }
        }(mb.seekBytes, d), a.length);
        a = e.header;
        for (d = Array(4096 * a.channel);;) {
            for (var f = e.read(d, 4096, a.channel, a.sampleRate, c), h = 0, n = f * a.channel; h < n;) {
                var k = h++;
                b.writeInt32(Nd.floatToI32(d[k]))
            }
            if (0 == f) break
        }
        return e.header
    };
    mb.prototype = {
        decoder: null,
        get_header: function() {
            return this.decoder.header
        },
        get_totalSample: function() {
            return this.decoder.totalSample
        },
        get_totalMillisecond: function() {
            return this.sampleToMillisecond(this.decoder.totalSample)
        },
        get_currentSample: function() {
            return this.decoder.currentSample
        },
        set_currentSample: function(a) {
            this.decoder.seek(this.seekFunc, this.inputLength, a);
            return this.decoder.currentSample
        },
        get_currentMillisecond: function() {
            return this.sampleToMillisecond(this.get_currentSample())
        },
        set_currentMillisecond: function(a) {
            this.set_currentSample(this.millisecondToSample(a));
            return this.get_currentMillisecond()
        },
        loopStart: null,
        loopLength: null,
        seekFunc: null,
        inputLength: null,
        read: function(a, b, c, d, e) {
            null == e && (e = !1);
            this.decoder.ensurePosition(this.seekFunc);
            null == b && (b = this.decoder.totalSample);
            null == c && (c = this.get_header().channel);
            null == d && (d = this.get_header().sampleRate);
            return this.decoder.read(a, b, c, d, e)
        },
        clone: function() {
            var a = V.createEmptyInstance(mb);
            a.seekFunc = this.seekFunc;
            a.inputLength = this.inputLength;
            a.decoder = this.decoder.clone(this.seekFunc);
            a.loopStart = this.loopStart;
            a.loopLength = this.loopLength;
            return a
        },
        sampleToMillisecond: function(a) {
            var b = this.get_header().sampleRate;
            return W.toFloat(a) / W.toFloat(b) * 1E3
        },
        millisecondToSample: function(a) {
            return Math.floor(function(b) {
                var c = a / 1E3;
                b = b.get_header().sampleRate;
                return W.toFloat(b) * c
            }(this))
        },
        __class__: mb,
        __properties__: {
            set_currentMillisecond: "set_currentMillisecond",
            get_currentMillisecond: "get_currentMillisecond",
            set_currentSample: "set_currentSample",
            get_currentSample: "get_currentSample",
            get_totalMillisecond: "get_totalMillisecond",
            get_totalSample: "get_totalSample",
            get_header: "get_header"
        }
    };
    var rc = function(a) {
        this.nextSeg = 0;
        this.firstDecode = !1;
        this.validBits = this.bytesInSeg = 0;
        this.input = a;
        this.inputPosition = 0;
        this.page = new Zc;
        fb.init()
    };
    m["kha.audio2.ogg.vorbis.VorbisDecodeState"] = rc;
    rc.__name__ = ["kha", "audio2", "ogg", "vorbis", "VorbisDecodeState"];
    rc.prototype = {
        page: null,
        eof: null,
        pFirst: null,
        pLast: null,
        validBits: null,
        inputPosition: null,
        input: null,
        discardSamplesDeferred: null,
        segments: null,
        bytesInSeg: null,
        channelBuffers: null,
        channelBufferStart: null,
        channelBufferEnd: null,
        currentSample: null,
        previousWindow: null,
        previousLength: null,
        finalY: null,
        firstDecode: null,
        nextSeg: null,
        acc: null,
        lastSeg: null,
        lastSegWhich: null,
        endSegWithKnownLoc: null,
        knownLocForPacket: null,
        error: null,
        currentLoc: null,
        currentLocValid: null,
        firstAudioPageOffset: null,
        setup: function(a, b) {
            var c;
            this.inputPosition += 1;
            c = this.input.readByte();
            this.segments = this.read(c);
            this.endSegWithKnownLoc = -2;
            if (-1 != a || -1 != b)
                for (var d = c - 1; 0 <= d && !(255 > this.segments[d]);) 0 <= d && (this.endSegWithKnownLoc = d, this.knownLocForPacket = a), d--;
            if (this.firstDecode) {
                for (var d = 0, e = new sc, f = 0; f < c;) var h = f++,
                    d = d + this.segments[h];
                e.pageStart = this.firstAudioPageOffset;
                e.pageEnd = e.pageStart + (d + (27 + c));
                e.firstDecodedSample = 0;
                e.lastDecodedSample = a;
                this.pFirst = e
            }
            this.nextSeg = 0
        },
        clone: function(a) {
            var b = V.createEmptyInstance(rc);
            a(this.inputPosition);
            b.input = this.input;
            b.eof = this.eof;
            b.validBits = this.validBits;
            b.discardSamplesDeferred = this.discardSamplesDeferred;
            b.firstDecode = this.firstDecode;
            b.nextSeg = this.nextSeg;
            b.bytesInSeg = this.bytesInSeg;
            b.acc = b.acc;
            b.lastSeg = this.lastSeg;
            b.lastSegWhich = this.lastSegWhich;
            b.currentLoc = this.currentLoc;
            b.currentLocValid = this.currentLocValid;
            b.inputPosition = this.inputPosition;
            b.firstAudioPageOffset = this.firstAudioPageOffset;
            b.error = this.error;
            b.segments = this.segments;
            b.pFirst = this.pFirst;
            b.pLast = this.pLast;
            b.page = this.page.clone();
            return b
        },
        next: function() {
            if (this.lastSeg) return 0;
            if (-1 == this.nextSeg) {
                this.lastSegWhich = this.segments.length - 1;
                try {
                    this.page.start(this)
                } catch (b) {
                    b instanceof u && (b = b.val);
                    if (G.__instanceof(b, O)) return this.lastSeg = !0, this.error = b, 0;
                    throw b;
                }
                if (0 == (this.page.flag & 1)) throw new u(new O(w.CONTINUED_PACKET_FLAG_INVALID, null, {
                    fileName: "VorbisDecodeState.hx",
                    lineNumber: 171,
                    className: "kha.audio2.ogg.vorbis.VorbisDecodeState",
                    methodName: "next"
                }));
            }
            var a;
            a = this.nextSeg++;
            a = this.segments[a];
            255 > a && (this.lastSeg = !0, this.lastSegWhich = this.nextSeg - 1);
            this.nextSeg >= this.segments.length && (this.nextSeg = -1);
            return this.bytesInSeg = a
        },
        startPacket: function() {
            for (; - 1 == this.nextSeg;)
                if (this.page.start(this), 0 != (this.page.flag & 1)) throw new u(new O(w.MISSING_CAPTURE_PATTERN, null, {
                    fileName: "VorbisDecodeState.hx",
                    lineNumber: 193,
                    className: "kha.audio2.ogg.vorbis.VorbisDecodeState",
                    methodName: "startPacket"
                }));
            this.lastSeg = !1;
            this.bytesInSeg = this.validBits = 0
        },
        maybeStartPacket: function() {
            if (-1 == this.nextSeg) {
                var a = !1,
                    b;
                try {
                    this.inputPosition += 1, b = this.input.readByte()
                } catch (c) {
                    if (c instanceof u && (c = c.val), G.__instanceof(c, Kb)) a = !0, b = 0;
                    else throw c;
                }
                if (a) return !1;
                (a = 79 != b) || (this.inputPosition += 1, a = 103 != this.input.readByte());
                a || (this.inputPosition += 1, a = 103 != this.input.readByte());
                a || (this.inputPosition += 1, a = 83 != this.input.readByte());
                if (a) throw new u(new O(w.MISSING_CAPTURE_PATTERN, null, {
                    fileName: "VorbisDecodeState.hx",
                    lineNumber: 218,
                    className: "kha.audio2.ogg.vorbis.VorbisDecodeState",
                    methodName: "maybeStartPacket"
                }));
                this.page.startWithoutCapturePattern(this)
            }
            this.startPacket();
            return !0
        },
        readBits: function(a) {
            if (0 > this.validBits) return 0;
            if (this.validBits < a) {
                if (24 < a) return this.readBits(24) + (this.readBits(a - 24) << 24);
                0 == this.validBits && (this.acc = 0);
                do
                    if (0 != this.bytesInSeg || !this.lastSeg && 0 != this.next()) {
                        this.bytesInSeg--;
                        var b = void 0;
                        this.inputPosition += 1;
                        b = this.input.readByte();
                        this.acc += b << this.validBits;
                        this.validBits += 8
                    } else {
                        this.validBits = -1;
                        break
                    }
                while (this.validBits < a);
                if (0 > this.validBits) return 0;
                b = this.acc & (1 << a) - 1;
                this.acc >>>= a;
                this.validBits -= a;
                return b
            }
            b = this.acc & (1 << a) - 1;
            this.acc >>>= a;
            this.validBits -= a;
            return b
        },
        readPacketRaw: function() {
            return 0 != this.bytesInSeg || !this.lastSeg && 0 != this.next() ? (this.bytesInSeg--, this.inputPosition += 1, this.input.readByte()) : -1
        },
        readPacket: function() {
            var a;
            0 != this.bytesInSeg || !this.lastSeg && 0 != this.next() ? (this.bytesInSeg--, this.inputPosition += 1, a = this.input.readByte()) : a = -1;
            this.validBits = 0;
            return a
        },
        flushPacket: function() {
            for (; 0 != this.bytesInSeg || !this.lastSeg && 0 != this.next();) this.bytesInSeg--, this.inputPosition += 1, this.input.readByte()
        },
        vorbisValidate: function() {
            for (var a = da.alloc(6), b = 0; 6 > b;) {
                var c = b++;
                a.set(c, this.readPacket())
            }
            if ("vorbis" != a.toString()) throw new u(new O(w.INVALID_SETUP, "vorbis header", {
                fileName: "VorbisDecodeState.hx",
                lineNumber: 300,
                className: "kha.audio2.ogg.vorbis.VorbisDecodeState",
                methodName: "vorbisValidate"
            }));
        },
        firstPageValidate: function() {
            if (1 != this.segments.length) throw new u(new O(w.INVALID_FIRST_PAGE, "segmentCount", {
                fileName: "VorbisDecodeState.hx",
                lineNumber: 307,
                className: "kha.audio2.ogg.vorbis.VorbisDecodeState",
                methodName: "firstPageValidate"
            }));
            if (30 != this.segments[0]) throw new u(new O(w.INVALID_FIRST_PAGE, "decodeState head", {
                fileName: "VorbisDecodeState.hx",
                lineNumber: 310,
                className: "kha.audio2.ogg.vorbis.VorbisDecodeState",
                methodName: "firstPageValidate"
            }));
        },
        startFirstDecode: function() {
            this.firstAudioPageOffset = this.inputPosition;
            this.firstDecode = !0
        },
        capturePattern: function() {
            this.inputPosition += 1;
            var a;
            (a = 79 != this.input.readByte()) || (this.inputPosition += 1, a = 103 != this.input.readByte());
            a || (this.inputPosition += 1, a = 103 != this.input.readByte());
            a || (this.inputPosition += 1, a = 83 != this.input.readByte());
            if (a) throw new u(new O(w.MISSING_CAPTURE_PATTERN, null, {
                fileName: "VorbisDecodeState.hx",
                lineNumber: 323,
                className: "kha.audio2.ogg.vorbis.VorbisDecodeState",
                methodName: "capturePattern"
            }));
        },
        skip: function(a) {
            this.read(a)
        },
        prepHuffman: function() {
            if (24 >= this.validBits) {
                0 == this.validBits && (this.acc = 0);
                do
                    if (0 != this.bytesInSeg || !this.lastSeg && 0 != this.next()) {
                        this.bytesInSeg--;
                        var a = void 0;
                        this.inputPosition += 1;
                        a = this.input.readByte();
                        this.acc += a << this.validBits;
                        this.validBits += 8
                    } else break;
                while (24 >= this.validBits)
            }
        },
        decode: function(a) {
            var b = this.decodeRaw(a);
            a.sparse && (b = a.sortedValues[b]);
            return b
        },
        decodeRaw: function(a) {
            10 > this.validBits && this.prepHuffman();
            var b = a.fastHuffman[this.acc & 1023];
            return 0 <= b ? (a = a.codewordLengths[b], this.acc >>>= a, this.validBits -= a, 0 > this.validBits ? (this.validBits = 0, -1) : b) : this.decodeScalarRaw(a)
        },
        isLastByte: function() {
            return 0 == this.bytesInSeg && this.lastSeg
        },
        finishDecodePacket: function(a, b, c) {
            a = c.left.start;
            var d = !1,
                e = b >> 1;
            this.firstDecode ? (this.currentLoc = -e, this.discardSamplesDeferred = b - c.right.end, d = !0, this.firstDecode = !1) : 0 != this.discardSamplesDeferred && (c.left.start += this.discardSamplesDeferred, a = c.left.start, this.discardSamplesDeferred = 0);
            if (this.lastSegWhich == this.endSegWithKnownLoc) {
                if (d && 0 != (this.page.flag & 4) && (b = this.knownLocForPacket - (b - c.right.end), b < this.currentLoc + c.right.end)) return b = b < this.currentLoc ? 0 : b - this.currentLoc, b += c.left.start, this.currentLoc += b, {
                    len: b,
                    left: a,
                    right: c.right.start
                };
                this.currentLoc = this.knownLocForPacket - (e - c.left.start);
                d = !0
            }
            d && (this.currentLoc += c.right.start - c.left.start);
            return {
                len: c.right.end,
                left: a,
                right: c.right.start
            }
        },
        readInt32: function() {
            this.inputPosition += 4;
            return this.input.readInt32()
        },
        readByte: function() {
            this.inputPosition += 1;
            return this.input.readByte()
        },
        read: function(a) {
            this.inputPosition += a;
            var b;
            b = Array(a);
            for (var c = 0; c < a;) {
                var d = c++,
                    e = this.input.readByte();
                b[d] = e
            }
            return b
        },
        readBytes: function(a) {
            this.inputPosition += a;
            return this.input.read(a)
        },
        readString: function(a) {
            this.inputPosition += a;
            return this.input.readString(a)
        },
        getSampleNumber: function(a, b) {
            var c = this.inputPosition,
                d;
            d = W.gte(b, 65536) && W.gte(b - 65536, this.firstAudioPageOffset) ? b - 65536 : this.firstAudioPageOffset;
            a(this.inputPosition = d);
            var e = 0,
                f = !1,
                h = this.findPage(a, b);
            switch (h[1]) {
                case 0:
                    f = h[3];
                    e = h[2];
                    break;
                case 1:
                    throw new u(new O(w.CANT_FIND_LAST_PAGE, null, {
                        fileName: "VorbisDecodeState.hx",
                        lineNumber: 518,
                        className: "kha.audio2.ogg.vorbis.VorbisDecodeState",
                        methodName: "getSampleNumber"
                    }));
            }
            h = this.inputPosition;
            try {
                for (; !f;) {
                    a(this.inputPosition = e);
                    var n = this.findPage(a, b);
                    switch (n[1]) {
                        case 0:
                            var k = n[3],
                                e = n[2],
                                f = k;
                            break;
                        case 1:
                            throw "__break__";
                    }
                    d = h + 1;
                    h = this.inputPosition
                }
            } catch (g) {
                if ("__break__" != g) throw g;
            }
            a(this.inputPosition = h);
            this.read(6);
            this.inputPosition += 4;
            n = this.input.readInt32();
            this.inputPosition += 4;
            k = this.input.readInt32();
            if (-1 == n && -1 == k || 0 < k) throw new u(new O(w.CANT_FIND_LAST_PAGE, null, {
                fileName: "VorbisDecodeState.hx",
                lineNumber: 552,
                className: "kha.audio2.ogg.vorbis.VorbisDecodeState",
                methodName: "getSampleNumber"
            }));
            this.pLast = new sc;
            this.pLast.pageStart = h;
            this.pLast.pageEnd = e;
            this.pLast.lastDecodedSample = n;
            this.pLast.firstDecodedSample = null;
            this.pLast.afterPreviousPageStart = d;
            a(this.inputPosition = c);
            return n
        },
        forcePageResync: function() {
            this.nextSeg = -1
        },
        setInputOffset: function(a, b) {
            a(this.inputPosition = b)
        },
        findPage: function(a, b) {
            try {
                for (;;)
                    if (this.inputPosition += 1, 79 == this.input.readByte()) {
                        var c = this.inputPosition;
                        if (c - 25 > b) return zb.NotFound;
                        this.inputPosition += 1;
                        var d;
                        if (d = 103 == this.input.readByte()) this.inputPosition += 1, d = 103 == this.input.readByte();
                        var e;
                        if (e = d) this.inputPosition += 1, e = 83 == this.input.readByte();
                        if (e) {
                            var f;
                            f = Array(27);
                            f[0] = 79;
                            f[1] = 103;
                            f[2] = 103;
                            f[3] = 83;
                            for (var h = 4; 27 > h;) {
                                var n = h++,
                                    k;
                                this.inputPosition += 1;
                                k = this.input.readByte();
                                f[n] = k
                            }
                            if (0 != f[4]) a(this.inputPosition = c);
                            else {
                                for (var g = f[22] + (f[23] << 8) + (f[24] << 16) + (f[25] << 24), h = 22; 26 > h;) {
                                    var l = h++;
                                    f[l] = 0
                                }
                                for (var q = h = 0; 27 > q;) var J = q++,
                                    h = h << 8 ^ fb.table[f[J] ^ h >>> 24];
                                q = 0;
                                try {
                                    for (var m = 0, p = f[26]; m < p;) {
                                        m++;
                                        var r;
                                        this.inputPosition += 1;
                                        r = this.input.readByte();
                                        h = h << 8 ^ fb.table[r ^ h >>> 24];
                                        q += r
                                    }
                                    for (m = 0; m < q;) m++, h = fb.update(h, function(a) {
                                        a.inputPosition += 1;
                                        return a.input.readByte()
                                    }(this))
                                } catch (t) {
                                    t instanceof u && (t = t.val);
                                    if (G.__instanceof(t, Kb)) return zb.NotFound;
                                    throw t;
                                }
                                if (h == g) {
                                    var C = this.inputPosition;
                                    a(this.inputPosition = c - 1);
                                    return zb.Found(C, 0 != (f[5] & 4))
                                }
                            }
                        }
                    }
            } catch (t) {
                t instanceof u && (t = t.val);
                if (G.__instanceof(t, Kb)) return zb.NotFound;
                throw t;
            }
        },
        analyzePage: function(a, b) {
            var c = new sc,
                d;
            d = Array(255);
            c.pageStart = this.inputPosition;
            for (var e = this.read(27), f = this.read(e[26]), h = 0, n = 0, k = e[26]; n < k;) var g = n++,
                h = h + f[g];
            c.pageEnd = c.pageStart + 27 + e[26] + h;
            c.lastDecodedSample = e[6] + (e[7] << 8) + (e[8] << 16) + (e[9] << 16);
            if (0 != (e[5] & 4)) return c.firstDecodedSample = null, a(this.inputPosition = c.pageStart), c;
            for (var h = 0, l = 0 == (e[5] & 1), n = b.modes.length, k = 0, e = e[26]; k < e;) {
                g = k++;
                if (l) {
                    if (0 == f[g]) return a(this.inputPosition = c.pageStart), null;
                    this.inputPosition += 1;
                    l = this.input.readByte();
                    if (0 != (l & 1)) return a(this.inputPosition = c.pageStart), null;
                    var l = l >> 1,
                        q = lb.ilog(n - 1),
                        l = l & (1 << q) - 1;
                    if (l >= n) return a(this.inputPosition = c.pageStart), null;
                    q = h++;
                    d[q] = b.modes[l].blockflag;
                    this.read(f[g] - 1)
                } else this.read(f[g]);
                l = 255 > f[g]
            }
            f = 0;
            1 < h && (f = d[h - 1] ? f + b.blocksize1 : f + b.blocksize0);
            for (h -= 2; 1 <= h;) h--, f = d[h] ? d[h + 1] ? f + (b.blocksize1 >> 1) : f + ((b.blocksize1 - b.blocksize0 >> 2) + (b.blocksize0 >> 1)) : f + (b.blocksize0 >> 1), h--;
            c.firstDecodedSample = c.lastDecodedSample -
                f;
            a(this.inputPosition = c.pageStart);
            return c
        },
        decodeScalarRaw: function(a) {
            this.prepHuffman();
            var b = a.codewordLengths,
                c = a.codewords,
                d = a.sortedCodewords;
            if (8 < a.entries ? null != d : null != c) {
                for (var e = P.bitReverse(this.acc), c = 0, f = a.sortedEntries; 1 < f;) {
                    var h = c + (f >> 1);
                    W.gte(e, d[h]) ? (c = h, f -= f >> 1) : f >>= 1
                }
                a.sparse || (c = a.sortedValues[c]);
                b = b[c];
                if (this.validBits >= b) return this.acc >>>= b, this.validBits -= b, c;
                this.validBits = 0;
                return -1
            }
            d = 0;
            for (a = a.entries; d < a;)
                if (e = d++, f = b[e], 255 != f && c[e] == (this.acc & (1 << f) - 1)) {
                    if (this.validBits >= f) return this.acc >>>= f, this.validBits -= f, e;
                    this.validBits = 0;
                    return -1
                }
            this.error = new O(w.INVALID_STREAM, null, {
                fileName: "VorbisDecodeState.hx",
                lineNumber: 846,
                className: "kha.audio2.ogg.vorbis.VorbisDecodeState",
                methodName: "decodeScalarRaw"
            });
            this.validBits = 0;
            return -1
        },
        __class__: rc
    };
    var zb = m["kha.audio2.ogg.vorbis._VorbisDecodeState.FindPageResult"] = {
        __ename__: "kha audio2 ogg vorbis _VorbisDecodeState FindPageResult".split(" "),
        __constructs__: ["Found", "NotFound"]
    };
    zb.Found = function(a, b) {
        var c = ["Found", 0, a, b];
        c.__enum__ = zb;
        c.toString = x;
        return c
    };
    zb.NotFound = ["NotFound", 1];
    zb.NotFound.toString = x;
    zb.NotFound.__enum__ = zb;
    var Pb = function(a, b) {
        this.header = a;
        this.decodeState = b;
        this.totalSample = null;
        this.previousLength = this.currentSample = 0;
        this.channelBuffers = Array(a.channel);
        this.previousWindow = Array(a.channel);
        this.finalY = Array(a.channel);
        for (var c = 0, d = a.channel; c < d;) {
            var e = c++,
                f = P.emptyFloatVector(a.blocksize1);
            this.channelBuffers[e] = f;
            f = P.emptyFloatVector(a.blocksize1 / 2 | 0);
            this.previousWindow[e] = f;
            this.finalY[e] = []
        }
        this.a = Array(2);
        this.b = Array(2);
        this.c = Array(2);
        this.window = Array(2);
        this.bitReverseData = Array(2);
        this.initBlocksize(0, a.blocksize0);
        this.initBlocksize(1, a.blocksize1)
    };
    m["kha.audio2.ogg.vorbis.VorbisDecoder"] = Pb;
    Pb.__name__ = ["kha", "audio2", "ogg", "vorbis", "VorbisDecoder"];
    Pb.start = function(a) {
        a = new rc(a);
        var b = Ab.read(a),
            b = new Pb(b, a);
        a.startFirstDecode();
        b.pumpFirstFrame();
        return b
    };
    Pb.prototype = {
        previousWindow: null,
        previousLength: null,
        finalY: null,
        a: null,
        b: null,
        c: null,
        window: null,
        bitReverseData: null,
        channelBuffers: null,
        channelBufferStart: null,
        channelBufferEnd: null,
        header: null,
        currentSample: null,
        totalSample: null,
        decodeState: null,
        read: function(a, b, c, d, e) {
            if (0 != E["int"](W.toFloat(d) % W.toFloat(this.header.sampleRate))) throw new u("Unsupported sampleRate : can't convert " + E.string(W.toFloat(this.header.sampleRate)) + " to " + d);
            if (0 != c % this.header.channel) throw new u("Unsupported channels : can't convert " + this.header.channel + " to " + c);
            d = E["int"](W.toFloat(d) / W.toFloat(this.header.sampleRate));
            c = c / this.header.channel | 0;
            var f = 0;
            b = Math.floor(b / d);
            null != this.totalSample && b > this.totalSample - this.currentSample && (b = this.totalSample - this.currentSample);
            for (var h = 0; f < b;) {
                var n = this.channelBufferEnd - this.channelBufferStart;
                n >= b - f && (n = b - f);
                for (var k = this.channelBufferStart, g = this.channelBufferStart + n; k < g;)
                    for (var l = k++, q = 0; q < d;) {
                        q++;
                        for (var J = 0, m = this.header.channel; J < m;)
                            for (var p = J++, r = 0; r < c;) {
                                r++;
                                var C = this.channelBuffers[p][l];
                                1 < C ? C = 1 : -1 > C && (C = -1);
                                e && (a[h] = C, ++h)
                            }
                    }
                f += n;
                this.channelBufferStart += n;
                if (f == b || 0 == this.getFrameFloat()) break
            }
            for (; f < b;)
                for (f++, n = 0; n < d;)
                    for (n++, k = 0, g = this.header.channel; k < g;)
                        for (k++, l = 0; l < c;) l++, e && (a[h] = 0, ++h);
            this.currentSample += b;
            return b * d
        },
        skipSamples: function(a) {
            var b = 0;
            for (null != this.totalSample && a > this.totalSample - this.currentSample && (a = this.totalSample - this.currentSample); b < a;) {
                var c = this.channelBufferEnd - this.channelBufferStart;
                c >= a - b && (c = a - b);
                b += c;
                this.channelBufferStart += c;
                if (b == a || 0 == this.getFrameFloat()) break
            }
            this.currentSample += a;
            return a
        },
        setupSampleNumber: function(a, b) {
            null == this.totalSample && (this.totalSample = this.decodeState.getSampleNumber(a, b))
        },
        seek: function(a, b, c) {
            if (this.currentSample != c) {
                if (null == this.totalSample && (this.setupSampleNumber(a, b), 0 == this.totalSample)) throw new u(new O(w.CANT_FIND_LAST_PAGE, null, {
                    fileName: "VorbisDecoder.hx",
                    lineNumber: 187,
                    className: "kha.audio2.ogg.vorbis.VorbisDecoder",
                    methodName: "seek"
                }));
                0 > c && (c = 0);
                var d = this.decodeState.pFirst,
                    e = this.decodeState.pLast;
                c >= e.lastDecodedSample && (c = e.lastDecodedSample - 1);
                if (c < d.lastDecodedSample) this.seekFrameFromPage(a, d.pageStart, 0, c);
                else {
                    for (var f = 0; d.pageEnd < e.pageStart;) {
                        var h = d.pageEnd,
                            n = e.afterPreviousPageStart,
                            k = d.lastDecodedSample,
                            g = e.lastDecodedSample;
                        if (null == k || null == g) throw new u(new O(w.SEEK_FAILED, null, {
                            fileName: "VorbisDecoder.hx",
                            lineNumber: 219,
                            className: "kha.audio2.ogg.vorbis.VorbisDecoder",
                            methodName: "seek"
                        }));
                        W.gt(n, h + 4E3) && (n -= 4E3);
                        k = Math.floor(W.toFloat(n - h) / W.toFloat(g - k) * (c - k));
                        k = h + k;
                        4 <= f && (h += n - h >>> 1, k = 8 <= f ? h : W.gt(h, k) ? k + (h - k >>> 1) : h + (k - h >>> 1));
                        ++f;
                        a(this.decodeState.inputPosition = k);
                        switch (this.decodeState.findPage(a, b)[1]) {
                            case 1:
                                throw new u(new O(w.SEEK_FAILED, null, {
                                    fileName: "VorbisDecoder.hx",
                                    lineNumber: 249,
                                    className: "kha.audio2.ogg.vorbis.VorbisDecoder",
                                    methodName: "seek"
                                }));
                        }
                        h = this.decodeState.analyzePage(a, this.header);
                        if (null == h) throw new u(new O(w.SEEK_FAILED, null, {
                            fileName: "VorbisDecoder.hx",
                            lineNumber: 255,
                            className: "kha.audio2.ogg.vorbis.VorbisDecoder",
                            methodName: "seek"
                        }));
                        h.afterPreviousPageStart = k;
                        h.pageStart == e.pageStart ? e = h : c < h.lastDecodedSample ? e = h : d = h
                    }
                    if (d.lastDecodedSample <= c && c < e.lastDecodedSample) this.seekFrameFromPage(a, e.pageStart, d.lastDecodedSample, c);
                    else throw new u(new O(w.SEEK_FAILED, null, {
                        fileName: "VorbisDecoder.hx",
                        lineNumber: 275,
                        className: "kha.audio2.ogg.vorbis.VorbisDecoder",
                        methodName: "seek"
                    }));
                }
            }
        },
        seekFrameFromPage: function(a, b, c, d) {
            var e = 0;
            a(this.decodeState.inputPosition = b);
            this.decodeState.nextSeg = -1;
            var f = 0,
                h = 0;
            for (b = f = null;;) {
                f = b;
                b = this.decodeState.clone(a);
                var n = this.decodeInitial();
                if (null == n) {
                    b = f;
                    break
                }
                h = n.left.start;
                f = n.left.end;
                f = 0 == e ? f : h;
                if (d < c + n.right.start - f) break;
                this.decodeState.flushPacket();
                c += n.right.start - f;
                ++e
            }
            this.decodeState = b;
            a(this.decodeState.inputPosition);
            this.previousLength = 0;
            this.pumpFirstFrame();
            this.currentSample = c;
            this.skipSamples(d - c)
        },
        clone: function(a) {
            var b = V.createEmptyInstance(Pb);
            b.currentSample = this.currentSample;
            b.totalSample = this.totalSample;
            b.previousLength = this.previousLength;
            b.channelBufferStart = this.channelBufferStart;
            b.channelBufferEnd = this.channelBufferEnd;
            b.a = this.a;
            b.b = this.b;
            b.c = this.c;
            b.window = this.window;
            b.bitReverseData = this.bitReverseData;
            b.header = this.header;
            b.decodeState = this.decodeState.clone(a);
            b.channelBuffers = Array(this.header.channel);
            b.previousWindow = Array(this.header.channel);
            b.finalY = Array(this.header.channel);
            a = 0;
            for (var c = this.header.channel; a < c;) {
                var d = a++,
                    e = P.copyVector(this.channelBuffers[d]);
                b.channelBuffers[d] = e;
                e = P.copyVector(this.previousWindow[d]);
                b.previousWindow[d] = e;
                e = Kc.array(this.finalY[d]);
                b.finalY[d] = e
            }
            return b
        },
        ensurePosition: function(a) {
            a(this.decodeState.inputPosition)
        },
        getFrameFloat: function() {
            var a = this.decodePacket();
            if (null == a) return this.channelBufferStart = this.channelBufferEnd = 0;
            var b = this.finishFrame(a);
            this.channelBufferStart = a.left;
            this.channelBufferEnd = a.left + b;
            return b
        },
        pumpFirstFrame: function() {
            this.finishFrame(this.decodePacket())
        },
        finishFrame: function(a) {
            var b = a.len,
                c = a.right;
            a = a.left;
            if (0 != this.previousLength)
                for (var d = this.previousLength, e = this.getWindow(d), f = 0, h = this.header.channel; f < h;)
                    for (var n = f++, k = this.channelBuffers[n], n = this.previousWindow[n], g = 0; g < d;) {
                        var l = g++;
                        k[a + l] = k[a + l] * e[l] + n[l] * e[d -
                            1 - l]
                    }
            d = this.previousLength;
            this.previousLength = b - c;
            e = 0;
            for (f = this.header.channel; e < f;)
                for (k = e++, h = this.previousWindow[k], k = this.channelBuffers[k], n = 0, g = b - c; n < g;) l = n++, h[l] = k[c + l];
            if (0 == d) return 0;
            b < c && (c = b);
            return c - a
        },
        getWindow: function(a) {
            a <<= 1;
            return a == this.header.blocksize0 ? this.window[0] : a == this.header.blocksize1 ? this.window[1] : null
        },
        initBlocksize: function(a, b) {
            var c = b >> 1;
            this.a[a] = Array(c);
            this.b[a] = Array(c);
            this.c[a] = Array(b >> 2);
            this.window[a] = Array(c);
            this.bitReverseData[a] = Array(b >> 3);
            P.computeTwiddleFactors(b, this.a[a], this.b[a], this.c[a]);
            P.computeWindow(b, this.window[a]);
            P.computeBitReverse(b, this.bitReverseData[a])
        },
        inverseMdct: function(a, b, c) {
            c = c ? 1 : 0;
            Ga.inverseTransform(a, b, this.a[c], this.b[c], this.c[c], this.bitReverseData[c])
        },
        decodePacket: function() {
            var a = this.decodeInitial();
            return null == a ? null : this.decodePacketRest(a)
        },
        decodeInitial: function() {
            this.channelBufferStart = this.channelBufferEnd = 0;
            do {
                if (!this.decodeState.maybeStartPacket()) return null;
                if (0 != this.decodeState.readBits(1))
                    for (; - 1 != this.decodeState.readPacket(););
                else break
            } while (1);
            var a = this.decodeState.readBits(lb.ilog(this.header.modes.length - 1));
            if (-1 == a || a >= this.header.modes.length) throw new u(new O(w.SEEK_FAILED, null, {
                fileName: "VorbisDecoder.hx",
                lineNumber: 519,
                className: "kha.audio2.ogg.vorbis.VorbisDecoder",
                methodName: "decodeInitial"
            }));
            var b = this.header.modes[a],
                c, d, e;
            b.blockflag ? (c = this.header.blocksize1, d = this.decodeState.readBits(1), e = this.decodeState.readBits(1)) : (d = e = 0, c = this.header.blocksize0);
            var f = c >> 1;
            return {
                mode: a,
                left: b.blockflag && 0 == d ? {
                    start: c - this.header.blocksize0 >> 2,
                    end: c + this.header.blocksize0 >> 2
                } : {
                    start: 0,
                    end: f
                },
                right: b.blockflag && 0 == e ? {
                    start: 3 * c - this.header.blocksize0 >> 2,
                    end: 3 * c + this.header.blocksize0 >> 2
                } : {
                    start: f,
                    end: c
                }
            }
        },
        decodePacketRest: function(a) {
            var b = this.header.modes[a.mode],
                c;
            c = Array(256);
            var d;
            d = Array(256);
            var e;
            e = b.blockflag ? this.header.blocksize1 : this.header.blocksize0;
            for (var f = this.header.mapping[b.mapping], h = e >> 1, n = [256, 128, 86, 64], k = this.header.codebooks, g = 0, l = this.header.channel; g < l;) {
                var q = g++,
                    J = f.chan[q].mux;
                c[q] = !1;
                J = this.header.floorConfig[f.submapFloor[J]];
                if (0 == J.type) throw new u(new O(w.INVALID_STREAM, null, {
                    fileName: "VorbisDecoder.hx",
                    lineNumber: 581,
                    className: "kha.audio2.ogg.vorbis.VorbisDecoder",
                    methodName: "decodePacketRest"
                }));
                var m = J.floor1;
                if (0 != this.decodeState.readBits(1)) {
                    var J = [],
                        p;
                    p = Array(256);
                    var r = n[m.floor1Multiplier - 1],
                        C = 2,
                        J = this.finalY[q];
                    J[0] = this.decodeState.readBits(lb.ilog(r) - 1);
                    J[1] = this.decodeState.readBits(lb.ilog(r) - 1);
                    for (var t = 0, ae = m.partitions; t < ae;) {
                        var v = t++,
                            x = m.partitionClassList[v],
                            v = m.classDimensions[x],
                            B = m.classSubclasses[x],
                            z = (1 << B) - 1,
                            y = 0;
                        0 != B && (y = this.decodeState.decode(k[m.classMasterbooks[x]]));
                        for (var x = m.subclassBooks[x], E = 0; E < v;) {
                            E++;
                            var D = x[y & z],
                                y = y >> B;
                            0 <= D ? J[C++] = this.decodeState.decode(k[D]) : J[C++] = 0
                        }
                    }
                    if (-1 == this.decodeState.validBits) c[q] = !0;
                    else {
                        q = p[1] = !0;
                        p[0] = q;
                        q = m.neighbors;
                        C = m.xlist;
                        t = 2;
                        for (ae = m.values; t < ae;) v = t++, B = q[v][0], D = q[v][1], z = P.predictPoint(C[v], C[B], C[D], J[B], J[D]), y = J[v], x = r - z, E = x < z ? 2 * x : 2 * z, 0 != y ? (D = p[D] = !0, p[B] = D, p[v] = !0, J[v] = y >= E ? x > z ? y - z + z : z - y +
                            x - 1 : 0 != (y & 1) ? z - (y + 1 >> 1) : z + (y >> 1)) : (p[v] = !1, J[v] = z);
                        r = 0;
                        for (m = m.values; r < m;) q = r++, p[q] || (J[q] = -1)
                    }
                } else c[q] = !0
            }
            n = 0;
            for (k = this.header.channel; n < k;) g = n++, d[g] = c[g];
            n = 0;
            for (k = f.couplingSteps; n < k;) g = n++, c[f.chan[g].magnitude] && c[f.chan[g].angle] || (l = c[f.chan[g].angle] = !1, c[f.chan[g].magnitude] = l);
            n = 0;
            for (k = f.submaps; n < k;) {
                g = n++;
                l = Array(this.header.channel);
                J = Array(256);
                m = p = 0;
                for (r = this.header.channel; m < r;) q = m++, f.chan[q].mux == g && (c[q] ? (J[p] = !0, l[p] = null) : (J[p] = !1, l[p] = this.channelBuffers[q]), ++p);
                this.header.residueConfig[f.submapResidue[g]].decode(this.decodeState, this.header, l, p, h, J, this.channelBuffers)
            }
            h = f.couplingSteps;
            for (c = e >> 1; 0 <= --h;)
                for (n = this.channelBuffers[f.chan[h].magnitude], k = this.channelBuffers[f.chan[h].angle], g = 0; g < c;) l = g++, 0 < n[l] ? 0 < k[l] ? (p = n[l], J = n[l] - k[l]) : (J = n[l], p = n[l] + k[l]) : 0 < k[l] ? (p = n[l], J = n[l] + k[l]) : (J = n[l], p = n[l] - k[l]), n[l] = p, k[l] = J;
            h = 0;
            for (n = this.header.channel; h < n;)
                if (k = h++, d[k])
                    for (g = 0; g < c;) l = g++, this.channelBuffers[k][l] = 0;
                else f.doFloor(this.header.floorConfig, k, e, this.channelBuffers[k], this.finalY[k], null);
            d = 0;
            for (f = this.header.channel; d < f;) c = d++, this.inverseMdct(this.channelBuffers[c], e, b.blockflag);
            this.decodeState.flushPacket();
            return this.decodeState.finishDecodePacket(this.previousLength, e, a)
        },
        __class__: Pb
    };
    var P = function() {};
    m["kha.audio2.ogg.vorbis.VorbisTools"] = P;
    P.__name__ = ["kha", "audio2", "ogg", "vorbis", "VorbisTools"];
    P.assert = function(a, b) {};
    P.neighbors = function(a, b) {
        for (var c = -1, d = 65536, e = 0, f = 0, h = 0; h < b;) {
            var n = h++;
            a[n] > c && a[n] < a[b] && (e = n, c = a[n]);
            a[n] < d && a[n] > a[b] && (f = n, d = a[n])
        }
        return {
            low: e,
            high: f
        }
    };
    P.floatUnpack = function(a) {
        var b = W.toFloat(a & 2097151);
        return (0 != (a & -2147483648) ? -b : b) * Math.pow(2, ((a & 2145386496) >>> 21) - 788)
    };
    P.bitReverse = function(a) {
        a = (a & -1431655766) >>> 1 | (a & 1431655765) << 1;
        a = (a & -858993460) >>> 2 | (a & 858993459) << 2;
        a = (a & -252645136) >>> 4 | (a & 252645135) << 4;
        a = (a & -16711936) >>> 8 | (a & 16711935) << 8;
        return a >>> 16 | a << 16
    };
    P.pointCompare = function(a, b) {
        return a.x < b.x ? -1 : a.x > b.x ? 1 : 0
    };
    P.uintAsc = function(a, b) {
        return W.gt(b, a) ? -1 : a == b ? 0 : 1
    };
    P.lookup1Values = function(a, b) {
        var c = E["int"](Math.exp(Math.log(a) / b));
        E["int"](Math.pow(c + 1, b)) <= a && c++;
        P.assert(Math.pow(c + 1, b) > a, {
            fileName: "VorbisTools.hx",
            lineNumber: 155,
            className: "kha.audio2.ogg.vorbis.VorbisTools",
            methodName: "lookup1Values"
        });
        P.assert(E["int"](Math.pow(c, b)) <= a, {
            fileName: "VorbisTools.hx",
            lineNumber: 156,
            className: "kha.audio2.ogg.vorbis.VorbisTools",
            methodName: "lookup1Values"
        });
        return c
    };
    P.computeWindow = function(a, b) {
        for (var c = a >> 1, d = 0; d < c;) {
            var e = d++,
                f = Math.sin(1.5707963267948966 * P.square(Math.sin((e + .5) / c * 1.5707963267948966)));
            b[e] = f
        }
    };
    P.square = function(a) {
        return a * a
    };
    P.computeBitReverse = function(a, b) {
        for (var c = lb.ilog(a) - 1, d = a >> 3, e = 0; e < d;) {
            var f = e++,
                h;
            h = P.bitReverse(f) >>> 32 - c + 3;
            b[f] = h << 2
        }
    };
    P.computeTwiddleFactors = function(a, b, c, d) {
        for (var e = a >> 2, f = a >> 3, h = 0, n = 0; n < e;) {
            var k = n++;
            b[h] = Math.cos(12.566370614359172 * k / a);
            b[h + 1] = -Math.sin(12.566370614359172 * k / a);
            c[h] = .5 * Math.cos(3.141592653589793 * (h + 1) / a / 2);
            c[h + 1] = .5 * Math.sin(3.141592653589793 * (h + 1) / a / 2);
            h += 2
        }
        for (c = b = 0; c < f;) c++, d[b] = Math.cos(6.283185307179586 * (b + 1) / a), d[b + 1] = -Math.sin(6.283185307179586 * (b + 1) / a), b += 2
    };
    P.drawLine = function(a, b, c, d, e, f) {
        if (null == P.integerDivideTable) {
            P.integerDivideTable = Array(32);
            for (var h = 0; 32 > h;) {
                var n = h++;
                P.integerDivideTable[n] = Array(64);
                for (var k = 1; 64 > k;) {
                    var g = k++;
                    P.integerDivideTable[n][g] = n / g | 0
                }
            }
        }
        g = e - c;
        e = d - b;
        h = 0 > g ? -g : g;
        n = c;
        k = 0;
        64 > e && 32 > h ? 0 > g ? (c = -P.integerDivideTable[h][e], g = c - 1) : (c = P.integerDivideTable[h][e], g = c + 1) : (c = g / e | 0, g = 0 > g ? c - 1 : c + 1);
        h -= (0 > c ? -c : c) * e;
        d > f && (d = f);
        a[b] *= P.INVERSE_DB_TABLE[n];
        for (b += 1; b < d;) f = b++, k += h, k >= e ? (k -= e, n += g) : n += c, a[f] *= P.INVERSE_DB_TABLE[n]
    };
    P.predictPoint = function(a, b, c, d, e) {
        e -= d;
        a = Math.abs(e) * (a - b) / (c - b) | 0;
        return 0 > e ? d - a : d + a
    };
    P.emptyFloatVector = function(a) {
        return Array(a)
    };
    P.copyVector = function(a) {
        var b;
        b = Array(a.length);
        for (var c = 0, d = a.length; c < d;) {
            var e = c++;
            b[e] = a[e]
        }
        return b
    };
    var Qb = function() {};
    m["kha.audio2.ogg.vorbis.data.Codebook"] = Qb;
    Qb.__name__ = "kha audio2 ogg vorbis data Codebook".split(" ");
    Qb.read = function(a) {
        var b = new Qb;
        if (66 != a.readBits(8) || 67 != a.readBits(8) || 86 != a.readBits(8)) throw new u(new O(w.INVALID_SETUP, null, {
            fileName: "Codebook.hx",
            lineNumber: 40,
            className: "kha.audio2.ogg.vorbis.data.Codebook",
            methodName: "read"
        }));
        var c = a.readBits(8);
        b.dimensions = (a.readBits(8) << 8) + c;
        var c = a.readBits(8),
            d = a.readBits(8);
        b.entries = (a.readBits(8) << 16) + (d << 8) + c;
        var e = a.readBits(1);
        b.sparse = 0 != e ? !1 : 0 != a.readBits(1);
        c = Array(b.entries);
        b.sparse || (b.codewordLengths = c);
        d = 0;
        if (0 != e)
            for (var e = 0, f = a.readBits(5) + 1; e < b.entries;) {
                var h = a.readBits(lb.ilog(b.entries - e));
                if (e + h > b.entries) throw new u(new O(w.INVALID_SETUP, "codebook entrys", {
                    fileName: "Codebook.hx",
                    lineNumber: 67,
                    className: "kha.audio2.ogg.vorbis.data.Codebook",
                    methodName: "read"
                }));
                for (var n = 0; n < h;) {
                    var k = n++;
                    c[e + k] = f
                }
                e += h;
                f++
            } else
                for (e = 0, f = b.entries; e < f;) h = e++, 0 != (b.sparse ? a.readBits(1) : 1) ? (n = a.readBits(5) + 1, c[h] = n, d++) : c[h] = 255;
        b.sparse && d >= b.entries >> 2 && (b.codewordLengths = c, b.sparse = !1);
        if (!b.sparse)
            for (e = d = 0, f = b.entries; e < f;) h = e++, h = c[h], 10 < h && 255 != h && ++d;
        b.sortedEntries = d;
        d = null;
        b.sparse ? 0 != b.sortedEntries && (b.codewordLengths = Array(b.sortedEntries), b.codewords = Array(b.entries), d = Array(b.entries)) : b.codewords = Array(b.entries);
        if (!b.computeCodewords(c, b.entries, d)) throw new u(new O(w.INVALID_SETUP, "compute codewords", {
            fileName: "Codebook.hx",
            lineNumber: 120,
            className: "kha.audio2.ogg.vorbis.data.Codebook",
            methodName: "read"
        }));
        0 != b.sortedEntries && (b.sortedCodewords = [], b.sortedValues = Array(b.sortedEntries), b.computeSortedHuffman(c, d));
        b.sparse && (b.codewords = null);
        b.computeAcceleratedHuffman();
        b.lookupType = a.readBits(4);
        if (2 < b.lookupType) throw new u(new O(w.INVALID_SETUP, "codebook lookup type", {
            fileName: "Codebook.hx",
            lineNumber: 143,
            className: "kha.audio2.ogg.vorbis.data.Codebook",
            methodName: "read"
        }));
        if (0 < b.lookupType) {
            b.minimumValue = P.floatUnpack(a.readBits(32));
            b.deltaValue = P.floatUnpack(a.readBits(32));
            b.valueBits = a.readBits(4) + 1;
            b.sequenceP = 0 != a.readBits(1);
            b.lookupValues = 1 == b.lookupType ? P.lookup1Values(b.entries, b.dimensions) : b.entries * b.dimensions;
            c = Array(b.lookupValues);
            d = 0;
            for (e = b.lookupValues; d < e;) {
                f = d++;
                h = a.readBits(b.valueBits);
                if (-1 == h) throw new u(new O(w.INVALID_SETUP, "fail lookup", {
                    fileName: "Codebook.hx",
                    lineNumber: 161,
                    className: "kha.audio2.ogg.vorbis.data.Codebook",
                    methodName: "read"
                }));
                c[f] = h
            }
            b.multiplicands = Array(b.lookupValues);
            a = 0;
            for (d = b.lookupValues; a < d;) e = a++, b.multiplicands[e] = c[e] * b.deltaValue + b.minimumValue;
            if (2 == b.lookupType && b.sequenceP) {
                a = 1;
                for (c = b.lookupValues; a < c;) d = a++, b.multiplicands[d] = b.multiplicands[d - 1];
                b.sequenceP = !1
            }
        }
        return b
    };
    Qb.prototype = {
        dimensions: null,
        entries: null,
        codewordLengths: null,
        minimumValue: null,
        deltaValue: null,
        valueBits: null,
        lookupType: null,
        sequenceP: null,
        sparse: null,
        lookupValues: null,
        multiplicands: null,
        codewords: null,
        fastHuffman: null,
        sortedCodewords: null,
        sortedValues: null,
        sortedEntries: null,
        addEntry: function(a, b, c, d, e) {
            this.sparse ? (this.codewords[c] = a, this.codewordLengths[c] = d, e[c] = b) : this.codewords[b] = a
        },
        includeInSort: function(a) {
            return this.sparse ? !0 : 255 == a ? !1 : 10 < a ? !0 : !1
        },
        computeCodewords: function(a, b, c) {
            var d;
            d = Array(32);
            for (var e = 0; 32 > e;) {
                var f = e++;
                d[f] = 0
            }
            for (var h = 0; h < b && !(255 > a[h]);) h++;
            if (h == b) return !0;
            e = 0;
            this.addEntry(0, h, e++, a[h], c);
            for (f = 0; ++f <= a[h];) d[f] = 1 << 32 - f;
            for (f = h; ++f < b;)
                if (h = a[f], 255 != h) {
                    for (; 0 < h && 0 == d[h];)--h;
                    if (0 == h) return !1;
                    var n = d[h];
                    d[h] = 0;
                    this.addEntry(P.bitReverse(n), f, e++, a[f], c);
                    if (h != a[f])
                        for (var k = a[f]; k > h;) d[k] = n + (1 << 32 - k), k--
                }
            return !0
        },
        computeSortedHuffman: function(a, b) {
            if (this.sparse)
                for (var c = 0, d = this.sortedEntries; c < d;) {
                    var e = c++;
                    this.sortedCodewords[e] = P.bitReverse(this.codewords[e])
                } else {
                    d = c = 0;
                    for (e = this.entries; d < e;) {
                        var f = d++;
                        this.includeInSort(a[f]) && (this.sortedCodewords[c++] = P.bitReverse(this.codewords[f]))
                    }
                    null
                }
            this.sortedCodewords[this.sortedEntries] = -1;
            this.sortedCodewords.sort(P.uintAsc);
            c = this.sparse ? this.sortedEntries : this.entries;
            for (d = 0; d < c;)
                if (e = d++, f = this.sparse ? a[b[e]] : a[e], this.sparse || (255 == f ? 0 : 10 < f)) {
                    for (var h = P.bitReverse(this.codewords[e]), n = 0, k = this.sortedEntries; 1 < k;) {
                        var g = n + (k >> 1);
                        W.gte(h, this.sortedCodewords[g]) ? (n = g, k -= k >> 1) : k >>= 1
                    }
                    this.sparse ? (this.sortedValues[n] = b[e], this.codewordLengths[n] = f) : this.sortedValues[n] = e
                }
        },
        computeAcceleratedHuffman: function() {
            this.fastHuffman = Array(1024);
            this.fastHuffman[0] = -1;
            for (var a = 0; 1024 > a;) {
                var b = a++;
                this.fastHuffman[b] = -1
            }
            a = this.sparse ? this.sortedEntries : this.entries;
            for (b = 0; b < a;) {
                var c = b++;
                if (10 >= this.codewordLengths[c]) {
                    var d;
                    for (d = this.sparse ? P.bitReverse(this.sortedCodewords[c]) : this.codewords[c]; 1024 > d;) this.fastHuffman[d] = c, d += 1 << this.codewordLengths[c]
                }
            }
        },
        codebookDecode: function(a, b, c, d) {
            a = a.decode(this);
            var e = this.lookupValues,
                f = this.sequenceP,
                h = this.multiplicands,
                n = this.minimumValue;
            if (0 > a) return !1;
            d > this.dimensions && (d = this.dimensions);
            if (1 == this.lookupType) {
                for (var k = 1, g = 0, l = 0; l < d;) {
                    var q = l++,
                        m = E["int"](W.toFloat(a / k | 0) % W.toFloat(e)),
                        m = h[m] + g,
                        q = c + q;
                    b[q] += m;
                    f && (g = m + n);
                    k *= e
                }
                return !0
            }
            a *= this.dimensions;
            if (f)
                for (e = k = 0; e < d;) f = e++, k = h[a + f] + k, f = c + f, b[f] += k, k += n;
            else
                for (n = 0; n < d;) e = n++, f = c + e, b[f] += h[a + e] + 0;
            return !0
        },
        codebookDecodeStep: function(a, b, c, d, e) {
            a = a.decode(this);
            var f = 0;
            if (0 > a) return !1;
            d > this.dimensions && (d = this.dimensions);
            var h = this.lookupValues,
                n = this.sequenceP,
                k = this.multiplicands;
            if (1 == this.lookupType) {
                for (var g = 1, l = 0; l < d;) {
                    var q = l++,
                        m = E["int"](W.toFloat(a / g | 0) % W.toFloat(h)),
                        m = k[m] + f,
                        q = c + q * e;
                    b[q] += m;
                    n && (f = m);
                    g *= h
                }
                return !0
            }
            a *= this.dimensions;
            for (h = 0; h < d;) l = h++, g = k[a + l] + f, l = c + l * e, b[l] += g, n && (f = g);
            return !0
        },
        decodeStart: function(a) {
            return a.decode(this)
        },
        decodeDeinterleaveRepeat: function(a, b, c, d, e, f, h) {
            var n = this.dimensions;
            if (0 == this.lookupType) throw new u(new O(w.INVALID_STREAM, null, {
                fileName: "Codebook.hx",
                lineNumber: 488,
                className: "kha.audio2.ogg.vorbis.data.Codebook",
                methodName: "decodeDeinterleaveRepeat"
            }));
            for (var k = this.multiplicands, g = this.sequenceP, l = this.lookupValues; 0 < h;) {
                var q = 0,
                    m = a.decode(this);
                if (0 > m) {
                    if (0 == a.bytesInSeg && a.lastSeg) return null;
                    throw new u(new O(w.INVALID_STREAM, null, {
                        fileName: "Codebook.hx",
                        lineNumber: 503,
                        className: "kha.audio2.ogg.vorbis.data.Codebook",
                        methodName: "decodeDeinterleaveRepeat"
                    }));
                }
                d + e * c + n > f * c && (n = f * c - (e * c - d));
                if (1 == this.lookupType) {
                    var p = 1;
                    if (g)
                        for (var r = 0; r < n;) {
                            r++;
                            var t = E["int"](W.toFloat(m / p | 0) % W.toFloat(l)),
                                q = k[t] + q,
                                t = e;
                            b[d][t] += q;
                            ++d == c && (d = 0, ++e);
                            p *= l
                        } else
                            for (r = 0; r < n;) {
                                r++;
                                var t = E["int"](W.toFloat(m / p | 0) % W.toFloat(l)),
                                    C = e;
                                b[d][C] += k[t] + q;
                                ++d == c && (d = 0, ++e);
                                p *= l
                            }
                } else if (m *= this.dimensions, g)
                    for (p = 0; p < n;) r = p++, q = k[m + r] + q, r = e, b[d][r] += q, ++d == c && (d = 0, ++e);
                else
                    for (p = 0; p < n;) r = p++, t = e, b[d][t] += k[m + r] + q, ++d == c && (d = 0, ++e);
                h -= n
            }
            return {
                cInter: d,
                pInter: e
            }
        },
        residueDecode: function(a, b, c, d, e) {
            if (0 == e) {
                e = d / this.dimensions | 0;
                for (var f = 0; f < e;) {
                    var h = f++;
                    if (!this.codebookDecodeStep(a, b, c + h, d - c - h, e)) return !1
                }
            } else
                for (e = 0; e < d;) {
                    if (!this.codebookDecode(a, b, c, d - e)) return !1;
                    e += this.dimensions;
                    c += this.dimensions
                }
            return !0
        },
        __class__: Qb
    };
    var ud = function() {
        this.data = new Ja
    };
    m["kha.audio2.ogg.vorbis.data.Comment"] = ud;
    ud.__name__ = "kha audio2 ogg vorbis data Comment".split(" ");
    ud.prototype = {
        data: null,
        get_title: function() {
            return this.getString("title")
        },
        get_loopStart: function() {
            return E.parseInt(this.getString("loopstart"))
        },
        get_loopLength: function() {
            return E.parseInt(this.getString("looplength"))
        },
        get_version: function() {
            return this.getString("version")
        },
        get_album: function() {
            return this.getString("album")
        },
        get_organization: function() {
            return this.getString("organization")
        },
        get_tracknumber: function() {
            return this.getString("tracknumber")
        },
        get_performer: function() {
            return this.getString("performer")
        },
        get_copyright: function() {
            return this.getString("copyright")
        },
        get_license: function() {
            return this.getString("license")
        },
        get_artist: function() {
            return this.getString("artist")
        },
        get_description: function() {
            return this.getString("description")
        },
        get_genre: function() {
            return this.getString("genre")
        },
        get_date: function() {
            return this.getString("date")
        },
        get_location: function() {
            return this.getString("location")
        },
        get_contact: function() {
            return this.getString("contact")
        },
        get_isrc: function() {
            return this.getString("isrc")
        },
        get_artists: function() {
            return this.getArray("artist")
        },
        add: function(a, b) {
            a = a.toLowerCase();
            if (this.data.exists(a)) this.data.get(a).push(b);
            else {
                var c = [b];
                this.data.set(a, c);
                c
            }
        },
        getString: function(a) {
            a = a.toLowerCase();
            return this.data.exists(a) ? this.data.get(a)[0] : null
        },
        getArray: function(a) {
            a = a.toLowerCase();
            return this.data.exists(a) ? this.data.get(a) : null
        },
        __class__: ud,
        __properties__: {
            get_artists: "get_artists",
            get_isrc: "get_isrc",
            get_contact: "get_contact",
            get_location: "get_location",
            get_date: "get_date",
            get_genre: "get_genre",
            get_description: "get_description",
            get_artist: "get_artist",
            get_license: "get_license",
            get_copyright: "get_copyright",
            get_performer: "get_performer",
            get_tracknumber: "get_tracknumber",
            get_organization: "get_organization",
            get_album: "get_album",
            get_version: "get_version",
            get_loopLength: "get_loopLength",
            get_loopStart: "get_loopStart",
            get_title: "get_title"
        }
    };
    var tc = function() {};
    m["kha.audio2.ogg.vorbis.data.Floor"] = tc;
    tc.__name__ = "kha audio2 ogg vorbis data Floor".split(" ");
    tc.read = function(a, b) {
        var c = new tc;
        c.type = a.readBits(16);
        if (1 < c.type) throw new u(new O(w.INVALID_SETUP, null, {
            fileName: "Floor.hx",
            lineNumber: 28,
            className: "kha.audio2.ogg.vorbis.data.Floor",
            methodName: "read"
        }));
        if (0 == c.type) {
            c = c.floor0 = new vd;
            c.order = a.readBits(8);
            c.rate = a.readBits(16);
            c.barkMapSize = a.readBits(16);
            c.amplitudeBits = a.readBits(6);
            c.amplitudeOffset = a.readBits(8);
            c.numberOfBooks = a.readBits(4) + 1;
            for (var d = 0, e = c.numberOfBooks; d < e;) {
                var f = d++,
                    h = a.readBits(8);
                c.bookList[f] = h
            }
            throw new u(new O(w.FEATURE_NOT_SUPPORTED, null, {
                fileName: "Floor.hx",
                lineNumber: 41,
                className: "kha.audio2.ogg.vorbis.data.Floor",
                methodName: "read"
            }));
        }
        e = [];
        d = c.floor1 = new wd;
        h = -1;
        d.partitions = a.readBits(5);
        d.partitionClassList = Array(d.partitions);
        for (var f = 0, n = d.partitions; f < n;) {
            var k = f++,
                g = a.readBits(4);
            d.partitionClassList[k] = g;
            d.partitionClassList[k] > h && (h = d.partitionClassList[k])
        }
        d.classDimensions = Array(h + 1);
        d.classMasterbooks = Array(h + 1);
        d.classSubclasses = Array(h + 1);
        d.subclassBooks = Array(h + 1);
        f = 0;
        for (h += 1; f < h;) {
            n = f++;
            k = a.readBits(3) + 1;
            d.classDimensions[n] = k;
            k = a.readBits(2);
            d.classSubclasses[n] = k;
            if (0 != d.classSubclasses[n] && (k = a.readBits(8), d.classMasterbooks[n] = k, d.classMasterbooks[n] >= b.length)) throw new u(new O(w.INVALID_SETUP, null, {
                fileName: "Floor.hx",
                lineNumber: 64,
                className: "kha.audio2.ogg.vorbis.data.Floor",
                methodName: "read"
            }));
            k = 1 << d.classSubclasses[n];
            d.subclassBooks[n] = Array(k);
            for (g = 0; g < k;) {
                var l = g++,
                    q = a.readBits(8) - 1;
                d.subclassBooks[n][l] = q;
                if (d.subclassBooks[n][l] >= b.length) throw new u(new O(w.INVALID_SETUP, null, {
                    fileName: "Floor.hx",
                    lineNumber: 73,
                    className: "kha.audio2.ogg.vorbis.data.Floor",
                    methodName: "read"
                }));
            }
        }
        d.floor1Multiplier = a.readBits(2) + 1;
        d.rangebits = a.readBits(4);
        d.xlist = Array(250);
        d.xlist[0] = 0;
        d.xlist[1] = 1 << d.rangebits;
        d.values = 2;
        f = 0;
        for (h = d.partitions; f < h;)
            for (k = f++, n = 0, k = d.classDimensions[d.partitionClassList[k]]; n < k;) n++, g = a.readBits(d.rangebits), d.xlist[d.values] = g, d.values++;
        f = 0;
        for (h = d.values; f < h;) n = f++, e.push(new xd), e[n].x = d.xlist[n], e[n].y = n;
        e.sort(P.pointCompare);
        d.sortedOrder = Array(d.values);
        f = 0;
        for (h = d.values; f < h;) n = f++, d.sortedOrder[n] = e[n].y;
        d.neighbors = Array(d.values);
        e = 2;
        for (f = d.values; e < f;) h = e++, n = P.neighbors(d.xlist, h), d.neighbors[h] = Array(d.values), d.neighbors[h][0] = n.low, d.neighbors[h][1] = n.high;
        return c
    };
    tc.prototype = {
        floor0: null,
        floor1: null,
        type: null,
        __class__: tc
    };
    var vd = function() {};
    m["kha.audio2.ogg.vorbis.data.Floor0"] = vd;
    vd.__name__ = "kha audio2 ogg vorbis data Floor0".split(" ");
    vd.prototype = {
        order: null,
        rate: null,
        barkMapSize: null,
        amplitudeBits: null,
        amplitudeOffset: null,
        numberOfBooks: null,
        bookList: null,
        __class__: vd
    };
    var wd = function() {};
    m["kha.audio2.ogg.vorbis.data.Floor1"] = wd;
    wd.__name__ = "kha audio2 ogg vorbis data Floor1".split(" ");
    wd.prototype = {
        partitions: null,
        partitionClassList: null,
        classDimensions: null,
        classSubclasses: null,
        classMasterbooks: null,
        subclassBooks: null,
        xlist: null,
        sortedOrder: null,
        neighbors: null,
        floor1Multiplier: null,
        rangebits: null,
        values: null,
        __class__: wd
    };
    var Ab = function() {};
    m["kha.audio2.ogg.vorbis.data.Header"] = Ab;
    Ab.__name__ = "kha audio2 ogg vorbis data Header".split(" ");
    Ab.read = function(a) {
        var b = a.page;
        b.start(a);
        if (0 == (b.flag & 2)) throw new u(new O(w.INVALID_FIRST_PAGE, "not firstPage", {
            fileName: "Header.hx",
            lineNumber: 46,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        if (0 != (b.flag & 4)) throw new u(new O(w.INVALID_FIRST_PAGE, "lastPage", {
            fileName: "Header.hx",
            lineNumber: 49,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        if (0 != (b.flag & 1)) throw new u(new O(w.INVALID_FIRST_PAGE, "continuedPacket", {
            fileName: "Header.hx",
            lineNumber: 52,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        a.firstPageValidate();
        a.inputPosition += 1;
        if (1 != a.input.readByte()) throw new u(new O(w.INVALID_FIRST_PAGE, "decodeState head", {
            fileName: "Header.hx",
            lineNumber: 57,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        a.vorbisValidate();
        a.inputPosition += 4;
        b = a.input.readInt32();
        if (0 != b) throw new u(new O(w.INVALID_FIRST_PAGE, "vorbis version : " +
            b, {
                fileName: "Header.hx",
                lineNumber: 66,
                className: "kha.audio2.ogg.vorbis.data.Header",
                methodName: "read"
            }));
        b = new Ab;
        a.inputPosition += 1;
        b.channel = a.input.readByte();
        if (0 == b.channel) throw new u(new O(w.INVALID_FIRST_PAGE, "no channel", {
            fileName: "Header.hx",
            lineNumber: 73,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        if (16 < b.channel) throw new u(new O(w.TOO_MANY_CHANNELS, "too many channels", {
            fileName: "Header.hx",
            lineNumber: 75,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        a.inputPosition += 4;
        b.sampleRate = a.input.readInt32();
        if (0 == b.sampleRate) throw new u(new O(w.INVALID_FIRST_PAGE, "no sampling rate", {
            fileName: "Header.hx",
            lineNumber: 80,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        a.inputPosition += 4;
        b.maximumBitRate = a.input.readInt32();
        a.inputPosition += 4;
        b.nominalBitRate = a.input.readInt32();
        a.inputPosition += 4;
        b.minimumBitRate = a.input.readInt32();
        var c;
        a.inputPosition += 1;
        c = a.input.readByte();
        var d = c & 15;
        c >>= 4;
        b.blocksize0 = 1 << d;
        b.blocksize1 = 1 << c;
        if (6 > d || 13 < d) throw new u(new O(w.INVALID_SETUP, null, {
            fileName: "Header.hx",
            lineNumber: 93,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        if (6 > c || 13 < c) throw new u(new O(w.INVALID_SETUP, null, {
            fileName: "Header.hx",
            lineNumber: 96,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        if (d > c) throw new u(new O(w.INVALID_SETUP, null, {
            fileName: "Header.hx",
            lineNumber: 99,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        a.inputPosition += 1;
        d = a.input.readByte();
        if (0 == (d & 1)) throw new u(new O(w.INVALID_FIRST_PAGE, null, {
            fileName: "Header.hx",
            lineNumber: 105,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        a.page.start(a);
        a.startPacket();
        for (var e = 0, d = new fc; 0 != (e = a.next());) d.write(function(b) {
            a.inputPosition += e;
            return a.input.read(e)
        }(this)), a.bytesInSeg = 0;
        d = new Ub(d.getBytes());
        d.readByte();
        d.read(6);
        c = d.readInt32();
        b.vendor = d.readString(c);
        b.comment = new ud;
        c = d.readInt32();
        for (var f = 0; f < c;) {
            f++;
            var h = d.readInt32(),
                h = d.readString(h),
                n = h.indexOf("="); - 1 != n && b.comment.add(h.substring(0, n), h.substring(n + 1))
        }
        if (0 == (d.readByte() & 1)) throw new u(new O(w.INVALID_SETUP, null, {
            fileName: "Header.hx",
            lineNumber: 141,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        a.startPacket();
        if (5 != a.readPacket()) throw new u(new O(w.INVALID_SETUP, "setup packet", {
            fileName: "Header.hx",
            lineNumber: 149,
            className: "kha.audio2.ogg.vorbis.data.Header",
            methodName: "read"
        }));
        a.vorbisValidate();
        d = a.readBits(8) + 1;
        b.codebooks = Array(d);
        for (c = 0; c < d;) f = c++, h = Qb.read(a), b.codebooks[f] = h;
        d = a.readBits(6) + 1;
        for (c = 0; c < d;)
            if (c++, 0 != a.readBits(16)) throw new u(new O(w.INVALID_SETUP, null, {
                fileName: "Header.hx",
                lineNumber: 165,
                className: "kha.audio2.ogg.vorbis.data.Header",
                methodName: "read"
            }));
        d = a.readBits(6) + 1;
        b.floorConfig = Array(d);
        for (c = 0; c < d;) f = c++, h = tc.read(a, b.codebooks), b.floorConfig[f] = h;
        d = a.readBits(6) + 1;
        b.residueConfig = Array(d);
        for (c = 0; c < d;) f = c++, h = uc.read(a, b.codebooks), b.residueConfig[f] = h;
        d = a.readBits(6) + 1;
        b.mapping = Array(d);
        for (c = 0; c < d;)
            for (h = c++, f = vc.read(a, b.channel), b.mapping[h] = f, h = 0, n = f.submaps; h < n;) {
                var k = h++;
                if (f.submapFloor[k] >= b.floorConfig.length) throw new u(new O(w.INVALID_SETUP, null, {
                    fileName: "Header.hx",
                    lineNumber: 191,
                    className: "kha.audio2.ogg.vorbis.data.Header",
                    methodName: "read"
                }));
                if (f.submapResidue[k] >= b.residueConfig.length) throw new u(new O(w.INVALID_SETUP, null, {
                    fileName: "Header.hx",
                    lineNumber: 194,
                    className: "kha.audio2.ogg.vorbis.data.Header",
                    methodName: "read"
                }));
            }
        d = a.readBits(6) + 1;
        b.modes = Array(d);
        for (c = 0; c < d;)
            if (f = c++, h = wc.read(a), b.modes[f] = h, h.mapping >= b.mapping.length) throw new u(new O(w.INVALID_SETUP, null, {
                fileName: "Header.hx",
                lineNumber: 205,
                className: "kha.audio2.ogg.vorbis.data.Header",
                methodName: "read"
            }));
        for (; 0 != a.bytesInSeg || !a.lastSeg && 0 != a.next();) a.bytesInSeg--, a.inputPosition += 1, a.input.readByte();
        return b
    };
    Ab.prototype = {
        maximumBitRate: null,
        nominalBitRate: null,
        minimumBitRate: null,
        sampleRate: null,
        channel: null,
        blocksize0: null,
        blocksize1: null,
        codebooks: null,
        floorConfig: null,
        residueConfig: null,
        mapping: null,
        modes: null,
        comment: null,
        vendor: null,
        __class__: Ab
    };
    var xd = function() {};
    m["kha.audio2.ogg.vorbis.data.IntPoint"] = xd;
    xd.__name__ = "kha audio2 ogg vorbis data IntPoint".split(" ");
    xd.prototype = {
        x: null,
        y: null,
        __class__: xd
    };
    var vc = function() {};
    m["kha.audio2.ogg.vorbis.data.Mapping"] = vc;
    vc.__name__ = "kha audio2 ogg vorbis data Mapping".split(" ");
    vc.read = function(a, b) {
        var c = new vc,
            d = a.readBits(16);
        if (0 != d) throw new u(new O(w.INVALID_SETUP, "mapping type " + d, {
            fileName: "Mapping.hx",
            lineNumber: 22,
            className: "kha.audio2.ogg.vorbis.data.Mapping",
            methodName: "read"
        }));
        c.chan = Array(b);
        for (d = 0; d < b;) {
            var e = d++,
                f = new yd;
            c.chan[e] = f
        }
        0 != a.readBits(1) ? c.submaps = a.readBits(4) + 1 : c.submaps = 1;
        if (0 != a.readBits(1))
            for (c.couplingSteps = a.readBits(8) + 1, d = 0, e = c.couplingSteps; d < e;) {
                f = d++;
                c.chan[f].magnitude = a.readBits(lb.ilog(b - 1));
                c.chan[f].angle = a.readBits(lb.ilog(b - 1));
                if (c.chan[f].magnitude >= b) throw new u(new O(w.INVALID_SETUP, null, {
                    fileName: "Mapping.hx",
                    lineNumber: 46,
                    className: "kha.audio2.ogg.vorbis.data.Mapping",
                    methodName: "read"
                }));
                if (c.chan[f].angle >= b) throw new u(new O(w.INVALID_SETUP, null, {
                    fileName: "Mapping.hx",
                    lineNumber: 49,
                    className: "kha.audio2.ogg.vorbis.data.Mapping",
                    methodName: "read"
                }));
                if (c.chan[f].magnitude == c.chan[f].angle) throw new u(new O(w.INVALID_SETUP, null, {
                    fileName: "Mapping.hx",
                    lineNumber: 52,
                    className: "kha.audio2.ogg.vorbis.data.Mapping",
                    methodName: "read"
                }));
            } else c.couplingSteps = 0;
        if (0 != a.readBits(2)) throw new u(new O(w.INVALID_SETUP, null, {
            fileName: "Mapping.hx",
            lineNumber: 61,
            className: "kha.audio2.ogg.vorbis.data.Mapping",
            methodName: "read"
        }));
        if (1 < c.submaps)
            for (d = 0; d < b;) {
                if (e = d++, c.chan[e].mux = a.readBits(4), c.chan[e].mux >= c.submaps) throw new u(new O(w.INVALID_SETUP, null, {
                    fileName: "Mapping.hx",
                    lineNumber: 67,
                    className: "kha.audio2.ogg.vorbis.data.Mapping",
                    methodName: "read"
                }));
            } else
                for (d = 0; d < b;) e = d++, c.chan[e].mux = 0;
        c.submapFloor = Array(c.submaps);
        c.submapResidue = Array(c.submaps);
        d = 0;
        for (e = c.submaps; d < e;) {
            f = d++;
            a.readBits(8);
            var h = a.readBits(8);
            c.submapFloor[f] = h;
            h = a.readBits(8);
            c.submapResidue[f] = h
        }
        return c
    };
    vc.prototype = {
        couplingSteps: null,
        chan: null,
        submaps: null,
        submapFloor: null,
        submapResidue: null,
        doFloor: function(a, b, c, d, e, f) {
            c >>= 1;
            a = a[this.submapFloor[this.chan[b].mux]];
            if (0 == a.type) throw new u(new O(w.INVALID_STREAM, null, {
                fileName: "Mapping.hx",
                lineNumber: 94,
                className: "kha.audio2.ogg.vorbis.data.Mapping",
                methodName: "doFloor"
            }));
            b = a.floor1;
            f = 0;
            a = e[0] * b.floor1Multiplier;
            for (var h = 1, n = b.values; h < n;) {
                var k = h++,
                    g = b.sortedOrder[k];
                0 <= e[g] && (k = e[g] * b.floor1Multiplier, g = b.xlist[g], P.drawLine(d, f, a, g, k, c), f = g, a = k)
            }
            if (f < c)
                for (e = f; e < c;) b = e++, d[b] *= P.INVERSE_DB_TABLE[a]
        },
        __class__: vc
    };
    var yd = function() {};
    m["kha.audio2.ogg.vorbis.data.MappingChannel"] = yd;
    yd.__name__ = "kha audio2 ogg vorbis data MappingChannel".split(" ");
    yd.prototype = {
        magnitude: null,
        angle: null,
        mux: null,
        __class__: yd
    };
    var wc = function() {};
    m["kha.audio2.ogg.vorbis.data.Mode"] = wc;
    wc.__name__ = "kha audio2 ogg vorbis data Mode".split(" ");
    wc.read = function(a) {
        var b = new wc;
        b.blockflag = 0 != a.readBits(1);
        b.windowtype = a.readBits(16);
        b.transformtype = a.readBits(16);
        b.mapping = a.readBits(8);
        if (0 != b.windowtype) throw new u(new O(w.INVALID_SETUP, null, {
            fileName: "Mode.hx",
            lineNumber: 22,
            className: "kha.audio2.ogg.vorbis.data.Mode",
            methodName: "read"
        }));
        if (0 != b.transformtype) throw new u(new O(w.INVALID_SETUP, null, {
            fileName: "Mode.hx",
            lineNumber: 25,
            className: "kha.audio2.ogg.vorbis.data.Mode",
            methodName: "read"
        }));
        return b
    };
    wc.prototype = {
        blockflag: null,
        mapping: null,
        windowtype: null,
        transformtype: null,
        __class__: wc
    };
    var Zc = function() {};
    m["kha.audio2.ogg.vorbis.data.Page"] = Zc;
    Zc.__name__ = "kha audio2 ogg vorbis data Page".split(" ");
    Zc.prototype = {
        flag: null,
        clone: function() {
            var a = new Zc;
            a.flag = this.flag;
            return a
        },
        start: function(a) {
            a.inputPosition += 1;
            var b;
            (b = 79 != a.input.readByte()) || (a.inputPosition += 1, b = 103 != a.input.readByte());
            b || (a.inputPosition += 1, b = 103 != a.input.readByte());
            b || (a.inputPosition += 1, b = 83 != a.input.readByte());
            if (b) throw new u(new O(w.MISSING_CAPTURE_PATTERN, null, {
                fileName: "VorbisDecodeState.hx",
                lineNumber: 323,
                className: "kha.audio2.ogg.vorbis.VorbisDecodeState",
                methodName: "capturePattern"
            }));
            this.startWithoutCapturePattern(a)
        },
        startWithoutCapturePattern: function(a) {
            var b;
            a.inputPosition += 1;
            b = a.input.readByte();
            if (0 != b) throw new u(new O(w.INVALID_STREAM_STRUCTURE_VERSION, "" + b, {
                fileName: "Page.hx",
                lineNumber: 34,
                className: "kha.audio2.ogg.vorbis.data.Page",
                methodName: "startWithoutCapturePattern"
            }));
            a.inputPosition += 1;
            this.flag = a.input.readByte();
            a.inputPosition += 4;
            b = a.input.readInt32();
            var c;
            a.inputPosition += 4;
            c = a.input.readInt32();
            a.inputPosition += 4;
            a.input.readInt32();
            a.inputPosition += 4;
            a.input.readInt32();
            a.inputPosition += 4;
            a.input.readInt32();
            a.setup(b, c)
        },
        __class__: Zc
    };
    var zd = function() {};
    m["kha.audio2.ogg.vorbis.data.PageFlag"] = zd;
    zd.__name__ = "kha audio2 ogg vorbis data PageFlag".split(" ");
    var sc = function() {};
    m["kha.audio2.ogg.vorbis.data.ProbedPage"] = sc;
    sc.__name__ = "kha audio2 ogg vorbis data ProbedPage".split(" ");
    sc.prototype = {
        pageStart: null,
        pageEnd: null,
        afterPreviousPageStart: null,
        firstDecodedSample: null,
        lastDecodedSample: null,
        __class__: sc
    };
    var O = function(a, b, c) {
        null == b && (b = "");
        this.type = a;
        this.message = b;
        this.posInfos = c
    };
    m["kha.audio2.ogg.vorbis.data.ReaderError"] = O;
    O.__name__ = "kha audio2 ogg vorbis data ReaderError".split(" ");
    O.prototype = {
        type: null,
        message: null,
        posInfos: null,
        __class__: O
    };
    var w = m["kha.audio2.ogg.vorbis.data.ReaderErrorType"] = {
        __ename__: "kha audio2 ogg vorbis data ReaderErrorType".split(" "),
        __constructs__: "NEED_MORE_DATA INVALID_API_MIXING OUTOFMEM FEATURE_NOT_SUPPORTED TOO_MANY_CHANNELS FILE_OPEN_FAILURE SEEK_WITHOUT_LENGTH UNEXPECTED_EOF SEEK_INVALID INVALID_SETUP INVALID_STREAM MISSING_CAPTURE_PATTERN INVALID_STREAM_STRUCTURE_VERSION CONTINUED_PACKET_FLAG_INVALID INCORRECT_STREAM_SERIAL_NUMBER INVALID_FIRST_PAGE BAD_PACKET_TYPE CANT_FIND_LAST_PAGE SEEK_FAILED OTHER".split(" ")
    };
    w.NEED_MORE_DATA = ["NEED_MORE_DATA", 0];
    w.NEED_MORE_DATA.toString = x;
    w.NEED_MORE_DATA.__enum__ = w;
    w.INVALID_API_MIXING = ["INVALID_API_MIXING", 1];
    w.INVALID_API_MIXING.toString = x;
    w.INVALID_API_MIXING.__enum__ = w;
    w.OUTOFMEM = ["OUTOFMEM", 2];
    w.OUTOFMEM.toString = x;
    w.OUTOFMEM.__enum__ = w;
    w.FEATURE_NOT_SUPPORTED = ["FEATURE_NOT_SUPPORTED", 3];
    w.FEATURE_NOT_SUPPORTED.toString = x;
    w.FEATURE_NOT_SUPPORTED.__enum__ = w;
    w.TOO_MANY_CHANNELS = ["TOO_MANY_CHANNELS", 4];
    w.TOO_MANY_CHANNELS.toString = x;
    w.TOO_MANY_CHANNELS.__enum__ = w;
    w.FILE_OPEN_FAILURE = ["FILE_OPEN_FAILURE", 5];
    w.FILE_OPEN_FAILURE.toString = x;
    w.FILE_OPEN_FAILURE.__enum__ = w;
    w.SEEK_WITHOUT_LENGTH = ["SEEK_WITHOUT_LENGTH", 6];
    w.SEEK_WITHOUT_LENGTH.toString = x;
    w.SEEK_WITHOUT_LENGTH.__enum__ = w;
    w.UNEXPECTED_EOF = ["UNEXPECTED_EOF", 7];
    w.UNEXPECTED_EOF.toString = x;
    w.UNEXPECTED_EOF.__enum__ = w;
    w.SEEK_INVALID = ["SEEK_INVALID", 8];
    w.SEEK_INVALID.toString = x;
    w.SEEK_INVALID.__enum__ = w;
    w.INVALID_SETUP = ["INVALID_SETUP", 9];
    w.INVALID_SETUP.toString = x;
    w.INVALID_SETUP.__enum__ = w;
    w.INVALID_STREAM = ["INVALID_STREAM", 10];
    w.INVALID_STREAM.toString = x;
    w.INVALID_STREAM.__enum__ = w;
    w.MISSING_CAPTURE_PATTERN = ["MISSING_CAPTURE_PATTERN", 11];
    w.MISSING_CAPTURE_PATTERN.toString = x;
    w.MISSING_CAPTURE_PATTERN.__enum__ = w;
    w.INVALID_STREAM_STRUCTURE_VERSION = ["INVALID_STREAM_STRUCTURE_VERSION", 12];
    w.INVALID_STREAM_STRUCTURE_VERSION.toString = x;
    w.INVALID_STREAM_STRUCTURE_VERSION.__enum__ = w;
    w.CONTINUED_PACKET_FLAG_INVALID = ["CONTINUED_PACKET_FLAG_INVALID", 13];
    w.CONTINUED_PACKET_FLAG_INVALID.toString = x;
    w.CONTINUED_PACKET_FLAG_INVALID.__enum__ = w;
    w.INCORRECT_STREAM_SERIAL_NUMBER = ["INCORRECT_STREAM_SERIAL_NUMBER", 14];
    w.INCORRECT_STREAM_SERIAL_NUMBER.toString = x;
    w.INCORRECT_STREAM_SERIAL_NUMBER.__enum__ = w;
    w.INVALID_FIRST_PAGE = ["INVALID_FIRST_PAGE", 15];
    w.INVALID_FIRST_PAGE.toString = x;
    w.INVALID_FIRST_PAGE.__enum__ = w;
    w.BAD_PACKET_TYPE = ["BAD_PACKET_TYPE", 16];
    w.BAD_PACKET_TYPE.toString = x;
    w.BAD_PACKET_TYPE.__enum__ = w;
    w.CANT_FIND_LAST_PAGE = ["CANT_FIND_LAST_PAGE", 17];
    w.CANT_FIND_LAST_PAGE.toString = x;
    w.CANT_FIND_LAST_PAGE.__enum__ = w;
    w.SEEK_FAILED = ["SEEK_FAILED", 18];
    w.SEEK_FAILED.toString = x;
    w.SEEK_FAILED.__enum__ = w;
    w.OTHER = ["OTHER", 19];
    w.OTHER.toString = x;
    w.OTHER.__enum__ = w;
    var uc = function() {};
    m["kha.audio2.ogg.vorbis.data.Residue"] = uc;
    uc.__name__ = "kha audio2 ogg vorbis data Residue".split(" ");
    uc.read = function(a, b) {
        var c = new uc;
        c.type = a.readBits(16);
        if (2 < c.type) throw new u(new O(w.INVALID_SETUP, null, {
            fileName: "Residue.hx",
            lineNumber: 29,
            className: "kha.audio2.ogg.vorbis.data.Residue",
            methodName: "read"
        }));
        var d;
        d = Array(64);
        c.begin = a.readBits(24);
        c.end = a.readBits(24);
        c.partSize = a.readBits(24) + 1;
        var e = c.classifications = a.readBits(6) + 1;
        c.classbook = a.readBits(8);
        for (var f = 0, h = c.classifications; f < h;) {
            var n = f++,
                k = 0,
                g = a.readBits(3);
            0 != a.readBits(1) && (k = a.readBits(5));
            d[n] = 8 * k + g
        }
        c.residueBooks = Array(c.classifications);
        f = 0;
        for (h = c.classifications; f < h;)
            for (n = f++, c.residueBooks[n] = Array(8), k = 0; 8 > k;)
                if (g = k++, 0 != (d[n] & 1 << g)) {
                    var l = a.readBits(8);
                    c.residueBooks[n][g] = l;
                    if (c.residueBooks[n][g] >= b.length) throw new u(new O(w.INVALID_SETUP, null, {
                        fileName: "Residue.hx",
                        lineNumber: 55,
                        className: "kha.audio2.ogg.vorbis.data.Residue",
                        methodName: "read"
                    }));
                } else c.residueBooks[n][g] = -1;
        d = b[c.classbook].entries;
        f = b[c.classbook].dimensions;
        c.classdata = Array(d);
        for (h = 0; h < d;)
            for (n = g = h++, k = f, g = c.classdata[g] = Array(f); 0 <= --k;) g[k] = n % e, n = n / e | 0;
        return c
    };
    uc.prototype = {
        begin: null,
        end: null,
        partSize: null,
        classifications: null,
        classbook: null,
        classdata: null,
        residueBooks: null,
        type: null,
        decode: function(a, b, c, d, e, f, h) {
            h = b.codebooks;
            var n = h[this.classbook].dimensions,
                k = this.partSize,
                g = E["int"](W.toFloat(this.end -
                    this.begin) / W.toFloat(k));
            b = Array(b.channel * g + 1);
            for (var l = 0; l < d;) {
                var q = l++;
                if (!f[q])
                    for (var q = c[q], m = 0, p = q.length; m < p;) {
                        var r = m++;
                        q[r] = 0
                    }
            }
            if (2 == this.type && 1 != d) {
                for (l = 0; l < d && (q = l++, f[q]);)
                    if (q == d - 1) return;
                for (f = 0; 8 > f;)
                    if (l = f++, q = 0, 2 == d)
                        for (; q < g;) {
                            p = this.begin + q * k;
                            m = p & 1;
                            p >>>= 1;
                            if (0 == l) {
                                r = a.decode(h[this.classbook]);
                                if (-1 == r) return;
                                for (var u = n; 0 <= --u;) b[u + q] = r % this.classifications, r = r / this.classifications | 0
                            }
                            for (r = 0; r < n;) {
                                r++;
                                if (q >= g) break;
                                var u = this.begin + q * k,
                                    C = this.residueBooks[b[q]][l];
                                if (0 <= C) {
                                    p = h[C].decodeDeinterleaveRepeat(a, c, d, m, p, e, k);
                                    if (null == p) return;
                                    m = p.cInter;
                                    p = p.pInter;
                                    null
                                } else u += k, m = u & 1, p = u >>> 1;
                                ++q
                            }
                            null
                        } else if (1 == d)
                            for (; q < g;) {
                                m = 0;
                                p = this.begin + q * k;
                                if (0 == l) {
                                    r = a.decode(h[this.classbook]);
                                    if (-1 == r) return;
                                    for (u = n; 0 <= --u;) b[u + q] = r % this.classifications, r = r / this.classifications | 0
                                }
                                for (r = 0; r < n;) {
                                    r++;
                                    if (q >= g) break;
                                    u = this.begin + q * k;
                                    C = this.residueBooks[b[q]][l];
                                    if (0 <= C) {
                                        p = h[C].decodeDeinterleaveRepeat(a, c, d, m, p, e, k);
                                        if (null == p) return;
                                        m = p.cInter;
                                        p = p.pInter;
                                        null
                                    } else u += k, m = 0, p = u;
                                    ++q
                                }
                            } else
                                for (; q < g;) {
                                    p = this.begin + q * k;
                                    m = E["int"](W.toFloat(p) % W.toFloat(d));
                                    p = E["int"](W.toFloat(p) / W.toFloat(d));
                                    if (0 == l) {
                                        r = a.decode(h[this.classbook]);
                                        if (-1 == r) return;
                                        for (u = n; 0 <= --u;) b[u + q] = r % this.classifications, r = r / this.classifications | 0
                                    }
                                    for (r = 0; r < n;) {
                                        r++;
                                        if (q >= g) break;
                                        u = this.begin + q * k;
                                        C = this.residueBooks[b[q]][l];
                                        if (0 <= C) {
                                            p = h[C].decodeDeinterleaveRepeat(a, c, d, m, p, e, k);
                                            if (null == p) return;
                                            m = p.cInter;
                                            p = p.pInter;
                                            null
                                        } else u += k, m = E["int"](W.toFloat(u) % W.toFloat(d)), p = E["int"](W.toFloat(u) / W.toFloat(d));
                                        ++q
                                    }
                                }
            } else
                for (e = 0; 8 > e;)
                    for (l = e++, q = 0; q < g;) {
                        if (0 == l)
                            for (m = 0; m < d;)
                                if (p = m++, !f[p]) {
                                    r = a.decode(h[this.classbook]);
                                    if (-1 == r) return;
                                    for (u = n; 0 <= --u;) b[p * g + u + q] = r % this.classifications, r = r / this.classifications | 0
                                }
                        for (m = 0; m < n;) {
                            m++;
                            if (q >= g) break;
                            for (p = 0; p < d;)
                                if (r = p++, !f[r] && (u = this.residueBooks[b[r * g + q]][l], 0 <= u && !h[u].residueDecode(a, c[r], this.begin + q * k, k, this.type))) return;
                                ++q
                        }
                    }
        },
        __class__: uc
    };
    var xc = function() {};
    m["kha.audio2.ogg.vorbis.data.Setting"] = xc;
    xc.__name__ = "kha audio2 ogg vorbis data Setting".split(" ");
    var Ad = function() {};
    var rb = function() {
        this.transformations = [];
        this.transformations.push(new pa(1, 0, 0, 0, 1, 0, 0, 0, 1));
        this.opacities = [];
        this.opacities.push(1);
        this.myFontSize = 12;
        this.pipe = null
    };
    m["kha.graphics2.Graphics"] = rb;
    rb.__name__ = ["kha", "graphics2", "Graphics"];
    rb.prototype = {
        begin: function(a, b) {},
        end: function() {},
        flush: function() {},
        clear: function(a) {},
        drawImage: function(a, b, c) {
            this.drawSubImage(a, b, c, 0, 0, a.get_width(), a.get_height())
        },
        drawSubImage: function(a, b, c, d, e, f, h) {
            this.drawScaledSubImage(a, d, e, f, h, b, c, f, h)
        },
        drawScaledImage: function(a, b, c, d, e) {
            this.drawScaledSubImage(a, 0, 0, a.get_width(), a.get_height(), b, c, d, e)
        },
        drawScaledSubImage: function(a, b, c, d, e, f, h, n, k) {},
        drawRect: function(a, b, c, d, e) {},
        fillRect: function(a, b, c, d) {},
        drawString: function(a, b, c) {},
        drawLine: function(a, b, c, d, e) {},
        drawVideo: function(a, b, c, d, e) {},
        fillTriangle: function(a, b, c, d, e, f) {},
        get_imageScaleQuality: function() {
            return Ya.Low
        },
        set_imageScaleQuality: function(a) {
            return Ya.High
        },
        get_color: function() {
            return t.Black
        },
        set_color: function(a) {
            return t.Black
        },
        get_font: function() {
            return null
        },
        set_font: function(a) {
            return null
        },
        get_fontSize: function() {
            return this.myFontSize
        },
        set_fontSize: function(a) {
            return this.myFontSize = a
        },
        pushTransformation: function(a) {
            this.setTransformation(a);
            this.transformations.push(a)
        },
        popTransformation: function() {
            var a = this.transformations.pop();
            this.setTransformation(this.transformations[this.transformations.length -
                1]);
            return a
        },
        get_transformation: function() {
            return this.transformations[this.transformations.length - 1]
        },
        set_transformation: function(a) {
            this.setTransformation(a);
            return this.transformations[this.transformations.length - 1] = a
        },
        translation: function(a, b) {
            var c = this.transformations[this.transformations.length - 1];
            return new pa(1 * c._00 + 0 * c._01 + a * c._02, 1 * c._10 + 0 * c._11 + a * c._12, 1 * c._20 + 0 * c._21 + a * c._22, 0 * c._00 + 1 * c._01 + b * c._02, 0 * c._10 + 1 * c._11 + b * c._12, 0 * c._20 + 1 * c._21 + b * c._22, 0 * c._00 + 0 * c._01 + 1 * c._02, 0 * c._10 + 0 * c._11 +
                1 * c._12, 0 * c._20 + 0 * c._21 + 1 * c._22)
        },
        translate: function(a, b) {
            this.set_transformation(this.translation(a, b))
        },
        pushTranslation: function(a, b) {
            this.pushTransformation(this.translation(a, b))
        },
        rotation: function(a, b, c) {
            var d = new pa(Math.cos(a), -Math.sin(a), 0, Math.sin(a), Math.cos(a), 0, 0, 0, 1),
                e = 1 * d._00 + 0 * d._01 + b * d._02,
                f = 1 * d._10 + 0 * d._11 + b * d._12,
                h = 1 * d._20 + 0 * d._21 + b * d._22,
                n = 0 * d._00 + 1 * d._01 + c * d._02,
                k = 0 * d._10 + 1 * d._11 + c * d._12,
                g = 0 * d._20 + 1 * d._21 + c * d._22;
            a = 0 * d._00 + 0 * d._01 + 1 * d._02;
            var l = 0 * d._10 + 0 * d._11 + 1 * d._12,
                d = 0 * d._20 +
                0 * d._21 + 1 * d._22,
                q = -b,
                m = -c;
            c = 1 * e + 0 * f + 0 * h;
            b = 0 * e + 1 * f + 0 * h;
            e = e * q + f * m + 1 * h;
            f = 1 * n + 0 * k + 0 * g;
            h = 0 * n + 1 * k + 0 * g;
            n = n * q + k * m + 1 * g;
            k = 1 * a + 0 * l + 0 * d;
            g = 0 * a + 1 * l + 0 * d;
            a = a * q + l * m + 1 * d;
            l = this.transformations[this.transformations.length - 1];
            return new pa(c * l._00 + b * l._01 + e * l._02, c * l._10 + b * l._11 + e * l._12, c * l._20 + b * l._21 + e * l._22, f * l._00 + h * l._01 + n * l._02, f * l._10 + h * l._11 + n * l._12, f * l._20 + h * l._21 + n * l._22, k * l._00 + g * l._01 + a * l._02, k * l._10 + g * l._11 + a * l._12, k * l._20 + g * l._21 + a * l._22)
        },
        rotate: function(a, b, c) {
            this.set_transformation(this.rotation(a, b, c))
        },
        pushRotation: function(a, b, c) {
            this.pushTransformation(this.rotation(a, b, c))
        },
        pushOpacity: function(a) {
            this.setOpacity(a);
            this.opacities.push(a)
        },
        popOpacity: function() {
            var a = this.opacities.pop();
            this.setOpacity(this.get_opacity());
            return a
        },
        get_opacity: function() {
            return this.opacities[this.opacities.length - 1]
        },
        set_opacity: function(a) {
            this.setOpacity(a);
            return this.opacities[this.opacities.length - 1] = a
        },
        scissor: function(a, b, c, d) {},
        disableScissor: function() {},
        pipe: null,
        get_pipeline: function() {
            return this.pipe
        },
        set_pipeline: function(a) {
            this.setPipeline(a);
            return this.pipe = a
        },
        setBlendingMode: function(a, b) {},
        transformations: null,
        opacities: null,
        myFontSize: null,
        setTransformation: function(a) {},
        setOpacity: function(a) {},
        setPipeline: function(a) {},
        __class__: rb,
        __properties__: {
            set_pipeline: "set_pipeline",
            get_pipeline: "get_pipeline",
            set_opacity: "set_opacity",
            get_opacity: "get_opacity",
            set_transformation: "set_transformation",
            get_transformation: "get_transformation",
            set_fontSize: "set_fontSize",
            get_fontSize: "get_fontSize",
            set_font: "set_font",
            get_font: "get_font",
            set_color: "set_color",
            get_color: "get_color",
            set_imageScaleQuality: "set_imageScaleQuality",
            get_imageScaleQuality: "get_imageScaleQuality"
        }
    };
    var Mb = function(a) {
        this.canvas = a
    };
    m["kha.graphics2.Graphics1"] = Mb;
    Mb.__name__ = ["kha", "graphics2", "Graphics1"];
    Mb.__interfaces__ = [Ad];
    Mb.prototype = {
        canvas: null,
        texture: null,
        pixels: null,
        begin: function() {
            null == this.texture && (this.texture = va.create(this.canvas.get_width(), this.canvas.get_height(), sa.RGBA32, Aa.ReadableUsage));
            this.pixels = this.texture.lock()
        },
        end: function() {
            this.texture.unlock();
            this.canvas.get_g2().begin();
            this.canvas.get_g2().drawImage(this.texture, 0, 0);
            this.canvas.get_g2().end()
        },
        setPixel: function(a, b, c) {
            this.pixels.setInt32(b * this.texture.get_realWidth() * 4 + 4 * a, c)
        },
        __class__: Mb
    };
    var yc = function() {};
    m["kha.graphics2.GraphicsExtension"] = yc;
    yc.__name__ = ["kha", "graphics2", "GraphicsExtension"];
    yc.drawCircle = function(a, b, c, d, e, f) {
        null == f && (f = 0);
        null == e && (e = 1);
        if (null == g.gl) a.drawCircle(b, c, d - e / 2, e);
        else {
            0 >= f && (f = Math.floor(10 * Math.sqrt(d)));
            for (var h = 2 * Math.PI / f, n = Math.cos(h), h = Math.sin(h), k = 0, l = 0; l < f;) {
                l++;
                var m = d + b,
                    q = k + c,
                    p = d;
                d = n * d - h * k;
                k = n * k + h * p;
                a.drawLine(m, q, d + b, k + c, e)
            }
        }
    };
    yc.fillCircle = function(a, b, c, d, e) {
        null == e && (e = 0);
        if (null == g.gl) a.fillCircle(b, c, d);
        else {
            0 >= e && (e = Math.floor(10 * Math.sqrt(d)));
            for (var f = 2 * Math.PI / e, h = Math.cos(f), f = Math.sin(f), n = 0, k = 0; k < e;) {
                k++;
                var l = d + b,
                    m = n + c,
                    q = d;
                d = h * d - f * n;
                n = h * n + f * q;
                a.fillTriangle(l, m, d + b, n + c, b, c)
            }
        }
    };
    yc.drawPolygon = function(a, b, c, d, e) {
        null == e && (e = 1);
        d = v.iter(d);
        for (var f = d.next(), h = f; d.hasNext();) {
            var n = d.next();
            a.drawLine(h.x + b, h.y + c, n.x + b, n.y + c, e);
            h = n
        }
        a.drawLine(h.x + b, h.y + c, f.x + b, f.y + c, e)
    };
    yc.fillPolygon = function(a, b, c, d) {
        d = v.iter(d);
        for (var e = d.next(), f = e; d.hasNext();) {
            var h = d.next();
            a.fillTriangle(f.x + b, f.y + c, h.x + b, h.y + c, b, c);
            f = h
        }
        a.fillTriangle(f.x + b, f.y + c, e.x + b, e.y + c, b, c)
    };
    var Ya = m["kha.graphics2.ImageScaleQuality"] = {
        __ename__: ["kha", "graphics2", "ImageScaleQuality"],
        __constructs__: ["Low", "High"]
    };
    Ya.Low = ["Low", 0];
    Ya.Low.toString = x;
    Ya.Low.__enum__ = Ya;
    Ya.High = ["High", 1];
    Ya.High.toString = x;
    Ya.High.__enum__ = Ya;
    var $c = function() {};
    m["kha.graphics2.truetype.Stbtt_temp_rect"] = $c;
    $c.__name__ = ["kha", "graphics2", "truetype", "Stbtt_temp_rect"];
    $c.prototype = {
        x0: null,
        y0: null,
        x1: null,
        y1: null,
        __class__: $c
    };
    var Bd = function() {};
    m["kha.graphics2.truetype.Stbtt_temp_glyph_h_metrics"] = Bd;
    Bd.__name__ = ["kha", "graphics2", "truetype", "Stbtt_temp_glyph_h_metrics"];
    Bd.prototype = {
        advanceWidth: null,
        leftSideBearing: null,
        __class__: Bd
    };
    var Cd = function() {};
    m["kha.graphics2.truetype.Stbtt_temp_font_v_metrics"] = Cd;
    Cd.__name__ = ["kha", "graphics2", "truetype", "Stbtt_temp_font_v_metrics"];
    Cd.prototype = {
        ascent: null,
        descent: null,
        lineGap: null,
        __class__: Cd
    };
    var Pd = function() {};
    m["kha.graphics2.truetype.Stbtt_temp_region"] = Pd;
    Pd.__name__ = ["kha", "graphics2", "truetype", "Stbtt_temp_region"];
    Pd.prototype = {
        width: null,
        height: null,
        xoff: null,
        yoff: null,
        __class__: Pd
    };
    var od = function() {};
    m["kha.graphics2.truetype.Stbtt_bakedchar"] = od;
    od.__name__ = ["kha", "graphics2", "truetype", "Stbtt_bakedchar"];
    od.prototype = {
        x0: null,
        y0: null,
        x1: null,
        y1: null,
        xoff: null,
        yoff: null,
        xadvance: null,
        __class__: od
    };
    var Qd = function() {};
    m["kha.graphics2.truetype.Stbtt_aligned_quad"] = Qd;
    Qd.__name__ = ["kha", "graphics2", "truetype", "Stbtt_aligned_quad"];
    Qd.prototype = {
        x0: null,
        y0: null,
        s0: null,
        t0: null,
        x1: null,
        y1: null,
        s1: null,
        t1: null,
        __class__: Qd
    };
    var Rd = function() {};
    m["kha.graphics2.truetype.Stbtt_packedchar"] = Rd;
    Rd.__name__ = ["kha", "graphics2", "truetype", "Stbtt_packedchar"];
    Rd.prototype = {
        x0: null,
        y0: null,
        x1: null,
        y1: null,
        xoff: null,
        yoff: null,
        xadvance: null,
        xoff2: null,
        yoff2: null,
        __class__: Rd
    };
    var Sd = function() {};
    m["kha.graphics2.truetype.Stbtt_pack_range"] = Sd;
    Sd.__name__ = ["kha", "graphics2", "truetype", "Stbtt_pack_range"];
    Sd.prototype = {
        font_size: null,
        first_unicode_codepoint_in_range: null,
        array_of_unicode_codepoints: null,
        num_chars: null,
        chardata_for_range: null,
        h_oversample: null,
        v_oversample: null,
        __class__: Sd
    };
    var Td = function() {};
    m["kha.graphics2.truetype.Stbtt_pack_context"] = Td;
    Td.__name__ = ["kha", "graphics2", "truetype", "Stbtt_pack_context"];
    Td.prototype = {
        width: null,
        height: null,
        stride_in_bytes: null,
        padding: null,
        h_oversample: null,
        v_oversample: null,
        pixels: null,
        __class__: Td
    };
    var Sc = function() {};
    m["kha.graphics2.truetype.Stbtt_fontinfo"] = Sc;
    Sc.__name__ = ["kha", "graphics2", "truetype", "Stbtt_fontinfo"];
    Sc.prototype = {
        data: null,
        fontstart: null,
        numGlyphs: null,
        loca: null,
        head: null,
        glyf: null,
        hhea: null,
        hmtx: null,
        kern: null,
        index_map: null,
        indexToLocFormat: null,
        __class__: Sc
    };
    var Dd = function() {};
    m["kha.graphics2.truetype.Stbtt_vertex"] = Dd;
    Dd.__name__ = ["kha", "graphics2", "truetype", "Stbtt_vertex"];
    Dd.prototype = {
        x: null,
        y: null,
        cx: null,
        cy: null,
        type: null,
        padding: null,
        __class__: Dd
    };
    var ad = function() {};
    m["kha.graphics2.truetype.Stbtt__bitmap"] = ad;
    ad.__name__ = ["kha", "graphics2", "truetype", "Stbtt__bitmap"];
    ad.prototype = {
        w: null,
        h: null,
        stride: null,
        pixels: null,
        pixels_offset: null,
        __class__: ad
    };
    var Ed = function() {};
    m["kha.graphics2.truetype.Stbtt__edge"] = Ed;
    Ed.__name__ = ["kha", "graphics2", "truetype", "Stbtt__edge"];
    Ed.prototype = {
        x0: null,
        y0: null,
        x1: null,
        y1: null,
        invert: null,
        __class__: Ed
    };
    var Fd = function() {};
    m["kha.graphics2.truetype.Stbtt__active_edge"] = Fd;
    Fd.__name__ = ["kha", "graphics2", "truetype", "Stbtt__active_edge"];
    Fd.prototype = {
        next: null,
        fx: null,
        fdx: null,
        fdy: null,
        direction: null,
        sy: null,
        ey: null,
        __class__: Fd
    };
    var Gd = function() {};
    m["kha.graphics2.truetype.Stbtt__point"] = Gd;
    Gd.__name__ = ["kha", "graphics2", "truetype", "Stbtt__point"];
    Gd.prototype = {
        x: null,
        y: null,
        __class__: Gd
    };
    var l = function() {};
    m["kha.graphics2.truetype.StbTruetype"] = l;
    l.__name__ = ["kha", "graphics2", "truetype", "StbTruetype"];
    l.STBTT_assert = function(a) {
        if (!a) throw new u("Error");
    };
    l.STBTT_POINT_SIZE = function(a) {
        return -a
    };
    l.ttBYTE = function(a, b) {
        null == b && (b = 0);
        return a.readU8(b)
    };
    l.ttCHAR = function(a, b) {
        null == b && (b = 0);
        var c = a.readU8(b);
        return 128 <= c ? c - 256 : c
    };
    l.ttUSHORT = function(a, b) {
        null == b && (b = 0);
        var c = a.readU8(b);
        return a.readU8(b + 1) | c << 8
    };
    l.ttSHORT = function(a, b) {
        null == b && (b = 0);
        var c = a.readU8(b),
            c = a.readU8(b + 1) | c << 8;
        return 0 != (c & 32768) ? c - 65536 : c
    };
    l.ttULONG = function(a, b) {
        null == b && (b = 0);
        return l.ttLONG(a, b)
    };
    l.ttLONG = function(a, b) {
        null == b && (b = 0);
        var c = a.readU8(b),
            d = a.readU8(b + 1),
            e = a.readU8(b + 2);
        return a.readU8(b + 3) | e << 8 | d << 16 | c << 24
    };
    l.ttFixed = function(a, b) {
        null == b && (b = 0);
        return l.ttLONG(a, b)
    };
    l.stbtt_tag4 = function(a, b, c, d, e, f) {
        return a.readU8(b) == c && a.readU8(b + 1) == d && a.readU8(b + 2) == e && a.readU8(b + 3) == f
    };
    l.stbtt_tag = function(a, b, c) {
        return l.stbtt_tag4(a, b, v.cca(c, 0), v.cca(c, 1), v.cca(c, 2), v.cca(c, 3))
    };
    l.stbtt__isfont = function(a) {
        return l.stbtt_tag4(a, 0, v.cca("1", 0), 0, 0, 0) || l.stbtt_tag4(a, 0, v.cca("typ1", 0), v.cca("typ1", 1), v.cca("typ1", 2), v.cca("typ1", 3)) || l.stbtt_tag4(a, 0, v.cca("OTTO", 0), v.cca("OTTO", 1), v.cca("OTTO", 2), v.cca("OTTO", 3)) || 0 == a.readU8(0) && 1 == a.readU8(1) && 0 == a.readU8(2) && 0 == a.readU8(3) ? !0 : !1
    };
    l.stbtt__find_table = function(a, b, c) {
        var d = l.ttUSHORT(a, b + 4);
        b += 12;
        for (var e = 0; e < d;) {
            var f = e++,
                f = b + 16 * f;
            if (l.stbtt_tag4(a, f, v.cca(c, 0), v.cca(c, 1), v.cca(c, 2), v.cca(c, 3))) return l.ttLONG(a, f + 8)
        }
        return 0
    };
    l.stbtt_GetFontOffsetForIndex = function(a, b) {
        if (l.stbtt__isfont(a)) return 0 == b ? 0 : -1;
        if (l.stbtt_tag4(a, 0, v.cca("ttcf", 0), v.cca("ttcf", 1), v.cca("ttcf", 2), v.cca("ttcf", 3)) && (65536 == l.ttLONG(a, 4) || 131072 == l.ttLONG(a, 4))) {
            var c = l.ttLONG(a, 8);
            return b >= c ? -1 : l.ttLONG(a, 12 + 4 * b)
        }
        return -1
    };
    l.stbtt_InitFont = function(a, b, c) {
        var d;
        a.data = b;
        a.fontstart = c;
        d = l.stbtt__find_table(b, c, "cmap");
        a.loca = l.stbtt__find_table(b, c, "loca");
        a.head = l.stbtt__find_table(b, c, "head");
        a.glyf = l.stbtt__find_table(b, c, "glyf");
        a.hhea = l.stbtt__find_table(b, c, "hhea");
        a.hmtx = l.stbtt__find_table(b, c, "hmtx");
        a.kern = l.stbtt__find_table(b, c, "kern");
        if (0 == d || 0 == a.loca || 0 == a.head || 0 == a.glyf || 0 == a.hhea || 0 == a.hmtx) return !1;
        c = l.stbtt__find_table(b, c, "maxp");
        a.numGlyphs = 0 != c ? l.ttUSHORT(b, c + 4) : 65535;
        c = l.ttUSHORT(b, d + 2);
        for (var e = a.index_map = 0; e < c;) {
            var f = e++,
                f = d + 4 + 8 * f;
            switch (l.ttUSHORT(b, f)) {
                case 3:
                    switch (l.ttUSHORT(b, f + 2)) {
                        case 1:
                        case 10:
                            a.index_map = d + l.ttLONG(b, f + 4)
                    }
                    break;
                case 0:
                    a.index_map = d + l.ttLONG(b, f + 4)
            }
        }
        if (0 == a.index_map) return !1;
        a.indexToLocFormat = l.ttUSHORT(b, a.head + 50);
        return !0
    };
    l.stbtt_FindGlyphIndex = function(a, b) {
        var c = a.data,
            d = a.index_map,
            e = l.ttUSHORT(c, d);
        if (0 == e) return e = l.ttUSHORT(c, d + 2), b < e - 6 ? c.readU8(d + 6 + b) : 0;
        if (6 == e) {
            var e = l.ttUSHORT(c, d + 6),
                f = l.ttUSHORT(c, d + 8);
            return b >= e && b < e + f ? l.ttUSHORT(c, d + 10 + 2 * (b - e)) : 0
        }
        if (2 != e) {
            if (4 == e) {
                var e = l.ttUSHORT(c, d + 6) >> 1,
                    h = l.ttUSHORT(c, d + 8) >> 1,
                    n = l.ttUSHORT(c, d + 10),
                    k = l.ttUSHORT(c, d + 12) >> 1,
                    g = f = d + 14;
                if (65535 < b) return 0;
                b >= l.ttUSHORT(c, g + 2 * k) && (g += 2 * k);
                for (g -= 2; 0 != n;) h >>= 1, k = l.ttUSHORT(c, g + 2 * h), b > k && (g += 2 * h), --n;
                h = g + 2 - f >> 1;
                l.STBTT_assert(b <= l.ttUSHORT(c, f + 2 * h));
                n = l.ttUSHORT(c, d + 14 + 2 * e + 2 + 2 * h);
                if (b < n) return 0;
                f = l.ttUSHORT(c, d + 14 + 6 * e + 2 + 2 * h);
                return 0 == f ? b + l.ttSHORT(c, d + 14 + 4 * e + 2 + 2 * h) : l.ttUSHORT(c, f + 2 * (b - n) + d + 14 + 6 * e + 2 + 2 * h)
            }
            if (12 == e || 13 == e) {
                h = l.ttLONG(c, d + 12);
                f = 0;
                for (n = h; f < n;)
                    if (g = f + (n - f >> 1), h = l.ttLONG(c, d + 16 + 12 * g), k = l.ttLONG(c, d + 16 + 12 * g + 4), b < h) n = g;
                    else if (b > k) f = g + 1;
                else return c = l.ttLONG(c, d + 16 + 12 * g + 8), 12 == e ? c + b - h : c;
                return 0
            }
        }
        throw new u("Error");
    };
    l.stbtt_GetCodepointShape = function(a, b) {
        return l.stbtt_GetGlyphShape(a, l.stbtt_FindGlyphIndex(a, b))
    };
    l.stbtt_setvertex = function(a, b, c, d, e, f) {
        a.type = b;
        a.x = c;
        a.y = d;
        a.cx = e;
        a.cy = f
    };
    l.stbtt__GetGlyfOffset = function(a, b) {
        var c, d;
        if (b >= a.numGlyphs || 2 <= a.indexToLocFormat) return -1;
        0 == a.indexToLocFormat ? (c = a.glyf + 2 * l.ttUSHORT(a.data, a.loca + 2 * b), d = a.glyf + 2 * l.ttUSHORT(a.data, a.loca + 2 * b + 2)) : (c = a.glyf + l.ttLONG(a.data, a.loca + 4 * b), d = a.glyf + l.ttLONG(a.data, a.loca + 4 * b + 4));
        return c == d ? -1 : c
    };
    l.stbtt_GetGlyphBox = function(a, b, c) {
        b = l.stbtt__GetGlyfOffset(a, b);
        if (0 > b) return !1;
        c.x0 = l.ttSHORT(a.data, b + 2);
        c.y0 = l.ttSHORT(a.data, b + 4);
        c.x1 = l.ttSHORT(a.data, b + 6);
        c.y1 = l.ttSHORT(a.data, b + 8);
        return !0
    };
    l.stbtt_GetCodepointBox = function(a, b, c) {
        return l.stbtt_GetGlyphBox(a, l.stbtt_FindGlyphIndex(a, b), c)
    };
    l.stbtt_IsGlyphEmpty = function(a, b) {
        var c = l.stbtt__GetGlyfOffset(a, b);
        return 0 > c ? !0 : 0 == l.ttSHORT(a.data, c)
    };
    l.stbtt__close_shape = function(a, b, c, d, e, f, h, n, k, g) {
        d ? (c && l.stbtt_setvertex(function(c) {
            c = b++;
            return a[c]
        }(this), 3, k + h >> 1, g + n >> 1, k, g), l.stbtt_setvertex(function(c) {
            c = b++;
            return a[c]
        }(this), 3, e, f, h, n)) : c ? l.stbtt_setvertex(function(c) {
            c = b++;
            return a[c]
        }(this), 3, e, f, k, g) : l.stbtt_setvertex(function(c) {
            c = b++;
            return a[c]
        }(this), 2, e, f, 0, 0);
        return b
    };
    l.copyVertices = function(a, b, c, d) {
        for (var e = 0; e < d;) {
            var f = e++;
            b[c + f] = a[f]
        }
    };
    l.stbtt_GetGlyphShape = function(a, b) {
        var c, d, e = a.data,
            f = null,
            h = 0,
            n = l.stbtt__GetGlyfOffset(a, b);
        if (0 > n) return null;
        c = l.ttSHORT(e, n);
        if (0 < c) {
            var k = 0,
                g, m = 0,
                q;
            q = g = 0;
            var p = !1,
                r = !1,
                t, w, C, v, x, z;
            w = 0;
            d = e.sub(n + 10, e.get_length() - (n + 10));
            g = l.ttUSHORT(e, n + 10 + 2 * c);
            n = e.sub(n + 10 + 2 * c + 2 + g, e.get_length() - (n + 10 + 2 * c + 2 + g));
            e = 1 + l.ttUSHORT(d, 2 * c - 2);
            q = e + 2 * c;
            f = Array(q);
            if (null == f) return null;
            g = 0;
            for (c = f.length; g < c;) t = g++, C = new Dd, f[t] = C;
            c = g = 0;
            q -= e;
            for (t = 0; t < e;) C = t++, 0 == c ? (k = n.readU8(w++), 0 != (k & 8) && (c = n.readU8(w++))) : --c, f[q + C].type = k;
            for (t = c = 0; t < e;) C = t++, k = f[q + C].type, 0 != (k & 2) ? (v = n.readU8(w++), c = 0 != (k & 16) ? c + v : c + -v) : 0 == (k & 16) && (k = n.readU8(w), k = n.readU8(w + 1) | k << 8, c += 0 != (k & 32768) ? k - 65536 : k, w += 2), f[q + C].x = c;
            for (c = t = 0; c < e;) C = c++, k = f[q + C].type, 0 != (k & 4) ? (v = n.readU8(w++), t = 0 != (k & 32) ? t + v : t + -v) : 0 == (k & 32) && (k = n.readU8(w), k = n.readU8(w + 1) | k << 8, t += 0 != (k & 32768) ? k - 65536 : k, w += 2), f[q + C].y = t;
            for (var y = C = v = w = n = x = z = h = 0; y < e;) k = f[q + y].type, c = f[q + y].x, t = f[q + y].y, g == y ? (0 != y && (h = l.stbtt__close_shape(f, h, p, r, C, v, x, z, w, n)), (r = 0 == (k & 1)) ? (x = c, z = t, 0 == (f[q + y + 1].type & 1) ? (C = c + f[q + y + 1].x >> 1, v = t + f[q + y + 1].y >> 1) : (C = f[q + y + 1].x, v = f[q + y + 1].y, ++y)) : (C = c, v = t), l.stbtt_setvertex(function(a) {
                a = h++;
                return f[a]
            }(this), 1, C, v, 0, 0), p = !1, g = 1 + l.ttUSHORT(d, 2 * m), ++m) : 0 == (k & 1) ? (p && l.stbtt_setvertex(function(a) {
                a = h++;
                return f[a]
            }(this), 3, w + c >> 1, n + t >> 1, w, n), w = c, n = t, p = !0) : (p ? l.stbtt_setvertex(function(a) {
                a = h++;
                return f[a]
            }(this), 3, c, t, w, n) : l.stbtt_setvertex(function(a) {
                a = h++;
                return f[a]
            }(this), 2, c, t, 0, 0), p = !1), ++y;
            h = l.stbtt__close_shape(f, h, p, r, C, v, x, z, w, n)
        } else if (-1 == c)
            for (p = 1, d = e.sub(n + 10, e.get_length() - (n + 10)), h = m = 0, f = null; 0 != p;) {
                r = 0;
                k = e = null;
                k = 1;
                q = g = 0;
                w = 1;
                c = n = 0;
                p = l.ttSHORT(d, m);
                m += 2;
                r = l.ttSHORT(d, m);
                m += 2;
                if (0 != (p & 2)) 0 != (p & 1) ? (n = l.ttSHORT(d, m), m += 2, c = l.ttSHORT(d, m), m += 2) : (n = l.ttCHAR(d, m), m += 1, c = l.ttCHAR(d, m), m += 1);
                else throw new u("Error");
                0 != (p & 8) ? (k = w = l.ttSHORT(d, m) / 16384, m += 2, g = q = 0) : 0 != (p & 64) ? (k = l.ttSHORT(d, m) / 16384, m += 2, g = q = 0, w = l.ttSHORT(d, m) / 16384, m += 2) : 0 != (p & 128) && (k = l.ttSHORT(d, m) / 16384, m += 2, g = l.ttSHORT(d, m) / 16384, m += 2, q = l.ttSHORT(d, m) / 16384, m += 2, w = l.ttSHORT(d, m) / 16384, m += 2);
                t = Math.sqrt(k * k + g * g);
                C = Math.sqrt(q * q + w * w);
                e = l.stbtt_GetGlyphShape(a, r);
                r = null == e ? 0 : e.length;
                if (0 < r) {
                    for (v = 0; v < r;) x = v++, x = e[x], z = x.x, y = x.y, x.x = t * (k * z + q * y + n) | 0, x.y = C * (g * z + w * y + c) | 0, z = x.cx, y = x.cy, x.cx = t * (k * z + q * y + n) | 0, x.cy = C * (g * z + w * y + c) | 0;
                    k = Array(h + r);
                    if (null == k) return null;
                    0 < h && l.copyVertices(f, k, 0, h);
                    l.copyVertices(e, k, h, r);
                    f = k;
                    h += r
                }
                p &= 32
            } else if (0 > c) throw new u("Error");
        if (null == f) return null;
        if (!(f.length >= h)) throw new u("Error");
        return h < f.length ? (d = Array(h), l.copyVertices(f, d, 0, h), d) : f
    };
    l.stbtt_GetGlyphHMetrics = function(a, b) {
        var c = l.ttUSHORT(a.data, a.hhea + 34),
            d = new Bd;
        b < c ? (d.advanceWidth = l.ttSHORT(a.data, a.hmtx + 4 * b), d.leftSideBearing = l.ttSHORT(a.data, a.hmtx + 4 * b + 2)) : (d.advanceWidth = l.ttSHORT(a.data, a.hmtx + 4 * (c - 1)), d.leftSideBearing = l.ttSHORT(a.data, a.hmtx + 4 * c + 2 * (b - c)));
        return d
    };
    l.stbtt_GetGlyphKernAdvance = function(a, b, c) {
        var d = a.data.sub(a.kern, a.data.get_length() - a.kern),
            e, f;
        if (0 == a.kern || 1 > l.ttUSHORT(d, 2) || 1 != l.ttUSHORT(d, 8)) return 0;
        a = 0;
        e = l.ttUSHORT(d, 10) - 1;
        for (b = b << 16 | c; a <= e;)
            if (f = a + e >> 1, c = l.ttLONG(d, 18 + 6 * f), b < c) e = f - 1;
            else if (b > c) a = f + 1;
        else return l.ttSHORT(d, 22 + 6 * f);
        return 0
    };
    l.stbtt_GetCodepointKernAdvance = function(a, b, c) {
        return 0 == a.kern ? 0 : l.stbtt_GetGlyphKernAdvance(a, l.stbtt_FindGlyphIndex(a, b), l.stbtt_FindGlyphIndex(a, c))
    };
    l.stbtt_GetCodepointHMetrics = function(a, b) {
        return l.stbtt_GetGlyphHMetrics(a, l.stbtt_FindGlyphIndex(a, b))
    };
    l.stbtt_GetFontVMetrics = function(a) {
        var b = new Cd;
        b.ascent = l.ttSHORT(a.data, a.hhea + 4);
        b.descent = l.ttSHORT(a.data, a.hhea + 6);
        b.lineGap = l.ttSHORT(a.data, a.hhea + 8);
        return b
    };
    l.stbtt_GetFontBoundingBox = function(a) {
        var b = new $c;
        b.x0 = l.ttSHORT(a.data, a.head + 36);
        b.y0 = l.ttSHORT(a.data, a.head + 38);
        b.x1 = l.ttSHORT(a.data, a.head + 40);
        b.y1 = l.ttSHORT(a.data, a.head + 42);
        return b
    };
    l.stbtt_ScaleForPixelHeight = function(a, b) {
        var c = l.ttSHORT(a.data, a.hhea + 4) - l.ttSHORT(a.data, a.hhea + 6);
        return b / c
    };
    l.stbtt_ScaleForMappingEmToPixels = function(a, b) {
        var c = l.ttUSHORT(a.data, a.head + 18);
        return b / c
    };
    l.stbtt_GetGlyphBitmapBoxSubpixel = function(a, b, c, d, e, f) {
        var h = new $c;
        if (l.stbtt_GetGlyphBox(a, b, h)) {
            a = h.x1;
            b = h.y0;
            var n = h.y1;
            h.x0 = Math.floor(h.x0 * c + e);
            h.y0 = Math.floor(-n * d + f);
            h.x1 = Math.ceil(a * c + e);
            h.y1 = Math.ceil(-b * d + f)
        } else h.x0 = 0, h.y0 = 0, h.x1 = 0, h.y1 = 0;
        return h
    };
    l.stbtt_GetGlyphBitmapBox = function(a, b, c, d) {
        return l.stbtt_GetGlyphBitmapBoxSubpixel(a, b, c, d, 0, 0)
    };
    l.stbtt_GetCodepointBitmapBoxSubpixel = function(a, b, c, d, e, f) {
        return l.stbtt_GetGlyphBitmapBoxSubpixel(a, l.stbtt_FindGlyphIndex(a, b), c, d, e, f)
    };
    l.stbtt_GetCodepointBitmapBox = function(a, b, c, d) {
        return l.stbtt_GetCodepointBitmapBoxSubpixel(a, b, c, d, 0, 0)
    };
    l.stbtt__new_active = function(a, b, c, d) {
        var e = new Fd,
            f = (a[b].x1 - a[b].x0) / (a[b].y1 - a[b].y0);
        if (null == e) return e;
        e.fdx = f;
        e.fdy = 0 != f ? 1 / f : 0;
        e.fx = a[b].x0 + f * (d - a[b].y0);
        e.fx -= c;
        e.direction = a[b].invert ? 1 : -1;
        e.sy = a[b].y0;
        e.ey = a[b].y1;
        e.next = null;
        return e
    };
    l.stbtt__handle_clipped_edge = function(a, b, c, d, e, f, h, n) {
        if (f != n) {
            if (!(f < n)) throw new u("Error");
            if (!(d.sy <= d.ey)) throw new u("Error");
            if (!(f > d.ey || n < d.sy)) {
                f < d.sy && (e += (h - e) * (d.sy - f) / (n - f), f = d.sy);
                n > d.ey && (h += (h - e) * (d.ey - n) / (n - f), n = d.ey);
                if (e == c) {
                    if (!(h <= c + 1)) throw new u("Error");
                } else if (e == c + 1) {
                    if (!(h >= c)) throw new u("Error");
                } else if (e <= c) {
                    if (!(h <= c)) throw new u("Error");
                } else if (e >= c + 1) {
                    if (!(h >= c + 1)) throw new u("Error");
                } else if (!(h >= c && h <= c + 1)) throw new u("Error");
                if (e <= c && h <= c) c = b + c, a[c] += d.direction * (n - f);
                else if (!(e >= c + 1 && h >= c + 1)) {
                    if (!(e >= c && e <= c + 1 && h >= c && h <= c + 1)) throw new u("Error");
                    b += c;
                    a[b] += d.direction * (n - f) * (1 - (e - c + (h - c)) / 2)
                }
            }
        }
    };
    l.stbtt__fill_active_edges_new = function(a, b, c, d, e, f) {
        for (var h = f + 1; null != e;) {
            if (!(e.ey >= f)) throw new u("Error");
            if (0 == e.fdx) {
                var n = e.fx;
                n < d && (0 <= n ? (l.stbtt__handle_clipped_edge(a, 0, n | 0, e, n, f, n, h), l.stbtt__handle_clipped_edge(b, c - 1, n + 1 | 0, e, n, f, n, h)) : l.stbtt__handle_clipped_edge(b, c - 1, 0, e, n, f, n, h))
            } else {
                var k = e.fx,
                    g = e.fdx,
                    m = k + g,
                    q, p, r, t = e.fdy;
                if (!(e.sy <= h && e.ey >= f)) throw new u("Error");
                e.sy > f ? (q = k + g * (e.sy - f), p = e.sy) : (q = k, p = f);
                e.ey < h ? (n = k + g * (e.ey - f), r = e.ey) : (n = m, r = h);
                if (0 <= q && 0 <= n && q < d && n < d)
                    if ((q | 0) == (n | 0)) {
                        k = q | 0;
                        p = r - p;
                        if (!(0 <= k && k < d)) throw new u("Error");
                        r = k;
                        a[r] += e.direction * (1 - (q - k + (n - k)) / 2) * p;
                        n = c + k;
                        b[n] += e.direction * p
                    } else {
                        var w, C;
                        q > n && (p = h - (p - f), r = h - (r - f), k = p, p = r, r = k, k = n, n = q, q = k, t = -t, k = m);
                        g = q | 0;
                        m = n | 0;
                        w = (g + 1 - k) * t + f;
                        k = e.direction;
                        C = k * (w - p);
                        var v = g;
                        a[v] += C * (1 - (q - g + (g + 1 - g)) / 2);
                        q = k * t;
                        for (v = g + 1; v < m;) {
                            var x = v++;
                            a[x] += C + q / 2;
                            C += q
                        }
                        w += t * (m - (g + 1));
                        l.STBTT_assert(1.01 >= Math.abs(C));
                        q = m;
                        a[q] += C + k * (1 - (m - m + (n - m)) / 2) * (r - w);
                        n = c + m;
                        b[n] += k * (r - p)
                    } else
                    for (n = 0; n < d;) p = n++, r = f, q = p, t = p + 1, w = m, C = h, v = (p - k) / g + f, x = (p + 1 - k) / g + f, k < q && w > t ? (l.stbtt__handle_clipped_edge(a, 0, p, e, k, r, q, v), l.stbtt__handle_clipped_edge(a, 0, p, e, q, v, t, x), l.stbtt__handle_clipped_edge(a, 0, p, e, t, x, w, C)) : w < q && k > t ? (l.stbtt__handle_clipped_edge(a, 0, p, e, k, r, t, x), l.stbtt__handle_clipped_edge(a, 0, p, e, t, x, q, v), l.stbtt__handle_clipped_edge(a, 0, p, e, q, v, w, C)) : k < q && w > q ? (l.stbtt__handle_clipped_edge(a, 0, p, e, k, r, q, v), l.stbtt__handle_clipped_edge(a, 0, p, e, q, v, w, C)) : w < q && k > q ? (l.stbtt__handle_clipped_edge(a, 0, p, e, k, r, q, v), l.stbtt__handle_clipped_edge(a, 0, p, e, q, v, w, C)) : k < t && w > t ? (l.stbtt__handle_clipped_edge(a, 0, p, e, k, r, t, x), l.stbtt__handle_clipped_edge(a, 0, p, e, t, x, w, C)) : w < t && k > t ? (l.stbtt__handle_clipped_edge(a, 0, p, e, k, r, t, x), l.stbtt__handle_clipped_edge(a, 0, p, e, t, x, w, C)) : l.stbtt__handle_clipped_edge(a, 0, p, e, k, r, w, C)
            }
            e = e.next
        }
    };
    l.stbtt__rasterize_sorted_edges = function(a, b, c, d, e, f) {
        d = null;
        var h, n = 0,
            k, g = 0,
            m = 0;
        k = 64 < a.w ? Array(2 * a.w + 1) : Array(129);
        g = a.w;
        h = f;
        for (b[m + c].y0 = f + a.h + 1; n < a.h;) {
            c = h + 0;
            f = h + 1;
            for (var q = d, p = null, r = 0, t = a.w; r < t;) {
                var w = r++;
                k[w] = 0
            }
            r = 0;
            for (t = a.w + 1; r < t;) w = r++, k[g + w] = 0;
            for (; null != q;)
                if (r = q, r.ey <= c) {
                    null == p ? d = r.next : p.next = r.next;
                    q = r.next;
                    if (0 == r.direction) throw new u("Error");
                    r.direction = 0
                } else p = q, q = q.next;
            for (; b[m].y0 <= f;) {
                if (b[m].y0 != b[m].y1) {
                    q = l.stbtt__new_active(b, m, e, c);
                    if (!(q.ey >= c)) throw new u("Error");
                    q.next = d;
                    d = q
                }++m
            }
            null != d && l.stbtt__fill_active_edges_new(k, k, g + 1, a.w, d, c);
            f = c = 0;
            for (q = a.w; f < q;) p = f++, c += k[g + p], r = k[p] + c, r = 255 * Math.abs(r) + .5, r |= 0, 255 < r && (r = 255), a.pixels.writeU8(a.pixels_offset + n * a.stride + p, r);
            for (q = d; null != q;) c = q, c.fx += c.fdx, q = q.next;
            ++h;
            ++n
        }
    };
    l.STBTT__COMPARE = function(a, b) {
        return a.y0 < b.y0
    };
    l.stbtt__sort_edges_ins_sort = function(a, b) {
        for (var c, d = 1; d < b;) {
            var e = d++,
                f = a[e],
                h = f;
            for (c = e; 0 < c && l.STBTT__COMPARE(h, a[c - 1]);) a[c] = a[c - 1], --c;
            e != c && (a[c] = f)
        }
    };
    l.stbtt__sort_edges_quicksort = function(a, b, c) {
        for (; 12 < c;) {
            var d, e, f;
            f = c >> 1;
            e = l.STBTT__COMPARE(a[b], a[b + f]);
            d = l.STBTT__COMPARE(a[b + f], a[b + c - 1]);
            e != d && (e = l.STBTT__COMPARE(a[b], a[b + c - 1]), e = e == d ? 0 : c - 1, d = a[b + e], a[b + e] = a[b + f], a[b + f] = d);
            d = a[b];
            a[b] = a[b + f];
            a[b + f] = d;
            f = 1;
            for (e = c - 1;;) {
                for (; l.STBTT__COMPARE(a[b + f], a[b]);)++f;
                for (; l.STBTT__COMPARE(a[b], a[b + e]);)--e;
                if (f >= e) break;
                d = a[b + f];
                a[b + f] = a[b + e];
                a[b + e] = d;
                ++f;
                --e
            }
            e < c - f ? (l.stbtt__sort_edges_quicksort(a, b, e), b += f, c -= f) : (l.stbtt__sort_edges_quicksort(a, b + f, c - f), c = e)
        }
    };
    l.stbtt__sort_edges = function(a, b) {
        l.stbtt__sort_edges_quicksort(a, 0, b);
        l.stbtt__sort_edges_ins_sort(a, b)
    };
    l.stbtt__rasterize = function(a, b, c, d, e, f, h, n, k, g, m) {
        f = m ? -f : f;
        var q, p, r, t;
        for (q = p = 0; q < d;) r = q++, p += c[r];
        q = Array(p + 1);
        if (null != q) {
            p = 0;
            for (r = q.length; p < r;) {
                t = p++;
                var u = new Ed;
                q[t] = u
            }
            for (u = t = p = 0; u < d;) {
                var C = u++,
                    w = b,
                    v = 0 + t;
                t += c[C];
                r = c[C] - 1;
                for (var x = 0, C = c[C]; x < C;) {
                    var y = x++,
                        z = y,
                        B = r;
                    if (w[v + r].y != w[v + y].y) {
                        q[p].invert = !1;
                        if (m ? w[v + r].y > w[v + y].y : w[v + r].y < w[v + y].y) q[p].invert = !0, z = r, B = y;
                        q[p].x0 = w[v + z].x * e + h;
                        q[p].y0 = 1 * (w[v + z].y * f + n);
                        q[p].x1 = w[v + B].x * e + h;
                        q[p].y1 = 1 * (w[v + B].y * f + n);
                        ++p
                    }
                    r = y
                }
            }
            l.stbtt__sort_edges(q, p);
            l.stbtt__rasterize_sorted_edges(a, q, p, 1, k, g)
        }
    };
    l.stbtt__add_point = function(a, b, c, d) {
        null != a && (a[b].x = c, a[b].y = d)
    };
    l.stbtt__tesselate_curve = function(a, b, c, d, e, f, h, n, g, m) {
        var p = (c + 2 * e + h) / 4,
            q = (d + 2 * f + n) / 4,
            r = (c + h) / 2 - p,
            t = (d + n) / 2 - q;
        if (16 < m) return 1;
        r * r + t * t > g ? (l.stbtt__tesselate_curve(a, b, c, d, (c + e) / 2, (d + f) / 2, p, q, g, m + 1), l.stbtt__tesselate_curve(a, b, p, q, (e + h) / 2, (f + n) / 2, h, n, g, m + 1)) : (l.stbtt__add_point(a, b.value, h, n), b.value += 1);
        return 1
    };
    l.stbtt_FlattenCurves = function(a, b, c, d, e) {
        var f = null,
            h = 0;
        c *= c;
        for (var n = 0, g = 0, m = 0; m < b;) {
            var p = m++;
            1 == a[p].type && ++n
        }
        e.value = n;
        if (0 == n) return null;
        d.value = Array(n);
        if (null == d.value) return e.value = 0, null;
        for (m = 0; 2 > m;) {
            var q = p = 0;
            if (1 == m++) {
                f = Array(h);
                if (null == f) return d.value = null, e.value = 0, null;
                h = 0;
                for (n = f.length; h < n;) {
                    var r = h++,
                        t = new Gd;
                    f[r] = t
                }
            }
            h = 0;
            n = -1;
            for (r = 0; r < b;) switch (t = r++, a[t].type) {
                case 1:
                    0 <= n && (d.value[n] = h - g);
                    ++n;
                    g = h;
                    p = a[t].x;
                    q = a[t].y;
                    l.stbtt__add_point(f, h++, p, q);
                    break;
                case 2:
                    p = a[t].x;
                    q = a[t].y;
                    l.stbtt__add_point(f, h++, p, q);
                    break;
                case 3:
                    h = {
                        value: h
                    }, l.stbtt__tesselate_curve(f, h, p, q, a[t].cx, a[t].cy, a[t].x, a[t].y, c, 0), h = h.value, p = a[t].x, q = a[t].y
            }
            d.value[n] = h - g
        }
        return f
    };
    l.stbtt_Rasterize = function(a, b, c, d, e, f, h, g, k, m, p) {
        var q, r;
        q = {
            value: 0
        };
        r = {
            value: null
        };
        b = l.stbtt_FlattenCurves(c, d, b / (e > f ? f : e), r, q);
        q = q.value;
        r = r.value;
        null != b && l.stbtt__rasterize(a, b, r, q, e, f, h, g, k, m, p)
    };
    l.stbtt_GetGlyphBitmapSubpixel = function(a, b, c, d, e, f, h) {
        var g, k, m = new ad,
            p = l.stbtt_GetGlyphShape(a, f),
            q = p.length;
        0 == b && (b = c);
        if (0 == c) {
            if (0 == b) return null;
            c = b
        }
        k = l.stbtt_GetGlyphBitmapBoxSubpixel(a, f, b, c, d, e);
        a = k.x0;
        f = k.y0;
        g = k.x1;
        k = k.y1;
        m.w = g - a;
        m.h = k - f;
        m.pixels = null;
        h.width = m.w;
        h.height = m.h;
        h.xoff = a;
        h.yoff = f;
        0 != m.w && 0 != m.h && (m.pixels = X.alloc(m.w * m.h), null != m.pixels && (m.stride = m.w, l.stbtt_Rasterize(m, .35, p, q, b, c, d, e, a, f, !0)));
        return m.pixels
    };
    l.stbtt_GetGlyphBitmap = function(a, b, c, d, e) {
        return l.stbtt_GetGlyphBitmapSubpixel(a, b, c, 0, 0, d, e)
    };
    l.stbtt_MakeGlyphBitmapSubpixel = function(a, b, c, d, e, f, h, g, k, m, p) {
        var q = 0,
            r = 0,
            t = l.stbtt_GetGlyphShape(a, p),
            u;
        u = null == t ? 0 : t.length;
        var w = new ad;
        a = l.stbtt_GetGlyphBitmapBoxSubpixel(a, p, h, g, k, m);
        q = a.x0;
        r = a.y0;
        w.pixels = b;
        w.pixels_offset = c;
        w.w = d;
        w.h = e;
        w.stride = f;
        0 != w.w && 0 != w.h && l.stbtt_Rasterize(w, .35, t, u, h, g, k, m, q, r, !0)
    };
    l.stbtt_MakeGlyphBitmap = function(a, b, c, d, e, f, h, g, k) {
        l.stbtt_MakeGlyphBitmapSubpixel(a, b, c, d, e, f, h, g, 0, 0, k)
    };
    l.stbtt_GetCodepointBitmapSubpixel = function(a, b, c, d, e, f, h) {
        return l.stbtt_GetGlyphBitmapSubpixel(a, b, c, d, e, l.stbtt_FindGlyphIndex(a, f), h)
    };
    l.stbtt_MakeCodepointBitmapSubpixel = function(a, b, c, d, e, f, h, g, k, m, p) {
        l.stbtt_MakeGlyphBitmapSubpixel(a, b, c, d, e, f, h, g, k, m, l.stbtt_FindGlyphIndex(a, p))
    };
    l.stbtt_GetCodepointBitmap = function(a, b, c, d, e) {
        return l.stbtt_GetCodepointBitmapSubpixel(a, b, c, 0, 0, d, e)
    };
    l.stbtt_MakeCodepointBitmap = function(a, b, c, d, e, f, h, g, k) {
        l.stbtt_MakeCodepointBitmapSubpixel(a, b, c, d, e, f, h, g, 0, 0, k)
    };
    l.stbtt_BakeFontBitmap = function(a, b, c, d, e, f, h, g, k) {
        var m, p = new Sc;
        if (!l.stbtt_InitFont(p, a, b)) return -1;
        a = 0;
        for (b = e * f; a < b;) m = a++, d.writeU8(m, 0);
        m = a = b = 1;
        c = l.stbtt_ScaleForPixelHeight(p, c);
        for (var q = 0; q < g;) {
            var r = q++,
                t, w, v, C, x, y = l.stbtt_FindGlyphIndex(p, h + r);
            t = l.stbtt_GetGlyphHMetrics(p, y).advanceWidth;
            x = l.stbtt_GetGlyphBitmapBox(p, y, c, c);
            w = x.x0;
            v = x.y0;
            C = x.x1;
            x = x.y1;
            C -= w;
            x -= v;
            a + C + 1 >= e && (b = m, a = 1);
            if (b + x + 1 >= f) return -r;
            if (!(a + C < e)) throw new u("Error");
            if (!(b + x < f)) throw new u("Error");
            l.stbtt_MakeGlyphBitmap(p, d, a + b * e, C, x, e, c, c, y);
            k[r].x0 = a;
            k[r].y0 = b;
            k[r].x1 = a + C;
            k[r].y1 = b + x;
            k[r].xadvance = c * t;
            k[r].xoff = w;
            k[r].yoff = v;
            a = a + C + 1;
            b + x + 1 > m && (m = b + x + 1)
        }
        return m
    };
    l.stbtt_GetBakedQuad = function(a, b, c, d, e, f, h, g) {
        g = g ? 0 : -.5;
        b = 1 / b;
        c = 1 / c;
        a = a[d];
        d = Math.floor(e.value + a.xoff + .5);
        f = Math.floor(f.value + a.yoff + .5);
        h.x0 = d + g;
        h.y0 = f + g;
        h.x1 = d + a.x1 - a.x0 + g;
        h.y1 = f + a.y1 - a.y0 + g;
        h.s0 = a.x0 * b;
        h.t0 = a.y0 * c;
        h.s1 = a.x1 * b;
        h.t1 = a.y1 * c;
        e.value += a.xadvance
    };
    var Y = m["kha.graphics4.BlendingOperation"] = {
        __ename__: ["kha", "graphics4", "BlendingOperation"],
        __constructs__: "Undefined BlendOne BlendZero SourceAlpha DestinationAlpha InverseSourceAlpha InverseDestinationAlpha".split(" ")
    };
    Y.Undefined = ["Undefined", 0];
    Y.Undefined.toString = x;
    Y.Undefined.__enum__ = Y;
    Y.BlendOne = ["BlendOne", 1];
    Y.BlendOne.toString = x;
    Y.BlendOne.__enum__ = Y;
    Y.BlendZero = ["BlendZero", 2];
    Y.BlendZero.toString = x;
    Y.BlendZero.__enum__ = Y;
    Y.SourceAlpha = ["SourceAlpha", 3];
    Y.SourceAlpha.toString = x;
    Y.SourceAlpha.__enum__ = Y;
    Y.DestinationAlpha = ["DestinationAlpha", 4];
    Y.DestinationAlpha.toString = x;
    Y.DestinationAlpha.__enum__ = Y;
    Y.InverseSourceAlpha = ["InverseSourceAlpha", 5];
    Y.InverseSourceAlpha.toString = x;
    Y.InverseSourceAlpha.__enum__ = Y;
    Y.InverseDestinationAlpha = ["InverseDestinationAlpha", 6];
    Y.InverseDestinationAlpha.toString = x;
    Y.InverseDestinationAlpha.__enum__ = Y;
    var ea = m["kha.graphics4.CompareMode"] = {
        __ename__: ["kha", "graphics4", "CompareMode"],
        __constructs__: "Always Never Equal NotEqual Less LessEqual Greater GreaterEqual".split(" ")
    };
    ea.Always = ["Always", 0];
    ea.Always.toString = x;
    ea.Always.__enum__ = ea;
    ea.Never = ["Never", 1];
    ea.Never.toString = x;
    ea.Never.__enum__ = ea;
    ea.Equal = ["Equal", 2];
    ea.Equal.toString = x;
    ea.Equal.__enum__ = ea;
    ea.NotEqual = ["NotEqual", 3];
    ea.NotEqual.toString = x;
    ea.NotEqual.__enum__ = ea;
    ea.Less = ["Less", 4];
    ea.Less.toString = x;
    ea.Less.__enum__ = ea;
    ea.LessEqual = ["LessEqual", 5];
    ea.LessEqual.toString = x;
    ea.LessEqual.__enum__ = ea;
    ea.Greater = ["Greater", 6];
    ea.Greater.toString = x;
    ea.Greater.__enum__ = ea;
    ea.GreaterEqual = ["GreaterEqual", 7];
    ea.GreaterEqual.toString = x;
    ea.GreaterEqual.__enum__ = ea;
    var be = function() {};
    m["kha.graphics4.ConstantLocation"] = be;
    be.__name__ = ["kha", "graphics4", "ConstantLocation"];
    var Ud = function() {};
    m["kha.graphics4.CubeMap"] = Ud;
    Ud.__name__ = ["kha", "graphics4", "CubeMap"];
    Ud.prototype = {
        get_size: null,
        size: null,
        lock: null,
        unlock: null,
        __class__: Ud,
        __properties__: {
            get_size: "get_size"
        }
    };
    var gb = m["kha.graphics4.CullMode"] = {
        __ename__: ["kha", "graphics4", "CullMode"],
        __constructs__: ["Clockwise", "CounterClockwise", "None"]
    };
    gb.Clockwise = ["Clockwise", 0];
    gb.Clockwise.toString = x;
    gb.Clockwise.__enum__ = gb;
    gb.CounterClockwise = ["CounterClockwise", 1];
    gb.CounterClockwise.toString = x;
    gb.CounterClockwise.__enum__ = gb;
    gb.None = ["None", 2];
    gb.None.toString = x;
    gb.None.__enum__ = gb;
    var Yb = function(a) {
        this.source = a.toString();
        this.type = 35632;
        this.shader = null
    };
    m["kha.graphics4.FragmentShader"] = Yb;
    Yb.__name__ = ["kha", "graphics4", "FragmentShader"];
    Yb.prototype = {
        source: null,
        type: null,
        shader: null,
        __class__: Yb
    };
    var Hd = function() {};
    m["kha.graphics4.Graphics"] = Hd;
    Hd.__name__ = ["kha", "graphics4", "Graphics"];
    Hd.prototype = {
        begin: null,
        end: null,
        vsynced: null,
        refreshRate: null,
        clear: null,
        viewport: null,
        scissor: null,
        disableScissor: null,
        setVertexBuffer: null,
        setVertexBuffers: null,
        setIndexBuffer: null,
        setTexture: null,
        setVideoTexture: null,
        setTextureParameters: null,
        createCubeMap: null,
        renderTargetsInvertedY: null,
        instancedRenderingAvailable: null,
        setPipeline: null,
        setBool: null,
        setInt: null,
        setFloat: null,
        setFloat2: null,
        setFloat3: null,
        setFloat4: null,
        setFloats: null,
        setVector2: null,
        setVector3: null,
        setVector4: null,
        setMatrix: null,
        drawIndexedVertices: null,
        drawIndexedVerticesInstanced: null,
        flush: null,
        __class__: Hd
    };
    var Ua = function(a) {
        this.sourceBlend = this.destinationBlend = Y.Undefined;
        this.myPipeline = null;
        this.bilinear = !1;
        this.g = a;
        this.bufferIndex = 0;
        this.initShaders();
        this.initBuffers();
        this.projectionLocation = this.shaderPipeline.getConstantLocation("projectionMatrix");
        this.textureLocation = this.shaderPipeline.getTextureUnit("tex")
    };
    m["kha.graphics4.ImageShaderPainter"] = Ua;
    Ua.__name__ = ["kha", "graphics4", "ImageShaderPainter"];
    Ua.prototype = {
        projectionMatrix: null,
        shaderPipeline: null,
        structure: null,
        projectionLocation: null,
        textureLocation: null,
        bufferIndex: null,
        rectVertexBuffer: null,
        rectVertices: null,
        indexBuffer: null,
        lastTexture: null,
        bilinear: null,
        g: null,
        myPipeline: null,
        sourceBlend: null,
        destinationBlend: null,
        get_pipeline: function() {
            return this.myPipeline
        },
        set_pipeline: function(a) {
            null == a ? (this.projectionLocation = this.shaderPipeline.getConstantLocation("projectionMatrix"), this.textureLocation = this.shaderPipeline.getTextureUnit("tex")) : (this.projectionLocation = a.getConstantLocation("projectionMatrix"), this.textureLocation = a.getTextureUnit("tex"));
            return this.myPipeline = a
        },
        setProjection: function(a) {
            this.projectionMatrix = a
        },
        initShaders: function() {
            this.shaderPipeline = new Rb;
            this.shaderPipeline.fragmentShader = Z.painter_image_frag;
            this.shaderPipeline.vertexShader = Z.painter_image_vert;
            this.structure = new ac;
            this.structure.add("vertexPosition", ia.Float3);
            this.structure.add("texPosition", ia.Float2);
            this.structure.add("vertexColor", ia.Float4);
            this.shaderPipeline.inputLayout = [this.structure];
            this.shaderPipeline.blendSource = Y.BlendOne;
            this.shaderPipeline.blendDestination = Y.InverseSourceAlpha;
            this.shaderPipeline.compile()
        },
        initBuffers: function() {
            this.rectVertexBuffer = new sb(4 * Ua.bufferSize, this.structure, Aa.DynamicUsage);
            this.rectVertices = this.rectVertexBuffer.lock();
            this.indexBuffer = new Bb(6 * Ua.bufferSize, Aa.StaticUsage);
            for (var a = this.indexBuffer.lock(), b = 0, c = Ua.bufferSize; b < c;) {
                var d = b++;
                a[6 * d] = 4 * d;
                a[6 * d + 1] = 4 * d + 1;
                a[6 * d + 2] = 4 * d + 2;
                a[6 * d + 3] = 4 * d;
                a[6 * d + 4] = 4 * d + 2;
                a[6 * d + 5] = 4 * d + 3
            }
            this.indexBuffer.unlock()
        },
        setRectVertices: function(a, b, c, d, e, f, h, g) {
            var k = this.bufferIndex * Ua.vertexSize * 4;
            this.rectVertices[k] = a;
            this.rectVertices[k + 1] = b;
            this.rectVertices[k + 2] = -5;
            this.rectVertices[k + 9] = c;
            this.rectVertices[k + 10] = d;
            this.rectVertices[k + 11] = -5;
            this.rectVertices[k + 18] = e;
            this.rectVertices[k + 19] = f;
            this.rectVertices[k + 20] = -5;
            this.rectVertices[k + 27] = h;
            this.rectVertices[k + 28] = g;
            this.rectVertices[k + 29] = -5
        },
        setRectTexCoords: function(a, b, c, d) {
            var e = this.bufferIndex * Ua.vertexSize * 4;
            this.rectVertices[e + 3] = a;
            this.rectVertices[e + 4] = d;
            this.rectVertices[e + 12] = a;
            this.rectVertices[e + 13] = b;
            this.rectVertices[e + 21] = c;
            this.rectVertices[e + 22] = b;
            this.rectVertices[e + 30] = c;
            this.rectVertices[e + 31] = d
        },
        setRectColor: function(a, b, c, d) {
            var e = this.bufferIndex * Ua.vertexSize * 4;
            this.rectVertices[e + 5] = a;
            this.rectVertices[e + 6] = b;
            this.rectVertices[e + 7] = c;
            this.rectVertices[e + 8] = d;
            this.rectVertices[e + 14] = a;
            this.rectVertices[e + 15] = b;
            this.rectVertices[e + 16] = c;
            this.rectVertices[e + 17] = d;
            this.rectVertices[e + 23] = a;
            this.rectVertices[e + 24] = b;
            this.rectVertices[e + 25] = c;
            this.rectVertices[e + 26] = d;
            this.rectVertices[e + 32] = a;
            this.rectVertices[e + 33] = b;
            this.rectVertices[e + 34] = c;
            this.rectVertices[e + 35] = d
        },
        drawBuffer: function() {
            this.rectVertexBuffer.unlock();
            this.g.setVertexBuffer(this.rectVertexBuffer);
            this.g.setIndexBuffer(this.indexBuffer);
            this.g.setPipeline(null == this.get_pipeline() ? this.shaderPipeline : this.get_pipeline());
            this.g.setTexture(this.textureLocation, this.lastTexture);
            this.g.setTextureParameters(this.textureLocation, Va.Clamp, Va.Clamp, this.bilinear ? Ha.LinearFilter : Ha.PointFilter, this.bilinear ? Ha.LinearFilter : Ha.PointFilter, $a.NoMipFilter);
            this.g.setMatrix(this.projectionLocation, this.projectionMatrix);
            this.g.drawIndexedVertices(0, 6 * this.bufferIndex);
            this.g.setTexture(this.textureLocation, null);
            this.bufferIndex = 0;
            this.rectVertices = this.rectVertexBuffer.lock()
        },
        setBilinearFilter: function(a) {
            this.end();
            this.bilinear = a
        },
        drawImage: function(a, b, c, d, e, f, h, g, k, l, m) {
            (this.bufferIndex +
                1 >= Ua.bufferSize || null != this.lastTexture && a != this.lastTexture) && this.drawBuffer();
            this.setRectColor(.00392156862745098 * t.get_Rb(m), .00392156862745098 * t.get_Gb(m), .00392156862745098 * t.get_Bb(m), .00392156862745098 * t.get_Ab(m) * l);
            this.setRectTexCoords(0, 0, a.get_width() / a.get_realWidth(), a.get_height() / a.get_realHeight());
            this.setRectVertices(b, c, d, e, f, h, g, k);
            ++this.bufferIndex;
            this.lastTexture = a
        },
        drawImage2: function(a, b, c, d, e, f, h, g, k, l, m, q, p, r, u) {
            (this.bufferIndex + 1 >= Ua.bufferSize || null != this.lastTexture && a != this.lastTexture) && this.drawBuffer();
            this.setRectTexCoords(b / a.get_realWidth(), c / a.get_realHeight(), (b + d) / a.get_realWidth(), (c + e) / a.get_realHeight());
            this.setRectColor(.00392156862745098 * t.get_Rb(u), .00392156862745098 * t.get_Gb(u), .00392156862745098 * t.get_Bb(u), .00392156862745098 * t.get_Ab(u) * r);
            this.setRectVertices(f, h, g, k, l, m, q, p);
            ++this.bufferIndex;
            this.lastTexture = a
        },
        drawImageScale: function(a, b, c, d, e, f, h, g, k, l, m) {
            (this.bufferIndex + 1 >= Ua.bufferSize || null != this.lastTexture && a != this.lastTexture) && this.drawBuffer();
            this.setRectTexCoords(b / a.get_realWidth(), c / a.get_realHeight(), (b + d) / a.get_realWidth(), (c + e) / a.get_realHeight());
            this.setRectColor(.00392156862745098 * t.get_Rb(m), .00392156862745098 * t.get_Gb(m), .00392156862745098 * t.get_Bb(m), l);
            this.setRectVertices(f, k, f, h, g, h, g, k);
            ++this.bufferIndex;
            this.lastTexture = a
        },
        end: function() {
            0 < this.bufferIndex && this.drawBuffer();
            this.lastTexture = null
        },
        __class__: Ua,
        __properties__: {
            set_pipeline: "set_pipeline",
            get_pipeline: "get_pipeline"
        }
    };
    var Za = function(a) {
        this.sourceBlend = this.destinationBlend = Y.Undefined;
        this.myPipeline = null;
        this.g = a;
        this.triangleBufferIndex = this.bufferIndex = 0;
        this.initShaders();
        this.initBuffers();
        this.projectionLocation = this.shaderPipeline.getConstantLocation("projectionMatrix")
    };
    m["kha.graphics4.ColoredShaderPainter"] = Za;
    Za.__name__ = ["kha", "graphics4", "ColoredShaderPainter"];
    Za.prototype = {
        projectionMatrix: null,
        shaderPipeline: null,
        structure: null,
        projectionLocation: null,
        bufferIndex: null,
        rectVertexBuffer: null,
        rectVertices: null,
        indexBuffer: null,
        triangleBufferIndex: null,
        triangleVertexBuffer: null,
        triangleVertices: null,
        triangleIndexBuffer: null,
        g: null,
        myPipeline: null,
        sourceBlend: null,
        destinationBlend: null,
        get_pipeline: function() {
            return this.myPipeline
        },
        set_pipeline: function(a) {
            this.projectionLocation = null == a ? this.shaderPipeline.getConstantLocation("projectionMatrix") : a.getConstantLocation("projectionMatrix");
            return this.myPipeline = a
        },
        setProjection: function(a) {
            this.projectionMatrix = a
        },
        initShaders: function() {
            this.shaderPipeline = new Rb;
            this.shaderPipeline.fragmentShader = Z.painter_colored_frag;
            this.shaderPipeline.vertexShader = Z.painter_colored_vert;
            this.structure = new ac;
            this.structure.add("vertexPosition", ia.Float3);
            this.structure.add("vertexColor", ia.Float4);
            this.shaderPipeline.inputLayout = [this.structure];
            this.shaderPipeline.blendSource = Y.SourceAlpha;
            this.shaderPipeline.blendDestination = Y.InverseSourceAlpha;
            this.shaderPipeline.compile()
        },
        initBuffers: function() {
            this.rectVertexBuffer = new sb(4 * Za.bufferSize, this.structure, Aa.DynamicUsage);
            this.rectVertices = this.rectVertexBuffer.lock();
            this.indexBuffer = new Bb(6 * Za.bufferSize, Aa.StaticUsage);
            for (var a = this.indexBuffer.lock(), b = 0, c = Za.bufferSize; b < c;) {
                var d = b++;
                a[6 * d] = 4 * d;
                a[6 * d + 1] = 4 * d + 1;
                a[6 * d + 2] = 4 * d + 2;
                a[6 * d + 3] = 4 * d;
                a[6 * d + 4] = 4 * d + 2;
                a[6 * d + 5] = 4 * d + 3
            }
            this.indexBuffer.unlock();
            this.triangleVertexBuffer = new sb(3 * Za.triangleBufferSize, this.structure, Aa.DynamicUsage);
            this.triangleVertices = this.triangleVertexBuffer.lock();
            this.triangleIndexBuffer = new Bb(3 * Za.triangleBufferSize, Aa.StaticUsage);
            a = this.triangleIndexBuffer.lock();
            b = 0;
            for (c = Za.bufferSize; b < c;) d = b++, a[3 * d] = 3 * d, a[3 * d + 1] = 3 * d + 1, a[3 * d + 2] = 3 * d + 2;
            this.triangleIndexBuffer.unlock()
        },
        setRectVertices: function(a, b, c, d, e, f, h, g) {
            var k = 28 * this.bufferIndex;
            this.rectVertices[k] = a;
            this.rectVertices[k + 1] = b;
            this.rectVertices[k + 2] = -5;
            this.rectVertices[k + 7] = c;
            this.rectVertices[k + 8] = d;
            this.rectVertices[k + 9] = -5;
            this.rectVertices[k + 14] = e;
            this.rectVertices[k + 15] = f;
            this.rectVertices[k + 16] = -5;
            this.rectVertices[k + 21] = h;
            this.rectVertices[k + 22] = g;
            this.rectVertices[k + 23] = -5
        },
        setRectColors: function(a, b) {
            var c = 28 * this.bufferIndex,
                d = .00392156862745098 * a * t.get_Ab(b),
                e = .00392156862745098 * t.get_Rb(b);
            this.rectVertices[c + 3] = e;
            e = .00392156862745098 * t.get_Gb(b);
            this.rectVertices[c + 4] = e;
            e = .00392156862745098 * t.get_Bb(b);
            this.rectVertices[c + 5] = e;
            this.rectVertices[c + 6] = d;
            e = .00392156862745098 * t.get_Rb(b);
            this.rectVertices[c + 10] = e;
            e = .00392156862745098 * t.get_Gb(b);
            this.rectVertices[c + 11] = e;
            e = .00392156862745098 * t.get_Bb(b);
            this.rectVertices[c + 12] = e;
            this.rectVertices[c + 13] = d;
            e = .00392156862745098 * t.get_Rb(b);
            this.rectVertices[c + 17] = e;
            e = .00392156862745098 * t.get_Gb(b);
            this.rectVertices[c + 18] = e;
            e = .00392156862745098 * t.get_Bb(b);
            this.rectVertices[c + 19] = e;
            this.rectVertices[c + 20] = d;
            e = .00392156862745098 * t.get_Rb(b);
            this.rectVertices[c + 24] = e;
            e = .00392156862745098 * t.get_Gb(b);
            this.rectVertices[c + 25] = e;
            e = .00392156862745098 * t.get_Bb(b);
            this.rectVertices[c + 26] = e;
            this.rectVertices[c + 27] = d
        },
        setTriVertices: function(a, b, c, d, e, f) {
            var h = 21 * this.triangleBufferIndex;
            this.triangleVertices[h] = a;
            this.triangleVertices[h + 1] = b;
            this.triangleVertices[h + 2] = -5;
            this.triangleVertices[h +
                7] = c;
            this.triangleVertices[h + 8] = d;
            this.triangleVertices[h + 9] = -5;
            this.triangleVertices[h + 14] = e;
            this.triangleVertices[h + 15] = f;
            this.triangleVertices[h + 16] = -5
        },
        setTriColors: function(a, b) {
            var c = 21 * this.triangleBufferIndex,
                d = .00392156862745098 * a * t.get_Ab(b),
                e = .00392156862745098 * t.get_Rb(b);
            this.triangleVertices[c + 3] = e;
            e = .00392156862745098 * t.get_Gb(b);
            this.triangleVertices[c + 4] = e;
            e = .00392156862745098 * t.get_Bb(b);
            this.triangleVertices[c + 5] = e;
            this.triangleVertices[c + 6] = d;
            e = .00392156862745098 * t.get_Rb(b);
            this.triangleVertices[c +
                10] = e;
            e = .00392156862745098 * t.get_Gb(b);
            this.triangleVertices[c + 11] = e;
            e = .00392156862745098 * t.get_Bb(b);
            this.triangleVertices[c + 12] = e;
            this.triangleVertices[c + 13] = d;
            e = .00392156862745098 * t.get_Rb(b);
            this.triangleVertices[c + 17] = e;
            e = .00392156862745098 * t.get_Gb(b);
            this.triangleVertices[c + 18] = e;
            e = .00392156862745098 * t.get_Bb(b);
            this.triangleVertices[c + 19] = e;
            this.triangleVertices[c + 20] = d
        },
        drawBuffer: function(a) {
            a || this.endTris(!0);
            this.rectVertexBuffer.unlock();
            this.g.setVertexBuffer(this.rectVertexBuffer);
            this.g.setIndexBuffer(this.indexBuffer);
            this.g.setPipeline(null == this.get_pipeline() ? this.shaderPipeline : this.get_pipeline());
            this.g.setMatrix(this.projectionLocation, this.projectionMatrix);
            this.g.drawIndexedVertices(0, 6 * this.bufferIndex);
            this.bufferIndex = 0;
            this.rectVertices = this.rectVertexBuffer.lock()
        },
        drawTriBuffer: function(a) {
            a || 0 < this.bufferIndex && this.drawBuffer(!0);
            this.triangleVertexBuffer.unlock();
            this.g.setVertexBuffer(this.triangleVertexBuffer);
            this.g.setIndexBuffer(this.triangleIndexBuffer);
            this.g.setPipeline(null == this.get_pipeline() ? this.shaderPipeline : this.get_pipeline());
            this.g.setMatrix(this.projectionLocation, this.projectionMatrix);
            this.g.drawIndexedVertices(0, 3 * this.triangleBufferIndex);
            this.triangleBufferIndex = 0;
            this.triangleVertices = this.triangleVertexBuffer.lock()
        },
        fillRect: function(a, b, c, d, e, f, h, g, k, l) {
            this.bufferIndex + 1 >= Za.bufferSize && this.drawBuffer(!1);
            this.setRectColors(a, b);
            this.setRectVertices(c, d, e, f, h, g, k, l);
            ++this.bufferIndex
        },
        fillTriangle: function(a, b, c, d, e, f, h, g) {
            this.triangleBufferIndex + 1 >= Za.triangleBufferSize && this.drawTriBuffer(!1);
            this.setTriColors(a, b);
            this.setTriVertices(c, d, e, f, h, g);
            ++this.triangleBufferIndex
        },
        endTris: function(a) {
            0 < this.triangleBufferIndex && this.drawTriBuffer(a)
        },
        endRects: function(a) {
            0 < this.bufferIndex && this.drawBuffer(a)
        },
        end: function() {
            0 < this.triangleBufferIndex && this.drawTriBuffer(!1);
            0 < this.bufferIndex && this.drawBuffer(!1)
        },
        __class__: Za,
        __properties__: {
            set_pipeline: "set_pipeline",
            get_pipeline: "get_pipeline"
        }
    };
    var Cb = function(a) {
        this.sourceBlend = this.destinationBlend = Y.Undefined;
        this.bilinear = !1;
        this.myPipeline = null;
        this.g = a;
        this.bufferIndex = 0;
        this.initShaders();
        this.initBuffers();
        this.projectionLocation = this.shaderPipeline.getConstantLocation("projectionMatrix");
        this.textureLocation = this.shaderPipeline.getTextureUnit("tex")
    };
    m["kha.graphics4.TextShaderPainter"] = Cb;
    Cb.__name__ = ["kha", "graphics4", "TextShaderPainter"];
    Cb.prototype = {
        projectionMatrix: null,
        shaderPipeline: null,
        structure: null,
        projectionLocation: null,
        textureLocation: null,
        bufferIndex: null,
        rectVertexBuffer: null,
        rectVertices: null,
        indexBuffer: null,
        font: null,
        lastTexture: null,
        g: null,
        myPipeline: null,
        fontSize: null,
        bilinear: null,
        sourceBlend: null,
        destinationBlend: null,
        get_pipeline: function() {
            return this.myPipeline
        },
        set_pipeline: function(a) {
            null == a ? (this.projectionLocation = this.shaderPipeline.getConstantLocation("projectionMatrix"), this.textureLocation = this.shaderPipeline.getTextureUnit("tex")) : (this.projectionLocation = a.getConstantLocation("projectionMatrix"), this.textureLocation = a.getTextureUnit("tex"));
            return this.myPipeline = a
        },
        setProjection: function(a) {
            this.projectionMatrix = a
        },
        initShaders: function() {
            this.shaderPipeline = new Rb;
            this.shaderPipeline.fragmentShader = Z.painter_text_frag;
            this.shaderPipeline.vertexShader = Z.painter_text_vert;
            this.structure = new ac;
            this.structure.add("vertexPosition", ia.Float3);
            this.structure.add("texPosition", ia.Float2);
            this.structure.add("vertexColor", ia.Float4);
            this.shaderPipeline.inputLayout = [this.structure];
            this.shaderPipeline.blendSource = Y.SourceAlpha;
            this.shaderPipeline.blendDestination = Y.InverseSourceAlpha;
            this.shaderPipeline.compile()
        },
        initBuffers: function() {
            this.rectVertexBuffer = new sb(4 * Cb.bufferSize, this.structure, Aa.DynamicUsage);
            this.rectVertices = this.rectVertexBuffer.lock();
            this.indexBuffer = new Bb(6 * Cb.bufferSize, Aa.StaticUsage);
            for (var a = this.indexBuffer.lock(), b = 0, c = Cb.bufferSize; b < c;) {
                var d = b++;
                a[6 * d] = 4 * d;
                a[6 * d + 1] = 4 * d + 1;
                a[6 * d + 2] = 4 * d + 2;
                a[6 * d + 3] = 4 * d;
                a[6 * d + 4] = 4 * d + 2;
                a[6 * d + 5] = 4 * d + 3
            }
            this.indexBuffer.unlock()
        },
        setRectVertices: function(a, b, c, d, e, f, h, g) {
            var k = 36 * this.bufferIndex;
            this.rectVertices[k] = a;
            this.rectVertices[k + 1] = b;
            this.rectVertices[k + 2] = -5;
            this.rectVertices[k + 9] = c;
            this.rectVertices[k + 10] = d;
            this.rectVertices[k + 11] = -5;
            this.rectVertices[k + 18] = e;
            this.rectVertices[k + 19] = f;
            this.rectVertices[k + 20] = -5;
            this.rectVertices[k + 27] = h;
            this.rectVertices[k + 28] = g;
            this.rectVertices[k + 29] = -5
        },
        setRectTexCoords: function(a, b, c, d) {
            var e = 36 * this.bufferIndex;
            this.rectVertices[e + 3] = a;
            this.rectVertices[e + 4] = d;
            this.rectVertices[e + 12] = a;
            this.rectVertices[e + 13] = b;
            this.rectVertices[e + 21] = c;
            this.rectVertices[e +
                22] = b;
            this.rectVertices[e + 30] = c;
            this.rectVertices[e + 31] = d
        },
        setRectColors: function(a, b) {
            var c = 36 * this.bufferIndex,
                d = .00392156862745098 * a * t.get_Ab(b),
                e = .00392156862745098 * t.get_Rb(b);
            this.rectVertices[c + 5] = e;
            e = .00392156862745098 * t.get_Gb(b);
            this.rectVertices[c + 6] = e;
            e = .00392156862745098 * t.get_Bb(b);
            this.rectVertices[c + 7] = e;
            this.rectVertices[c + 8] = d;
            e = .00392156862745098 * t.get_Rb(b);
            this.rectVertices[c + 14] = e;
            e = .00392156862745098 * t.get_Gb(b);
            this.rectVertices[c + 15] = e;
            e = .00392156862745098 * t.get_Bb(b);
            this.rectVertices[c +
                16] = e;
            this.rectVertices[c + 17] = d;
            e = .00392156862745098 * t.get_Rb(b);
            this.rectVertices[c + 23] = e;
            e = .00392156862745098 * t.get_Gb(b);
            this.rectVertices[c + 24] = e;
            e = .00392156862745098 * t.get_Bb(b);
            this.rectVertices[c + 25] = e;
            this.rectVertices[c + 26] = d;
            e = .00392156862745098 * t.get_Rb(b);
            this.rectVertices[c + 32] = e;
            e = .00392156862745098 * t.get_Gb(b);
            this.rectVertices[c + 33] = e;
            e = .00392156862745098 * t.get_Bb(b);
            this.rectVertices[c + 34] = e;
            this.rectVertices[c + 35] = d
        },
        drawBuffer: function() {
            this.rectVertexBuffer.unlock();
            this.g.setVertexBuffer(this.rectVertexBuffer);
            this.g.setIndexBuffer(this.indexBuffer);
            this.g.setPipeline(null == this.get_pipeline() ? this.shaderPipeline : this.get_pipeline());
            this.g.setTexture(this.textureLocation, this.lastTexture);
            this.g.setMatrix(this.projectionLocation, this.projectionMatrix);
            this.g.setTextureParameters(this.textureLocation, Va.Clamp, Va.Clamp, this.bilinear ? Ha.LinearFilter : Ha.PointFilter, this.bilinear ? Ha.LinearFilter : Ha.PointFilter, $a.NoMipFilter);
            this.g.drawIndexedVertices(0, 6 * this.bufferIndex);
            this.g.setTexture(this.textureLocation, null);
            this.bufferIndex = 0;
            this.rectVertices = this.rectVertexBuffer.lock()
        },
        setBilinearFilter: function(a) {
            this.end();
            this.bilinear = a
        },
        setFont: function(a) {
            this.font = G.__cast(a, Xb)
        },
        text: null,
        startString: function(a) {
            this.text = a
        },
        charCodeAt: function(a) {
            return v.cca(this.text, a)
        },
        stringLength: function() {
            return this.text.length
        },
        endString: function() {
            this.text = null
        },
        drawString: function(a, b, c, d, e, f) {
            var h = this.font._get(this.fontSize),
                g = h.getTexture();
            null != this.lastTexture && g != this.lastTexture && this.drawBuffer();
            this.lastTexture = g;
            this.startString(a);
            a = 0;
            for (var k = this.stringLength(); a < k;) {
                var l = a++,
                    l = h.getBakedQuad(this.charCodeAt(l) - 32, d, e);
                if (null != l) {
                    this.bufferIndex + 1 >= Cb.bufferSize && this.drawBuffer();
                    this.setRectColors(b, c);
                    this.setRectTexCoords(l.s0 * g.get_width() / g.get_realWidth(), l.t0 * g.get_height() / g.get_realHeight(), l.s1 * g.get_width() / g.get_realWidth(), l.t1 * g.get_height() / g.get_realHeight());
                    var m = l.x0,
                        q = l.y1,
                        p = f._02 * m + f._12 * q + f._22,
                        r = l.x0,
                        t = l.y0,
                        u = f._02 * r + f._12 * t + f._22,
                        w = l.x1,
                        v = l.y0,
                        x = f._02 * w +
                        f._12 * v + f._22,
                        y = l.x1,
                        z = l.y1,
                        B = f._02 * y + f._12 * z + f._22;
                    this.setRectVertices((f._00 * m + f._10 * q + f._20) / p, (f._01 * m + f._11 * q + f._21) / p, (f._00 * r + f._10 * t + f._20) / u, (f._01 * r + f._11 * t + f._21) / u, (f._00 * w + f._10 * v + f._20) / x, (f._01 * w + f._11 * v + f._21) / x, (f._00 * y + f._10 * z + f._20) / B, (f._01 * y + f._11 * z + f._21) / B);
                    d += l.xadvance;
                    ++this.bufferIndex
                }
            }
            this.endString()
        },
        end: function() {
            0 < this.bufferIndex && this.drawBuffer();
            this.lastTexture = null
        },
        __class__: Cb,
        __properties__: {
            set_pipeline: "set_pipeline",
            get_pipeline: "get_pipeline"
        }
    };
    var nb = function(a) {
        this.myImageScaleQuality = Ya.High;
        rb.call(this);
        this.set_color(t.White);
        this.canvas = a;
        this.g = a.get_g4();
        this.imagePainter = new Ua(this.g);
        this.coloredPainter = new Za(this.g);
        this.textPainter = new Cb(this.g);
        this.textPainter.fontSize = this.get_fontSize();
        this.setProjection();
        this.videoPipeline = new Rb;
        this.videoPipeline.fragmentShader = Z.painter_video_frag;
        this.videoPipeline.vertexShader = Z.painter_video_vert;
        a = new ac;
        a.add("vertexPosition", ia.Float3);
        a.add("texPosition", ia.Float2);
        a.add("vertexColor", ia.Float4);
        this.videoPipeline.inputLayout = [a];
        this.videoPipeline.compile()
    };
    m["kha.graphics4.Graphics2"] = nb;
    nb.__name__ = ["kha", "graphics4", "Graphics2"];
    nb.upperPowerOfTwo = function(a) {
        a--;
        a |= a >>> 1;
        a |= a >>> 2;
        a |= a >>> 4;
        a |= a >>> 8;
        a |= a >>> 16;
        a++;
        return a
    };
    nb.__super__ = rb;
    nb.prototype = T(rb.prototype, {
        myColor: null,
        myFont: null,
        projectionMatrix: null,
        imagePainter: null,
        coloredPainter: null,
        textPainter: null,
        videoPipeline: null,
        canvas: null,
        g: null,
        setProjection: function() {
            var a = this.canvas.get_width(),
                b = this.canvas.get_height();
            G.__instanceof(this.canvas, Wb) ? this.projectionMatrix = Na.orthogonalProjection(0, a, b, 0, .1, 1E3) : (va.get_nonPow2Supported() || (a = nb.upperPowerOfTwo(a), b = nb.upperPowerOfTwo(b)), this.g.renderTargetsInvertedY() ? this.projectionMatrix = Na.orthogonalProjection(0, a, 0, b, .1, 1E3) : this.projectionMatrix = Na.orthogonalProjection(0, a, b, 0, .1, 1E3));
            this.imagePainter.setProjection(this.projectionMatrix);
            this.coloredPainter.setProjection(this.projectionMatrix);
            this.textPainter.setProjection(this.projectionMatrix)
        },
        drawImage: function(a, b, c) {
            this.coloredPainter.end();
            this.textPainter.end();
            var d = b + a.get_width(),
                e = c + a.get_height(),
                f = this.transformations[this.transformations.length - 1],
                h = f._02 * b + f._12 * e + f._22,
                g = this.transformations[this.transformations.length - 1],
                k = g._02 * b + g._12 * c + g._22,
                l = this.transformations[this.transformations.length - 1],
                m = l._02 * d + l._12 * c + l._22,
                q = this.transformations[this.transformations.length - 1],
                p = q._02 * d + q._12 * e + q._22;
            this.imagePainter.drawImage(a, (f._00 * b + f._10 * e + f._20) / h, (f._01 * b + f._11 * e + f._21) / h, (g._00 * b + g._10 * c + g._20) / k, (g._01 * b + g._11 * c + g._21) / k, (l._00 * d + l._10 * c + l._20) / m, (l._01 * d + l._11 * c + l._21) / m, (q._00 * d + q._10 * e + q._20) / p, (q._01 * d + q._11 * e + q._21) / p, this.get_opacity(), this.get_color())
        },
        drawScaledSubImage: function(a, b, c, d, e, f, h, g, k) {
            this.coloredPainter.end();
            this.textPainter.end();
            var l = this.transformations[this.transformations.length - 1],
                m = h + k,
                q = l._02 * f + l._12 * m + l._22,
                p = this.transformations[this.transformations.length - 1],
                r = p._02 * f + p._12 * h + p._22,
                t = this.transformations[this.transformations.length - 1],
                u = f + g,
                w = t._02 * u + t._12 * h + t._22,
                v = this.transformations[this.transformations.length - 1];
            g = f + g;
            k = h + k;
            var x = v._02 * g + v._12 * k + v._22;
            this.imagePainter.drawImage2(a, b, c, d, e, (l._00 * f + l._10 * m + l._20) / q, (l._01 * f + l._11 * m + l._21) / q, (p._00 * f + p._10 * h + p._20) / r, (p._01 * f + p._11 * h + p._21) / r, (t._00 * u + t._10 * h + t._20) / w, (t._01 * u + t._11 * h + t._21) / w, (v._00 * g + v._10 * k + v._20) / x, (v._01 * g + v._11 * k + v._21) / x, this.get_opacity(), this.get_color())
        },
        get_color: function() {
            return this.myColor
        },
        set_color: function(a) {
            return this.myColor = a
        },
        drawRect: function(a, b, c, d, e) {
            null == e && (e = 1);
            this.imagePainter.end();
            this.textPainter.end();
            var f;
            f = this.transformations[this.transformations.length - 1];
            var h = a - e / 2,
                g = b + e / 2,
                k = f._02 * h + f._12 * g + f._22;
            f = new ca((f._00 * h + f._10 * g + f._20) / k, (f._01 * h + f._11 * g + f._21) / k);
            var h = this.transformations[this.transformations.length - 1],
                g = a - e / 2,
                k = b - e / 2,
                l = h._02 * g + h._12 * k + h._22,
                h = new ca((h._00 * g + h._10 * k + h._20) / l, (h._01 * g + h._11 * k + h._21) / l),
                g = this.transformations[this.transformations.length - 1],
                k = a + c + e / 2,
                l = b - e / 2,
                m = g._02 * k + g._12 * l + g._22,
                g = new ca((g._00 * k + g._10 * l + g._20) / m, (g._01 * k + g._11 * l + g._21) / m),
                k = this.transformations[this.transformations.length - 1],
                l = a + c + e / 2,
                m = b + e / 2,
                q = k._02 * l + k._12 * m + k._22,
                k = new ca((k._00 * l + k._10 * m + k._20) / q, (k._01 * l + k._11 * m + k._21) / q);
            this.coloredPainter.fillRect(this.get_opacity(), this.get_color(), f.x, f.y, h.x, h.y, g.x, g.y, k.x, k.y);
            f = this.transformations[this.transformations.length - 1];
            g = a - e / 2;
            k = b + d + e / 2;
            l = f._02 * g + f._12 * k + f._22;
            f = new ca((f._00 * g + f._10 * k + f._20) / l, (f._01 * g + f._11 * k + f._21) / l);
            g = this.transformations[this.transformations.length -
                1];
            k = a + e / 2;
            l = b - e / 2;
            m = g._02 * k + g._12 * l + g._22;
            g = new ca((g._00 * k + g._10 * l + g._20) / m, (g._01 * k + g._11 * l + g._21) / m);
            k = this.transformations[this.transformations.length - 1];
            l = a + e / 2;
            m = b + d + e / 2;
            q = k._02 * l + k._12 * m + k._22;
            k = new ca((k._00 * l + k._10 * m + k._20) / q, (k._01 * l + k._11 * m + k._21) / q);
            this.coloredPainter.fillRect(this.get_opacity(), this.get_color(), f.x, f.y, h.x, h.y, g.x, g.y, k.x, k.y);
            h = this.transformations[this.transformations.length - 1];
            g = a - e / 2;
            k = b + d - e / 2;
            l = h._02 * g + h._12 * k + h._22;
            h = new ca((h._00 * g + h._10 * k + h._20) / l, (h._01 * g +
                h._11 * k + h._21) / l);
            g = this.transformations[this.transformations.length - 1];
            k = a + c + e / 2;
            l = b + d - e / 2;
            m = g._02 * k + g._12 * l + g._22;
            g = new ca((g._00 * k + g._10 * l + g._20) / m, (g._01 * k + g._11 * l + g._21) / m);
            k = this.transformations[this.transformations.length - 1];
            l = a + c + e / 2;
            m = b + d + e / 2;
            q = k._02 * l + k._12 * m + k._22;
            k = new ca((k._00 * l + k._10 * m + k._20) / q, (k._01 * l + k._11 * m + k._21) / q);
            this.coloredPainter.fillRect(this.get_opacity(), this.get_color(), f.x, f.y, h.x, h.y, g.x, g.y, k.x, k.y);
            f = this.transformations[this.transformations.length - 1];
            h = a + c - e / 2;
            g = b + d + e / 2;
            k = f._02 * h + f._12 * g + f._22;
            f = new ca((f._00 * h + f._10 * g + f._20) / k, (f._01 * h + f._11 * g + f._21) / k);
            h = this.transformations[this.transformations.length - 1];
            g = a + c - e / 2;
            k = b - e / 2;
            l = h._02 * g + h._12 * k + h._22;
            h = new ca((h._00 * g + h._10 * k + h._20) / l, (h._01 * g + h._11 * k + h._21) / l);
            g = this.transformations[this.transformations.length - 1];
            k = a + c + e / 2;
            l = b - e / 2;
            m = g._02 * k + g._12 * l + g._22;
            g = new ca((g._00 * k + g._10 * l + g._20) / m, (g._01 * k + g._11 * l + g._21) / m);
            k = this.transformations[this.transformations.length - 1];
            a = a + c + e / 2;
            b = b + d + e / 2;
            d = k._02 * a + k._12 * b +
                k._22;
            k = new ca((k._00 * a + k._10 * b + k._20) / d, (k._01 * a + k._11 * b + k._21) / d);
            this.coloredPainter.fillRect(this.get_opacity(), this.get_color(), f.x, f.y, h.x, h.y, g.x, g.y, k.x, k.y)
        },
        fillRect: function(a, b, c, d) {
            this.imagePainter.end();
            this.textPainter.end();
            var e = this.transformations[this.transformations.length - 1],
                f = b + d,
                h = e._02 * a + e._12 * f + e._22,
                g = (e._00 * a + e._10 * f + e._20) / h,
                e = (e._01 * a + e._11 * f + e._21) / h,
                h = this.transformations[this.transformations.length - 1],
                k = h._02 * a + h._12 * b + h._22,
                f = (h._00 * a + h._10 * b + h._20) / k,
                h = (h._01 * a +
                    h._11 * b + h._21) / k,
                l = this.transformations[this.transformations.length - 1],
                m = a + c,
                q = l._02 * m + l._12 * b + l._22,
                k = (l._00 * m + l._10 * b + l._20) / q,
                l = (l._01 * m + l._11 * b + l._21) / q,
                m = this.transformations[this.transformations.length - 1];
            a += c;
            d = b + d;
            c = m._02 * a + m._12 * d + m._22;
            b = (m._00 * a + m._10 * d + m._20) / c;
            d = (m._01 * a + m._11 * d + m._21) / c;
            this.coloredPainter.fillRect(this.get_opacity(), this.get_color(), g, e, f, h, k, l, b, d)
        },
        drawString: function(a, b, c) {
            this.imagePainter.end();
            this.coloredPainter.end();
            this.textPainter.drawString(a, this.get_opacity(), this.get_color(), b, c, this.transformations[this.transformations.length - 1])
        },
        get_font: function() {
            return this.myFont
        },
        set_font: function(a) {
            this.textPainter.setFont(a);
            return this.myFont = a
        },
        set_fontSize: function(a) {
            return rb.prototype.set_fontSize.call(this, this.textPainter.fontSize = a)
        },
        drawLine: function(a, b, c, d, e) {
            null == e && (e = 1);
            this.imagePainter.end();
            this.textPainter.end();
            var f;
            f = d == b ? new ca(0, -1) : new ca(1, -(c - a) / (d - b));
            f.set_length(e);
            a = new ca(a + .5 * f.x, b + .5 * f.y);
            c = new ca(c + .5 * f.x, d + .5 * f.y);
            d = new ca(a.x -
                f.x, a.y - f.y);
            f = new ca(c.x - f.x, c.y - f.y);
            b = this.transformations[this.transformations.length - 1];
            e = b._02 * a.x + b._12 * a.y + b._22;
            a = new ca((b._00 * a.x + b._10 * a.y + b._20) / e, (b._01 * a.x + b._11 * a.y + b._21) / e);
            b = this.transformations[this.transformations.length - 1];
            e = b._02 * c.x + b._12 * c.y + b._22;
            c = new ca((b._00 * c.x + b._10 * c.y + b._20) / e, (b._01 * c.x + b._11 * c.y + b._21) / e);
            b = this.transformations[this.transformations.length - 1];
            e = b._02 * d.x + b._12 * d.y + b._22;
            d = new ca((b._00 * d.x + b._10 * d.y + b._20) / e, (b._01 * d.x + b._11 * d.y + b._21) / e);
            b = this.transformations[this.transformations.length -
                1];
            e = b._02 * f.x + b._12 * f.y + b._22;
            f = new ca((b._00 * f.x + b._10 * f.y + b._20) / e, (b._01 * f.x + b._11 * f.y + b._21) / e);
            this.coloredPainter.fillTriangle(this.get_opacity(), this.get_color(), a.x, a.y, c.x, c.y, d.x, d.y);
            this.coloredPainter.fillTriangle(this.get_opacity(), this.get_color(), d.x, d.y, c.x, c.y, f.x, f.y)
        },
        fillTriangle: function(a, b, c, d, e, f) {
            this.imagePainter.end();
            this.textPainter.end();
            var h = this.transformations[this.transformations.length - 1],
                g = h._02 * a + h._12 * b + h._22,
                k = (h._00 * a + h._10 * b + h._20) / g;
            a = (h._01 * a + h._11 * b +
                h._21) / g;
            h = this.transformations[this.transformations.length - 1];
            g = h._02 * c + h._12 * d + h._22;
            b = (h._00 * c + h._10 * d + h._20) / g;
            c = (h._01 * c + h._11 * d + h._21) / g;
            h = this.transformations[this.transformations.length - 1];
            g = h._02 * e + h._12 * f + h._22;
            d = (h._00 * e + h._10 * f + h._20) / g;
            e = (h._01 * e + h._11 * f + h._21) / g;
            this.coloredPainter.fillTriangle(this.get_opacity(), this.get_color(), k, a, b, c, d, e)
        },
        myImageScaleQuality: null,
        get_imageScaleQuality: function() {
            return this.myImageScaleQuality
        },
        set_imageScaleQuality: function(a) {
            this.imagePainter.setBilinearFilter(a == Ya.High);
            this.textPainter.setBilinearFilter(a == Ya.High);
            return this.myImageScaleQuality = a
        },
        setPipeline: function(a) {
            this.flush();
            this.imagePainter.set_pipeline(a);
            this.coloredPainter.set_pipeline(a);
            this.textPainter.set_pipeline(a);
            null != a && this.g.setPipeline(a)
        },
        setBlendingMode: function(a, b) {
            this.flush();
            this.imagePainter.sourceBlend = a;
            this.imagePainter.destinationBlend = b;
            this.coloredPainter.sourceBlend = a;
            this.coloredPainter.destinationBlend = b;
            this.textPainter.sourceBlend = a;
            this.textPainter.destinationBlend = b
        },
        scissor: function(a, b, c, d) {
            this.flush();
            this.g.scissor(a, b, c, d)
        },
        disableScissor: function() {
            this.flush();
            this.g.disableScissor()
        },
        begin: function(a, b) {
            null == a && (a = !0);
            this.g.begin();
            a && this.clear(b);
            this.setProjection()
        },
        clear: function(a) {
            this.g.clear(null == a ? t.Black : a)
        },
        flush: function() {
            this.imagePainter.end();
            this.textPainter.end();
            this.coloredPainter.end()
        },
        end: function() {
            this.flush();
            this.g.end()
        },
        drawVideoInternal: function(a, b, c, d, e) {},
        drawVideo: function(a, b, c, d, e) {
            this.setPipeline(this.videoPipeline);
            this.drawVideoInternal(a, b, c, d, e);
            this.setPipeline(null)
        },
        __class__: nb
    });
    var Bb = function(a, b, c) {
        this.usage = b;
        this.mySize = a;
        this.buffer = g.gl.createBuffer();
        this.data = [];
        this.data[a - 1] = 0
    };
    m["kha.graphics4.IndexBuffer"] = Bb;
    Bb.__name__ = ["kha", "graphics4", "IndexBuffer"];
    Bb.prototype = {
        buffer: null,
        data: null,
        mySize: null,
        usage: null,
        lock: function() {
            return this.data
        },
        unlock: function() {
            g.gl.bindBuffer(34963, this.buffer);
            g.gl.bufferData(34963, new Uint16Array(this.data), this.usage == Aa.DynamicUsage ? 35048 : 35044)
        },
        set: function() {
            g.gl.bindBuffer(34963, this.buffer)
        },
        count: function() {
            return this.mySize
        },
        __class__: Bb
    };
    var $a = m["kha.graphics4.MipMapFilter"] = {
        __ename__: ["kha", "graphics4", "MipMapFilter"],
        __constructs__: ["NoMipFilter", "PointMipFilter", "LinearMipFilter"]
    };
    $a.NoMipFilter = ["NoMipFilter", 0];
    $a.NoMipFilter.toString = x;
    $a.NoMipFilter.__enum__ = $a;
    $a.PointMipFilter = ["PointMipFilter", 1];
    $a.PointMipFilter.toString = x;
    $a.PointMipFilter.__enum__ = $a;
    $a.LinearMipFilter = ["LinearMipFilter", 2];
    $a.LinearMipFilter.toString = x;
    $a.LinearMipFilter.__enum__ = $a;
    var zc = function() {
        this.fragmentShader = this.vertexShader = this.inputLayout = null;
        this.cullMode = gb.None;
        this.depthWrite = !1;
        this.stencilMode = this.depthMode = ea.Always;
        this.stencilFail = this.stencilDepthFail = this.stencilBothPass = aa.Keep;
        this.stencilReferenceValue = 0;
        this.stencilWriteMask = this.stencilReadMask = 255;
        this.blendSource = Y.BlendOne;
        this.blendDestination = Y.BlendZero
    };
    m["kha.graphics4.PipelineStateBase"] = zc;
    zc.__name__ = ["kha", "graphics4", "PipelineStateBase"];
    zc.prototype = {
        inputLayout: null,
        vertexShader: null,
        fragmentShader: null,
        cullMode: null,
        depthWrite: null,
        depthMode: null,
        stencilMode: null,
        stencilBothPass: null,
        stencilDepthFail: null,
        stencilFail: null,
        stencilReferenceValue: null,
        stencilReadMask: null,
        stencilWriteMask: null,
        blendSource: null,
        blendDestination: null,
        __class__: zc
    };
    var Rb = function() {
        zc.call(this);
        this.program = g.gl.createProgram();
        this.textures = [];
        this.textureValues = []
    };
    m["kha.graphics4.PipelineState"] = Rb;
    Rb.__name__ = ["kha", "graphics4", "PipelineState"];
    Rb.__super__ = zc;
    Rb.prototype = T(zc.prototype, {
        program: null,
        textures: null,
        textureValues: null,
        compile: function() {
            this.compileShader(this.vertexShader);
            this.compileShader(this.fragmentShader);
            g.gl.attachShader(this.program, this.vertexShader.shader);
            g.gl.attachShader(this.program, this.fragmentShader.shader);
            for (var a = 0, b = 0, c = this.inputLayout; b < c.length;) {
                var d = c[b];
                ++b;
                for (var e = 0, d = d.elements; e < d.length;) {
                    var f = d[e];
                    ++e;
                    g.gl.bindAttribLocation(this.program, a, f.name);
                    f.data == ia.Float4x4 ? a += 4 : ++a
                }
            }
            g.gl.linkProgram(this.program);
            if (!g.gl.getProgramParameter(this.program, 35714)) throw new u("Could not link the shader program:\n" + g.gl.getProgramInfoLog(this.program));
        },
        set: function() {
            g.gl.useProgram(this.program);
            for (var a = 0, b = this.textureValues.length; a < b;) {
                var c = a++;
                g.gl.uniform1i(this.textureValues[c], c)
            }
        },
        compileShader: function(a) {
            if (null == a.shader) {
                var b = g.gl.createShader(a.type);
                g.gl.shaderSource(b, a.source);
                g.gl.compileShader(b);
                if (!g.gl.getShaderParameter(b, 35713)) throw new u("Could not compile shader:\n" + g.gl.getShaderInfoLog(b));
                a.shader = b
            }
        },
        getConstantLocation: function(a) {
            return new Oa(g.gl.getUniformLocation(this.program, a))
        },
        getTextureUnit: function(a) {
            var b = this.findTexture(a);
            if (0 > b) {
                var c = g.gl.getUniformLocation(this.program, a),
                    b = this.textures.length;
                this.textureValues.push(c);
                this.textures.push(a)
            }
            return new tb(b)
        },
        findTexture: function(a) {
            for (var b = 0, c = this.textures.length; b < c;) {
                var d = b++;
                if (this.textures[d] == a) return d
            }
            return -1
        },
        __class__: Rb
    });
    var aa = m["kha.graphics4.StencilAction"] = {
        __ename__: ["kha", "graphics4", "StencilAction"],
        __constructs__: "Keep Zero Replace Increment IncrementWrap Decrement DecrementWrap Invert".split(" ")
    };
    aa.Keep = ["Keep", 0];
    aa.Keep.toString = x;
    aa.Keep.__enum__ = aa;
    aa.Zero = ["Zero", 1];
    aa.Zero.toString = x;
    aa.Zero.__enum__ = aa;
    aa.Replace = ["Replace", 2];
    aa.Replace.toString = x;
    aa.Replace.__enum__ = aa;
    aa.Increment = ["Increment", 3];
    aa.Increment.toString = x;
    aa.Increment.__enum__ = aa;
    aa.IncrementWrap = ["IncrementWrap", 4];
    aa.IncrementWrap.toString = x;
    aa.IncrementWrap.__enum__ = aa;
    aa.Decrement = ["Decrement", 5];
    aa.Decrement.toString = x;
    aa.Decrement.__enum__ = aa;
    aa.DecrementWrap = ["DecrementWrap", 6];
    aa.DecrementWrap.toString = x;
    aa.DecrementWrap.__enum__ = aa;
    aa.Invert = ["Invert", 7];
    aa.Invert.toString = x;
    aa.Invert.__enum__ = aa;
    var bc = m["kha.graphics4.TexDir"] = {
        __ename__: ["kha", "graphics4", "TexDir"],
        __constructs__: ["U", "V"]
    };
    bc.U = ["U", 0];
    bc.U.toString = x;
    bc.U.__enum__ = bc;
    bc.V = ["V", 1];
    bc.V.toString = x;
    bc.V.__enum__ = bc;
    var Va = m["kha.graphics4.TextureAddressing"] = {
        __ename__: ["kha", "graphics4", "TextureAddressing"],
        __constructs__: ["Repeat", "Mirror", "Clamp"]
    };
    Va.Repeat = ["Repeat", 0];
    Va.Repeat.toString = x;
    Va.Repeat.__enum__ = Va;
    Va.Mirror = ["Mirror", 1];
    Va.Mirror.toString = x;
    Va.Mirror.__enum__ = Va;
    Va.Clamp = ["Clamp", 2];
    Va.Clamp.toString = x;
    Va.Clamp.__enum__ = Va;
    var Ha = m["kha.graphics4.TextureFilter"] = {
        __ename__: ["kha", "graphics4", "TextureFilter"],
        __constructs__: ["PointFilter", "LinearFilter", "AnisotropicFilter"]
    };
    Ha.PointFilter = ["PointFilter", 0];
    Ha.PointFilter.toString = x;
    Ha.PointFilter.__enum__ = Ha;
    Ha.LinearFilter = ["LinearFilter", 1];
    Ha.LinearFilter.toString = x;
    Ha.LinearFilter.__enum__ = Ha;
    Ha.AnisotropicFilter = ["AnisotropicFilter", 2];
    Ha.AnisotropicFilter.toString = x;
    Ha.AnisotropicFilter.__enum__ = Ha;
    var sa = m["kha.graphics4.TextureFormat"] = {
        __ename__: ["kha", "graphics4", "TextureFormat"],
        __constructs__: ["RGBA32", "L8", "RGBA128"]
    };
    sa.RGBA32 = ["RGBA32", 0];
    sa.RGBA32.toString = x;
    sa.RGBA32.__enum__ = sa;
    sa.L8 = ["L8", 1];
    sa.L8.toString = x;
    sa.L8.__enum__ = sa;
    sa.RGBA128 = ["RGBA128", 2];
    sa.RGBA128.toString = x;
    sa.RGBA128.__enum__ = sa;
    var ce = function() {};
    m["kha.graphics4.TextureUnit"] = ce;
    ce.__name__ = ["kha", "graphics4", "TextureUnit"];
    var Aa = m["kha.graphics4.Usage"] = {
        __ename__: ["kha", "graphics4", "Usage"],
        __constructs__: ["StaticUsage", "DynamicUsage", "ReadableUsage"]
    };
    Aa.StaticUsage = ["StaticUsage", 0];
    Aa.StaticUsage.toString = x;
    Aa.StaticUsage.__enum__ = Aa;
    Aa.DynamicUsage = ["DynamicUsage", 1];
    Aa.DynamicUsage.toString = x;
    Aa.DynamicUsage.__enum__ = Aa;
    Aa.ReadableUsage = ["ReadableUsage", 2];
    Aa.ReadableUsage.toString = x;
    Aa.ReadableUsage.__enum__ = Aa;
    var sb = function(a, b, c, d, e) {
        null == d && (d = 0);
        this.usage = c;
        this.instanceDataStepRate = d;
        this.mySize = a;
        c = this.myStride = 0;
        for (d = b.elements; c < d.length;) switch (e = d[c], ++c, e.data[1]) {
            case 0:
                this.myStride += 4;
                break;
            case 1:
                this.myStride += 8;
                break;
            case 2:
                this.myStride += 12;
                break;
            case 3:
                this.myStride += 16;
                break;
            case 4:
                this.myStride += 64
        }
        this.buffer = g.gl.createBuffer();
        this.data = new Float32Array(a * this.myStride / 4 | 0);
        this.sizes = [];
        this.offsets = [];
        this.sizes[b.elements.length - 1] = 0;
        d = c = a = this.offsets[b.elements.length - 1] = 0;
        for (b = b.elements; d < b.length;) {
            e = b[d];
            ++d;
            var f;
            switch (e.data[1]) {
                case 0:
                    f = 1;
                    break;
                case 1:
                    f = 2;
                    break;
                case 2:
                    f = 3;
                    break;
                case 3:
                    f = 4;
                    break;
                case 4:
                    f = 16
            }
            this.sizes[c] = f;
            this.offsets[c] = a;
            switch (e.data[1]) {
                case 0:
                    a += 4;
                    break;
                case 1:
                    a += 8;
                    break;
                case 2:
                    a += 12;
                    break;
                case 3:
                    a += 16;
                    break;
                case 4:
                    a += 64
            }++c
        }
    };
    m["kha.graphics4.VertexBuffer"] = sb;
    sb.__name__ = ["kha", "graphics4", "VertexBuffer"];
    sb.prototype = {
        buffer: null,
        data: null,
        mySize: null,
        myStride: null,
        sizes: null,
        offsets: null,
        usage: null,
        instanceDataStepRate: null,
        lock: function(a, b) {
            return this.data
        },
        unlock: function() {
            g.gl.bindBuffer(34962, this.buffer);
            g.gl.bufferData(34962, this.data, this.usage == Aa.DynamicUsage ? 35048 : 35044)
        },
        stride: function() {
            return this.myStride
        },
        count: function() {
            return this.mySize
        },
        set: function(a) {
            var b = g.gl.getExtension("ANGLE_instanced_arrays");
            g.gl.bindBuffer(34962, this.buffer);
            for (var c = 0, d = 0, e = this.sizes.length; d < e;) {
                var f = d++;
                if (4 < this.sizes[f])
                    for (var h = this.sizes[f], n = 0; 0 < h;) g.gl.enableVertexAttribArray(a + c), g.gl.vertexAttribPointer(a + c, 4, 5126, !1, this.myStride, this.offsets[f] + n), b && b.vertexAttribDivisorANGLE(a + c, this.instanceDataStepRate), h -= 4, n += 16, ++c;
                else g.gl.enableVertexAttribArray(a + c), g.gl.vertexAttribPointer(a + c, this.sizes[f], 5126, !1, this.myStride, this.offsets[f]), b && b.vertexAttribDivisorANGLE(a + c, this.instanceDataStepRate), ++c
            }
            return c
        },
        __class__: sb
    };
    var ia = m["kha.graphics4.VertexData"] = {
        __ename__: ["kha", "graphics4", "VertexData"],
        __constructs__: ["Float1", "Float2", "Float3", "Float4", "Float4x4"]
    };
    ia.Float1 = ["Float1", 0];
    ia.Float1.toString = x;
    ia.Float1.__enum__ = ia;
    ia.Float2 = ["Float2", 1];
    ia.Float2.toString = x;
    ia.Float2.__enum__ = ia;
    ia.Float3 = ["Float3", 2];
    ia.Float3.toString = x;
    ia.Float3.__enum__ = ia;
    ia.Float4 = ["Float4", 3];
    ia.Float4.toString = x;
    ia.Float4.__enum__ = ia;
    ia.Float4x4 = ["Float4x4", 4];
    ia.Float4x4.toString = x;
    ia.Float4x4.__enum__ = ia;
    var Id = function(a, b) {
        this.name = a;
        this.data = b
    };
    m["kha.graphics4.VertexElement"] = Id;
    Id.__name__ = ["kha", "graphics4", "VertexElement"];
    Id.prototype = {
        name: null,
        data: null,
        __class__: Id
    };
    var Zb = function(a) {
        this.source = a.toString();
        this.type = 35633;
        this.shader = null
    };
    m["kha.graphics4.VertexShader"] = Zb;
    Zb.__name__ = ["kha", "graphics4", "VertexShader"];
    Zb.prototype = {
        source: null,
        type: null,
        shader: null,
        __class__: Zb
    };
    var ac = function() {
        this.elements = []
    };
    m["kha.graphics4.VertexStructure"] = ac;
    ac.__name__ = ["kha", "graphics4", "VertexStructure"];
    ac.prototype = {
        elements: null,
        add: function(a, b) {
            this.elements.push(new Id(a, b))
        },
        size: function() {
            return this.elements.length
        },
        byteSize: function() {
            for (var a = 0, b = 0, c = this.elements.length; b < c;) var d = b++,
                a = a + this.dataByteSize(this.elements[d].data);
            return a
        },
        dataByteSize: function(a) {
            switch (a[1]) {
                case 0:
                    return 1;
                case 1:
                    return 2;
                case 2:
                    return 3;
                case 3:
                    return 4;
                case 4:
                    return 16
            }
            return 0
        },
        get: function(a) {
            return this.elements[a]
        },
        __class__: ac
    };
    var yb = Eb.kha.input.Gamepad = function(a) {
        null == a && (a = 0);
        this.axisListeners = [];
        this.buttonListeners = [];
        yb.instances[a] = this
    };
    m["kha.input.Gamepad"] = yb;
    yb.__name__ = ["kha", "input", "Gamepad"];
    yb.get = function(a) {
        null == a && (a = 0);
        return a >= yb.instances.length ? null : yb.instances[a]
    };
    yb.prototype = {
        notify: function(a, b) {
            null != a && this.axisListeners.push(a);
            null != b && this.buttonListeners.push(b)
        },
        remove: function(a, b) {
            null != a && v.remove(this.axisListeners, a);
            null != b && v.remove(this.buttonListeners, b)
        },
        axisListeners: null,
        buttonListeners: null,
        sendAxisEvent: function(a, b) {
            for (var c = 0, d = this.axisListeners; c < d.length;) {
                var e = d[c];
                ++c;
                e(a, b)
            }
        },
        sendButtonEvent: function(a, b) {
            for (var c = 0, d = this.buttonListeners; c < d.length;) {
                var e = d[c];
                ++c;
                e(a, b)
            }
        },
        __class__: yb
    };
    var Db = function() {
        this.__id = Vd.nextId++
    };
    m["kha.network.Controller"] = Db;
    Db.__name__ = ["kha", "network", "Controller"];
    Db.prototype = {
        __id: null,
        _id: function() {
            return this.__id
        },
        _receive: function(a, b) {},
        __class__: Db
    };
    var xb = Eb.kha.input.Keyboard = function() {
        Db.call(this);
        this.downListeners = [];
        this.upListeners = [];
        xb.instance = this
    };
    m["kha.input.Keyboard"] = xb;
    xb.__name__ = ["kha", "input", "Keyboard"];
    xb.get = function(a) {
        null == a && (a = 0);
        return g.getKeyboard(a)
    };
    xb.__super__ = Db;
    xb.prototype = T(Db.prototype, {
        notify: function(a, b) {
            null != a && this.downListeners.push(a);
            null != b && this.upListeners.push(b)
        },
        remove: function(a, b) {
            null != a && v.remove(this.downListeners, a);
            null != b && v.remove(this.upListeners, b)
        },
        show: function() {},
        hide: function() {},
        downListeners: null,
        upListeners: null,
        sendDownEvent: function(a, b) {
            if (null != Ba.the()) {
                var c = da.alloc(28);
                c.b[0] = 2;
                c.setInt32(1, this._id());
                c.setDouble(5, r.realTime());
                c.setInt32(13, F.get_pixelWidth());
                c.setInt32(17, F.get_pixelHeight());
                c.set(21, F.get_screenRotation()[1]);
                c.setInt32(22, 0);
                c.b[26] = a[1] & 255;
                c.set(27, v.cca(b, 0));
                Ba.the().network.send(c, !1)
            }
            for (var c = 0, d = this.downListeners; c < d.length;) {
                var e = d[c];
                ++c;
                e(a, b)
            }
        },
        sendUpEvent: function(a, b) {
            if (null != Ba.the()) {
                var c = da.alloc(28);
                c.b[0] = 2;
                c.setInt32(1, this._id());
                c.setDouble(5, r.realTime());
                c.setInt32(13, F.get_pixelWidth());
                c.setInt32(17, F.get_pixelHeight());
                c.set(21, F.get_screenRotation()[1]);
                c.setInt32(22, 1);
                c.b[26] = a[1] & 255;
                c.set(27, v.cca(b, 0));
                Ba.the().network.send(c, !1)
            }
            for (var c = 0, d = this.upListeners; c < d.length;) {
                var e = d[c];
                ++c;
                e(a, b)
            }
        },
        _receive: function(a, b) {
            var c = b.getInt32(a);
            if (0 == c) {
                var c = V.createEnumIndex(y, b.b[a + 4], null),
                    d = String.fromCharCode(b.b[a + 5]);
                this.sendDownEvent(c, d)
            } else 1 == c && (c = V.createEnumIndex(y, b.b[a + 4], null), d = String.fromCharCode(b.b[a + 5]), this.sendUpEvent(c, d))
        },
        __class__: xb
    });
    var Ea = Eb.kha.input.Mouse = function() {
        Db.call(this);
        this.downListeners = [];
        this.upListeners = [];
        this.moveListeners = [];
        this.wheelListeners = [];
        Ea.instance = this
    };
    m["kha.input.Mouse"] = Ea;
    Ea.__name__ = ["kha", "input", "Mouse"];
    Ea.get = function(a) {
        null == a && (a = 0);
        return g.getMouse(a)
    };
    Ea.__super__ = Db;
    Ea.prototype = T(Db.prototype, {
        notify: function(a, b, c, d) {
            null != a && this.downListeners.push(a);
            null != b && this.upListeners.push(b);
            null != c && this.moveListeners.push(c);
            null != d && this.wheelListeners.push(d)
        },
        remove: function(a, b, c, d) {
            null != a && v.remove(this.downListeners, a);
            null != b && v.remove(this.upListeners, b);
            null != c && v.remove(this.moveListeners, c);
            null != d && v.remove(this.wheelListeners, d)
        },
        lock: function() {},
        unlock: function() {},
        canLock: function() {
            return !1
        },
        isLocked: function() {
            return !1
        },
        notifyOnLockChange: function(a, b) {},
        removeFromLockChange: function(a, b) {},
        hideSystemCursor: function() {},
        showSystemCursor: function() {},
        downListeners: null,
        upListeners: null,
        moveListeners: null,
        wheelListeners: null,
        sendDownEvent: function(a, b, c) {
            if (null != Ba.the()) {
                var d = da.alloc(38);
                d.b[0] = 2;
                d.setInt32(1, this._id());
                d.setDouble(5, r.realTime());
                d.setInt32(13, F.get_pixelWidth());
                d.setInt32(17, F.get_pixelHeight());
                d.set(21, F.get_screenRotation()[1]);
                d.setInt32(22, 0);
                d.setInt32(26, a);
                d.setInt32(30, b);
                d.setInt32(34, c);
                Ba.the().network.send(d, !1)
            }
            for (var d = 0, e = this.downListeners; d < e.length;) {
                var f = e[d];
                ++d;
                f(a, b, c)
            }
        },
        sendUpEvent: function(a, b, c) {
            if (null != Ba.the()) {
                var d = da.alloc(38);
                d.b[0] = 2;
                d.setInt32(1, this._id());
                d.setDouble(5, r.realTime());
                d.setInt32(13, F.get_pixelWidth());
                d.setInt32(17, F.get_pixelHeight());
                d.set(21, F.get_screenRotation()[1]);
                d.setInt32(22, 1);
                d.setInt32(26, a);
                d.setInt32(30, b);
                d.setInt32(34, c);
                Ba.the().network.send(d, !1)
            }
            for (var d = 0, e = this.upListeners; d < e.length;) {
                var f = e[d];
                ++d;
                f(a, b, c)
            }
        },
        sendMoveEvent: function(a, b, c, d) {
            if (null != Ba.the()) {
                var e = da.alloc(42);
                e.b[0] = 2;
                e.setInt32(1, this._id());
                e.setDouble(5, r.realTime());
                e.setInt32(13, F.get_pixelWidth());
                e.setInt32(17, F.get_pixelHeight());
                e.set(21, F.get_screenRotation()[1]);
                e.setInt32(22, 2);
                e.setInt32(26, a);
                e.setInt32(30, b);
                e.setInt32(34, c);
                e.setInt32(38, d);
                Ba.the().network.send(e, !1)
            }
            for (var e = 0, f = this.moveListeners; e < f.length;) {
                var h = f[e];
                ++e;
                h(a, b, c, d)
            }
        },
        sendWheelEvent: function(a) {
            if (null != Ba.the()) {
                var b = da.alloc(30);
                b.b[0] = 2;
                b.setInt32(1, this._id());
                b.setDouble(5, r.realTime());
                b.setInt32(13, F.get_pixelWidth());
                b.setInt32(17, F.get_pixelHeight());
                b.set(21, F.get_screenRotation()[1]);
                b.setInt32(22, 3);
                b.setInt32(26, a);
                Ba.the().network.send(b, !1)
            }
            for (var b = 0, c = this.wheelListeners; b < c.length;) {
                var d = c[b];
                ++b;
                d(a)
            }
        },
        _receive: function(a, b) {
            var c = b.getInt32(a);
            if (0 == c) {
                var c = b.getInt32(a + 4),
                    d = b.getInt32(a + 8),
                    e = b.getInt32(a + 12);
                this.sendDownEvent(c, d, e)
            } else 1 == c ? (c = b.getInt32(a + 4), d = b.getInt32(a + 8), e = b.getInt32(a + 12), this.sendUpEvent(c, d, e)) : 3 == c && (c = b.getInt32(a + 4), this.sendWheelEvent(c))
        },
        __class__: Ea
    });
    var Jd = function() {
        Ea.call(this)
    };
    m["kha.input.MouseImpl"] = Jd;
    Jd.__name__ = ["kha", "input", "MouseImpl"];
    Jd.__super__ = Ea;
    Jd.prototype = T(Ea.prototype, {
        _receive: function(a, b) {
            b.getInt32(a)
        },
        __class__: Jd
    });
    var Ma = Eb.kha.input.Surface = function() {
        this.touchStartListeners = [];
        this.touchEndListeners = [];
        this.moveListeners = [];
        Ma.instance = this
    };
    m["kha.input.Surface"] = Ma;
    Ma.__name__ = ["kha", "input", "Surface"];
    Ma.get = function(a) {
        null == a && (a = 0);
        return 0 != a ? null : Ma.instance
    };
    Ma.prototype = {
        notify: function(a, b, c) {
            null != a && this.touchStartListeners.push(a);
            null != b && this.touchEndListeners.push(b);
            null != c && this.moveListeners.push(c)
        },
        remove: function(a, b, c) {
            null != a && v.remove(this.touchStartListeners, a);
            null != b && v.remove(this.touchEndListeners, b);
            null != c && this.moveListeners.push(c)
        },
        touchStartListeners: null,
        touchEndListeners: null,
        moveListeners: null,
        sendTouchStartEvent: function(a, b, c) {
            for (var d = 0, e = this.touchStartListeners; d < e.length;) {
                var f = e[d];
                ++d;
                f(a, b, c)
            }
        },
        sendTouchEndEvent: function(a, b, c) {
            for (var d = 0, e = this.touchEndListeners; d < e.length;) {
                var f = e[d];
                ++d;
                f(a, b, c)
            }
        },
        sendMoveEvent: function(a, b, c) {
            for (var d = 0, e = this.moveListeners; d < e.length;) {
                var f = e[d];
                ++d;
                f(a, b, c)
            }
        },
        __class__: Ma
    };
    var X = function(a) {
        this.myFirstLine = !0;
        this.bytes = a;
        this.buffer = []
    };
    m["kha.internal.BytesBlob"] = X;
    X.__name__ = ["kha", "internal", "BytesBlob"];
    X.__interfaces__ = [Lb];
    X.fromBytes = function(a) {
        return new X(a)
    };
    X.alloc = function(a) {
        return new X(da.alloc(a))
    };
    X.readF32 = function(a) {
        var b;
        b = 0 == (a & -2147483648) ? 1 : -1;
        var c = a >> 23 & 255;
        a &= 8388607;
        switch (c) {
            case 0:
                return 0;
            case 255:
                return 0 != a ? NaN : 0 < b ? Infinity : -Infinity;
            default:
                return (a + 8388608) / 8388608 * b * Math.pow(2, c - 127)
        }
    };
    X.bit = function(a, b) {
        return 1 == (a >>> b & 1) ? !0 : !1
    };
    X.prototype = {
        bytes: null,
        buffer: null,
        myFirstLine: null,
        sub: function(a, b) {
            return new X(this.bytes.sub(a, b))
        },
        length: null,
        get_length: function() {
            return this.bytes.length
        },
        writeU8: function(a, b) {
            this.bytes.b[a] = b & 255
        },
        readU8: function(a) {
            return this.bytes.b[a]
        },
        readS8: function(a) {
            a = this.bytes.b[a];
            var b;
            b = 0 == (a & 128) ? 1 : -1;
            return b * (a & 127)
        },
        readU16BE: function(a) {
            return 256 * this.bytes.b[a] + this.bytes.b[a + 1]
        },
        readU16LE: function(a) {
            return 256 * this.bytes.b[a +
                1] + this.bytes.b[a]
        },
        readS16BE: function(a) {
            var b = this.bytes.b[a];
            a = this.bytes.b[a + 1];
            var c;
            c = 0 == (b & 128) ? 1 : -1;
            b &= 127;
            return -1 == c ? -32767 + 256 * b + a : 256 * b + a
        },
        readS16LE: function(a) {
            var b = this.bytes.b[a];
            a = this.bytes.b[a + 1];
            var c;
            c = 0 == (a & 128) ? 1 : -1;
            a &= 127;
            return -1 == c ? -32767 + 256 * a + b : 256 * a + b
        },
        readS32LE: function(a) {
            var b = this.bytes.b[a],
                c = this.bytes.b[a + 1],
                d = this.bytes.b[a + 2];
            a = this.bytes.b[a + 3];
            var e;
            e = 0 == (a & 128) ? 1 : -1;
            a &= 127;
            return -1 == e ? -2147483647 + b + 256 * c + 65536 * d + 16777216 * a : b + 256 * c + 65536 * d + 16777216 * a
        },
        readS32BE: function(a) {
            var b = this.bytes.b[a],
                c = this.bytes.b[a + 1],
                d = this.bytes.b[a + 2];
            a = this.bytes.b[a + 3];
            var e;
            e = 0 == (b & 128) ? 1 : -1;
            b &= 127;
            return -1 == e ? -2147483647 + a + 256 * d + 65536 * c + 16777216 * b : a + 256 * d + 65536 * c + 16777216 * b
        },
        readF32LE: function(a) {
            return X.readF32(this.readS32LE(a))
        },
        readF32BE: function(a) {
            return X.readF32(this.readS32BE(a))
        },
        toString: function() {
            return this.bytes.toString()
        },
        readUtf8Char: function(a) {
            if (a.value >= this.get_length()) return -1;
            var b = this.readU8(a.value);
            ++a.value;
            var c = 0;
            X.bit(b, 7) ? X.bit(b, 7) && X.bit(b, 6) && !X.bit(b, 5) ? (b &= 31, c = this.readU8(a.value), ++a.value, c = b << 6 | c & 63) : X.bit(b, 7) && X.bit(b, 6) && X.bit(b, 5) && !X.bit(b, 4) ? a.value += 2 : X.bit(b, 7) && X.bit(b, 6) && X.bit(b, 5) && X.bit(b, 4) && !X.bit(b, 3) && (a.value += 3) : c = b;
            return c
        },
        readUtf8Line: function(a) {
            var b = 0,
                c = this.readUtf8Char(a);
            if (0 > c) return "";
            for (; 10 != c && 2E3 > b;)
                if (this.buffer[b] = c, ++b, c = this.readUtf8Char(a), a.value >= this.get_length()) {
                    this.buffer[b] = c;
                    ++b;
                    break
                }
            if (this.myFirstLine && (this.myFirstLine = !1, 2 < b && 239 == this.buffer[0] && 187 == this.buffer[1] && 191 == this.buffer[2])) {
                a = [];
                for (var c = 3, d = b - 3; c < d;) {
                    var e = c++;
                    a[e - 3] = this.buffer[e]
                }
                return this.toText(a, b - 3)
            }
            a = [];
            for (c = 0; c < b;) d = c++, a[d] = this.buffer[d];
            return this.toText(a, b)
        },
        toText: function(a, b) {
            for (var c = "", d = 0; d < b;) var e = d++,
                c = c + String.fromCharCode(a[e]);
            return c
        },
        readUtf8String: function() {
            for (var a = "", b = {
                value: 0
            }; b.value < this.get_length();) a += this.readUtf8Line(b) + "\n";
            return a
        },
        toBytes: function() {
            return this.bytes
        },
        unload: function() {
            this.bytes = null
        },
        __class__: X,
        __properties__: {
            get_length: "get_length"
        }
    };
    var bd = function(a) {
        this.element = a.element
    };
    m["kha.js.AEAudioChannel"] = bd;
    bd.__name__ = ["kha", "js", "AEAudioChannel"];
    bd.__interfaces__ = [Xc];
    bd.prototype = {
        element: null,
        play: function() {
            this.element.play()
        },
        pause: function() {
            try {
                this.element.pause()
            } catch (a) {
                a instanceof u && (a = a.val), R.trace(a, {
                    fileName: "AEAudioChannel.hx",
                    lineNumber: 22,
                    className: "kha.js.AEAudioChannel",
                    methodName: "pause"
                })
            }
        },
        stop: function() {
            try {
                this.element.pause(), this.element.currentTime = 0
            } catch (a) {
                a instanceof u && (a = a.val), R.trace(a, {
                    fileName: "AEAudioChannel.hx",
                    lineNumber: 32,
                    className: "kha.js.AEAudioChannel",
                    methodName: "stop"
                })
            }
        },
        length: null,
        get_length: function() {
            return isFinite(this.element.duration) ? this.element.duration : -1
        },
        position: null,
        get_position: function() {
            return this.element.currentTime
        },
        get_volume: function() {
            return 1
        },
        set_volume: function(a) {
            return 1
        },
        finished: null,
        get_finished: function() {
            return this.get_position() >= this.get_length()
        },
        __class__: bd,
        __properties__: {
            get_finished: "get_finished",
            set_volume: "set_volume",
            get_volume: "get_volume",
            get_position: "get_position",
            get_length: "get_length"
        }
    };
    var Wc = function() {};
    m["kha.js.AudioElementAudio"] = Wc;
    Wc.__name__ = ["kha", "js", "AudioElementAudio"];
    Wc._compile = function() {};
    Wc.play = function(a, b, c) {
        null == b && (b = !1);
        a.element.loop = b;
        a.element.play();
        return new bd(a)
    };
    var jb = function(a, b, c) {
        rb.call(this);
        this.canvas = a;
        this.width = b;
        this.height = c;
        jb.instance = this;
        this.myColor = t.fromBytes(0, 0, 0);
        a.save()
    };
    m["kha.js.CanvasGraphics"] = jb;
    jb.__name__ = ["kha", "js", "CanvasGraphics"];
    jb.stringWidth = function(a, b) {
        if (null == jb.instance) return 5 * b.length;
        jb.instance.set_font(a);
        return jb.instance.canvas.measureText(b).width
    };
    jb.__super__ = rb;
    jb.prototype = T(rb.prototype, {
        canvas: null,
        webfont: null,
        width: null,
        height: null,
        myColor: null,
        scaleQuality: null,
        begin: function(a, b) {
            null == a && (a = !0);
            a && this.clear(b)
        },
        clear: function(a) {
            null == a && (a = 0);
            this.canvas.strokeStyle = "rgba(" + t.get_Rb(a) + "," + t.get_Gb(a) + "," + t.get_Bb(a) + "," + .00392156862745098 * t.get_Ab(a) + ")";
            this.canvas.fillStyle = "rgba(" + t.get_Rb(a) + "," + t.get_Gb(a) + "," + t.get_Bb(a) + "," + .00392156862745098 * t.get_Ab(a) + ")";
            0 == .00392156862745098 * t.get_Ab(a) ? this.canvas.clearRect(0, 0, this.width, this.height) : this.canvas.fillRect(0, 0, this.width, this.height);
            this.set_color(this.myColor)
        },
        end: function() {},
        drawImage: function(a, b, c) {
            this.canvas.globalAlpha = this.get_opacity();
            this.canvas.drawImage(G.__cast(a, ta).image, b, c);
            this.canvas.globalAlpha = 1
        },
        drawScaledSubImage: function(a, b, c, d, e, f, h, g, k) {
            this.canvas.globalAlpha = this.get_opacity();
            try {
                0 > g || 0 > k ? (this.canvas.save(), this.canvas.translate(f, h), h = f = 0, 0 > g && (this.canvas.scale(-1, 1), f = -g), 0 > k && (this.canvas.scale(1, -1), h = -k), this.canvas.drawImage(G.__cast(a, ta).image, b, c, d, e, f, h, g, k), this.canvas.restore()) : this.canvas.drawImage(G.__cast(a, ta).image, b, c, d, e, f, h, g, k)
            } catch (l) {
                l instanceof u && (l = l.val)
            }
            this.canvas.globalAlpha = 1
        },
        set_color: function(a) {
            this.myColor = a;
            this.canvas.strokeStyle = "rgba(" + t.get_Rb(a) + "," + t.get_Gb(a) + "," + t.get_Bb(a) + "," + .00392156862745098 * t.get_Ab(a) + ")";
            this.canvas.fillStyle = "rgba(" + t.get_Rb(a) + "," + t.get_Gb(a) + "," + t.get_Bb(a) + "," + .00392156862745098 * t.get_Ab(a) + ")";
            return a
        },
        get_color: function() {
            return this.myColor
        },
        get_imageScaleQuality: function() {
            return this.scaleQuality
        },
        set_imageScaleQuality: function(a) {
            a == Ya.Low ? (this.canvas.mozImageSmoothingEnabled = !1, this.canvas.webkitImageSmoothingEnabled = !1, this.canvas.msImageSmoothingEnabled = !1, this.canvas.imageSmoothingEnabled = !1) : (this.canvas.mozImageSmoothingEnabled = !0, this.canvas.webkitImageSmoothingEnabled = !0, this.canvas.msImageSmoothingEnabled = !0, this.canvas.imageSmoothingEnabled = !0);
            return this.scaleQuality = a
        },
        drawRect: function(a, b, c, d, e) {
            null == e && (e = 1);
            this.canvas.beginPath();
            var f = this.canvas.lineWidth;
            this.canvas.lineWidth = Math.round(e);
            this.canvas.rect(a, b, c, d);
            this.canvas.stroke();
            this.canvas.lineWidth = f
        },
        fillRect: function(a, b, c, d) {
            this.canvas.globalAlpha = .00392156862745098 * this.get_opacity() * t.get_Ab(this.myColor);
            this.canvas.fillRect(a, b, c, d);
            this.canvas.globalAlpha = this.get_opacity()
        },
        drawCircle: function(a, b, c, d) {
            null == d && (d = 1);
            this.canvas.beginPath();
            var e = this.canvas.lineWidth;
            this.canvas.lineWidth = Math.round(d);
            this.canvas.arc(a, b, c, 0, 2 * Math.PI, !1);
            this.canvas.stroke();
            this.canvas.lineWidth = e
        },
        fillCircle: function(a, b, c) {
            this.canvas.beginPath();
            this.canvas.arc(a, b, c, 0, 2 * Math.PI, !1);
            this.canvas.fill()
        },
        drawString: function(a, b, c) {
            var d = this.webfont.getImage(this.get_fontSize(), this.myColor);
            if (0 < d.width)
                for (var e = 0, f = a.length; e < f;) {
                    var h = e++,
                        h = this.webfont.kravur._get(this.get_fontSize()).getBakedQuad(v.cca(a, h) - 32, b, c);
                    null != h && (0 < h.s1 - h.s0 && 0 < h.t1 - h.t0 && 0 < h.x1 - h.x0 && 0 < h.y1 - h.y0 && this.canvas.drawImage(d, h.s0 * d.width, h.t0 * d.height, (h.s1 - h.s0) * d.width, (h.t1 - h.t0) * d.height, h.x0, h.y0, h.x1 - h.x0, h.y1 - h.y0), b += h.xadvance)
                }
        },
        set_font: function(a) {
            return this.webfont = G.__cast(a, nc)
        },
        get_font: function() {
            return this.webfont
        },
        drawLine: function(a, b, c, d, e) {
            null == e && (e = 1);
            this.canvas.beginPath();
            var f = this.canvas.lineWidth;
            this.canvas.lineWidth = Math.round(e);
            this.canvas.moveTo(a, b);
            this.canvas.lineTo(c, d);
            this.canvas.moveTo(0, 0);
            this.canvas.stroke();
            this.canvas.lineWidth = f
        },
        fillTriangle: function(a, b, c, d, e, f) {
            this.canvas.beginPath();
            this.canvas.closePath();
            this.canvas.fill()
        },
        scissor: function(a, b, c, d) {
            this.canvas.beginPath();
            this.canvas.rect(a, b, c, d);
            this.canvas.clip()
        },
        disableScissor: function() {
            this.canvas.restore()
        },
        drawVideo: function(a, b, c, d, e) {
            this.canvas.drawImage(G.__cast(a, kb).element, b, c, d, e)
        },
        setTransformation: function(a) {
            this.canvas.setTransform(a._00, a._01, a._10, a._11, a._20, a._21)
        },
        __class__: jb
    });
    var Ac = function(a) {
        this._parts = null;
        this._parts = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" ");
        this.url = a;
        var b = new Fb("^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?://)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\\d*))?)(((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[?#]|$)))*/?)?([^?#/]*))(?:\\?([^#]*))?(?:#(.*))?)", "");
        b.match(a);
        a = 0;
        for (var c = this._parts.length; a < c;) {
            var d = a++;
            Q.setField(this, this._parts[d], b.matched(d))
        }
    };
    m["kha.js.URLParser"] = Ac;
    Ac.__name__ = ["kha", "js", "URLParser"];
    Ac.parse = function(a) {
        return new Ac(a)
    };
    Ac.prototype = {
        url: null,
        source: null,
        protocol: null,
        authority: null,
        userInfo: null,
        user: null,
        password: null,
        host: null,
        port: null,
        relative: null,
        path: null,
        directory: null,
        file: null,
        query: null,
        anchor: null,
        _parts: null,
        toString: function() {
            for (var a = "For Url -> " + this.url + "\n", b = 0, c = this._parts.length; b < c;) var d = b++,
                a = a + (this._parts[d] + ": " + E.string(Q.field(this, this._parts[d])) + (d == this._parts.length - 1 ? "" : "\n"));
            return a
        },
        __class__: Ac
    };
    var Vc = function() {};
    m["kha.js.EnvironmentVariables"] = Vc;
    Vc.__name__ = ["kha", "js", "EnvironmentVariables"];
    Vc.__super__ = lc;
    Vc.prototype = T(lc.prototype, {
        getVariable: function(a) {
            for (var b = (new Ac(window.location.href)).query.split("&"), c = 0; c < b.length;) {
                var d = b[c];
                ++c;
                d = d.split("=");
                if (d[0] == a) return d[1]
            }
            R.trace("Environment variables requested.", {
                fileName: "EnvironmentVariables.hx",
                lineNumber: 90,
                className: "kha.js.EnvironmentVariables",
                methodName: "getVariable"
            });
            return ""
        },
        __class__: Vc
    });
    var nc = function(a) {
        this.images = new Fa;
        this.kravur = a
    };
    m["kha.js.Font"] = nc;
    nc.__name__ = ["kha", "js", "Font"];
    nc.__interfaces__ = [mc];
    nc.prototype = {
        kravur: null,
        images: null,
        height: function(a) {
            return this.kravur._get(a).getHeight()
        },
        width: function(a, b) {
            return this.kravur._get(a).stringWidth(b)
        },
        baseline: function(a) {
            return this.kravur._get(a).getBaselinePosition()
        },
        getImage: function(a, b) {
            if (!this.images.h.hasOwnProperty(a)) {
                var c = new Fa;
                this.images.h[a] = c;
                c
            }
            if (!this.images.h[a].exists(b)) {
                var d = this.kravur._get(a),
                    c = window.document.createElement("canvas");
                c.width = d.width;
                c.height = d.height;
                var e = c.getContext("2d");
                e.fillStyle = "black";
                e.fillRect(0, 0, d.width, d.height);
                for (var f = e.getImageData(0, 0, d.width, d.height), d = G.__cast(d.getTexture(), ta).bytes, h = 0, g = d.length; h < g;) {
                    var k = h++;
                    f.data[4 * k] = t.get_Rb(b);
                    f.data[4 * k + 1] = t.get_Gb(b);
                    f.data[4 * k + 2] = t.get_Bb(b);
                    f.data[4 * k + 3] = d.b[k]
                }
                e.putImageData(f, 0, 0);
                e = window.document.createElement("img");
                e.src = c.toDataURL("image/png");
                this.images.h[a].set(b, e);
                e;
                return e
            }
            return this.images.h[a].get(b)
        },
        unload: function() {
            this.images = this.kravur = null
        },
        __class__: nc
    };
    var Nb = function(a, b) {
        this.done = b;
        Nb.loading.add(this);
        this.element = window.document.createElement("audio");
        this.filenames = [];
        for (var c = 0; c < a.length;) {
            var d = a[c];
            ++c;
            "" != this.element.canPlayType("audio/ogg") && oa.endsWith(d, ".ogg") && this.filenames.push(d);
            "" != this.element.canPlayType("audio/mp4") && oa.endsWith(d, ".mp4") && this.filenames.push(d)
        }
        this.element.addEventListener("error", M(this, this.errorListener), !1);
        this.element.addEventListener("canplay", M(this, this.canPlayThroughListener), !1);
        this.element.src = this.filenames[0];
        this.element.preload = "auto";
        this.element.load()
    };
    m["kha.js.Sound"] = Nb;
    Nb.__name__ = ["kha", "js", "Sound"];
    Nb.__super__ = Ob;
    Nb.prototype = T(Ob.prototype, {
        filenames: null,
        done: null,
        element: null,
        errorListener: function(a) {
            if (4 == this.element.error.code) {
                a = 0;
                for (var b = this.filenames.length - 1; a < b;) {
                    var c = a++;
                    if (this.element.src == this.filenames[c]) {
                        this.element.src = this.filenames[c + 1];
                        return
                    }
                }
            }
            R.trace("Error loading " + this.element.src, {
                fileName: "Sound.hx",
                lineNumber: 108,
                className: "kha.js.Sound",
                methodName: "errorListener"
            });
            window.console.log("loadSound failed");
            this.finishAsset()
        },
        canPlayThroughListener: function(a) {
            this.finishAsset()
        },
        finishAsset: function() {
            this.element.removeEventListener("error", M(this, this.errorListener), !1);
            this.element.removeEventListener("canplaythrough", M(this, this.canPlayThroughListener), !1);
            this.done(this);
            Nb.loading.remove(this)
        },
        __class__: Nb
    });
    var kb = function(a, b) {
        this.done = b;
        kb.loading.add(this);
        this.element = window.document.createElement("video");
        this.filenames = [];
        for (var c = 0; c < a.length;) {
            var d = a[c];
            ++c;
            "" != this.element.canPlayType("video/webm") && oa.endsWith(d, ".webm") && this.filenames.push(d);
            "" != this.element.canPlayType("video/mp4") && oa.endsWith(d, ".mp4") && this.filenames.push(d)
        }
        this.element.addEventListener("error", M(this, this.errorListener), !1);
        this.element.addEventListener("canplaythrough", M(this, this.canPlayThroughListener), !1);
        this.element.preload = "auto";
        this.element.src = this.filenames[0]
    };
    m["kha.js.Video"] = kb;
    kb.__name__ = ["kha", "js", "Video"];
    kb.__super__ = qc;
    kb.prototype = T(qc.prototype, {
        filenames: null,
        element: null,
        done: null,
        texture: null,
        width: function() {
            return this.element.videoWidth
        },
        height: function() {
            return this.element.videoHeight
        },
        play: function(a) {
            null == a && (a = !1);
            try {
                this.element.loop = a, this.element.play()
            } catch (b) {
                b instanceof
                u && (b = b.val), R.trace(b, {
                    fileName: "Video.hx",
                    lineNumber: 53,
                    className: "kha.js.Video",
                    methodName: "play"
                })
            }
        },
        pause: function() {
            try {
                this.element.pause()
            } catch (a) {
                a instanceof u && (a = a.val), R.trace(a, {
                    fileName: "Video.hx",
                    lineNumber: 62,
                    className: "kha.js.Video",
                    methodName: "pause"
                })
            }
        },
        stop: function() {
            try {
                this.element.pause(), this.element.currentTime = 0
            } catch (a) {
                a instanceof u && (a = a.val), R.trace(a, {
                    fileName: "Video.hx",
                    lineNumber: 72,
                    className: "kha.js.Video",
                    methodName: "stop"
                })
            }
        },
        getCurrentPos: function() {
            return Math.ceil(1E3 * this.element.currentTime)
        },
        getLength: function() {
            return isFinite(this.element.duration) ? Math.floor(1E3 * this.element.duration) : -1
        },
        errorListener: function(a) {
            if (4 == this.element.error.code) {
                a = 0;
                for (var b = this.filenames.length - 1; a < b;) {
                    var c = a++;
                    if (this.element.src == this.filenames[c]) {
                        this.element.src = this.filenames[c + 1];
                        return
                    }
                }
            }
            R.trace("Error loading " + this.element.src, {
                fileName: "Video.hx",
                lineNumber: 100,
                className: "kha.js.Video",
                methodName: "errorListener"
            });
            this.finishAsset()
        },
        canPlayThroughListener: function(a) {
            this.finishAsset()
        },
        finishAsset: function() {
            this.element.removeEventListener("error", M(this, this.errorListener), !1);
            this.element.removeEventListener("canplaythrough", M(this, this.canPlayThroughListener), !1);
            null != g.gl && (this.texture = va.fromVideo(this));
            this.done(this);
            kb.loading.remove(this)
        },
        __class__: kb
    });
    var Tc = function(a, b) {
        var c = this;
        this.done = b;
        var d = new XMLHttpRequest;
        d.open("GET", a, !0);
        d.responseType = "arraybuffer";
        d.onerror = function() {
            R.trace("Error loading " + a, {
                fileName: "WebAudioSound.hx",
                lineNumber: 79,
                className: "kha.js.WebAudioSound",
                methodName: "new"
            });
            window.console.log("loadSound failed")
        };
        d.onload = function() {
            var a = d.response,
                f = new fc,
                h = mb.readAll(da.ofData(a), f, !0),
                f = f.getBytes(),
                a = f.length / 4 | 0;
            if (1 == h.channel)
                for (c.data = Array(2 * a), h = 0; h < a;) {
                    var g = h++,
                        k = f.getFloat(4 * g);
                    c.data[2 * g] = k;
                    k = f.getFloat(4 * g);
                    c.data[2 * g + 1] = k
                } else
                    for (c.data = Array(a), h = 0; h < a;) g = h++, k = f.getFloat(4 * g), c.data[g] = k;
            b(c)
        };
        d.send(null)
    };
    m["kha.js.WebAudioSound"] = Tc;
    Tc.__name__ = ["kha", "js", "WebAudioSound"];
    Tc.__super__ = Ob;
    Tc.prototype = T(Ob.prototype, {
        done: null,
        buffer: null,
        __class__: Tc
    });
    var Oa = function(a) {
        this.value = a
    };
    m["kha.js.graphics4.ConstantLocation"] = Oa;
    Oa.__name__ = ["kha", "js", "graphics4", "ConstantLocation"];
    Oa.__interfaces__ = [be];
    Oa.prototype = {
        value: null,
        __class__: Oa
    };
    var oc = function(a) {
        this.matrixCache = Array(16);
        this.renderTarget = a;
        this.instancedExtension = g.gl.getExtension("ANGLE_instanced_arrays")
    };
    m["kha.js.graphics4.Graphics"] = oc;
    oc.__name__ = ["kha", "js", "graphics4", "Graphics"];
    oc.__interfaces__ = [Hd];
    oc.prototype = {
        framebuffer: null,
        indicesCount: null,
        renderTarget: null,
        instancedExtension: null,
        begin: function(a) {
            g.gl.enable(3042);
            g.gl.blendFunc(770, 771);
            if (null == this.renderTarget) g.gl.bindFramebuffer(36160, null), g.gl.viewport(0, 0, F.get_pixelWidth(), F.get_pixelHeight());
            else if (g.gl.bindFramebuffer(36160, this.renderTarget.frameBuffer), g.gl.viewport(0, 0, this.renderTarget.get_width(), this.renderTarget.get_height()), null != a) {
                g.gl.framebufferTexture2D(36160, g.drawBuffers.COLOR_ATTACHMENT0_WEBGL, 3553, this.renderTarget.texture, 0);
                for (var b = 0, c = a.length; b < c;) {
                    var d = b++;
                    g.gl.framebufferTexture2D(36160, g.drawBuffers.COLOR_ATTACHMENT0_WEBGL + d + 1, 3553, G.__cast(a[d], za).texture, 0)
                }
                b = [g.drawBuffers.COLOR_ATTACHMENT0_WEBGL];
                c = 0;
                for (a = a.length; c < a;) d = c++, b.push(g.drawBuffers.COLOR_ATTACHMENT0_WEBGL + d + 1);
                g.drawBuffers.drawBuffersWEBGL(b)
            }
        },
        end: function() {},
        flush: function() {},
        vsynced: function() {
            return !0
        },
        refreshRate: function() {
            return 60
        },
        clear: function(a, b, c) {
            var d = 0;
            null != a && (d |= 16384, g.gl.clearColor(.00392156862745098 * t.get_Rb(a), .00392156862745098 * t.get_Gb(a), .00392156862745098 * t.get_Bb(a), .00392156862745098 * t.get_Ab(a)));
            null != b && (d |= 256, g.gl.clearDepth(b));
            null != c && (d |= 1024, g.gl.enable(2960), g.gl.stencilMask(255), g.gl.clearStencil(c));
            g.gl.clear(d)
        },
        viewport: function(a, b, c, d) {
            var e;
            e = null == this.renderTarget ? F.get_pixelHeight() : this.renderTarget.get_height();
            g.gl.viewport(a, e - b - d, c, d)
        },
        setDepthMode: function(a, b) {
            switch (b[1]) {
                case 0:
                    g.gl.disable(2929);
                    g.gl.depthFunc(519);
                    break;
                case 1:
                    g.gl.enable(2929);
                    g.gl.depthFunc(512);
                    break;
                case 2:
                    g.gl.enable(2929);
                    g.gl.depthFunc(514);
                    break;
                case 3:
                    g.gl.enable(2929);
                    g.gl.depthFunc(517);
                    break;
                case 4:
                    g.gl.enable(2929);
                    g.gl.depthFunc(513);
                    break;
                case 5:
                    g.gl.enable(2929);
                    g.gl.depthFunc(515);
                    break;
                case 6:
                    g.gl.enable(2929);
                    g.gl.depthFunc(516);
                    break;
                case 7:
                    g.gl.enable(2929), g.gl.depthFunc(518)
            }
            g.gl.depthMask(a)
        },
        getBlendFunc: function(a) {
            switch (a[1]) {
                case 2:
                case 0:
                    return 0;
                case 1:
                    return 1;
                case 3:
                    return 770;
                case 4:
                    return 772;
                case 5:
                    return 771;
                case 6:
                    return 773
            }
        },
        setBlendingMode: function(a, b) {
            a == Y.BlendOne && b == Y.BlendZero ? g.gl.disable(3042) : (g.gl.enable(3042), g.gl.blendFunc(this.getBlendFunc(a), this.getBlendFunc(b)))
        },
        createVertexBuffer: function(a, b, c, d) {
            return new sb(a, b, c)
        },
        setVertexBuffer: function(a) {
            G.__cast(a, sb).set(0)
        },
        setVertexBuffers: function(a) {
            for (var b = 0, c = 0; c < a.length;) {
                var d = a[c];
                ++c;
                b += G.__cast(d, sb).set(b)
            }
        },
        createIndexBuffer: function(a, b, c) {
            return new Bb(a, b)
        },
        setIndexBuffer: function(a) {
            this.indicesCount = a.count();
            G.__cast(a, Bb).set()
        },
        createCubeMap: function(a, b, c, d) {
            return null
        },
        setTexture: function(a, b) {
            null == b ? (g.gl.activeTexture(33984 + G.__cast(a, tb).value), g.gl.bindTexture(3553, null)) : G.__cast(b, za).set(G.__cast(a, tb).value)
        },
        setVideoTexture: function(a, b) {
            null == b ? (g.gl.activeTexture(33984 + G.__cast(a, tb).value), g.gl.bindTexture(3553, null)) : G.__cast(G.__cast(b, kb).texture, za).set(G.__cast(a, tb).value)
        },
        setTextureParameters: function(a, b, c, d, e, f) {
            g.gl.activeTexture(33984 + G.__cast(a, tb).value);
            switch (b[1]) {
                case 2:
                    g.gl.texParameteri(3553, 10242, 33071);
                    break;
                case 0:
                    g.gl.texParameteri(3553, 10242, 10497);
                    break;
                case 1:
                    g.gl.texParameteri(3553, 10242, 33648)
            }
            switch (c[1]) {
                case 2:
                    g.gl.texParameteri(3553, 10243, 33071);
                    break;
                case 0:
                    g.gl.texParameteri(3553, 10243, 10497);
                    break;
                case 1:
                    g.gl.texParameteri(3553, 10243, 33648)
            }
            switch (d[1]) {
                case 0:
                    switch (f[1]) {
                        case 0:
                            g.gl.texParameteri(3553, 10241, 9728);
                            break;
                        case 1:
                            g.gl.texParameteri(3553, 10241, 9984);
                            break;
                        case 2:
                            g.gl.texParameteri(3553, 10241, 9986)
                    }
                    break;
                case 1:
                case 2:
                    switch (f[1]) {
                        case 0:
                            g.gl.texParameteri(3553, 10241, 9729);
                            break;
                        case 1:
                            g.gl.texParameteri(3553, 10241, 9985);
                            break;
                        case 2:
                            g.gl.texParameteri(3553, 10241, 9987)
                    }
            }
            switch (e[1]) {
                case 0:
                    g.gl.texParameteri(3553, 10240, 9728);
                    break;
                case 1:
                case 2:
                    g.gl.texParameteri(3553, 10240, 9729)
            }
        },
        setCullMode: function(a) {
            switch (a[1]) {
                case 2:
                    g.gl.disable(2884);
                    break;
                case 0:
                    g.gl.enable(2884);
                    g.gl.cullFace(1028);
                    break;
                case 1:
                    g.gl.enable(2884), g.gl.cullFace(1029)
            }
        },
        setPipeline: function(a) {
            this.setCullMode(a.cullMode);
            this.setDepthMode(a.depthWrite, a.depthMode);
            this.setStencilParameters(a.stencilMode, a.stencilBothPass, a.stencilDepthFail, a.stencilFail, a.stencilReferenceValue, a.stencilReadMask, a.stencilWriteMask);
            this.setBlendingMode(a.blendSource, a.blendDestination);
            a.set()
        },
        setBool: function(a, b) {
            g.gl.uniform1i(G.__cast(a, Oa).value, b ? 1 : 0)
        },
        setInt: function(a, b) {
            g.gl.uniform1i(G.__cast(a, Oa).value, b)
        },
        setFloat: function(a, b) {
            g.gl.uniform1f(G.__cast(a, Oa).value, b)
        },
        setFloat2: function(a, b, c) {
            g.gl.uniform2f(G.__cast(a, Oa).value, b, c)
        },
        setFloat3: function(a, b, c, d) {
            g.gl.uniform3f(G.__cast(a, Oa).value, b, c, d)
        },
        setFloat4: function(a, b, c, d, e) {
            g.gl.uniform4f(G.__cast(a, Oa).value, b, c, d, e)
        },
        setFloats: function(a, b) {
            g.gl.uniform1fv(G.__cast(a, Oa).value, b)
        },
        setVector2: function(a, b) {
            g.gl.uniform2f(G.__cast(a, Oa).value, b.x, b.y)
        },
        setVector3: function(a, b) {
            g.gl.uniform3f(G.__cast(a, Oa).value, b.x, b.y, b.z)
        },
        setVector4: function(a, b) {
            g.gl.uniform4f(G.__cast(a, Oa).value, b.x, b.y, b.z, b.w)
        },
        matrixCache: null,
        setMatrix: function(a, b) {
            this.matrixCache[0] = b._00;
            this.matrixCache[1] = b._01;
            this.matrixCache[2] = b._02;
            this.matrixCache[3] = b._03;
            this.matrixCache[4] = b._10;
            this.matrixCache[5] = b._11;
            this.matrixCache[6] = b._12;
            this.matrixCache[7] = b._13;
            this.matrixCache[8] = b._20;
            this.matrixCache[9] = b._21;
            this.matrixCache[10] = b._22;
            this.matrixCache[11] = b._23;
            this.matrixCache[12] = b._30;
            this.matrixCache[13] = b._31;
            this.matrixCache[14] = b._32;
            this.matrixCache[15] = b._33;
            g.gl.uniformMatrix4fv(G.__cast(a, Oa).value, !1, this.matrixCache)
        },
        drawIndexedVertices: function(a, b) {
            null == b && (b = -1);
            null == a && (a = 0);
            g.gl.drawElements(4, -1 == b ? this.indicesCount : b, 5123, 2 * a)
        },
        convertStencilAction: function(a) {
            switch (a[1]) {
                case 5:
                    return 7683;
                case 6:
                    return 34056;
                case 3:
                    return 7682;
                case 4:
                    return 34055;
                case 7:
                    return 5386;
                case 0:
                    return 7680;
                case 2:
                    return 7681;
                case 1:
                    return 0
            }
        },
        setStencilParameters: function(a, b, c, d, e, f, h) {
            null == h && (h = 255);
            null == f && (f = 255);
            if (a == ea.Always && b == aa.Keep && c == aa.Keep && d == aa.Keep) g.gl.disable(2960);
            else {
                g.gl.enable(2960);
                var l = 0;
                switch (a[1]) {
                    case 0:
                        l = 519;
                        break;
                    case 2:
                        l = 514;
                        break;
                    case 6:
                        l = 516;
                        break;
                    case 7:
                        l = 518;
                        break;
                    case 4:
                        l = 513;
                        break;
                    case 5:
                        l = 515;
                        break;
                    case 1:
                        l = 512;
                        break;
                    case 3:
                        l = 517
                }
                g.gl.stencilMask(h);
                g.gl.stencilOp(this.convertStencilAction(d), this.convertStencilAction(c), this.convertStencilAction(b));
                g.gl.stencilFunc(l, e, f)
            }
        },
        scissor: function(a, b, c, d) {
            g.gl.enable(3089);
            var e;
            e = null == this.renderTarget ? F.get_pixelHeight() : this.renderTarget.get_height();
            g.gl.scissor(a, e - b - d, c, d)
        },
        disableScissor: function() {
            g.gl.disable(3089)
        },
        renderTargetsInvertedY: function() {
            return !0
        },
        drawIndexedVerticesInstanced: function(a, b, c) {
            null == c && (c = -1);
            null == b && (b = 0);
            this.instancedRenderingAvailable() && this.instancedExtension.drawElementsInstancedANGLE(4, -1 == c ? this.indicesCount : c, 5123, 2 * b, a)
        },
        instancedRenderingAvailable: function() {
            return this.instancedExtension
        },
        __class__: oc
    };
    var pc = function(a) {
        nb.call(this, a)
    };
    m["kha.js.graphics4.Graphics2"] = pc;
    pc.__name__ = ["kha", "js", "graphics4", "Graphics2"];
    pc.__super__ = nb;
    pc.prototype = T(nb.prototype, {
        drawVideoInternal: function(a, b, c, d, e) {
            a = G.__cast(a, kb);
            this.drawScaledSubImage(a.texture, 0, 0, a.texture.get_width(), a.texture.get_height(), b, c, d, e)
        },
        begin: function(a, b) {
            null == a && (a = !0);
            g.gl.colorMask(!0, !0, !0, !0);
            g.gl.disable(2929);
            g.gl.depthFunc(519);
            nb.prototype.begin.call(this, a, b)
        },
        __class__: pc
    });
    var tb = function(a) {
        this.value = a
    };
    m["kha.js.graphics4.TextureUnit"] = tb;
    tb.__name__ = ["kha", "js", "graphics4", "TextureUnit"];
    tb.__interfaces__ = [ce];
    tb.prototype = {
        value: null,
        __class__: tb
    };
    var pa = function(a, b, c, d, e, f, h, g, k) {
        this._00 = a;
        this._10 = b;
        this._20 = c;
        this._01 = d;
        this._11 = e;
        this._21 = f;
        this._02 = h;
        this._12 = g;
        this._22 = k
    };
    m["kha.math.FastMatrix3"] = pa;
    pa.__name__ = ["kha", "math", "FastMatrix3"];
    pa.fromMatrix3 = function(a) {
        return new pa(a._00, a._10, a._20, a._01, a._11, a._21, a._02, a._12, a._22)
    };
    pa.prototype = {
        _00: null,
        _10: null,
        _20: null,
        _01: null,
        _11: null,
        _21: null,
        _02: null,
        _12: null,
        _22: null,
        __class__: pa
    };
    var Na = function(a, b, c, d, e, f, h, g, k, l, m, q, p, r, t, u) {
        this._00 = a;
        this._10 = b;
        this._20 = c;
        this._30 = d;
        this._01 = e;
        this._11 = f;
        this._21 = h;
        this._31 = g;
        this._02 = k;
        this._12 = l;
        this._22 = m;
        this._32 = q;
        this._03 = p;
        this._13 = r;
        this._23 = t;
        this._33 = u
    };
    m["kha.math.FastMatrix4"] = Na;
    Na.__name__ = ["kha", "math", "FastMatrix4"];
    Na.fromMatrix4 = function(a) {
        return new Na(a._00, a._10, a._20, a._30, a._01, a._11, a._21, a._31, a._02, a._12, a._22, a._32, a._03, a._13, a._23, a._33)
    };
    Na.orthogonalProjection = function(a, b, c, d, e, f) {
        return new Na(2 / (b - a), 0, 0, -(b + a) / (b - a), 0, 2 / (d - c), 0, -(d + c) / (d - c), 0, 0, -2 / (f - e), -(f + e) / (f - e), 0, 0, 0, 1)
    };
    Na.perspectiveProjection = function(a, b, c, d) {
        a = 1 / Math.tan(a / 2 * (Math.PI / 180));
        return new Na(a / b, 0, 0, 0, 0, a, 0, 0, 0, 0, (d + c) / (c - d), 2 * d * c / (c - d), 0, 0, -1, 0)
    };
    Na.lookAt = function(a, b, c) {
        b = new cc(b.x - a.x, b.y - a.y, b.z - a.z);
        b.set_length(1);
        c = new cc(b.y * c.z - b.z * c.y, b.z * c.x - b.x * c.z, b.x * c.y - b.y * c.x);
        c.set_length(1);
        var d = c.y * b.z - c.z * b.y,
            e = c.z * b.x - c.x * b.z,
            f = c.x * b.y - c.y * b.x;
        return new Na(c.x, c.y, c.z, -(c.x * a.x + c.y * a.y + c.z * a.z), d, e, f, -(d * a.x + e * a.y + f * a.z), -b.x, -b.y, -b.z, b.x * a.x + b.y * a.y + b.z * a.z, 0, 0, 0, 1)
    };
    Na.prototype = {
        _00: null,
        _10: null,
        _20: null,
        _30: null,
        _01: null,
        _11: null,
        _21: null,
        _31: null,
        _02: null,
        _12: null,
        _22: null,
        _32: null,
        _03: null,
        _13: null,
        _23: null,
        _33: null,
        __class__: Na
    };
    var ca = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b
    };
    m["kha.math.FastVector2"] = ca;
    ca.__name__ = ["kha", "math", "FastVector2"];
    ca.fromVector2 = function(a) {
        return new ca(a.x, a.y)
    };
    ca.prototype = {
        x: null,
        y: null,
        get_length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        set_length: function(a) {
            var b = this.get_length();
            if (0 == b) return 0;
            b = a / b;
            this.x *= b;
            this.y *= b;
            return a
        },
        __class__: ca,
        __properties__: {
            set_length: "set_length",
            get_length: "get_length"
        }
    };
    var cc = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b;
        this.z = c
    };
    m["kha.math.FastVector3"] = cc;
    cc.__name__ = ["kha", "math", "FastVector3"];
    cc.fromVector3 = function(a) {
        return new cc(a.x, a.y, a.z)
    };
    cc.prototype = {
        x: null,
        y: null,
        z: null,
        get_length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        },
        set_length: function(a) {
            var b = this.get_length();
            if (0 == b) return 0;
            b = a / b;
            this.x *= b;
            this.y *= b;
            this.z *= b;
            return a
        },
        __class__: cc,
        __properties__: {
            set_length: "set_length",
            get_length: "get_length"
        }
    };
    var cd = function(a, b, c, d) {
        null == d && (d = 1);
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d
    };
    m["kha.math.FastVector4"] = cd;
    cd.__name__ = ["kha", "math", "FastVector4"];
    cd.fromVector4 = function(a) {
        return new cd(a.x, a.y, a.z, a.w)
    };
    cd.prototype = {
        x: null,
        y: null,
        z: null,
        w: null,
        get_length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
        },
        set_length: function(a) {
            var b = this.get_length();
            if (0 == b) return 0;
            b = a / b;
            this.x *= b;
            this.y *= b;
            this.z *= b;
            this.w *= b;
            return a
        },
        __class__: cd,
        __properties__: {
            set_length: "set_length",
            get_length: "get_length"
        }
    };
    var dd = function(a, b, c, d, e, f, g, l, k) {
        this._00 = a;
        this._10 = b;
        this._20 = c;
        this._01 = d;
        this._11 = e;
        this._21 = f;
        this._02 = g;
        this._12 = l;
        this._22 = k
    };
    m["kha.math.Matrix3"] = dd;
    dd.__name__ = ["kha", "math", "Matrix3"];
    dd.prototype = {
        _00: null,
        _10: null,
        _20: null,
        _01: null,
        _11: null,
        _21: null,
        _02: null,
        _12: null,
        _22: null,
        __class__: dd
    };
    var ob = function(a, b, c, d, e, f, g, l, k, m, p, q, r, t, u, w) {
        this._00 = a;
        this._10 = b;
        this._20 = c;
        this._30 = d;
        this._01 = e;
        this._11 = f;
        this._21 = g;
        this._31 = l;
        this._02 = k;
        this._12 = m;
        this._22 = p;
        this._32 = q;
        this._03 = r;
        this._13 = t;
        this._23 = u;
        this._33 = w
    };
    m["kha.math.Matrix4"] = ob;
    ob.__name__ = ["kha", "math", "Matrix4"];
    ob.orthogonalProjection = function(a, b, c, d, e, f) {
        return new ob(2 / (b - a), 0, 0, -(b + a) / (b - a), 0, 2 / (d - c), 0, -(d + c) / (d - c), 0, 0, -2 / (f - e), -(f + e) / (f - e), 0, 0, 0, 1)
    };
    ob.perspectiveProjection = function(a, b, c, d) {
        a = 1 / Math.tan(a / 2 * (Math.PI / 180));
        return new ob(a / b, 0, 0, 0, 0, a, 0, 0, 0, 0, (d + c) / (c - d), 2 * d * c / (c - d), 0, 0, -1, 0)
    };
    ob.lookAt = function(a, b, c) {
        b = new ed(b.x - a.x, b.y - a.y, b.z - a.z);
        b.set_length(1);
        c = new ed(b.y * c.z - b.z * c.y, b.z * c.x - b.x * c.z, b.x * c.y - b.y * c.x);
        c.set_length(1);
        var d = c.y * b.z - c.z * b.y,
            e = c.z * b.x - c.x * b.z,
            f = c.x * b.y - c.y * b.x;
        return new ob(c.x, c.y, c.z, -(c.x * a.x + c.y * a.y + c.z * a.z), d, e, f, -(d * a.x + e * a.y + f * a.z), -b.x, -b.y, -b.z, b.x * a.x + b.y * a.y + b.z * a.z, 0, 0, 0, 1)
    };
    ob.prototype = {
        _00: null,
        _10: null,
        _20: null,
        _30: null,
        _01: null,
        _11: null,
        _21: null,
        _31: null,
        _02: null,
        _12: null,
        _22: null,
        _32: null,
        _03: null,
        _13: null,
        _23: null,
        _33: null,
        __class__: ob
    };
    var Pa = function(a) {
        this.index = 0;
        this.MT = [];
        this.MT[623] = 0;
        this.MT[0] = a;
        for (a = 1; 624 > a;) {
            var b = a++;
            this.MT[b] = 1812433253 * (this.MT[b - 1] ^ this.MT[b - 1] >> 30) + b
        }
    };
    m["kha.math.Random"] = Pa;
    Pa.__name__ = ["kha", "math", "Random"];
    Pa.init = function(a) {
        Pa.Default = new Pa(a)
    };
    Pa.get = function() {
        return Pa.Default.Get()
    };
    Pa.getFloat = function() {
        return Pa.Default.GetFloat()
    };
    Pa.getUpTo = function(a) {
        return Pa.Default.GetUpTo(a)
    };
    Pa.getIn = function(a, b) {
        return Pa.Default.GetIn(a, b)
    };
    Pa.getFloatIn = function(a, b) {
        return a + Pa.Default.GetFloat() * (b - a)
    };
    Pa.prototype = {
        Get: function() {
            0 == this.index && this.GenerateNumbers();
            var a = this.MT[this.index],
                a = a ^ a >> 11,
                a = a ^ a << 7 & -1658038656,
                a = a ^ a << 15 & -272236544;
            this.index = (this.index + 1) % 624;
            return a ^ a >> 18
        },
        GetFloat: function() {
            return this.Get() / 2147483646
        },
        GetUpTo: function(a) {
            return this.Get() % (a + 1)
        },
        GetIn: function(a, b) {
            return this.Get() % (b + 1 - a) + a
        },
        GetFloatIn: function(a, b) {
            return a + this.GetFloat() * (b - a)
        },
        MT: null,
        index: null,
        GenerateNumbers: function() {
            for (var a = 0; 624 > a;) {
                var b = a++,
                    c = (this.MT[b] & 1) + this.MT[(b + 1) % 624] & 2147483647;
                this.MT[b] = this.MT[(b + 397) % 624] ^ c >> 1;
                0 != c % 2 && (this.MT[b] ^= -1727483681)
            }
        },
        __class__: Pa
    };
    var Wd = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b
    };
    m["kha.math.Vector2"] = Wd;
    Wd.__name__ = ["kha", "math", "Vector2"];
    Wd.prototype = {
        x: null,
        y: null,
        get_length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        set_length: function(a) {
            var b = this.get_length();
            if (0 == b) return 0;
            b = a / b;
            this.x *= b;
            this.y *= b;
            return a
        },
        __class__: Wd,
        __properties__: {
            set_length: "set_length",
            get_length: "get_length"
        }
    };
    var ed = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b;
        this.z = c
    };
    m["kha.math.Vector3"] = ed;
    ed.__name__ = ["kha", "math", "Vector3"];
    ed.prototype = {
        x: null,
        y: null,
        z: null,
        get_length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        },
        set_length: function(a) {
            var b = this.get_length();
            if (0 == b) return 0;
            b = a / b;
            this.x *= b;
            this.y *= b;
            this.z *= b;
            return a
        },
        __class__: ed,
        __properties__: {
            set_length: "set_length",
            get_length: "get_length"
        }
    };
    var Xd = function(a, b, c, d) {
        null == d && (d = 1);
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d
    };
    m["kha.math.Vector4"] = Xd;
    Xd.__name__ = ["kha", "math", "Vector4"];
    Xd.prototype = {
        x: null,
        y: null,
        z: null,
        w: null,
        get_length: function() {
            return Math.sqrt(this.x * this.x +
                this.y * this.y + this.z * this.z + this.w * this.w)
        },
        set_length: function(a) {
            var b = this.get_length();
            if (0 == b) return 0;
            b = a / b;
            this.x *= b;
            this.y *= b;
            this.z *= b;
            this.w *= b;
            return a
        },
        __class__: Xd,
        __properties__: {
            set_length: "set_length",
            get_length: "get_length"
        }
    };
    var Kd = function() {};
    m["kha.network.Client"] = Kd;
    Kd.__name__ = ["kha", "network", "Client"];
    Kd.prototype = {
        get_id: null,
        id: null,
        send: null,
        receive: null,
        onClose: null,
        __class__: Kd,
        __properties__: {
            get_id: "get_id"
        }
    };
    var Vd = function() {};
    m["kha.network.ControllerBuilder"] = Vd;
    Vd.__name__ = ["kha", "network", "ControllerBuilder"];
    var Yd = function() {};
    m["kha.network.Entity"] = Yd;
    Yd.__name__ = ["kha", "network", "Entity"];
    Yd.prototype = {
        _id: null,
        _size: null,
        _send: null,
        _receive: null,
        __class__: Yd
    };
    var fd = function(a) {
        this.myId = a
    };
    m["kha.network.LocalClient"] = fd;
    fd.__name__ = ["kha", "network", "LocalClient"];
    fd.__interfaces__ = [Kd];
    fd.prototype = {
        myId: null,
        send: function(a, b) {},
        receive: function(a) {},
        onClose: function(a) {},
        controllers: null,
        get_controllers: function() {
            return null
        },
        id: null,
        get_id: function() {
            return this.myId
        },
        __class__: fd,
        __properties__: {
            get_id: "get_id",
            get_controllers: "get_controllers"
        }
    };
    var Ld = function(a, b) {
        this.socket = new WebSocket("ws://" + a + ":" + b);
        this.socket.binaryType = "arraybuffer"
    };
    m["kha.network.Network"] = Ld;
    Ld.__name__ = ["kha", "network", "Network"];
    Ld.prototype = {
        socket: null,
        send: function(a, b) {
            this.socket.send(a.b.bufferValue)
        },
        listen: function(a) {
            this.socket.onmessage = function(b) {
                a(da.ofData(b.data))
            }
        },
        __class__: Ld
    };
    var Zd = function(a, b) {
        this.time = a;
        this.data = b
    };
    m["kha.network.State"] = Zd;
    Zd.__name__ = ["kha", "network", "State"];
    Zd.prototype = {
        time: null,
        data: null,
        __class__: Zd
    };
    var Ba = function(a) {
        this.controllers = new Fa;
        this.entities = new Fa;
        Ba.instance = this;
        this.players = a
    };
    m["kha.network.Session"] = Ba;
    Ba.__name__ = ["kha", "network", "Session"];
    Ba.the = function() {
        return Ba.instance
    };
    Ba.prototype = {
        entities: null,
        controllers: null,
        players: null,
        startCallback: null,
        localClient: null,
        network: null,
        me: null,
        get_me: function() {
            return this.localClient
        },
        addEntity: function(a) {
            var b = a._id();
            this.entities.h[b] = a
        },
        addController: function(a) {
            R.trace("Adding controller id " +
                a._id(), {
                    fileName: "Session.hx",
                    lineNumber: 71,
                    className: "kha.network.Session",
                    methodName: "addController"
                });
            var b = a._id();
            this.controllers.h[b] = a
        },
        receive: function(a, b) {
            switch (a.b[0]) {
                case 0:
                    this.localClient = new fd(a.b[1]);
                    r.resetTime();
                    this.startCallback();
                    break;
                case 1:
                    for (var c = a.getDouble(1), d = 9, e = this.entities.iterator(); e.hasNext();) {
                        var f = e.next();
                        f._receive(d, a);
                        d += f._size()
                    }
                    r.back(c);
                    break;
                case 3:
                    for (var c = [], d = 1, f = a.getUInt16(d), d = d + 2, e = "", g = 0; g < f;) g++, e += String.fromCharCode(a.b[d]), ++d;
                    for (var g = a.getUInt16(d), d = d + 2, f = "", l = 0; l < g;) l++, f += String.fromCharCode(a.b[d]), ++d;
                    for (; d < a.length;) switch (g = a.b[d], ++d, g) {
                        case 66:
                            g = 1 == a.b[d];
                            ++d;
                            R.trace("Bool: " + (null == g ? "null" : "" + g), {
                                fileName: "Session.hx",
                                lineNumber: 182,
                                className: "kha.network.Session",
                                methodName: "receive"
                            });
                            c.push(g);
                            break;
                        case 70:
                            g = a.getDouble(d);
                            d += 8;
                            R.trace("Float: " + g, {
                                fileName: "Session.hx",
                                lineNumber: 187,
                                className: "kha.network.Session",
                                methodName: "receive"
                            });
                            c.push(g);
                            break;
                        case 73:
                            g = a.getInt32(d);
                            d += 4;
                            R.trace("Int: " + g, {
                                fileName: "Session.hx",
                                lineNumber: 192,
                                className: "kha.network.Session",
                                methodName: "receive"
                            });
                            c.push(g);
                            break;
                        case 83:
                            for (var g = a.getUInt16(d), d = d + 2, l = "", k = 0; k < g;) k++, l += String.fromCharCode(a.b[d]), ++d;
                            R.trace("String: " + l, {
                                fileName: "Session.hx",
                                lineNumber: 202,
                                className: "kha.network.Session",
                                methodName: "receive"
                            });
                            c.push(l);
                            break;
                        default:
                            R.trace("Unknown argument type.", {
                                fileName: "Session.hx",
                                lineNumber: 205,
                                className: "kha.network.Session",
                                methodName: "receive"
                            })
                    }
                    Q.callMethod(null, Q.field(V.resolveClass(e), f + "_remotely"), c)
            }
        },
        waitForStart: function(a) {
            var b = this;
            this.startCallback = a;
            this.network = new Ld("localhost", 6789);
            this.network.listen(function(a) {
                b.receive(a)
            })
        },
        update: function() {},
        __class__: Ba,
        __properties__: {
            get_me: "get_me"
        }
    };
    var ja = function(a, b, c, d) {
        this._0 = a;
        this._1 = b;
        this._2 = c;
        this._3 = d
    };
    m["kha.simd.Float32x4"] = ja;
    ja.__name__ = ["kha", "simd", "Float32x4"];
    ja.create = function() {
        return new ja(0, 0, 0, 0)
    };
    ja.loadAllFast = function(a) {
        return new ja(a, a, a, a)
    };
    ja.load = function(a, b, c, d) {
        return new ja(a, b, c, d)
    };
    ja.loadFast = function(a, b, c, d) {
        return new ja(a, b, c, d)
    };
    ja.get = function(a, b) {
        var c = 0;
        switch (b) {
            case 0:
                c = a._0;
                break;
            case 1:
                c = a._1;
                break;
            case 2:
                c = a._2;
                break;
            case 3:
                c = a._3
        }
        return c
    };
    ja.getFast = function(a, b) {
        switch (b) {
            case 0:
                return a._0;
            case 1:
                return a._1;
            case 2:
                return a._2;
            case 3:
                return a._3
        }
        return 0
    };
    ja.abs = function(a) {
        return new ja(Math.abs(a._0), Math.abs(a._1), Math.abs(a._2), Math.abs(a._3))
    };
    ja.add = function(a, b) {
        return new ja(a._0 + b._0, a._1 + b._1, a._2 + b._2, a._3 + b._3)
    };
    ja.div = function(a, b) {
        return new ja(a._0 / b._0, a._1 / b._1, a._2 / b._2, a._3 / b._3)
    };
    ja.mul = function(a, b) {
        return new ja(a._0 * b._0, a._1 * b._1, a._2 * b._2, a._3 * b._3)
    };
    ja.neg = function(a) {
        return new ja(-a._0, -a._1, -a._2, -a._3)
    };
    ja.reciprocalApproximation = function(a) {
        return new ja(0, 0, 0, 0)
    };
    ja.reciprocalSqrtApproximation = function(a) {
        return new ja(0, 0, 0, 0)
    };
    ja.sub = function(a, b) {
        return new ja(a._0 - b._0, a._1 - b._1, a._2 - b._2, a._3 - b._3)
    };
    ja.sqrt = function(a) {
        return new ja(Math.sqrt(a._0), Math.sqrt(a._1), Math.sqrt(a._2), Math.sqrt(a._3))
    };
    ja.prototype = {
        _0: null,
        _1: null,
        _2: null,
        _3: null,
        __class__: ja
    };
    var Ib = function() {};
    Ib.init = function() {};
    Ib.createBanner = function(a, b, c, d) {};
    Ib.toggleBanner = function(a, b) {};
    Ib.createInterstitial = function(a, b) {};
    var Sa = function() {};
    Sa.init = function(a) {};
    Sa.changeActivity = function() {};
    Sa.setDebugMode = function(a) {};
    Sa.setTestMode = function(a) {};
    Sa.setZone = function(a) {};
    Sa.canShow = function() {
        return !1
    };
    Sa.show = function() {};
    Sa.setCallbacks = function(a, b, c, d, e, f) {};
    var p = function(a, b, c) {
        null == c && (c = 0);
        p.oriWidth = a;
        p.oriHeight = b;
        this.setupHtml();
        p.IS_MOBILE ? this.setupScreen(a, b, c) : this.setupScreen(a, b, 0);
        this.backbuffer = va.createRenderTarget(p.gameWidth, p.gameHeight);
        this.g = this.backbuffer.get_g2();
        p.currTime = r.time();
        r.addTimeTask(function() {
            p.refreshGameScale()
        }, 1)
    };
    m["wyn.Wyngine"] = p;
    p.__name__ = ["wyn", "Wyngine"];
    p.refreshGameScale = function() {
        p.screenOffsetX = 0;
        p.screenOffsetY = 0;
        var a = F.get_pixelWidth(),
            b = F.get_pixelHeight(),
            c = a / p.gameWidth,
            d = b / p.gameHeight;
        p.gameScale = Math.min(c, d);
        c > d ? p.screenOffsetX = Math.floor((a / p.gameScale - p.gameWidth) / 2) : p.screenOffsetY = Math.floor((b / p.gameScale - p.gameHeight) / 2)
    };
    p.addScreen = function(a) {
        -1 == v.indexOf(p.screens, a, 0) && p.screensToAdd.push(a)
    };
    p.removeScreen = function(a) {
        -1 != v.indexOf(p.screens, a, 0) && a.close()
    };
    p.addManager = function(a) {
        p.managers.push(a)
    };
    p.prototype = {
        backbuffer: null,
        g: null,
        setupHtml: function() {
            window.addEventListener("touchstart", function(a) {
                a.preventDefault()
            });
            window.addEventListener("resize", function() {
                r.addTimeTask(function() {
                    p.refreshGameScale();
                    if (null != p.onResize) p.onResize()
                }, .1)
            });
            window.console.log("%cMade with %c wyngine %c\nPowered by %c kha ", "background:#ffffff;color:#000000", "background:#ff69b4;color:#ffffff", "background:#ffffff;color:#000000", "background:#2073d0;color:#fdff00");
            p.IS_MOBILE = function(a) {
                return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge|maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm(os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) ? !0 : !1
            }(navigator.userAgent || navigator.vendor || window.opera)
        },
        setupScreen: function(a, b, c) {
            if (0 != c) {
                var d = window.innerWidth,
                    e = window.innerHeight;
                1 == c ? b = Math.floor(a / d * e) : 2 == c && (a = Math.floor(b / e * d))
            }
            p.gameWidth = a;
            p.gameHeight = b
        },
        update: function() {
            p.prevTime = p.currTime;
            p.currTime = r.time();
            if (p.active) {
                for (p.dt = p.currTime - p.prevTime; 0 < p.screensToAdd.length;) {
                    var a = p.screensToAdd.shift();
                    a.open();
                    p.screens.push(a)
                }
                for (a = 0; a < p.screens.length;) p.currScreen = p.screens[a], p.currScreen.alive ? a < p.screensLen -
                    1 ? p.currScreen.persistentUpdate && p.currScreen.update() : p.currScreen.update() : (v.remove(p.screens, p.currScreen), a--), a++;
                for (var a = 0, b = p.managers; a < b.length;) {
                    var c = b[a];
                    ++a;
                    c.active && c.update()
                }
            }
        },
        render: function(a) {
            if (p.visible) {
                this.g.begin(!0, p.bgColor);
                this.g.set_imageScaleQuality(p.imageQuality);
                p.screensLen = p.screens.length;
                for (var b = 0, c = p.screensLen; b < c;) {
                    var d = b++;
                    p.currScreen = p.screens[d];
                    d < p.screensLen - 1 ? p.currScreen.persistentRender && p.currScreen.render(this.g) : p.currScreen.render(this.g)
                }
                this.g.end();
                a.get_g2().begin(!0, p.frameBgColor);
                a.get_g2().set_imageScaleQuality(p.imageQuality);
                Ta.scale(this.backbuffer, a, F.get_screenRotation());
                a.get_g2().end()
            }
        },
        __class__: p
    };
    var Ra = m["wyn.component.HAlign"] = {
        __ename__: ["wyn", "component", "HAlign"],
        __constructs__: ["LEFT", "MIDDLE", "RIGHT"]
    };
    Ra.LEFT = ["LEFT", 0];
    Ra.LEFT.toString = x;
    Ra.LEFT.__enum__ = Ra;
    Ra.MIDDLE = ["MIDDLE", 1];
    Ra.MIDDLE.toString = x;
    Ra.MIDDLE.__enum__ = Ra;
    Ra.RIGHT = ["RIGHT", 2];
    Ra.RIGHT.toString = x;
    Ra.RIGHT.__enum__ = Ra;
    var Qa = m["wyn.component.VAlign"] = {
        __ename__: ["wyn", "component", "VAlign"],
        __constructs__: ["TOP", "CENTER", "BOTTOM"]
    };
    Qa.TOP = ["TOP", 0];
    Qa.TOP.toString = x;
    Qa.TOP.__enum__ = Qa;
    Qa.CENTER = ["CENTER", 1];
    Qa.CENTER.toString = x;
    Qa.CENTER.__enum__ = Qa;
    Qa.BOTTOM = ["BOTTOM", 2];
    Qa.BOTTOM.toString = x;
    Qa.BOTTOM.__enum__ = Qa;
    var Ia = function() {
        this.enabled = this.active = this.visible = !0;
        this.tag = ""
    };
    m["wyn.component.WynComponent"] = Ia;
    Ia.__name__ = ["wyn", "component", "WynComponent"];
    Ia.prototype = {
        tag: null,
        parent: null,
        enabled: null,
        active: null,
        visible: null,
        init: function() {},
        update: function() {},
        destroy: function() {
            this.tag = "";
            this.parent = null
        },
        set_enabled: function(a) {
            return this.enabled = a
        },
        set_active: function(a) {
            return this.active = a
        },
        set_visible: function(a) {
            return this.visible = a
        },
        __class__: Ia,
        __properties__: {
            set_visible: "set_visible",
            set_active: "set_active",
            set_enabled: "set_enabled"
        }
    };
    var Jc = function() {
        this.elapsed = 0;
        this.loop = !1;
        this.currAnimationMaxIndex = this.currIndex = 0;
        this.currAnimationName = "";
        this.currAnimationArr = [];
        this.speed = this.fps = 1;
        this.playing = !1;
        Ia.call(this);
        this.animations = new Ja
    };
    m["wyn.component.WynAnimator"] = Jc;
    Jc.__name__ = ["wyn", "component", "WynAnimator"];
    Jc.__super__ = Ia;
    Jc.prototype = T(Ia.prototype, {
        sprite: null,
        playing: null,
        speed: null,
        animations: null,
        fps: null,
        currAnimationArr: null,
        currAnimationName: null,
        currAnimationMaxIndex: null,
        currIndex: null,
        loop: null,
        elapsed: null,
        update: function() {
            Ia.prototype.update.call(this);
            this.playing && (this.elapsed += p.dt * Math.abs(this.speed), this.elapsed >= 1 / this.fps && (this.elapsed -= 1 / this.fps, this.currIndex = 0 <= this.speed ? this.currIndex + 1 : this.currIndex + -1, this.currIndex >= this.currAnimationMaxIndex && (this.currIndex = 0), 0 > this.currIndex && (this.currIndex = this.currAnimationMaxIndex - 1)), null != this.sprite && (this.sprite.region = this.currAnimationArr[this.currIndex]))
        },
        destroy: function() {
            Ia.prototype.destroy.call(this);
            this.animations = this.sprite = null;
            this.currAnimationArr = []
        },
        addAnimation: function(a, b, c) {
            null == c && (c = 12);
            this.animations.exists(a) && R.trace("animation " + a + " already exists, overwriting...", {
                fileName: "WynAnimator.hx",
                lineNumber: 77,
                className: "wyn.component.WynAnimator",
                methodName: "addAnimation"
            });
            this.animations.set(a, {
                name: a,
                regions: b,
                fps: c
            })
        },
        removeAnimation: function(a) {
            this.animations.remove(a)
        },
        playAnimation: function(a, b, c) {
            null == c && (c = !0);
            null == b && (b = !0);
            this.animations.exists(a) ? (a = this.animations.get(a), this.fps = a.fps, this.currAnimationArr = a.regions, this.currAnimationName = a.name, this.currAnimationMaxIndex = this.currAnimationArr.length, c && (this.elapsed = this.currIndex = 0), this.loop = b, this.playing = !0) : R.trace("animation " +
                a + " does not exist", {
                    fileName: "WynAnimator.hx",
                    lineNumber: 95,
                    className: "wyn.component.WynAnimator",
                    methodName: "playAnimation"
                })
        },
        pauseAnimation: function() {
            this.playing = !1
        },
        stopAnimation: function() {
            this.playing = !1;
            this.elapsed = this.currIndex = 0
        },
        __class__: Jc
    });
    var wa = function(a, b) {
        this.offsetX = this.offsetY = 0;
        this.scale = 1;
        this.angle = 0;
        this.alpha = 1;
        this.width = this.height = 0;
        Ia.call(this);
        this.width = a;
        this.height = b
    };
    m["wyn.component.WynRenderable"] = wa;
    wa.__name__ = ["wyn", "component", "WynRenderable"];
    wa.__super__ = Ia;
    wa.prototype = T(Ia.prototype, {
        image: null,
        region: null,
        width: null,
        height: null,
        alpha: null,
        angle: null,
        scale: null,
        offsetX: null,
        offsetY: null,
        init: function() {
            this.parent.addRenderer(M(this, this.render))
        },
        destroy: function() {
            Ia.prototype.destroy.call(this);
            v.remove(this.parent.renderers, M(this, this.render));
            this.region = this.image = null
        },
        render: function(a) {},
        setImage: function(a, b) {
            this.image = a;
            this.region = b
        },
        setOffset: function(a, b) {
            this.offsetX = a;
            this.offsetY = b
        },
        setSize: function(a, b) {
            this.width = a;
            this.height = b
        },
        __class__: wa
    });
    var qa = function(a, b, c, d, e) {
        this.color = -1;
        this.trimEnds = this.trimAll = !0;
        this.valign = Qa.TOP;
        this.halign = Ra.LEFT;
        this.text = this.prevText = "";
        wa.call(this, c, d);
        this._cursor = new ca;
        this._lines = [];
        null != qa.fontCache && qa.fontCache.exists(b) ? (this.text = a, this.font = qa.fontCache.get(b), null != e && (null != e.color && (this.color = e.color), null != e.halign && (this.halign = e.halign), null != e.valign && (this.valign = e.valign))) : R.trace('Failed to init WynBitmapText with "' + b + '"', {
            fileName: "WynBitmapText.hx",
            lineNumber: 120,
            className: "wyn.component.WynBitmapText",
            methodName: "new"
        })
    };
    m["wyn.component.WynBitmapText"] = qa;
    qa.__name__ = ["wyn", "component", "WynBitmapText"];
    qa.loadFont = function(a, b, c) {
        var d = new Fa;
        c = H.parse(c.toString()).firstElement();
        c = new Vb(c);
        for (var e = 8, f = c.node.resolve("chars").nodes.resolve("char").iterator(); null != f.head;) {
            var g;
            f.val = f.head[0];
            f.head = f.head[1];
            g = f.val;
            g = {
                id: E.parseInt(g.att.resolve("id")),
                x: E.parseInt(g.att.resolve("x")),
                y: E.parseInt(g.att.resolve("y")),
                width: E.parseInt(g.att.resolve("width")),
                height: E.parseInt(g.att.resolve("height")),
                xoffset: E.parseInt(g.att.resolve("xoffset")),
                yoffset: E.parseInt(g.att.resolve("yoffset")),
                xadvance: E.parseInt(g.att.resolve("xadvance")),
                kernings: new Fa
            };
            g.id == qa.spaceCharCode && (e = g.xadvance);
            d.h[g.id] = g
        }
        if (c.hasNode.resolve("kernings"))
            for (var l, f = c.node.resolve("kernings").nodes.resolve("kerning").iterator(); null != f.head;) {
                var k;
                f.val = f.head[0];
                f.head = f.head[1];
                k = f.val;
                l = E.parseInt(k.att.resolve("first"));
                g = E.parseInt(k.att.resolve("second"));
                k = E.parseInt(k.att.resolve("amount"));
                l = d.h[l];
                l.kernings.h[g] = k
            }
        null == qa.fontCache && (qa.fontCache = new Ja);
        b = {
            size: E.parseInt(c.node.resolve("info").att.resolve("size")),
            outline: E.parseInt(c.node.resolve("info").att.resolve("outline")),
            lineHeight: E.parseInt(c.node.resolve("common").att.resolve("lineHeight")),
            spaceWidth: e,
            image: b,
            letters: d
        };
        qa.fontCache.set(a, b)
    };
    qa.__super__ = wa;
    qa.prototype = T(wa.prototype, {
        text: null,
        prevText: null,
        _cursor: null,
        _lines: null,
        font: null,
        halign: null,
        valign: null,
        trimEnds: null,
        trimAll: null,
        color: null,
        update: function() {
            if (this.active && this.text != this.prevText) {
                this._lines = [];
                var a = new Fb("^ +| +$", "g"),
                    b = new Fb(" +", "g"),
                    c = this.text;
                this.trimAll ? (c = a.replace(c, ""), c = b.replace(c, " ")) : this.trimEnds && (c = a.replace(c, ""));
                for (var b = c.split(" "), c = b.length, d = 1, e = 0; e < c;) {
                    var f = e++;
                    f != c - 1 && (b.splice(f + d, 0, " "), d++)
                }
                for (var g, l, c = "", d = 0, e = "", f = 0, k = !1, m = !1, p = !1, q = new Fb("[\n\r]", ""), r = 0, t = 0; r < b.length;) {
                    var u = b[r],
                        t = 0;
                    q.match(u) ? (q.matchedPos(), u = q.split(u), m = u[1], b[r] = u = u[0], b.splice(r + 1, 0, m), m = !0) : r == b.length - 1 && (p = !0);
                    if (" " != u)
                        for (var w = 0, C = u.length; w < C;) g = w++, g = u.charAt(g), l = v.cca(g, 0), l = this.font.letters.h[l], null != l && (e += g, f += l.xadvance, t = l.width - l.xadvance);
                    else e = " ", f = this.font.spaceWidth;
                    d + f < this.width ? (c += e, d += f) : k = !0;
                    if (k || p) d += t, this._lines.push({
                        text: c,
                        width: d
                    }), p ? k && this._lines.push({
                        text: e,
                        width: f
                    }) : (" " != e ? (c = e, d = f) : (c = "", d = 0), k = !1), this.trimAll && a.replace(this._lines[this._lines.length - 1].text, "");
                    m && (d += t, this._lines.push({
                        text: c,
                        width: d
                    }), c = "", d = 0, m = !1);
                    e = "";
                    f = 0;
                    r++
                }
            }
        },
        destroy: function() {
            wa.prototype.destroy.call(this);
            this._cursor = this.font = null
        },
        render: function(a) {
            if (this.visible) {
                this._cursor.x = 0;
                this._cursor.y = 0;
                switch (this.valign[1]) {
                    case 0:
                        this._cursor.y = 0;
                        break;
                    case 1:
                        this._cursor.y = this.height / 2 - this._lines.length * this.font.lineHeight / 2;
                        break;
                    case 2:
                        this._cursor.y = this.height - this.font.lineHeight
                }
                if (0 != this.angle) {
                    var b = this.parent.get_x() - (this.parent.screen.scrollX - this.parent.screen.shakeX) * this.parent.scrollFactorX + this.offsetX,
                        c = this.parent.get_y() - (this.parent.screen.scrollY - this.parent.screen.shakeY) * this.parent.scrollFactorY + this.offsetY,
                        d = Math.PI / 180 * this.angle;
                    a.pushTransformation(function(e) {
                        var f = a.transformations[a.transformations.length - 1],
                            g = b + e.scale * e.width / 2,
                            h = c + e.scale * e.height / 2,
                            k = 1 * f._00 + 0 * f._10 + 0 * f._20,
                            l = 0 * f._00 + 1 * f._10 + 0 * f._20,
                            n = f._00 * g + f._10 * h + 1 * f._20,
                            m = 1 * f._01 + 0 * f._11 + 0 * f._21,
                            p = 0 * f._01 + 1 * f._11 + 0 * f._21,
                            q = f._01 * g + f._11 * h + 1 * f._21,
                            r = 1 * f._02 + 0 * f._12 + 0 * f._22,
                            t = 0 * f._02 + 1 * f._12 + 0 * f._22,
                            h = f._02 * g + f._12 * h + 1 * f._22,
                            u = new pa(Math.cos(d), -Math.sin(d), 0, Math.sin(d), Math.cos(d), 0, 0, 0, 1),
                            f = k * u._00 + l * u._01 + n * u._02,
                            g = k * u._10 + l * u._11 + n * u._12,
                            k = k * u._20 + l * u._21 + n * u._22,
                            l = m * u._00 + p * u._01 + q * u._02,
                            n = m * u._10 + p * u._11 + q * u._12,
                            m = m * u._20 + p * u._21 + q * u._22,
                            p = r * u._00 + t * u._01 + h * u._02,
                            q = r * u._10 + t * u._11 + h * u._12,
                            r = r * u._20 + t * u._21 + h * u._22,
                            t = -b - e.scale * e.width / 2;
                        e = -c - e.scale * e.height / 2;
                        return new pa(1 * f + 0 * g + 0 * k, 0 * f + 1 * g + 0 * k, f * t + g * e + 1 * k, 1 * l + 0 * n + 0 * m, 0 * l + 1 * n + 0 * m, l * t + n * e + 1 * m, 1 * p + 0 * q + 0 * r, 0 * p + 1 * q + 0 * r, p * t + q * e + 1 * r)
                    }(this))
                }
                1 != this.alpha && a.pushOpacity(this.alpha);
                for (var e = 0, f = this._lines; e < f.length;) {
                    var g = f[e];
                    ++e;
                    switch (this.halign[1]) {
                        case 0:
                            this._cursor.x = 0;
                            break;
                        case 2:
                            this._cursor.x = this.width - g.width;
                            break;
                        case 1:
                            this._cursor.x = this.width / 2 - g.width / 2
                    }
                    for (var g = g.text, l = g.length, k = 0; k < l;) {
                        var m = k++,
                            p = g.charAt(m),
                            q = v.cca(p, 0),
                            q = this.font.letters.h[q];
                        if (null != q)
                            if (q.id != qa.spaceCharCode) {
                                var p = this.parent.get_x() + this.offsetX + this._cursor.x + q.xoffset * this.scale,
                                    r = this.parent.get_y() + this.offsetY + this._cursor.y + q.yoffset * this.scale,
                                    t = q.width * this.scale,
                                    u = q.height * this.scale;
                                qa.oldColor = a.get_color();
                                a.set_color(this.color);
                                a.drawScaledSubImage(this.font.image, q.x, q.y, q.width, q.height, p, r, t, u);
                                a.set_color(qa.oldColor);
                                qa.WYN_DEBUG && a.drawRect(p, r, t, u);
                                m != l && (m = g.charAt(m + 1), m = v.cca(m, 0), q.kernings.h.hasOwnProperty(m) && (this._cursor.x += q.kernings.h[m] * this.scale));
                                this._cursor.x += (q.xadvance + this.font.outline) * this.scale
                            } else this._cursor.x += this.font.spaceWidth * this.scale;
                        else R.trace("letter data doesn't exist : " + p, {
                            fileName: "WynBitmapText.hx",
                            lineNumber: 468,
                            className: "wyn.component.WynBitmapText",
                            methodName: "render"
                        })
                    }
                    this._cursor.y += this.font.lineHeight * this.scale
                }
                1 != this.alpha && a.popOpacity();
                0 != this.angle && a.popTransformation()
            }
        },
        get_lineHeight: function() {
            return this.font.lineHeight
        },
        set_lineHeight: function(a) {
            return this.font.lineHeight = a
        },
        __class__: qa
    });
    var Ka = function(a, b) {
        this.processedDown = this.processedMove = this.processedUp = this.stateChanged = !1;
        this.exitListeners = [];
        this.enterListeners = [];
        this.upListeners = [];
        this.downListeners = [];
        this.hitMouse = this.isMouseDown = !1;
        this.currState = this.prevState = 0;
        wa.call(this, a, b);
        this.hitTouches = new Fa;
        this.isTouchDowns = new Fa;
        Ea.get().notify(M(this, this.onMouseDown), M(this, this.onMouseUp), M(this, this.onMouseMove), null);
        Ma.get().notify(M(this, this.onTouchStart), M(this, this.onTouchEnd), M(this, this.onTouchMove))
    };
    m["wyn.component.WynButton"] = Ka;
    Ka.__name__ = ["wyn", "component", "WynButton"];
    Ka.__super__ = wa;
    Ka.prototype = T(wa.prototype, {
        currState: null,
        prevState: null,
        regionDataUp: null,
        regionDataOver: null,
        regionDataDown: null,
        hitTouches: null,
        isTouchDowns: null,
        hitMouse: null,
        isMouseDown: null,
        downListeners: null,
        upListeners: null,
        enterListeners: null,
        exitListeners: null,
        processedDown: null,
        processedMove: null,
        processedUp: null,
        stateChanged: null,
        update: function() {
            wa.prototype.update.call(this);
            this.processedUp = this.processedMove = this.processedDown = !1;
            this.currState == this.prevState ? this.stateChanged = !1 : (this.stateChanged = !0, this.prevState = this.currState)
        },
        onMouseDown: function(a, b, c) {
            if (this.isButtonActive() && I.init && (this.processedDown = this.isMouseDown = !0, this.isWithinButton(b, c))) {
                a = 0;
                for (b = this.downListeners; a < b.length;) c = b[a], ++a, c(this);
                this.setState(3)
            }
        },
        onMouseUp: function(a, b, c) {
            if (this.isButtonActive() && I.init && (this.isMouseDown = !1, this.processedUp = !0, this.isWithinButton(b, c))) {
                a = 0;
                for (b = this.upListeners; a < b.length;) c = b[a], ++a, c(this);
                this.setState(2)
            }
        },
        onMouseMove: function(a, b, c, d) {
            if (this.isButtonActive() && I.init)
                if (c = this.hitMouse, this.processedMove = !0, this.isWithinButton(a, b)) {
                    if (this.hitMouse = !0, !c)
                        for (this.isMouseDown ? this.setState(3) : this.setState(2), a = 0, b = this.enterListeners; a < b.length;) c = b[a], ++a, c(this)
                } else if (this.hitMouse = !1, c)
                for (this.setState(1), a = 0, b = this.exitListeners; a < b.length;) c = b[a], ++a, c(this)
        },
        onTouchStart: function(a, b, c) {
            if ((0 != a || !this.processedDown) && this.isButtonActive() && z.init && (this.processedDown = this.isTouchDowns.h[a] = !0, this.isWithinButton(b, c))) {
                a = 0;
                for (b = this.downListeners; a < b.length;) c = b[a], ++a, c(this);
                this.setState(3)
            }
        },
        onTouchEnd: function(a, b, c) {
            if ((0 != a || !this.processedUp) && this.isButtonActive() && z.init && (this.isTouchDowns.remove(a), this.processedUp = !0, this.isWithinButton(b, c))) {
                a = 0;
                for (b = this.upListeners; a < b.length;) c = b[a], ++a, c(this);
                this.setState(2)
            }
        },
        onTouchMove: function(a, b, c) {
            if ((0 != a || !this.processedMove) && this.isButtonActive() && z.init) {
                var d = this.hitTouches.h.hasOwnProperty(a),
                    e = this.isTouchDowns.h.hasOwnProperty(a);
                this.processedMove = !0;
                if (this.isWithinButton(b, c)) {
                    if (this.hitTouches.h[a] = !0, !d)
                        for (e ? this.setState(3) : this.setState(1), a = 0, b = this.enterListeners; a < b.length;) c = b[a], ++a, c(this)
                } else if (this.hitTouches.remove(a), d)
                    for (this.setState(1), a = 0, b = this.exitListeners; a < b.length;) c = b[a], ++a, c(this)
            }
        },
        isButtonActive: function() {
            return this.enabled && this.active ? null == this.parent || this.parent.enabled && this.parent.active ? !0 : !1 : !1
        },
        isWithinButton: function(a, b) {
            if (this.enabled && this.active)
                if (null != this.parent && this.parent.enabled && this.parent.active) {
                    if (null == this.parent.screen || !this.parent.screen.alive) return !1
                } else return !1;
            else return !1;
            var c = !1,
                d = !1,
                e = a / p.gameScale - p.screenOffsetX | 0,
                f = b / p.gameScale - p.screenOffsetY | 0;
            e > this.parent.get_x() +
                this.offsetX && (c = e < this.parent.get_x() + this.offsetX + this.width);
            f > this.parent.get_y() + this.offsetY && (d = f < this.parent.get_y() + this.offsetY + this.height);
            return c && d
        },
        init: function() {
            wa.prototype.init.call(this);
            this.setState(1)
        },
        destroy: function() {
            wa.prototype.destroy.call(this);
            this.exitListeners = this.enterListeners = this.upListeners = this.downListeners = this.isTouchDowns = this.hitTouches = this.regionDataDown = this.regionDataOver = this.regionDataUp = null;
            Ea.get().remove(M(this, this.onMouseDown), M(this, this.onMouseUp), M(this, this.onMouseMove), null);
            Ma.get().remove(M(this, this.onTouchStart), M(this, this.onTouchEnd), M(this, this.onTouchMove))
        },
        render: function(a) {
            if (this.visible && null != this.image && null != this.region) {
                if (0 != this.angle) {
                    var b = this.parent.get_x() - (this.parent.screen.scrollX - this.parent.screen.shakeX) * this.parent.scrollFactorX + this.offsetX,
                        c = this.parent.get_y() - (this.parent.screen.scrollY - this.parent.screen.shakeY) * this.parent.scrollFactorY + this.offsetY,
                        d = Math.PI / 180 * this.angle;
                    a.pushTransformation(function(e) {
                        var f = a.transformations[a.transformations.length - 1],
                            g = b + e.scale * e.width / 2,
                            l = c + e.scale * e.height / 2,
                            k = 1 * f._00 + 0 * f._10 + 0 * f._20,
                            m = 0 * f._00 + 1 * f._10 + 0 * f._20,
                            p = f._00 * g + f._10 * l + 1 * f._20,
                            q = 1 * f._01 + 0 * f._11 + 0 * f._21,
                            r = 0 * f._01 + 1 * f._11 + 0 * f._21,
                            t = f._01 * g + f._11 * l + 1 * f._21,
                            u = 1 * f._02 + 0 * f._12 + 0 * f._22,
                            w = 0 * f._02 + 1 * f._12 + 0 * f._22,
                            l = f._02 * g + f._12 * l + 1 * f._22,
                            v = new pa(Math.cos(d), -Math.sin(d), 0, Math.sin(d), Math.cos(d), 0, 0, 0, 1),
                            f = k * v._00 + m * v._01 + p * v._02,
                            g = k * v._10 + m * v._11 + p * v._12,
                            k = k * v._20 + m * v._21 + p * v._22,
                            m = q * v._00 + r * v._01 + t * v._02,
                            p = q * v._10 + r * v._11 + t * v._12,
                            q = q * v._20 + r * v._21 + t * v._22,
                            r = u * v._00 + w * v._01 + l * v._02,
                            t = u * v._10 + w * v._11 + l * v._12,
                            u = u * v._20 + w * v._21 + l * v._22,
                            w = -b - e.scale * e.width / 2;
                        e = -c - e.scale * e.height / 2;
                        return new pa(1 * f + 0 * g + 0 * k, 0 * f + 1 * g + 0 * k, f * w + g * e + 1 * k, 1 * m + 0 * p + 0 * q, 0 * m + 1 * p + 0 * q, m * w + p * e + 1 * q, 1 * r + 0 * t + 0 * u, 0 * r + 1 * t + 0 * u, r * w + t * e + 1 * u)
                    }(this))
                }
                1 != this.alpha && a.pushOpacity(this.alpha);
                a.drawScaledSubImage(this.image, this.region.x, this.region.y, this.region.w, this.region.h, this.parent.get_x() + this.offsetX, this.parent.get_y() + this.offsetY, this.width, this.height);
                1 != this.alpha && a.popOpacity();
                0 != this.angle && a.popTransformation()
            }
        },
        setButtonImage: function(a, b, c, d) {
            this.image = a;
            this.regionDataUp = b;
            this.regionDataOver = c;
            this.regionDataDown = d;
            this.setState(1)
        },
        setImage: function(a, b) {
            this.image = a;
            this.regionDataDown = this.regionDataOver = this.regionDataUp = b;
            this.setState(1)
        },
        setState: function(a) {
            if (this.active && this.currState != a) {
                this.prevState = this.currState;
                this.currState = a;
                a = this.regionDataUp;
                switch (this.currState) {
                    case 0:
                        a = this.regionDataUp;
                        break;
                    case 1:
                        a = this.regionDataUp;
                        break;
                    case 2:
                        a = this.regionDataOver;
                        break;
                    case 3:
                        a = this.regionDataDown
                }
                null == a && (a = {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                });
                this.region = a
            }
        },
        notify: function(a, b, c, d) {
            this.notifyDown(a);
            this.notifyUp(b);
            this.notifyEnter(c);
            this.notifyExit(d)
        },
        denotify: function() {
            for (; 0 < this.downListeners.length;) this.downListeners.pop();
            for (; 0 < this.upListeners.length;) this.upListeners.pop();
            for (; 0 < this.enterListeners.length;) this.enterListeners.pop();
            for (; 0 < this.exitListeners.length;) this.exitListeners.pop()
        },
        notifyDown: function(a) {
            null != a && -1 == v.indexOf(this.downListeners, a, 0) && this.downListeners.push(a)
        },
        notifyUp: function(a) {
            null != a && -1 == v.indexOf(this.upListeners, a, 0) && this.upListeners.push(a)
        },
        notifyEnter: function(a) {
            null != a && -1 == v.indexOf(this.enterListeners, a, 0) && this.enterListeners.push(a)
        },
        notifyExit: function(a) {
            null != a && -1 == v.indexOf(this.exitListeners, a, 0) && this.exitListeners.push(a)
        },
        removeDown: function(a) {
            v.remove(this.downListeners, a)
        },
        removeUp: function(a) {
            v.remove(this.upListeners, a)
        },
        removeEnter: function(a) {
            v.remove(this.enterListeners, a)
        },
        removeExit: function(a) {
            v.remove(this.exitListeners, a)
        },
        set_active: function(a) {
            a || this.setState(1);
            return this.active = a
        },
        __class__: Ka
    });
    var bb = function(a, b) {
        Ka.call(this, a, b)
    };
    m["wyn.component.WynButton9Slice"] = bb;
    bb.__name__ = ["wyn", "component", "WynButton9Slice"];
    bb.__super__ = Ka;
    bb.prototype = T(Ka.prototype, {
        render: function(a) {
            this.visible && null != this.image && null != this.region && this.draw9Slice(this.image, a)
        },
        draw9Slice: function(a, b) {
            if (null != this.region) {
                null == this.region.borderLeft && (this.region.borderLeft = 0);
                null == this.region.borderRight && (this.region.borderRight = 0);
                null == this.region.borderTop && (this.region.borderTop = 0);
                null == this.region.borderBottom && (this.region.borderBottom = 0);
                var c = 1,
                    d = 1,
                    e = this.width,
                    f = this.height,
                    g = this.region.x,
                    l = this.region.y,
                    k = this.region.w - this.region.borderLeft - this.region.borderRight,
                    m = this.region.h - this.region.borderTop - this.region.borderBottom,
                    p = this.parent.get_x() + this.offsetX,
                    q = this.parent.get_y() + this.offsetY,
                    r = e - this.region.borderLeft - this.region.borderRight,
                    t = f - this.region.borderTop -
                    this.region.borderBottom;
                0 > k && (k = 0);
                0 > m && (m = 0);
                0 > r && (r = 0);
                0 > t && (t = 0);
                e < this.region.borderLeft + this.region.borderRight && (c = e / (this.region.borderLeft + this.region.borderRight));
                f < this.region.borderTop + this.region.borderBottom && (d = f / (this.region.borderTop + this.region.borderBottom));
                if (0 != this.angle) {
                    var u = this.parent.get_x() - (this.parent.screen.scrollX - this.parent.screen.shakeX) * this.parent.scrollFactorX + this.offsetX,
                        w = this.parent.get_y() - (this.parent.screen.scrollY - this.parent.screen.shakeY) * this.parent.scrollFactorY +
                        this.offsetY,
                        v = Math.PI / 180 * this.angle;
                    b.pushTransformation(function(a) {
                        var c = b.transformations[b.transformations.length - 1],
                            d = u + a.scale * a.width / 2,
                            e = w + a.scale * a.height / 2,
                            f = 1 * c._00 + 0 * c._10 + 0 * c._20,
                            g = 0 * c._00 + 1 * c._10 + 0 * c._20,
                            h = c._00 * d + c._10 * e + 1 * c._20,
                            k = 1 * c._01 + 0 * c._11 + 0 * c._21,
                            l = 0 * c._01 + 1 * c._11 + 0 * c._21,
                            m = c._01 * d + c._11 * e + 1 * c._21,
                            n = 1 * c._02 + 0 * c._12 + 0 * c._22,
                            p = 0 * c._02 + 1 * c._12 + 0 * c._22,
                            e = c._02 * d + c._12 * e + 1 * c._22,
                            q = new pa(Math.cos(v), -Math.sin(v), 0, Math.sin(v), Math.cos(v), 0, 0, 0, 1),
                            c = f * q._00 + g * q._01 + h * q._02,
                            d = f * q._10 + g * q._11 + h * q._12,
                            f = f * q._20 + g * q._21 + h * q._22,
                            g = k * q._00 + l * q._01 + m * q._02,
                            h = k * q._10 + l * q._11 + m * q._12,
                            k = k * q._20 + l * q._21 + m * q._22,
                            l = n * q._00 + p * q._01 + e * q._02,
                            m = n * q._10 + p * q._11 + e * q._12,
                            n = n * q._20 + p * q._21 + e * q._22,
                            p = -u - a.scale * a.width / 2;
                        a = -w - a.scale * a.height / 2;
                        return new pa(1 * c + 0 * d + 0 * f, 0 * c + 1 * d + 0 * f, c * p + d * a + 1 * f, 1 * g + 0 * h + 0 * k, 0 * g + 1 * h + 0 * k, g * p + h * a + 1 * k, 1 * l + 0 * m + 0 * n, 0 * l + 1 * m + 0 * n, l * p + m * a + 1 * n)
                    }(this))
                }
                1 != this.alpha && b.pushOpacity(this.alpha);
                b.drawScaledSubImage(a, g, l, this.region.borderLeft, this.region.borderTop, p, q, this.region.borderLeft * c, this.region.borderTop * d);
                b.drawScaledSubImage(a, g + this.region.borderLeft, l, k, this.region.borderTop, p + this.region.borderLeft * c, q, r, this.region.borderTop * d);
                b.drawScaledSubImage(a, g + this.region.w - this.region.borderRight, l, this.region.borderRight, this.region.borderTop, p + (e - this.region.borderRight * c), q, this.region.borderRight * c, this.region.borderTop * d);
                b.drawScaledSubImage(a, g, l + this.region.borderTop, this.region.borderLeft, m, p, q + this.region.borderTop * d, this.region.borderLeft * c, t);
                b.drawScaledSubImage(a, g + this.region.borderLeft, l + this.region.borderTop, k, m, p + this.region.borderLeft * c, q + this.region.borderTop * d, r, t);
                b.drawScaledSubImage(a, g + this.region.w - this.region.borderRight, l + this.region.borderTop, this.region.borderRight, m, p + (e - this.region.borderRight * c), q + this.region.borderTop * d, this.region.borderRight * c, t);
                b.drawScaledSubImage(a, g, l + this.region.h - this.region.borderBottom, this.region.borderLeft, this.region.borderBottom, p, q + (f - this.region.borderBottom * d), this.region.borderLeft * c, this.region.borderBottom * d);
                b.drawScaledSubImage(a, g + this.region.borderLeft, l + this.region.h - this.region.borderBottom, k, this.region.borderBottom, p + this.region.borderLeft * c, q + (f - this.region.borderBottom * d), r, this.region.borderBottom * d);
                b.drawScaledSubImage(a, g + this.region.w - this.region.borderRight, l + this.region.h - this.region.borderBottom, this.region.borderRight, this.region.borderBottom, p + (e - this.region.borderRight * c), q + (f - this.region.borderBottom * d), this.region.borderRight * c, this.region.borderBottom * d);
                1 != this.alpha && b.popOpacity();
                0 != this.angle && b.popTransformation()
            }
        },
        __class__: bb
    });
    var Da = function(a, b) {
        this.width = this.height = this.radius = this.offsetX = this.offsetY = 0;
        this.colliderType = Da.HITBOX;
        Ia.call(this);
        this.colliderType = Da.HITBOX;
        this.width = a;
        this.height = b
    };
    m["wyn.component.WynCollider"] = Da;
    Da.__name__ = ["wyn", "component", "WynCollider"];
    Da.__super__ = Ia;
    Da.prototype = T(Ia.prototype, {
        colliderType: null,
        width: null,
        height: null,
        radius: null,
        offsetX: null,
        offsetY: null,
        init: function() {
            Da.WYN_DEBUG && this.parent.addRenderer(M(this, this.debugRender))
        },
        destroy: function() {
            Ia.prototype.destroy.call(this);
            Da.WYN_DEBUG && v.remove(this.parent.renderers, M(this, this.debugRender))
        },
        debugRender: function(a) {
            a.drawRect(this.parent.get_x() + this.offsetX, this.parent.get_y() + this.offsetY, this.width, this.height);
            yc.drawCircle(a, this.parent.get_x() + this.radius + this.offsetX, this.parent.get_y() + this.radius + this.offsetY, this.radius)
        },
        collide: function(a) {
            if (!this.active || a == this || 0 == this.width || 0 == this.height || 0 == a.width || 0 == a.height) return !1;
            if (this.colliderType == Da.HITBOX) {
                if (a.colliderType == Da.HITBOX) return this.collideRectWithRect(a);
                if (a.colliderType == Da.HITCIRCLE) return this.collideRectWithCircle(a)
            } else if (this.colliderType == Da.HITCIRCLE) {
                if (a.colliderType == Da.HITBOX) return a.collideRectWithCircle(this);
                if (a.colliderType == Da.HITCIRCLE) return this.collideCircleWithCircle(a)
            }
            return !1
        },
        collideRectWithRect: function(a) {
            var b = !1,
                c = !1,
                b = this.parent.get_x() + this.offsetX,
                c = this.parent.get_y() + this.offsetY,
                d = a.parent.get_x() + a.offsetX,
                e = a.parent.get_y() + a.offsetY,
                b = b < d ? d < b + this.width : b < d + a.width,
                c = c < e ? e < c + this.height : c < e + a.height;
            return b && c
        },
        collideRectWithCircle: function(a) {
            var b = .5 * a.width,
                c = .5 * a.height,
                d = a.radius * a.radius,
                e = a.parent.get_x() + a.offsetX;
            a = a.parent.get_y() + a.offsetY;
            var f = this.parent.get_x() + this.offsetX,
                g = this.parent.get_y() + this.offsetY,
                e = Math.abs(e - f - b);
            a = Math.abs(a - g - c);
            return e > b + this.radius || a > c + this.radius ? !1 : e <= b || a <= c ? !0 : (e - b) * (e - b) + (a - c) * (a - c) <= d
        },
        collideCircleWithCircle: function(a) {
            var b = this.parent.get_x() - a.parent.get_x(),
                c = this.parent.get_y() -
                a.parent.get_y();
            return b * b + c * c < Math.pow(this.radius + a.radius, 2)
        },
        setOffset: function(a, b) {
            this.offsetX = a;
            this.offsetY = b
        },
        setHitCircle: function(a) {
            this.radius = a;
            this.offsetX = -a;
            this.offsetY = -a;
            this.colliderType = Da.HITCIRCLE
        },
        __class__: Da
    });
    var pb = function() {
        this.oldX = this.oldY = this.velocityX = this.velocityY = this.accelerationX = this.accelerationY = this.dragX = this.dragY = this.maxVelocityX = this.maxVelocityY = this.angularVelocity = this.angularAcceleration = this.angularDrag = this.angularMaxVelocity = this.angle = 0;
        Ia.call(this)
    };
    m["wyn.component.WynPhysics"] = pb;
    pb.__name__ = ["wyn", "component", "WynPhysics"];
    pb.computeVelocity = function(a, b, c, d, e) {
        null == e && (e = 0);
        0 != c ? b += c * a : 0 != d && (a *= d, b = 0 < b - a ? b - a : 0 > b + a ? b + a : 0);
        0 != b && 0 != e && (b > e ? b = e : b < -e && (b = -e));
        return b
    };
    pb.__super__ = Ia;
    pb.prototype = T(Ia.prototype, {
        oldX: null,
        oldY: null,
        velocityX: null,
        velocityY: null,
        accelerationX: null,
        accelerationY: null,
        dragX: null,
        dragY: null,
        maxVelocityX: null,
        maxVelocityY: null,
        angularVelocity: null,
        angularAcceleration: null,
        angularDrag: null,
        angularMaxVelocity: null,
        angle: null,
        update: function() {
            if (this.active) {
                this.velocityX = pb.computeVelocity(p.dt, this.velocityX, this.accelerationX, this.dragX, this.maxVelocityX);
                this.velocityY = pb.computeVelocity(p.dt, this.velocityY, this.accelerationY, this.dragY, this.maxVelocityY);
                this.oldX = this.parent.get_x();
                this.oldY = this.parent.get_y();
                var a = this.parent;
                a.set_x(a.get_x() + p.dt * this.velocityX);
                a = this.parent;
                a.set_y(a.get_y() + p.dt * this.velocityY);
                this.angularVelocity = pb.computeVelocity(p.dt, this.angularVelocity, this.angularAcceleration, this.angularDrag, this.angularMaxVelocity);
                this.angle += p.dt * this.angularVelocity
            }
        },
        setVelocity: function(a, b) {
            this.velocityX = a;
            this.velocityY = b
        },
        setAcceleration: function(a, b) {
            this.accelerationX = a;
            this.accelerationY = b
        },
        setDrag: function(a, b) {
            this.dragX = a;
            this.dragY = b
        },
        setMaxVelocity: function(a, b) {
            this.maxVelocityX = a;
            this.maxVelocityY = b
        },
        __class__: pb
    });
    var na = function(a, b) {
        wa.call(this, a, b)
    };
    m["wyn.component.WynSprite"] = na;
    na.__name__ = ["wyn", "component", "WynSprite"];
    na.__super__ = wa;
    na.prototype = T(wa.prototype, {
        render: function(a) {
            if (this.visible && null != this.image && null != this.region) {
                if (0 != this.angle) {
                    var b = this.parent.get_x() - (this.parent.screen.scrollX - this.parent.screen.shakeX) * this.parent.scrollFactorX + this.offsetX,
                        c = this.parent.get_y() - (this.parent.screen.scrollY - this.parent.screen.shakeY) * this.parent.scrollFactorY + this.offsetY,
                        d = Math.PI / 180 * this.angle;
                    a.pushTransformation(function(e) {
                        var f = a.transformations[a.transformations.length - 1],
                            g = b + e.scale * e.width / 2,
                            l = c + e.scale * e.height / 2,
                            k = 1 * f._00 + 0 * f._10 +
                            0 * f._20,
                            m = 0 * f._00 + 1 * f._10 + 0 * f._20,
                            p = f._00 * g + f._10 * l + 1 * f._20,
                            q = 1 * f._01 + 0 * f._11 + 0 * f._21,
                            r = 0 * f._01 + 1 * f._11 + 0 * f._21,
                            t = f._01 * g + f._11 * l + 1 * f._21,
                            u = 1 * f._02 + 0 * f._12 + 0 * f._22,
                            w = 0 * f._02 + 1 * f._12 + 0 * f._22,
                            l = f._02 * g + f._12 * l + 1 * f._22,
                            v = new pa(Math.cos(d), -Math.sin(d), 0, Math.sin(d), Math.cos(d), 0, 0, 0, 1),
                            f = k * v._00 + m * v._01 + p * v._02,
                            g = k * v._10 + m * v._11 + p * v._12,
                            k = k * v._20 + m * v._21 + p * v._22,
                            m = q * v._00 + r * v._01 + t * v._02,
                            p = q * v._10 + r * v._11 + t * v._12,
                            q = q * v._20 + r * v._21 + t * v._22,
                            r = u * v._00 + w * v._01 + l * v._02,
                            t = u * v._10 + w * v._11 + l * v._12,
                            u = u * v._20 +
                            w * v._21 + l * v._22,
                            w = -b - e.scale * e.width / 2;
                        e = -c - e.scale * e.height / 2;
                        return new pa(1 * f + 0 * g + 0 * k, 0 * f + 1 * g + 0 * k, f * w + g * e + 1 * k, 1 * m + 0 * p + 0 * q, 0 * m + 1 * p + 0 * q, m * w + p * e + 1 * q, 1 * r + 0 * t + 0 * u, 0 * r + 1 * t + 0 * u, r * w + t * e + 1 * u)
                    }(this))
                }
                1 != this.alpha && a.pushOpacity(this.alpha);
                a.drawScaledSubImage(this.image, this.region.x, this.region.y, this.region.w, this.region.h, this.parent.get_x() + this.offsetX, this.parent.get_y() + this.offsetY, this.width * this.scale, this.height * this.scale);
                1 != this.alpha && a.popOpacity();
                0 != this.angle && a.popTransformation();
                na.WYN_DEBUG && a.drawRect(this.parent.get_x() + this.offsetX, this.parent.get_y() + this.offsetY, this.width, this.height)
            }
        },
        __class__: na
    });
    var Bc = function(a, b) {
        wa.call(this, a, b)
    };
    m["wyn.component.WynSprite9Slice"] = Bc;
    Bc.__name__ = ["wyn", "component", "WynSprite9Slice"];
    Bc.__super__ = na;
    Bc.prototype = T(na.prototype, {
        render: function(a) {
            this.visible && null != this.image && null != this.region && this.draw9Slice(this.image, a)
        },
        draw9Slice: function(a, b) {
            if (null != this.region) {
                null == this.region.borderLeft && (this.region.borderLeft = 0);
                null == this.region.borderRight && (this.region.borderRight = 0);
                null == this.region.borderTop && (this.region.borderTop = 0);
                null == this.region.borderBottom && (this.region.borderBottom = 0);
                var c = 1,
                    d = 1,
                    e = this.width,
                    f = this.height,
                    g = this.region.x,
                    l = this.region.y,
                    k = this.region.w - this.region.borderLeft - this.region.borderRight,
                    m = this.region.h - this.region.borderTop - this.region.borderBottom,
                    p = this.parent.get_x() + this.offsetX,
                    q = this.parent.get_y() + this.offsetY,
                    r = e - this.region.borderLeft - this.region.borderRight,
                    t = f - this.region.borderTop -
                    this.region.borderBottom;
                0 > k && (k = 0);
                0 > m && (m = 0);
                0 > r && (r = 0);
                0 > t && (t = 0);
                e < this.region.borderLeft + this.region.borderRight && (c = e / (this.region.borderLeft + this.region.borderRight));
                f < this.region.borderTop + this.region.borderBottom && (d = f / (this.region.borderTop + this.region.borderBottom));
                if (0 != this.angle) {
                    var u = this.parent.get_x() - (this.parent.screen.scrollX - this.parent.screen.shakeX) * this.parent.scrollFactorX + this.offsetX,
                        v = this.parent.get_y() - (this.parent.screen.scrollY - this.parent.screen.shakeY) * this.parent.scrollFactorY +
                        this.offsetY,
                        w = Math.PI / 180 * this.angle;
                    b.pushTransformation(function(a) {
                        var c = b.transformations[b.transformations.length - 1],
                            d = u + a.scale * a.width / 2,
                            e = v + a.scale * a.height / 2,
                            f = 1 * c._00 + 0 * c._10 + 0 * c._20,
                            g = 0 * c._00 + 1 * c._10 + 0 * c._20,
                            h = c._00 * d + c._10 * e + 1 * c._20,
                            k = 1 * c._01 + 0 * c._11 + 0 * c._21,
                            l = 0 * c._01 + 1 * c._11 + 0 * c._21,
                            m = c._01 * d + c._11 * e + 1 * c._21,
                            n = 1 * c._02 + 0 * c._12 + 0 * c._22,
                            p = 0 * c._02 + 1 * c._12 + 0 * c._22,
                            e = c._02 * d + c._12 * e + 1 * c._22,
                            q = new pa(Math.cos(w), -Math.sin(w), 0, Math.sin(w), Math.cos(w), 0, 0, 0, 1),
                            c = f * q._00 + g * q._01 + h * q._02,
                            d = f * q._10 + g * q._11 + h * q._12,
                            f = f * q._20 + g * q._21 + h * q._22,
                            g = k * q._00 + l * q._01 + m * q._02,
                            h = k * q._10 + l * q._11 + m * q._12,
                            k = k * q._20 + l * q._21 + m * q._22,
                            l = n * q._00 + p * q._01 + e * q._02,
                            m = n * q._10 + p * q._11 + e * q._12,
                            n = n * q._20 + p * q._21 + e * q._22,
                            p = -u - a.scale * a.width / 2;
                        a = -v - a.scale * a.height / 2;
                        return new pa(1 * c + 0 * d + 0 * f, 0 * c + 1 * d + 0 * f, c * p + d * a + 1 * f, 1 * g + 0 * h + 0 * k, 0 * g + 1 * h + 0 * k, g * p + h * a + 1 * k, 1 * l + 0 * m + 0 * n, 0 * l + 1 * m + 0 * n, l * p + m * a + 1 * n)
                    }(this))
                }
                1 != this.alpha && b.pushOpacity(this.alpha);
                b.drawScaledSubImage(a, g, l, this.region.borderLeft, this.region.borderTop, p, q, this.region.borderLeft * c, this.region.borderTop * d);
                b.drawScaledSubImage(a, g + this.region.borderLeft, l, k, this.region.borderTop, p + this.region.borderLeft * c, q, r, this.region.borderTop * d);
                b.drawScaledSubImage(a, g + this.region.w - this.region.borderRight, l, this.region.borderRight, this.region.borderTop, p + (e - this.region.borderRight * c), q, this.region.borderRight * c, this.region.borderTop * d);
                b.drawScaledSubImage(a, g, l + this.region.borderTop, this.region.borderLeft, m, p, q + this.region.borderTop * d, this.region.borderLeft * c, t);
                b.drawScaledSubImage(a, g + this.region.borderLeft, l + this.region.borderTop, k, m, p + this.region.borderLeft * c, q + this.region.borderTop * d, r, t);
                b.drawScaledSubImage(a, g + this.region.w - this.region.borderRight, l + this.region.borderTop, this.region.borderRight, m, p + (e - this.region.borderRight * c), q + this.region.borderTop * d, this.region.borderRight * c, t);
                b.drawScaledSubImage(a, g, l + this.region.h - this.region.borderBottom, this.region.borderLeft, this.region.borderBottom, p, q + (f - this.region.borderBottom * d), this.region.borderLeft * c, this.region.borderBottom * d);
                b.drawScaledSubImage(a, g + this.region.borderLeft, l + this.region.h - this.region.borderBottom, k, this.region.borderBottom, p + this.region.borderLeft * c, q + (f - this.region.borderBottom * d), r, this.region.borderBottom * d);
                b.drawScaledSubImage(a, g + this.region.w - this.region.borderRight, l + this.region.h - this.region.borderBottom, this.region.borderRight, this.region.borderBottom, p + (e - this.region.borderRight * c), q + (f - this.region.borderBottom * d), this.region.borderRight * c, this.region.borderBottom * d);
                1 != this.alpha && b.popOpacity();
                0 != this.angle && b.popTransformation()
            }
        },
        __class__: Bc
    });
    var Sb = function(a, b, c, d) {
        this.color = -1;
        this.fontSize = 12;
        this.valign = Qa.TOP;
        this.halign = Ra.LEFT;
        this.texts = [];
        this.text = "";
        wa.call(this, 0, 0);
        this.set_text(a);
        this.font = b;
        this.fontSize = c;
        null != d && (null != d.color && (this.color = d.color), null != d.halign && (this.halign = d.halign), null != d.valign && (this.valign = d.valign))
    };
    m["wyn.component.WynText"] = Sb;
    Sb.__name__ = ["wyn", "component", "WynText"];
    Sb.__super__ = wa;
    Sb.prototype = T(wa.prototype, {
        text: null,
        texts: null,
        font: null,
        halign: null,
        valign: null,
        fontSize: null,
        color: null,
        destroy: function() {
            wa.prototype.destroy.call(this);
            this.font = null
        },
        render: function(a) {
            if (this.visible) {
                Sb.oldColor = a.get_color();
                a.set_font(this.font);
                a.set_fontSize(this.fontSize);
                a.set_color(this.color);
                var b = this.parent.get_x() + this.offsetX,
                    c = this.parent.get_y() + this.offsetY,
                    d = 0,
                    e = 0,
                    f = 0,
                    g = 0,
                    d = this.texts.length,
                    l = a.get_font().height(this.fontSize);
                switch (this.valign[1]) {
                    case 0:
                        f = c;
                        break;
                    case 1:
                        g = -(d - 1) * l / 2;
                        f = c - l / 2;
                        break;
                    case 2:
                        g = -(d - 1) * l, f = c - l
                }
                for (var c = 0, k = this.texts; c < k.length;) {
                    var m = k[c];
                    ++c;
                    d = a.get_font().width(this.fontSize, m);
                    switch (this.halign[1]) {
                        case 0:
                            e = b;
                            break;
                        case 1:
                            e = b - d / 2;
                            break;
                        case 2:
                            e = b - d
                    }
                    a.drawString(m, e, f + g);
                    Sb.WYN_DEBUG && a.drawRect(e, f + g, d, l);
                    g += l
                }
                a.set_color(Sb.oldColor)
            }
        },
        set_text: function(a) {
            if (this.text == a) return this.text;
            this.text = a;
            this.texts = (new Fb("[\n\r]", "g")).split(a);
            return a
        },
        __class__: Sb,
        __properties__: T(wa.prototype.__properties__, {
            set_text: "set_text"
        })
    });
    var ma = m["wyn.manager.InputState"] = {
        __ename__: ["wyn", "manager", "InputState"],
        __constructs__: ["NONE", "DOWN", "HELD", "UP"]
    };
    ma.NONE = ["NONE", 0];
    ma.NONE.toString = x;
    ma.NONE.__enum__ = ma;
    ma.DOWN = ["DOWN", 1];
    ma.DOWN.toString = x;
    ma.DOWN.__enum__ = ma;
    ma.HELD = ["HELD", 2];
    ma.HELD.toString = x;
    ma.HELD.__enum__ = ma;
    ma.UP = ["UP", 3];
    ma.UP.toString = x;
    ma.UP.__enum__ = ma;
    var Wa = function() {
        this.active = !0
    };
    m["wyn.manager.WynManager"] = Wa;
    Wa.__name__ = ["wyn", "manager", "WynManager"];
    Wa.prototype = {
        active: null,
        update: function() {},
        reset: function() {},
        __class__: Wa
    };
    var D = function() {
        this.active = !0;
        xb.get().notify(M(this, this.onKeyDown), M(this, this.onKeyUp));
        D.keysDown = new Ja;
        D.keysHeld = new Ja;
        D.keysUp = new Ja;
        D.downListener = [];
        D.upListener = []
    };
    m["wyn.manager.WynKeyboard"] = D;
    D.__name__ = ["wyn", "manager", "WynKeyboard"];
    D.isDown = function(a) {
        return D.keysDown.exists(a)
    };
    D.isHeld = function(a) {
        return D.keysHeld.get(a)
    };
    D.isUp = function(a) {
        return D.keysUp.exists(a)
    };
    D.isAny = function() {
        return 0 < D.keysCount
    };
    D.isAnyDown = function() {
        return D.keysJustPressed
    };
    D.notifyDown = function(a) {
        -1 == v.indexOf(D.downListener, a, 0) && D.downListener.push(a)
    };
    D.notifyUp = function(a) {
        -1 == v.indexOf(D.upListener, a, 0) && D.upListener.push(a)
    };
    D.removeDown = function(a) {
        v.remove(D.downListener, a)
    };
    D.removeUp = function(a) {
        v.remove(D.upListener, a)
    };
    D.__super__ = Wa;
    D.prototype = T(Wa.prototype, {
        update: function() {
            for (var a = D.keysDown.keys(); a.hasNext();) {
                var b = a.next();
                D.keysDown.remove(b)
            }
            for (a = D.keysUp.keys(); a.hasNext();) b = a.next(), D.keysUp.remove(b);
            D.keysJustPressed = !1
        },
        reset: function() {
            Wa.prototype.reset.call(this);
            for (var a = D.keysDown.keys(); a.hasNext();) {
                var b = a.next();
                D.keysDown.remove(b)
            }
            for (a = D.keysHeld.keys(); a.hasNext();) b = a.next(), D.keysHeld.remove(b);
            for (a = D.keysUp.keys(); a.hasNext();) b = a.next(), D.keysUp.remove(b);
            for (; 0 < D.downListener.length;) D.downListener.pop();
            for (; 0 < D.upListener.length;) D.upListener.pop()
        },
        onKeyDown: function(a, b) {
            for (var c = 0, d = D.downListener; c < d.length;) {
                var e = d[c];
                ++c;
                e(a[0].toLowerCase())
            }
            a == y.CHAR ? (D.keysDown.set(b, !0), D.keysHeld.set(b, !0)) : (c = a[0].toLowerCase(), D.keysDown.set(c, !0), c = a[0].toLowerCase(), D.keysHeld.set(c, !0));
            D.keysCount++;
            D.keysJustPressed = !0
        },
        onKeyUp: function(a, b) {
            for (var c = 0, d = D.upListener; c < d.length;) {
                var e = d[c];
                ++c;
                e(a[0].toLowerCase())
            }
            a == y.CHAR ? (D.keysUp.set(b, !0), D.keysHeld.set(b, !1)) : (c = a[0].toLowerCase(), D.keysUp.set(c, !0), c = a[0].toLowerCase(), D.keysHeld.set(c, !1));
            D.keysCount--
        },
        __class__: D
    });
    var I = function() {
        this.active = !0;
        Ea.get().notify(M(this, this.onMouseStart), M(this, this.onMouseEnd), M(this, this.onMouseMove), M(this, this.onMouseWheel));
        I.mouseDown = new Fa;
        I.mouseHeld = new Fa;
        I.mouseUp = new Fa;
        I.init = !0
    };
    m["wyn.manager.WynMouse"] = I;
    I.__name__ = ["wyn", "manager", "WynMouse"];
    I.isDown = function(a) {
        null == a && (a = 0);
        return I.init && I.mouseDown.h.hasOwnProperty(a)
    };
    I.isHeld = function(a) {
        null == a && (a = 0);
        return I.init && I.mouseHeld.h.hasOwnProperty(a)
    };
    I.isUp = function(a) {
        null == a && (a = 0);
        return I.init && I.mouseUp.h.hasOwnProperty(a)
    };
    I.isAny = function() {
        return I.init && 0 < I.mouseCount
    };
    I.isAnyDown = function() {
        return I.init && I.mouseJustPressed
    };
    I.notifyStart = function(a) {
        I.init && Ea.get().notify(a, null, null, null)
    };
    I.notifyEnd = function(a) {
        I.init && Ea.get().notify(null, a, null, null)
    };
    I.notifyMove = function(a) {
        I.init && Ea.get().notify(null, null, a, null)
    };
    I.removeStart = function(a) {
        I.init && Ea.get().remove(a, null, null, null)
    };
    I.removeEnd = function(a) {
        I.init && Ea.get().remove(null, a, null, null)
    };
    I.removeMove = function(a) {
        I.init && Ea.get().remove(null, null, a, null)
    };
    I.__super__ = Wa;
    I.prototype = T(Wa.prototype, {
        update: function() {
            for (var a = I.mouseDown.keys(); a.hasNext();) {
                var b = a.next();
                I.mouseDown.remove(b)
            }
            for (a = I.mouseUp.keys(); a.hasNext();) b = a.next(), I.mouseUp.remove(b);
            I.mouseJustPressed = !1
        },
        reset: function() {
            Wa.prototype.reset.call(this);
            for (var a = I.mouseDown.keys(); a.hasNext();) {
                var b = a.next();
                I.mouseDown.remove(b)
            }
            for (a = I.mouseHeld.keys(); a.hasNext();) b = a.next(), I.mouseHeld.remove(b);
            for (a = I.mouseUp.keys(); a.hasNext();) b = a.next(), I.mouseUp.remove(b)
        },
        onMouseStart: function(a, b, c) {
            this.updateMouseData(b, c, 0, 0);
            I.mouseDown.h[a] = !0;
            I.mouseHeld.h[a] = !0;
            I.mouseCount++;
            I.mouseJustPressed = !0
        },
        onMouseEnd: function(a, b, c) {
            this.updateMouseData(b, c, 0, 0);
            I.mouseUp.h[a] = !0;
            I.mouseHeld.remove(a);
            I.mouseCount--
        },
        onMouseMove: function(a, b, c, d) {
            this.updateMouseData(a, b, c, d)
        },
        updateMouseData: function(a, b, c, d) {
            I.rawX = a;
            I.rawY = b;
            I.x = a / p.gameScale - p.screenOffsetX | 0;
            I.y = b / p.gameScale - p.screenOffsetY | 0;
            I.dx = c / p.gameScale | 0;
            I.dy = d / p.gameScale | 0
        },
        onMouseWheel: function(a) {
            R.trace("onMouseWheel : " + a, {
                fileName: "WynMouse.hx",
                lineNumber: 108,
                className: "wyn.manager.WynMouse",
                methodName: "onMouseWheel"
            })
        },
        __class__: I
    });
    var z = function() {
        this.active = !0;
        Ma.get().notify(M(this, this.onTouchStart), M(this, this.onTouchEnd), M(this, this.onTouchMove));
        z.touches = new Fa;
        z.init = !0
    };
    m["wyn.manager.WynTouch"] = z;
    z.__name__ = ["wyn", "manager", "WynTouch"];
    z.isDown = function(a) {
        null == a && (a = 0);
        return z.init && z.touches.h.hasOwnProperty(a) ? z.touches.h[a].state == ma.DOWN : !1
    };
    z.isHeld = function(a) {
        null == a && (a = 0);
        return z.init && z.touches.h.hasOwnProperty(a) ? z.touches.h[a].state == ma.HELD : !1
    };
    z.isUp = function(a) {
        null == a && (a = 0);
        return z.init && z.touches.h.hasOwnProperty(a) ? z.touches.h[a].state == ma.UP : !1
    };
    z.isAny = function() {
        return z.init && 0 < z.touchCount
    };
    z.isAnyDown = function() {
        return z.init && z.touchJustPressed
    };
    z.notifyStart = function(a) {
        z.init && Ma.get().notify(a, null, null)
    };
    z.notifyEnd = function(a) {
        z.init && Ma.get().notify(null, a, null)
    };
    z.notifyMove = function(a) {
        z.init && Ma.get().notify(null, null, a)
    };
    z.removeStart = function(a) {
        z.init && Ma.get().remove(a, null, null)
    };
    z.removeEnd = function(a) {
        z.init && Ma.get().remove(null, a, null)
    };
    z.removeMove = function(a) {
        z.init && Ma.get().remove(null, null, a)
    };
    z.__super__ = Wa;
    z.prototype = T(Wa.prototype, {
        update: function() {
            for (var a = z.touches.keys(); a.hasNext();) {
                var b = a.next(),
                    b = z.touches.h[b];
                null != b && (b.state == ma.DOWN ? b.state = ma.HELD : b.state == ma.UP && (b.state = ma.NONE))
            }
            z.touchJustPressed = !1
        },
        reset: function() {
            Wa.prototype.reset.call(this);
            for (var a = z.touches.keys(); a.hasNext();) {
                var b = a.next();
                z.touches.remove(b)
            }
        },
        onTouchStart: function(a, b, c) {
            I.init = !1;
            z.touches.h.hasOwnProperty(a) ? (z.touches.h[a].x = b / p.gameScale - p.screenOffsetX | 0, z.touches.h[a].y = c / p.gameScale - p.screenOffsetY | 0, z.touches.h[a].dx = E["int"]((b - z.touches.h[a].x) / p.gameScale), z.touches.h[a].dy = E["int"]((c - z.touches.h[a].y) / p.gameScale)) : z.touches.h[a] = {
                x: b / p.gameScale - p.screenOffsetX | 0,
                y: c / p.gameScale - p.screenOffsetY | 0,
                dx: 0,
                dy: 0,
                state: ma.NONE
            };
            z.touches.h[a].state = ma.DOWN;
            z.touchCount++;
            z.touchJustPressed = !0
        },
        onTouchEnd: function(a, b, c) {
            z.touches.h.hasOwnProperty(a) ? (z.touches.h[a].x = b / p.gameScale - p.screenOffsetX | 0, z.touches.h[a].y = c / p.gameScale - p.screenOffsetY | 0, z.touches.h[a].dx = E["int"]((b - z.touches.h[a].x) / p.gameScale), z.touches.h[a].dy = E["int"]((c - z.touches.h[a].y) / p.gameScale)) : z.touches.h[a] = {
                x: b / p.gameScale - p.screenOffsetX | 0,
                y: c / p.gameScale - p.screenOffsetY | 0,
                dx: 0,
                dy: 0,
                state: ma.NONE
            };
            z.touches.h[a].state = ma.UP;
            z.touchCount--
        },
        onTouchMove: function(a, b, c) {
            z.touches.h.hasOwnProperty(a) ? (z.touches.h[a].x = b / p.gameScale - p.screenOffsetX | 0, z.touches.h[a].y = c / p.gameScale - p.screenOffsetY | 0, z.touches.h[a].dx = E["int"]((b - z.touches.h[a].x) / p.gameScale), z.touches.h[a].dy = E["int"]((c - z.touches.h[a].y) / p.gameScale)) : z.touches.h[a] = {
                x: b / p.gameScale - p.screenOffsetX | 0,
                y: c / p.gameScale - p.screenOffsetY | 0,
                dx: 0,
                dy: 0,
                state: ma.NONE
            }
        },
        updateTouch: function(a, b, c) {
            z.touches.h.hasOwnProperty(a) ? (z.touches.h[a].x = b / p.gameScale - p.screenOffsetX | 0, z.touches.h[a].y = c / p.gameScale - p.screenOffsetY | 0, z.touches.h[a].dx = E["int"]((b - z.touches.h[a].x) / p.gameScale), z.touches.h[a].dy = E["int"]((c - z.touches.h[a].y) / p.gameScale)) : z.touches.h[a] = {
                x: b / p.gameScale - p.screenOffsetX | 0,
                y: c / p.gameScale - p.screenOffsetY | 0,
                dx: 0,
                dy: 0,
                state: ma.NONE
            }
        },
        __class__: z
    });
    var N = function() {
        this.active = !0;
        N.instance = this;
        this.queue = []
    };
    m["wyn.manager.WynTween"] = N;
    N.__name__ = ["wyn", "manager", "WynTween"];
    N.tween = function(a, b, c, d, e, f) {
        null == e && (e = 0);
        null == d && (d = 0);
        null == c && (c = 1);
        if (null == a) throw new u("Cannot tween null target.");
        if (null == b) throw new u("Cannot tween null props.");
        N.instance.addToQueue({
            target: a,
            props: b,
            elapsed: 0,
            duration: c,
            ease: d,
            callback: f,
            paused: !1
        }, e)
    };
    N.pause = function(a) {
        for (var b = N.instance.queue, c = 0, d = b.length; c < d;) {
            var e = c++;
            b[e].target == a && (b[e].paused = !0)
        }
    };
    N.resume = function(a) {
        for (var b = N.instance.queue, c = 0, d = b.length; c < d;) {
            var e = c++;
            b[e].target == a && (b[e].paused = !1)
        }
    };
    N.cancel = function(a, b) {
        null == b && (b = 0);
        for (var c = 0, d = N.instance.queue, e = null; c < d.length;)
            if (e = d[c], e.target == a) {
                if (0 != b)
                    for (var f = Q.fields(e.props), g = 0; g < f.length;) {
                        var l = f[g];
                        ++g;
                        var k = Q.getProperty(e.props, l);
                        1 == b ? Q.setProperty(e.target, l, k.from) : 2 == b && Q.setProperty(e.target, l, k.to)
                    }
                v.remove(d, e)
            } else c++
    };
    N.clear = function() {
        N.instance.queue = []
    };
    N.__super__ = Wa;
    N.prototype = T(Wa.prototype, {
        queue: null,
        update: function() {
            for (var a = 0, b = null, c, d, e, f; a < this.queue.length;)
                if (b = this.queue[a], b.paused) a++;
                else {
                    b.elapsed += p.dt;
                    b.elapsed >= b.duration && (b.elapsed = b.duration);
                    c = b.elapsed;
                    f = b.duration;
                    c /= f;
                    f = Q.fields(b.props);
                    for (var g = 0; g < f.length;) {
                        var l = f[g];
                        ++g;
                        var k = Q.getProperty(b.props, l);
                        d = k.from;
                        e = k.to - k.from;
                        switch (b.ease) {
                            case 1:
                                d += K.easeInQuad(c) * e;
                                break;
                            case 2:
                                d += K.easeOutQuad(c) * e;
                                break;
                            case 3:
                                d += K.easeInOutQuad(c) * e;
                                break;
                            case 4:
                                d += K.easeInCubic(c) * e;
                                break;
                            case 5:
                                d += K.easeOutCubic(c) * e;
                                break;
                            case 6:
                                d += K.easeInOutCubic(c) * e;
                                break;
                            case 7:
                                d += K.easeInQuart(c) * e;
                                break;
                            case 8:
                                d += K.easeOutQuart(c) * e;
                                break;
                            case 9:
                                d += K.easeInOutQuart(c) * e;
                                break;
                            case 10:
                                d += K.easeInQuint(c) * e;
                                break;
                            case 11:
                                d += K.easeOutQuint(c) * e;
                                break;
                            case 12:
                                d += K.easeInOutQuint(c) * e;
                                break;
                            case 13:
                                d += K.easeInSine(c) * e;
                                break;
                            case 14:
                                d += K.easeOutSine(c) * e;
                                break;
                            case 15:
                                d += K.easeInOutSine(c) * e;
                                break;
                            case 16:
                                d += K.easeInExpo(c) * e;
                                break;
                            case 17:
                                d += K.easeOutExpo(c) * e;
                                break;
                            case 18:
                                d += K.easeInOutExpo(c) * e;
                                break;
                            case 19:
                                d += K.easeInCirc(c) * e;
                                break;
                            case 20:
                                d += K.easeOutCirc(c) * e;
                                break;
                            case 21:
                                d += K.easeInOutCirc(c) * e;
                                break;
                            case 22:
                                d += K.easeInElastic(c) * e;
                                break;
                            case 23:
                                d += K.easeOutElastic(c) * e;
                                break;
                            case 24:
                                d += K.easeInOutElastic(c) * e;
                                break;
                            case 25:
                                d += K.easeInBack(c) * e;
                                break;
                            case 26:
                                d += K.easeOutBack(c) * e;
                                break;
                            case 27:
                                d += K.easeInOutBack(c) * e;
                                break;
                            case 28:
                                d += K.easeInBounce(c) * e;
                                break;
                            case 29:
                                d += K.easeOutBounce(c) * e;
                                break;
                            case 30:
                                d += K.easeInOutBounce(c) * e;
                                break;
                            default:
                                d += K.linear(c) * e
                        }
                        isNaN(d) && (d = k.to);
                        Q.setProperty(b.target, l, d)
                    }
                    b.elapsed >= b.duration ? (v.remove(this.queue, b), null != b.callback && b.callback()) : a++
                }
        },
        reset: function() {
            Wa.prototype.reset.call(this);
            this.queue = []
        },
        addToQueue: function(a, b) {
            for (var c = this.queue.length, d = 0; d < c;) {
                var e = d++;
                if (a.target == this.queue[e].target) {
                    c = this.queue[e];
                    c.elapsed = 0;
                    c.duration = a.duration;
                    c.ease = a.ease;
                    c.callback = a.callback;
                    c.paused = !1;
                    for (var d = Q.fields(c.props), f = 0; f < d.length;) {
                        var g = d[f];
                        ++f;
                        var l = Q.getProperty(c.props, g),
                            k = Q.getProperty(a.props, g);
                        if (null == k.from) switch (b) {
                            case 0:
                                k.from = Q.getProperty(a.target, g);
                                break;
                            case 1:
                                k.from = l.from;
                                break;
                            case 2:
                                k.from = l.to
                        }
                        Q.setProperty(c.props, g, k)
                    }
                    this.queue[e] = c;
                    return
                }
            }
            e = Q.fields(a.props);
            for (c = 0; c < e.length;) d = e[c], ++c, f = Q.getProperty(a.props, d), null == f.from && (f.from = Q.getProperty(a.target, d));
            this.queue.push(a)
        },
        __class__: N
    });
    var S = function() {};
    m["wyn.util.WynAtlas"] = S;
    S.__name__ = ["wyn", "util", "WynAtlas"];
    S.loadAtlasShoebox = function(a, b, c) {
        c = H.parse(c.toString()).firstElement();
        var d = new Vb(c);
        c = new Ja;
        for (var e = [], d = d.nodes.resolve("SubTexture").iterator(); null != d.head;) {
            var f, g = void 0;
            d.val = d.head[0];
            d.head = d.head[1];
            f = g = d.val;
            g = {
                x: E.parseInt(f.att.resolve("x")),
                y: E.parseInt(f.att.resolve("y")),
                w: E.parseInt(f.att.resolve("width")),
                h: E.parseInt(f.att.resolve("height"))
            };
            f = f.att.resolve("name");
            null != qb[f] ? c.setReserved(f, g) : c.h[f] = g;
            e.push(g)
        }
        S.atlasDict.set(a, {
            atlas: b,
            name: a,
            regionMap: c,
            regionArr: e
        })
    };
    S.getRegionByName = function(a, b) {
        if (S.atlasDict.exists(a)) {
            var c = S.atlasDict.get(a);
            if (c.regionMap.exists(b)) return c.regionMap.get(b)
        }
        R.trace("getRegionByName not found : " +
            a + " , " + b, {
                fileName: "WynAtlas.hx",
                lineNumber: 57,
                className: "wyn.util.WynAtlas",
                methodName: "getRegionByName"
            });
        return null
    };
    S.getRegionsByName = function(a, b) {
        if (S.atlasDict.exists(a)) {
            for (var c = [], d = S.atlasDict.get(a), e = 0; e < b.length;) {
                var f = b[e];
                ++e;
                d.regionMap.exists(f) ? c.push(d.regionMap.get(f)) : R.trace("subTexture not found : " + f, {
                    fileName: "WynAtlas.hx",
                    lineNumber: 73,
                    className: "wyn.util.WynAtlas",
                    methodName: "getRegionsByName"
                })
            }
            return c
        }
        R.trace("getRegionByNames not found : " + a, {
            fileName: "WynAtlas.hx",
            lineNumber: 79,
            className: "wyn.util.WynAtlas",
            methodName: "getRegionsByName"
        });
        return null
    };
    S.getRegionByIndex = function(a, b) {
        if (S.atlasDict.exists(a)) return S.atlasDict.get(a).regionArr[b];
        R.trace("getRegionByIndex not found : " + a + " , " + b, {
            fileName: "WynAtlas.hx",
            lineNumber: 91,
            className: "wyn.util.WynAtlas",
            methodName: "getRegionByIndex"
        });
        return null
    };
    var K = function() {};
    m["wyn.util.WynMath"] = K;
    K.__name__ = ["wyn", "util", "WynMath"];
    K.clamp = function(a, b, c) {
        return a < b ? b : a > c ? c : a
    };
    K.clamp01 = function(a) {
        0 > a && (a = 0);
        1 < a && (a = 1);
        return a
    };
    K.linear = function(a) {
        return a
    };
    K.easeInQuad = function(a) {
        return K.easeIn(a)
    };
    K.easeIn = function(a) {
        return a * a
    };
    K.easeOutQuad = function(a) {
        return K.easeOut(a)
    };
    K.easeOut = function(a) {
        return a * (2 - a)
    };
    K.easeInOutQuad = function(a) {
        return 1 > (a *= 2) ? .5 * a * a : -.5 * (--a * (a - 2) - 1)
    };
    K.easeInCubic = function(a) {
        return a * a * a
    };
    K.easeOutCubic = function(a) {
        return --a * a * a + 1
    };
    K.easeInOutCubic = function(a) {
        return K.easeInOut(a)
    };
    K.easeInOut = function(a) {
        return 1 > (a *= 2) ? .5 * a * a * a : .5 * ((a -= 2) * a * a + 2)
    };
    K.easeInQuart = function(a) {
        return a * a * a * a
    };
    K.easeOutQuart = function(a) {
        return -1 * (--a * a * a * a - 1)
    };
    K.easeInOutQuart = function(a) {
        return 1 > (a *= 2) ? .5 * a * a * a * a : -.5 * ((a -= 2) * a * a * a - 2)
    };
    K.easeInQuint = function(a) {
        return a * a * a * a * a
    };
    K.easeOutQuint = function(a) {
        return --a * a * a * a * a + 1
    };
    K.easeInOutQuint = function(a) {
        return 1 > (a *= 2) ? .5 * a * a * a * a * a : .5 * ((a -= 2) * a * a * a * a + 2)
    };
    K.easeInSine = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : -1 * Math.cos(Math.PI / 2 * a) + 1
    };
    K.easeOutSine = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : Math.sin(Math.PI / 2 * a)
    };
    K.easeInOutSine = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : -.5 * (Math.cos(Math.PI * a) - 1)
    };
    K.easeInExpo = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : 0 == a ? 0 : Math.pow(2, 10 * (a - 1))
    };
    K.easeOutExpo = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : 1 == a ? 1 : -Math.pow(2, -10 * a) + 1
    };
    K.easeInOutExpo = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : 1 > (a *= 2) ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (-Math.pow(2, -10 * --a) + 2)
    };
    K.easeInCirc = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : -1 * (Math.sqrt(1 - a * a) - 1)
    };
    K.easeOutCirc = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : Math.sqrt(1 - --a * a)
    };
    K.easeInOutCirc = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : 1 > (a *= 2) ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
    };
    K.easeInElastic = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : -(Math.pow(2, 10 * --a) * Math.sin(2 * (a - .075) * Math.PI / .3))
    };
    K.easeOutElastic = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : Math.pow(2, -10 * a) * Math.sin(2 * (a - .075) * Math.PI / .3) + 1
    };
    K.easeInOutElastic = function(a) {
        return 0 == a ? 0 : 2 == (a *= 2) ? 1 : 1 > a ? -.5 * Math.pow(2, 10 * --a) * Math.sin(2 * (a - .1125) * Math.PI / .45) : Math.pow(2, -10 * --a) * Math.sin(2 * (a - .1125) * Math.PI / .45) * .5 + 1
    };
    K.easeInBack = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : a * a * (2.70158 * a - 1.70158)
    };
    K.easeOutBack = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : --a * a * (2.70158 * a + 1.70158) + 1
    };
    K.easeInOutBack = function(a) {
        if (0 == a) return 0;
        if (1 == a) return 1;
        var b = 1.70158;
        return 1 > (a *= 2) ? .5 * a * a * (((b *= 1.525) + 1) * a - b) : .5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2)
    };
    K.easeOutBounce = function(a) {
        return 0 == a ? 0 : 1 == a ? 1 : .36363636363636365 > a ? 7.5625 * a * a : .7272727272727273 > a ? 7.5625 * (a -= .5454545454545454) * a + .75 : .9090909090909091 > a ? 7.5625 * (a -= .8181818181818182) * a + .9375 : 7.5625 * (a -= .9545454545454546) * a + .984375
    };
    K.easeInBounce = function(a) {
        return 1 -
            K.easeOutBounce(1 - a)
    };
    K.easeInOutBounce = function(a) {
        return .5 > a ? .5 * K.easeInBounce(2 * a) : .5 * K.easeOutBounce(2 * a - 1) + .5
    };
    var Dc = function() {
        this.length = 0;
        this.members = []
    };
    m["wyn.util.WynPool"] = Dc;
    Dc.__name__ = ["wyn", "util", "WynPool"];
    Dc.prototype = {
        members: null,
        length: null,
        enabledCount: null,
        activeCount: null,
        visibleCount: null,
        add: function(a) {
            if (null == a) return R.trace("Cannot add null object to pool", {
                fileName: "WynPool.hx",
                lineNumber: 29,
                className: "wyn.util.WynPool",
                methodName: "add"
            }), null;
            if (0 <= v.indexOf(this.members, a, 0)) return a;
            var b = this.getFirstNull();
            if (-1 != b) return this.members[b] = a, b >= this.length && (this.length = b + 1), a;
            this.members.push(a);
            this.length++;
            return a
        },
        remove: function(a) {
            var b = v.indexOf(this.members, a, 0);
            if (0 > b) return null;
            this.members[b] = null;
            return a
        },
        recycle: function() {
            var a = this.getFirstAvailable();
            null != a && a.revive();
            return a
        },
        kill: function() {
            for (var a = 0, b = this.members; a < b.length;) {
                var c = b[a];
                ++a;
                c.kill()
            }
        },
        getFirstAvailable: function() {
            for (var a = 0, b = this.members; a < b.length;) {
                var c = b[a];
                ++a;
                if (null != c && !c.active) return c
            }
            return null
        },
        getFirstNull: function() {
            for (var a = 0; a < this.length;) {
                if (null == this.members[a]) return a;
                a++
            }
            return -1
        },
        getFirstEnabled: function() {
            for (var a = 0, b = this.members; a < b.length;) {
                var c = b[a];
                ++a;
                if (null != c && c.active) return c
            }
            return null
        },
        forEach: function(a) {
            for (var b = 0, c = this.members; b < c.length;) {
                var d = c[b];
                ++b;
                null != d && a(d)
            }
        },
        forEachEnabled: function(a) {
            for (var b = 0, c = this.members; b < c.length;) {
                var d = c[b];
                ++b;
                null != d && d.enabled && a(d)
            }
        },
        forEachActive: function(a) {
            for (var b = 0, c = this.members; b < c.length;) {
                var d = c[b];
                ++b;
                null != d && d.active && a(d)
            }
        },
        forEachVisible: function(a) {
            for (var b = 0, c = this.members; b < c.length;) {
                var d = c[b];
                ++b;
                null != d && d.visible && a(d)
            }
        },
        get_enabledCount: function() {
            for (var a = 0, b = 0, c = this.length; b < c;) {
                var d = b++;
                this.members[d].enabled && a++
            }
            return a
        },
        get_activeCount: function() {
            for (var a = 0, b = 0, c = this.length; b < c;) {
                var d = b++;
                this.members[d].active && a++
            }
            return a
        },
        get_visibleCount: function() {
            for (var a = 0, b = 0, c = this.length; b < c;) {
                var d = b++;
                this.members[d].visible && a++
            }
            return a
        },
        __class__: Dc,
        __properties__: {
            get_visibleCount: "get_visibleCount",
            get_activeCount: "get_activeCount",
            get_enabledCount: "get_enabledCount"
        }
    };
    var la = function() {};
    m["wyn.util.WynUtil"] = la;
    la.__name__ = ["wyn", "util", "WynUtil"];
    la.radToDeg = function(a) {
        return 180 / Math.PI * a
    };
    la.degToRad = function(a) {
        return Math.PI / 180 * a
    };
    la.randomInCircle = function() {
        var a;
        a = Math.random() * (.5 < Math.random() ? -1 : 1);
        var b;
        b = Math.random() * (.5 < Math.random() ? -1 : 1);
        return new ca(a, b)
    };
    la.randomOnCircle = function() {
        var a = la.randomInCircle();
        a.set_length(1);
        return a
    };
    la.randomFloat = function(a, b) {
        if (a == b) return a;
        var c = 0;
        if (a > b) return c = Math.random() * (a - b), b + c;
        c = Math.random() * (b - a);
        return a + c
    };
    la.randomInt = function(a, b) {
        if (a == b) return a;
        var c = 0;
        if (a > b) return c = Math.round(Math.random() * (a - b)), b + c;
        c = Math.round(Math.random() * (b - a));
        return a + c
    };
    la.radToVector = function(a) {
        return new ca(Math.cos(a), Math.sin(a))
    };
    la.degToVector = function(a) {
        return la.radToVector(Math.PI / 180 * a)
    };
    la.roundToPrecision = function(a, b, c) {
        null == c && (c = 1);
        return 0 == c ? Math.round(a * Math.pow(10, b)) / Math.pow(10, b) : 1 == c ? Math.floor(a * Math.pow(10, b)) / Math.pow(10, b) : Math.ceil(a * Math.pow(10, b)) / Math.pow(10, b)
    };
    la.roundToPrecisionString = function(a, b, c, d) {
        null == d && (d = 1);
        null == c && (c = ".");
        var e = 0,
            e = 0 == d ? Math.round(a * Math.pow(10, b)) : 1 == d ? Math.floor(a * Math.pow(10, b)) : Math.ceil(a * Math.pow(10, b));
        a = "" + e;
        d = a.length;
        if (d <= b) {
            for (; d < b;) a = "0" + a, d++;
            return "0" + c + a
        }
        return v.substr(a, 0, a.length - b) + c + v.substr(a, a.length - b, null)
    };
    la.createRectImage = function(a, b, c) {
        var d = va.createRenderTarget(a, b);
        d.get_g2().begin(!0, 0);
        d.get_g2().set_color(c);
        d.get_g2().drawRect(0, 0, a, b);
        d.get_g2().end();
        return d
    };
    la.createRectImageFilled = function(a, b, c) {
        var d = va.createRenderTarget(a, b);
        d.get_g2().begin(!0, 0);
        d.get_g2().set_color(c);
        d.get_g2().fillRect(0, 0, a, b);
        d.get_g2().end();
        return d
    };
    var ga, ie = 0;
    Array.prototype.indexOf && (v.indexOf = function(a, b, c) {
        return Array.prototype.indexOf.call(a, b, c)
    });
    m.Math = Math;
    String.prototype.__class__ = m.String = String;
    String.__name__ = ["String"];
    m.Array = Array;
    Array.__name__ = ["Array"];
    Date.prototype.__class__ = m.Date = Date;
    Date.__name__ = ["Date"];
    var je = m.Int = {
            __name__: ["Int"]
        },
        ke = m.Dynamic = {
            __name__: ["Dynamic"]
        },
        ge = m.Float = Number;
    ge.__name__ = ["Float"];
    var he = m.Bool = Boolean;
    he.__ename__ = ["Bool"];
    var ee = m.Class = {
            __name__: ["Class"]
        },
        fe = {},
        qb = {},
        Md = Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null")() || ib;
    null == Md.prototype.slice && (Md.prototype.slice = ib.sliceImpl);
    var eb = Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null")() || vb._new;
    fa.ID = 0;
    xa.ID = 0;
    cb.STATE_DISABLED = 0;
    cb.STATE_TRANSITION = 1;
    cb.STATE_CONTINUE = 2;
    cb.STATE_GAMEOVER = 3;
    cb.STATE_ADS = 4;
    cb.ROUND_RESTART = 0;
    cb.ROUND_CONTINUE = 1;
    L.TRANSITION = 0;
    L.TITLE = 1;
    L.OPTION = 2;
    L.GAME = 3;
    L.DEATH = 4;
    L.GAMEOVER = 5;
    L.PAUSE = 6;
    L.LANE_SINGLE = 0;
    L.LANE_MULTI = 1;
    L.patternList = [
        [0, 0, 0],
        [0, 0, 0, 1],
        [0, 1, 0, 1],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0]
    ];
    L._adInterval = 90;
    L._gameElapsed = 0;
    L._bestGameElapsed = 0;
    L._adElapsed = 0;
    L.isNewHiscore = !1;
    L._continued = !1;
    Tb.FENCE = 0;
    Tb.BIRD = 1;
    Xa.NONE = 0;
    Xa.RUN = 1;
    Xa.JUMP_START = 2;
    Xa.JUMP_UP = 3;
    Xa.IDLE = 4;
    Xa.FALL = 5;
    Xa.HIT_WALL = 6;
    Xa.DEAD_FALL = 7;
    Xa.DEAD_GROUND = 8;
    Gb.gameDataId = "hurdles-1";
    H.Element = 0;
    H.PCData = 1;
    H.CData = 2;
    H.Comment = 3;
    H.DocType = 4;
    H.ProcessingInstruction = 5;
    H.Document = 6;
    db.USE_CACHE = !1;
    db.USE_ENUM_INDEX = !1;
    db.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    ra.DEFAULT_RESOLVER = V;
    ra.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    Jb.count = 0;
    ub.escapes = function(a) {
        a = new Ja;
        null != qb.lt ? a.setReserved("lt", "<") : a.h.lt = "<";
        null != qb.gt ? a.setReserved("gt", ">") : a.h.gt = ">";
        null != qb.amp ? a.setReserved("amp", "&") : a.h.amp = "&";
        null != qb.quot ? a.setReserved("quot", '"') : a.h.quot = '"';
        null != qb.apos ? a.setReserved("apos", "'") : a.h.apos = "'";
        return a
    }(this);
    G.__toStr = {}.toString;
    vb.BYTES_PER_ELEMENT = 1;
    B.images = new gc;
    B.sounds = new hc;
    B.blobs = new ic;
    B.fonts = new jc;
    B.videos = new kc;
    t.Black = t._new(-16777216);
    t.White = t._new(-1);
    t.Red = t._new(-65536);
    t.Blue = t._new(-16776961);
    t.Green = t._new(-16711936);
    t.Magenta = t._new(-65281);
    t.Yellow = t._new(-256);
    t.Cyan = t._new(-16711681);
    t.Purple = t._new(-8388480);
    t.Pink = t._new(-16181);
    t.Orange = t._new(-23296);
    t.invMaxChannelValue = .00392156862745098;
    Rc.Default = new Rc(!1, !1, !1);
    r.DIF_COUNT = 3;
    r.maxframetime = .5;
    r.startTime = 0;
    r.lastNow = 0;
    Z.painter_colored_fragData = "s204:I3ZlcnNpb24gMTAwCi8vIFVua25vd24gZXhlY3V0aW9uIG1vZGUgOApwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDsKdmFyeWluZyB2ZWM0IGZyYWdtZW50Q29sb3I7CgoKdm9pZCBtYWluKCkKewoJZ2xfRnJhZ0NvbG9yID0gZnJhZ21lbnRDb2xvcjsKCXJldHVybjsKfQoK";
    Z.painter_colored_vertData = "s424:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0Owp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKYXR0cmlidXRlIHZlYzMgdmVydGV4UG9zaXRpb247CnZhcnlpbmcgdmVjNCBmcmFnbWVudENvbG9yOwphdHRyaWJ1dGUgdmVjNCB2ZXJ0ZXhDb2xvcjsKCgp2b2lkIG1haW4oKQp7CglnbF9Qb3NpdGlvbiA9IChwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvblswXSwgdmVydGV4UG9zaXRpb25bMV0sIHZlcnRleFBvc2l0aW9uWzJdLCAxLjApKTsKCWZyYWdtZW50Q29sb3IgPSB2ZXJ0ZXhDb2xvcjsKCXJldHVybjsKfQoK";
    Z.painter_image_fragData = "s656:I3ZlcnNpb24gMTAwCi8vIFVua25vd24gZXhlY3V0aW9uIG1vZGUgOApwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDsKdW5pZm9ybSBzYW1wbGVyMkQgdGV4Owp2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7CnZhcnlpbmcgdmVjNCBjb2xvcjsKCgp2b2lkIG1haW4oKQp7Cgl2ZWM0IHRleGNvbG9yXzk7Cgl0ZXhjb2xvcl85ID0gKHRleHR1cmUyRCh0ZXgsIHRleENvb3JkKSAqIGNvbG9yKTsKCXRleGNvbG9yXzkgPSB2ZWM0KCh2ZWMzKHRleGNvbG9yXzlbMF0sIHRleGNvbG9yXzlbMV0sIHRleGNvbG9yXzlbMl0pICogY29sb3JbM10pWzBdLCAodmVjMyh0ZXhjb2xvcl85WzBdLCB0ZXhjb2xvcl85WzFdLCB0ZXhjb2xvcl85WzJdKSAqIGNvbG9yWzNdKVsxXSwgKHZlYzModGV4Y29sb3JfOVswXSwgdGV4Y29sb3JfOVsxXSwgdGV4Y29sb3JfOVsyXSkgKiBjb2xvclszXSlbMl0sIHRleGNvbG9yXzlbM10pOwoJZ2xfRnJhZ0NvbG9yID0gdGV4Y29sb3JfOTsKCXJldHVybjsKfQoK";
    Z.painter_image_vertData = "s504:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0Owp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKYXR0cmlidXRlIHZlYzMgdmVydGV4UG9zaXRpb247CnZhcnlpbmcgdmVjMiB0ZXhDb29yZDsKYXR0cmlidXRlIHZlYzIgdGV4UG9zaXRpb247CnZhcnlpbmcgdmVjNCBjb2xvcjsKYXR0cmlidXRlIHZlYzQgdmVydGV4Q29sb3I7CgoKdm9pZCBtYWluKCkKewoJZ2xfUG9zaXRpb24gPSAocHJvamVjdGlvbk1hdHJpeCAqIHZlYzQodmVydGV4UG9zaXRpb25bMF0sIHZlcnRleFBvc2l0aW9uWzFdLCB2ZXJ0ZXhQb3NpdGlvblsyXSwgMS4wKSk7Cgl0ZXhDb29yZCA9IHRleFBvc2l0aW9uOwoJY29sb3IgPSB2ZXJ0ZXhDb2xvcjsKCXJldHVybjsKfQoK";
    Z.painter_text_fragData = "s572:I3ZlcnNpb24gMTAwCi8vIFVua25vd24gZXhlY3V0aW9uIG1vZGUgOApwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDsKdmFyeWluZyB2ZWM0IGZyYWdtZW50Q29sb3I7CnVuaWZvcm0gc2FtcGxlcjJEIHRleDsKdmFyeWluZyB2ZWMyIHRleENvb3JkOwoKCnZvaWQgbWFpbigpCnsKCWdsX0ZyYWdDb2xvciA9IHZlYzQodmVjMyhmcmFnbWVudENvbG9yWzBdLCBmcmFnbWVudENvbG9yWzFdLCBmcmFnbWVudENvbG9yWzJdKVswXSwgdmVjMyhmcmFnbWVudENvbG9yWzBdLCBmcmFnbWVudENvbG9yWzFdLCBmcmFnbWVudENvbG9yWzJdKVsxXSwgdmVjMyhmcmFnbWVudENvbG9yWzBdLCBmcmFnbWVudENvbG9yWzFdLCBmcmFnbWVudENvbG9yWzJdKVsyXSwgKHRleHR1cmUyRCh0ZXgsIHRleENvb3JkKVswXSAqIGZyYWdtZW50Q29sb3JbM10pKTsKCXJldHVybjsKfQoK";
    Z.painter_text_vertData = "s526:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0Owp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKYXR0cmlidXRlIHZlYzMgdmVydGV4UG9zaXRpb247CnZhcnlpbmcgdmVjMiB0ZXhDb29yZDsKYXR0cmlidXRlIHZlYzIgdGV4UG9zaXRpb247CnZhcnlpbmcgdmVjNCBmcmFnbWVudENvbG9yOwphdHRyaWJ1dGUgdmVjNCB2ZXJ0ZXhDb2xvcjsKCgp2b2lkIG1haW4oKQp7CglnbF9Qb3NpdGlvbiA9IChwcm9qZWN0aW9uTWF0cml4ICogdmVjNCh2ZXJ0ZXhQb3NpdGlvblswXSwgdmVydGV4UG9zaXRpb25bMV0sIHZlcnRleFBvc2l0aW9uWzJdLCAxLjApKTsKCXRleENvb3JkID0gdGV4UG9zaXRpb247CglmcmFnbWVudENvbG9yID0gdmVydGV4Q29sb3I7CglyZXR1cm47Cn0KCg";
    Z.painter_video_fragData = "s656:I3ZlcnNpb24gMTAwCi8vIFVua25vd24gZXhlY3V0aW9uIG1vZGUgOApwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDsKdW5pZm9ybSBzYW1wbGVyMkQgdGV4Owp2YXJ5aW5nIHZlYzIgdGV4Q29vcmQ7CnZhcnlpbmcgdmVjNCBjb2xvcjsKCgp2b2lkIG1haW4oKQp7Cgl2ZWM0IHRleGNvbG9yXzk7Cgl0ZXhjb2xvcl85ID0gKHRleHR1cmUyRCh0ZXgsIHRleENvb3JkKSAqIGNvbG9yKTsKCXRleGNvbG9yXzkgPSB2ZWM0KCh2ZWMzKHRleGNvbG9yXzlbMF0sIHRleGNvbG9yXzlbMV0sIHRleGNvbG9yXzlbMl0pICogY29sb3JbM10pWzBdLCAodmVjMyh0ZXhjb2xvcl85WzBdLCB0ZXhjb2xvcl85WzFdLCB0ZXhjb2xvcl85WzJdKSAqIGNvbG9yWzNdKVsxXSwgKHZlYzModGV4Y29sb3JfOVswXSwgdGV4Y29sb3JfOVsxXSwgdGV4Y29sb3JfOVsyXSkgKiBjb2xvclszXSlbMl0sIHRleGNvbG9yXzlbM10pOwoJZ2xfRnJhZ0NvbG9yID0gdGV4Y29sb3JfOTsKCXJldHVybjsKfQoK";
    Z.painter_video_vertData = "s504:I3ZlcnNpb24gMTAwCnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0Owp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDsKYXR0cmlidXRlIHZlYzMgdmVydGV4UG9zaXRpb247CnZhcnlpbmcgdmVjMiB0ZXhDb29yZDsKYXR0cmlidXRlIHZlYzIgdGV4UG9zaXRpb247CnZhcnlpbmcgdmVjNCBjb2xvcjsKYXR0cmlidXRlIHZlYzQgdmVydGV4Q29sb3I7CgoKdm9pZCBtYWluKCkKewoJZ2xfUG9zaXRpb24gPSAocHJvamVjdGlvbk1hdHJpeCAqIHZlYzQodmVydGV4UG9zaXRpb25bMF0sIHZlcnRleFBvc2l0aW9uWzFdLCB2ZXJ0ZXhQb3NpdGlvblsyXSwgMS4wKSk7Cgl0ZXhDb29yZCA9IHRleFBvc2l0aW9uOwoJY29sb3IgPSB2ZXJ0ZXhDb2xvcjsKCXJldHVybjsKfQoK";
    F.renderListeners = [];
    F.foregroundListeners = [];
    F.resumeListeners = [];
    F.pauseListeners = [];
    F.backgroundListeners = [];
    F.shutdownListeners = [];
    g.maxGamepads = 4;
    g.leftMouseCtrlDown = !1;
    g.lastFirstTouchX = 0;
    g.lastFirstTouchY = 0;
    ha.channelCount = 16;
    fb.POLY = 79764919;
    rc.INVALID_BITS = -1;
    P.EOP = -1;
    P.M__PI = 3.141592653589793;
    P.DIVTAB_NUMER = 32;
    P.DIVTAB_DENOM = 64;
    P.INVERSE_DB_TABLE = [1.0649863E-7, 1.1341951E-7, 1.2079015E-7, 1.2863978E-7, 1.3699951E-7, 1.4590251E-7, 1.5538408E-7, 1.6548181E-7, 1.7623575E-7, 1.8768855E-7, 1.9988561E-7, 2.128753E-7, 2.2670913E-7, 2.4144197E-7, 2.5713223E-7, 2.7384213E-7, 2.9163793E-7, 3.1059021E-7, 3.3077411E-7, 3.5226968E-7, 3.7516214E-7, 3.9954229E-7, 4.255068E-7, 4.5315863E-7, 4.8260743E-7, 5.1396998E-7, 5.4737065E-7, 5.8294187E-7, 6.2082472E-7, 6.6116941E-7, 7.0413592E-7, 7.4989464E-7, 7.9862701E-7, 8.505263E-7, 9.0579828E-7, 9.6466216E-7, 1.0273513E-6, 1.0941144E-6, 1.1652161E-6, 1.2409384E-6, 1.3215816E-6, 1.4074654E-6, 1.4989305E-6, 1.5963394E-6, 1.7000785E-6, 1.8105592E-6, 1.9282195E-6, 2.0535261E-6, 2.1869758E-6, 2.3290978E-6, 2.4804557E-6, 2.6416497E-6, 2.813319E-6, 2.9961443E-6, 3.1908506E-6, 3.3982101E-6, 3.6190449E-6, 3.8542308E-6, 4.1047004E-6, 4.371447E-6, 4.6555282E-6, 4.9580707E-6, 5.280274E-6, 5.623416E-6, 5.9888572E-6, 6.3780469E-6, 6.7925283E-6, 7.2339451E-6, 7.7040476E-6, 8.2047E-6, 8.7378876E-6, 9.3057248E-6, 9.9104632E-6, 1.0554501E-5, 1.1240392E-5, 1.1970856E-5, 1.2748789E-5, 1.3577278E-5, 1.4459606E-5, 1.5399272E-5, 1.6400004E-5, 1.7465768E-5, 1.8600792E-5, 1.9809576E-5, 2.1096914E-5, 2.2467911E-5, 2.3928002E-5, 2.5482978E-5, 2.7139006E-5, 2.8902651E-5, 3.0780908E-5, 3.2781225E-5, 3.4911534E-5, 3.7180282E-5, 3.9596466E-5, 4.2169667E-5, 4.491009E-5, 4.7828601E-5, 5.0936773E-5, 5.4246931E-5, 5.7772202E-5, 6.1526565E-5, 6.5524908E-5, 6.9783085E-5, 7.4317983E-5, 7.9147585E-5, 8.429104E-5, 8.9768747E-5, 9.5602426E-5, 1.0181521E-4, 1.0843174E-4, 1.1547824E-4, 1.2298267E-4, 1.3097477E-4, 1.3948625E-4, 1.4855085E-4, 1.5820453E-4, 1.6848555E-4, 1.7943469E-4, 1.9109536E-4, 2.0351382E-4, 2.1673929E-4, 2.3082423E-4, 2.4582449E-4, 2.6179955E-4, 2.7881276E-4, 2.9693158E-4, 3.1622787E-4, 3.3677814E-4, 3.5866388E-4, 3.8197188E-4, 4.0679456E-4, 4.3323036E-4, 4.6138411E-4, 4.9136745E-4, 5.2329927E-4, 5.5730621E-4, 5.9352311E-4, 6.3209358E-4, 6.7317058E-4, 7.16917E-4, 7.635063E-4, 8.1312324E-4, 8.6596457E-4, 9.2223983E-4, 9.8217216E-4, .0010459992, .0011139742, .0011863665, .0012634633, .0013455702, .0014330129, .0015261382, .0016253153, .0017309374, .0018434235, .0019632195, .0020908006, .0022266726, .0023713743, .0025254795, .0026895994, .0028643847, .0030505286, .0032487691, .0034598925, .0036847358, .0039241906, .0041792066, .004450795, .0047400328, .0050480668, .0053761186, .0057254891, .0060975636, .0064938176, .0069158225, .0073652516, .0078438871, .0083536271, .0088964928, .009474637, .010090352, .01074608, .011444421, .012188144, .012980198, .013823725, .014722068, .015678791, .016697687, .017782797, .018938423, .020169149, .021479854, .022875735, .02436233, .025945531, .027631618, .029427276, .031339626, .033376252, .035545228, .037855157, .040315199, .042935108, .045725273, .048696758, .051861348, .055231591, .05882085, .062643361, .066714279, .071049749, .075666962, .080584227, .085821044, .091398179, .097337747, .1036633, .11039993, .11757434, .12521498, .13335215, .14201813, .15124727, .16107617, .1715438, .18269168, .19456402, .20720788, .22067342, .23501402, .25028656, .26655159, .28387361, .30232132, .32196786, .34289114, .36517414, .38890521, .41417847, .44109412, .4697589, .50028648, .53279791, .56742212, .6042964, .64356699, .68538959, .72993007, .77736504, .8278826, .88168307, .9389798, 1];
    Qb.NO_CODE = 255;
    Qb.delay = 0;
    Ab.PACKET_ID = 1;
    Ab.PACKET_COMMENT = 3;
    Ab.PACKET_SETUP = 5;
    zd.CONTINUED_PACKET = 1;
    zd.FIRST_PAGE = 2;
    zd.LAST_PAGE = 4;
    xc.MAX_CHANNELS = 16;
    xc.PUSHDATA_CRC_COUNT = 4;
    xc.FAST_HUFFMAN_LENGTH = 10;
    xc.FAST_HUFFMAN_TABLE_SIZE = 1024;
    xc.FAST_HUFFMAN_TABLE_MASK = 1023;
    l.STBTT_vmove = 1;
    l.STBTT_vline = 2;
    l.STBTT_vcurve = 3;
    l.STBTT_MACSTYLE_DONTCARE = 0;
    l.STBTT_MACSTYLE_BOLD = 1;
    l.STBTT_MACSTYLE_ITALIC = 2;
    l.STBTT_MACSTYLE_UNDERSCORE = 4;
    l.STBTT_MACSTYLE_NONE = 8;
    l.STBTT_PLATFORM_ID_UNICODE = 0;
    l.STBTT_PLATFORM_ID_MAC = 1;
    l.STBTT_PLATFORM_ID_ISO = 2;
    l.STBTT_PLATFORM_ID_MICROSOFT = 3;
    l.STBTT_UNICODE_EID_UNICODE_1_0 = 0;
    l.STBTT_UNICODE_EID_UNICODE_1_1 = 1;
    l.STBTT_UNICODE_EID_ISO_10646 = 2;
    l.STBTT_UNICODE_EID_UNICODE_2_0_BMP = 3;
    l.STBTT_UNICODE_EID_UNICODE_2_0_FULL = 4;
    l.STBTT_MS_EID_SYMBOL = 0;
    l.STBTT_MS_EID_UNICODE_BMP = 1;
    l.STBTT_MS_EID_SHIFTJIS = 2;
    l.STBTT_MS_EID_UNICODE_FULL = 10;
    l.STBTT_MAC_EID_ROMAN = 0;
    l.STBTT_MAC_EID_ARABIC = 4;
    l.STBTT_MAC_EID_JAPANESE = 1;
    l.STBTT_MAC_EID_HEBREW = 5;
    l.STBTT_MAC_EID_CHINESE_TRAD = 2;
    l.STBTT_MAC_EID_GREEK = 6;
    l.STBTT_MAC_EID_KOREAN = 3;
    l.STBTT_MAC_EID_RUSSIAN = 7;
    l.STBTT_MS_LANG_ENGLISH = 1033;
    l.STBTT_MS_LANG_ITALIAN = 1040;
    l.STBTT_MS_LANG_CHINESE = 2052;
    l.STBTT_MS_LANG_JAPANESE = 1041;
    l.STBTT_MS_LANG_DUTCH = 1043;
    l.STBTT_MS_LANG_KOREAN = 1042;
    l.STBTT_MS_LANG_FRENCH = 1036;
    l.STBTT_MS_LANG_RUSSIAN = 1049;
    l.STBTT_MS_LANG_GERMAN = 1031;
    l.STBTT_MS_LANG_SPANISH = 1033;
    l.STBTT_MS_LANG_HEBREW = 1037;
    l.STBTT_MS_LANG_SWEDISH = 1053;
    l.STBTT_MAC_LANG_ENGLISH = 0;
    l.STBTT_MAC_LANG_JAPANESE = 11;
    l.STBTT_MAC_LANG_ARABIC = 12;
    l.STBTT_MAC_LANG_KOREAN = 23;
    l.STBTT_MAC_LANG_DUTCH = 4;
    l.STBTT_MAC_LANG_RUSSIAN = 32;
    l.STBTT_MAC_LANG_FRENCH = 1;
    l.STBTT_MAC_LANG_SPANISH = 6;
    l.STBTT_MAC_LANG_GERMAN = 2;
    l.STBTT_MAC_LANG_SWEDISH = 5;
    l.STBTT_MAC_LANG_HEBREW = 10;
    l.STBTT_MAC_LANG_CHINESE_SIMPLIFIED = 33;
    l.STBTT_MAC_LANG_ITALIAN = 3;
    l.STBTT_MAC_LANG_CHINESE_TRAD = 19;
    l.STBTT_MAX_OVERSAMPLE = 8;
    l.STBTT_RASTERIZER_VERSION = 2;
    Ua.bufferSize = 1500;
    Ua.vertexSize = 9;
    Za.bufferSize = 100;
    Za.triangleBufferSize = 100;
    Cb.bufferSize = 100;
    yb.instances = [];
    xb.__meta__ = {
        fields: {
            sendDownEvent: {
                input: null
            },
            sendUpEvent: {
                input: null
            }
        }
    };
    Ea.__meta__ = {
        fields: {
            sendDownEvent: {
                input: null
            },
            sendUpEvent: {
                input: null
            },
            sendMoveEvent: {
                input: null
            },
            sendWheelEvent: {
                input: null
            }
        }
    };
    Nb.loading = new Hb;
    kb.loading = new Hb;
    pa.width = 3;
    pa.height = 3;
    Na.width = 4;
    Na.height = 4;
    dd.width = 3;
    dd.height = 3;
    ob.width = 4;
    ob.height = 4;
    Vd.nextId = 0;
    Ba.START = 0;
    Ba.ENTITY_UPDATES = 1;
    Ba.CONTROLLER_UPDATES = 2;
    Ba.REMOTE_CALL = 3;
    p.active = !0;
    p.visible = !0;
    p.FIT_NONE = 0;
    p.FIT_WIDTH = 1;
    p.FIT_HEIGHT = 2;
    p.IS_MOBILE = !1;
    p.imageQuality = Ya.High;
    p.oriWidth = 0;
    p.oriHeight = 0;
    p.gameWidth = 0;
    p.gameHeight = 0;
    p.screenOffsetX = 0;
    p.screenOffsetY = 0;
    p.gameScale = 1;
    p.dt = 0;
    p.bgColor = -10185235;
    p.frameBgColor = -1;
    p.currTime = 0;
    p.prevTime = 0;
    p.screens = [];
    p.screensToAdd = [];
    p.managers = [];
    p.screensLen = 0;
    qa.WYN_DEBUG = !1;
    qa.spaceCharCode = v.cca(" ", 0);
    Ka.WYN_DEBUG = !1;
    Ka.MOUSE_ENABLED = !1;
    Ka.SURFACE_ENABLED = !1;
    Ka.STATE_NONE = 0;
    Ka.STATE_UP = 1;
    Ka.STATE_OVER = 2;
    Ka.STATE_DOWN = 3;
    Da.WYN_DEBUG = !1;
    Da.HITBOX = 0;
    Da.HITCIRCLE = 1;
    na.WYN_DEBUG = !1;
    Sb.WYN_DEBUG = !1;
    D.keysCount = 0;
    D.keysJustPressed = !1;
    I.init = !1;
    I.rawX = 0;
    I.rawY = 0;
    I.x = 0;
    I.y = 0;
    I.dx = 0;
    I.dy = 0;
    I.mouseCount = 0;
    I.mouseJustPressed = !1;
    z.init = !1;
    z.touchCount = 0;
    z.touchJustPressed = !1;
    N.EASENONE = 0;
    N.EASEINQUAD = 1;
    N.EASEOUTQUAD = 2;
    N.EASEINOUTQUAD = 3;
    N.EASEINCUBIC = 4;
    N.EASEOUTCUBIC = 5;
    N.EASEINOUTCUBIC = 6;
    N.EASEINQUART = 7;
    N.EASEOUTQUART = 8;
    N.EASEINOUTQUART = 9;
    N.EASEINQUINT = 10;
    N.EASEOUTQUINT = 11;
    N.EASEINOUTQUINT = 12;
    N.EASEINSINE = 13;
    N.EASEOUTSINE = 14;
    N.EASEINOUTSINE = 15;
    N.EASEINEXPO = 16;
    N.EASEOUTEXPO = 17;
    N.EASEINOUTEXPO = 18;
    N.EASEINCIRC = 19;
    N.EASEOUTCIRC = 20;
    N.EASEINOUTCIRC = 21;
    N.EASEINELASTIC = 22;
    N.EASEOUTELASTIC = 23;
    N.EASEINOUTELASTIC = 24;
    N.EASEINBACK = 25;
    N.EASEOUTBACK = 26;
    N.EASEINOUTBACK = 27;
    N.EASEINBOUNCE = 28;
    N.EASEOUTBOUNCE = 29;
    N.EASEINOUTBOUNCE = 30;
    N.PLAYDEFAULT = 0;
    N.PLAYRESET = 1;
    N.PLAYSKIP = 2;
    S.atlasDict = new Ja;
    la.ROUND = 0;
    la.FLOOR = 1;
    la.CEIL = 2;
    Mc.main()
})("undefined" != typeof console ? console : {
    log: function() {}
}, "undefined" != typeof window ? window : exports);