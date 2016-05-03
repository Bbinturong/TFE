
// create function to get the element by ID
function g(e){return document.getElementById(e);}

// permet de faire en sorte que le spiro se fasse
function GCD(a,b){
	var t;
	while(b!=0)b=a%(t=b),a=t;		
	return a;
}

/*
function getSpectrum(){
	var c='0123456789ABCDEF'.split(''), h=[];
	for (var i=0; i<256; i++) h[i]=c[(i/16)>>0]+c[i%16];
	for (i=0; i<256; i++) c[i]='FF'+h[i]+'00';
	for (i=0; i<256; i++) c[256+i]=h[255-i]+'FF00';
	for (i=0; i<256; i++) c[512+i]='00FF'+h[i];	
	for (i=0; i<256; i++) c[768+i]='00'+h[255-i]+'FF';
	for (i=0; i<256; i++) c[1024+i]=h[i]+'00FF';	
	for (i=0; i<256; i++) c[1280+i]='FF00'+h[255-i];
	return c;
}
*/

// Genrate random numbers
       function randomBetween(min, max) {
             if (min < 0) {
                 return Math.floor( Math.random() * (Math.abs(min)+max));
             }else {
                 return Math.floor( Math.random() * ((max-min)+1) + min);
             }
         }


window.onload=function(){

	var out=g('out');
	var canvas=g('canvas');
	var under=g('under');


	//g('spirograph').style.visibility = 'visible';
	//g('loading').style.display = 'none';
	
	var ctx_under=under.getContext('2d');
	//var ctx=canvas.getContext('2d');
		
	// Center of the canvas
	var cSize = 150;
	
	ctx_under.translate(cSize,cSize);
	//ctx.translate(cSize,cSize);

	var R1=90,R2=30,R3=50; //store

	var r1=90; //big circle
	var r2=30; //little circle
	var r3=50; //tracing stick

	// Value for the spiro
	r1 = randomBetween(20, 70);
	r2 = randomBetween(20, 100);
	r3 = randomBetween(10, 100);
	console.log('r1 '+r1);
	console.log('r2 '+r2);
	console.log('r3 '+r3);
	var max=1;
	
	var theta=0;
	
	var lineThickness = 2;
	var calligraphy = false;
	var speed=1;
	var displayHands=true;
	var thisView = 1;

	var strokeColor = randomColor();
	var lineSpec = false;




	// ---------------------------
	// -------- CHANGE IF SELECTED
	/*
	g('speed').onchange = function(){
		speed=this.options.selectedIndex;
	}

	// If click on 'redraw' relaunch the spiro() function
	g('redraw').onclick = function(){
		spiro();
	}

	// Draw hands if 'display' is selected
	g('display').onchange = function(){
		displayHands = this.checked;
		if (this.checked) {
			drawHands();
		}
		else {
			ctx.clearRect(-200,-200,400,400);
		}
	}

	g('config').onclick = function(){
		thisView = 3-thisView;
		g('view1').style.display = (thisView==1) ? 'block' : 'none';
		g('view2').style.display = (thisView==2) ? 'block' : 'none';
		g('tooltip').style.left = (thisView==1) ? '230px' : '258px';
		
		if (thisView==1) 	{
			thickness = [0.5,1,2,4][g('thickness').options.selectedIndex];
			calligraphy = g('calligraphy').checked;
			spiro();
		}
	}
	
	g('save').onclick = function(){
		// remove black background
		var temp = document.createElement('CANVAS');
		temp.setAttribute('width', 350);
		temp.setAttribute('height', 350);
		temp = temp.getContext('2d');
		temp.fillStyle='#FFF';
		temp.fillRect(0,0,350,350);
		temp.drawImage(ctx_under.canvas, 0,0);
		window.open(temp.canvas.toDataURL());
	}
	g('save').onmouseover=function(){g('tooltip').innerHTML='save';};
	g('config').onmouseover=function(){g('tooltip').innerHTML='configure';};
	g('save').onmouseout = g('config').onmouseout = function(){g('tooltip').innerHTML='';};

	
	// display seed and stuff while drawing
	// Show the input on the canvas
	function displayItems(bool){
		g('showBox').style.display = g('speed').style.display = bool ? 'block' : 'none';
		
		if (bool) {
			// timeout used due to an Opera bug
			setTimeout(function(){
				g('speed').options[1].selected=true;
			},1);
			speed=1;
		}		
	}
	
	var ctx_example = g('example').getContext('2d');
	ctx_example.scale(1/2,1/2);
	

	function applyValues(){
		
		r1 = Number(g('r1').value);
		r2 = Number(g('r2').value) || 1;
		r3 = Number(g('r3').value);
		
		if (r2>0) r2+=9;
		else r2-=10;
		
		if (r2==r1) r2--;
		
		g('outr1').innerHTML = R1 = r1;
		g('outr2').innerHTML = R2 = r2;
		g('outr3').innerHTML = R3 = r3;
		
		var ctx=ctx_example;
		
		ctx.clearRect(0,0,400,400);

		ctx.save();
		if (r2>0) {
			if (r1>r2) ctx.translate(200,200);
			else ctx.translate(200+r2-r1,200);
		}
		else {
			ctx.translate(200+r2,200);
		}
			

		ctx.beginPath();
		ctx.moveTo(r1,0);
		ctx.arc(0,0,r1,0,Math.PI*2,true);
		if (r2<0) ctx.arc(r1-r2,0,-r2,Math.PI,3*Math.PI,true);
		else ctx.arc(r1-r2,0,r2,0,2*Math.PI,true);		
		ctx.moveTo(r1-r2,0);
		ctx.lineTo(r1-r2,-r3);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(r1-r2,2-r3);
		ctx.arc(r1-r2,-r3,2,0,2,true);
		ctx.fillStyle='red';
		ctx.fill();
		
		ctx.restore();
	}
	applyValues()

	
	g('r1').onchange = g('r2').onchange = g('r3').onchange = applyValues;
	
	g('colourType').onchange = function(){
		var n = this.options.selectedIndex;
		g('colourBox').style.display = n==0 ? 'block' : 'none';
		lineSpec = (n==1);
	}
	
    function trueOffset(ele, axis) // axis: 0==x, 1==y
    {
        var off = 0;
        while (ele)
        {
            off += axis ? ele.offsetTop : ele.offsetLeft;
            ele = ele.offsetParent;
        }
        return off;
    }
    
	g('ring').onmousedown=function(e){
		var xOff=trueOffset(this, 0); //the 11 is for the container's offset
		var yOff=trueOffset(this, 1);
		var mark=g('mark1');

		var x=e.clientX-xOff;
		var y=e.clientY-yOff;
		
		if ( (90-x)*(90-x)+(90-y)*(90-y) > 75*75) return;

		document.onmousemove=function(e){
			var x=e.clientY-yOff
			var y=e.clientX-xOff
			
			var d = Math.sqrt((90-x)*(90-x)+(90-y)*(90-y));
			if (d<5) {
				x=90;
				y=90;
				d=0;
			}
			if (d>72) {
				x = ((x-90)*72/d+90)>>0;
				y = ((y-90)*72/d+90)>>0;
				d=72;
			}
			
			mark.style.top=x+'px';
			mark.style.left=y+'px';
			
			var angle=Math.atan2(90-x,y-90);
			angle=(angle+Math.PI*2)%(Math.PI*2);
			angle=angle*6/(Math.PI*2);
			
			col = HSVtoRGB(angle, 1, d/72);

			// Modifie la couleur de bg pour l'apercu et modifie la couleur du stroke
			g('colourDisplay').style.backgroundColor = strokeColor = 'rgb('+col.r+','+col.g+','+col.b+')';

		}
		document.onmousemove(e);
		document.onmouseup=function(){
			document.onmousemove=null;
		}
	}


	*/

	// -------- CHANGE IF SELECTED
	// ---------------------------
	
	/*
	function drawHands(){
		ctx.strokeStyle='#FFF';
		ctx.lineWidth=2;

		ctx.clearRect(-200,-200,400,400);		

		ctx.beginPath();
		ctx.moveTo(r1,0);
		ctx.arc(0,0,Math.abs(r1),0,Math.PI*2,true);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.save();
		ctx.translate(Math.cos(theta)*(r2-r1), Math.sin(theta)*(r2-r1));
		ctx.moveTo(Math.abs(r2),0);
		ctx.arc(0,0,Math.abs(r2),0,Math.PI*2,true);		
		ctx.stroke();

		ctx.beginPath();
		ctx.rotate(theta*(1-r1/r2));
		ctx.moveTo(0,0);
		ctx.lineTo(r3,0);
		ctx.stroke();
		
		ctx.restore();
		
		ctx.beginPath();
		ctx.arc(0,0,175,0,Math.PI*2,true);
		ctx.globalCompositeOperation = 'destination-in';
		ctx.fill();
		ctx.globalCompositeOperation = 'source-over';
	}
	*/

	//var spectrum=getSpectrum();

	// Draw the sprio to the next point
	function lineTo(n){

		ctx_under.beginPath();
		ctx_under.lineWidth = lineThickness;
		if (!lineSpec) ctx_under.strokeStyle = strokeColor;
		
		for (var i=0; i<=n; i++) {
			if (i>0) {
				theta+=0.01;	
			}

			x = Math.cos(theta)*(r2-r1)+r3*Math.cos(theta*(1-r1/r2));
			y = Math.sin(theta)*(r2-r1)+r3*Math.sin(theta*(1-r1/r2));
			if (i==0) ctx_under.moveTo(x,y);
			else ctx_under.lineTo(x,y);
		}
		ctx_under.stroke();

	}

	var loopy;

	// Draw the spiro
	function spiro(){


		// max is the max of turn the spiro have to do 
		if (r3==0) max=1;
		else max=(Math.abs(r2)/GCD(Math.abs(r1),Math.abs(r2)));
		//console.log(max);
		if (max<5) {
			r1 = randomBetween(20, 100);
			r2 = randomBetween(20, 100);
			r3 = randomBetween(0, 200);
			spiro();
		} else if (max>30 && max<=50) {
			max = randomBetween(20,max-20);
		} else if ( max>50 ) {
			max = randomBetween(max-30,max-10);
		}
		//console.log('new'+ max);

		// Fais en sorte que le spirograph reste toujours dans le canvas 170 = 350/2
		var h;
		if (r2<r1) {
			h = 150/(r1-r2+r3);
		}		
		else {
			h = 150/(r2-r1+r3);
		}

		r1*=h;
		r2*=h;
		r3*=h;
		
		// hide all itels on the canvas
		//displayItems(false)
		theta=0;
		// clear the canvas from the previous spiro
		ctx_under.clearRect(-200,-200,400,400);

		if (loopy) clearTimeout(loopy);
		loopy=setInterval(function(){
			if (thisView!=1 || speed==0) return;
			for (var i=0; i<[0,5,20,100][speed]; i++) {

				// if theta/(Math.PI*2) is higher than max stop
				if (theta/Math.PI/2>max) break;
				lineTo(20);
			}
		
			//if (displayHands) drawHands();
		
			if (theta/(Math.PI*2)>max) {
				clearInterval(loopy);
				//displayItems(false)
				//ctx.clearRect(-200,-200,400,400);
			}	
		},30);
	}


	spiro();


}