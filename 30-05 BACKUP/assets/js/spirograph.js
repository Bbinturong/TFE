;( function( $, window, document, undefined ) {

    	"use strict";

    		var pluginName = "spiro",
    			defaults = {
    				stroke : 1,
    				size : 200,
    				seed : null,
    				color: '#000000',
    				speed : 2
    			};

    		// The actual plugin constructor
    		function Plugin ( element, options ) {
    			this.element = element;
    			this.settings = $.extend( {}, defaults, options );
    			this._defaults = defaults;
    			this._name = pluginName;
    			this.init();
    		}

    		// Avoid Plugin.prototype conflicts
    		$.extend( Plugin.prototype, {
    			init: function() {
            this.size = (this.settings.size)?parseInt(this.settings.size,10):$(this.element).width();
            if($(this.element).prop("nodeName") !== 'CANVAS'){
              console.error('This should be a canvas element')
    					return
            }


            this.element.width = this.size;
            this.element.height = this.size;
            this.loopy;

          	this.ctx=this.element.getContext('2d');

          	// Center of the canvas
          	this.cSize = this.size/2; //with/2

          	this.ctx.translate(this.cSize,this.cSize);


          	// Value for the spiro
    				this.initSeed()


          	this.max=1;
          	this.theta=0;


          	this.lineSpec = false;
    				this.view = 1;

            this.spiro()
            return this;
    			},

    			getSeed : function(){
    				var finalSeed = null;
    				if(typeof this.settings.seed === 'string'){
    					finalSeed = this.settings.seed.split('-')
    					finalSeed = finalSeed.map(function(current){
    						return parseInt(current,10);
    					});
    				}else{
    					finalSeed = [this.randomBetween(20, 70),this.randomBetween(20, 50),this.randomBetween(10, 20)]
    				}
    				return finalSeed
    			},

    			initSeed : function(){

    				this.seed = this.getSeed()

          	this.r1 =  this.seed[0];
          	this.r2 =  this.seed[1];
          	this.r3 =  this.seed[2];

    				$(this.element).data('this.seed', this.seed.join('-'))

    			},

          GCD : function(a,b){
          	var t;
          	while(b!=0)b=a%(t=b),a=t;
          	return a;
          },

          randomBetween : function(min, max) {
              if (min < 0) {
                  return Math.floor( Math.random() * (Math.abs(min)+max));
              }else {
                  return Math.floor( Math.random() * ((max-min)+1) + min);
              }
          },

          lineTo: function(n){
        		this.ctx.beginPath();
        		this.ctx.lineWidth = this.settings.stroke;
        		if (!this.lineSpec) this.ctx.strokeStyle = this.settings.color;

        		for (var i=0; i<=n; i++) {
        			if (i>0) {
        				this.theta+=0.01;
        			}

        			this.x = Math.cos(this.theta)*(this.r2-this.r1)+this.r3*Math.cos(this.theta*(1-this.r1/this.r2));
        			this.y = Math.sin(this.theta)*(this.r2-this.r1)+this.r3*Math.sin(this.theta*(1-this.r1/this.r2));
        			if (i==0) this.ctx.moveTo(this.x,this.y);
        			else this.ctx.lineTo(this.x,this.y);
        		}
        		this.ctx.stroke();
        	},


          spiro : function(){
            if (this.r3==0) this.max=1;
            else this.max=(Math.abs(this.r2)/this.GCD(Math.abs(this.r1),Math.abs(this.r2)));

            this.r1 = 60;
            this.r2 = 58;
            if (this.max<5 ) {
    					this.initSeed()
              this.max=(Math.abs(this.r2)/this.GCD(Math.abs(this.r1),Math.abs(this.r2)))
            } else if ( this.r1>50 && this.r2>50 && Math.abs(this.r1 - this.r2)<10) {
              this.initSeed()
              this.max=(Math.abs(this.r2)/this.GCD(Math.abs(this.r1),Math.abs(this.r2)))
            } else if (this.max>30 && this.max<=50) {
              this.max = this.randomBetween(20,this.max-20);
            } else if ( this.max>60 ) {
              this.max = this.randomBetween(this.max-30,this.max-10);
            }

            var h;
            if (this.r2<this.r1) {
              h = ((this.size/2)-this.settings.stroke)/(this.r1-this.r2+this.r3);
            }
            else {
              h = ((this.size/2)-this.settings.stroke)/(this.r2-this.r1+this.r3);
            }

            this.r1*=h;
            this.r2*=h;
            this.r3*=h;

            this.theta=0;
            this.ctx.clearRect(-200,-200,400,400);

            if (this.loopy) clearTimeout(this.loopy);
            this.loopy=setInterval(function(){
              if(this.view != 1 || this.settings.speed==0) return;
              for (var i=0; i<[0,10,200,500][this.settings.speed]; i++) {
                if (this.theta/Math.PI/2>this.max) break;
                this.lineTo(10);
              }

              if (this.theta/(Math.PI*2)>this.max) {
                clearInterval(this.loopy);

                /* MAKE THING APPEAR */
                $( "#header" ).addClass( "appear" );
                $( "main" ).addClass( "appear" );
                
              }
            }.bind(this),30);
          }

    		} );


    		$.fn[ pluginName ] = function( options ) {
    			return this.each( function() {
    				if ( !$.data( this, "plugin_" + pluginName ) ) {
    					$.data( this, "plugin_" +
    						pluginName, new Plugin( this, options ) );
    				}
    			} );
    		};

    } )( jQuery, window, document );