			document.addEventListener("DOMContentLoaded", function(event) { 
			  //do work
			  init();
			  //alert(width)
			});
					
			function init(){
				var isMobile = {
				    Android: function() {
				        return /Android/i.test(navigator.userAgent);
				    },
				    BlackBerry: function() {
				        return /BlackBerry/i.test(navigator.userAgent);
				    },
				    iOS: function() {
				        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
				    },
				    Windows: function() {
				        return /IEMobile/i.test(navigator.userAgent);
				    },
				    any: function() {
				        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
				    }
				};

				
				window.getDevicePixelRatio = function () {
				    var ratio = 1;
				    // To account for zoom, change to use deviceXDPI instead of systemXDPI
				    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
				        // Only allow for values > 1
				        ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
				    }
				    else if (window.devicePixelRatio !== undefined) {
				        ratio = window.devicePixelRatio;
				    }
				    return ratio;
				};

				window.onload = function () {
							/*
							Note: GameRender
							WEBGL = 2
							CANVAS = 1
							AUTO = 0
							*/

							/**HTML SETTINGS**/

							var ratio = Math.ceil(window.getDevicePixelRatio());
							var window_width =  Math.ceil($(window).width() * ratio);
							var window_height =  Math.ceil($(window).height() * ratio);
							var game = {};
							var model = 0 //0=desktop || 1=iphone4 || 2=ipad
							var view= 0 //0 landscape || 1= portrait
							var _mw,_mh;
							var GBA = {};
							var GameRender = {}

							GBA.hide_banner = false

							/* TESTING MODE*/
							game.test = true;
				
						   if(window.orientation==undefined){window_width > window_height ? view = 0 : view= 1;}
						   else{window.orientation == 0 ? view = 1 : view = 0 };
						
							navigator.what_browser = (function(){
								    var ua= navigator.userAgent, tem,
								    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
								    if(/trident/i.test(M[1])){
								        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
								        return 'IE '+(tem[1] || '');
								    }
								    if(M[1]=== 'Chrome'){
								        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
								        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
								    }
								    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
								    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
								    return M.join(' ');
							})();


							GBA.goFullScreen = function _goFullScreen(){
								 game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
								 //phaser fullscreen
								  if (game.scale.isFullScreen) {
								    game.scale.stopFullScreen();
								    GBA.fullscreen_flag = false
								  } else {
								 	 game.scale.startFullScreen(); 
								 	 GBA.fullscreen_flag = true  
								  }
								  //hide address only
								  /*if(!window.location.hash)
								  {
								      if(document.height < window.outerHeight)
								      {
								          document.body.style.height = (window.outerHeight + 50) + 'px';
								      }

								      setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
								  }*/
							}//goFullScreen</>

								hideAddressBar =function _hideAddressBar()
								{
								  if(!window.location.hash)
								  {
								      if(document.height < window.outerHeight)
								      {
								          document.body.style.height = (window.outerHeight + 50) + 'px';
								      }

								      setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
								  }
								}

								window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
								window.addEventListener("orientationchange", hideAddressBar );

			
							if ( isMobile.Android() ) {
						       GBA.device_id = navigator.platform
						       GBA.device = "Android"
						       navigator.what_browser.search("Chrome") === 0? GameRender = Phaser.WEBGL : GameRender = Phaser.CANVAS
						    }
							else if(isMobile.iOS()){
								GBA.device_id = navigator.platform
								GBA.device = "iOS"
								!window.chrome ? GameRender = Phaser.WEBGL : GameRender = Phaser.CANVAS
								if(navigator.platform==="iPad")model = 2;
								if(navigator.platform==="iPhone")model = 1;
								GBA.hide_banner = true
							}
							else if(navigator.platform ==="Win32"){
								GBA.device_id = navigator.platform
								GBA.device = "PC"
								GameRender = Phaser.WEBGL
							};

							if(GBA.hide_banner == true){
								document.getElementById("menu").style.display = 'none';
								document.getElementById("top-bal").style.display = 'none';
							}

							if(model==0){_mw=800;_mh=450}
							if(model==1){_mw=800 ;_mh=450}//960x640
							if(model==2){_mw=800;_mh=450}//1024x768

							if(view==0){
								//landscape 
									 if(model==0){_gh = _mh;_gw = _mw}
								else if(model==1){_gh = _mh;_gw = _mw }
								else if(model==2){_gh = _mh+100;_gw = _mw}
								GBA.view = 0
							}else{//portrait
								 	 if(model==0){_gh = _mw;_gw = _mh}
								else if(model==1){_gh = _mw-160;_gw = _mh }
								else if(model==2){_gh = _mw-240;_gw = _mh}
								GBA.view = 1
							};
							
							//load
							GBA.model = model;
							GBA.GameRender = GameRender;
							GBA.window_width = window_width;
							GBA.window_height = window_height;
							GBA.ratio = ratio;
							GBA.SFX = {};
							GBA.response = {};
							GBA.val = {};//data
							GBA.fullscreen_flag = false;
							GBA.screen_mode = 0
							
							//others
					
							set1(GBA);//boot all assets	--//boot.js
							set2(GBA);//load main game --//boot.js
							set3(game,GBA);//load object classes --//object.js
							set4(game,GBA);
							set5(game,GBA);// sample game
							setRequest(GBA)// set all php request --//boot.js

							//initialize the framework
							_gw = 800
							_gh = 400

							game = new Phaser.Game(_gw, _gh, GameRender, 'game_canvas',null,false);
							game.width = _gw;
							game.height = _gh;

							game.state.add('Boot', GBA.Boot);
							game.state.add('Preloader', GBA.Preloader);
							//game.state.add('WorldMap', GBA.WorldMap);
							game.state.add('Battle_UI', GBA.Battle_UI);
							game.state.add('sample', GBA.sample);
							game.state.start('Boot');	
							custom(game);	
							
				}//onLoad

			};	