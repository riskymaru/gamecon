function set3(game,GBA){

	GBA.UNIT = new Array();

    GBA.BG = function _BG(game){
         Phaser.Sprite.call(this,game,0,0,"");
  		 var layer1 = new Sprite(0,0,"bg1");
  		 this.addChild(layer1);
    };
    GBA.BG.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.BG.prototype.constructor = GBA.BG;

    //-------------------------------------------------------------------------

    GBA.Hero = function _Hero(game,_x,_y,unit){
       Phaser.Sprite.call(this,game,0,0);
      //CHARACTER STATUS
       this.hp = GBA.UNIT[unit].hp
       this.fhp = GBA.UNIT[unit].fhp
       this.mp = GBA.UNIT[unit].mp
       this.fmp = GBA.UNIT[unit].fmp
       this.atk = GBA.UNIT[unit].atk
       this.spd = GBA.UNIT[unit].spd
       this.ailments = GBA.UNIT[unit].ailments
       this.ftype = GBA.UNIT[unit].ftype
       this.pos = new Array();
       this._x = _x
       this._y = _y
       this.x = _x
       this.y = _y
       this.role = "hero"

       //CHARACTER PARTS
       this.cbody = new Sprite(0,0,"") // body parts holder
       this.t_head = new Sprite(0,-20,"parts")
       this.t_head.frameName = "hero"+(GBA.UNIT[unit].asset_id)+"0000" 
       this.t_head.anchor.setTo(0.5,1)
  		 this.t_body = new Sprite(0,-20,"parts")
       this.t_body.frameName = "body"+(GBA.UNIT[unit].asset_id)+"0000" 
       this.t_hand1 = new Sprite(-15,-20,"parts")
       this.t_hand1.frameName = "hand"+(GBA.UNIT[unit].asset_id)+"0000"
       this.t_hand2 = new Sprite(15,-20,"parts")
       this.t_hand2.frameName = "hand"+(GBA.UNIT[unit].asset_id)+"0000"
       this.t_foot1 = new Sprite(-8,-15,"parts")
       this.t_foot1.frameName = "foot"+(GBA.UNIT[unit].asset_id)+"0000"
       this.t_foot2 = new Sprite(6,-15,"parts")
       this.t_foot2.frameName = "foot"+(GBA.UNIT[unit].asset_id)+"0000"

  		 this.anchor.setTo(0.5,0.5)
  		 //this.cbody.frameName = ""//GBA.UNIT[unit].asset_src + "" +(GBA.UNIT[unit].asset_id)+"0000"
       this.cbody.addChild(this.t_foot2)
       this.cbody.addChild(this.t_foot1)
       this.cbody.addChild(this.t_hand2)
       this.cbody.addChild(this.t_body)
       this.cbody.addChild(this.t_hand1)
       this.cbody.addChild(this.t_head)
       this.addChild(this.cbody);
       this.cbody.anchor.setTo(0.5,1)

       this.animate_idle = function _animate_idle(){
          TweenMax.allTo([this.t_body,this.t_head,this.t_hand1,this.t_hand2],(0.25+((Math.random()*3)*0.1)),{y:-22,repeat:-1,yoyo:true})
       }


      this.animate_idle();

  		 /*
         this.stat_bar = {};
    		 this.stat_bar = new GBA.STAT_BAR(game)
    		 this.stat_bar.y = -70
    		 this.addChild(this.stat_bar)
       */
    };
    GBA.Hero.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.Hero.prototype.constructor = GBA.Hero;
    //-------------------------------------------------------------------------

    GBA.Enemy = function _Enemy(game,_x,_y,unit){
         Phaser.Sprite.call(this,game,0,0);
    		 this.cbody = new Sprite(0,0,"heroes")
    		 this.addChild(this.cbody);
    		 this.anchor.setTo(0.5,0.5)
    		 this.cbody.anchor.setTo(0.5,1)
    		 this.pos = new Array();
    		 this._x = _x
    		 this._y = _y
    		 this.x = _x
    		 this.y = _y
    		 this.role = "enemy"

    		 this.hp = GBA.UNIT[unit].hp
    		 this.fhp = GBA.UNIT[unit].fhp
    		 this.mp = GBA.UNIT[unit].mp
    		 this.fmp = GBA.UNIT[unit].fmp
    		 this.atk = GBA.UNIT[unit].atk
    		 this.spd = GBA.UNIT[unit].spd
    		 this.ailments = GBA.UNIT[unit].ailments
    		 this.ftype = GBA.UNIT[unit].ftype

    		 this.cbody.frameName = GBA.UNIT[unit].asset_src + "" +(GBA.UNIT[unit].asset_id)+"0000"

    		 this.stat_bar = new GBA.STAT_BAR(game,GBA.UNIT[unit].hp,
  	    									   GBA.UNIT[unit].fhp,
  	    									   GBA.UNIT[unit].mp,
  	    									   GBA.UNIT[unit].fmp)
    		 this.stat_bar.y = -70
    		 this.stat_bar.x = -25
    		 this.addChild(this.stat_bar);
    };
    GBA.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.Enemy.prototype.constructor = GBA.Enemy;

    //-------------------------------------------------------------------------
    GBA.STAT_BAR = function _STAT_BAR(game,_hp,_fhp,_mp,_fmp,mini){
    	Phaser.Sprite.call(this,game,0,0);
		
		var box_width = (mini != undefined ?  80 : 50)
		var box_height = (mini != undefined ?  20 : 5)
    	var _mhp,_mmp;//full_hp & full_mp

    	this.mini = mini

    	this.hp_pool =_fhp
    	this.mp_pool = _fmp

    	this.cur_hp = _hp
    	this.cur_mp = _mp

    	if(mini != undefined){
    		this.icon = new Sprite(-20,10,"hero_icon");
    		this.addChild(this.icon)
    	}

	    this.hpbarbg = game.add.graphics(0,0)
		  this.hpbarbg.lineStyle(2, 0x151515, 0.5);
		  this.hpbarbg.beginFill(0x990000,1)
	    this.hpbarbg.drawRect(0, 0,box_width,box_height);
	    this.addChild(this.hpbarbg);

	    this.mpbarbg = game.add.graphics(0,0)
		  this.mpbarbg.lineStyle(2, 0x151515, 0.5);
	   	this.mpbarbg.beginFill(0x333333,1)
	    this.mpbarbg.drawRect(0, box_height,box_width,box_height);
	    this.addChild(this.mpbarbg);

	    //status bars
    	this.hpbar = game.add.graphics(0,0)
		  //this.hpbar.lineStyle(2, 0x151515, 0.5);
		  this.hpbar.beginFill(0x33bb00,1)
	    this.hpbar.drawRect(0, 0,box_width,box_height);
	    this.addChild(this.hpbar);

	    this.mpbar = game.add.graphics(0,0)
		  //this.mpbar.lineStyle(2, 0x151515, 0.5);
		  this.mpbar.beginFill(0x0066ff,1)
	    this.mpbar.drawRect(0, box_height,box_width,box_height);
	    this.addChild(this.mpbar);

	    //shadow
	    this.hpbar_shadow = game.add.graphics(0,0)
		  //this.hpbar_shadow.lineStyle(2, 0x151515, 0.5);
		  this.hpbar_shadow.beginFill(0xffffff,1)
	    this.hpbar_shadow.drawRect(0, 0,box_width,box_height*0.5);
	    this.hpbar_shadow.alpha = 0.2
	    this.addChild(this.hpbar_shadow);

	    this.mpbar_shadow = game.add.graphics(0,0)
		  //this.mpbar_shadow.lineStyle(2, 0x151515, 0.5);
		  this.mpbar_shadow.beginFill(0xffffff,1)
	    this.mpbar_shadow.drawRect(0, box_height,box_width,box_height*0.5);
	    this.mpbar_shadow.alpha = 0.2
	    this.addChild(this.mpbar_shadow);

	    //text
	   if( mini!= undefined ){
		    this.hp_txt =  new TextField(game,_hp+"/"+_fhp,0,5,"flappy2",12,false);//_TextField(game,str,w,h,style,sz,border){
		    this.hp_txt.x = 4
		    this.addChild(this.hp_txt);

		    this.mp_txt =  new TextField(game,_mp+"/"+_fmp,0,50,"flappy2",12,false);//_TextField(game,str,w,h,style,sz,border){
		    this.mp_txt.x = 4 
		    this.addChild(this.mp_txt);
		}

	    this.updateStat = function _updateStat(_hp,_fhp,_mp,_fmp){
	    	this.hpbar.width = ((_hp/_fhp)*box_width <=0 ? 0 : (_hp/_fhp)*box_width	) 
	    	this.mini!= undefined ? this.hp_txt.text.setText(_hp+"/"+_fhp) : 0
	    	this.mpbar.width = ((_mp/_fmp)*box_width <=0 ? 0 : (_mp/_fmp)*box_width	) 
	    	this.mini!= undefined ? this.mp_txt.text.setText(_mp+"/"+_fmp) : 0
	    }

	    this.updateStat(_hp,_fhp,_mp,_fmp);
    }
    GBA.STAT_BAR.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.STAT_BAR.prototype.constructor = GBA.STAT_BAR;

    //-------------------------------------------------------------------------
    GBA.HUD = function _HUD(game,g1,g2){
    	Phaser.Sprite.call(this,game,0,0);

    	this.bars1 = new Array();

    	this.btn = new Array();

    	if(g1.length>0){
	    		for(h=0;h<g1.length;h++){
				    	this.bars1[h] = new GBA.STAT_BAR(game,GBA.UNIT[g1[h]].hp,
				    									GBA.UNIT[g1[h]].fhp,
				    									GBA.UNIT[g1[h]].mp,
				    									GBA.UNIT[g1[h]].fmp,true)
			  			this.bars1[h].y = 340
			  			this.bars1[h].x = 55 + (120*h)
			  			this.addChild(this.bars1[h])
	  			}
  		}

  		for(b=0;b<4;b++){
  			this.btn[b] = new Sprite(500 +(80*b),360,"btn");

  			this.addChild(this.btn[b]);
  		}

  		return this;
    }
    GBA.HUD.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.HUD.prototype.constructor = GBA.HUD;
    //-------------------------------------------------------------------------

    GBA.BATTLE_INTRO = function _BATTLE_INTRO(game,fnc,arr){
    	Phaser.Sprite.call(this,game,0,0);

    	var self = this;

    	var bg = new Sprite(0,0,"screen1")
    	bg.scale.setTo(2.5)
    	bg.tint = 0x0066cc
    	this.addChild(bg);

    	var battle_txt = new TextField(game,"BATTLE",0,0,"flappy2",50,false);
    	battle_txt.anchor.setTo(0.5)
    	battle_txt.position.setTo(-(battle_txt.text.width*0.5),-170)
    	battle_txt.text.tint = 0xffff00
    	this.addChild(battle_txt)

    	var sp,sp_name,xp_tx,xp_bar,sp_bar_bg;

    	sp = new Array();
    	sp_name = new Array();
    	xp_xt = new Array();
    	xp_bar_bg = new Array();
    	xp_bar = new Array();

    	if(arr!= null || arr!=undefined){
    		for(k=0;k<arr.length;k++){
    			sp[k] = new Sprite(-240+(240*k),-10,"heroes");
    			sp[k].frameName = GBA.UNIT[arr[k]].asset_src + "" + GBA.UNIT[arr[k]].asset_id + "0000";
    			this.addChild(sp[k]);

    			sp_name[k] = new TextField(game,GBA.UNIT[arr[k]].name,0,0,"flappy2",20,false);
		    	sp_name[k].position.setTo(-(sp_name[k].text.width*0.5),40)
		    	sp[k].addChild(sp_name[k])
    		}

    	}

		var btn_tx = new TextField(game,"OK",0,0,"flappy2",30,false);
			    	btn_tx.position.setTo(-(btn_tx.text.width*0.5),120)
			    	this.addChild(btn_tx)

    	Tap(btn_tx,function(){
    		if(fnc != undefined || fnc != null){
    			TweenMax.delayedCall(1,parent.fight());
    		}
    		self.parent.removeChild(self);
    	});


  		return this;
    }
    GBA.BATTLE_INTRO.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.BATTLE_INTRO.prototype.constructor = GBA.BATTLE_INTRO;

    //-------------------------------------------------------------------------

    GBA.MENU = function _MENU(game){
    	Phaser.Sprite.call(this,game,0,0);

  		return this;
    }
    GBA.MENU.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.MENU.prototype.constructor = GBA.MENU;

	////-------------------------------------------------------------------------

    GBA.WIN_SCREEN = function _WIN_SCREEN(game,fnc,arr){
    	Phaser.Sprite.call(this,game,0,0);

    	var bg = new Sprite(0,0,"screen1")
    	bg.scale.setTo(2.5)
    	bg.tint = 0x0066cc
    	this.addChild(bg);

    	var victory_txt = new TextField(game,"VICTORY",0,0,"flappy2",50,false);
    	victory_txt.anchor.setTo(0.5)
    	victory_txt.position.setTo(-(victory_txt.text.width*0.5),-170)
    	victory_txt.text.tint = "0xffff00"
    	this.addChild(victory_txt)

    	var btn_tx = new TextField(game,"OK",0,0,"flappy2",40,false);
    	btn_tx.position.setTo(-(btn_tx.text.width*0.5),120)
    	this.addChild(btn_tx)

    	var sp,sp_name,xp_tx,xp_bar,sp_bar_bg,xp_gain;

    	var xp_rcvd = 50;

    	sp = new Array();
    	sp_name = new Array();
    	xp_xt = new Array();
    	xp_bar_bg = new Array();
    	xp_bar = new Array();
    	xp_gain = new Array();
    	xp_total = new Array();

    	if(arr!= null || arr!=undefined){
    		for(k=0;k<arr.length;k++){
    			sp[k] = new Sprite(-240+(240*k),-10,"heroes");
    			sp[k].frameName = GBA.UNIT[arr[k]].asset_src + "" + GBA.UNIT[arr[k]].asset_id + "0000"
    			this.addChild(sp[k]);


    			sp_name[k] = new TextField(game,GBA.UNIT[arr[k]].name,0,0,"flappy2",20,false);
		    	sp_name[k].position.setTo(-(sp_name[k].text.width*0.5),40)
		    	sp[k].addChild(sp_name[k])
		    	

		    	xp_xt[k] = new TextField(game,"EXP",0,0,"flappy2",15,false);
		    	xp_xt[k].position.setTo(-(xp_xt[k].text.width*0.5),60)
		    	xp_xt[k].text.tint = "0xffff00"
		    	sp[k].addChild(xp_xt[k])

		    	xp_bar_bg[k] = new Sprite(0,0,"quad");
		    	xp_bar_bg[k].tint = "0x333333";
		    	xp_bar_bg[k].width = 80
		    	xp_bar_bg[k].height = 15;
		    	xp_bar_bg[k].position.setTo(-40,90)
		    	xp_bar_bg[k].anchor.setTo(0,0.5)
		    	sp[k].addChild(xp_bar_bg[k]);

		    	xp_bar[k] = new Sprite(0,0,"quad");
		    	xp_bar[k].tint = "0xff9900";
		    	xp_bar[k].width = (GBA.UNIT[arr[k]].xp_gain/GBA.UNIT[arr[k]].xp_total) * 80;;
		    	xp_bar[k].height = 15;
		    	xp_bar[k].position.setTo(-40,90)
		    	xp_bar[k].anchor.setTo(0,0.5)
		    	sp[k].addChild(xp_bar[k]);

		    	xp_gain[k] = GBA.UNIT[arr[k]].xp_gain
	
		    	TweenMax.to(xp_bar[k],1,{width:((GBA.UNIT[arr[k]].xp_gain+xp_rcvd)/GBA.UNIT[arr[k]].xp_total) * 80,delay:1+(0.5*k)})
    		}

    	}

		Tap(btn_tx,function(){
    		if(fnc != undefined || fnc != null){
    			fnc();
    		}
    		self.parent.removeChild(self);
    	});

    }
    GBA.WIN_SCREEN.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.WIN_SCREEN.prototype.constructor = GBA.WIN_SCREEN;

    //-------------------------------------------------------------------------
    GBA.ATK_UPDATE = function _ATK_UPDATE(game){
    	Phaser.Sprite.call(this,game,0,0);

    	var container =  new Sprite(0,0,"");
    	container.alpha = 0
    	this.addChild(container)

    	var msg = new TextField(game,"ss",0,0,"flappy2",18,false);
    	msg.position.setTo(-10,-40)
    	container.addChild(msg);

    	var num_txt = new TextField(game,"122",0,0,"flappy2",24,false);
    	num_txt.position.setTo(-10,-10)
    	container.addChild(num_txt)

    	this.animate = function _animate(stat,num){
    		if(stat==0){//dmg
    			msg.text.tint = "0xcc0000"
    			num_txt.text.tint = "0xcc0000"
    			msg.text.setText("DAMAGE")
    			num_txt.text.setText("-"+num)
    		}
    		if(stat==1){//heal
    			msg.text.tint = "0x00cc00";
    			num_txt.text.tint = "0x00cc00"
    			msg.text.setText("HEAL")
    			num_txt.text.setText("+"+num)
    		}
    		if(stat==2){//poison
    			msg.text.tint = "0xcc00cc";
    			num_txt.text.tint = "0xcc00cc"
    			msg.text.setText("POISON")
    			num_txt.text.setText("+"+num)
    		}

    		if(stat==3){//dmg
    			msg.text.tint = "0xcc0000"
    			num_txt.text.tint = "0xcc0000"
    			msg.text.setText("CRITICAL")
    			num_txt.text.setText("-"+num)
    		}

    		TweenMax.to(container,0.5,{alpha:1,y:-70,delay:0.25,startAt:{alpha:0,y:0},
    			onComplete:function(){
    				TweenMax.delayedCall(0.5,function(){
    					container.alpha = 0
    				});
    			}});
    	}
    };
    GBA.ATK_UPDATE.prototype = Object.create(Phaser.Sprite.prototype);
    GBA.ATK_UPDATE.prototype.constructor = GBA.ATK_UPDATE;

    //-------------------------------------------------------------------------
    GBA.Environment  = function _Environment(game){
		Phaser.Group.call(this,game);
		self = this;

		//set up character position
		var ypos = [130,210,300]
		var xpos = [80,650]

		var whosturn = new Array();
		var whostgt = new Array(); // attack this targets
	
		//set keyboard
		var hotkey = game.input.keyboard.createCursorKeys();

		var set1 = new Array()
		var set2 = new Array();

		var TL = new TimelineMax // animation control for fight scene

		set1 = [2,1,2];
		set2 = [5];

		var bg = new GBA.BG(game);
		bg.x = 400;
		bg.y = 200;
		this.addChild(bg)

		this.hud = new GBA.HUD(game,set1,set2);
		this.addChild(this.hud)

		var hero = new Array();
			if(set1.length>0){
					for(k=0;k<set1.length;k++){
						hero[k] = new GBA.Hero(game,k==0? 120 : xpos[0],ypos[k],set1[k]);
						hero[k].stat_bar = this.hud.bars1[k]
						this.addChild(hero[k])
					}
			}

		var enemy = new Array();
			if(set2.length>0){
					for(k=0;k<set2.length;k++){
						enemy[k] = new GBA.Enemy(game,k==0? 610 : xpos[1],ypos[k],set2[k]);
						enemy[k].cbody.scale.x =-1
						this.addChild(enemy[k])
					}
			}

		self.cursor = new Sprite(200,200,"hero_icon");
		self.addChild(self.cursor);
		TweenMax.to(self.cursor,0.5,{alpha:0.2,yoyo:true,repeat:-1});

		var atk_update = new GBA.ATK_UPDATE(game);
		atk_update.position.setTo(200,200);
		this.addChild(atk_update)

		//init units
		whosturn = hero.concat(enemy);

		//---------------------------------------------------------------------------
		//functions

		this.changeTarget = function _changeTarget( role ){
			if(role == "hero"){
				for(k=0;k<enemy.length;k++){
					if(enemy[k].hp>0){
						return enemy[k];
					}
				}
			}else 
			if(role == "enemy"){
				for(k=0;k<hero.length;k++){
					if(hero[k].hp>0){
						return hero[k];
					}
				}
			}
		};
		
		this.AttackMode = function atk(attacker,tgt,type){
			if(attacker.hp>0){
					//type 0 is melee//type 1 range//type 2 melee special//type 3 = range special
					type==undefined? type = 0 : 0

					if(tgt.hp <=0){
						tgt = self.changeTarget(attacker.role)
					}

					//melee
					if(attacker!=undefined && tgt!=undefined && type == 0 && tgt.hp>0 && tgt!=null){
							
								TweenMax.to(attacker,0.2,{delay:0,x:tgt.x + (attacker.cbody.scale.x== -1? 60 : -60 ),y:tgt.y,alpha:1,ease:Back.easeIn,startAt:{alpha:0},
									onComplete:function(){
										tgt.hp -= attacker.atk

										atk_update.position.setTo(attacker.cbody.scale.x== -1?  tgt.x - 30 : tgt.x +30 ,tgt.y)
										atk_update.animate(0,attacker.atk)
										
										tgt.cbody.tint = "0xff0000"
										TweenMax.to(tgt,0.1,{x:tgt.x-3,yoyo:true,repeat:5,onComplete:function(){tgt.cbody.tint = "0xffffff";}});

										if(tgt.hp <=0){
											tgt.hp = 0
											TweenMax.delayedCall(0.5,self.checkDead,[tgt]);
										}
										tgt.stat_bar.updateStat(tgt.hp,tgt.fhp,tgt.mp,tgt.fmp)
									}});
								TweenMax.to(attacker,0.1,{delay:2,x:attacker._x,y:attacker._y,ease:Back.easeOut});
					}else 
					//range
					if(attacker!=undefined && tgt!=undefined && type == 1 && tgt.hp>0 && tgt!=null){
								TweenMax.to(attacker,0.3,{delay:0,alpha:1,ease:Back.easeIn,startAt:{alpha:0},
									onComplete:function(){
                    
										tgt.hp -= attacker.atk

										tgt.cbody.tint = "0xff0000"
										TweenMax.to(tgt,0.1,{x:tgt.x-3,yoyo:true,repeat:5,onComplete:function(){tgt.cbody.tint = "0xffffff";}});

										if(tgt.hp <=0){
											tgt.hp = 0
											TweenMax.delayedCall(0.5,self.checkDead,[tgt]);
										}
										tgt.stat_bar.updateStat(tgt.hp,tgt.fhp,tgt.mp,tgt.fmp)

									}});

								TweenMax.to(attacker,0.1,{delay:2,ease:Back.easeOut});
					}
			}
		}//<AttackMode

		this.checkDead = function _checkDead(who){
			 who.cbody.loadTexture('btn');
			 who.cbody.frameName = "tomb0000"
			 removeArray(whosturn,who);
			 removeArray(whostgt,who);

			 if(who.role == "hero"){
			 	removeArray(hero,who)
			 }else
			 if(who.role == "enemy"){
			 	removeArray(enemy,who)
			 	who.stat_bar.visible = false;
			 }

			 if(enemy.length<=0){
			 	trace("you win")
			 	TweenMax.delayedCall(3, self.call_win_screen);
			 }
		};

		this.fight = function _fight(o){
			     
            trace("FIGHT!")

						function compare(a,b) {
						  if (a.spd < b.spd)
						    return -1;
						  if (a.spd > b.spd)
						    return 1;
						  return 0;
						}

						whosturn.sort(compare);	

						nm = whosturn.length
						
						for(k=0;k<nm;k++){
							//trace(whosturn[k].role )
							if(whosturn[k].role == "enemy"){
								whostgt.push(hero[Math.floor(Math.random()*hero.length)])
							}else{
								whostgt.push(enemy[0]);
							}
						}

						//set animation 
						TL = new TimelineMax();

						for(k=0;k<whosturn.length;k++){
							TL.append(	TweenMax.delayedCall(k==0?2:3,this.AttackMode,[whosturn[k],whostgt[k],whosturn[k].ftype])	); 
						}

						//TL.repeat(5)
		}
		
		/*Tap(self.hud.btn[0],function(){
			self.fight();
			trace('battle')
		})*/

		//this.fight();

		this.call_battle_intro = function _call_battle_intro(){
				self.battle_intro = new GBA.BATTLE_INTRO(game,self.fight,set2)
				self.battle_intro.anchor.setTo(0.5)
				self.battle_intro.position.setTo(400,200)
				self.addChild(self.battle_intro)
				TweenMax.from(self.battle_intro,1,{y:-300,ease:Back.easeOut})
		}

		this.call_win_screen = function _call_win_screen(){
				self.win_screen = new GBA.WIN_SCREEN(game,function(){trace('ok')},set1)
				self.win_screen.anchor.setTo(0.5)
				self.win_screen.position.setTo(400,200)
				self.addChild(self.win_screen)
				TweenMax.from(self.win_screen,1,{y:-300,ease:Back.easeOut})
		}

		//this.call_battle_intro();
		return this;
	}
	GBA.Environment.prototype = Object.create(Phaser.Group.prototype);
  GBA.Environment.prototype.constructor = GBA.Environment;
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------
    //-------------------------------------------------------------------------


    //UNITS

  /*
	** ftype (0:single melee) (1:single range) (3:range AOE)
  **
  */

    //hero1
   
       GBA.UNIT = [
        {name:'CRIMSON'           ,asset_src:"hero"         ,asset_id:1   ,hp:50    ,fhp:50    ,mp:10    ,fmp:10   ,atk:10   ,mgc:10  ,def:5   ,res:1   ,spd:10   ,ftype:0    ,xp_gain:0   ,xp_total:50   ,lvl:1   ,xp_loot:10   ,ailments:"normal"  },
        {name:'SHRUB'             ,asset_src:"hero"         ,asset_id:2   ,hp:50    ,fhp:50    ,mp:10    ,fmp:10   ,atk:10   ,mgc:10  ,def:5   ,res:1   ,spd:10   ,ftype:0    ,xp_gain:0   ,xp_total:50   ,lvl:1   ,xp_loot:10   ,ailments:"normal"  },
        {name:'AQUA'              ,asset_src:"hero"         ,asset_id:3   ,hp:50    ,fhp:50    ,mp:10    ,fmp:10   ,atk:10   ,mgc:10  ,def:5   ,res:1   ,spd:10   ,ftype:0    ,xp_gain:0   ,xp_total:50   ,lvl:1   ,xp_loot:10   ,ailments:"normal"  },

        {name:'GOBLIN'            ,asset_src:"char"         ,asset_id:1   ,hp:20    ,fhp:20    ,mp:5    ,fmp:5     ,atk:5    ,mgc:2   ,def:5   ,res:1   ,spd:10   ,ftype:0    ,xp_gain:0   ,xp_total:50   ,lvl:1   ,xp_loot:15   ,ailments:"normal"  },
        {name:'THIEF'             ,asset_src:"char"         ,asset_id:2   ,hp:10    ,fhp:10    ,mp:5    ,fmp:5     ,atk:5    ,mgc:2   ,def:5   ,res:1   ,spd:10   ,ftype:0    ,xp_gain:0   ,xp_total:50   ,lvl:1   ,xp_loot:15   ,ailments:"normal"  },
        {name:'FIGHTER'           ,asset_src:"char"         ,asset_id:3   ,hp:25    ,fhp:25    ,mp:5    ,fmp:5     ,atk:5    ,mgc:2   ,def:5   ,res:1   ,spd:10   ,ftype:0    ,xp_gain:0   ,xp_total:50   ,lvl:1   ,xp_loot:15   ,ailments:"normal"  },
        {name:'SOLDIER'           ,asset_src:"char"         ,asset_id:4   ,hp:13    ,fhp:20    ,mp:5    ,fmp:5     ,atk:5    ,mgc:2   ,def:5   ,res:1   ,spd:10   ,ftype:0    ,xp_gain:0   ,xp_total:50   ,lvl:1   ,xp_loot:15   ,ailments:"normal"  }
    ];


};//end of set


/*
0: _Hero
1: _Enemy
2: _Enemy
3: _Hero
4: _Enemy
5: _Hero

0: _Enemy
1: _Enemy
2: _Enemy
3: _Hero
4: _Hero
5: _Hero

*/




