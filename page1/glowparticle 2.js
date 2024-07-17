const PI2 = Math.PI * 2; // constant of circle in radians

export class GlowParticle{
    constructor(x, y, radius, rgb){ // initial position of each particle & color
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rgb = rgb;

        this.vx = Math.random() * 4; // velocities
        this.vy = Math.random() * 4;

        this.sinValue = Math.random(); // bouncing effect
    }

    animate(ctx, stageWidth, stageHeight){
        this.sinValue += 0.01; //updating position & size
        this.radius += Math.sin(this.sinValue);

        this.x += this.vx;
        this.y += this.vy;

        if(this.x < 0){ // reverse direction if hit the canvas
            this.vx *= -1;
            this.x += 10;
        } else if(this.x > stageWidth){
            this.vx *= -1;
            this.x -= 10;
        }

        if(this.y < 0){
            this.vy *= -1;
            this.y += 10;
        }
        else if(this.y > stageHeight){
            this.vy *= -1;
            this.y -= 10;
        }

        ctx.beginPath(); // apply glow effect
        const g = ctx.createRadialGradient(this.x, this.y, this.radius * 0.01, this.x, this.y, this.radius); // gradient effect from inner to outer circle

        g.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`); //start of gradient
        g.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`); // end of gradient

        ctx.fillStyle = g
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false); // create circle
        ctx.fill();
    }
}