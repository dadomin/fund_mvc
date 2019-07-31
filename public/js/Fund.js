class Fund {
	constructor(number, name, endDate, total, current){
		this.number = number;
		this.name = name;
		this.endDate = endDate;
		this.total = total;
		this.current = current;
		if(current === undefined) this.current = 0;
	}

	drawRank(canvas, current, total){
		let w = canvas.width;
		let h = canvas.height;
		let ctx = canvas.getContext("2d");
		let now = 0;
		let term = current / 45;
		setTimeout(()=>{
			let frame = setInterval( ()=> {
				now += term;
				if(now >= current){
					now = current;
					clearInterval(frame);
				}
				this.drawR(ctx, w, h, now, total);
			}, 1000/30);
		});
		
	}

	drawR(ctx, w, h, now, total) {
		ctx.clearRect(0,0,w,h);

		ctx.beginPath();
		ctx.moveTo(w/2, h/2);
		ctx.fillStyle = "#bddff0";
		ctx.arc(w/2, h/2, 90, -Math.PI*2, 3/2*Math.PI);
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.moveTo(w/2, h/2);
		ctx.fillStyle = "#2292d1";
		ctx.arc(w/2, h/2, 90, -Math.PI /2, -Math.PI/2 + (now / total) * ( 2 * Math.PI ));
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(w/2, h/2);
		ctx.fillStyle = "#fff";
		ctx.arc(w/2, h/2, 60, -Math.PI*2, 3/2*Math.PI);
		ctx.fill();
		ctx.closePath(); 

		let percent = Math.floor(now / total * 100);
		ctx.fillStyle = "#000";
		ctx.font = "25px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(percent+"%" , w/2, h/2);
	}
}