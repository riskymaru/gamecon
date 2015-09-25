function set5(game,GBA){

        GBA.sample = function(GBA){}

        GBA.sample.prototype = {
            create: function(game){
                PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
                game.time.advancedTiming = true;

                var wmap = new GBA.Map_floor(game)
                this.add.existing(wmap);

            },
            render: function(game){
                //game.test ? game.debug.text('FPS:' + game.time.fps + "|D:"+ GBA.device_id +"|R:"+GBA.GameRender+"|W:" + game.width + "|H:"+ game.height + "|M:" + GBA.model + "|wW:"+GBA.window_width + "|wH:"+GBA.window_height+"|Ra:"+GBA.ratio, 8, game.height-5, "#00ff00") : 0
                
            },
            update:function(){
                //GBA.playsite.update();
            }
        }

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


    GBA.Map_floor = function _map_floor(game){
        Phaser.Sprite.call(this,game,0,0);

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
        
        player1 = new Sprite(0,0,"btn");
        map_holder.addChild(player1)
        player1.position.setTo(flr_tile[0].x+5,flr_tile[0].y)
        player1.scale.setTo(0.5)

        player2 = new Sprite(0,0,"btn");
        map_holder.addChild(player2)
        player2.frame = 1
        player2.position.setTo(flr_tile[0].x-5,flr_tile[0].y)
        player2.scale.setTo(0.5)

        var tst = 0

        move_player = function _move_player(who){
            cur_pos1 += 1
            tst+=1
            TweenMax.to(who,0.5,{x:flr_tile[path[cur_pos1]].x,y:flr_tile[path[cur_pos1]].y,onComplete:function(){
                if(tst<5){
                    TweenMax.delayedCall(1,move_player,[player1])
                }else{
                    tst=0
                }
            }})
        
        }
        TweenMax.delayedCall(1,move_player,[player1])




        //return this;//end
    }
    GBA.Map_floor.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.Map_floor.prototype.constructor = GBA.Map_floor;

    /*
        0   1   2   3   4   5   6
        7   8   9  10  11  12  13
        14 15  16  17  18  19  20
        21 22  23  24  25  26  27
        28 29  30  31  32  33  34
        35 36  37  38  39  40  41
    */



    GBA.HUD = function _HUD(){
        
    }
    GBA.HUD.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.HUD.prototype.constructor = GBA.HUD;

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