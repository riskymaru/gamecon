function set4(game,GBA){

   GBA.WorldMap = function(GBA){}

        GBA.WorldMap.prototype = {
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

    GBA.Tile = function _Tile(game,x,y,src){
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
    GBA.Tile.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.Tile.prototype.constructor = GBA.Tile;

    //-----------------------------------------------------------------------------
    GBA.Map_gfx = [
                        [
                            [   0,  0,  0,  4,   0,   0,   0  ],
                            [   0,  0,  0,  4,   0,   0,   0  ],
                            [   0,  0,  0,  4,   0,   0,   0  ],
                            [   0,  0,  0,  0,   0,   0,   0  ],
                            [   0,  0,  0,  0,   0,   3,   0  ],
                            [   0,  0,  0,  0,   0,   0,   0  ],
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

        var hero = new Sprite(0,0,"btn")

        var self = this;
        var direction = new Array();
        var flr_tile = new Array();
        var tile_cost = new Array();
        var path_cost = new Array();
        var selected
        var flr_wd = 7;
        var flr_hg = 6;
        var flr_sz = 62;
        var ttl = flr_wd*flr_hg;//total tiles
        var h=0;// horizontal
        var v=0;//vertical
        var f=0; //gcost
        
        this.map = new Sprite(15,15)
        //this.map.scale.setTo(0.75)
        this.addChild(this.map)

        //set map
        for(k=0;k<ttl;k++){
            tile_cost[k] = 0
            flr_tile[k] = new GBA.Tile(game,(h*flr_sz),(v*flr_sz),"map");
            flr_tile[k].anchor.setTo(0.5)
            this.map.addChild(flr_tile[k])
            if(h<flr_wd-1){
                h++
            }else{
                h=0
                v++
            }
        }

        this.map.addChild(hero)

        //add functions
        this.map_update = function _map_update(num){
            h = 0 ; v = 0 //reset h & v
            for(k=0;k<ttl;k++){
                flr_tile[k].tbody.frame = GBA.Map_gfx[num][v][h];
                if(h<flr_wd-1){
                    h++
                }else{
                    h=0
                    v++
                }
            }
        }
    
        this.map_update(0);


       //lab
        var OPEN = new Array()
        var CLOSED = new Array();
        var final_path = new Array();
        var found = false;
        var h_score = new Array();
        var g_score = new Array();
        var selected_direction = new Array();

        var cur_node = 7
        var cur_end = 33
        var cur_score = new Array();
        var cur_min_score = new Array();
        var min_score = 0 

        reparent = function _reparent(id){
            //left right up down
            direction = [-1,-1,-1,-1]
            //get left
            if(id>= 0 && id <= ttl && (id%7!=0)){
                direction[0] = id-1
            }
            //get right
            if(id >= 0 && id <= ttl && ((id+1)%7!=0)){
                direction[1] = id+1
            }
            //get up
            if(id >= 0 && id <= ttl && (id-flr_wd >= 0) ){
                direction[2] = id-flr_wd
            }
            //get down
            if(id >= 0 && id <= ttl && (id+flr_wd <= ttl) ){
                direction[3] = id+flr_wd
            }
            direction[0] >-1 ? flr_tile[direction[0]].tint = 0x000000 : 0
            direction[1] >-1 ? flr_tile[direction[1]].tint = 0x000000 : 0
            direction[2] >-1 ? flr_tile[direction[2]].tint = 0x000000 : 0
            direction[3] >-1 ? flr_tile[direction[3]].tint = 0x000000 : 0

            trace(id)
            id > 0 ? hero.position.setTo(flr_tile[id].x,flr_tile[id].y) : 0
        }

        reparent(cur_node)

        getcost = function _getcost(start,end){
            h = 0 ; v = 0 ; f = 0;
            h = (start%7) -(end%7)
            v = Math.floor(start/7) - Math.floor(end/7) 
            h < 0 ? h *=-1 : 0
            v < 0 ? v *=-1 : 0
            f = h + v  
            return f;
        };

        check_all_cost = function _check_all_cost(){
             for(k=0;k<ttl;k++){
                tile_cost[k] = getcost(k,cur_end)
                flr_tile[k].txt.text.setText(tile_cost[k])
            }
        };
        
        var tst = 0

        check_all_path = function _check_all_path(){

            //path_cost
            
            check_all_cost();

            if(found == false && tst < 30){
                //trace(direction)
               cur_score = [100,100,100,100]
               direction[0]>-1 ? cur_score[0] = flr_tile[direction[0]].cost = 10 + tile_cost[direction[0]] : 0
               direction[1]>-1 ? cur_score[1] = flr_tile[direction[1]].cost = 10 + tile_cost[direction[1]] : 0
               direction[2]>-1 ? cur_score[2] = flr_tile[direction[2]].cost = 10 + tile_cost[direction[2]] : 0
               direction[3]>-1 ? cur_score[3] = flr_tile[direction[3]].cost = 10 + tile_cost[direction[3]] : 0

               min_score = Math.min(cur_score[0],cur_score[1],cur_score[2],cur_score[3] )
               for(k=0;k<4;k++){
                    if(cur_score[k] == min_score){
                        cur_min_score.push(direction[k]);

                    }
               }
               //trace(cur_min_score)
               //reparent(cur_min_score[0])
               
               cur_node = cur_min_score[0]  
               cur_min_score = []
               tst ++
               reparent(cur_node)
               if(cur_node == cur_end){
                    found = true
                    return;
               }else{
                    TweenMax.delayedCall(1,check_all_path);
               }
               trace(cur_node,'cur_node',cur_end)
            }else
            if(found == true){

            }
        }
        //
        check_all_path();


        Tap(this.map,function(){
             //self.map_update(Math.floor(Math.random()*3));
        });

        return this;//end
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