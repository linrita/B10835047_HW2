//let nb;
let nbarray = [];
let img;
let img2;
let img3;
let theta = 0;

// 初始內容
function setup() {
  createCanvas(600, 600, WEBGL); // 決定 使用 3D 方式進行渲染
  for(let i = 0; i<50 ; i += 1){
    nbarray.push(new mybox(50,-height/2+(height/5)*i,0,random(300)));
  }
  detailX = createSlider(2, 24, 12);
  detailX.position(10, height + 5);
  detailX.style('width', '80px');
  img = loadImage('image.jpg');
  img2 = loadImage('image2.jpg');
  img3 = loadImage('image3.jpg');
  //nb = new myBox(50,50,0,50);
}
function draw() {
  background(mouseX,mouseY,200);
  nbarray.forEach((v)=>{v.display();})
}
// 自訂一個類別物件
class mybox{
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    this.mx=2;
    this.my=3;
    this.cc = color(random(255),random(255),0);//隨機產生物件顏色
    this.stela=new stela(this.x,this.y,this.z,this.size*0.25,this.size);
  }
  
  display(){
    push();
      translate(this.x,this.y,this.z);  
      if (mouseX-width/2 > this.x-this.size/2 && //移動
          mouseX-width/2 < this.x+this.size/2 &&
          mouseY-height/2 > this.y-this.size/2 && 
          mouseY-height/2 < this.y+this.size/2 
          ){
        rotateX(frameCount*0.01);
        rotateY(frameCount*0.01);
        this.mx = this.mx+1;
        texture(img);
        }
      this.stela.display();
      fill(this.cc);
      texture(img);
      noStroke();
      ellipsoid(30, 40, 40, detailX.value(), 8);
    pop();
    this.move();
  }
    //能力2:移動規則
  move(){
    if (this.x>width/2){this.mx = -1;}
    if (this.x<-width/2){this.mx = 1;}  
    if (this.y>height/2){this.my = -1;}
    if (this.y<-height/2){this.my = 1;}  
    this.x = this.x + this.mx;
    this.y = this.y + this.my;
  }
}
class stela{
  // 怎樣建構這個物件 只執行一次
  constructor(x,y,z,size,cdx){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    this.cdx=cdx;//衛星距離中心的x距離
    this.cc = color(random(255),0,0);//隨機產生物件顏色
  }
  // 定義一些能力 我們呼叫時 執行 
  // 能力1:顯現這box
  display(){
    push();
      rotateY(frameCount*0.01);
      translate(this.cdx,0,0);
      fill(this.cc);
      texture(img3);
      noStroke();
      box(this.size);
      rotateZ(frameCount*0.01);
      translate(this.cdx,1,1);  
      fill(this.cc);
      texture(img2);
      noStroke();
      sphere(this.size);
    pop();
  }
  

}