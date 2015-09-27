function set5(game,GBA){

        GBA.sample = function(GBA){}

        GBA.sample.prototype = {
            create: function(game){
                PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
                game.time.advancedTiming = true;

                var wmap = new GBA.Map_floor(game)
                this.add.existing(wmap);

                var login = new GBA.LOGIN(game);
                this.add.existing(login)
            },
            render: function(game){
                //game.test ? game.debug.text('FPS:' + game.time.fps + "|D:"+ GBA.device_id +"|R:"+GBA.GameRender+"|W:" + game.width + "|H:"+ game.height + "|M:" + GBA.model + "|wW:"+GBA.window_width + "|wH:"+GBA.window_height+"|Ra:"+GBA.ratio, 8, game.height-5, "#00ff00") : 0
                
            },
            update:function(){
                //GBA.playsite.update();
            }
        }

     //set global var here
    GBA.username  = ""
    GBA.roll_score = 0
    GBA.current_player_id = 0 //id
    GBA.current_player= {}
    GBA.player_list = new Array()// list of all players
    GBA.max_players = 0



    GBA.Map_gfx =   [
                        [
                            [   2,  2,  0,  0,   0,   0,   0  ],
                            [   0,  2,  2,  0,   0,   0,   0  ],
                            [   0,  0,  2,  2,   0,   0,   0  ],
                            [   0,  0,  0,  2,   0,   0,   0  ],
                            [   0,  0,  0,  2,   0,   0,   0  ],
                            [   0,  0,  0,  2,   2,   2,   2  ],
                        ],

                        [
                            [   0,  0,  0,  0,   0,   0,   0  ],
                            [   0,  0,  0,  0,   0,   0,   0  ],
                            [   0,  0,  0,  0,   0,   0,   0  ],
                            [   0,  0,  0,  0,   0,   0,   0  ],
                            [   0,  0,  0,  0,   0,   0,   0  ],
                            [   0,  0,  0,  0,   0,   0,   0  ],
                        ],

                    ];//GBA.Map_gfx

    //-----------------------------------------------------------------------------



    GBA.box_tile = function _Tile(game,x,y,src){
        Phaser.Sprite.call(this,game,x,y);

        this.cost = 0
        this.distance = 0
        this.type = 0

        this.tbody = new Sprite(0,0,src)
        this.addChild(this.tbody)

        this.txt = new TextField(game,"00",0,0,"flappy2",24,false);
        this.txt.anchor.setTo(0.5)
        this.txt.text.anchor.setTo(0.5)
        this.addChild(this.txt)
    }
    GBA.box_tile.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.box_tile.prototype.constructor = GBA.box_tile;

    //-----------------------------------------------------------------------------
   

    GBA.Player = function _Player(game,_x,_y,img,frame){
        Phaser.Sprite.call(this,game,0,0);
        this.tbody = new Sprite(0,0,img);
        this.tbody.frame = frame
        this.addChild(this.tbody)
        this.place_id = 0

    }
    GBA.Player.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.Player.prototype.constructor = GBA.Player;


    //-----------------------------------------------------------------------------

    GBA.Map_floor = function _map_floor(game){

        Phaser.Sprite.call(this,game,0,0);
        var self = this

        path = new Array();
        path = [0,1,8,9,16,17,24,31,38,39,40,41]

        cur_pos1 = 0
        cur_pos2 = 0

        map_w = 7;
        map_h = 6;
        map_ttl = map_w * map_h;
        map_sz = 60;

        h = 0;
        v = 0;
        this.moves = 0

        map_holder = new Sprite(0,0,"");
        this.addChild(map_holder);
        map_holder.position.setTo(30,30);

        flr_tile = new Array();

        for(k=0;k<map_ttl;k++){
          
            flr_tile[k] = new GBA.Tile(game,(h*map_sz),(v*map_sz),"map");
            flr_tile[k].anchor.setTo(0.5)
            map_holder.addChild(flr_tile[k])
            flr_tile[k].txt.text.setText(''+k)
            if(h<map_w-1){
                h++
            }else{
                h=0;
                v++;
            }
        }

        //add functions
        map_update = function _map_update(num){
            h = 0 ; v = 0 //reset h & v
            for(k=0;k<map_ttl;k++){
                flr_tile[k].tbody.frame = GBA.Map_gfx[num][v][h];
                if(h<map_w-1){
                    h++
                }else{
                    h=0
                    v++
                }
            }
        }


        map_update(0);
        GBA.player_list = new Array();
        
        player1 = new GBA.Player(game,0,0,"btn",0);
        map_holder.addChild(player1)
        player1.position.setTo(flr_tile[0].x+5,flr_tile[0].y)
        player1.scale.setTo(0.5)

        player2 = new GBA.Player(game,0,0,"btn",1);
        map_holder.addChild(player2)
        player2.frame = 1
        player2.position.setTo(flr_tile[0].x-5,flr_tile[0].y)

        GBA.player_list = [player1,player2]

        GBA.max_players = GBA.player_list.length


        hud = new GBA.HUD(game);
        this.addChild(hud)
        hud.position.setTo(450,0)

        player2.scale.setTo(0.5)

        GBA.current_player = GBA.player_list[GBA.current_player_id ]

        this.move_player = function _move_player(who){
            hud.btn_roll.inputEnabled = false
            hud.btn_roll.alpha = 0.5
            who.place_id += 1    
            TweenMax.to(who,0.5,{x:flr_tile[path[who.place_id]].x,y:flr_tile[path[who.place_id]].y,onComplete:function(){
                if(self.moves>1){
                    self.moves -=1
                    TweenMax.delayedCall(1,self.move_player,[who])
                }else{
                    self.moves=0
                    hud.btn_end.alpha = 1
                    Tap(hud.btn_end,function(){
                        //input ur end turn code here
                           Tap(hud.btn_end,null);
                            hud.btn_end.alpha = 0.5
                            GBA.current_player_id ++
                            if(GBA.current_player_id>=GBA.max_players){
                                GBA.current_player_id = 0
                            }

                            GBA.current_player = GBA.player_list[GBA.current_player_id]
                            trace("GBA.current_player_id",GBA.current_player_id)

                            hud.btn_roll.alpha = 1
                            hud.btn_roll.inputEnabled = true
                    })
                }
                hud.roll_txt.text.setText(self.moves)
            }})
        
        }
        

        Tap(hud.btn_roll,function(){
            GBA.roll_score = Math.ceil(Math.random()*6)
            self.moves = GBA.roll_score
            hud.roll_txt.text.setText(GBA.roll_score+"")
            self.move_player(GBA.current_player)
        })

        //TweenMax.delayedCall(1,move_player,[player1])




        //return this;//end
    }
    GBA.Map_floor.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.Map_floor.prototype.constructor = GBA.Map_floor;
    //-----------------------------------------------------------------------------

    /*
        0   1   2   3   4   5   6
        7   8   9  10  11  12  13
        14 15  16  17  18  19  20
        21 22  23  24  25  26  27
        28 29  30  31  32  33  34
        35 36  37  38  39  40  41
    */
//-------------------------------------------------------------------

    GBA.HUD = function _HUD(game){
        Phaser.Sprite.call(this,game,0,0);
        var self = this

        GBA.roll_score = 0

        w = 340
        h = 200
        txt_bg = game.add.graphics( 0, 0 );
        txt_bg.beginFill(0x0, 1);
        txt_bg.bounds = new PIXI.Rectangle(0, 0, w, h);
        txt_bg.drawRect(0, 0, w, h);
        txt_bg.alpha = 1
        this.addChild(txt_bg)

        this.btn_roll = new Sprite(35,35,"btn")
        this.addChild(this.btn_roll)

        this.roll_txt = new TextField(game,"00",150,30,"flappy2",24,false);
        this.addChild(this.roll_txt)

        this.btn_end = new Sprite(35,110,"btn");
        this.btn_end.frame = 1;
        this.addChild(this.btn_end);
        this.btn_end.alpha = 0.5
        this.btn_end.inputEnabled = false;


    
    }
    GBA.HUD.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.HUD.prototype.constructor = GBA.HUD;


    GBA.LOGIN = function _LOGIN(game){
        Phaser.Sprite.call(this,game,0,0);

        var self = this
        w = 800
        h = 400
        txt_bg = game.add.graphics( 0, 0 );
        txt_bg.beginFill(0x0, 0.8);
        txt_bg.bounds = new PIXI.Rectangle(0, 0, w, h);
        txt_bg.drawRect(0, 0, w, h);
        txt_bg.alpha = 1
        this.addChild(txt_bg)

        username_txt =  new TextField(game,"00",0,0,"flappy2",24,false);
        username_txt.position.setTo(400,200)
        username_txt.anchor.setTo(0.5)
        username_txt.text.anchor.setTo(0.5)
        this.addChild(username_txt)

        var my_id =  "user" +  Math.floor((Math.random()* 1000) )

        GBA.username = my_id

        username_txt.text.setText('Your User id is: ' + my_id );

        btn_ok = new Sprite(0,0,"btn");
        btn_ok.position.setTo(400,300)
        this.addChild(btn_ok)


        Tap(btn_ok,function(){
            self.destroy();
        })
        
    }
    GBA.LOGIN.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.LOGIN.prototype.constructor = GBA.LOGIN;

    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------



};