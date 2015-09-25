//###trace a value,(console.log only)
trace = function _trace(){
        this.arr = []
         for (i = 0; i < arguments.length; i++) {
             this.arr.push(arguments[i]);
         }
       console.log('[trace]>',this.arr/*,"[Caller]>",arguments.callee.caller*/);
        //debug.info ( 'debug:', this.arr);//error/debug/log/info/warn
    }

function custom(game){
    PIXI.blendModes = {
        NORMAL:0,
        ADD:1,
        MULTIPLY:2,
        SCREEN:3,
        OVERLAY:4,
        DARKEN:5,
        LIGHTEN:6,
        COLOR_DODGE:7,
        COLOR_BURN:8,
        HARD_LIGHT:9,
        SOFT_LIGHT:10,
        DIFFERENCE:11,
        EXCLUSION:12,
        HUE:13,
        SATURATION:14,
        COLOR:15,
        LUMINOSITY:16
    };

    //-------------------------------------------
    Sprite = function _Sprite(x,y,img,center,cab){
    	Phaser.Sprite.call(this, game, x, y,img);
    	center ? this.anchor.setTo(0.5,0.5) : 0
        this.inputEnabled = false
        this.blendModes = 0
        cab ? this.cacheAsBitmap = true : this.cacheAsBitmap = false
        this.smoothed = true
        this.body = null

        this.anchor.setTo(0.5,0.5);
        this.alive = false
        this.checkWorldBounds = false
        this.pivot.setTo(0.5,0.5)
        //this.updateCache();
        return this;
    }
    Sprite.prototype = Object.create(Phaser.Sprite.prototype);
    Sprite.prototype.constructor = Sprite
    //-------------------------------------------

    TextField = function _TextField(game,str,w,h,style,sz,border){
            Phaser.Sprite.call(this,game,0,0,"")

            if(border){
                this.txt_bg = game.add.graphics( 0, 0 );
                this.txt_bg.beginFill(0x0, 1);
                this.txt_bg.bounds = new PIXI.Rectangle(0, 0, w, h);
                this.txt_bg.drawRect(0, 0, w, h);
                this.txt_bg.alpha = 1
                this.addChild(this.txt_bg)
            }
            
            !sz ? sz = 14 : 0;
            !this.style ? this.style = { font: sz+"px Tahoma", fill: "#ffffff", align: "center" } : this.style = style;
            !this.style ? (this.tx_x = 0) : (this.tx_x = 0+(w*0.5));

            this.text = new Phaser.BitmapText(game,0,0,style,str,sz)//game.add.bitmapText(0, 0, 'led', 'sample text', 20);//new Phaser.Text(game,this.tx_x,0,str,this.style)//game.add.text(x+(w*0.5),y, "Sample Text", this.style);//
            this.text.anchor.set(0,0);
            this.text.setText(str);
            this.addChild(this.text)

            this.text.x = w*0.5
            this.text.y = h*0.5
            this.text.wordWrap = true;
            this.text.wordWrapWidth = w -5;

            this.pivot.setTo(0.5,0.5)
            this.anchor.setTo(0.5,0.5)
            this.checkWorldBounds = false
            this.inputEnabled = false
            this.blendModes = 0
            this.smoothed = true
            this.body = null

            return this;
    }
    TextField.prototype = Object.create(Phaser.Sprite.prototype);
    TextField.prototype.constructor = TextField

    //-------------------------------------------
    Tap = function _Tap(p_obj,p_up,p_down,p_over,p_out,p_center){
    		p_obj.inputEnabled = true;
    		if(p_up!=null){p_obj.events.onInputUp.add(p_up, game)};
    		if(p_down!=null){p_obj.events.onInputDown.add(p_down, game)};
    		if(p_over!=null){p_obj.events.onInputOver.add(p_over, game)};
    		if(p_out!=null){p_obj.events.onInputOut.add(p_out, game)};
            return p_obj;
    }
    Tap.prototype.constructor = Tap;
    //-------------------------------------------

    //-------------------------------------------
    Press = function _Press(game,key,kyUp,kyDown){
            game.input.keyboard.onUpCallback = function(e){
            if(e.keyCode == key){
               kyUp();
            }
        }
    };
    Press.prototype.constructor = Press;
     //-------------------------------------------

    //-------------------------------------------
    NumCom = function ReplaceNumberWithCommas(yourNumber) {
        //Seperates the components of the number
       yourNumber = Math.round(yourNumber*100)/100
        var n= yourNumber.toString().split(".");
        //Comma-fies the first part
        n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //Combines the two sections
        return n.join(".");
    }
    NumCom.prototype.constructor = NumCom
    //-------------------------------------------   

     //-------------------------------------------
    NumRound = function round(num){
        return Math.round(num*100)/100;
    }
    NumRound.prototype.constructor = NumRound
    //-------------------------------------------

    deg2rad = function _deg2rad(num){
        return Math.round(num*0.0174532925);
    }
    deg2rad.prototype.constructor = deg2rad


    removeArray = function _removeArray(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
  
}