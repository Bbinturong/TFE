
// create function to get the element by ID
function g(e){return document.getElementById(e);}

// permet de faire en sorte que le spiro se fasse jusqu'au bout
function GCD(a,b){
	var t;
	while(b!=0)b=a%(t=b),a=t;		
	return a;
}

// Genrate random numbers
function randomBetween(min, max) {
      if (min < 0) {
          return Math.floor( Math.random() * (Math.abs(min)+max));
      }else {
          return Math.floor( Math.random() * ((max-min)+1) + min);
      }
}

window.onload=function(){

	// Value for the spiro
	r1 = randomBetween(20, 70);
	r2 = randomBetween(20, 60);
	r3 = randomBetween(10, 60);
	console.log('r1 '+r1);
	console.log('r2 '+r2);
	console.log('r3 '+r3);
	var max=1;
	
	var theta=0;
	
	var lineThickness = 2;
	var speed=1;

	var spirograph=g('spiro');

	var spiroSize = 300;
	console.log(spiroSize);
	//$( '#spiro' ).width(spiroSize).height(spiroSize);
	
	var ctx_spiro=spirograph.getContext('2d');
	//var ctx=canvas.getContext('2d');
		
	// Center of the canvas
	var cSize = spiroSize/2;
	
	ctx_spiro.translate(cSize,cSize);
	//ctx.translate(cSize,cSize);
	

	var strokeColor = randomColor();
	var lineSpec = false;

	//var spectrum=getSpectrum();

	// Draw the sprio to the next point
	function lineTo(n){

		ctx_spiro.beginPath();
		ctx_spiro.lineWidth = lineThickness;
		if (!lineSpec) ctx_spiro.strokeStyle = strokeColor;
		
		for (var i=0; i<=n; i++) {
			if (i>0) {
				theta+=0.01;	
			}

			x = Math.cos(theta)*(r2-r1)+r3*Math.cos(theta*(1-r1/r2));
			y = Math.sin(theta)*(r2-r1)+r3*Math.sin(theta*(1-r1/r2));
			if (i==0) ctx_spiro.moveTo(x,y);
			else ctx_spiro.lineTo(x,y);
		}
		ctx_spiro.stroke();

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
			h = cSize/(r1-r2+r3);
		}		
		else {
			h = cSize/(r2-r1+r3);
		}

		r1*=h;
		r2*=h;
		r3*=h;
		
		// hide all itels on the canvas
		//displayItems(false)
		theta=0;
		// clear the canvas from the previous spiro
		ctx_spiro.clearRect(-200,-200,400,400);

		if (loopy) clearTimeout(loopy);
		loopy=setInterval(function(){
			if (speed==0) return;
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