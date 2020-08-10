let terrainList: Terrain[] = [];
let globalScale = 1.5;
let terrainRadius = 50/globalScale;
let terrainAvoidanceArea = 1.4;
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

interface Vector {
    vx: number;
    vy: number;
  }
  
  
class Terrain {
public xpos: number;
public ypos: number;

constructor(x: number, y: number){
    this.xpos = x;
    this.ypos = y;
}
}

/**
 * Boid Object 
 */
export default class Boid {
    private speedLimit = 300/globalScale;
    private stayTogetherDivisonFactor = 70/globalScale;
    private stayTogetherRadius = 400/globalScale;
    private keepAwayRuleDivisonFactor = 40/globalScale;
    private keepAwayRadius = 40/globalScale;
    private boidSize = 10/globalScale;
    private borderBuffer = 40/globalScale;
    private extraBuffer = 300/globalScale;
    private avoidWallsDivisionFactor = 20/globalScale;
    private sameDirectionDivisionFactor = 60/globalScale;
    private sameDirectionDivisionRadius = 30/globalScale;
    private avoidTerrainDivisionFactor = 2/globalScale;

    public velocity: Vector;
    public xposition: number;
    public yposition: number;

    constructor(xpos: number, ypos: number) {
        let randAngle = Math.random()*2*Math.PI;
        let x = 200*Math.sin(randAngle);
        let y = 200*Math.cos(randAngle);
        this.velocity = {vx: x, vy: y};
        this.xposition = xpos;
        this.yposition = ypos;
    }

    /**
     * Calculates new position of boid given it's velocity in the next frame
     */
    public calculateNewPosition(): void {
        this.xposition += this.velocity.vx/100;
        this.yposition += this.velocity.vy/100;
    }

    /**
     * Calculates new velocity of boid given nearby boids
     */
    public calculateNewVelocity(boids: Boid[]): void {
        let v1 = this.keepAwayRule(boids);
        let v2 = this.stayTogetherRule(boids);
        let v3 = this.sameDirectionRule(boids);
        let v4 = this.avoidWalls();
        this.velocity.vx = this.velocity.vx + v1.vx + v2.vx + v3.vx + v4.vx;
        this.velocity.vy = this.velocity.vy + v1.vy + v2.vy + v3.vy + v4.vy;

        // speed limit
        let speed = Math.sqrt(this.velocity.vx*this.velocity.vx + this.velocity.vy*this.velocity.vy);
        if (speed > this.speedLimit) {
        let divisionFactor = speed/this.speedLimit;

        this.velocity.vx /= divisionFactor;
        this.velocity.vy /= divisionFactor;
        }
    }

    /**
     * Give adjustment velocity to avoid nearby boids
     */
    private keepAwayRule(boids: Boid[]): Vector {
        let vector: Vector = {vx: 0, vy: 0};

        boids.forEach(boid => {
        if (boid !== this) {
            let xdif = this.xposition - boid.xposition;
            let ydif = this.yposition - boid.yposition;

            if (xdif === 0 && ydif === 0) {
            let randAngle = Math.random()*2*Math.PI;
            let x = 300*Math.sin(randAngle);
            let y = 300*Math.cos(randAngle);
            vector.vx = x;
            vector.vy = y;
            } else if (Math.sqrt(xdif*xdif + ydif*ydif) < this.boidSize) {
            vector.vx += 100*(xdif)/this.keepAwayRuleDivisonFactor;
            vector.vy += 100*(ydif)/this.keepAwayRuleDivisonFactor;
            }else if (Math.sqrt(xdif*xdif + ydif*ydif) < this.keepAwayRadius) {
            vector.vx += (xdif)/this.keepAwayRuleDivisonFactor;
            vector.vy += (ydif)/this.keepAwayRuleDivisonFactor;
            }
        }
        });

        return vector;
    }

    /**
     * Give adjustment velocity to get closer to the center of gravity of a group of boids
     */
    private stayTogetherRule(boids: Boid[]): Vector {
        let x = 0;
        let y = 0;

        let numberOfBoids = 0;
        boids.forEach(boid => {
        if (boid !== this) {
            let xdif = this.xposition - boid.xposition;
            let ydif = this.yposition - boid.yposition;

            if (Math.sqrt(xdif*xdif + ydif*ydif) < this.stayTogetherRadius) {
            x += boid.xposition;
            y += boid.yposition;
            numberOfBoids++;
            }
        }
        });
        let vector: Vector = {vx: 0, vy: 0};

        if (numberOfBoids > 0) {
        let centerOfMassX = x / numberOfBoids;
        let centerOfMassY = y / numberOfBoids;
        vector.vx = (centerOfMassX - this.xposition)/this.stayTogetherDivisonFactor;
        vector.vy = (centerOfMassY - this.yposition)/this.stayTogetherDivisonFactor;
        }

        return vector;
    }

    /**
     * Give adjustment velocity to match nearby boid velocities
     */
    private sameDirectionRule(boids: Boid[]): Vector {
        let vector: Vector = {vx: 0, vy: 0};

        boids.forEach(boid => {
        if (boid !== this) {
            let xdif = this.xposition - boid.xposition;
            let ydif = this.yposition - boid.yposition;

            if (Math.sqrt(xdif*xdif + ydif*ydif) < this.sameDirectionDivisionRadius) {
            vector.vx += boid.velocity.vx/this.sameDirectionDivisionFactor;
            vector.vy += boid.velocity.vy/this.sameDirectionDivisionFactor;
            }
        }
        });

        return vector;
    }

    /**
     * Give adjustment velocity to avoid walls and objects
     */
    private avoidWalls(): Vector {
        let vector: Vector = {vx: 0, vy: 0};

        if (this.xposition < this.borderBuffer) {
        vector.vx = (this.borderBuffer + this.extraBuffer - vector.vx)/this.avoidWallsDivisionFactor;
        }
        if (this.xposition > windowWidth - this.borderBuffer ) {
        vector.vx = (this.xposition - windowWidth - this.borderBuffer - this.extraBuffer)/this.avoidWallsDivisionFactor;
        }
        if (this.yposition < this.borderBuffer) {
        vector.vy = (this.borderBuffer + this.extraBuffer - vector.vy)/this.avoidWallsDivisionFactor;
        }
        if (this.yposition > windowHeight - this.borderBuffer ) {
        vector.vy = (this.yposition - windowHeight - this.borderBuffer - this.extraBuffer)/this.avoidWallsDivisionFactor;
        }

        terrainList.forEach((terrain) => {
        let xdif = this.xposition - terrain.xpos;
        let ydif = this.yposition - terrain.ypos
        if (xdif*xdif + ydif*ydif < terrainRadius*terrainRadius) {
            vector.vx = (this.xposition - terrain.xpos)*100;
            vector.vy = (this.yposition - terrain.ypos)*100;
        }
        if (xdif*xdif + ydif*ydif < terrainRadius*terrainRadius*terrainAvoidanceArea) {
            vector.vx = (this.xposition - terrain.xpos)/this.avoidTerrainDivisionFactor;
            vector.vy = (this.yposition - terrain.ypos)/this.avoidTerrainDivisionFactor;
        }
        });

        return vector;
}
}